import { program } from 'commander';
declare type Args = Array<string>;
declare function log(...args: Args): void;
declare function getFiles(type: string, glob: Array<string>): string;
export { Args, log, program, getFiles };
