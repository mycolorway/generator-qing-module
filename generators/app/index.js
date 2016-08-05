'use strict';
var path = require('path');
var mkdirp = require('mkdirp');
var glob = require('glob');
var _ = require('lodash');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Answer some questions, we\'ll help you generator project folder of the new qing module.'
    ));

    var prompts = [{
      type: 'input',
      name: 'name',
      message: 'Module name',
      default: 'qing-sample'
    }, {
      type: 'input',
      name: 'githubOwner',
      message: 'Github user or organization name',
      default: 'mycolorway'
    }];

    return this.prompt(prompts).then(function (props) {
      this.props = props;
      this.props.variableName = _.camelCase(this.props.name);
      this.props.className = _.upperFirst(this.props.variableName);
    }.bind(this));
  },

  default: function () {
    if (path.basename(this.destinationPath()) !== this.props.name) {
      this.log(
        'Your generator must be inside a folder named ' + this.props.name + '\n' +
        'We\'ll automatically create this folder.'
      );
      mkdirp(this.props.name);
      this.destinationRoot(this.destinationPath(this.props.name));
    }
  },

  writing: function () {
    this.fs.copyTpl(
      glob.sync(this.templatePath('**/*'), {dot: true}),
      this.destinationRoot(),
      this.props
    );

    this.fs.move('src/module.coffee', `src/${this.props.name}.coffee`);
    this.fs.move('dist/module.js', `dist/${this.props.name}.js`);
    this.fs.move('test/module.coffee', `test/${this.props.name}.coffee`);
    this.fs.move('styles/module.scss', `styles/${this.props.name}.scss`);
  },

  install: function () {
    // this.npmInstall();
  }
});
