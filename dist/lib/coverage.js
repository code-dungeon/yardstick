"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoverageCommand = void 0;
const unit_1 = require("./unit");
const which = require("which");
const shell = require("shelljs");
const SOURCE_GLOB = 'src/**/*.ts';
const REPORT_DIR = './reports/unit-coverage';
class CoverageCommand extends unit_1.UnitCommand {
    constructor() {
        super('coverage');
        this
            .option('--source-files [files]', 'Glob of source file to run a coverage report for', SOURCE_GLOB)
            .option('--check-coverage [bool]', 'Verifies coverage is within thresholds', false)
            .option('--lines [number]', 'Percentage of lines that must have coder coverage', '80')
            .option('--functions [number]', 'Percentage of functions that must have coder coverage', '80')
            .option('--branches [number]', 'Percentage of branches that must have coder coverage', '80')
            .option('--report [bool]', 'Flag indicating to generate a html coverage report', false)
            .option('--report-dir [path]', 'Directory to save the coverage report', REPORT_DIR)
            .description('Runs code coverage for unit tets');
    }
    getSourceFiles() {
        return ['--include', this.getOptionValue('sourceFiles')];
    }
    getReportConfig() {
        const options = ['--reporter-lcov', '--reporter=text-summary'];
        if (this.getOptionValue('report') !== false) {
            options.push('--report-dir', this.getOptionValue('reportDir'), '--reporter=html');
        }
        return options;
    }
    getCheckCoverage() {
        if (this.getOptionValue('checkCoverage') === false) {
            return [];
        }
        return [
            '--check-coverage',
            '--lines', this.getOptionValue('lines'),
            '--functions', this.getOptionValue('functions'),
            '--branches', this.getOptionValue('branches')
        ];
    }
    getCoverageOptions() {
        const options = new Array();
        options.push(...this.getSourceFiles());
        options.push(...this.getReportConfig());
        options.push('--all');
        options.push(...this.getCheckCoverage());
        options.push('--extension .ts', '--extension .js', '--extension .coffee');
        return options.join(' ');
    }
    getCommand(args) {
        const command = which.sync('nyc');
        const options = this.getCoverageOptions();
        return [command, options, super.getCommand(args)].join(' ');
    }
    cleanup() {
        shell.exec('rm -rf .nyc_output');
    }
}
exports.CoverageCommand = CoverageCommand;
//# sourceMappingURL=coverage.js.map