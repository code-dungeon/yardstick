#!/usr/bin/env node

import { program } from 'commander';
import { UnitCommand } from './unit';
import { BddCommand } from './bdd';
import { MutationCommand } from './mutation';
import { CoverageCommand } from './coverage';

program
  .addCommand(new UnitCommand())
  .addCommand(new MutationCommand())
  .addCommand(new BddCommand())
  .addCommand(new CoverageCommand());

program.parse(process.argv);
