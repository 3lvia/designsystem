document.addEventListener('DOMContentLoaded', function () {
  //[[INJECT_ICONS]]
  //[[INJECT_DEPRECATED_ELVIS_CLASSES]]

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
       
      if(i === mutations.length - 1) {
        checkDeprecatedElvisClass();
    }
  }});

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
            node.innerHTML = getIcon(node.classList);
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

  const warnedClasses = [];

  /** 
   * Compare the used classes to the deprecated classes list. 
   * If deprecated classes (or a descendant combination) are being used, warn the user in the console. */
  function checkDeprecatedElvisClass() {
    if (localhost){
      const usedClasses = getUsedClasses();
      const warnings = [];
      
      /* Checking if the used class is deprecated. */
      usedClasses.forEach(usedClass => {
        const usedDeprecatedClass = deprecatedElvisClasses.find(deprecatedElvisClass => deprecatedElvisClass.name === usedClass);
        // If the class is deprecated and has not been warned yet, warn the user.
        if (usedDeprecatedClass && !warnedClasses.includes(usedDeprecatedClass.name)) {
          if(usedDeprecatedClass.requiredAncestor && !descendantCombinationExist(usedDeprecatedClass)){
            return;
          } else {
          warnedClasses.push(usedDeprecatedClass.name);
          warnings.push(generateDeprecationWarning(usedDeprecatedClass));
          }
          
        }
      });
      
      if (warnings.length) {
        console.group('Elvis Deprecations')
        warnings.forEach(warning => console.warn(warning));
        console.groupEnd();
      }
    }
  }

  /**
   * Generate a deprecation warning for the usage of a deprecated Elvis class.
   * @param {Object} usedDeprecatedClass - The deprecated Elvis class
   * @param {string} usedDeprecatedClass.name - The name of the deprecated Elvis class
   * @param {string} usedDeprecatedClass.version - The version of the Elvis class became deprecated.
   * @param {Object} usedDeprecatedClass.replacement - The replacement for the deprecated Elvis class
   * @param {string} usedDeprecatedClass.replacement.name - The name of the replacement.
   * @param {string} usedDeprecatedClass.replacement.type - The type of the replacement, such as a pattern, class or component.
   * @param {string} usedDeprecatedClass.replacement.documentation - A link to the documentation for the replacement.
   * @param {string} usedDeprecatedClass.sunset - the sunset date.
   * @example generateDeprecationWarning(usedDeprecatedClass);
   */
  function generateDeprecationWarning({
    name,
    version,
    replacement,
    sunset,
    requiredAncestor
  }) {
    let sunsetString = sunset ? `The sunset date is set for ${sunset}.` : '';
    let replacementString = replacement ? `\n \nIt has been replaced with the ${replacement.type} '${replacement.name}'. See ${replacement.documentation}.` : '';
    let nameString = requiredAncestor ? `descendant combination (.${requiredAncestor} .${name})` : `class ${name}`;
    
    return `Deprecation warning: The Elvis ${nameString} has been deprecated since version ${version}. ${sunsetString} ${replacementString}`;
  }

  /** Get all classes in the DOM that start with 'e-' */
  function getUsedClasses() {
    return [...new Set([...document.querySelectorAll('[class^="e-"]')].flatMap(element => [...element.classList]))].sort();
  }

  /** Check if the deprecated class is used as a descendant combination in the DOM. */
  function descendantCombinationExist({requiredAncestor: ancestor, name}) {
    return document.querySelector(`.${ancestor} .${name}`);
  }


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
      // Uses e-id to avoid unnecessary changes to the DOM
      if (iconHasMutated(element)) {
        element.innerHTML = getIcon(element.classList);
        element.setAttribute('e-id', getUniqueIdentifier(element.classList));
      }
    }
    lastReplace = ms;
  }

  replaceIcons();
});
