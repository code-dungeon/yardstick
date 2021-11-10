import { Args } from './program';
declare function getCucumberCommand(args: Args): string;
declare function cucumber(): void;
export { cucumber, getCucumberCommand };
