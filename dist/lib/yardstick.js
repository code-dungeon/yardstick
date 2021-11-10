#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const unit_1 = require("./unit");
const bdd_1 = require("./bdd");
const mutation_1 = require("./mutation");
const coverage_1 = require("./coverage");
commander_1.program
    .addCommand(new unit_1.UnitCommand())
    .addCommand(new mutation_1.MutationCommand())
    .addCommand(new bdd_1.BddCommand())
    .addCommand(new coverage_1.CoverageCommand());
commander_1.program.parse(process.argv);
//# sourceMappingURL=yardstick.js.map