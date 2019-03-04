(function() {
  var global = global || this || window || Function('return this')();
  var nx = global.nx || require('next-js-core2');
  var NxColor = require('next-color');
  var sass = require('node-sass');
  var sassUtils = require('node-sass-utils')(sass);
  var sassList2array = require('next-sass-list2array');

  var NxSassColor = nx.declare('nx.SassColor', {
    statics: {
      create: function(inContext) {
        var self = this;
        return {
          'color($inKeys)': function(inSassString) {
            return self.color(inContext, inSassString);
          },
          'lighten($inColor,$inAmount)': function(inColor, inAmount) {
            return self.lighten(inColor, inAmount);
          },
          'darken($inColor,$inAmount)': function(inColor, inAmount) {
            return self.darken(inColor, inAmount);
          },
          'rgba($inArgs...)': function() {
            var list = arguments[0];
            var len = args.getLength();
            return self['rgba' + len].apply(null, sassList2array(list));
          }
        };
      },
      color: function(inSassString) {
        var path = inSassString.getValue();
        return sassUtils.castToSass(nx.get(path));
      },
      'lighten,darken': function(inName) {
        return function(inColor, inAmount) {
          console.log('compused function:->', inColor, inAmount, inName);
          var amount = inAmount.getValue() / 100;
          var type = sassUtils.typeOf(inColor);
          var colorString;
          switch (type) {
            case 'string':
              colorString = NxColor[inName](inColor.getValue(), amount).hex();
              break;
          }
          return sassUtils.castToSass(colorString);
        };
      },
      rgba2: function(inColor, inAlpha) {
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
            break;
        }
        return sassUtils.castToSass(colorString);
      },
      rgba4: function(inR, inG, inB, inAlpah) {
        var rNum = inR.getValue();
        var gNum = inG.getValue();
        var bNum = inB.getValue();
        var alpha = inAlpah.getValue();
        var colorString = NxColor.rgba([rNum, gNum, bNum], alpha).string();
        return sassUtils.castToSass(colorString);
      }
    }
  });

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = NxSassColor;
  }
})();
