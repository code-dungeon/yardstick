"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFiles = exports.program = exports.log = void 0;
const commander_1 = require("commander");
Object.defineProperty(exports, "program", { enumerable: true, get: function () { return commander_1.program; } });
const _console = console;
const logger = _console.log;
function log(...args) {
    if (commander_1.program.getOptionValue('verbose')) {
        logger('args:', ...args);
    }
}
exports.log = log;
function getFiles(type, glob) {
    let files = commander_1.program.getOptionValue(type);
    if (files === undefined) {
        files = glob.join(',');
    }
    return files;
}
exports.getFiles = getFiles;
commander_1.program
    .option('--debug', 'Debug on (Local running')
    .option('--verbose', 'Logs some debug output')
    .option('-s, --source <files>', 'Glob of source files for unit or mutation tesets and feature files for bdd tests')
    .option('-t, --test <files>', 'Glob of test files to run. This will be the spec files for unit or mutation tests, and the step defs for bdd tests.');
//# sourceMappingURL=program.js.map