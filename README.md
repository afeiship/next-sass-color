# next-sass-color
> Color functions for sassLoader based nodeSass

## install:
```bash
npm install -S afeiship/next-sass-color --registry=https://registry.npm.taobao.org
```

## apis:
| api    | params | description                |
|--------|--------|----------------------------|
| create | -      | Create functions for color |

## usage:
```js
import NxSassColor from 'next-sass-color';

// code goes here:
sass.renderSync({
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
```

## input:
```scss
$colors: (
  f: #fff,
  e: #eee,
  0: #000,
  3: #333,
  6: #666,
  8: #888,
  9: #999,
  primary: color("primary.default"),
  primary-lighten: lighten(color("primary.default"), 10%),
  primary-darken: darken(color("primary.default"), 10%),
  primary-50: rgba(color("primary.default"), 0.1),
  red-70: rgba(#f00, 0.7),
  red-90: rgba(255, 0, 0, 0.8),
  gray: color("gray")
);

// @debug $colors;

.color1 {
  color: map-get($colors, primary);
}

.color2 {
  color: color("primary.light");
  background: rgba(255, 2, 2, 0.8);
}

.color3 {
  color: color("primary.darken");
  background: rgba(color(secondary), 0.2);
}
```

### output:
```css
.color1 {
  color: #4cd964; }

.color2 {
  color: #eee;
  background: rgba(255, 2, 2, 0.8); }

.color3 {
  background: rgba(153, 153, 153, 0.2); }
```


## resources:
- http://www.mamicode.com/info-detail-1126451.html
