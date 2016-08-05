'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-qing-module:app', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        name: 'qing-sample',
        githubOwner: 'mycolorway'
      })
      .toPromise();
  });

  it('creates files', function () {
    assert.file([
      '.gitignore',
      '.travis.yml',
      'CHANGELOG.md',
      'gulpfile.coffee',
      'index.html',
      'LICENSE.md',
      'package.json',
      'README.md',
      'test/qing-sample.coffee',
      'styles/qing-sample.scss',
      'src/qing-sample.coffee',
      'dist/qing-sample.js'
    ]);
  });
});
