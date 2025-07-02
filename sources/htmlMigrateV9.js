const path = require('path');
const fs = require('fs');
const { spawnSync } = require('child_process');
const yargs = require('yargs');
const { JSDOM } = require('jsdom');
const jQuery = require('jquery');
const argv = yargs
    .usage('node htmlMigrateV9.js <filePath> [options]')
    .command('* <filePath>', 'parse and convert the input file', (builder) => {
        builder.positional('filePath', {
            describe: 'the HTML file to be parsed and converted',
        });
    })
    .option('debug', {
        alias: 'd',
        type: 'boolean',
        description: 'Run with debug logging',
    }).argv;

const outputPath = argv.debug ? path.join(__dirname, 'debug-output.html') : argv.filePath;
const stats = {
    checkBoxValues: 0,
    radioValues: 0,
    disabledOptions: 0,
    displayNone: 0,
};
let $;

const fileEncodingHasBOM = (filePath) => {
    const byteOrderMark = Buffer.alloc(5, 0); // Generate an empty BOM.
    const fileDescriptor = fs.openSync(filePath, 'r');
    fs.readSync(fileDescriptor, byteOrderMark, 0, 5, 0);
    fs.closeSync(fileDescriptor);

    if (byteOrderMark[0] === 0xef && byteOrderMark[1] === 0xbb && byteOrderMark[2] === 0xbf) {
        return true;
    }

    return false;
};

const initializeJsdom = (fileContent) => {
    if (fileEncodingHasBOM(argv.filePath)) {
        fileContent = fileContent.slice(3);
    }
    const dom = new JSDOM(Buffer.from(fileContent.toString(), 'utf8').toString());

    global['window'] = dom.window;
    global['document'] = dom.window.document;
    global['$'] = jQuery(dom.window);
    $ = global['$'];

    return dom;
};

const addMissingValueToRadioBox = () => {
    const foundRadiosWithoutValue = [];
    const $radiosWithoutValues = $('[data-win-control="HFWinJSCtrl.RadioBox"]:not([value])');
    $radiosWithoutValues.each((_, element) => {
        foundRadiosWithoutValue.push(element.id);
        const $element = $(element);
        $element.attr('value', 'selected');
        stats.radioValues++;
    });
    if (argv.debug) {
        console.log('Found RadioBoxes without value attribute:');
        const massageString = foundRadiosWithoutValue.length ? foundRadiosWithoutValue.join(', ') : 'None';
        console.log(massageString + '\n');
    }
};

const addMissingValueToCheckBox = () => {
    const foundRadiosWithoutValue = [];
    const $radiosWithoutValues = $('[data-win-control="HFWinJSCtrl.CheckBox"]:not([value])');
    $radiosWithoutValues.each((_, element) => {
        foundRadiosWithoutValue.push(element.id);
        const $element = $(element);
        $element.attr('value', 'selected');
        stats.checkBoxValues++;
    });
    if (argv.debug) {
        console.log('Found CheckBoxes without value attribute:');
        const massageString = foundRadiosWithoutValue.length ? foundRadiosWithoutValue.join(', ') : 'None';
        console.log(massageString + '\n');
    }
};

const replaceDisabledAttributes = () => {
    const foundDisabled = [];
    const $oldDisabled = $('[disabled]');
    $oldDisabled.each((_, element) => {
        foundDisabled.push(element.id);
        const $element = $(element);
        $element.removeAttr('disabled');
        $element.removeAttr('readonly');

        const winOptions = $element.data('winOptions');
        stats.disabledOptions++;

        if (!winOptions) {
            $element.attr('data-win-options', '{ disabled: true }');
            return;
        }
        const winOptionsLines = winOptions.split('\n');
        const indent = winOptionsLines[1].match(/^\s*/)[0];
        winOptionsLines.splice(1, 0, `${indent}disabled: true,`);
        $element.attr('data-win-options', winOptionsLines.join('\n'));
    });
    if (argv.debug) {
        console.log('Found disabled attributes:');
        const massageString = foundDisabled.length ? foundDisabled.join(', ') : 'None';
        console.log(massageString + '\n');
    }
};

const replaceDisplayNoneStyles = () => {
    const foundStyles = [];
    const $styleAttributes = $('[style]');
    $styleAttributes.each((_, element) => {
        const $element = $(element);

        if (
            $element.parents('#listTemplate').length ||
            $element.parents('#titleTemplate').length ||
            $element.parents('#headerTitleTemplate').length
        ) {
            return;
        }

        let style = $element.attr('style');
        const regesString = 'display:[\\s]*none[;]*';
        const regex = new RegExp(regesString, 'gm');
        const matches = style.match(regex);
        if (matches && matches.length) {
            foundStyles.push(element.id);
            style = style.replace(regex, '');
            stats.displayNone++;

            if (!style.trim()) {
                $element.removeAttr('style');
            } else {
                $element.attr('style', style);
            }

            $element.addClass('hf-hide');
        }
    });
    if (argv.debug) {
        console.log('Found display:none in style attributes:');
        const massageString = foundStyles.length ? foundStyles.join(', ') : 'None';
        console.log(massageString + '\n');
    }
};

const fixQuotsInAttributes = (contentString) => {
    const foundQuots = [];
    const regexString = '( *)([\\S]*)="([\\s\\S]*?)"';
    const conditionRegex = new RegExp(regexString, 'gm');
    const matches = contentString.match(conditionRegex);

    if (matches && matches.length) {
        for (let i = 0; i < matches.length; i++) {
            const regex = new RegExp(regexString, 'gm');
            const exec = regex.exec(matches[i]);

            const indent = exec[1];
            const attribute = exec[2];
            let content = exec[3];

            if (
                (!content.includes('&quot;') && attribute !== 'data-hf-condition') ||
                attribute === 'data-win-options' ||
                attribute === 'data-hf-options'
            ) {
                continue;
            }

            foundQuots.push(attribute);
            content = content.replace(/&quot;/g, '"');
            const newContent = `${indent}${attribute}='${content}'`;
            contentString = contentString.replace(matches[i], newContent);
        }
    }
    if (argv.debug) {
        const amount = foundQuots.length ? foundQuots.length : 'None';
        console.log('Found "&quot;" in attributes: ' + amount + '\n');
    }

    return contentString;
};

const formatHtml = (contentString) => {
    const result = spawnSync('node', [path.join(__dirname, 'format-html-files.js')], { input: contentString });
    return result.stdout;
};

(function () {
    if (!fs.existsSync(argv.filePath)) {
        console.log('File does not exist');
        process.exit(1);
    }

    if (!fs.lstatSync(argv.filePath).isFile()) {
        console.log('Path is not a file');
        process.exit(1);
    }

    const ext = path.extname(argv.filePath);
    if (ext !== '.html') {
        console.log('File is not html');
        process.exit(1);
    }

    const fileContent = fs.readFileSync(argv.filePath, 'utf8');
    const formattedContent = formatHtml(fileContent);

    const dom = initializeJsdom(formattedContent);

    addMissingValueToRadioBox();

    addMissingValueToCheckBox();

    replaceDisabledAttributes();

    replaceDisplayNoneStyles();

    let contentString = dom.serialize();

    contentString = fixQuotsInAttributes(contentString);

    const fixedContent = formatHtml(contentString);
    fs.writeFileSync(outputPath, fixedContent);
    console.log(
        `Added ${stats.radioValues} radio values, Added ${stats.checkBoxValues} checkbox values, replaced ${stats.disabledOptions} disabled attributes and ${stats.displayNone} display none sytles.`,
    );
})();
