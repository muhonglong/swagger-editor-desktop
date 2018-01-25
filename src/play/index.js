/**
 * YioLayout
 */

const fs = require('fs');
const path = require('path');
const YAML = require('js-yaml');
const {dialog} = require('electron').remote;

class Topbar extends React.Component {
  render() {
    return React.createElement('div', null, [
      React.createElement('div', {
        key: 'topbar',
        className: 'topbar'
      }, [
        React.createElement('div', {
          key: 'topbar-wrapper',
          className: 'topbar-wrapper'
        }, [
          React.createElement('span', {
            key: 'name',
            className: 'topbar-name',
            onClick: () => dialog.showOpenDialog({
              buttonLabel: '打开',
              properties: ['openFile', 'createDirectory'],
              filters: [{name: 'yml', extensions: ['yaml']}],
              message: '打开本地SWAGGER配置文件'
            }, filePaths => {
              let file = filePaths[0];
              if (file) {
                file = path.resolve(file);
                fs.readFile(file, (err, data) => {
                  var code = data.toString();
                  this.props.specActions.updateSpec(YAML.safeDump(YAML.safeLoad(code)));
                });
              }
            })
          }, 'Swagger Editor')
        ])
      ])
    ]);
  }
}

class YioLayout extends React.Component {
  render() {
    const { getComponent } = this.props
    const Topbar = getComponent("Topbar", true)
    const EditorLayout = getComponent("EditorLayout", true)
    return React.createElement('div', null, [
      React.createElement(Topbar, {key: 'topbar'}),
      React.createElement(EditorLayout, {key: 'EditorLayout'})
    ]);
  }
}

module.exports = function() {
  return [
    function() {
      return {
        components: {
          Topbar,
          YioLayout
        }
      }
    }
  ]
};