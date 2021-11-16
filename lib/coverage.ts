import { UnitCommand } from './unit';
import * as which from 'which';
import * as shell from 'shelljs';
import * as glob from 'glob';
import { util } from './util';

const SOURCE_GLOB: string = 'src/**/*.{coffee,js,ts}';
const REPORT_DIR: string = './reports/unit-coverage';

export class CoverageCommand extends UnitCommand {
  public constructor() {
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


  private getSourceFiles(): Array<string> {
    return glob.sync(this.getOptionValue('sourceFiles')).map(file => `--include ${file}`);
  }

  private getReportConfig(): Array<string> {
    const options: Array<string> = ['--reporter-lcov', '--reporter=text-summary'];
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
    options.push(...this.getReportConfig());
    options.push(...util.getCompilerRequire('ts-node'));
    options.push(...util.getCompilerRequire('coffeescript'));
    options.push(...util.getCompilerRequire('source-map-support'));
    options.push(...util.getCompilerRequire('@babel'));
    options.push('--all');
    options.push(...this.getCheckCoverage());
    options.push('--extension .ts', '--extension .js', '--extension .coffee');

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
