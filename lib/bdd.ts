import { YardstickCommand } from './command';

import * as path from 'path';
import * as which from 'which';

const STEPDEF_GLOB: string = 'test/bdd/**/*.{coffee,js,ts}';
const FEATURE_GLOB: string = 'test/bdd/**/*.feature';

export class BddCommand extends YardstickCommand {
  public constructor() {
    super('bdd', 'Enabled breakpoints to unit tests', 'Logs some debug output');
    this
      .option('-f, --files [files]', 'List of extra files to include')
      .option('--steps [files]', 'Glob of step files', STEPDEF_GLOB )
      .option('--features [files]', 'Glob of feature files', FEATURE_GLOB)

      .option('-w, --watch', 'Will run tests, watching for any source or test file changes')
      .argument('[args ...]', 'Cucumber specific arguments')
      .description('Runs bdd tests with the Cucumber-JS framework');
  }

  private getExtraFileIncludes(): Array<string> {
    const filesConfig: string = this.getOptionValue('files');
    const options: Array<string> = new Array();
  
    if( filesConfig === undefined ){
      return options;
    }
  
    const files: Array<string> = filesConfig.split(',');
    const {length} = files;
  
    for( let i: number = 0; i < length; ++i){
      const file:string = files[i];
  
      options.push('--require', file);
    }

    return options;
  }

  private getCucumberOptions(): Array<string> {
    return [
      '--require',
      path.join(__dirname, '../../config/globals.js'),
      '--require',
      this.getOptionValue('steps')
    ];
  }

  private getOptions(): string {
    const options: Array<string> = new Array();
    
    options.push(...this.getExtraFileIncludes());
    options.push(...this.getCucumberOptions());

    return options.join(' ');
  }

  protected getCommand(args: Array<string>): string {
    const command: string = which.sync('cucumber-js');
    const options: string = this.getOptions();
    const features: string = this.getOptionValue('features');

    return [
      command,
      options,
      features,
      ...args
    ].join(' ');
  }
}
