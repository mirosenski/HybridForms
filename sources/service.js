const { v4: uuidv4 } = require('uuid');
const fetch = require('node-fetch');
const express = require('express');
const bodyParser = require('body-parser');
const proxy = require('express-http-proxy');
const jwt_decode = require('jwt-decode');
const hybridforms = require('hybridforms');
const path = require('path');
const fs = require('fs-extra');
const multer = require('multer');
const tmp = require('tmp');
const os = require('os');
const chokidar = require('chokidar');
const chalk = require('chalk');
const argv = require('yargs').array('include').argv;
const cors = require('cors');
const mime = require('mime-types');
const dir = tmp.dirSync({
    unsafeCleanup: true,
});
const formExporter = require('hf-formdefexporter');
let tmpAssetPath = null;
require('dotenv').config();

// Change diskStorage to memoryStorage because diskStorage gets stuck on PDF creation
// Save files manually to temp dir.
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fieldSize: 50 * 1024 * 1024,
    },
});

const app = express();
const fdDirectoryPath = argv.path ? argv.path : path.join(__dirname, '../form-templates');
const assetDirectoryPath = argv.assets ? argv.assets : path.join(__dirname, '../assets');
const demoUser = fs.readJsonSync(path.join(__dirname, '../demoUser.json'));
const formDefinitionFileMap = new Map();
const assetFileMap = new Map();
const foldersWithExcelMappingFiles = [];

// simple non-cryptographic hash function
// https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
const hash = (str, seed = 0) => {
    let h1 = 0xdeadbeef ^ seed,
        h2 = 0x41c6ce57 ^ seed;
    for (let i = 0, ch; i < str.length; i++) {
        ch = str.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
    h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
    h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);

    return 4294967296 * (2097151 & h2) + (h1 >>> 0);
};

let formDefinitionFolder;

app.use(
    bodyParser.json({
        limit: '200mb',
    }),
);
app.use(
    bodyParser.urlencoded({
        limit: '200mb',
        extended: true,
    }),
);
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8181');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-hf-version');
    next();
});

app.use(
    cors({
        origin: 'http://localhost:8181',
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type', 'x-hf-version', 'x-hf-action', 'X-HF-ServerVersion'],
        exposedHeaders: ['x-hf-action', 'X-HF-ServerVersion'],
    }),
);

const isBase64 = (value) =>
    /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})$/.test(value);

const checkTokenExpired = (token) => {
    const decoded = jwt_decode(token);
    const exp = decoded.exp;
    const now = Math.floor(Date.now() / 1000) + 60;

    if (exp < now) {
        return true;
    }

    return false;
};

let serverUrl;
let token = {};
let preventTokenRequest = false;
app.use(
    '/proxy/:proxyServer',
    proxy(
        (req) => {
            serverUrl = 'https://' + req.params.proxyServer;
            return serverUrl;
        },
        {
            proxyReqOptDecorator: async (proxyReqOpts) => {
                if (
                    token &&
                    token[serverUrl] &&
                    token[serverUrl].type &&
                    token[serverUrl].type !== 'Basic' &&
                    checkTokenExpired(token[serverUrl].token)
                ) {
                    token[serverUrl] = null;
                }

                if (token && token[serverUrl] && token[serverUrl].token) {
                    proxyReqOpts.headers['authorization'] = `${token[serverUrl].type} ${token[serverUrl].token}`;
                    return proxyReqOpts;
                }

                let gatewayData;
                try {
                    const res = await fetch(new URL('/api/app/gatewayData', serverUrl).toString(), {
                        method: 'GET',
                        headers: {
                            'X-HF-Version': 'HybridForms 8.0.0',
                        },
                    });
                    gatewayData = await res.json();
                } catch {
                    return proxyReqOpts;
                }

                if (gatewayData.loginMethod !== 'ADFS' && gatewayData.loginMethod !== 'WindowsAuthentication') {
                    throw new Error('Login failed! Only ADFS and WindowsAuthentication is supported.');
                }

                try {
                    const credentials = fs.readJsonSync(path.join(__dirname, '../credentials.json'));

                    if (!credentials.accountName || !credentials.password || !isBase64(credentials.password)) {
                        throw new Error(
                            'Please provide valid credentials in credentials.json. Password must be base64 encoded!',
                        );
                    }

                    const passwordBuffer = Buffer.from(credentials.password, 'base64');

                    if (gatewayData.loginMethod === 'ADFS') {
                        const params = new URLSearchParams({
                            grant_type: 'password',
                            username: credentials.accountName,
                            password: passwordBuffer.toString('ascii'),
                            client_id: gatewayData.clientID,
                            resource: new URL('/', serverUrl).toString(),
                        });

                        if (preventTokenRequest) {
                            throw new Error(
                                'Request to get token failed. Please check your credentials in credentials.json and resatrt the service.',
                            );
                        }

                        const authRes = await fetch(new URL('/api/app/token', serverUrl).toString(), {
                            method: 'POST',
                            body: params,
                        });

                        if (!authRes.ok) {
                            preventTokenRequest = true;
                            throw new Error(
                                'Request to get token failed. Please check your credentials in credentials.json and resatrt the service.',
                            );
                        }

                        const auth = await authRes.json();

                        if (!authRes.ok) {
                            throw new Error(auth.error_description);
                        }

                        token = {
                            ...token,
                            [serverUrl]: {
                                type: auth.token_type,
                                token: auth.access_token,
                            },
                        };
                    } else if (gatewayData.loginMethod === 'WindowsAuthentication') {
                        const base64 = Buffer.from(
                            `${credentials.accountName}:${passwordBuffer.toString('ascii')}`,
                        ).toString('base64');
                        token = {
                            ...token,
                            [serverUrl]: {
                                type: 'Basic',
                                token: base64,
                            },
                        };
                    }

                    proxyReqOpts.headers['authorization'] = `${token[serverUrl].type} ${token[serverUrl].token}`;
                    return proxyReqOpts;
                } catch (error) {
                    throw new Error(`Login failed! ${error?.message ? error.message : error}`);
                }
            },
        },
    ),
);

