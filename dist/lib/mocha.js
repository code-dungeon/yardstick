"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMochaCommand = exports.mocha = void 0;
const program_1 = require("./program");
const path = require("path");
const shell = require("shelljs");
const which = require("which");
const FILE_GLOB = ['test/unit/**/*.{coffee,js,ts}'];
const MOCHA_CONFIG = path.resolve(__dirname, '../config/mocha.conf.yml');
function getMochaOptsPath(opts) {
    const config = program_1.program.getOptionValue('config');
    if (config === MOCHA_CONFIG) {
        opts.push('--require', path.join(__dirname, '../config/globals.js'));
    }
    opts.push('--config', config);
}
function getMochaWatchOpts(opts) {
    if (program_1.program.getOptionValue('watch')) {
        opts.push('--watch', '--watch-extensions ts,js,coffee');
    }
    if (program_1.program.getOptionValue('debug')) {
        opts.push('--inspect-brk');
    }
}
function getMochaOpts() {
    const opts = [];
    getMochaOptsPath(opts);
    getMochaWatchOpts(opts);
    return opts.join(' ');
}
function action(args) {
    const mochaAction = getMochaCommand(args);
    (0, program_1.log)(mochaAction);
    shell.exit(shell.exec(mochaAction).code);
}
function getMochaCommand(args) {
    const mochaCommand = which.sync('mocha');
    const configOpts = getMochaOpts();
    const testsToRun = (0, program_1.getFiles)('test', FILE_GLOB);
    return `${mochaCommand} --color ${configOpts} ${args.join(' ')} ${testsToRun}`;
}
exports.getMochaCommand = getMochaCommand;
function mocha() {
    program_1.program
        .command('unit')
        .option('-c, --config [value]', 'Config file path for running unit tests in mocha.', MOCHA_CONFIG)
        .option('-w, --watch', 'Will run tests, watching for any source or test file changes')
        .option('-v, --verbose', 'Logs some debug output')
        .argument('[args ...]', 'Mocha specific arguments')
        .description('Runs unit tests in the mocha framework')
        .action(action);
}
exports.mocha = mocha;
//# sourceMappingURL=mocha.js.map