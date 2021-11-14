require('reflect-metadata');

const path = require('path');
const chai = require('chai');
const chaiProperties = require('chai-properties');
const chaiAsPromised = require("chai-as-promised");
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

global.importModule = function (srcPath) {
  const modulePath = path.join(process.cwd(), 'src', srcPath);
  return require(modulePath);
};

global.sinon = sinon;
global.spy = sinon.spy;
global.stub = sinon.stub;
global.mock = sinon.mock;
global.sandbox = sinon.sandbox;
global.assert = sinon.assert.expose(chai.assert, { prefix: "" });

chai.config.includeStack = true;
chai.config.truncateThreshold = 0;
chai.config.showDiff = true;

global.expect = chai.expect;
global.should = chai.should();

chai.use(sinonChai);
chai.use(chaiProperties);
chai.use(chaiAsPromised);

process.on('unhandledRejection', () => { });
process.env.DEBUG = `yardstick ${process.env.DEBUG}`;