const router = express.Router();

router.post('/pdf', upload.any(), (req, res) => {
    const {
        buildVersion,
        attachmentPath, // source form definition path
        formServer,
        formDefinitionServer,
        formDefinitionFile,
        formDefinitionStructure,
        debug,
    } = req.body;

    const tmpPath = path.join(`${dir.name}`, uuidv4());
    fs.mkdirSync(tmpPath, {
        recursive: true,
    });

    //
    //  store form data and files to temp directory
    //
    const tmpFormPath = path.join(tmpPath, 'form');
    const tmpFormFilesPath = path.join(tmpFormPath, 'files');
    fs.mkdirSync(tmpFormFilesPath, {
        recursive: true,
    });

    fs.writeFileSync(path.join(tmpFormPath, 'index.json'), formServer);
    if (Array.isArray(req.files) && req.files.length > 0) {
        req.files.forEach((file) => {
            fs.writeFileSync(path.join(tmpFormFilesPath, file.originalname), file.buffer);
        });
    }

    //
    // store form definition data and files to temp directory
    //
    const formDefinitionPath = path.join(fdDirectoryPath, attachmentPath);
    const tmpExportedFormDefinitionPath = path.join(tmpPath, 'template');

    fs.mkdirSync(tmpExportedFormDefinitionPath);
    fs.writeFileSync(path.join(tmpExportedFormDefinitionPath, 'index.json'), formDefinitionServer);

    // store assets to temp directory
    setUpAssets();

    let p = Promise.resolve(formDefinitionStructure);
    if (formDefinitionFile) {
        const formDefinitionFileContent = fs.readFileSync(path.join(formDefinitionPath, formDefinitionFile), 'utf8');
        console.log(chalk.dim(`parse form definition file: ${formDefinitionFile}`));
        p = hybridforms.parseFormDefinition(formDefinitionFileContent).then((structure) => {
            return JSON.stringify(structure);
        });
    }
    p.then((structure) => {
        fs.writeFileSync(path.join(tmpExportedFormDefinitionPath, 'structure.json'), structure);

        const exporterOptions = {
            formDefPath: formDefinitionPath,
            outputFolder: tmpExportedFormDefinitionPath,
            outputPostfix: 'tmppdfexport',
            compileFiles: false,
            formatHtml: false,
            mapExcelFieldsIfAvailable: true,
            buildVersion,
        };

        const exporter = new formExporter.Exporter();
        return exporter.start(exporterOptions);
    })
        .then(() => {
            const pathParts = attachmentPath.split('/');
            const exportedFormDefinitionFolder = pathParts[pathParts.length - 1] + '.tmppdfexport';

            fs.moveSync(
                path.join(tmpExportedFormDefinitionPath, exportedFormDefinitionFolder),
                path.join(tmpExportedFormDefinitionPath, 'files'),
            );

            console.log(
                chalk.dim(`formDev PDF Temp working directory, form templates path: ${tmpExportedFormDefinitionPath}`),
            );
            console.log(chalk.dim(`formDev PDF Temp working directory, form path: ${tmpFormPath}`));

            hybridforms.setLogLevel(hybridforms.LogLevelEnum.Error);

            const paths = {
                formDefinitionPath: tmpExportedFormDefinitionPath,
                formPath: tmpFormPath,
                assetPath: tmpAssetPath,
            };

            const options = {
                htmlFileName: formDefinitionFile ? formDefinitionFile : null,
                dataFormat: hybridforms.FormFormatEnum.ServerFormat,
                debug,
                logLevel: 4, // Error, warning, info
            };

            return hybridforms.createPDF(paths, options);
        })
        .then((pdf) => {
            if (pdf && pdf.length) {
                console.log(`${chalk.blueBright('Services')}, generated file with ${pdf.length} bytes`);
                res.setHeader('Content-Type', 'application/pdf');
                res.end(pdf, 'binary');
                return;
            }

            res.end(null);
        })
        .catch((e) => {
            console.log(`${chalk.red('Services')}, error: `, e);

            res.status(500).send(e);
        })
        .finally(() => {
            fs.remove(tmpPath, () => {
                console.log(chalk.dim(`formDev PDF Temp working directory, path deleted: ${tmpPath}`));
                console.log('');
            });
        });
});

