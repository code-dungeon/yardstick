"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MutationCommand = void 0;
const command_1 = require("./command");
const path = require("path");
const which = require("which");
const MUTATE_GLOB = 'src/**/*.ts';
const FILE_GLOB = 'test/unit/**/*.{coffee,js,ts}';
const REPORT_DIR = './reports/mutation';
const STRYKER_CONFIG = path.resolve(__dirname, '../config/stryker.conf.js');
const MOCHA_CONFIG = path.resolve(__dirname, '../config/mocha.conf.yml');
class MutationCommand extends command_1.YardstickCommand {
    constructor() {
        super('mutation', 'Turns on Stryker debug output', 'Logs some debug output');
        this
            .option('-c, --config [value]', 'Stryker config file path.', STRYKER_CONFIG)
            .option('--unit-config [value]', 'Mocha config path.', MOCHA_CONFIG)
            .option('--mutate-files [files]', 'Glob of source files to mutate', MUTATE_GLOB)
            .option('--test-files [files]', 'Glob of spec files for unit tests', FILE_GLOB)
            .option('--ignore-files [files]', 'Glob of filese not to include in mutation run')
            .option('--report [bool]', 'Flag indicating to generate a html coverage report', false)
            .option('--report-dir [path]', 'Directory to save the coverage report', REPORT_DIR)
            .argument('[args ...]', 'Stryker specific arguments')
            .description('Mutates files with Strkyer and then runs unit tests');
    }
    getLogLevel() {
        const debugFlag = this.getOptionValue('debug');
        const verboseFlag = this.getOptionValue('verbose');
        let logLevel = 'warn';
        if (debugFlag && verboseFlag) {
            logLevel = 'trace';
        }
        else if (debugFlag) {
            // This can be used to turn on breakpoints
            logLevel = 'debug';
        }
        else if (verboseFlag) {
            logLevel = 'info';
        }
        return ['--logLevel', logLevel];
    }
    getIgnoreFiles() {
        const filesToIgnore = this.getOptionValue('ignoreFiles');
        if (filesToIgnore !== undefined) {
            return ['--ignorePatterns', filesToIgnore];
        }
        return [];
    }
    getMutateFiles() {
        const filesToMutate = this.getOptionValue('mutateFiles');
        return ['--mutate', filesToMutate];
    }
    getReportConfig() {
        const reports = ['clear-text', 'progress'];
        if (this.getOptionValue('report')) {
            reports.push('html');
        }
        return ['--reporters', reports.join(',')];
    }
    getOptions() {
        const options = new Array();
        options.push(this.getOptionValue('config'));
        options.push(...this.getMutateFiles());
        options.push(...this.getIgnoreFiles());
        options.push(...this.getLogLevel());
        options.push(...this.getReportConfig());
        return options.join(' ');
    }
    getCommand(args) {
        const command = which.sync('stryker');
        const options = this.getOptions();
        const testFilesToRun = this.getOptionValue('testFiles');
        const mochaConfig = this.getOptionValue('unitConfig');
        const htmlReportPath = this.getOptionValue('reportDir');
        return [
            `export MOCHA_TEST_FILES="${testFilesToRun}"`,
            `export MOCHA_CONFIG_PATH="${mochaConfig}"`,
            `export HTML_REPORT_PATH="${htmlReportPath}"`,
            [command, 'run', options, ...args].join(' ')
        ].join(';');
    }
}
exports.MutationCommand = MutationCommand;
//# sourceMappingURL=mutation.js.map