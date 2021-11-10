import { YardstickCommand } from './command';
export declare class UnitCommand extends YardstickCommand {
    constructor(name?: string);
    private getMochaConfig;
    private getWatchConfig;
    private getDebugConfig;
    private getOptions;
    protected getCommand(args: Array<string>): string;
}
