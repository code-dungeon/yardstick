import { Args } from './program';
declare function getMochaCommand(args: Args): string;
declare function mocha(): void;
export { mocha, getMochaCommand };
