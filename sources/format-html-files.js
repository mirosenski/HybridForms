const fs = require('fs');
const path = require('path');
const beautify_html = require('js-beautify').html;
const beautify_js = require('js-beautify').js;

/**
 * To test script with HTML files, set TEST to true and set TEST_FILE to the path of the HTML file.
 * Output is written to ./formatted.html
 */
const TEST = false;
// QATestForm
const TEST_FILE = path.join(
    __dirname,
    '../../../../formdefinitions/area.PolizeiRLP-SL/OWInc_Sachbeschaedigung/OnlinewacheSachbeschaedigung.html',
);

const defaultIndent = 4;

const htmlOptions = {
    indent_size: defaultIndent,
    indent_char: ' ',
    max_preserve_newlines: '1',
    preserve_newlines: true,
    keep_array_indentation: false,
    break_chained_methods: false,
    indent_scripts: 'normal',
    brace_style: 'collapse',
    space_before_conditional: true,
    unescape_strings: false,
    jslint_happy: false,
    end_with_newline: false,
    wrap_line_length: '0',
    indent_inner_html: false,
    comma_first: false,
    e4x: false,
    indent_empty_lines: false,
    wrap_attributes: 'force',
    templating: ['handlebars', 'auto'],
};

const jsonOptions = {
    indent_size: defaultIndent,
    indent_char: ' ',
    max_preserve_newlines: '-1',
    preserve_newlines: false,
    keep_array_indentation: false,
    break_chained_methods: false,
    indent_scripts: 'keep',
    brace_style: 'collapse',
    space_before_conditional: true,
    unescape_strings: false,
    jslint_happy: false,
    end_with_newline: false,
    wrap_line_length: '0',
    indent_inner_html: false,
    comma_first: false,
    e4x: false,
    indent_empty_lines: false,
    templating: ['handlebars', 'auto'],
};

const arrayOptions = {
    indent_size: defaultIndent,
    indent_char: ' ',
    max_preserve_newlines: '1',
    preserve_newlines: true,
    keep_array_indentation: false,
    break_chained_methods: false,
    indent_scripts: 'keep',
    brace_style: 'collapse',
    space_before_conditional: true,
    unescape_strings: false,
    jslint_happy: false,
    end_with_newline: false,
    wrap_line_length: '1',
    indent_inner_html: false,
    comma_first: false,
    e4x: false,
    indent_empty_lines: false,
    templating: ['handlebars', 'auto'],
};

const ignoreTrailingComma = [',', '{', '['];

/**
 * It takes a string, finds all the JSON strings in it, and formats them
 * @param text - The text to be formatted.
 * @param regexString - The regex string to use to find the JSON.
 * @returns The text with the JSON formatted.
 */
const formatJson = (text, regexString, addTrailingComma) => {
    let regex = new RegExp(regexString, 'gm');
    const matches = text.match(regex);

    if (matches && matches.length) {
        for (let i = 0; i < matches.length; i++) {
            regex = new RegExp(regexString, 'gm');
            const exec = regex.exec(matches[i]);

            const dataDefinition = exec[1];
            const attrName = exec[2];
            const json = exec[3];
            const endQuote = exec[4];

            const jsonFormatted = beautify_js(json, jsonOptions);
            const jsonLines = jsonFormatted.split('\n');

            let inLineWithTag = false;
            let indentCount = 0;

            for (let index = 0; index < dataDefinition.length; index++) {
                if (dataDefinition[index] === ' ') {
                    indentCount += 1;
                    continue;
                }

                if (dataDefinition[index] === '<') {
                    inLineWithTag = true;
                    break;
                }
            }

            const indent = ' '.repeat(indentCount);
            const lines = jsonLines.map((line, index) => {
                if (!index) {
                    return line;
                }

                if (
                    index === jsonLines.length - 1 ||
                    !addTrailingComma ||
                    ignoreTrailingComma.includes(line[line.length - 1])
                ) {
                    return indent + line;
                }

                return indent + line + ',';
            });

            lines[0] = `${inLineWithTag ? dataDefinition : indent}${attrName}${lines[0]}`;
            lines[lines.length - 1] = `${lines[lines.length - 1]}${endQuote}`;
            const linesString = lines.join('\n');

            const replacer = () => {
                return linesString;
            };
            text = text.replace(matches[i], replacer);
        }
    }

    return text;
};

/**
 * It takes a string, finds all the Array strings in it, and formats them
 * @param text - The text to be formatted.
 * @param regexString - The regex string to use to find the Array.
 * @returns The text with the JSON formatted.
 */
