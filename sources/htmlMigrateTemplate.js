const path = require('path');
const fs = require('fs');
const { spawnSync } = require('child_process');
const yargs = require('yargs');
const { JSDOM } = require('jsdom');
const jQuery = require('jquery');
const argv = yargs
    .usage('node htmlMigrateTemplate.js <filePath> [options]')
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
let $;

const formatHtml = (contentString) => {
    const result = spawnSync('node', [path.join(__dirname, 'format-html-files.js')], { input: contentString });
    return result.stdout;
};

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

const migrateLinkedFiles = () => {
    $('link').each((_, element) => {
        if (!element.dataset.hfHref) {
            return;
        }

        $(element).attr('href', element.dataset.hfHref);
        $(element).removeAttr('data-hf-href');
    });

    $('script').each((_, element) => {
        if (!element.dataset.hfSrc) {
            return;
        }

        $(element).attr('src', element.dataset.hfSrc);
        $(element).removeAttr('data-hf-src');
    });
};

const templateMapping = {
    headerTitleTemplate: 'FormHeaderTitle',
    titleTemplate: 'FormTitle',
    listTemplate: 'FormList',
};
const migrateTitleTemplates = () => {
    for (const [oldTemplate, newTemplateId] of Object.entries(templateMapping)) {
        const $oldTemplate = $(`#${oldTemplate}`);
        if ($oldTemplate.length) {
            $oldTemplate.removeAttr('id');
            $oldTemplate.removeAttr('data-win-control');
            $oldTemplate.attr('data-hf-template', newTemplateId);
        }
    }
};

const migrateBlockTemplates = () => {
    const $blockTemplates = $('[data-win-control="WinJS.Binding.Template"]');
    $blockTemplates.each((_, element) => {
        const $element = $(element);
        $element.removeAttr('data-win-control');
        $element.attr('data-hf-block', 'hf-block');
    });
};

const replaceControlNamespaces = (contentString) => {
    return contentString.replaceAll('HFWinJSCtrl.', '');
};

const renameWinDataAtrributes = (contentString) => {
    return contentString.replaceAll('data-win-', 'data-hf-');
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
    migrateLinkedFiles();
    migrateTitleTemplates();
    migrateBlockTemplates();
    let contentString = dom.serialize();

    contentString = fixQuotsInAttributes(contentString);
    contentString = replaceControlNamespaces(contentString);
    contentString = renameWinDataAtrributes(contentString);

    const fixedContent = formatHtml(contentString);
    fs.writeFileSync(outputPath, fixedContent);
})();
