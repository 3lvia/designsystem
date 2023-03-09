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

/**
 * It takes a class name and returns a string that represents the class in the deprecatedElvisClasses
 * object
 * @param {string} className - The name of the class that is deprecated.
 * @param {boolean} [child=false] - The name of the child class.
 * @returns A string of JSON data.
 * @example generateDeprecatedClass('e-card')
 */
function generateDeprecatedClass(className, child = false) {
  const { version, requiredAncestor, replacement, sunset } = deprecatedElvisClasses[className];
  let output = `
  {
    name: "${child || className}",
    version: "${version}"`;

  if (requiredAncestor) {
    output += `,
    requiredAncestor: "${requiredAncestor}"`;
  }

  if (replacement) {
    const { name: name, type: type, documentation: doc } = replacement;
    output += `,
    replacement: {
      name: "${name}",
      type: "${type}",
      documentation: "${doc}"
    }`;
  }

  if (sunset) {
    output += `,
    sunset: "${sunset}"`;
  }

  output += `
  },`;

  return output;
}

/**
 * It takes a class name as an argument, and returns an array of all the classes that contain that
 * class name
 * @param {string} parentToMatch - The class name you want to match.
 * @returns An array of all the class names that match the parentToMatch argument.
 * @example
 * getChildren('e-card'); //returns [e-card--header, e-card--body, e-card--footer etc..]
 */
function getChildren(parentToMatch) {
  const elvisCSS = fs.readFileSync('./css/elvis.css').toString();
  const classlist = getAllClasses(elvisCSS);
  const propertyNames = Object.keys(classlist.flat);
  const matches = propertyNames.filter(
    (className) => className.includes(parentToMatch) && className !== parentToMatch,
  );

  return matches;
}

/**
 * Generate an array (as a string) of deprecated classes and injects it into the elvis.js file.
 * It uses data from packages/elvis/.internal/deprecated-classes.json
 * @returns true.
 * @async
 */
const injectDeprecatedElvisClasses = async () => {
  let embeddedJs = `
  let deprecatedElvisClasses = [`;
  for (const currentClassName in deprecatedElvisClasses) {
    embeddedJs += generateDeprecatedClass(currentClassName);

    //if the deprecated class has deprecateChildren === true, add all children to the generated string
    if (deprecatedElvisClasses[currentClassName].deprecateChildren) {
      const children = getChildren(currentClassName);
      children.forEach((child) => {
        //used to avoid duplicated deprecated classes
        if (Object.keys(deprecatedElvisClasses).includes(child)) {
          return;
        }
        embeddedJs += generateDeprecatedClass(currentClassName, child);
      });
    }
  }
  embeddedJs += `
];`;

  // Write to elvis.js at "//[[INJECT_DEPRECATED_ELVIS_CLASSES]]"
  const template = fs.readFileSync('elvis.js').toString();
  const newContent = template.replace('//[[INJECT_DEPRECATED_ELVIS_CLASSES]]', embeddedJs);
  fs.writeFileSync('elvis.js', newContent);

  return true;
};

exports.createClassListOverview = createClassListOverview;
exports.injectDeprecatedElvisClasses = injectDeprecatedElvisClasses;
