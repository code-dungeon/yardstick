const path = require('path');

module.exports = {
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
    require: [
      'coffeescript/register',
      path.join(__dirname, 'globals.js')
    ]
  },
  thresholds: {
    high: 95,
    low: 90,
    break: 99.99
  }
};
