"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BddCommand = void 0;
const command_1 = require("./command");
const path = require("path");
const which = require("which");
const STEPDEF_GLOB = 'test/bdd/**/*.{coffee,js,ts}';
const FEATURE_GLOB = 'test/bdd/**/*.feature';
class BddCommand extends command_1.YardstickCommand {
    constructor() {
        super('bdd', 'Enabled breakpoints to unit tests', 'Logs some debug output');
        this
            .option('-f, --files [files]', 'List of extra files to include')
            .option('--steps [files]', 'Glob of step files', STEPDEF_GLOB)
            .option('--features [files]', 'Glob of feature files', FEATURE_GLOB)
            .option('-w, --watch', 'Will run tests, watching for any source or test file changes')
            .argument('[args ...]', 'Cucumber specific arguments')
            .description('Runs bdd tests with the Cucumber-JS framework');
    }
    getExtraFileIncludes() {
        const filesConfig = this.getOptionValue('files');
        const options = new Array();
        if (filesConfig === undefined) {
            return options;
        }
        const files = filesConfig.split(',');
        const { length } = files;
        for (let i = 0; i < length; ++i) {
            const file = files[i];
            options.push('--require', file);
        }
        return options;
    }
    getCucumberOptions() {
        return [
            '--require',
            path.join(__dirname, '../../config/globals.js'),
            '--require',
            this.getOptionValue('steps')
        ];
    }
    getOptions() {
        const options = new Array();
        options.push(...this.getExtraFileIncludes());
        options.push(...this.getCucumberOptions());
        return options.join(' ');
    }
    getCommand(args) {
        const command = which.sync('cucumber-js');
        const options = this.getOptions();
        const features = this.getOptionValue('features');
        return [
            command,
            options,
            features,
            ...args
        ].join(' ');
    }
}
exports.BddCommand = BddCommand;
//# sourceMappingURL=bdd.js.map