const formatArray = (text, regexString) => {
    let regex = new RegExp(regexString, 'gm');
    const matches = text.match(regex);

    if (matches && matches.length) {
        for (let i = 0; i < matches.length; i++) {
            regex = new RegExp(regexString, 'gm');
            const exec = regex.exec(matches[i]);

            const dataDefinition = exec[1];
            const attrName = exec[2];
            const json = exec[3];
            const endQuote = exec[4];

            const jsonFormatted = beautify_js(json, arrayOptions);
            const jsonLines = jsonFormatted.split('\n');

            let inLineWithTag = false;
            let indentCount = 0;

            for (let index = 0; index < dataDefinition.length; index++) {
                if (dataDefinition[index] === ' ') {
                    indentCount += 1;
                    continue;
                }

                if (dataDefinition[index] === '<') {
                    inLineWithTag = true;
                    break;
                }
            }

            const indent = ' '.repeat(indentCount);
            const lines = jsonLines.map((line, index) => {
                if (index) {
                    return indent + line;
                }
                return line;
            });

            lines[0] = `${inLineWithTag ? dataDefinition : indent}${attrName}${lines[0]}`;
            lines[lines.length - 1] = `${lines[lines.length - 1]}${endQuote}`;
            const linesString = lines.join('\n');

            const replacer = () => {
                return linesString;
            };
            text = text.replace(matches[i], replacer);
        }
    }

    return text;
};

const addHashToBlocks = (text) => {
    const regex = new RegExp('<form>[\\s\\S]*</form>', 'gm');
    const matches = text.match(regex);

    if (matches && matches.length) {
        const fixedBlocks = matches[0].replace(/<a.*[\s]*href="([^#]*?)"/gm, (match, p1) => {
            return `<a href="#${p1}"`;
        });

        text = text.replace(matches[0], fixedBlocks);
    }

    return text;
};

let commentsMatches = null;

const removeHtmlComments = (text) => {
    const commentsRegexString = '<!--([\\s\\S]*?)-->';
    const commentsRegex = new RegExp(commentsRegexString, 'gm');
    commentsMatches = text.match(commentsRegex);

    if (commentsMatches && commentsMatches.length) {
        for (let i = 0; i < commentsMatches.length; i++) {
            text = text.replace(commentsMatches[i], `<!-- {${i}} -->`);
        }
    }

    return text;
};

const restoreHtmlComments = (text) => {
    if (commentsMatches && commentsMatches.length) {
        const commentPlaceholder = '<!-- {(\\d*?)} -->';
        let commentPlaceholderRegex = new RegExp(commentPlaceholder, 'gm');
        const commentPlaceholderMatches = text.match(commentPlaceholderRegex);

        for (let i = 0; i < commentPlaceholderMatches.length; i++) {
            commentPlaceholderRegex = new RegExp(commentPlaceholder, 'gm');
            const exec = commentPlaceholderRegex.exec(commentPlaceholderMatches[i]);
            const commentIndex = Number(exec[1]);

            const replacer = () => {
                return commentsMatches[commentIndex];
            };
            text = text.replace(commentPlaceholderMatches[i], replacer);
        }
    }

    return text;
};

(function () {
    let errorString = '';
    let testFile = 0;
    if (TEST) {
        testFile = TEST_FILE;
    }
    const textBuffer = fs.readFileSync(testFile);
    let text = textBuffer.toString();

    // add hash to block definition
    try {
        text = addHashToBlocks(text);
    } catch (error) {
        errorString += `[ERROR]: add hash to block\n${error}\n`;
    }

    // format HTML
    try {
        text = beautify_html(text, htmlOptions);
    } catch (error) {
        errorString += `[ERROR]: beautify HTML\n${error}\n`;
    }

    // remove Comments
    try {
        text = removeHtmlComments(text);
    } catch (error) {
        errorString += `[ERROR]: remove Comments\n${error}\n`;
    }

    // format JSON
    const jsonAttributeRegexString = "([ \\S]*?)([\\S]+=')[\\s]*([{|[][\\s\\S]*?)[\\s]*(')";
    try {
        text = formatJson(text, jsonAttributeRegexString);
    } catch (error) {
        errorString += `[ERROR]: format JSON\n${error}\n`;
    }

    // format Options
    const optionsRegexString = '( *)(data-win-options=")[\\s]*([\\s\\S]*?)[\\s]*(")';
    try {
        text = formatJson(text, optionsRegexString);
    } catch (error) {
        errorString += `[ERROR]: format Options\n${error}\n`;
    }

    // format Options
    const includeFilesRegexString = '( *)(data-include-files=")[\\s]*([\\s\\S]*?)[\\s]*(")';
    try {
        text = formatArray(text, includeFilesRegexString);
    } catch (error) {
        errorString += `[ERROR]: format include files\n${error}\n`;
    }

    // restore Comments
    try {
        text = restoreHtmlComments(text);
    } catch (error) {
        errorString += `[ERROR]: restore Comments\n${error}\n`;
    }

    if (errorString) {
        const logFile = path.join(__dirname, './format-html-files.log');
        fs.writeFileSync(logFile, errorString);
    }

    if (TEST) {
        const formattedFile = path.join(__dirname, '../formatted.html');
        fs.writeFileSync(formattedFile, text);
        return;
    }
    process.stdout.write(text);
})();
