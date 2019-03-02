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
        var alpha = inAlpha.getValue();
        var colorString;
        switch (type) {
          case 'string':
            colorString = NxColor.rgba(inColor.getValue(), alpha).string();
            break;
          case 'color':
            inColor.setA(alpha);
            colorString = sassUtils.sassString(inColor);
            console.log(colorString);
            break;
        }
        return sassUtils.castToSass(colorString);
      },
      'lighten($inColor,$inAmount)': function(inColor, inAmount) {
        var amount = inAmount.getValue() / 100;
        var type = sassUtils.typeOf(inColor);
        var colorString;
        switch (type) {
          case 'string':
            colorString = NxColor.lighten(inColor.getValue(), amount).hex();
            break;
        }
        return sassUtils.castToSass(colorString);
      },
      'darken($inColor,$inAmount)': function(inColor, inAmount) {
        var amount = inAmount.getValue() / 100;
        var type = sassUtils.typeOf(inColor);
        var colorString;
        switch (type) {
          case 'string':
            colorString = NxColor.darken(inColor.getValue(), amount).hex();
            break;
        }
        return sassUtils.castToSass(colorString);
      }
    };
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = nx.sassColor;
  }
})();
