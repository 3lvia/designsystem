const fs = require('fs');


// Creating classlist.json
async function createClassListOverview() {
  const elvisCSS = fs.readFileSync('./css/elvis.css').toString();

  const classlist = getAllClasses(elvisCSS);

  fs.writeFileSync('.internal/classlist.json', JSON.stringify(classlist, null, '\t'), 'utf8');
  return true;
}

function getAllClasses(stylesheet) {
  const cssRules = stylesheet.match(/([\.]){1}(e-){1}([\w-])+/g);
  const uniqueClasses = new Set();
  cssRules.forEach((cssClass) => {
    uniqueClasses.add(cssClass.substr(1, cssClass.length - 1));
  });

  const style = {
    block: {},
    flat: {},
  };

  [...uniqueClasses].forEach((rule) => {
    style.flat[rule] = {};
    const classBlock = getBlockFromClass(rule);
    if (!style.block[classBlock]) {
      style.block[classBlock] = {};
    }
    const block = style.block[classBlock];

    // Element
    if (rule.indexOf('__') > -1) {
      const element = getElementFromClass(rule);
      block.element = block.element ? block.element : {};
      block.element[element] = block.element[element] ? block.element[element] : {};

      if (modifierIsOnElement(rule)) {
        block.element[element]['modifier'] = block.element[element]['modifier']
          ? block.element[element]['modifier']
          : {};
        block.element[element].modifier[rule] = {};
      }

      if (psuedoIsOnElement(rule)) {
        block.element[element]['psuedo'] = block.element[element]['psuedo']
          ? block.element[element]['psuedo']
          : {};
        block.element[element].psuedo[rule] = {};
      }
      return;
    }

    // Psuedo
    if (rule.indexOf('---') > -1) {
      block.psuedo = block.psuedo ? block.psuedo : {};
      block.psuedo[rule] = {};
      return;
    }

    // Modifier
    if (rule.indexOf('--') > -1) {
      block.modifier = block.modifier ? block.modifier : {};
      block.modifier[rule] = {};
      return;
    }
  });

  return style;
}

function getBlockFromClass(className) {
  const split = className.split(/[(\-))]{2,3}|[(__)]+/);
  return split[0];
}

function getElementFromClass(className) {
  return className.split('--')[0];
}

function modifierIsOnElement(className) {
  if (className.indexOf('__') === -1 || className.indexOf('--') === -1 || className.indexOf('---') > -1) {
    return false;
  }
  return true;
}

function psuedoIsOnElement(className) {
  if (className.indexOf('__') === -1 || className.indexOf('---') === -1) {
    return false;
  }
  return true;
}


exports.createClassListOverview = createClassListOverview;