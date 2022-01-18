const path = require('path');
const {util} = require('../lib/util');

const compilers = ['coffeescript/register', 'ts-node/register', '@babel/register'];
const mochaRequire = [path.join(__dirname, 'globals.js')];

compilers.forEach( (compiler) => {
  if( util.isModuleInstalled(compiler)){
    mochaRequire.push(compiler);
  }
});

const options = {
  testRunner: 'mocha',
  coverageAnalysis: 'perTest',
  mutator: { excludedMutations: ['BooleanSubstitution', 'StringLiteral'] },
  packageManager: 'yarn',
  clearTextReporter: {
    allowColor: true,
    logTests: true
  },
  htmlReporter: {
    baseDir: process.env.HTML_REPORT_PATH
  },
  tsconfigFile: 'tsconfig.json',
  mochaOptions: {
    spec: process.env.MOCHA_TEST_FILES.split(','),
    config: process.env.MOCHA_CONFIG_PATH,
    require: mochaRequire
  },
  thresholds: {
    high: 95,
    low: 90,
    break: 99.99
  }
};

module.export = options;
