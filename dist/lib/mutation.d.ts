import { YardstickCommand } from './command';
export declare class MutationCommand extends YardstickCommand {
    constructor();
    private getLogLevel;
    private getIgnoreFiles;
    private getMutateFiles;
    private getReportConfig;
    private getOptions;
    protected getCommand(args: Array<string>): string;
}
