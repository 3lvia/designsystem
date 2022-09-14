document.addEventListener('DOMContentLoaded', function () {
  let DEBUG = false;
  if (window.location.href.indexOf('#debug') > -1) {
    DEBUG = true;
  }

  let localhost = window.location.href.indexOf('localhost') > -1;

  function outlineFix() {
    if (DEBUG) {
      return;
    }
    document.body.classList.add('e-no-outline');
    document.documentElement.addEventListener('keydown', function (e) {
      if (e.keyCode === 9) {
        document.body.classList.remove('e-no-outline');
      }
    });

    document.documentElement.addEventListener(
      'mousedown',
      function (event) {
        document.body.classList.add('e-no-outline');
      },
      false
    );
  }
  outlineFix();

/* A MutationObserver that is watching for changes in the DOM. */
  let mo = new MutationObserver(function (mutations) {
    for (let i = 0; i < mutations.length; i++) {
      injectIconIfEligible(mutations[i].target, mutations[i]);
      checkDeprecatedElvisClass();
    }
  });

  function injectIconIfEligible(node, mutation) {
    if (mutation.addedNodes.length > 0) {
      for (let i = 0; i < mutation.addedNodes.length; i++) {
        let addedNode = mutation.addedNodes[i];
        if (addedNode.localName === 'i') {
          injectIconInNode(addedNode);
        }
        if (addedNode.querySelectorAll) {
          let elements = addedNode.querySelectorAll('i');
          for (let j = 0; j < elements.length; j++) {
            injectIconInNode(elements[j]);
          }
        }
      }
    }

    injectIconInNode(node);
  }

  // Check if node has a class with a matching icon name and inject if it has one
  function injectIconInNode(node) {
    if (node && node.classList) {
      for (let i = 0; i < node.classList.length; i++) {
        if (icons[node.classList[i]]) {
          if (iconHasMutated(node)) {
            node.style.backgroundImage = 'url("' + getIcon(node.classList) + '")';
            node.setAttribute('e-id', getUniqueIdentifier(node.classList));
          }
        }
      }
    }
  }

  function iconHasMutated(node) {
    let id = node.getAttribute('e-id');
    let newId = getUniqueIdentifier(node.classList) + '';
    return !id || id + '' !== newId;
  }

  mo.observe(document.documentElement, {
    childList: true,
    attributes: true,
    characterData: true,
    subtree: true,
  });

  function getUniqueIdentifier(classList) {
    let id = '';
    for (let i = 0; i < classList.length; i++) {
      id += classList[i];
    }
    return id;
  }

  function getIcon(classList) {
    for (let i = 0; i < classList.length; i++) {
      if (!icons[classList[i]]) {
        continue;
      }
      let icon = icons[classList[i]];

      icon = setCorrectColor(classList, icon);

      checkDeprecatedIcon(classList[i]);

      return icon;
    }
    if (localhost) {
      console.error('Elvis - No icon found for classes: ', classList);
    }
    return 'No icon found!';
  }

  function checkDeprecatedIcon(classList) {
    if (localhost) {
      for (let x = 0; x < deprecated.length; x++) {
        if (classList === deprecated[x].name) {
          console.warn(
            'WARNING: The icon ' +
            deprecated[x].name +
            ' is deprecated from version : ' +
            deprecated[x].version +
            '. ' +
            deprecated[x].name +
            ' now refers to the icon: ' +
            deprecated[x].newIconName
          )
        }
      }
    }
  }

/**
 * Generate a deprecation warning for the usage of a deprecated Elvis class.
 * @param {Object} usedDeprecatedClass - The deprecated Elvis class
 * @param {string} usedDeprecatedClass.name - The name of the deprecated Elvis class
 * @param {string} usedDeprecatedClass.version - The version of the Elvis class became deprecated.
 * @param {Object} usedDeprecatedClass.replacement - The replacement for the deprecated Elvis class
 * @param {String} usedDeprecatedClass.replacement.name - The name of the replacement.
 * @param {String} usedDeprecatedClass.replacement.type - The type of the replacement, such as a pattern, class or component.
 * @param {String} usedDeprecatedClass.replacement.documentation - A link to the documentation for the replacement.
 * @param {String} usedDeprecatedClass.sunset - the sunset date.
 * @example generateDeprecationWarning(usedDeprecatedClass);
 */
 function generateDeprecationWarning({name, version, replacement, sunset}){
  let sunsetString = sunset ? `The sunset date is set for ${sunset}.` : '';
  let replacementString = replacement? `\n \nIt has been replaced with the ${replacement.type} '${replacement.name}'. See ${replacement.documentation}.` : '';
    return console.warn(`Deprecation warning: The Elvis class '${name}' has been deprecated since version ${version}. ${sunsetString} ${replacementString}`);
 }

 /* Array containing classes that have been warned to the user. Helps avoid duplicated errors in the console.*/
 const warnedClasses = [];

  /** Create an array with all the classes used in the DOM starting with 'e-'. 
   * Use the filter to only include unique classes once. 
   * Then compare the used classes to the deprecated classes list. 
   * If deprecated classes are being used, warn the user in the console. */
function checkDeprecatedElvisClass() {
  if (localhost) {
    
    /* Getting all the classes that start with 'e-' and then it is filtering out the duplicates. https://stackoverflow.com/q/59162535/14447555*/
    const usedClasses = [].concat(...[...document.querySelectorAll('[class^="e-"]')].map(element => [...element.classList])).filter((className, index, array) => array.indexOf(className) == index).sort();
    
    /* Checking if the used class is deprecated. */
    usedClasses.forEach(usedClass => {
      const usedDeprecatedClass = deprecatedElvisClasses.find(deprecatedElvisClass => deprecatedElvisClass.name === usedClass);

      // If the class is deprecated and has not been warned yet, warn the user.
      if (usedDeprecatedClass && !warnedClasses.includes(usedDeprecatedClass.name)) {
        warnedClasses.push(usedDeprecatedClass.name);
        generateDeprecationWarning(usedDeprecatedClass);
      }
    });
  }
}

  function setCorrectColor(classList, icon) {
    let fill;

    if (classList.contains('e-icon--inverted')) {
      for (let i = 0; i < classList.length; i++) {
        if (classList[i].indexOf('-color') > -1 && !(classList[i].indexOf('-color-') > -1)) {
          icon = icon.replace(/fill='%2329D305'/g, 'fillGreen');
        }
        // -full-color check can be removed when new icons have been added
        if (classList[i].indexOf('-filled-color') > -1 || classList[i].indexOf('-full-color') > -1) {
          icon = icon.replace(/fill='black'/g, 'fillBlack');
        }
      }
      icon = icon.replace(/fill='white'/g, 'fillBlack');
      icon = icon.replace(/fill='([^']*)'/g, "fill='white'");
      icon = icon.replace(/fillBlack/g, "fill='black'");
      icon = icon.replace(/fillGreen/g, "fill='%2329D305'");
      return icon;
    }

    if (classList.contains('e-icon--color-disabled')) {
      fill = colors['grey-30'].color;
    }

    if (classList.contains('e-icon--color-disabled-light')) {
      fill = colors['grey-05'].color;
    }

    if (classList.contains('e-icon--inverted-disabled-grey')) {
      fill = colors['grey'].color;
    }
    if (classList.contains('e-icon--inverted-disabled-grey-70')) {
      fill = colors['grey-70'].color;
    }

    if (JSON.stringify(classList).indexOf('e-icon--color-') > -1) {
      for (let i = 0; i < classList.length; i++) {
        let color = classList[i].replace('e-icon--color-', '');
        if (colors[color]) {
          fill = colors[color].color;
        }
      }
    }

    if (fill) {
      fill = fill.replace('#', '%23');
      icon = icon.replace(/fill='black'/g, "fill='" + fill + "'");
    }

    return icon;
  }

  //[[INJECT_COLORS]]
  //[[INJECT_ICONS]]
  //[[INJECT_DEPRECATED_ELVIS_CLASSES]]

  let lastReplace = 0;
  const throttleReplaceInterval = 500;
  function replaceIcons() {
    // Simple throttle without handling the trailing case
    let ms = new Date().getTime();
    if (lastReplace > ms - throttleReplaceInterval) {
      return;
    }

    let elements = window.document.querySelectorAll('[class*="e-icon"]');
    for (let i = 0; i < elements.length; i++) {
      let element = elements[i];
      // Uses e-id to avoid unnessesary changes to the DOM
      if (iconHasMutated(element)) {
        element.style.backgroundImage = 'url("' + getIcon(element.classList) + '")';
        element.setAttribute('e-id', getUniqueIdentifier(element.classList));
      }
    }
    lastReplace = ms;
  }

  replaceIcons();
});
