const icons = require('@elvia/elvis-assets-icons/config/icons.config');
const fs = require('fs');
const svgIcons = require('@elvia/elvis-assets-icons/icons.cjs.js');

// Create embedded icons in elvis.js
async function createEmbeddedIconsJS() {
  const iconsToInclude = icons.map((i) => {
    if (i.deprecated) {
      return { name: i.name, svg: svgIcons[createCamelCase(i.newIconName)].getIcon() };
    } else {
      return { name: i.name, svg: svgIcons[createCamelCase(i.name)].getIcon() };
    }
  });
  const deprecatedIcons = [];
  for (let i = 0; i < icons.length; i++) {
    if (icons[i].deprecated) {
      deprecatedIcons.push(icons[i]);
    }
  }

  let embeddedJs = `
  // THIS FILE IS GENERATED BY GULP, DO NOT CHANGE THIS ICON LIST MANUALLY.
  // ADD OR REMOVE ICONS IN icons.config.js
  let icons = {`;

  for (let i = 0; i < iconsToInclude.length; i++) {
    const fileContent = svgIcons[createCamelCase(iconsToInclude[i].name)].getIcon();
    const iconName = iconsToInclude[i].name;

    const iconsWithReplacedDimensions = fileContent
      .replace(/width="([^"]*)"/, `width="100%"`)
      .replace(/height="([^"]*)"/, `height="100%"`);
    embeddedJs =
      embeddedJs +
      `
     "e-icon--${iconName}":'${iconsWithReplacedDimensions}'`;

    if (i < iconsToInclude.length - 1) {
      embeddedJs += ',';
    } else {
      embeddedJs += `};`;
    }
  }
  // create list of deprecated icons

  embeddedJs =
    embeddedJs +
    `
    let deprecated = [
    `;

  for (let i = 0; i < deprecatedIcons.length; i++) {
    embeddedJs =
      embeddedJs +
      `{
        name: "e-icon--${deprecatedIcons[i].name.toString()}",
        version: "${deprecatedIcons[i].deprecated.toString()}",
        newIconName: "e-icon--${deprecatedIcons[i].newIconName.toString()}"
      }
    `;
    if (i < deprecatedIcons.length - 1) {
      embeddedJs += ',';
    } else {
      embeddedJs += `];`;
    }
  }

  const template = fs.readFileSync('./src/templates/elvis.template.js').toString();
  const newContent = template.replace('//[[INJECT_ICONS]]', embeddedJs);
  fs.writeFileSync('elvis.js', newContent);

  return true;
}

function createCamelCase(original) {
  const arr = original.split(/[_-]+/);
  let newText = '';

  for (let i = 0; i < arr.length; i++) {
    if (i === 0) {
      newText += arr[i];
      continue;
    }
    newText += arr[i][0].toUpperCase() + arr[i].substr(1, arr[i].length - 1);
  }
  return newText;
}

exports.generateIcons = createEmbeddedIconsJS;
