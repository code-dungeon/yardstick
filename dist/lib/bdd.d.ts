import { YardstickCommand } from './command';
export declare class BddCommand extends YardstickCommand {
    constructor();
    private getExtraFileIncludes;
    private getCucumberOptions;
    private getOptions;
    protected getCommand(args: Array<string>): string;
}
