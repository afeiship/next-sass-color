(function() {
  var fs = require('fs');
  var nx = require('next-js-core2');
  var sass = require('node-sass');
  var NxSassColor = require('../src/next-sass-color');
  var sassString = require('fs')
    .readFileSync('./test/app.scss')
    .toString();

  // console.log(sassString);
  // return;

  describe('NxSassColor.methods', function() {
    test('syncRender', function() {
      var result = sass.renderSync({
        data: sassString,
        options: {
          outputStyle: 'expanded'
        },
        functions: NxSassColor.create({
          primary: {
            default: '#4cd964',
            dark: '#f60',
            light: '#eee'
          },
          secondary: '#999'
        })
      });

      console.log(result.css.toString());
    });
  });
})();
