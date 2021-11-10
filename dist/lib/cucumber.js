"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCucumberCommand = exports.cucumber = void 0;
const program_1 = require("./program");
const path = require("path");
const shell = require("shelljs");
const which = require("which");
const STEPDEF_GLOB = ['test/bdd/**/*.{coffee,js,ts}'];
const FEATURE_GLOB = ['test/bdd/**/*.feature'];
// const command: Command = createCommand('unit')
//   .option('-c, --config [value]', 'Config file path for running unit tests in mocha', MOCHA_CONFIG)
//   .option('-t, --test [files]', 'Glob of spec files for unit tests', FILE_GLOB )
//   .option('-w, --watch', 'Will run tests, watching for any source or test file changes')
//   .option('--verbose', 'Logs some debug output')
//   .option('--debug', 'Enabled breakpoints to unit tests')
//   .argument('[args ...]', 'Mocha specific arguments')
//   .description('Runs unit tests in the mocha framework')
//   .action(action);
function getCucumberTranspilerOpts(opts) {
    const filesToRequire = (0, program_1.getFiles)('test', STEPDEF_GLOB);
    opts.push('--require', path.join(__dirname, '../../config/globals.js'));
    opts.push('--require', filesToRequire);
}
function getCucumberOpts() {
    const opts = [];
    getCucumberTranspilerOpts(opts);
    return opts.join(' ');
}
function action(args) {
    const cucumberAction = getCucumberCommand(args);
    (0, program_1.log)(cucumberAction);
    shell.exit(shell.exec(cucumberAction).code);
}
function getCucumberCommand(args) {
    const command = which.sync('cucumber-js');
    const configOpts = getCucumberOpts();
    const featuresArg = (0, program_1.getFiles)('source', FEATURE_GLOB);
    return `${command} ${configOpts} ${featuresArg} ${args.join(' ')}`;
}
exports.getCucumberCommand = getCucumberCommand;
function cucumber() {
    program_1.program.command('cucumber [args...]')
        .action(action);
}
exports.cucumber = cucumber;
//# sourceMappingURL=cucumber.js.map