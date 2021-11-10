import { UnitCommand } from './unit';
export declare class CoverageCommand extends UnitCommand {
    constructor();
    private getSourceFiles;
    private getReportConfig;
    private getCheckCoverage;
    private getCoverageOptions;
    protected getCommand(args: Array<string>): string;
    protected cleanup(): void;
}
