import * as which from 'which';
import * as shell from 'shelljs';
import { UnitCommand } from './unit';
import { util } from './util';

const SOURCE_GLOB: string = 'src/**/*.{coffee,js,ts}';
const REPORT_DIR: string = './reports/unit-coverage';
export class CoverageCommand extends UnitCommand {
  public constructor() {
    super('coverage');
    this
      .option('--source-files [files...]', 'Glob(s) of source files to run a coverage report for', SOURCE_GLOB)
      .option('--exclude-source-files [files...]', 'Glob(s) of source files to exclude from coverage report')
      .option('--all [bool]', 'Boolean indicating to include test coverage for files not required via test', true)
      .option('--check-coverage [bool]', 'Verifies coverage is within thresholds', false)
      .option('--lines [number]', 'Percentage of lines that must have coder coverage', '80')
      .option('--functions [number]', 'Percentage of functions that must have coder coverage', '80')
      .option('--branches [number]', 'Percentage of branches that must have coder coverage', '80')
      .option('--report [bool]', 'Flag indicating to generate a html coverage report', false)
      .option('--reporter [reporters...]', 'List of reporters for viewing code coverage', 'text-summary')
      .option('--report-dir [path]', 'Directory to save the coverage report', REPORT_DIR)
      .description('Runs code coverage for unit tets');
  }


  private getSourceFiles(): Array<string> {
    return util.getFilesWithPattern(this.getOptionValue('sourceFiles')).map(file => `--include ${file}`);
  }

  private getExcludedSourceFiles(): Array<string> {
    return util.getFilesWithPattern(this.getOptionValue('excludeSourceFiles')).map(file => `--exclude ${file}`);
  }

  private getReporterConfig(): Array<string> {
    const options: Array<string> = ['--reporter-lcov'];
    const reporterOption: Array<string> | string = this.getOptionValue('reporter');
    let reporters: Array<string>;

    if( util.isArrayOption<string>(reporterOption)) {
      reporters = reporterOption;
    }else{
      reporters = [reporterOption];
    }

    reporters.forEach( (reporter:string) => {
      options.push(`--reporter=${reporter}`);
    });

    if (this.getOptionValue('report') !== false) {
      options.push('--report-dir', this.getOptionValue('reportDir'), '--reporter=html');
    }

    return options;
  }

  private getCheckCoverage(): Array<string> {
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

  private getCoverageOptions(): string {
    const options: Array<string> = new Array();

    options.push(...this.getSourceFiles());
    options.push(...this.getExcludedSourceFiles());
    options.push(...this.getReporterConfig());
    options.push(...util.getCompilerRequire('ts-node'));
    options.push(...util.getCompilerRequire('coffeescript'));
    options.push(...util.getCompilerRequire('source-map-support'));
    options.push(...util.getCompilerRequire('@babel'));
    options.push(...this.getCheckCoverage());
    options.push('--extension .ts', '--extension .js', '--extension .coffee');

    if( this.getOptionValue('all')){
      options.push('--all');
    }

    return options.join(' ');
  }

  private getCompilerOptions(): string {
    const options: Array<string> = new Array();

    options.push(...util.getBabelCompilerOption());
    options.push(...util.getCoffeescriptCompilerOption());
    options.push(...util.getTypescriptCompilerOption());

    return options.join('');
  }

  protected getCommand(args: Array<string>): string {
    const command: string = which.sync('nyc');
    const options: string = this.getCoverageOptions();
    const compilerOptions: string = this.getCompilerOptions();

    return [compilerOptions, command, options, super.getCommand(args)].join(' ');
  }

  protected cleanup(): void {
    shell.exec('rm -rf .nyc_output');
  }
}
