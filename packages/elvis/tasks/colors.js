const fs = require('fs');
const colors = require('@elvia/elvis-colors').default;

const generateColor = (colorLabel, color) => {
  let newColor = `\t\t'${colorLabel}': {\n`;
  newColor += `\t\t\tcolor: '${color.color}',\n`;
  newColor += `\t\t\tcontrastText: '${color.contrastText}',\n`;
  newColor += `\t\t},\n`;
  return newColor;
};

const injectColors = async () => {
  let embeddedJs = `colors = {\n`;

  for (const category in colors) {
    if (category === 'internal-colors') {
      continue;
    }
    for (const colorLabel in colors[category]) {
      const color = colors[category][colorLabel];
      embeddedJs += generateColor(colorLabel, color);
      if (color['alt-labels'] && color['alt-labels'].length > 0) {
        for (const altLabel in color['alt-labels']) {
          embeddedJs += generateColor(color['alt-labels'][altLabel], color);
        }
      }
    }
  }
  embeddedJs += `\t};\n`;

  const template = fs.readFileSync('elvis.js').toString();
  const newContent = template.replace('//[[INJECT_COLORS]]', embeddedJs);
  fs.writeFileSync('elvis.js', newContent);
  fs.writeFileSync('../web/src/assets/js/elvis.js', newContent);

  return true;
};

exports.injectColors = injectColors;
