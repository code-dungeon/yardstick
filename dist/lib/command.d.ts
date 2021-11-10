import { Command } from 'commander';
export declare abstract class YardstickCommand extends Command {
    protected abstract getCommand(args: Array<string>): string;
    constructor(name: string, debugDescription: string, verboseDescription: string);
    protected log(...args: Array<string>): void;
    protected run(args: Array<string>): void;
    protected cleanup(): void;
}
