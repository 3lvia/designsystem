document.addEventListener('DOMContentLoaded', function () {
  //[[INJECT_ICONS]]

  let localhost = window.location.href.indexOf('localhost') > -1;

  /* A MutationObserver that is watching for changes in the DOM. */
  let mo = new MutationObserver(function (mutations) {
    for (let i = 0; i < mutations.length; i++) {
      injectIconIfEligible(mutations[i].target, mutations[i]);
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
    if (!localhost) {
      return;
    }
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
            deprecated[x].newIconName,
        );
      }
    }
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
