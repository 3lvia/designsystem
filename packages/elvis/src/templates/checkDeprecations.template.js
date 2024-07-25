document.addEventListener('DOMContentLoaded', function () {
  //[[INJECT_DEPRECATED_ELVIS_CLASSES]]

  const localhost = window.location.href.indexOf('localhost') > -1;
  if (!localhost) {
    return;
  }

  const mo = new MutationObserver(function (mutations) {
    for (let i = 0; i < mutations.length; i++) {
      checkDeprecatedElvisClass(mutations[i].target);
    }
  });

  mo.observe(document.documentElement, {
    childList: true,
    attributes: true,
    characterData: true,
    subtree: true,
  });

  const warnedClasses = new Set();

  /**
   * Compare the used classes to the deprecated classes list.
   * If deprecated classes (or a descendant combination) are being used, warn the user in the console. */
  function checkDeprecatedElvisClass(changedElement = document) {
    const usedClasses = getUsedClasses(changedElement);
    const warnings = [];

    usedClasses.forEach((usedClass) => {
      const usedDeprecatedClass = deprecatedElvisClasses.find(
        (deprecatedElvisClass) => deprecatedElvisClass.name === usedClass,
      );
      if (!usedDeprecatedClass || warnedClasses.has(usedDeprecatedClass.name)) {
        return;
      }
      if (usedDeprecatedClass.requiredAncestor && !descendantCombinationExist(usedDeprecatedClass)) {
        return;
      }

      warnedClasses.add(usedDeprecatedClass.name);
      warnings.push(generateDeprecationWarning(usedDeprecatedClass));
    });

    if (warnings.length > 0) {
      console.group('Elvis Deprecations');
      warnings.forEach((warning) => console.warn(warning));
      console.groupEnd();
    }
  }

  function generateDeprecationWarning({ name, version, replacement, sunset, requiredAncestor }) {
    const sunsetString = sunset ? `The sunset date is set for ${sunset}.` : '';
    const replacementString = replacement
      ? `\n \nIt has been replaced with the ${replacement.type} '${replacement.name}'. See ${replacement.documentation}.`
      : '';
    const nameString = requiredAncestor
      ? `descendant class combination '.${requiredAncestor} .${name}'`
      : `class '${name}'`;

    return `Deprecation warning: The Elvis ${nameString} has been deprecated since version ${version}. ${sunsetString} ${replacementString}`;
  }

  function getUsedClasses(changedElement) {
    if (!changedElement?.querySelectorAll) {
      return [];
    }
    return [
      ...new Set(
        [...changedElement.querySelectorAll('[class^="e-"]')].flatMap((element) => [...element.classList]),
      ),
    ]
      .filter((className) => className.startsWith('e-'))
      .sort();
  }

  function descendantCombinationExist({ requiredAncestor: ancestor, name }) {
    return document.querySelector(`.${ancestor} .${name}`);
  }

  checkDeprecatedElvisClass();
});
