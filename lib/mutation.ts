import { YardstickCommand } from './command';
import * as path from 'path';
import * as which from 'which';
import * as glob from 'glob';

const MUTATE_GLOB: string = 'src/**/*.ts';
const FILE_GLOB: string = 'test/unit/**/*.{coffee,js,ts}';
const REPORT_DIR: string = './reports/mutation';
const STRYKER_CONFIG: string = path.resolve(__dirname, '../config/stryker.conf.js');
const MOCHA_CONFIG: string = path.resolve(__dirname, '../config/mocha.conf.yml');

export class MutationCommand extends YardstickCommand {
  public constructor() {
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

  private getLogLevel(): Array<string> {
    const debugFlag: boolean = this.getOptionValue('debug');
    const verboseFlag: boolean = this.getOptionValue('verbose');
    let logLevel: string = 'warn';
    if (debugFlag && verboseFlag) {
      logLevel = 'trace';
    } else if (debugFlag) {
      // This can be used to turn on breakpoints
      logLevel = 'debug';
    } else if (verboseFlag) {
      logLevel = 'info';
    }

    return ['--logLevel', logLevel];
  }

  private getIgnoreFiles(): Array<string> {
    const filesToIgnore: string = this.getOptionValue('ignoreFiles');

    if (filesToIgnore !== undefined) {
      return ['--ignorePatterns', filesToIgnore];
    }

    return [];
  }

  private getMutateFiles(): Array<string> {
    const files: Array<string> = glob.sync(this.getOptionValue('mutateFiles'));
    return ['--mutate', files.join(' ')];
  }

  private getReportConfig(): Array<string> {
    const reports: Array<string> = ['clear-text', 'progress'];

    if (this.getOptionValue('report')) {
      reports.push('html');
    }

    return ['--reporters', reports.join(',')];
  }

  private getOptions(): string {
    const options: Array<string> = new Array();

    options.push(this.getOptionValue('config'));
    options.push(...this.getMutateFiles());
    options.push(...this.getIgnoreFiles());
    options.push(...this.getLogLevel());
    options.push(...this.getReportConfig());

    return options.join(' ');
  }

  protected getCommand(args: Array<string>): string {
    const command: string = which.sync('stryker');
    const options: string = this.getOptions();
    const mochaConfig: string = this.getOptionValue('unitConfig');
    const htmlReportPath: string = this.getOptionValue('reportDir');
    const files: string = glob.sync(this.getOptionValue('testFiles')).join(',');

    return [
      `export MOCHA_TEST_FILES="${files}"`,
      `export MOCHA_CONFIG_PATH="${mochaConfig}"`,
      `export HTML_REPORT_PATH="${htmlReportPath}"`,
      [command, 'run', options, ...args].join(' ')
    ].join(';');
  }
}
