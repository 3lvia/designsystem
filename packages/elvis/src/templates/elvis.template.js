document.addEventListener('DOMContentLoaded', function () {
  let DEBUG = false;
  if (window.location.href.indexOf('#debug') > -1) {
    DEBUG = true;
  }

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
      'click',
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
      return icon;
    }
    console.error('Elvis - No icon found for classes: ', classList);
    return 'No icon found!';
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
      icon = icon.replace(/fill='([^']*)'/g, "fill='" + fill + "'");
    }

    return icon;
  }

  colors = {
    white: {
      color: '#FFF',
      contrastText: '#000',
    },
    black: {
      color: '#000',
      contrastText: '#fff',
    },
    grey: {
      color: '#262626',
      contrastText: '#fff',
    },
    'grey-90': {
      color: '#3B3B3B',
      contrastText: '#fff',
    },
    'grey-80': {
      color: '#515151',
      contrastText: '#fff',
    },
    'grey-70': {
      color: '#676767',
      contrastText: '#fff',
    },
    'grey-60': {
      color: '#7C7C7C',
      contrastText: '#000',
    },
    'grey-50': {
      color: '#929292',
      contrastText: '#000',
    },
    'grey-40': {
      color: '#A8A8A8',
      contrastText: '#000',
    },
    'grey-30': {
      color: '#BDBDBD',
      contrastText: '#000',
    },
    'grey-20': {
      color: '#D3D3D3',
      contrastText: '#000',
    },
    'grey-10': {
      color: '#E9E9E9',
      contrastText: '#000',
    },
    'grey-05': {
      color: '#F4F4F4',
      contrastText: '#000',
    },
    'grey-02': {
      color: '#FAFAFA',
      contrastText: '#000',
    },
    green: {
      color: '#29D305',
      contrastText: '#000',
    },
    yellow: {
      color: '#FFFF00',
      contrastText: '#000',
    },
    orange: {
      color: '#FFA000',
      contrastText: '#000',
    },
    red: {
      color: '#FF0000',
      contrastText: '#000',
    },
    'green-apple': {
      color: '#21AC04',
      contrastText: '#000',
    },
    'violet-grape': {
      color: '#490192',
      contrastText: '#fff',
    },
    'blue-berry': {
      color: '#006DDB',
      contrastText: '#fff',
    },
    'purple-plum': {
      color: '#B66DFF',
      contrastText: '#000',
    },
    'orange-mango': {
      color: '#DB6D00',
      contrastText: '#000',
    },
    'red-tomato': {
      color: '#B90202',
      contrastText: '#fff',
    },
  };

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