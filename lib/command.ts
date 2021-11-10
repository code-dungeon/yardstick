import { Command } from 'commander';
import * as shell from 'shelljs';

const _console: Console = console;
const logger: Function = _console.log;

export abstract class YardstickCommand extends Command {
  protected abstract getCommand(args: Array<string>) : string;
  
  public constructor(name: string, debugDescription: string, verboseDescription: string) {
    super(name);
    this
      .option('-d, --debug', debugDescription)
      .option('-v, --verbose', verboseDescription)
      .action(this.run.bind(this));
  }

  protected log(...args: Array<string>): void {
    if (this.getOptionValue('debug')) {
      logger(...args);
    }
  }

  protected run(args: Array<string>): void {
    const command:string = this.getCommand(args);
    logger(`running ${this.name()}:`, command);
    
    const code:number = shell.exec(command).code;
    
    this.cleanup();
    shell.exit(code);
  }

  protected cleanup(): void {}
}
