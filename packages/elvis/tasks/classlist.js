const fs = require('fs');
const deprecatedElvisClasses = require('@elvia/elvis/.internal/deprecated-classes.json');

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
    const classBlock = getBlockFromClass(rule); // Returns the block name
    if (!style.block[classBlock]) {
      style.block[classBlock] = {};
    }
    const block = style.block[classBlock]; // Get block element by rule

    // Container
    if (rule.indexOf('-container') > -1) {
      const container = rule;
      block.container = block.container ? block.container : {};
      block.container[container] = block.container[container] ? block.container[container] : {};
      return;
    }

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
  if (className.indexOf('-container') > -1) {
    return className.split('-container')[0];
  }
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

// Generate a string for a deprecated class
function generateDeprecatedClass(className, child = false) {
  return `
    {
      name: "${child ? child : className}",
      version: "${deprecatedElvisClasses[className].version}",
      ${
        deprecatedElvisClasses[className].replacement
          ? `replacement: {
          name: "${deprecatedElvisClasses[className].replacement.name}",
          type: "${deprecatedElvisClasses[className].replacement.type}",
          documentation: "${deprecatedElvisClasses[className].replacement.documentation}",
          }`
          : ''
      }
      },`;
}

function getChildren(parentToMatch) {
  const elvisCSS = fs.readFileSync('./css/elvis.css').toString();
  const classlist = getAllClasses(elvisCSS);
  const propertyNames = Object.keys(classlist.flat);
  const matches = propertyNames.filter(
    (className) => className.includes(parentToMatch) && className !== parentToMatch,
  );

  return matches;
}

/** Generate a list of deprecated Elvis classes.
 * Function uses data from packages/elvis/.internal/deprecated-classes.json
 * */
const injectDeprecatedElvisClasses = async () => {
  let embeddedJs = `
  let deprecatedElvisClasses = [`;
  for (const className in deprecatedElvisClasses) {
    embeddedJs += generateDeprecatedClass(className);

    if (deprecatedElvisClasses[className].deprecateChildren === true) {
      const children = getChildren(className);
      children.forEach((child) => {
        //sjekke her, ikke overkjør noen som allerede er deprecated
        //used to avoid duplicated deprecated classes
        if (Object.keys(deprecatedElvisClasses).includes(child)) {
          return;
        }
        embeddedJs += generateDeprecatedClass(className, child);
      });
    }
  }
  embeddedJs += `
];`;

  // Write to file
  const template = fs.readFileSync('elvis.js').toString();
  const newContent = template.replace('//[[INJECT_DEPRECATED_ELVIS_CLASSES]]', embeddedJs);
  fs.writeFileSync('elvis.js', newContent);
  fs.writeFileSync('../web/src/assets/js/elvis.js', newContent);

  return true;
};

exports.createClassListOverview = createClassListOverview;
exports.injectDeprecatedElvisClasses = injectDeprecatedElvisClasses;
