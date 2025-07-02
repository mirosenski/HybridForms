const fs = require('fs');
const path = require('path');
const yargs = require('yargs');
const jsonDiff = require('json-diff');
const hybridforms = require('hybridforms');

const argv = yargs
    .usage('node translationCompare.js <sourceFile> <compareFile> [options]')
    .command('* <sourceFile> <compareFile>', 'compare translation.xlsx files and get diff output', (builder) => {
        builder
            .positional('sourceFile', {
                describe: 'Path to source translation file',
            })
            .positional('compareFile', {
                describe: 'Path to compare translation file',
            })
            .option('outFile', {
                type: 'string',
                description: 'Save output to JSON file',
            });
    }).argv;

const argumentCheck = () => {
    const filePaths = ['sourceFile', 'compareFile'];

    for (const filePath of filePaths) {
        if (!fs.existsSync(argv[filePath])) {
            console.error('File does not exist');
            process.exit(1);
        }

        if (!fs.lstatSync(argv[filePath]).isFile()) {
            console.error('Path is not a file');
            process.exit(1);
        }

        const ext = path.extname(argv[filePath]);
        if (ext !== '.xlsx') {
            console.error('File is not Excel');
            process.exit(1);
        }
    }
};

const run = async () => {
    argumentCheck();

    try {
        const sourceBuffer = await hybridforms.translation(argv.sourceFile);
        const sourceFile = JSON.parse(sourceBuffer.toString());

        const compareBuffer = await hybridforms.translation(argv.compareFile);
        const compareFile = JSON.parse(compareBuffer.toString());

        const diffString = jsonDiff.diffString(sourceFile, compareFile, {
            excludeKeys: 'metadata',
        });
        console.log(diffString);

        if (!argv.outFile) {
            return;
        }

        const diff = jsonDiff.diff(sourceFile, compareFile, {
            excludeKeys: 'metadata',
        });
        fs.writeFileSync(argv.outFile, JSON.stringify(diff, null, 4));
    } catch {
        console.error('Compare failed!');
        process.exit(1);
    }
};

run();
