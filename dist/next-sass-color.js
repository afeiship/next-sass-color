(function() {
  var global = global || this || window || Function('return this')();
  var nx = global.nx || require('next-js-core2');
  var NxColor = require('next-color');
  const sass = require('node-sass');
  const sassUtils = require('node-sass-utils')(sass);

  nx.sassColor = function(inContext) {
    return {
      'color($inKeys)': function(inSassString) {
        var path = inSassString.getValue();
        return sassUtils.castToSass(nx.get(inContext, path));
      },
      'rgba($inColor,$inAlpha)': function(inColor, inAlpha) {
        var type = sassUtils.typeOf(inColor);
        var color, colorString;
        switch (type) {
          case 'string':
            colorString = inColor.getValue();
            break;
          case 'color':
            inColor.setA(inAlpha.getValue());
            colorString = sassUtils.sassString(inColor);
            break;
        }
        color = NxColor.rgba(colorString, inAlpha).string();
        return sassUtils.castToSass(color.string());
      },
      'lighten($inColor,$inAmount)': function(inColor, inAmount) {
        return inColor;
      },
      'darken($inColor,$inAmount)': function(inColor, inAmount) {
        return inColor;
      }
    };
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = nx.sassColor;
  }
})();