router.get('/formdefinitions', (req, res) => {
    const values = [...formDefinitionFileMap.values()];
    res.status(200).send(values);
});

router.get(['/formdefinitions/:folder/:file', '/formdefinitions/:area/:folder/*'], async (req, res) => {
    return fdFileResponse(req, res);
});

router.get('/formdefinitions/:folder/', (req, res) => {
    const { folder } = req.params;

    return res.status(200).send(`${fdDirectoryPath}/${folder}`);
});

router.get('/assets/', (req, res) => {
    const values = [...assetFileMap.values()];
    res.status(200).send(values);
});

router.get(['/assets/:folder', '/assets/:area/:folder'], (req, res) => {
    // find asset folder by folder name
    const { area, folder } = req.params;
    const assetFolder = area ? `${area}/${folder}` : folder;
    const values = [...assetFileMap.values()].filter((asset) => asset.folder === assetFolder);
    res.status(200).send(values[0]);
});

router.get(['/assets/:folder/files/:file', '/assets/:area/:folder/files/:file'], (req, res) => {
    return assetFileResponse(req, res);
});

router.post('/formdefinitions/write-template-file', upload.any(), (req, res) => {
    const { filepath, content } = req.body;

    try {
        fs.writeFileSync(`${fdDirectoryPath}/${filepath}`, content);
        res.sendStatus(200);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

router.get('/excel-mapping-files', (req, res) => {
    const response = JSON.stringify(foldersWithExcelMappingFiles);
    res.status(200).send(response);
});

async function fdFileResponse(req, res) {
    const { area, folder } = req.params;
    let { file } = req.params;

    const requestPath = decodeURI(req.path);
    let subFolder = '';
    if (!file) {
        const pathParts = requestPath.split('/');
        file = pathParts.pop();
        pathParts.splice(0, pathParts.indexOf(folder) + 1);
        subFolder = pathParts.join('/');
    }

    let currentFolder = area ? `${area}/${folder}` : folder;
    if (subFolder) {
        currentFolder += `/${subFolder}`;
    }
    if (!folder.endsWith('.templ')) {
        formDefinitionFolder = area ? `${area}/${folder}` : folder;
    }
    const fileName = file.split('.');
    const extension = fileName.pop();

    let p = Promise.resolve();
    if (extension === 'json') {
        if (fs.existsSync(`${fdDirectoryPath}/${currentFolder}/${fileName.join('.')}.jsonconvert.xlsx`)) {
            p = p
                .then(() => {
                    return hybridforms
                        .excelToJson(`${fdDirectoryPath}/${currentFolder}/${fileName.join('.')}.jsonconvert.xlsx`)
                        .then((jsonBuffer) => {
                            const convertedJsonFile = jsonBuffer.toString();
                            fs.writeFileSync(
                                `${fdDirectoryPath}/${currentFolder}/${fileName.join('.')}.json`,
                                convertedJsonFile,
                            );
                        });
                })
                .catch((error) => {
                    return Promise.reject(`excelToJson convert failed: ${error}`);
                });
        }

        if (fs.existsSync(`${fdDirectoryPath}/${currentFolder}/translation.xlsx`) && file === 'translation.json') {
            p = p
                .then(() => {
                    return hybridforms
                        .translation(`${fdDirectoryPath}/${currentFolder}/translation.xlsx`)
                        .then((jsonBuffer) => {
                            const convertedJsonFile = jsonBuffer.toString();
                            fs.writeFileSync(`${fdDirectoryPath}/${currentFolder}/translation.json`, convertedJsonFile);
                        });
                })
                .catch((error) => {
                    return Promise.reject(`translation convert failed: ${error}`);
                });
        }
    }

    p = p.then(() => {
        const filePathParts = file.split('/');
        if (filePathParts.length > 1 && extension === 'js') {
            const fileString = fs.readFileSync(path.join(fdDirectoryPath, currentFolder, file)).toString();
            const lines = fileString.split(/\r?\n/);
            let lastLine = lines.pop();
            while (!lastLine.length) {
                lastLine = lines.pop();
            }

            if (lastLine.includes('sourceMappingURL')) {
                lastLine = lastLine.replace(/sourceMappingURL=.*/, `sourceMappingURL=${file}.map`);
                lines.push(lastLine);
            }
            return res.status(200).send(lines.join('\n'));
        }

        return res.status(200).sendFile(`${currentFolder}/${file}`, {
            root: fdDirectoryPath,
        });
    });

    return p.catch((error) => {
        return res.status(404).send(`${error}`);
    });
}

async function assetFileResponse(req, res) {
    const { area, folder, file } = req.params;

    const assetFolder = area ? `${area}/${folder}` : folder;

    if (!assetFileMap.has(assetFolder)) {
        return res.status(404).send('Asset folder not found');
    }

    if (!file || !assetFileMap.get(assetFolder).files.find((f) => f.filename === file)) {
        return res.status(404).send('Asset file not found');
    }

    return res.status(200).sendFile(`${assetFolder}/${file}`, {
        root: assetDirectoryPath,
    });
}

router.post('/update-translation-keys', upload.any(), (req, res) => {
    const { attachmentPath, fileExtsToParse, filesToParse, buildVersion } = req.body;
    const fdPath = path.join(fdDirectoryPath, attachmentPath);

    if (!fs.existsSync(`${fdPath}/translation.xlsx`) && !fs.existsSync(`${fdPath}/translation.json`)) {
        const respond = JSON.stringify({
            success: false,
            error: 'No translation file found!',
            unusedKeys: [],
            newKeys: [],
        });
        return res.status(404).send(respond);
    }

    const tmpPath = path.join(`${dir.name}`, uuidv4());
    fs.mkdirSync(tmpPath, {
        recursive: true,
    });

    const exporterOptions = {
        formDefPath: fdPath,
        outputFolder: tmpPath,
        outputPostfix: 'tmptranslationexport',
        compileFiles: false,
        formatHtml: false,
        mapExcelFieldsIfAvailable: true,
        buildVersion,
    };

    const exporter = new formExporter.Exporter();
    exporter
        .start(exporterOptions)
        .then(() => {
            const pathParts = attachmentPath.split('/');
            const exportedFormDefinitionFolder = pathParts[pathParts.length - 1] + '.tmptranslationexport';

            console.log(chalk.dim(`formDev Translation Update Temp working directory, path: ${tmpPath}`));

            const tempFdPath = path.join(tmpPath, exportedFormDefinitionFolder);
            const keys = hybridforms.getTranslationKeysFromHtml(tempFdPath, fileExtsToParse, filesToParse);

            if (fs.existsSync(`${fdPath}/translation.xlsx`)) {
                return hybridforms.updateExcelTranslationFile(`${fdPath}/translation.xlsx`, keys, {
                    markUnusedKeys: true,
                });
            }
            if (fs.existsSync(`${fdPath}/translation.json`)) {
                return hybridforms.updateJsonTranslationFile(`${fdPath}/translation.json`, keys);
            }
        })
        .then((updateResult) => {
            const json = JSON.stringify(updateResult);
            res.setHeader('Content-Type', 'application/json');
            res.send(json);
        })
        .finally(() => {
            fs.remove(tmpPath, () => {
                console.log(chalk.dim(`formDev Translation Update Temp working directory, path deleted: ${tmpPath}`));
            });
        });
});

router.post('/generate-translation-keys', upload.any(), (req, res) => {
    const { attachmentPath, fileExtsToParse, filesToParse } = req.body;

    let p = Promise.resolve();
    const fdPath = path.join(fdDirectoryPath, attachmentPath);
    const keys = hybridforms.getTranslationKeysFromHtml(fdPath, fileExtsToParse, filesToParse);

    if (fs.existsSync(`${fdDirectoryPath}/${formDefinitionFolder}/translation.xlsx`)) {
        p = p.then(() => {
            return hybridforms.updateExcelTranslationFile(`${fdPath}/translation.xlsx`, keys, {
                markUnusedKeys: true,
            });
        });
    } else if (fs.existsSync(`${fdDirectoryPath}/${formDefinitionFolder}/translation.json`)) {
        p = p.then(() => {
            return hybridforms.updateJsonTranslationFile(
                `${fdDirectoryPath}/${formDefinitionFolder}/translation.json`,
                keys,
            );
        });
    } else {
        const respond = JSON.stringify({
            success: false,
            error: 'No translation file found!',
            unusedKeys: [],
            newKeys: [],
        });
        return res.status(404).send(respond);
    }

    p.then((updateResult) => {
        const json = JSON.stringify(updateResult);
        res.setHeader('Content-Type', 'application/json');
        res.send(json);
    });
});

router.post('/userdata', (req, res) => {
    demoUser.displayName = demoUser.displayName ? demoUser.displayName : os.userInfo().username.toUpperCase();
    demoUser.accountName = demoUser.accountName ? demoUser.accountName : os.hostname();
    demoUser.options = null;
    const serverKeys = path.join(__dirname, '../appSettings.json');
    if (fs.existsSync(serverKeys)) {
        demoUser.options = fs.readJSONSync(serverKeys);
    }

    res.status(200).send(demoUser);
});

router.post('/counter/:counterId', (req, res) => {
    const { counterId } = req.params;
    const { options } = req.body;

    let digits = 4;
    let counter, formatedCounter;

    const file = `counter.${counterId}.json`;
    if (fs.existsSync(`${fdDirectoryPath}/${formDefinitionFolder}/${file}`)) {
        const counterDef = fs.readJSONSync(`${fdDirectoryPath}/${formDefinitionFolder}/${file}`);

        let formatGroupBefore1 = '';
        if (counterDef.formatGroupBefore1 && options[counterDef.formatGroupBefore1]) {
            formatGroupBefore1 = options[counterDef.formatGroupBefore1];
        }
        let formatGroupBefore2 = '';
        if (counterDef.formatGroupBefore2 && options[counterDef.formatGroupBefore2]) {
            formatGroupBefore2 = options[counterDef.formatGroupBefore2];
        }
        let formatGroupAfter1 = '';
        if (counterDef.formatGroupAfter1 && options[counterDef.formatGroupAfter1]) {
            formatGroupAfter1 = options[counterDef.formatGroupAfter1];
        }
        let formatGroupAfter2 = '';
        if (counterDef.formatGroupAfter2 && options[counterDef.formatGroupAfter2]) {
            formatGroupAfter2 = options[counterDef.formatGroupAfter2];
        }

        digits = counterDef.digits;
        counter = randomNumber(digits);
        formatedCounter = `${formatGroupBefore2}${counterDef.formatSepBefore2}${formatGroupBefore1}${counterDef.formatSepBefore1}${counter}${counterDef.formatSepAfter1}${formatGroupAfter1}${counterDef.formatSepAfter2}${formatGroupAfter2}`;
    } else {
        counter = randomNumber(digits);
        formatedCounter = counter.toString();
    }

    const response = {
        counter,
        formatedCounter,
    };
    return res.status(200).send(response);
});

router.get('/health', (req, res) => {
    return res.status(200).send('OK');
});

app.use('/api', router);

const server = app.listen('8182', () => {
    console.log(chalk.green.bold('Services, started http://localhost:8182') + '\n');
});

function randomNumber(digits) {
    return Math.floor(10 ** (digits - 1) + Math.random() * 9 * 10 ** (digits - 1));
}

function formDev() {
    console.log(`${chalk.blueBright('Services')}, Path to FormDefinition ${fdDirectoryPath}`);

    try {
        return buildFormDefinitionFileMap()
            .then(() => {
                startServiceWatcher();
                startExcelMapWatcher();
            })
            .then(() => {
                buildAssetFileMap();
            });
    } catch (error) {
        console.log(chalk.red(`Error! ${error.message}`));
        shutDown();
    }
}

function shutDown() {
    console.log(`${chalk.blueBright('Services')}, cleaning up...`);
    dir.removeCallback();
    server.close();
    process.exit(1);
}

function startServiceWatcher() {
    let watcherReady = false;
    const watcher = chokidar.watch(['**/index.json', '**/stages.json', '**/*.html'], {
        cwd: fdDirectoryPath,
        ignored: ['**/Exported/**', '**/node_modules/**', '**/.vscode/', '**/*.templ_mapped.html'],
        ignoreInitial: true,
        usePolling: true,
    });

    const rebuildFileMapEntry = (filePath) => {
        const outputPath = path.dirname(filePath);
        const fdFolderPath = path.join(fdDirectoryPath, outputPath);

        const pathSplit = outputPath.split(path.sep);
        if (pathSplit[0] === 'Customers') {
            pathSplit.shift();
        }

        const areaName = pathSplit.length > 1 ? pathSplit[0] : '';
        const fdName = pathSplit.length > 1 ? pathSplit[1] : pathSplit[0];

        if (
            isNoFormDefFolder(fdFolderPath, [
                '.git',
                '.vscode',
                '.template',
                '.exported',
                '.templ',
                '.tmppdfexport',
                '.sass-cache',
                'typings',
                'scripts',
                'node_modules',
                'Exported',
                'Assets',
            ])
        ) {
            return;
        }

        pushIntoFdFileTree(fdFolderPath, fdName, areaName.replace('area.', ''));
    };

    const addFile = (filePath) => {
        if (!watcherReady) {
            return;
        }

        rebuildFileMapEntry(filePath);
    };

    const changeFile = (filePath) => {
        if (!watcherReady) {
            return;
        }

        const ext = path.extname(filePath);
        if (ext === '.html') {
            return;
        }

        rebuildFileMapEntry(filePath);
    };

    let deleteWatcher = null;
    const deleteFile = (filePath) => {
        if (!watcherReady) {
            return;
        }

        clearTimeout(deleteWatcher);
        deleteWatcher = setTimeout(() => {
            rebuildFileMapEntry(filePath);
        }, 100);
    };

    const deleteFolder = (folderPath) => {
        if (!watcherReady) {
            return;
        }

        clearTimeout(deleteWatcher);
        deleteWatcher = setTimeout(() => {
            const mapKey = folderPath.replace('\\', '/');

            const entry = formDefinitionFileMap.get(mapKey);
            if (!entry) {
                return;
            }

            formDefinitionFileMap.delete(mapKey);

            console.log(`${chalk.blueBright('Services')}, delete template ${mapKey}\n`);
        }, 100);
    };

    watcher
        .on('ready', () => (watcherReady = true))
        .on('add', (filePath) => addFile(filePath))
        .on('change', (filePath) => changeFile(filePath))
        .on('unlink', (filePath) => deleteFile(filePath))
        .on('unlinkDir', (filePath) => deleteFolder(filePath));
}

function startExcelMapWatcher() {
    let watcherReady = false;
    const watcher = chokidar.watch(['**/*.mapping.xlsx'], {
        cwd: fdDirectoryPath,
        ignored: ['**/Exported/**', '**/node_modules/**', '**/.vscode/'],
        ignoreInitial: true,
        usePolling: true,
    });

    // ToDo: add watcher for config.mapping.json
    // const rebuildFileMapEntry = (filePath) => {
    //     const outputPath = path.dirname(filePath);
    //     const fdFolderPath = path.join(fdDirectoryPath, outputPath);

    //     const pathSplit = outputPath.split(path.sep);
    //     const areaName = pathSplit.length > 1 ? pathSplit[0] : '';
    //     const fdName = pathSplit.length > 1 ? pathSplit[1] : pathSplit[0];

    //     pushIntoFileTree(fdFolderPath, fdName, areaName.replace('area.', ''));
    // };

    const addFile = () => {
        if (!watcherReady) {
            return;
        }
        console.log('excel map file added');
        // rebuildFileMapEntry(filePath);
    };

    const changeFile = () => {
        if (!watcherReady) {
            return;
        }

        console.log('excel map file changed');
        // rebuildFileMapEntry(filePath);
    };

    let deleteWatcher = null;
    const deleteFile = () => {
        if (!watcherReady) {
            return;
        }

        clearTimeout(deleteWatcher);
        deleteWatcher = setTimeout(() => {
            console.log('excel map file deleted');
        }, 100);
    };

    watcher
        .on('ready', () => (watcherReady = true))
        .on('add', (filePath) => addFile(filePath))
        .on('change', (filePath) => changeFile(filePath))
        .on('unlink', (filePath) => deleteFile(filePath));
}

function buildFormDefinitionFileMap() {
    formDefinitionFileMap.clear();
    const entries = fs.readdirSync(fdDirectoryPath);
    return readFormDefinitionFolder(fdDirectoryPath, entries);
}

function buildAssetFileMap() {
    assetFileMap.clear();
    if (!fs.existsSync(assetDirectoryPath)) {
        return;
    }
    const entries = fs.readdirSync(assetDirectoryPath);
    return readAssetFolder(assetDirectoryPath, entries);
}

/**
 * Copies files from a source folder to a destination folder with specific rules:
 * - Deletes everything in the destination folder.
 * - Recreates the first-level subfolders from the source in the destination.
 * - Copies `index.json` from each subfolder to the corresponding subfolder in the destination.
 * - Copies all other files to a nested `files` subfolder within the corresponding subfolder in the destination.
 * - If a subfolder starts with "area.", it is copied to the root destination with the same rules applied.
 *
 * @param {string} srcPath - The absolute path of the source folder.
 * @param {string} destPath - The absolute path of the destination folder.
 */
function copyNestedFilesWithAreaSupportSync(srcPath, destPath) {
    try {
        fs.emptyDirSync(destPath);

        // Get all first-level items (subfolders and files) in the source folder
        const items = fs.readdirSync(srcPath);

        // Identify and handle the "area.[something]" folder
        const areaFolder = items.find(
            (item) => item.startsWith('area.') && fs.statSync(path.join(srcPath, item)).isDirectory(),
        );

        if (areaFolder) {
            const srcAreaFolderPath = path.join(srcPath, areaFolder);
            const destAreaFolderPath = path.join(destPath, areaFolder);

            // Create and process the "area" folder in the destination
            copyNestedFilesWithAreaSupportSync(srcAreaFolderPath, destAreaFolderPath);
        }

        // Process all other first-level subfolders
        items.forEach((item) => {
            const srcItemPath = path.join(srcPath, item);

            if (fs.statSync(srcItemPath).isDirectory() && !item.startsWith('area.')) {
                const destSubfolderPath = path.join(destPath, item);
                copySubfoldersWithStructureSync(srcItemPath, destSubfolderPath);
            }
        });

        console.log('Files copied successfully.');
    } catch (err) {
        console.error('Error during file operations:', err);
    }
}

/**
 * Copies subfolder files with the specified structure:
 * - Copies `index.json` to the subfolder root in the destination.
 * - Copies all other files to a nested `files` subfolder within the destination subfolder.
 *
 * @param {string} srcFolderPath - The absolute path of the source subfolder.
 * @param {string} destFolderPath - The absolute path of the destination subfolder.
 */
function copySubfoldersWithStructureSync(srcFolderPath, destFolderPath) {
    fs.ensureDirSync(destFolderPath);

    // Read all files in the source subfolder
    const files = fs.readdirSync(srcFolderPath);

    files.forEach((file) => {
        const srcFile = path.join(srcFolderPath, file);

        if (file === 'index.json') {
            // Copy `index.json` to the subfolder root in the destination
            const destFile = path.join(destFolderPath, file);
            fs.copySync(srcFile, destFile);
        } else {
            // Copy all other files to a `files` subfolder in the destination
            const destFilesSubfolder = path.join(destFolderPath, 'files');
            fs.ensureDirSync(destFilesSubfolder);

            const destFile = path.join(destFilesSubfolder, file);
            fs.copySync(srcFile, destFile);
        }
    });
}

function setUpAssets(force = false) {
    const tempAssetPath = path.join(`${dir.name}`, 'assets');
    if (fs.existsSync(tempAssetPath) && !force) {
        // assets already set up
        return;
    }

    if (!fs.existsSync(tempAssetPath)) {
        fs.mkdirSync(tempAssetPath);
    }

    copyNestedFilesWithAreaSupportSync(assetDirectoryPath, tempAssetPath);

    tmpAssetPath = tempAssetPath;
}

async function pushIntoAssetFileTree(assetPath, fdName) {
    let files = fs.readdirSync(assetPath);
    const filesToExclude = ['.DS_Store'];
    files = files.filter((file) => !filesToExclude.includes(file));
    const indexJson = files.indexOf('index.json');
    console.log(
        `${chalk.blueBright('Services')}, ${
            indexJson < 0 ? `No index.json found in ${assetPath}` : `index.json found in ${assetPath}`
        }`,
    );

    const folder = path.relative(assetDirectoryPath, assetPath).replace(/\\/g, '/');
    let data = null;
    const p = Promise.resolve();

    if (indexJson < 0) {
        console.error(`pushIntoAssetFileTree(): No index.json found in ${assetPath}`);
    } else {
        try {
            data = fs.readJsonSync(`${assetPath}/${files[indexJson]}`);
            data.folder = folder;

            if (!data.files || !data.files.length) {
                data.files = [];
                files.forEach((file) => {
                    if (file === 'index.json') {
                        return;
                    }
                    const mimeType = mime.lookup(file);
                    data.files.push({
                        filename: file,
                        contentType: mimeType,
                        created: new Date().toISOString(),
                    });
                });
            }

            delete data.id;
            data.id = hash(JSON.stringify(data));
        } catch {
            console.log(`${chalk.red('Error')}, reading index.json in ${assetPath}`);
        }
    }

    assetFileMap.set(folder, data);
    return Promise.resolve();
}

async function pushIntoFdFileTree(fdFolderPath, fdName, areaName) {
    const files = fs.readdirSync(fdFolderPath);
    const indexJson = files.indexOf('index.json');
    console.log(
        `${chalk.blueBright('Services')}, ${
            indexJson < 0 ? `No index.json found in ${fdFolderPath}` : `index.json found in ${fdFolderPath}`
        }`,
    );

    const folder = path.relative(fdDirectoryPath, fdFolderPath).replace(/\\/g, '/');
    let data = null;
    const p = Promise.resolve();

    // set list of excel mapping files
    const excelMappingConfigFiles = files.filter((file) => file.endsWith('mapping.json'));

    if (excelMappingConfigFiles.length) {
        p.then(() => {
            if (!excelMappingConfigFiles.length) {
                console.error(
                    'No config.mapping.json file found for excel mapping files. Please create a config.mapping.json file in the form template folder.',
                );
                return Promise.resolve();
            }
            const mappingConfig = fs.readJSONSync(`${fdFolderPath}/${excelMappingConfigFiles[0]}`);

            foldersWithExcelMappingFiles.push({
                folderPath: fdFolderPath,
                foldername: folder,
                folderHash: hash(folder),
            });

            const exporter = new formExporter.Exporter();
            return exporter.getExcelMappingFields(fdFolderPath, mappingConfig);
        })
            .then((fields) => {
                fs.writeFileSync(`${fdFolderPath}/excelMappingFields.json`, JSON.stringify(fields));
                files.push('excelMappingFields.json');
            })
            .catch((err) => {
                console.error(err);
            });
    }

    if (indexJson < 0) {
        data = {
            title: fdName,
            subtitle: fdName + ' Subtitle',
            culture: 'en-US',
            folder: folder,
            attachments: files,
            flags: {},
            area: {
                title: areaName,
            },
        };
    } else {
        try {
            data = fs.readJsonSync(`${fdFolderPath}/${files[indexJson]}`);
            data.folder = folder;
            data.area = {
                title: areaName,
            };

            if (!data.attachments || !data.attachments.length) {
                data.attachments = files;
            }
        } catch {
            console.log(`${chalk.red('Error')}, reading index.json in ${fdFolderPath}`);
        }
    }

    formDefinitionFileMap.set(folder, data);
    console.log('');
    return Promise.resolve();
}

function isNoFormDefFolder(folder, postfixes) {
    for (const postfix of postfixes) {
        if (folder.endsWith(postfix)) {
            return true;
        }
    }

    return false;
}

async function readAssetFolder(assetPath, entries, areaName = '') {
    const promises = [];
    for (const entry of entries) {
        const entryPath = `${assetPath}/${entry}`;
        const fsStat = fs.lstatSync(entryPath);

        if (!fsStat.isDirectory()) {
            continue;
        }
        const parts = entry.split('.');
        if (parts[0] === 'area') {
            parts.shift();
            const area = parts.join('.');
            const areaEntries = fs.readdirSync(entryPath);
            readAssetFolder(entryPath, areaEntries, area);
            continue;
        }

        console.log(`${chalk.blueBright('Services')}, starting reading form asset folder: ${entry}`);
        const p = pushIntoAssetFileTree(entryPath, entry);
        promises.push(p);
    }
    return Promise.all(promises);
}

async function readFormDefinitionFolder(formDefinitionPath, entries, areaName = '') {
    const promises = [];
    for (const entry of entries) {
        if (
            isNoFormDefFolder(entry, [
                '.git',
                '.vscode',
                '.template',
                '.exported',
                '.templ',
                '.tmppdfexport',
                '.sass-cache',
                'typings',
                'scripts',
                'node_modules',
                'Exported',
                'Assets',
            ])
        ) {
            continue;
        }

        const entryPath = `${formDefinitionPath}/${entry}`;
        const fsStat = fs.lstatSync(entryPath);
        if (!fsStat.isDirectory()) {
            continue;
        }

        const parts = entry.split('.');
        if (parts[0] === 'area') {
            parts.shift();
            const area = parts.join('.');
            const areaEntries = fs.readdirSync(entryPath);
            readFormDefinitionFolder(entryPath, areaEntries, area);
            continue;
        }

        if (entry === 'Customers') {
            const areaEntries = fs.readdirSync(entryPath);
            readFormDefinitionFolder(entryPath, areaEntries);
            continue;
        }

        console.log(`${chalk.blueBright('Services')}, starting reading form template folder: ${entry}`);
        const p = pushIntoFdFileTree(entryPath, entry, areaName);
        promises.push(p);
    }
    return Promise.all(promises);
}

formDev();
process.on('SIGTERM', shutDown);
process.on('SIGINT', shutDown);
