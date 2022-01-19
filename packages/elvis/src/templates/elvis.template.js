import { getColor } from "@elvia/elvis-colors";

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
      fill = getColor('grey-30');
    }

    if (classList.contains('e-icon--color-disabled-light')) {
      fill = getColor('grey-05');
    }

    if (classList.contains('e-icon--inverted-disabled-grey')) {
      fill = getColor('grey');
    }
    if (classList.contains('e-icon--inverted-disabled-grey-70')) {
      fill = getColor('grey-70');
    }

    if (JSON.stringify(classList).indexOf('e-icon--color-') > -1) {
      for (let i = 0; i < classList.length; i++) {
        let color = classList[i].replace('e-icon--color-', '');
        fill = getColor(color);
      }
    }

    if (fill) {
      fill = fill.replace('#', '%23');
      icon = icon.replace(/fill='([^']*)'/g, "fill='" + fill + "'");
    }

    return icon;
  }

  //[[INJECT_ICONS]]

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
