import { YardstickCommand } from './command';
import { util } from './util';
import * as path from 'path';
import * as which from 'which';

const FILE_GLOB: string = 'test/unit/**/*.{coffee,js,ts}';
const MOCHA_CONFIG: string = path.resolve(__dirname, '../config/mocha.conf.yml');

export class UnitCommand extends YardstickCommand {
  public constructor(name: string = 'unit') {
    super(name, 'Enabled breakpoints to unit tests', 'Logs some debug output');
    this
      .option('-c, --config [value]', 'Config file path for running unit tests in mocha', MOCHA_CONFIG)
      .option('--test-files [files...]', 'Glob of spec files for unit tests', FILE_GLOB)
      .option('-w, --watch', 'Will run tests, watching for any source or test file changes')
      .argument('[args ...]', 'Mocha specific arguments')
      .description('Runs unit tests in the Mocha framework');
  }

  private getMochaConfig(): Array<string> {
    const config: string = this.getOptionValue('config');
    const options: Array<string> = new Array();

    if (config === MOCHA_CONFIG) {
      options.push('--require', path.join(__dirname, '../config/globals.js'));
    }
    options.push('--config', config);

    return options;
  }

  private getWatchConfig(): Array<string> {
    if (this.getOptionValue('watch')) {
      return ['--watch', '--watch-extensions ts,js,coffee'];
    }

    return [];
  }

  private getDebugConfig(): Array<string> {
    if (this.getOptionValue('debug')) {
      return ['--inspect-brk'];
    }
    return [];
  }

  private getOptions(): string {
    const options: Array<string> = new Array();

    options.push(...this.getMochaConfig());
    options.push(...this.getWatchConfig());
    options.push(...this.getDebugConfig());
    options.push(...util.getCompilerRequire('ts-node'));
    options.push(...util.getCompilerRequire('coffeescript'));
    options.push(...util.getCompilerRequire('source-map-support'));
    options.push(...util.getCompilerRequire('@babel'));

    const files: string = util.getFilesWithPattern(this.getOptionValue('testFiles')).join(' ');
    options.push(files);

    return options.join(' ');
  }

  protected getCommand(args: Array<string>): string {
    const command: string = which.sync('mocha');
    const options: string = this.getOptions();

    return [command, '--color', options, ...args].join(' ');
  }
}
