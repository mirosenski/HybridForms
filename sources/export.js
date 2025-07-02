const yargs = require('yargs');
const formExporter = require('hf-formdefexporter');
const defaultOutputFolder = './export';
const argv = yargs
    .option('formDefPath', {
        describe: 'Relative path to the FormDefinition folder.',
        type: 'string',
    })
    .option('outputPath', {
        describe: 'Relative path to the Output folder.',
        type: 'string',
    })
    .option('outputPostfix', {
        describe: 'Append custom postfix to exported folder name.',
        type: 'string',
    })
    .option('buildVersion', {
        describe: 'Set the build version the form template is build with',
        type: 'string',
    })
    .option('switch', {
        describe: 'Define which placeholder from the placeholder.json should be used.',
        type: 'string',
    })
    .option('updateVersionDate', {
        describe: 'Update the Date property on the Form version tag.',
        default: 'true',
        type: 'string',
    })
    .option('templateVersion', {
        describe:
            'Update the version property on the Form version tag. Allowed values are semver version (1.0.0), major, minor, patch',
        type: 'string',
    })
    .option('compileFiles', {
        describe: 'Compile TypeScript and SASS files.',
        default: 'true',
        type: 'string',
    })
    .option('formatHtml', {
        describe: 'Format HTML file after processing.',
        default: 'true',
        type: 'string',
    })
    .option('includeReplacableFiles', {
        describe: 'Exclude files from export. Provide a comma seperated string of filenames.',
        type: 'string',
    })
    .option('excludeFiles', {
        describe: 'Exclude files from export. Provide a comma seperated string or regular expression.',
        type: 'string',
    })
    .option('mapExcelFields', {
        describe: 'Map excel fields properties to form fields.',
        type: 'string',
        default: 'false',
    })
    .option('mapExcelFilesPath', {
        describe: 'Map excel fields properties to form fields.',
        type: 'string',
        default: 'false',
    })
    .option('mapExcelFieldNames', {
        describe: 'Provide the field names that should be mapped. Provide a comma seperated string.',
        type: 'string',
    })
    .option('mapExcelColumnNames', {
        describe: 'The id of the excel columns that should be mapped. Provide a comma seperated string.',
        type: 'string',
    })
    .option('mapExcelColumnNames', {
        describe: 'The id of the excel columns that should be mapped. Provide a comma seperated string.',
        type: 'string',
    })
    .option('mapExcelIdColumName', {
        describe: 'The name of the excel column that should be used as id. Provide a string.',
        type: 'string',
    })
    .option('mapExcelStartRow', {
        describe: 'The row where the mapping should start. Provide a number.',
        type: 'string',
    })
    .option('mapExcelWorksheetName', {
        describe: 'The name of the worksheet that should be used. Provide a string.',
        type: 'string',
    }).argv;

let formDefPath;
let outputFolder;
let excludeFiles;
let includeReplacableFiles;

/* get formDev Path */
if (typeof argv.formDefPath === 'undefined') {
    console.error('No formdefinition folder path. Please provide a relative path to the formdefinition.');
    process.exit(0);
} else {
    formDefPath = argv.formDefPath;
}

outputFolder = argv.outputPath ? argv.outputPath : defaultOutputFolder;
const outputPostfix = argv.outputPostfix ? argv.outputPostfix : '';

if (outputFolder.lastIndexOf('/') === outputFolder.length - 1) {
    outputFolder = outputFolder.substr(0, outputFolder.length - 1);
}

if (formDefPath.lastIndexOf('/') === formDefPath.length - 1) {
    formDefPath = formDefPath.substr(0, formDefPath.length - 1);
}
const buildVersion = argv.buildVersion ? argv.buildVersion : '0.0.1';

const updateVersionDate = argv.updateVersionDate ? argv.updateVersionDate === 'true' : true;
const templateVersion = argv.templateVersion ? argv.templateVersion : '';

// check if outputFolder is the same as the formDefPath,
// if so and no outputPostfix is defined the export would overwrite the source Folder -> very bad!
if (typeof argv.outputPath !== 'undefined' && outputPostfix === '') {
    const lastIdx = formDefPath.lastIndexOf('/');
    const formDefFolder = formDefPath.substring(0, lastIdx);
    if (formDefFolder === outputFolder) {
        console.error(
            'Output folder and formdefinition folder are set to the same location while no output postfix is provided. This will delete all source files. Please provide another output folder or provide an output postfix.',
        );
        process.exit(0);
    }
}

if (typeof argv.excludeFiles !== 'undefined') {
    excludeFiles = argv.excludeFiles.split(',');
}

if (typeof argv.includeReplacableFiles !== 'undefined') {
    includeReplacableFiles = argv.includeReplacableFiles.split(',');
}

// map excel fields
let mapExcelFieldsConfig = null;
const mapExcelFields = argv.mapExcelFields === 'true';
if (mapExcelFields) {
    if (argv.mapExcelFieldNames) {
        // if mapExcelFieldNames are provides the other options are required
        // check if all required options are set

        if (!argv.mapExcelColumnNames) {
            console.error(
                'MapExcelFields option is set to true but field column names are provided. Please provide a comma seperated string with column names.',
            );
            process.exit(0);
        }

        if (!argv.mapExcelIdColumName) {
            console.error('MapExcelFields option is set to true but no id column is provided.');
            process.exit(0);
        }

        if (!argv.mapExcelWorksheetName) {
            console.error('MapExcelFields option is set to true but no worksheet  name is provided.');
            process.exit(0);
        }

        const fieldNames = argv.mapExcelFieldNames.split(',');
        const columnNames = argv.mapExcelColumnNames.split(',');
        if (fieldNames.length !== columnNames.length) {
            console.error(
                'MapExcelFields option is set to true but the number of field names and column names are not equal.',
            );
            process.exit(0);
        }

        const fieldsToMap = [];
        fieldNames.forEach((fieldName, idx) => {
            fieldsToMap.push({
                fieldName,
                columnName: columnNames[idx],
            });
        });

        mapExcelFieldsConfig = {
            fieldsToMap,
            idColumn: {
                name: argv.mapExcelIdColumName,
                startRow: argv.mapExcelStartRow ? argv.mapExcelStartRow : 2,
            },
            mapExcelFilesPath: argv.mapExcelFilesPath ? argv.mapExcelFilesPath : './',
            worksheetName: argv.mapExcelWorksheetName,
        };
    }
}

const switchMode = argv.switch ? argv.switch : null;
const compileFiles = argv.compileFiles === 'false' ? false : true;
console.log('compileFiles: ' + compileFiles);
const formatHtml = argv.formatHtml === 'false' ? false : true;
console.log('formatHtml: ' + formatHtml);

const exporter = new formExporter.Exporter();
const options = {
    formDefPath,
    outputFolder,
    outputPostfix,
    switchMode,
    updateVersionDate,
    templateVersion,
    compileFiles,
    formatHtml,
    includeReplacableFiles,
    excludeFiles,
    mapExcelFields,
    mapExcelFieldsConfig,
    buildVersion,
};

async function runExporter() {
    try {
        await exporter.start(options);
        console.log('Exporter finished successfully');
        process.exit(0); // Exit with success code
    } catch (error) {
        console.error('An error occurred during export:', error);
        process.exit(1); // Exit with error code
    }
}

runExporter();
