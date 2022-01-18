import { YardstickCommand } from './command';

import * as path from 'path';
import * as which from 'which';
import {util} from './util';

const STEPDEF_GLOB: string = 'test/bdd/**/*.{coffee,js,ts}';
const FEATURE_GLOB: string = 'test/bdd/**/*.feature';

export class BddCommand extends YardstickCommand {
  public constructor() {
    super('bdd', 'Enabled breakpoints to unit tests', 'Logs some debug output');
    this
      // .option('-n, --name [scenario names...]', 'Only execute the scenarios with name matching the expression (repeatable)')
      // .option('-t, --tag [tags...]', 'Only execute features or scenarios with tags matching the expression (repeatable')
      .option('-f, --files [files...]', 'Glob(s) of extra files to include')
      .option('--steps [files...]', 'Glob(s) of step files', STEPDEF_GLOB)
      .option('--features [files...]', 'Glob(s) of feature files', FEATURE_GLOB)
      .option('-w, --watch', 'Will run tests, watching for any source or test file changes')
      .argument('[args ...]', 'Cucumber specific arguments')
      .description('Runs bdd tests with the Cucumber-JS framework');
  }

  private getExtraFileIncludes(): Array<string> {
    return util.getFilesWithPattern(this.getOptionValue('files')).map(file => `--require ${file}`);
  }

  private getNamesToRun(): Array<string> {
    const namesOption: Array<string> | string = this.getOptionValue('name');
    let names: Array<string>;

    if( namesOption === undefined ){
      return [];
    }

    if( util.isArrayOption<string>(namesOption)){
      names = namesOption;
    }else {
      names = [namesOption];
    }

    return names.map(name => `--name "${name}"`);
  }

  private getTagsToRun(): Array<string> {
    const tagsOption: Array<string> | string = this.getOptionValue('tag');
    let tags: Array<string>;

    if( tagsOption === undefined ){
      return [];
    }

    if( util.isArrayOption<string>(tagsOption)){
      tags = tagsOption;
    }else {
      tags = [tagsOption];
    }

    return tags.map(tag => `--tags ${tag}`);
  }

  private getCucumberOptions(): Array<string> {
    const files: Array<string> = util.getFilesWithPattern(this.getOptionValue('steps')).map(file => `--require ${file}`);

    return [files.join(' ')];
  }

  private getOptions(): string {
    const options: Array<string> = [];

    options.push('--publish-quiet');
    options.push(...util.getCompilerRequire('ts-node', '--require-module'));
    options.push(...util.getCompilerRequire('coffeescript', '--require-module'));
    options.push(...util.getCompilerRequire('@babel', '--require-module'));
    options.push(`--require ${path.join(__dirname, '../../config/globals.js')}`);
    options.push(...this.getExtraFileIncludes());
    // options.push(...this.getNamesToRun());
    // options.push(...this.getTagsToRun());
    options.push(...this.getCucumberOptions());

    return options.join(' ');
  }

  protected getCommand(args: Array<string>): string {
    const command: string = which.sync('cucumber-js');
    const options: string = this.getOptions();
    const features: string = util.getFilesWithPattern(this.getOptionValue('features')).join(' ');

    return [
      command,
      options,
      features,
      ...args
    ].join(' ');
  }
}
