"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.YardstickCommand = void 0;
const commander_1 = require("commander");
const shell = require("shelljs");
const _console = console;
const logger = _console.log;
class YardstickCommand extends commander_1.Command {
    constructor(name, debugDescription, verboseDescription) {
        super(name);
        this
            .option('-d, --debug', debugDescription)
            .option('-v, --verbose', verboseDescription)
            .action(this.run.bind(this));
    }
    log(...args) {
        if (this.getOptionValue('debug')) {
            logger(...args);
        }
    }
    run(args) {
        const command = this.getCommand(args);
        logger(`running ${this.name()}:`, command);
        const code = shell.exec(command).code;
        this.cleanup();
        shell.exit(code);
    }
    cleanup() { }
}
exports.YardstickCommand = YardstickCommand;
//# sourceMappingURL=command.js.map