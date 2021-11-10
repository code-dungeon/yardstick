"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnitCommand = void 0;
const command_1 = require("./command");
const path = require("path");
const which = require("which");
const FILE_GLOB = 'test/unit/**/*.{coffee,js,ts}';
const MOCHA_CONFIG = path.resolve(__dirname, '../config/mocha.conf.yml');
class UnitCommand extends command_1.YardstickCommand {
    constructor(name = 'unit') {
        super(name, 'Enabled breakpoints to unit tests', 'Logs some debug output');
        this
            .option('-c, --config [value]', 'Config file path for running unit tests in mocha', MOCHA_CONFIG)
            .option('--test-files [files]', 'Glob of spec files for unit tests', FILE_GLOB)
            .option('-w, --watch', 'Will run tests, watching for any source or test file changes')
            .argument('[args ...]', 'Mocha specific arguments')
            .description('Runs unit tests in the Mocha framework');
    }
    getMochaConfig() {
        const config = this.getOptionValue('config');
        const options = new Array();
        if (config === MOCHA_CONFIG) {
            options.push('--require', path.join(__dirname, '../config/globals.js'));
        }
        options.push('--config', config);
        return options;
    }
    getWatchConfig() {
        if (this.getOptionValue('watch')) {
            return ['--watch', '--watch-extensions ts,js,coffee'];
        }
        return [];
    }
    getDebugConfig() {
        if (this.getOptionValue('debug')) {
            return ['--inspect-brk'];
        }
        return [];
    }
    getOptions() {
        const options = new Array();
        options.push(...this.getMochaConfig());
        options.push(...this.getWatchConfig());
        options.push(...this.getDebugConfig());
        options.push(this.getOptionValue('testFiles'));
        return options.join(' ');
    }
    getCommand(args) {
        const command = which.sync('mocha');
        const options = this.getOptions();
        return [command, '--color', options, ...args].join(' ');
    }
}
exports.UnitCommand = UnitCommand;
//# sourceMappingURL=unit.js.map