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

  const warnedClasses = [];

  /** 
   * Compare the used classes to the deprecated classes list. 
   * If deprecated classes (or a descendant combination) are being used, warn the user in the console. */
  function checkDeprecatedElvisClass() {
    if (localhost){

      const usedClasses = getUsedClasses();
      
      /* Checking if the used class is deprecated. */
      usedClasses.forEach(usedClass => {
        const usedDeprecatedClass = deprecatedElvisClasses.find(deprecatedElvisClass => deprecatedElvisClass.name === usedClass);
        // If the class is deprecated and has not been warned yet, warn the user.
        if (usedDeprecatedClass && !warnedClasses.includes(usedDeprecatedClass.name)) {
          if(usedDeprecatedClass.requiredAncestor && !descendantCombinationExist(usedDeprecatedClass)){
            return;
          } else {
          warnedClasses.push(usedDeprecatedClass.name);
          generateDeprecationWarning(usedDeprecatedClass);
          }
          
        }
      });
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
    
    return console.warn(`Deprecation warning: The Elvis ${nameString} has been deprecated since version ${version}. ${sunsetString} ${replacementString}`);
  }

  /** Get all classes in the DOM that start with 'e-' */
  function getUsedClasses() {
    return [...new Set([...document.querySelectorAll('[class^="e-"]')].flatMap(element => [...element.classList]))].sort();
  }

  /** Check if the deprecated class is used as a descendant combination in the DOM. */
  function descendantCombinationExist({requiredAncestor: ancestor, name}) {
    return document.querySelector(`.${ancestor} .${name}`);
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

  colors = {
		'white': {
			color: '#fff',
			contrastText: '#000',
		},
		'elvis-on': {
			color: '#fff',
			contrastText: '#000',
		},
		'elvia-on': {
			color: '#fff',
			contrastText: '#000',
		},
		'font-color-light': {
			color: '#fff',
			contrastText: '#000',
		},
		'elvia-inverted': {
			color: '#fff',
			contrastText: '#000',
		},
		'green': {
			color: '#29d305',
			contrastText: '#000',
		},
		'elvia-charge': {
			color: '#29d305',
			contrastText: '#000',
		},
		'black': {
			color: '#000',
			contrastText: '#fff',
		},
		'elvis-off': {
			color: '#000',
			contrastText: '#fff',
		},
		'elvia-off': {
			color: '#000',
			contrastText: '#fff',
		},
		'font-color': {
			color: '#000',
			contrastText: '#fff',
		},
		'text': {
			color: '#000',
			contrastText: '#fff',
		},
		'grey': {
			color: '#262626',
			contrastText: '#fff',
		},
		'elvia-dark': {
			color: '#262626',
			contrastText: '#fff',
		},
		'yellow': {
			color: '#ffff00',
			contrastText: '#000',
		},
		'orange': {
			color: '#ffa000',
			contrastText: '#000',
		},
		'warning': {
			color: '#ffa000',
			contrastText: '#000',
		},
		'red': {
			color: '#ee0701',
			contrastText: '#000',
		},
		'error': {
			color: '#ee0701',
			contrastText: '#000',
		},
		'green-apple': {
			color: '#21ac04',
			contrastText: '#000',
		},
		'violet-grape': {
			color: '#490192',
			contrastText: '#fff',
		},
		'blue-berry': {
			color: '#006ddb',
			contrastText: '#fff',
		},
		'purple-plum': {
			color: '#b66dff',
			contrastText: '#000',
		},
		'orange-mango': {
			color: '#db6d00',
			contrastText: '#000',
		},
		'red-tomato': {
			color: '#b90202',
			contrastText: '#fff',
		},
		'grey-90': {
			color: '#3b3b3b',
			contrastText: '#fff',
		},
		'grey-80': {
			color: '#515151',
			contrastText: '#fff',
		},
		'font-grey': {
			color: '#515151',
			contrastText: '#fff',
		},
		'text-light': {
			color: '#515151',
			contrastText: '#fff',
		},
		'grey-70': {
			color: '#676767',
			contrastText: '#fff',
		},
		'placeholder': {
			color: '#676767',
			contrastText: '#fff',
		},
		'grey-60': {
			color: '#7c7c7c',
			contrastText: '#000',
		},
		'grey-50': {
			color: '#929292',
			contrastText: '#000',
		},
		'grey-40': {
			color: '#a8a8a8',
			contrastText: '#000',
		},
		'grey-30': {
			color: '#bdbdbd',
			contrastText: '#000',
		},
		'disabled': {
			color: '#bdbdbd',
			contrastText: '#000',
		},
		'light-inverted': {
			color: '#bdbdbd',
			contrastText: '#000',
		},
		'grey-20': {
			color: '#d3d3d3',
			contrastText: '#000',
		},
		'grey-10': {
			color: '#e9e9e9',
			contrastText: '#000',
		},
		'grey-05': {
			color: '#f4f4f4',
			contrastText: '#000',
		},
		'disabled-light': {
			color: '#f4f4f4',
			contrastText: '#000',
		},
		'grey-02': {
			color: '#fafafa',
			contrastText: '#000',
		},
	};

  
  // THIS FILE IS GENERATED BY GULP, DO NOT CHANGE THIS ICON LIST MANUALLY.
  // ADD OR REMOVE ICONS IN icons.config.js
  let icons = {
     "e-icon--access_control":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M3.75 1.5A2.25 2.25 0 0 0 1.5 3.75V12h11.25a.75.75 0 0 1 0 1.5H1.629A2.25 2.25 0 0 0 3.75 15h7.5a.75.75 0 0 1 0 1.5H9.635l-.5 3h2.115a.75.75 0 0 1 0 1.5H6a.75.75 0 0 1 0-1.5h1.615l.5-3H3.75A3.75 3.75 0 0 1 0 12.75v-9A3.75 3.75 0 0 1 3.75 0h16.5A3.75 3.75 0 0 1 24 3.75v6a.75.75 0 0 1-1.5 0v-6a2.25 2.25 0 0 0-2.25-2.25H3.75ZM18.034 19.92a.75.75 0 0 0 1.5 0V19a.75.75 0 0 0-1.5 0v.92Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M22.5 14.25v.878A2.251 2.251 0 0 1 24 17.25v4.5A2.25 2.25 0 0 1 21.75 24h-6a2.25 2.25 0 0 1-2.25-2.25v-4.5c0-.98.626-1.813 1.5-2.122v-.878a3.75 3.75 0 0 1 7.5 0Zm-7.5 3a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-.75.75h-6a.75.75 0 0 1-.75-.75v-4.5Zm6-3V15h-4.5v-.75a2.25 2.25 0 0 1 4.5 0Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--access_control-color":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M15.75 16.5a.75.75 0 0 0-.75.75v4.5c0 .414.336.75.75.75h6a.75.75 0 0 0 .75-.75v-4.5a.75.75 0 0 0-.75-.75h-6Zm-2.25.75A2.25 2.25 0 0 1 15.75 15h6A2.25 2.25 0 0 1 24 17.25v4.5A2.25 2.25 0 0 1 21.75 24h-6a2.25 2.25 0 0 1-2.25-2.25v-4.5Z' fill='%2329D305'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M16.098 11.598A3.75 3.75 0 0 1 22.5 14.25v1.5a.75.75 0 0 1-.75.75h-6a.75.75 0 0 1-.75-.75v-1.5a3.75 3.75 0 0 1 1.098-2.652ZM18.75 12a2.25 2.25 0 0 0-2.25 2.25V15H21v-.75A2.25 2.25 0 0 0 18.75 12Z' fill='%2329D305'/%3e%3cpath d='M2.159 2.159A2.25 2.25 0 0 1 3.75 1.5h16.5a2.25 2.25 0 0 1 2.25 2.25v6a.75.75 0 0 0 1.5 0v-6A3.75 3.75 0 0 0 20.25 0H3.75A3.75 3.75 0 0 0 0 3.75v9a3.75 3.75 0 0 0 3.75 3.75h4.365l-.5 3H6A.75.75 0 0 0 6 21h5.25a.75.75 0 0 0 0-1.5H9.135l.5-3h1.615a.75.75 0 0 0 0-1.5h-7.5a2.25 2.25 0 0 1-2.121-1.5H12.75a.75.75 0 0 0 0-1.5H1.5V3.75c0-.597.237-1.169.659-1.591ZM18.784 20.67a.75.75 0 0 1-.75-.75V19a.75.75 0 0 1 1.5 0v.92a.75.75 0 0 1-.75.75Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--add_circle":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M11.25 16.5a.75.75 0 0 0 1.5 0v-3.75h3.75a.75.75 0 0 0 0-1.5h-3.75V7.5a.75.75 0 0 0-1.5 0v3.75H7.5a.75.75 0 0 0 0 1.5h3.75v3.75Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M0 12c0 6.617 5.383 12 12 12s12-5.383 12-12S18.617 0 12 0 0 5.383 0 12Zm1.5 0C1.5 6.21 6.21 1.5 12 1.5S22.5 6.21 22.5 12 17.79 22.5 12 22.5 1.5 17.79 1.5 12Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--add_circle-color":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12 17.25a.75.75 0 0 1-.75-.75v-3.75H7.5a.75.75 0 0 1 0-1.5h3.75V7.5a.75.75 0 0 1 1.5 0v3.75h3.75a.75.75 0 0 1 0 1.5h-3.75v3.75a.75.75 0 0 1-.75.75Z' fill='black'/%3e%3cpath d='M12 24C5.383 24 0 18.617 0 12S5.383 0 12 0s12 5.383 12 12-5.383 12-12 12Zm0-22.5C6.21 1.5 1.5 6.21 1.5 12S6.21 22.5 12 22.5 22.5 17.79 22.5 12 17.79 1.5 12 1.5Z' fill='%2329D305'/%3e%3c/svg%3e",
     "e-icon--add_circle-filled":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12 24C5.383 24 0 18.617 0 12S5.383 0 12 0s12 5.383 12 12-5.383 12-12 12Z' fill='black'/%3e%3cpath d='M12 17.25a.75.75 0 0 1-.75-.75v-3.75H7.5a.75.75 0 0 1 0-1.5h3.75V7.5a.75.75 0 0 1 1.5 0v3.75h3.75a.75.75 0 0 1 0 1.5h-3.75v3.75a.75.75 0 0 1-.75.75Z' fill='white'/%3e%3c/svg%3e",
     "e-icon--add_circle-filled-color":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M0 12c0 6.617 5.383 12 12 12s12-5.383 12-12S18.617 0 12 0 0 5.383 0 12Z' fill='%2329D305'/%3e%3cpath d='M12 17.25a.75.75 0 0 1-.75-.75v-3.75H7.5a.75.75 0 0 1 0-1.5h3.75V7.5a.75.75 0 0 1 1.5 0v3.75h3.75a.75.75 0 0 1 0 1.5h-3.75v3.75a.75.75 0 0 1-.75.75Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--add_powermeter":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='25' height='25' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M.009 18.753a2.252 2.252 0 0 0 2.25 2.25H8.75a.75.75 0 0 0 0-1.5H2.259a.75.75 0 0 1-.75-.75V6.003h19.5V9.25a.75.75 0 0 0 1.5 0V2.253a2.252 2.252 0 0 0-2.25-2.25h-18a2.252 2.252 0 0 0-2.25 2.25v16.5Zm21-16.5v2.25h-19.5v-2.25a.75.75 0 0 1 .75-.75h18a.75.75 0 0 1 .75.75Zm-10.5 15a6.758 6.758 0 0 0 6.75 6.75 6.758 6.758 0 0 0 6.75-6.75 6.758 6.758 0 0 0-6.75-6.75 6.758 6.758 0 0 0-6.75 6.75Zm1.5 0a5.256 5.256 0 0 1 5.25-5.25 5.256 5.256 0 0 1 5.25 5.25 5.256 5.256 0 0 1-5.25 5.25 5.256 5.256 0 0 1-5.25-5.25Zm5.25 3.75a.75.75 0 0 1-.75-.75v-2.25h-2.25a.75.75 0 0 1 0-1.5h2.25v-2.25a.75.75 0 0 1 1.5 0v2.25h2.25a.75.75 0 0 1 0 1.5h-2.25v2.25a.75.75 0 0 1-.75.75Zm-11.39-8.35H8.14v.973H4.896v-3.244h2.27V9.3h-2.27v-.973H8.14v3.028H5.87v1.298Zm3.787-4.326h3.245v1.801a8.035 8.035 0 0 0-1.57 1.227H9.656v-.973h2.272V9.3H9.656v-.973Zm.627 4.326h-.627v.973h.088c.157-.337.338-.663.539-.973ZM17 9a7.99 7.99 0 0 0-2.582.426v-1.1h3.028v.686A8.125 8.125 0 0 0 17 9Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--add_powermeter-color":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='25' height='25' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M2.259 21.003a2.252 2.252 0 0 1-2.25-2.25v-16.5a2.252 2.252 0 0 1 2.25-2.25h18a2.252 2.252 0 0 1 2.25 2.25V9.25a.75.75 0 0 1-1.5 0V6.003h-19.5v12.75c0 .414.336.75.75.75H8.75a.75.75 0 0 1 0 1.5H2.259Zm18.75-16.5v-2.25a.75.75 0 0 0-.75-.75h-18a.75.75 0 0 0-.75.75v2.25h19.5Z' fill='black'/%3e%3cpath d='M17.259 24.003a6.758 6.758 0 0 1-6.75-6.75 6.758 6.758 0 0 1 6.75-6.75 6.758 6.758 0 0 1 6.75 6.75 6.758 6.758 0 0 1-6.75 6.75Zm0-12a5.256 5.256 0 0 0-5.25 5.25 5.256 5.256 0 0 0 5.25 5.25 5.256 5.256 0 0 0 5.25-5.25 5.256 5.256 0 0 0-5.25-5.25Z' fill='%2329D305'/%3e%3cpath d='M17.259 21.003a.75.75 0 0 1-.75-.75v-2.25h-2.25a.75.75 0 0 1 0-1.5h2.25v-2.25a.75.75 0 0 1 1.5 0v2.25h2.25a.75.75 0 0 1 0 1.5h-2.25v2.25a.75.75 0 0 1-.75.75ZM8.14 12.653H5.87v-1.298H8.14V8.327H4.896V9.3h2.27v1.082h-2.27v3.245H8.14v-.974Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M9.656 8.327h3.245v1.801a8.035 8.035 0 0 0-1.57 1.227H9.656v-.973h2.272V9.3H9.656v-.973Zm.627 4.326h-.627v.973h.088c.157-.337.338-.663.539-.973ZM14.418 9.426a7.99 7.99 0 0 1 3.028-.414v-.685h-3.029v1.099Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--adjust":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='25' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M.002 11.998a.75.75 0 0 1 .75-.75h8.25a.75.75 0 0 1 0 1.5H.752a.75.75 0 0 1-.75-.75ZM14.252 11.998a.75.75 0 0 1 .75-.75h8.25a.75.75 0 0 1 0 1.5h-8.25a.75.75 0 0 1-.75-.75Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M5.032 7.718a.75.75 0 0 1 0 1.06l-3.22 3.22 3.22 3.22a.75.75 0 0 1-1.06 1.06l-3.75-3.75a.75.75 0 0 1 0-1.06l3.75-3.75a.75.75 0 0 1 1.06 0ZM18.972 7.718a.75.75 0 0 1 1.06 0l3.75 3.75a.75.75 0 0 1 0 1.06l-3.75 3.75a.75.75 0 1 1-1.06-1.06l3.22-3.22-3.22-3.22a.75.75 0 0 1 0-1.06ZM12.002 6.748a.75.75 0 0 1 .75.75v9a.75.75 0 1 1-1.5 0v-9a.75.75 0 0 1 .75-.75Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--agreements-color":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M0 18.75C0 19.991 1.01 21 2.253 21h7.256a.75.75 0 1 0 0-1.5H2.253a.75.75 0 0 1-.751-.75V2.25a.75.75 0 0 1 .75-.75h10.642c.2 0 .388.078.53.219L16.3 4.591c.139.14.219.333.219.53V8.25a.75.75 0 0 0 1.502 0V5.12c0-.6-.235-1.165-.66-1.59L14.486.658A2.24 2.24 0 0 0 12.894 0H2.253A2.254 2.254 0 0 0 0 2.25v16.5Z' fill='black'/%3e%3cpath d='M4.844 9.5c-.466 0-.844.336-.844.75s.378.75.844.75h7.312c.466 0 .844-.336.844-.75s-.378-.75-.844-.75H4.844ZM4 6.75c0-.414.378-.75.844-.75h7.312c.466 0 .844.336.844.75s-.378.75-.844.75H4.844C4.378 7.5 4 7.164 4 6.75ZM4.75 13a.75.75 0 0 0 0 1.5h3.5a.75.75 0 0 0 0-1.5h-3.5Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M14.502 14.803h-1.107a.795.795 0 0 0-.795.795 4.598 4.598 0 0 0 3.679 4.506l.124.025v3.076a.795.795 0 0 0 1.59 0v-3.076l.125-.025a4.598 4.598 0 0 0 3.679-4.506.795.795 0 0 0-.795-.795h-1.107v-3.008a.795.795 0 1 0-1.59 0v3.008h-2.213v-3.008a.795.795 0 1 0-1.59 0v3.008Zm2.7 3.804h-.004a3.008 3.008 0 0 1-2.836-2.006l-.073-.208H20.108l-.073.208a3.006 3.006 0 0 1-2.833 2.006Z' fill='%2329D305'/%3e%3c/svg%3e",
     "e-icon--analytics_bars":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M10.75 17.5a.75.75 0 0 1-.75-.75V11.5a.75.75 0 0 1 1.5 0v5.25a.75.75 0 0 1-.75.75ZM7.75 17.5a.75.75 0 0 1-.75-.75v-7a.75.75 0 0 1 1.5 0v7a.75.75 0 0 1-.75.75ZM13.75 17.5a.75.75 0 0 1-.75-.75v-3a.75.75 0 0 1 1.5 0v3a.75.75 0 0 1-.75.75ZM16.75 17.5a.75.75 0 0 1-.75-.75v-10a.75.75 0 0 1 1.5 0v10a.75.75 0 0 1-.75.75ZM4.5 17.5a.75.75 0 0 1-.75-.75v-3a.75.75 0 0 1 1.5 0v3a.75.75 0 0 1-.75.75ZM19.75 17.5a.75.75 0 0 1-.75-.75v-5a.75.75 0 0 1 1.5 0v5a.75.75 0 0 1-.75.75Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M.25 5.5A2.75 2.75 0 0 1 3 2.75h18a2.75 2.75 0 0 1 2.75 2.75v13A2.75 2.75 0 0 1 21 21.25H3A2.75 2.75 0 0 1 .25 18.5v-13ZM3 4.25c-.69 0-1.25.56-1.25 1.25v13c0 .69.56 1.25 1.25 1.25h18c.69 0 1.25-.56 1.25-1.25v-13c0-.69-.56-1.25-1.25-1.25H3Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--arrow_circle-color":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M13.366 7.434a.8.8 0 1 0-1.132 1.132L14.87 11.2H7.2a.8.8 0 0 0 0 1.6h7.669l-2.635 2.634a.8.8 0 1 0 1.132 1.132l3.996-3.996A.81.81 0 0 0 17.6 12a.798.798 0 0 0-.238-.57l-3.996-3.996Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M12 22.4c5.744 0 10.4-4.656 10.4-10.4 0-5.744-4.656-10.4-10.4-10.4C6.256 1.6 1.6 6.256 1.6 12c0 5.744 4.656 10.4 10.4 10.4ZM24 12c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12Z' fill='%2329D305'/%3e%3c/svg%3e",
     "e-icon--arrow_right_circle-color":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M13.366 7.434a.8.8 0 1 0-1.132 1.132L14.87 11.2H7.2a.8.8 0 0 0 0 1.6h7.669l-2.635 2.634a.8.8 0 1 0 1.132 1.132l3.996-3.996A.81.81 0 0 0 17.6 12a.798.798 0 0 0-.238-.57l-3.996-3.996Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M12 22.4c5.744 0 10.4-4.656 10.4-10.4 0-5.744-4.656-10.4-10.4-10.4C6.256 1.6 1.6 6.256 1.6 12c0 5.744 4.656 10.4 10.4 10.4ZM24 12c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12Z' fill='%2329D305'/%3e%3c/svg%3e",
     "e-icon--arrow_circle-filled-color":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M24 12c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12Z' fill='%2329D305'/%3e%3cpath d='M13.366 7.434a.8.8 0 1 0-1.132 1.132L14.87 11.2H7.2a.8.8 0 0 0 0 1.6h7.669l-2.635 2.634a.8.8 0 1 0 1.132 1.132l3.996-3.996a.77.77 0 0 0 .166-.237.799.799 0 0 0-.166-.902l-3.996-3.997Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--arrow_right_circle-filled-color":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M24 12c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12Z' fill='%2329D305'/%3e%3cpath d='M13.366 7.434a.8.8 0 1 0-1.132 1.132L14.87 11.2H7.2a.8.8 0 0 0 0 1.6h7.669l-2.635 2.634a.8.8 0 1 0 1.132 1.132l3.996-3.996a.77.77 0 0 0 .166-.237.799.799 0 0 0-.166-.902l-3.996-3.997Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--arrow_right_circle":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.234 7.434a.8.8 0 0 1 1.132 0l4 4a.798.798 0 0 1 0 1.132l-4 4a.8.8 0 0 1-1.132-1.132L14.87 12.8H7.2a.8.8 0 0 1 0-1.6h7.669l-2.635-2.634a.8.8 0 0 1 0-1.132Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0ZM1.6 12C1.6 6.256 6.256 1.6 12 1.6c5.744 0 10.4 4.656 10.4 10.4 0 5.744-4.656 10.4-10.4 10.4-5.744 0-10.4-4.656-10.4-10.4Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--arrow_left_circle":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M12 1.6C6.256 1.6 1.6 6.256 1.6 12c0 5.744 4.656 10.4 10.4 10.4 5.744 0 10.4-4.656 10.4-10.4 0-5.744-4.656-10.4-10.4-10.4ZM0 12C0 5.373 5.373 0 12 0s12 5.373 12 12-5.373 12-12 12S0 18.627 0 12Z' fill='black'/%3e%3cpath d='M11.766 8.566a.8.8 0 0 0-1.132-1.132l-3.99 3.991a.797.797 0 0 0-.01 1.14l4 4a.8.8 0 0 0 1.132-1.13L9.13 12.798h7.67a.8.8 0 1 0 0-1.599H9.131l2.635-2.634Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--arrow_left_circle-color":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M11.766 8.566a.8.8 0 0 0-1.132-1.132l-3.99 3.991a.797.797 0 0 0-.01 1.14l4 4a.8.8 0 0 0 1.132-1.13L9.13 12.798h7.67a.8.8 0 1 0 0-1.599H9.131l2.635-2.634Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M12 1.6C6.256 1.6 1.6 6.256 1.6 12c0 5.744 4.656 10.4 10.4 10.4 5.744 0 10.4-4.656 10.4-10.4 0-5.744-4.656-10.4-10.4-10.4ZM0 12C0 5.373 5.373 0 12 0s12 5.373 12 12-5.373 12-12 12S0 18.627 0 12Z' fill='%2329D305'/%3e%3c/svg%3e",
     "e-icon--arrow_left_circle-filled-color":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M0 12C0 5.373 5.373 0 12 0s12 5.373 12 12-5.373 12-12 12S0 18.627 0 12Z' fill='%2329D305'/%3e%3cpath d='M11.766 8.566a.8.8 0 0 0-1.132-1.132l-3.99 3.991a.797.797 0 0 0-.01 1.14l4 4a.8.8 0 0 0 1.132-1.13L9.13 12.798h7.67a.8.8 0 1 0 0-1.599H9.131l2.635-2.634Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--arrow_down":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M.476 5.994a.75.75 0 0 1 1.06.012L12 16.707 22.464 6.006a.75.75 0 0 1 1.072 1.048l-10.481 10.72A1.483 1.483 0 0 1 12 18.22a1.469 1.469 0 0 1-1.055-.445L.464 7.054a.75.75 0 0 1 .012-1.061Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--arrow_down-bold":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M.389 5.869a1.328 1.328 0 0 1 1.878 0L12 15.6l9.733-9.732a1.328 1.328 0 0 1 1.878 1.878L13.443 17.915h-.001a2.04 2.04 0 0 1-2.885 0L.39 7.747a1.328 1.328 0 0 1 0-1.878Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--arrow_external":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='m20.142 2.26-7.811 7.811a1.13 1.13 0 0 0 1.597 1.598l7.813-7.812v6.138a1.13 1.13 0 1 0 2.259 0V1.13a1.125 1.125 0 0 0-.412-.872A1.123 1.123 0 0 0 22.87 0h-8.865a1.13 1.13 0 0 0 0 2.26h6.137ZM.05 6.209c0-2.296 1.899-4.159 4.243-4.159H8.26c.62 0 1.12.492 1.12 1.098 0 .605-.5 1.098-1.12 1.098H4.293c-1.105 0-2.002.878-2.002 1.963V19.79c0 1.085.897 1.963 2.002 1.963h13.414c1.105 0 2.002-.878 2.002-1.963v-4.033c0-.605.5-1.098 1.12-1.098.62 0 1.121.493 1.121 1.098v4.033c0 2.296-1.899 4.159-4.243 4.159H4.293C1.949 23.95.05 22.087.05 19.791V6.21Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--arrow_external-bold":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='m20.142 2.26-7.811 7.811a1.13 1.13 0 0 0 1.597 1.598l7.813-7.812v6.138a1.13 1.13 0 1 0 2.259 0V1.13a1.125 1.125 0 0 0-.412-.872A1.123 1.123 0 0 0 22.87 0h-8.865a1.13 1.13 0 0 0 0 2.26h6.137ZM.05 6.209c0-2.296 1.899-4.159 4.243-4.159H8.26c.62 0 1.12.492 1.12 1.098 0 .605-.5 1.098-1.12 1.098H4.293c-1.105 0-2.002.878-2.002 1.963V19.79c0 1.085.897 1.963 2.002 1.963h13.414c1.105 0 2.002-.878 2.002-1.963v-4.033c0-.605.5-1.098 1.12-1.098.62 0 1.121.493 1.121 1.098v4.033c0 2.296-1.899 4.159-4.243 4.159H4.293C1.949 23.95.05 22.087.05 19.791V6.21Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--arrow_left":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M17.486.23a.766.766 0 0 1-.012 1.084L6.544 12l10.93 10.686a.766.766 0 0 1-1.071 1.096L5.455 13.077A1.513 1.513 0 0 1 5 12a1.5 1.5 0 0 1 .455-1.077L16.403.218a.766.766 0 0 1 1.083.012Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--arrow_left-bold":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M17.715.389c.518.519.518 1.36 0 1.878L7.982 12l9.733 9.733a1.328 1.328 0 0 1-1.878 1.878L5.668 13.443v-.001a2.038 2.038 0 0 1 0-2.884L15.837.388a1.328 1.328 0 0 1 1.878 0Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--arrow_long_left":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M0 12a.75.75 0 0 1 .75-.75h22.5a.75.75 0 0 1 0 1.5H.75A.75.75 0 0 1 0 12Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M11.78 1.215a.722.722 0 0 1 0 1.037L1.81 12l9.97 9.748a.722.722 0 0 1 0 1.037.762.762 0 0 1-1.06 0L.22 12.518a.722.722 0 0 1 0-1.037l10.5-10.266a.762.762 0 0 1 1.06 0Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--arrow_long_left-bold":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M0 12c0-.69.557-1.25 1.243-1.25h21.514c.686 0 1.243.56 1.243 1.25s-.556 1.25-1.243 1.25H1.243C.557 13.25 0 12.69 0 12Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M12.162 1.355a1.19 1.19 0 0 1 0 1.714L3 12l9.16 8.931a1.19 1.19 0 0 1 0 1.714 1.266 1.266 0 0 1-1.757 0L.364 12.857a1.19 1.19 0 0 1 0-1.714l10.04-9.788a1.266 1.266 0 0 1 1.758 0Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--arrow_long_right":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M23.5 12a.75.75 0 0 1-.75.75h-22a.75.75 0 0 1 0-1.5h22a.75.75 0 0 1 .75.75Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M23.776 11.482c.299.286.299.75 0 1.037L13.052 22.785a.79.79 0 0 1-1.083 0 .712.712 0 0 1 0-1.037L22.151 12 11.969 2.252a.711.711 0 0 1 0-1.037.79.79 0 0 1 1.083 0l10.724 10.267Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--arrow_long":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M23.5 12a.75.75 0 0 1-.75.75h-22a.75.75 0 0 1 0-1.5h22a.75.75 0 0 1 .75.75Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M23.776 11.482c.299.286.299.75 0 1.037L13.052 22.785a.79.79 0 0 1-1.083 0 .712.712 0 0 1 0-1.037L22.151 12 11.969 2.252a.711.711 0 0 1 0-1.037.79.79 0 0 1 1.083 0l10.724 10.267Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--arrow_long_right-bold":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M0 11.999c0-.69.545-1.25 1.217-1.25h21.066c.672 0 1.217.56 1.217 1.25s-.545 1.25-1.217 1.25H1.217c-.672 0-1.217-.56-1.217-1.25Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M12.191 1.355a1.204 1.204 0 0 1 1.707 0l9.748 9.788c.472.473.472 1.24 0 1.714l-9.748 9.788a1.204 1.204 0 0 1-1.707 0 1.216 1.216 0 0 1 0-1.714L21.086 12l-8.895-8.931a1.215 1.215 0 0 1 0-1.714Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--arrow_long-bold":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M0 11.999c0-.69.545-1.25 1.217-1.25h21.066c.672 0 1.217.56 1.217 1.25s-.545 1.25-1.217 1.25H1.217c-.672 0-1.217-.56-1.217-1.25Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M12.191 1.355a1.204 1.204 0 0 1 1.707 0l9.748 9.788c.472.473.472 1.24 0 1.714l-9.748 9.788a1.204 1.204 0 0 1-1.707 0 1.216 1.216 0 0 1 0-1.714L21.086 12l-8.895-8.931a1.215 1.215 0 0 1 0-1.714Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--arrow_right":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M6.218 23.77a.766.766 0 0 1 .012-1.084L17.16 12 6.23 1.314A.766.766 0 1 1 7.301.218L18.25 10.923A1.514 1.514 0 0 1 18.704 12a1.5 1.5 0 0 1-.454 1.077L7.3 23.782a.766.766 0 0 1-1.083-.012Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--arrow_right-bold":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M6.289.389a1.328 1.328 0 0 1 1.878 0l10.169 10.168a2.038 2.038 0 0 1 0 2.886L8.167 23.61a1.328 1.328 0 1 1-1.878-1.878L16.022 12 6.289 2.267a1.328 1.328 0 0 1 0-1.878Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--arrow_up":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M23.524 18.006a.75.75 0 0 1-1.06-.012L12 7.293 1.536 17.994a.75.75 0 1 1-1.072-1.049l10.481-10.72A1.482 1.482 0 0 1 12 5.78a1.468 1.468 0 0 1 1.055.446l10.481 10.72a.75.75 0 0 1-.012 1.06Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--arrow_up-bold":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='m12 8.392-9.733 9.732A1.328 1.328 0 0 1 .39 16.246L10.557 6.078h.001a2.039 2.039 0 0 1 2.884 0l10.169 10.168a1.328 1.328 0 0 1-1.878 1.878L12 8.392Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--attendance":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M17.25 12a5.25 5.25 0 1 0 0 10.5 5.25 5.25 0 0 0 0-10.5Zm-6.75 5.25a6.75 6.75 0 1 1 13.5 0 6.75 6.75 0 0 1-13.5 0Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M20.374 14.905a.75.75 0 0 1 .15 1.05l-2.905 3.874a1.504 1.504 0 0 1-1.725.505 1.5 1.5 0 0 1-.536-.345l-1.5-1.5a.75.75 0 0 1 1.06-1.06l1.5 1.5h.001l2.905-3.874a.75.75 0 0 1 1.05-.15ZM6 1.5A2.25 2.25 0 1 0 6 6a2.25 2.25 0 0 0 0-4.5ZM2.25 3.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M4.456 7.703a6.001 6.001 0 0 1 6.75 2.812.75.75 0 1 1-1.301.746A4.5 4.5 0 0 0 1.5 13.5V15H3a.75.75 0 0 1 .746.675L4.43 22.5H7.57l.256-2.558a.75.75 0 0 1 1.492.15l-.323 3.233A.75.75 0 0 1 8.25 24h-4.5a.75.75 0 0 1-.746-.675L2.32 16.5H.75a.75.75 0 0 1-.75-.75V13.5a6.002 6.002 0 0 1 4.456-5.797Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--attachment":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M9.75 24a5.256 5.256 0 0 1-5.25-5.25V7.5C4.5 3.365 7.865 0 12 0s7.5 3.365 7.5 7.5v8.249a.75.75 0 0 1-1.5 0V7.5c0-3.308-2.692-6-6-6s-6 2.692-6 6v11.25a3.754 3.754 0 0 0 3.75 3.75 3.754 3.754 0 0 0 3.75-3.75V7.5c0-.827-.673-1.5-1.5-1.5s-1.5.673-1.5 1.5v9.75a.75.75 0 0 1-1.5 0V7.5c0-1.654 1.346-3 3-3s3 1.346 3 3v11.25A5.256 5.256 0 0 1 9.75 24Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--attachment-color":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3crect x='11.25' y='11.737' width='4.994' height='1.5' rx='.75' transform='rotate(-90 11.25 11.737)' fill='%2329D305'/%3e%3cpath d='M9.75 24a5.256 5.256 0 0 1-5.25-5.25V7.5C4.5 3.365 7.865 0 12 0s7.5 3.365 7.5 7.5v8.249a.75.75 0 0 1-1.5 0V7.5c0-3.308-2.692-6-6-6s-6 2.692-6 6v11.25a3.754 3.754 0 0 0 3.75 3.75 3.754 3.754 0 0 0 3.75-3.75V7.5c0-.827-.673-1.5-1.5-1.5s-1.5.673-1.5 1.5v9.75a.75.75 0 0 1-1.5 0V7.5c0-1.654 1.346-3 3-3s3 1.346 3 3v11.25A5.256 5.256 0 0 1 9.75 24Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--bin":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M8.571 17.136v-6.857a.857.857 0 0 1 1.715 0v6.857a.857.857 0 0 1-1.715 0ZM15.429 17.136v-6.857a.857.857 0 1 0-1.715 0v6.857a.857.857 0 0 0 1.715 0Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M9.428.85a2.571 2.571 0 0 0-2.57 2.571v.858h-6a.857.857 0 1 0 0 1.714h2.57v14.571A2.571 2.571 0 0 0 6 23.136h12a2.57 2.57 0 0 0 2.572-2.572V5.993h2.57a.857.857 0 0 0 0-1.714h-6V3.42A2.571 2.571 0 0 0 14.573.85H9.427Zm9.43 5.143v14.571a.857.857 0 0 1-.858.857H6a.857.857 0 0 1-.857-.857V5.993h13.714Zm-3.43-1.714V3.42a.857.857 0 0 0-.857-.857H9.428a.857.857 0 0 0-.857.857v.858h6.857Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--bookmark":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M9.6 1.6a2 2 0 0 0-2 2v17.669l4.234-4.235a.8.8 0 0 1 1.132 0L17.2 21.27V3.6a2 2 0 0 0-2-2H9.6Zm-2.546-.546A3.6 3.6 0 0 1 9.6 0h5.6a3.6 3.6 0 0 1 3.6 3.6v19.6a.8.8 0 0 1-1.366.566L12.4 18.73l-5.034 5.035A.8.8 0 0 1 6 23.2V3.6a3.6 3.6 0 0 1 1.054-2.546Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--bookmark-filled":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M7.054 1.054A3.6 3.6 0 0 1 9.6 0h5.6a3.6 3.6 0 0 1 3.6 3.6v19.6a.8.8 0 0 1-1.366.566L12.4 18.73l-5.034 5.035A.8.8 0 0 1 6 23.2V3.6a3.6 3.6 0 0 1 1.054-2.546Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--bookshelf":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M3 0a.75.75 0 0 1 .75.75v22.5a.75.75 0 0 1-1.5 0V.75A.75.75 0 0 1 3 0ZM21 0a.75.75 0 0 1 .75.75v22.5a.75.75 0 0 1-1.5 0V.75A.75.75 0 0 1 21 0Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M.75 20.25a.75.75 0 0 1 .75-.75h21a.75.75 0 0 1 0 1.5h-21a.75.75 0 0 1-.75-.75ZM.75 9.75A.75.75 0 0 1 1.5 9h21a.75.75 0 0 1 0 1.5h-21a.75.75 0 0 1-.75-.75Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M5.25 3A.75.75 0 0 1 6 2.25h3a.75.75 0 0 1 .75.75v6.75a.75.75 0 0 1-.75.75H6a.75.75 0 0 1-.75-.75V3Zm1.5.75V9h1.5V3.75h-1.5ZM6 13.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75v6.75a.75.75 0 0 1-.75.75h-3a.75.75 0 0 1-.75-.75V13.5Zm1.5.75v5.25H9v-5.25H7.5ZM12 13.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75v6.75a.75.75 0 0 1-.75.75h-3a.75.75 0 0 1-.75-.75V13.5Zm1.5.75v5.25H15v-5.25h-1.5Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M8.25 3A.75.75 0 0 1 9 2.25h3a.75.75 0 0 1 .75.75v6.75a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75V3Zm1.5.75V9h1.5V3.75h-1.5Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M17.598 2.05a.75.75 0 0 1 .996-.365l2.721 1.263a.75.75 0 0 1 .364.996l-2.842 6.122a.75.75 0 0 1-.996.365l-2.72-1.263a.75.75 0 0 1-.365-.996l2.842-6.123Zm1.045 1.311-2.211 4.762 1.36.632 2.211-4.762-1.36-.632Z' fill='%2329D305'/%3e%3c/svg%3e",
     "e-icon--box":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M11.775 23.963a.72.72 0 0 0 .503-.016l11.25-4.5A.747.747 0 0 0 24 18.75V5.25a.767.767 0 0 0-.15-.446l-.006-.008a.722.722 0 0 0-.094-.102l-.017-.014a.732.732 0 0 0-.062-.051.641.641 0 0 0-.091-.05.489.489 0 0 0-.052-.025L12.279.054a.74.74 0 0 0-.558 0L.47 4.554a.662.662 0 0 0-.053.026.571.571 0 0 0-.132.084.685.685 0 0 0-.172.194A.803.803 0 0 0 0 5.25v13.5c0 .309.185.582.471.696l11.25 4.5a.426.426 0 0 0 .054.017ZM22.5 18.242l-9.75 3.9V10.258l9.75-3.9v11.884Zm-11.25-7.984v11.884L1.5 18.243V6.358l9.75 3.9Zm4.918-2.983L12 8.942 2.77 5.25l4.168-1.667 9.23 3.692ZM21.23 5.25l-3.043 1.217-9.23-3.692L12 1.558l9.23 3.692Zm-3.176 12.278a.744.744 0 0 0 .974.418l1.875-.75a.747.747 0 0 0 .418-.975.744.744 0 0 0-.974-.418l-1.875.75a.747.747 0 0 0-.418.975Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--business-color":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M2.746 9.484a.706.706 0 0 1 .704-.645h2.357c.362 0 .666.275.702.636L7.82 22.588h12.798v-8.91L8.942 15.054a.706.706 0 1 1-.165-1.402l12.464-1.47a.706.706 0 0 1 .788.702v10.41c0 .39-.316.706-.705.706H2.272a.706.706 0 0 1-.704-.766l1.178-13.75Zm3.656 13.104L5.168 10.251h-1.07L3.04 22.588h3.362ZM15.694.05a.706.706 0 0 1 .393.918c-.546 1.365-1.847 1.758-3.058 1.934-.486.071-1.014.114-1.536.157l-.42.035c-.67.058-1.333.129-1.976.266-1.496.321-2.383.935-2.944 1.6-.57.676-.85 1.46-1.036 2.203a.706.706 0 1 1-1.37-.343c.207-.829.554-1.855 1.327-2.771.784-.929 1.96-1.69 3.728-2.069.732-.157 1.469-.234 2.15-.292.154-.014.305-.026.452-.038.515-.042.984-.081 1.421-.145 1.146-.167 1.711-.462 1.951-1.061a.706.706 0 0 1 .918-.393Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M11.306 16.773c0-.39.317-.705.706-.705h1.731a.706.706 0 0 1 0 1.411h-1.73a.706.706 0 0 1-.707-.706Z' fill='%2329D305'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M16.02 16.773c0-.39.316-.705.706-.705h1.731a.706.706 0 0 1 0 1.411h-1.731a.706.706 0 0 1-.706-.706ZM11.306 19.523c0-.39.317-.706.706-.706h1.731a.706.706 0 0 1 0 1.412h-1.73a.706.706 0 0 1-.707-.706Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M16.02 19.523c0-.39.316-.706.706-.706h1.731a.706.706 0 0 1 0 1.412h-1.731a.706.706 0 0 1-.706-.706Z' fill='%2329D305'/%3e%3c/svg%3e",
     "e-icon--cabin":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='25' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M1.751 23.999a.75.75 0 0 1 0-1.5h.75v-5.625l-.3.225a.753.753 0 0 1-1.05-.15.75.75 0 0 1 .15-1.05l6-4.5a.745.745 0 0 1 .9 0l6 4.5a.75.75 0 0 1-.899 1.2l-.301-.225v5.625h6v-1.577a3.743 3.743 0 0 1-3-3.673c0-4.618 2.953-10.584 3.079-10.835a.746.746 0 0 1 .671-.415c.286 0 .543.159.671.415.126.252 3.079 6.217 3.079 10.835a3.743 3.743 0 0 1-3 3.673v1.577h3.75a.75.75 0 0 1 0 1.5h-22.5Zm9.75-1.5v-6.75l-3.75-2.812-3.75 2.812v6.75h1.5v-2.25a2.252 2.252 0 0 1 2.25-2.25 2.252 2.252 0 0 1 2.25 2.25v2.25h1.5Zm-3 0v-2.25a.75.75 0 0 0-1.5 0v2.25h1.5Zm11.25-13.936c-.869 2.037-2.25 5.737-2.25 8.686a2.252 2.252 0 0 0 2.25 2.25 2.252 2.252 0 0 0 2.25-2.25c0-2.951-1.381-6.65-2.25-8.686ZM4.743 7.5A3.756 3.756 0 0 1 1.137 4.76 3.75 3.75 0 0 1 4.75.008c.638 0 1.272.167 1.834.484.565.32 1.03.768 1.36 1.312.409-.2.858-.305 1.317-.305a3.007 3.007 0 0 1 3 3.012 3.006 3.006 0 0 1-3 2.988H4.743Zm.005-5.992a2.247 2.247 0 0 0-2.167 2.849A2.252 2.252 0 0 0 4.743 6h4.515a1.504 1.504 0 0 0 1.5-1.494 1.487 1.487 0 0 0-.435-1.062A1.485 1.485 0 0 0 9.266 3c-.419 0-.811.17-1.093.467a.758.758 0 0 1-.725.211.752.752 0 0 1-.542-.527 2.228 2.228 0 0 0-1.06-1.352 2.242 2.242 0 0 0-1.098-.29Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--cable":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M13.99 4.771a.04.04 0 0 0-.037.025.04.04 0 0 0-.003.015V6.203a3.41 3.41 0 0 0 2.889 3.447h.361a3.25 3.25 0 0 0 3.25-3.25V4.821a.05.05 0 0 0-.05-.05h-6.41Zm.014-1.5a1.54 1.54 0 0 0-1.554 1.555v1.353a4.91 4.91 0 0 0 4.23 4.964.747.747 0 0 0 .104.007h.416a4.75 4.75 0 0 0 4.75-4.75V4.821a1.55 1.55 0 0 0-1.55-1.55h-6.396Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M14.8.05a.75.75 0 0 1 .75.75V4a.75.75 0 0 1-1.5 0V.8a.75.75 0 0 1 .75-.75ZM19.6.05a.75.75 0 0 1 .75.75V4a.75.75 0 0 1-1.5 0V.8a.75.75 0 0 1 .75-.75ZM17.2 9.65a.75.75 0 0 1 .75.75V16a7.95 7.95 0 0 1-15.9.005c-.02-1.479.274-2.946.862-4.303a.75.75 0 0 1 1.376.596 8.967 8.967 0 0 0-.738 3.691V16a6.45 6.45 0 0 0 12.9 0v-5.6a.75.75 0 0 1 .75-.75Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--calendar":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3crect x='3' y='19.5' width='6' height='1.5' rx='.75' fill='black'/%3e%3cpath d='M2.25 24A2.252 2.252 0 0 1 0 21.75V5.25A2.252 2.252 0 0 1 2.25 3H6V.75a.75.75 0 0 1 1.5 0V3h9V.75a.75.75 0 0 1 1.5 0V3h3.75A2.252 2.252 0 0 1 24 5.25v16.5A2.252 2.252 0 0 1 21.75 24H2.25Zm-.75-2.25c0 .414.336.75.75.75h19.5a.75.75 0 0 0 .75-.75V10.5h-21v11.25ZM22.5 9V5.25a.75.75 0 0 0-.75-.75H18V6a.75.75 0 0 1-1.5 0V4.5h-9V6A.75.75 0 0 1 6 6V4.5H2.25a.75.75 0 0 0-.75.75V9h21Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--calendar_clock-color":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='25' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M2.25 18.02A2.253 2.253 0 0 1 0 15.769V3.754a2.253 2.253 0 0 1 2.25-2.252H4.5V.75a.75.75 0 1 1 1.5 0v.75h6v-.75a.75.75 0 1 1 1.5 0v.75h2.25c1.241 0 2.25 1.01 2.25 2.253V8.26a.75.75 0 1 1-1.5 0v-.75h-15v8.26c0 .414.336.75.75.75h6a.75.75 0 0 1 0 1.502h-6ZM16.5 6.008V3.754a.75.75 0 0 0-.75-.75H13.5v.75a.75.75 0 1 1-1.5 0v-.75H6v.75a.75.75 0 1 1-1.5 0v-.75H2.25a.75.75 0 0 0-.75.75v2.253h15Z' fill='black'/%3e%3cpath d='M17.25 24.028c-3.722 0-6.75-3.032-6.75-6.758s3.028-6.758 6.75-6.758S24 13.544 24 17.27s-3.028 6.758-6.75 6.758Zm0-12.014A5.259 5.259 0 0 0 12 17.27a5.259 5.259 0 0 0 5.25 5.256 5.259 5.259 0 0 0 5.25-5.256 5.259 5.259 0 0 0-5.25-5.256Z' fill='black'/%3e%3cpath d='M17.25 18.02a.75.75 0 0 1-.75-.75v-2.654a.75.75 0 1 1 1.5 0v1.903h1.902a.75.75 0 0 1 0 1.502H17.25Z' fill='black'/%3e%3cpath d='M3 14.25a.75.75 0 0 1 .75-.75h3.5a.75.75 0 0 1 0 1.5h-3.5a.75.75 0 0 1-.75-.75Z' fill='%2329D305'/%3e%3c/svg%3e",
     "e-icon--calendar-color":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M2.25 24A2.252 2.252 0 0 1 0 21.75V5.25A2.252 2.252 0 0 1 2.25 3H6V.75a.75.75 0 0 1 1.5 0V3h9V.75a.75.75 0 0 1 1.5 0V3h3.75A2.252 2.252 0 0 1 24 5.25v16.5A2.252 2.252 0 0 1 21.75 24H2.25Zm-.75-2.25c0 .414.336.75.75.75h19.5a.75.75 0 0 0 .75-.75V10.5h-21v11.25ZM22.5 9V5.25a.75.75 0 0 0-.75-.75H18V6a.75.75 0 0 1-1.5 0V4.5h-9V6A.75.75 0 0 1 6 6V4.5H2.25a.75.75 0 0 0-.75.75V9h21Z' fill='black'/%3e%3crect x='3' y='19.5' width='6' height='1.5' rx='.75' fill='%2329D305'/%3e%3c/svg%3e",
     "e-icon--call":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='25' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M18.035 24a6.295 6.295 0 0 1-3.411-1.01A50.474 50.474 0 0 1 1.004 9.375C-.6 6.85-.253 3.629 1.845 1.53L2.62.758A2.58 2.58 0 0 1 4.454 0c.694 0 1.345.269 1.834.758L9.55 4.022a2.595 2.595 0 0 1-.002 3.665 1.097 1.097 0 0 0 0 1.549l5.233 5.23c.193.192.468.306.76.306s.567-.114.773-.32a2.58 2.58 0 0 1 1.835-.758 2.58 2.58 0 0 1 1.835.757l3.26 3.259a2.596 2.596 0 0 1 0 3.667l-.773.774A6.241 6.241 0 0 1 18.035 24Zm-2.581-2.259c.798.5 1.683.757 2.583.757 1.267 0 2.464-.5 3.372-1.408l.774-.773a1.098 1.098 0 0 0 0-1.549l-3.26-3.257a1.087 1.087 0 0 0-.774-.319c-.293 0-.568.114-.774.32a2.578 2.578 0 0 1-1.834.758 2.57 2.57 0 0 1-1.824-.75l-5.228-5.226a2.596 2.596 0 0 1 0-3.667 1.096 1.096 0 0 0 0-1.544l-.026-.028-3.236-3.238a1.09 1.09 0 0 0-.773-.318c-.293 0-.568.114-.775.32l-.774.773a4.752 4.752 0 0 0-.653 5.948 48.957 48.957 0 0 0 13.202 13.201Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--car_charger-color":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='m11.01 0 11.672.31a1.131 1.131 0 0 1 1.103 1.114L24 16.992l-2.031 2.186a1.13 1.13 0 0 1-.79.322H8.006a1 1 0 0 1-1-1.007l.06-8.48c.458-.206.91-.415 1.262-.598l-.058 8.429 2.133-1.5V1.32l-2.02.199-.03 4.246c-.33.073-.768.174-1.26.298l.032-4.666A1.13 1.13 0 0 1 8.148.282L11.01 0Zm.653 1.273v14.832h11.066l-.201-14.543-10.865-.29ZM22.25 17.36H11.18l-1.18.885h11.277l.973-.885Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M8.684 8.027v-1.75c-.997.226-2.324.556-3.568.955-.861.277-1.639.572-2.226.872-.294.15-.509.284-.653.397a.97.97 0 0 0-.142.13c-.119.252-.246.68-.359 1.284-.112.6-.197 1.296-.259 2.018a46.971 46.971 0 0 0-.15 2.97h.815l1.21-3.533c.04-.113.182-.523.607-.807.232-.155.73-.411 1.216-.66l.45-.23c.423-.216.884-.451 1.337-.688a30.782 30.782 0 0 0 1.722-.958ZM10 8.614V5.29a.514.514 0 0 0-.618-.51C7.46 5.18 1.674 6.5.924 8.032.12 9.671.014 13.941 0 15.694a.52.52 0 0 0 .524.523h.627c-.18 1.166-.238 2.93.186 4.477.427 1.56 1.416 3.096 3.463 3.303.357.036.677-.211.715-.552a.628.628 0 0 0-.578-.682c-1.25-.126-1.972-1.029-2.342-2.382-.37-1.349-.32-2.952-.153-4.016.008-.05.009-.1.005-.148h.26a.525.525 0 0 0 .498-.355l1.393-4.067a.259.259 0 0 1 .092-.14c.192-.127.795-.435 1.528-.81C7.803 10.038 10 8.916 10 8.616Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='m14.49 8.203-.412.614a.9.9 0 0 0-.141.915.789.789 0 0 0 .583.428l1.202.19a.096.096 0 0 1 .085.111l-.618 4.224a.272.272 0 0 0 .166.297.277.277 0 0 0 .322-.096L18.56 11l1.391-1.801a.975.975 0 0 0 .16-.387.879.879 0 0 0 0-.413.805.805 0 0 0-.21-.357.643.643 0 0 0-.367-.186l-1.222-.196a.08.08 0 0 1-.07-.09c.09-.553.643-4.073.638-4.325-.005-.251-.392-.347-.568-.105L15.81 6.5l-1.32 1.703Z' fill='%2329D305'/%3e%3c/svg%3e",
     "e-icon--chainsaw":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M5.666.587a.751.751 0 0 0-1.467.329l.42 1.878A4.51 4.51 0 0 0 2.8 4.59L.958 4.064A.751.751 0 1 0 .546 5.51l1.756.5a4.507 4.507 0 0 0 .742 3.332l-1.017.936a.751.751 0 1 0 1.018 1.106l1.023-.94 2.358 2.255-1.172 1.079a.751.751 0 1 0 1.019 1.105l1.242-1.143 1.901 1.819-.5.46c-1.359 1.252-1.419 3.335-.13 4.523l3.08 2.686c1.362 1.255 3.594.938 4.696-.667l.478-.697 4.834.176a.75.75 0 0 0 .739-.411l1.306-2.543a.75.75 0 0 0-.335-1.007l-2.886-1.544 1.331-1.94c.77-1.12.758-2.569-.03-3.595l-1.344-1.353c-1.073-1.4-3.17-1.52-4.536-.26L16 9.494 13.918 7.47l1.19-1.094A.751.751 0 1 0 14.09 5.27L12.838 6.42 10.7 4.344l.95-.875a.751.751 0 1 0-1.017-1.106l-1.012.931a4.51 4.51 0 0 0-3.57-.98L5.667.587Zm14.176 17.195-1.794 2.613 3.452.105.742-1.414-2.4-1.304ZM9.052 4.838a3.007 3.007 0 1 0-4.451 4.036l5.91 5.649 4.371-4.021L9.11 4.893a.762.762 0 0 1-.056-.055Zm6.988 11.645a.751.751 0 1 0-1.063-1.063l-2.757 2.755a.751.751 0 1 0 1.063 1.063l2.757-2.755Zm1.098-5.991-7.203 6.633c-.68.625-.71 1.667-.065 2.261l3.08 2.686c.68.628 1.797.47 2.348-.333l5.467-7.966c.385-.56.38-1.285-.014-1.798l-1.346-1.353c-.536-.7-1.584-.76-2.267-.13Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--chat":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M22.5 19.716v-7.934c0-5.694-4.701-10.31-10.5-10.31-5.781 0-10.5 4.707-10.5 10.418 0 5.832 4.818 10.637 10.722 10.637h7.414c.654 0 1.076 0 1.4-.02.311-.019.431-.052.488-.073.408-.149.73-.464.881-.865.022-.056.055-.173.074-.48.02-.317.021-.731.021-1.373ZM12 0C5.373 0 0 5.383 0 11.89 0 18.517 5.472 24 12.222 24h7.414c1.27 0 1.905 0 2.412-.186a2.973 2.973 0 0 0 1.763-1.73c.189-.498.189-1.121.189-2.368v-7.934C24 5.275 18.627 0 12 0Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M7.55 10.582c.835 0 1.51.66 1.51 1.473 0 .813-.675 1.473-1.51 1.473-.833 0-1.51-.66-1.51-1.473 0-.813.677-1.473 1.51-1.473ZM12.081 10.582c.834 0 1.51.66 1.51 1.473 0 .813-.676 1.473-1.51 1.473s-1.51-.66-1.51-1.473c0-.813.676-1.473 1.51-1.473ZM16.611 10.582c.834 0 1.51.66 1.51 1.473 0 .813-.675 1.473-1.51 1.473-.834 0-1.51-.66-1.51-1.473 0-.813.676-1.473 1.51-1.473Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--charging_battery":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M.938 6.537c.6-.6 1.414-.937 2.263-.937H17.6a3.2 3.2 0 0 1 3.2 3.2h.8a2.4 2.4 0 0 1 2.4 2.4v1.6a2.4 2.4 0 0 1-2.4 2.4h-.8a3.2 3.2 0 0 1-3.2 3.2H3.2A3.2 3.2 0 0 1 0 15.2V8.8c0-.849.338-1.663.938-2.263Zm2.263.663A1.601 1.601 0 0 0 1.6 8.8v6.4a1.6 1.6 0 0 0 1.6 1.6h14.4a1.6 1.6 0 0 0 1.6-1.6v-.8a.8.8 0 0 1 .8-.8h1.6a.8.8 0 0 0 .8-.8v-1.6a.8.8 0 0 0-.8-.8H20a.8.8 0 0 1-.8-.8v-.8a1.6 1.6 0 0 0-1.6-1.6H3.201Zm2.4 1.6a.8.8 0 0 1 .8.8v4.8a.8.8 0 1 1-1.6 0V9.6a.8.8 0 0 1 .8-.8Zm5.6.8a.8.8 0 1 0-1.6 0v4.8a.8.8 0 1 0 1.6 0V9.6Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--charge":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M3.75 5.72a.75.75 0 0 1 .75.75v10.78a.75.75 0 0 0 .75.75h7.52a.75.75 0 0 1 0 1.5H5.25A2.25 2.25 0 0 1 3 17.25V6.47a.75.75 0 0 1 .75-.75Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M10.036.177a.75.75 0 0 1 .968 0l8.88 7.5a.75.75 0 1 1-.968 1.146L10.52 1.732 1.234 9.573a.75.75 0 0 1-.968-1.146l9.77-8.25ZM17.25 12a.75.75 0 0 0-.75.75v9c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-9a.75.75 0 0 0-.75-.75h-4.5Zm-2.25.75a2.25 2.25 0 0 1 2.25-2.25h4.5A2.25 2.25 0 0 1 24 12.75v9A2.25 2.25 0 0 1 21.75 24h-4.5A2.25 2.25 0 0 1 15 21.75v-9Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M15 20.25a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5a.75.75 0 0 1-.75-.75ZM10.52 6.75a.75.75 0 0 1 .75.75V10a.75.75 0 0 1-1.5 0V7.5a.75.75 0 0 1 .75-.75Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M8.93 8.33a.75.75 0 0 1 0 1.06 2.25 2.25 0 1 0 3.18 0 .75.75 0 1 1 1.06-1.06 3.75 3.75 0 1 1-5.3 0 .75.75 0 0 1 1.06 0Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--charging_battery-color":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M.938 6.537c.6-.6 1.414-.937 2.263-.937H17.6a3.2 3.2 0 0 1 3.2 3.2h.8a2.4 2.4 0 0 1 2.4 2.4v1.6a2.4 2.4 0 0 1-2.4 2.4h-.8a3.2 3.2 0 0 1-3.2 3.2H3.2A3.2 3.2 0 0 1 0 15.2V8.8c0-.849.338-1.663.938-2.263Zm2.263.663A1.601 1.601 0 0 0 1.6 8.8v6.4a1.6 1.6 0 0 0 1.6 1.6h14.4a1.6 1.6 0 0 0 1.6-1.6v-.8a.8.8 0 0 1 .8-.8h1.6a.8.8 0 0 0 .8-.8v-1.6a.8.8 0 0 0-.8-.8H20a.8.8 0 0 1-.8-.8v-.8a1.6 1.6 0 0 0-1.6-1.6H3.201Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M5.601 8.8a.8.8 0 0 1 .8.8v4.8a.8.8 0 1 1-1.6 0V9.6a.8.8 0 0 1 .8-.8ZM10.401 8.8a.8.8 0 0 1 .8.8v4.8a.8.8 0 1 1-1.6 0V9.6a.8.8 0 0 1 .8-.8Z' fill='%2329D305'/%3e%3c/svg%3e",
     "e-icon--check":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M23.468.225c.562.393.699 1.168.305 1.73L9.346 22.566l-.001.002a3.347 3.347 0 0 1-5.427.09v-.002l-3.67-4.89a1.243 1.243 0 0 1 1.99-1.492l3.672 4.895a.86.86 0 0 0 1.395-.023l.002-.003L21.737.53a1.243 1.243 0 0 1 1.73-.305Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--check-bold":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M23.468.225c.562.393.699 1.168.305 1.73L9.346 22.566l-.001.002a3.347 3.347 0 0 1-5.427.09v-.002l-3.67-4.89a1.243 1.243 0 0 1 1.99-1.492l3.672 4.895a.86.86 0 0 0 1.395-.023l.002-.003L21.737.53a1.243 1.243 0 0 1 1.73-.305Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--check_circle":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M7.591 11.31a.75.75 0 0 0-1.06 1.06l3.535 3.53a.75.75 0 0 0 1.06 0l7.072-7.062a.749.749 0 1 0-1.061-1.06l-6.54 6.534L7.59 11.31Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M0 12c0 6.617 5.383 12 12 12s12-5.383 12-12S18.617 0 12 0 0 5.383 0 12Zm1.5 0C1.5 6.21 6.21 1.5 12 1.5S22.5 6.21 22.5 12 17.79 22.5 12 22.5 1.5 17.79 1.5 12Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--check_circle-color":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12 24C5.383 24 0 18.617 0 12S5.383 0 12 0s12 5.383 12 12-5.383 12-12 12Zm0-22.5C6.21 1.5 1.5 6.21 1.5 12S6.21 22.5 12 22.5 22.5 17.79 22.5 12 17.79 1.5 12 1.5Z' fill='%2329D305'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M6.53 11.31a.75.75 0 0 1 1.061 0l3.005 3.002 6.54-6.534a.75.75 0 0 1 1.062 1.06L11.126 15.9a.75.75 0 0 1-1.06 0L6.53 12.369a.749.749 0 0 1 0-1.06Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--check_circle-filled":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12 24C5.383 24 0 18.617 0 12S5.383 0 12 0s12 5.383 12 12-5.383 12-12 12Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M6.47 11.309a.75.75 0 0 1 1.06 0l3.006 3.002 6.54-6.534a.75.75 0 0 1 1.06 1.06l-7.07 7.063a.75.75 0 0 1-1.06 0L6.47 12.368a.748.748 0 0 1 0-1.06Z' fill='white'/%3e%3c/svg%3e",
     "e-icon--check_circle-filled-color":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12 24C5.383 24 0 18.617 0 12S5.383 0 12 0s12 5.383 12 12-5.383 12-12 12Z' fill='%2329D305'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M6.47 11.309a.75.75 0 0 1 1.06 0l3.006 3.002 6.54-6.534a.75.75 0 0 1 1.06 1.06l-7.07 7.063a.75.75 0 0 1-1.06 0L6.47 12.368a.748.748 0 0 1 0-1.06Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--check_shield":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M3-.001a2.25 2.25 0 0 0-2.25 2.25v9c0 1.387.519 2.759 1.274 4.028.758 1.273 1.784 2.492 2.867 3.588 2.166 2.19 4.635 3.959 5.893 4.773a2.228 2.228 0 0 0 2.43 0c1.258-.813 3.729-2.583 5.895-4.773 1.083-1.096 2.109-2.315 2.867-3.588.755-1.27 1.274-2.64 1.274-4.028v-9A2.25 2.25 0 0 0 21-.001H3Zm-.53 1.72a.75.75 0 0 1 .53-.22h18a.75.75 0 0 1 .75.75v9c0 1.02-.385 2.122-1.063 3.26-.675 1.135-1.612 2.257-2.645 3.3-2.065 2.09-4.441 3.793-5.642 4.57l-.003.002a.726.726 0 0 1-.794 0l-.003-.002c-1.2-.777-3.577-2.48-5.642-4.57-1.033-1.043-1.97-2.165-2.645-3.3-.678-1.138-1.063-2.24-1.063-3.26v-9a.75.75 0 0 1 .22-.53Zm16.868 3.404a.75.75 0 0 0-1.177-.93l-7.843 9.927-.008.01a.301.301 0 0 1-.487-.014l-.01-.014-2.45-3.48a.75.75 0 0 0-1.226.863l2.446 3.475a1.8 1.8 0 0 0 2.916.085l7.84-9.922Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--checklist-color":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M17.25 12a5.25 5.25 0 1 0 0 10.5 5.25 5.25 0 0 0 0-10.5Zm-6.75 5.25a6.75 6.75 0 1 1 13.5 0 6.75 6.75 0 0 1-13.5 0Z' fill='%2329D305'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M4.5 10.5a.75.75 0 0 1 .75-.75h5.25a.75.75 0 0 1 0 1.5H5.25a.75.75 0 0 1-.75-.75ZM4.5 14.25a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 0 1.5h-3a.75.75 0 0 1-.75-.75Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M8.75 1.5a3 3 0 0 0-3 3 .75.75 0 0 1-.75.75H2.25A.75.75 0 0 0 1.5 6v12.75a.75.75 0 0 0 .75.75h5.5a.75.75 0 0 1 0 1.5h-5.5A2.25 2.25 0 0 1 0 18.75V6a2.25 2.25 0 0 1 2.25-2.25h2.063a4.5 4.5 0 0 1 8.874 0h2.563A2.25 2.25 0 0 1 18 6v2.25a.75.75 0 0 1-1.5 0V6a.75.75 0 0 0-.75-.75H12.5a.75.75 0 0 1-.75-.75 3 3 0 0 0-3-3Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M8.75 3a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Z' fill='black'/%3e%3cpath d='M19.034 15.025a.81.81 0 0 1 .652-.336c.176 0 .346.058.488.168a.863.863 0 0 1 .162 1.182l-3.133 4.314a.808.808 0 0 1-.593.334h-.002a.793.793 0 0 1-.63-.245l-2.238-2.31a.851.851 0 0 1-.24-.597c0-.225.085-.438.24-.597a.793.793 0 0 1 1.15 0l1.574 1.625 2.57-3.537Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--clock":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M0 12c0 6.616 5.383 12 12 12 6.616 0 12-5.384 12-12 0-6.617-5.384-12-12-12C5.383 0 0 5.383 0 12Zm1.6 0C1.6 6.266 6.266 1.6 12 1.6S22.4 6.266 22.4 12 17.734 22.4 12 22.4 1.6 17.734 1.6 12Zm14.834 5.566a.802.802 0 0 0 1.132-1.132L12.8 11.668V8a.8.8 0 0 0-1.6 0v4c0 .094.016.186.05.277l.01.027c.04.1.099.187.174.261l5 5Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--close":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M23.636 2.122A1.243 1.243 0 1 0 21.878.364L12 10.242 2.122.364A1.243 1.243 0 0 0 .364 2.122L10.242 12 .364 21.878a1.243 1.243 0 1 0 1.758 1.758L12 13.758l9.878 9.878a1.243 1.243 0 1 0 1.758-1.758L13.758 12l9.878-9.878Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--close-bold":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M23.636 2.122A1.243 1.243 0 1 0 21.878.364L12 10.242 2.122.364A1.243 1.243 0 0 0 .364 2.122L10.242 12 .364 21.878a1.243 1.243 0 1 0 1.758 1.758L12 13.758l9.878 9.878a1.243 1.243 0 1 0 1.758-1.758L13.758 12l9.878-9.878Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--close_menu":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M0 1.5a.75.75 0 0 1 1.5 0v21a.75.75 0 0 1-1.5 0v-21ZM9.53 7.72a.75.75 0 0 0-1.06 0l-3.75 3.75a.748.748 0 0 0 0 1.06l3.75 3.75a.75.75 0 0 0 1.06-1.06l-2.47-2.47h16.19a.75.75 0 0 0 0-1.5H7.06l2.47-2.47a.75.75 0 0 0 0-1.06Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--cloud_upload":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M17.288 17.036c-.407 0-.813-.305-.813-.712 0-.406.305-.813.813-.813h1.526s3.559-.509 3.559-4.068a4.08 4.08 0 0 0-4.068-4.068h-.203c-.305 0-.61-.203-.712-.406a6.565 6.565 0 0 0-3.458-3.153c-1.525-.508-3.152-.508-4.576.203C7.322 4.935 6 6.97 5.898 9.104c0 .204-.101.407-.305.61-.101.102-.305.204-.508.102-1.526-.305-3.051.712-3.458 2.237 0 .102-.025.204-.05.305-.026.102-.052.204-.052.305 0 .814.204 1.526.712 2.034.916.916 2.441.916 2.441.916H6.61c.407 0 .814.305.814.813 0 .407-.305.712-.814.712H4.678c-.102 0-2.136 0-3.458-1.322-.813-.814-1.22-1.83-1.22-3.05 0-.306 0-.611.102-.916.508-2.237 2.44-3.56 4.474-3.56.407-2.44 1.932-4.576 4.271-5.593 1.831-.813 3.865-.915 5.797-.305 1.729.61 3.153 1.83 4.068 3.458C21.66 5.952 24 8.494 24 11.443c0 3.966-3.254 5.39-5.085 5.593h-1.627Zm-6.101-3.762L9.559 14.9a.798.798 0 0 1-1.118 0 .798.798 0 0 1 0-1.119l3.05-3.05a.777.777 0 0 1 .51-.204c.203 0 .406 0 .711.203l3.05 3.051a.798.798 0 0 1 0 1.119.798.798 0 0 1-1.118 0l-1.83-1.83v8.745c0 .508-.306.814-.814.814a.802.802 0 0 1-.813-.814v-8.542Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--cog":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M6.747 12.004A5.259 5.259 0 0 0 12 17.258a5.259 5.259 0 0 0 5.252-5.254A5.259 5.259 0 0 0 12 6.75a5.259 5.259 0 0 0-5.253 5.254Zm1.501 0A3.756 3.756 0 0 1 12 8.251a3.756 3.756 0 0 1 3.751 3.753A3.756 3.756 0 0 1 12 15.757a3.756 3.756 0 0 1-3.752-3.753Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M6.331 23.296c.5.454 1.147.704 1.823.704a2.72 2.72 0 0 0 2.006-.884l.946-1.042a1.202 1.202 0 0 1 .896-.398c.344 0 .67.145.9.398l.944 1.044a2.704 2.704 0 0 0 2.12.878 2.69 2.69 0 0 0 1.879-.88 2.7 2.7 0 0 0 .708-1.954l-.07-1.4a1.195 1.195 0 0 1 .397-.96c.225-.205.504-.313.806-.313l.066.002 1.402.071.131.003a2.72 2.72 0 0 0 2.016-.892 2.69 2.69 0 0 0 .695-1.954 2.695 2.695 0 0 0-.89-1.875l-1.042-.941a1.2 1.2 0 0 1-.396-.959 1.2 1.2 0 0 1 .396-.837l1.042-.94c.605-.548.93-1.33.89-2.145a2.697 2.697 0 0 0-.888-1.875 2.695 2.695 0 0 0-1.954-.7l-1.4.072h-.057l-.058-.001h-.003a1.211 1.211 0 0 1-1.147-1.268l.071-1.401A2.707 2.707 0 0 0 15.716.003a2.69 2.69 0 0 0-1.872.888l-.95 1.042a1.187 1.187 0 0 1-.958.396 1.2 1.2 0 0 1-.836-.399L10.16.89A2.71 2.71 0 0 0 8.028.008a2.714 2.714 0 0 0-2.58 2.836l.067 1.407a1.21 1.21 0 0 1-1.208 1.272s-.042 0-.064-.002l-1.402-.071A2.709 2.709 0 0 0 .006 8.288a2.69 2.69 0 0 0 .885 1.875l1.043.946a1.208 1.208 0 0 1 0 1.797l-1.043.941a2.7 2.7 0 0 0-.887 2.15c.038.724.355 1.389.892 1.873a2.7 2.7 0 0 0 1.954.692l1.401-.07c.021-.003.042-.003.063-.003l.062.002a1.211 1.211 0 0 1 1.144 1.27l-.072 1.405a2.704 2.704 0 0 0 .883 2.13Zm-1.88-6.303a2.121 2.121 0 0 0-.137-.004l-.138.002h-.003l-1.401.071c-.021.002-.043.002-.064.002a1.205 1.205 0 0 1-1.206-1.145 1.203 1.203 0 0 1 .396-.959l1.041-.94a2.715 2.715 0 0 0 .002-4.024L1.9 9.05a1.203 1.203 0 0 1-.396-.837 1.21 1.21 0 0 1 1.263-1.265l1.4.07a2.71 2.71 0 0 0 2.847-2.846l-.067-1.4a1.211 1.211 0 0 1 1.15-1.266l.057-.001c.34 0 .666.144.894.394l.94 1.039a2.692 2.692 0 0 0 2.01.895 2.704 2.704 0 0 0 2.01-.893l.949-1.04a1.197 1.197 0 0 1 .905-.4c.3 0 .576.107.802.312a1.2 1.2 0 0 1 .398.959l-.071 1.402a2.712 2.712 0 0 0 2.839 2.843l1.4-.071h.002l.06-.002c.298 0 .585.11.809.313.24.217.38.514.396.837.018.365-.126.713-.396.957l-1.043.94a2.715 2.715 0 0 0 0 4.025l1.043.941a1.2 1.2 0 0 1 .397.837c.016.322-.094.632-.311.872a1.2 1.2 0 0 1-.89.4l-.069-.003-1.4-.07a2.698 2.698 0 0 0-1.955.695 2.69 2.69 0 0 0-.89 2.15l.072 1.395a1.211 1.211 0 0 1-1.153 1.263l-.049.001c-.344 0-.67-.142-.896-.39l-.942-1.041a2.718 2.718 0 0 0-2.012-.893 2.705 2.705 0 0 0-2.01.893l-.944 1.04a1.2 1.2 0 0 1-.896.396 1.206 1.206 0 0 1-1.206-1.26l.072-1.402a2.713 2.713 0 0 0-2.567-2.846Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--cookie":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M.01 12.465a11.952 11.952 0 0 0 12.464 11.492 11.91 11.91 0 0 0 8.327-3.852 11.906 11.906 0 0 0 3.165-8.612 11.995 11.995 0 0 0-.562-3.172.751.751 0 0 0-1.065-.436c-.419.222-.892.34-1.365.342a3 3 0 0 1-2.996-2.994v-.025a.746.746 0 0 0-.75-.75.757.757 0 0 0-.457.155 2.978 2.978 0 0 1-1.798.614 2.978 2.978 0 0 1-2.117-.876 2.976 2.976 0 0 1-.88-2.118c0-.411.082-.81.244-1.187a.746.746 0 0 0-.07-.721.744.744 0 0 0-.61-.325h-.02l-.019.001a11.912 11.912 0 0 0-8.327 3.852A11.91 11.91 0 0 0 .01 12.465ZM4.277 4.87a10.455 10.455 0 0 1 6.245-3.277 4.47 4.47 0 0 0 1.275 3.821 4.476 4.476 0 0 0 4.838.989c.523 1.926 2.31 3.325 4.341 3.325h.005a4.464 4.464 0 0 0 1.211-.174c.155.655.248 1.326.275 1.999a10.419 10.419 0 0 1-2.768 7.535 10.423 10.423 0 0 1-7.719 3.379A10.456 10.456 0 0 1 1.508 12.405a10.424 10.424 0 0 1 2.77-7.535Zm.2 5.608c0 1.654 1.346 3 3 3s3-1.346 3-3-1.346-3-3-3-3 1.346-3 3Zm1.5 0c0-.827.673-1.5 1.5-1.5s1.5.673 1.5 1.5-.673 1.5-1.5 1.5-1.5-.673-1.5-1.5Zm8.25 9a2.252 2.252 0 0 1-2.25-2.25 2.252 2.252 0 0 1 2.25-2.25 2.252 2.252 0 0 1 2.25 2.25 2.252 2.252 0 0 1-2.25 2.25Zm0-3a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm-5.998.375a1.125 1.125 0 1 1-2.25 0 1.125 1.125 0 0 1 2.25 0Zm4.871-5.624c-.236 0-.463-.073-.656-.212a1.118 1.118 0 0 1-.453-.733 1.113 1.113 0 0 1 .196-.836 1.116 1.116 0 0 1 .915-.469 1.12 1.12 0 0 1 1.11.945 1.122 1.122 0 0 1-1.112 1.305Zm5.345 2.787a1.116 1.116 0 0 0 .84.197 1.126 1.126 0 0 0-.364-2.22 1.126 1.126 0 0 0-.476 2.023Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--cost_cut-color":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.32 13.656c0-.444.34-.804.759-.804s.758.36.758.804v9.44c0 .444-.34.803-.758.803-.42 0-.76-.36-.76-.803v-9.44ZM17.107 20.023c0-.444.34-.804.759-.804s.758.36.758.804v2.692c0 .444-.34.804-.758.804-.42 0-.76-.36-.76-.803v-2.693Z' fill='%2329D305'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M4.379.454c-.434 0-.85.173-1.157.48-.307.309-.48.726-.48 1.162v20.438H1.738a.769.769 0 0 0-.768.77c0 .426.344.696.768.696h20.517c.424 0 .768-.27.768-.695a.769.769 0 0 0-.768-.77h-.978v-13.5c0-.435-.172-.853-.48-1.161a1.634 1.634 0 0 0-1.156-.48h-3.475c-.434 0-.85.172-1.158.48-.306.308-.479.726-.479 1.161v13.5H9.49V2.094c0-.435-.172-.852-.48-1.16A1.634 1.634 0 0 0 7.855.454H4.379Zm-.102 1.54h3.678v20.54H4.277V1.994Zm15.465 6.94v13.6h-3.678v-13.6h3.678Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='m18.278 6.04 1.608-1.517a.511.511 0 0 0 0-.752.584.584 0 0 0-.793 0l-.65.613V.606c0-.294-.252-.531-.56-.531-.31 0-.562.237-.562.531v3.778l-.65-.613a.584.584 0 0 0-.792 0 .511.511 0 0 0 0 .752l1.606 1.516.002.002a.576.576 0 0 0 .35.152l.045.002.059-.003a.601.601 0 0 0 .313-.132.493.493 0 0 0 .019-.015l.004-.003V6.04Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--collapse_circle-color":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12 24C5.383 24 0 18.617 0 12S5.383 0 12 0s12 5.383 12 12-5.383 12-12 12Zm0-22.5C6.21 1.5 1.5 6.21 1.5 12S6.21 22.5 12 22.5 22.5 17.79 22.5 12 17.79 1.5 12 1.5Z' fill='%2329D305'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M11.187 9.106a1.149 1.149 0 0 1 1.626 0l4.237 4.237a.853.853 0 1 1-1.207 1.207L12 10.707 8.157 14.55a.853.853 0 0 1-1.207-1.207l4.237-4.237Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--collapse_circle-filled-color":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M0 12c0 6.617 5.383 12 12 12s12-5.383 12-12S18.617 0 12 0 0 5.383 0 12Z' fill='%2329D305'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M11.187 9.106a1.149 1.149 0 0 1 1.626 0l4.237 4.237a.853.853 0 1 1-1.207 1.207L12 10.707 8.157 14.55a.853.853 0 0 1-1.207-1.207l4.237-4.237Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--configurations":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M16.5 5.265a.75.75 0 0 0-1.5 0v5.345a3.001 3.001 0 0 0-1.371 5.026 3 3 0 0 0 1.371.783v2.346a.75.75 0 1 0 1.5 0v-2.346a3.01 3.01 0 0 0 1.744-1.238A3 3 0 0 0 16.5 10.61V5.265Zm-.75 6.75a1.5 1.5 0 1 0 0 2.999 1.5 1.5 0 0 0 0-3ZM9 10.42a3 3 0 1 0-1.5 0v8.345a.75.75 0 1 0 1.5 0v-8.346Zm-.751-1.405a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 .001 3h-.001Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M2.25 0A2.25 2.25 0 0 0 0 2.25v19.5A2.25 2.25 0 0 0 2.25 24h19.5A2.25 2.25 0 0 0 24 21.75V2.25A2.25 2.25 0 0 0 21.75 0H2.25ZM1.5 2.25a.75.75 0 0 1 .75-.75h19.5a.75.75 0 0 1 .75.75v19.5a.75.75 0 0 1-.75.75H2.25a.75.75 0 0 1-.75-.75V2.25Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--copy":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M1.5 1.973C1.5.892 2.398 0 3.502 0h12.524c.423 0 .766.343.766.766v.186a.766.766 0 0 1-.766.766H3.246v14.831a.766.766 0 0 1-.765.766h-.215a.766.766 0 0 1-.766-.766V1.973Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M6.015 6.43c0-1.082.899-1.974 2.002-1.974h12.417c1.104 0 2.002.892 2.002 1.973v15.598c0 1.081-.898 1.973-2.002 1.973H8.017c-1.103 0-2.002-.892-2.002-1.973V6.43Zm14.674-.256H7.762v16.108h12.927V6.174Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--crane":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M.75 24.001a.75.75 0 0 1 0-1.5h3v-15h-3a.75.75 0 0 1 0-1.5h1.958L8.84.387a1.501 1.501 0 0 1 1.749-.188l9.865 5.802h2.796a.75.75 0 0 1 0 1.5H21v2.562c0 .298.177.568.45.688a2.998 2.998 0 0 1 .921 4.869 2.98 2.98 0 0 1-2.12.88 2.983 2.983 0 0 1-2.122-.878 2.98 2.98 0 0 1-.879-2.121.75.75 0 0 1 1.5 0c0 .401.156.777.44 1.06.283.283.659.439 1.06.439a1.49 1.49 0 0 0 1.061-.44 1.5 1.5 0 0 0-.461-2.434 2.25 2.25 0 0 1-1.35-2.062V7.501H9.75v15h3a.75.75 0 0 1 0 1.5h-12Zm7.5-1.5v-4.5l-3 4v.5h3Zm-3-3.001 3-4v-1l-3-4v9Zm3-7.5V7.5h-3V8l3 4Zm9.246-6-7.65-4.5L4.93 6h12.566Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--credit_card":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M2.25 4.5a.75.75 0 0 0-.75.75v13.5c0 .414.336.75.75.75h19.5a.75.75 0 0 0 .75-.75V5.25a.75.75 0 0 0-.75-.75H2.25ZM0 5.25A2.25 2.25 0 0 1 2.25 3h19.5A2.25 2.25 0 0 1 24 5.25v13.5A2.25 2.25 0 0 1 21.75 21H2.25A2.25 2.25 0 0 1 0 18.75V5.25Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M0 8.25a.75.75 0 0 1 .75-.75h22.5a.75.75 0 0 1 0 1.5H.75A.75.75 0 0 1 0 8.25ZM4.5 12.75a.75.75 0 0 1 .75-.75h8.25a.75.75 0 0 1 0 1.5H5.25a.75.75 0 0 1-.75-.75ZM4.5 15.75a.75.75 0 0 1 .75-.75h5.25a.75.75 0 0 1 0 1.5H5.25a.75.75 0 0 1-.75-.75Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--cut_electricity_pillar":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M1.935 4.18H.75a.71.71 0 1 1 0-1.42h.71v-.71c0-.395.325-.71.715-.71.39 0 .71.315.71.71v.71h1.42v-.71c0-.395.33-.71.72-.71.39 0 .71.315.71.71v.71H10v-.71a.71.71 0 1 1 1.42 0v.71h1.42v-.71a.71.71 0 1 1 1.42 0v.71h.71a.71.71 0 1 1 0 1.42h-1.185L8.57 8.09v13.86a.71.71 0 1 1-1.42 0V8.09L1.935 4.18ZM7.86 6.845l3.555-2.665h-7.11L7.86 6.845Zm8.095 2.25-.355.615 6.16 3.56.355-.615a.71.71 0 0 1 1.23.71l-.355.615.615.355a.71.71 0 0 1-.71 1.23L21.92 15l-5.26 1.41-3.405 5.9a.703.703 0 0 1-.615.355.71.71 0 0 1-.615-1.065l3.405-5.9-1.41-5.26-.975-.565a.71.71 0 0 1 .71-1.23L14.37 9l.355-.615a.71.71 0 0 1 1.23.71Zm-.195 2.35.935 3.48 3.48-.93-4.415-2.55Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--cut_electricity_pillar-color":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M.75 4.18h1.185L7.15 8.09v13.86a.71.71 0 1 0 1.42 0V8.09l5.215-3.91h1.185a.71.71 0 1 0 0-1.42h-.71v-.71a.71.71 0 1 0-1.42 0v.71h-1.42v-.71a.71.71 0 1 0-1.42 0v.71H5.735v-.71a.71.71 0 0 0-.71-.71c-.39 0-.72.315-.72.71v.71h-1.42v-.71a.71.71 0 0 0-.71-.71.714.714 0 0 0-.715.71v.71H.75a.71.71 0 1 0 0 1.42Zm10.665 0L7.86 6.845 4.305 4.18h7.11Z' fill='black'/%3e%3cpath d='m15.6 9.71.355-.615a.71.71 0 0 0-1.23-.71L14.37 9l-.615-.355a.71.71 0 0 0-.71 1.23l.975.565 1.41 5.26-3.405 5.9a.71.71 0 0 0 1.23.71l3.405-5.9L21.92 15l.975.565a.7.7 0 0 0 .355.095.71.71 0 0 0 .355-1.325l-.615-.355.355-.615a.71.71 0 0 0-1.23-.71l-.355.615-6.16-3.56Zm1.095 5.215-.935-3.48 4.415 2.55-3.48.93Z' fill='%2329D305'/%3e%3c/svg%3e",
     "e-icon--danger_electricity-color":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M15.75 4.5a.75.75 0 0 1-.75-.75V1.5H.75a.75.75 0 0 1 0-1.5h15a.75.75 0 0 1 .75.75V3h6.75a.75.75 0 0 1 0 1.5h-7.5Z' fill='black'/%3e%3cpath d='M13.5 11.25a.744.744 0 0 1-.728-.569l-.675-2.698-3.484-2.09a.747.747 0 0 1-.361-.703.748.748 0 0 1 .469-.637l3.75-1.5a.747.747 0 0 1 .969.992.745.745 0 0 1-.411.401l-2.346.938 2.453 1.472a.744.744 0 0 1 .342.461l.523 2.093 2.164-1.082a.754.754 0 0 1 .615-.025l2.464.986-.479-2.393a.748.748 0 1 1 1.471-.293l.75 3.75a.75.75 0 0 1-1.014.843l-3.437-1.375-2.699 1.349a.742.742 0 0 1-.336.08Z' fill='%2329D305'/%3e%3cpath d='M5.25 18a3.754 3.754 0 0 1-3.75-3.75 3.754 3.754 0 0 1 3.75-3.75A3.754 3.754 0 0 1 9 14.25 3.754 3.754 0 0 1 5.25 18Zm0-6A2.252 2.252 0 0 0 3 14.25a2.252 2.252 0 0 0 2.25 2.25 2.252 2.252 0 0 0 2.25-2.25A2.252 2.252 0 0 0 5.25 12Z' fill='black'/%3e%3cpath d='M7.5 24a.75.75 0 0 1-.75-.75v-.75c0-.392.306-.72.697-.748 3.538-.252 6.619-2.666 8.242-6.456a.762.762 0 0 0-.351-1.02.749.749 0 0 0-.998.361l-.02.047a8.58 8.58 0 0 1-7.322 5.226l-4.698.338a.818.818 0 0 1-.054.002H.75a.75.75 0 0 1 0-1.5h1.469l4.673-.336A7.072 7.072 0 0 0 12.982 14a2.26 2.26 0 0 1 2.04-1.296c.33 0 .65.071.951.212.543.254.956.706 1.161 1.271a2.232 2.232 0 0 1-.077 1.72c-1.725 4.029-5.002 6.726-8.807 7.265v.076A.75.75 0 0 1 7.5 24Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--dashboard":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M0 5.25a5.256 5.256 0 0 0 5.25 5.25 5.256 5.256 0 0 0 5.25-5.25A5.256 5.256 0 0 0 5.25 0 5.256 5.256 0 0 0 0 5.25Zm1.5 0A3.754 3.754 0 0 1 5.25 1.5 3.754 3.754 0 0 1 9 5.25 3.754 3.754 0 0 1 5.25 9 3.754 3.754 0 0 1 1.5 5.25ZM0 18.75A5.256 5.256 0 0 0 5.25 24a5.256 5.256 0 0 0 5.25-5.25 5.256 5.256 0 0 0-5.25-5.25A5.256 5.256 0 0 0 0 18.75Zm1.5 0A3.754 3.754 0 0 1 5.25 15 3.754 3.754 0 0 1 9 18.75a3.754 3.754 0 0 1-3.75 3.75 3.754 3.754 0 0 1-3.75-3.75ZM18.75 10.5a5.256 5.256 0 0 1-5.25-5.25A5.256 5.256 0 0 1 18.75 0 5.256 5.256 0 0 1 24 5.25a5.256 5.256 0 0 1-5.25 5.25Zm0-9A3.754 3.754 0 0 0 15 5.25 3.754 3.754 0 0 0 18.75 9a3.754 3.754 0 0 0 3.75-3.75 3.754 3.754 0 0 0-3.75-3.75ZM13.5 18.75A5.256 5.256 0 0 0 18.75 24 5.256 5.256 0 0 0 24 18.75a5.256 5.256 0 0 0-5.25-5.25 5.256 5.256 0 0 0-5.25 5.25Zm1.5 0A3.754 3.754 0 0 1 18.75 15a3.754 3.754 0 0 1 3.75 3.75 3.754 3.754 0 0 1-3.75 3.75A3.754 3.754 0 0 1 15 18.75Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--dashboard-color":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.25 24A5.256 5.256 0 0 1 0 18.75a5.256 5.256 0 0 1 5.25-5.25 5.256 5.256 0 0 1 5.25 5.25A5.256 5.256 0 0 1 5.25 24Zm0-9a3.754 3.754 0 0 0-3.75 3.75 3.754 3.754 0 0 0 3.75 3.75A3.754 3.754 0 0 0 9 18.75 3.754 3.754 0 0 0 5.25 15Z' fill='%2329D305'/%3e%3cpath d='M5.25 10.5A5.256 5.256 0 0 1 0 5.25 5.256 5.256 0 0 1 5.25 0a5.256 5.256 0 0 1 5.25 5.25 5.256 5.256 0 0 1-5.25 5.25Zm0-9A3.754 3.754 0 0 0 1.5 5.25 3.754 3.754 0 0 0 5.25 9 3.754 3.754 0 0 0 9 5.25 3.754 3.754 0 0 0 5.25 1.5ZM18.75 10.5a5.256 5.256 0 0 1-5.25-5.25A5.256 5.256 0 0 1 18.75 0 5.256 5.256 0 0 1 24 5.25a5.256 5.256 0 0 1-5.25 5.25Zm0-9A3.754 3.754 0 0 0 15 5.25 3.754 3.754 0 0 0 18.75 9a3.754 3.754 0 0 0 3.75-3.75 3.754 3.754 0 0 0-3.75-3.75ZM18.75 24a5.256 5.256 0 0 1-5.25-5.25 5.256 5.256 0 0 1 5.25-5.25A5.256 5.256 0 0 1 24 18.75 5.256 5.256 0 0 1 18.75 24Zm0-9A3.754 3.754 0 0 0 15 18.75a3.754 3.754 0 0 0 3.75 3.75 3.754 3.754 0 0 0 3.75-3.75A3.754 3.754 0 0 0 18.75 15Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--design_process-color":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M3 0a.75.75 0 0 1 .75.75v22.5a.75.75 0 0 1-1.5 0V.75A.75.75 0 0 1 3 0ZM21 0a.75.75 0 0 1 .75.75v22.5a.75.75 0 0 1-1.5 0V.75A.75.75 0 0 1 21 0Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M.75 20.25a.75.75 0 0 1 .75-.75h21a.75.75 0 0 1 0 1.5h-21a.75.75 0 0 1-.75-.75ZM.75 9.75A.75.75 0 0 1 1.5 9h21a.75.75 0 0 1 0 1.5h-21a.75.75 0 0 1-.75-.75Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M5.25 3A.75.75 0 0 1 6 2.25h3a.75.75 0 0 1 .75.75v6.75a.75.75 0 0 1-.75.75H6a.75.75 0 0 1-.75-.75V3Zm1.5.75V9h1.5V3.75h-1.5ZM6 13.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75v6.75a.75.75 0 0 1-.75.75h-3a.75.75 0 0 1-.75-.75V13.5Zm1.5.75v5.25H9v-5.25H7.5ZM12 13.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75v6.75a.75.75 0 0 1-.75.75h-3a.75.75 0 0 1-.75-.75V13.5Zm1.5.75v5.25H15v-5.25h-1.5Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M8.25 3A.75.75 0 0 1 9 2.25h3a.75.75 0 0 1 .75.75v6.75a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75V3Zm1.5.75V9h1.5V3.75h-1.5Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M17.598 2.05a.75.75 0 0 1 .996-.365l2.721 1.263a.75.75 0 0 1 .364.996l-2.842 6.122a.75.75 0 0 1-.996.365l-2.72-1.263a.75.75 0 0 1-.365-.996l2.842-6.123Zm1.045 1.311-2.211 4.762 1.36.632 2.211-4.762-1.36-.632Z' fill='%2329D305'/%3e%3c/svg%3e",
     "e-icon--digging-color":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M23.687 10.94a.836.836 0 0 0-.13-.423l-5.932-8.84c-.26-.363-.49-.629-.859-.668a1.187 1.187 0 0 0-.998.354l-3.785 3.005h-1.897a1.611 1.611 0 0 0-1.099.452 2.486 2.486 0 0 0-.66 1.906v4.027c.001.026-.01.051-.028.07a.1.1 0 0 1-.07.028H3.514a1.688 1.688 0 0 0-1.145.59 1.631 1.631 0 0 0-.373 1.218v2.809c.012.302.059.602.14.894a2.772 2.772 0 0 0-1.554.979A2.692 2.692 0 0 0 0 19.063v1.324c-.003.689.272 1.35.764 1.84.493.49 1.162.768 1.862.773h12.782c.7-.005 1.37-.283 1.862-.773.492-.49.767-1.151.765-1.84v-1.324a2.758 2.758 0 0 0-.546-1.671 2.835 2.835 0 0 0-1.452-1.02.08.08 0 0 1-.07-.081c0-.013.004-.026.01-.037.157-.455.198-.94.12-1.415-.156-1.185-.507-3.593-.808-5.66l-.328-2.257a.116.116 0 0 1 0-.088L16 5.95l4.112 5.933a.089.089 0 0 1 .027.064.087.087 0 0 1-.027.063l-1.997 1.454a.87.87 0 0 0-.117 1.353.904.904 0 0 0 .456.238l4.514 1.042a.823.823 0 0 0 .729-.177.828.828 0 0 0 .3-.707l-.31-4.273Zm-.969.58.18 3.32a.097.097 0 0 1-.04.082.099.099 0 0 1-.09.015l-3.345-.785a.1.1 0 0 1-.057-.089.1.1 0 0 1 .056-.088l3.296-2.456Zm-21.43 7.543a1.47 1.47 0 0 1 .377-1.01c.25-.277.678-.514 1.053-.553H15.5c.373.041.636.279.883.557.248.278.38.637.373 1.006v1.324c.002.174-.042.401-.108.563a1.325 1.325 0 0 1-.724.723 1.368 1.368 0 0 1-.516.104H2.626a1.37 1.37 0 0 1-.954-.395 1.325 1.325 0 0 1-.394-.94l.01-1.379Zm20.98-8.565-5.701-8.33-2.826 2.27c.259.062.759.562.88 1.237l.877-.644a1 1 0 0 1 1.405.223l4.307 6 1.059-.756ZM3.626 16.293H14.02c.148.007.475-.033.6-.255a1.237 1.237 0 0 0 .21-1.032c-.28-2.18-1.28-9.056-1.28-9.056a.443.443 0 0 0-.409-.295H10.5c-.5 0-.864.345-.864.884v4.619a1 1 0 0 1-1 1H3.555c-.11 0-.31.078-.31.5v2.85c0 .539 0 .603.13.707.07.056.16.084.25.078Z' fill='black'/%3e%3cpath d='M5.25 20.9a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM12.25 20.9a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5Z' fill='%2329D305'/%3e%3c/svg%3e",
     "e-icon--download":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M11.741 16.453a.755.755 0 0 0 .518 0l.026-.01a.763.763 0 0 0 .246-.164l4.5-4.5a.743.743 0 0 0 .22-.53c0-.2-.078-.389-.22-.53a.744.744 0 0 0-1.06 0l-3.22 3.22V3.75a.75.75 0 0 0-1.5 0v10.19l-3.22-3.22a.743.743 0 0 0-.53-.22c-.2 0-.389.078-.53.22a.743.743 0 0 0-.22.53c0 .2.078.389.22.53l4.499 4.5c.07.071.153.126.249.165l.022.008Z' fill='black'/%3e%3cpath d='M.001 17.25A3.754 3.754 0 0 0 3.751 21h16.5A3.754 3.754 0 0 0 24 17.25v-1.5a.75.75 0 0 0-1.5 0v1.5a2.252 2.252 0 0 1-2.25 2.25H3.75a2.252 2.252 0 0 1-2.25-2.25v-1.5a.75.75 0 0 0-1.5 0v1.5Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--drag_handle":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M9.6 2.4a2.4 2.4 0 1 1-4.8 0 2.4 2.4 0 0 1 4.8 0ZM9.6 12a2.4 2.4 0 1 1-4.8 0 2.4 2.4 0 0 1 4.8 0ZM9.6 21.6a2.4 2.4 0 1 1-4.8 0 2.4 2.4 0 0 1 4.8 0ZM19.2 2.4a2.4 2.4 0 1 1-4.8 0 2.4 2.4 0 0 1 4.8 0ZM19.2 12a2.4 2.4 0 1 1-4.8 0 2.4 2.4 0 0 1 4.8 0ZM19.2 21.6a2.4 2.4 0 1 1-4.8 0 2.4 2.4 0 0 1 4.8 0Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--edit":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M.75 24a.755.755 0 0 1-.531-.22.754.754 0 0 1-.196-.716l1.77-6.905a.84.84 0 0 1 .045-.121.73.73 0 0 1 .151-.223L16.515 1.289A4.355 4.355 0 0 1 19.613 0c1.178 0 2.277.454 3.106 1.279l.029.029a4.367 4.367 0 0 1 1.251 3.121 4.356 4.356 0 0 1-1.32 3.087L8.185 22.01a.735.735 0 0 1-.231.154.784.784 0 0 1-.111.042L.935 23.978A.773.773 0 0 1 .75 24Zm1.041-1.791 4.41-1.131-3.281-3.275-1.129 4.406Zm5.868-1.795 13.02-13.02-4.074-4.074L3.582 16.344l4.077 4.07ZM21.738 6.332a2.893 2.893 0 0 0-.059-3.972l-.02-.02a2.872 2.872 0 0 0-2.037-.84v-.375l-.001.375a2.873 2.873 0 0 0-1.954.762l4.071 4.07Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--electric_cabinet":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M10.727 3.126 6.36 1.635l.033-.196h10.354c.535 0 .988.405.988.918 0 .39.347.716.787.716.44 0 .786-.33.786-.716 0-1.29-1.146-2.357-2.567-2.357H3.6c-.77 0-1.38.573-1.38 1.263v19.148c.006.476.287.903.754 1.124a.969.969 0 0 0 .073.03l6.466 2.326c.202.071.41.109.616.109.338 0 .669-.093.952-.272.46-.288.728-.763.728-1.268v-1.355h4.932c1.42 0 2.567-1.067 2.567-2.357v-1.532c0-.39-.346-.716-.786-.716-.44 0-.787.33-.787.716v1.532c0 .512-.453.918-.988.918h-4.932V4.561c0-.631-.437-1.212-1.088-1.435ZM3.8 2.296l6.43 2.199v18.103L3.8 20.287V2.297Z' fill='black'/%3e%3cpath d='m15.708 9.817.412-.614L17.44 7.5l2.502-3.36c.176-.242.563-.146.568.105.005.252-.548 3.772-.639 4.325a.08.08 0 0 0 .07.09l1.223.196c.139.02.268.086.367.186.1.099.173.222.21.357a.882.882 0 0 1 0 .413.976.976 0 0 1-.16.387L20.19 12l-2.883 3.886a.277.277 0 0 1-.322.096.272.272 0 0 1-.166-.297l.618-4.224a.096.096 0 0 0-.018-.074.095.095 0 0 0-.067-.036l-1.202-.192a.79.79 0 0 1-.583-.427.9.9 0 0 1 .14-.915Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--electric_cabinet-color":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M10.727 3.126 6.36 1.635l.033-.196h10.354c.535 0 .988.405.988.918 0 .39.347.716.787.716.44 0 .786-.33.786-.716 0-1.29-1.146-2.357-2.567-2.357H3.6c-.77 0-1.38.573-1.38 1.263v19.148c.006.476.287.903.754 1.124a.972.972 0 0 0 .073.03l6.466 2.326c.202.071.41.109.616.109.338 0 .669-.093.952-.272.46-.288.728-.763.728-1.268v-1.355h4.932c1.42 0 2.567-1.067 2.567-2.357v-1.532c0-.39-.346-.716-.786-.716-.44 0-.787.33-.787.716v1.532c0 .512-.453.918-.988.918h-4.932V4.561c0-.631-.437-1.212-1.088-1.435ZM3.8 2.296l6.43 2.199v18.103L3.8 20.287V2.297Z' fill='black'/%3e%3cpath d='m15.708 9.817.412-.614L17.44 7.5l2.502-3.36c.176-.242.563-.146.568.105.005.252-.548 3.772-.639 4.325a.08.08 0 0 0 .07.09l1.223.196c.139.02.268.086.367.186.1.099.173.222.21.357a.882.882 0 0 1 0 .413.976.976 0 0 1-.16.387L20.19 12l-2.883 3.886a.277.277 0 0 1-.322.096.272.272 0 0 1-.166-.297l.618-4.224a.096.096 0 0 0-.018-.074.095.095 0 0 0-.067-.036l-1.202-.192a.79.79 0 0 1-.583-.427.9.9 0 0 1 .14-.915Z' fill='%2329D305'/%3e%3c/svg%3e",
     "e-icon--electric_car-color":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M3.75 15.75A.75.75 0 0 1 4.5 15H6a.75.75 0 0 1 0 1.5H4.5a.75.75 0 0 1-.75-.75ZM17.25 15.75A.75.75 0 0 1 18 15h1.5a.75.75 0 0 1 0 1.5H18a.75.75 0 0 1-.75-.75Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M5.893 7.642A.75.75 0 0 1 6.33 7.5a.75.75 0 0 0 0-1.5 2.25 2.25 0 0 0-2.153 1.606l-1.11 4.765-1.66 1.66a2.25 2.25 0 0 0-.658 1.59v3.129a2.25 2.25 0 0 0 1.5 2.121v.879a2.25 2.25 0 0 0 4.5 0V21h10.5v.75a2.25 2.25 0 0 0 4.5 0v-.879a2.25 2.25 0 0 0 1.5-2.121v-3.13a2.25 2.25 0 0 0-.659-1.59l-1.66-1.659-1.108-4.765A2.25 2.25 0 0 0 17.67 6a.75.75 0 0 0-.001 1.5.75.75 0 0 1 .702.486L19.305 12H4.695l.934-4.014a.75.75 0 0 1 .264-.344ZM20.25 21h-1.5v.75a.75.75 0 1 0 1.5 0V21ZM18 19.5h3a.75.75 0 0 0 .75-.75v-3.129a.75.75 0 0 0-.22-.53L19.94 13.5H4.06l-1.59 1.591a.75.75 0 0 0-.22.53v3.129a.75.75 0 0 0 .75.75h15ZM3.75 21.75V21h1.5v.75a.75.75 0 1 1-1.5 0Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M11.25.75a.75.75 0 0 0-1.5 0V3H9a.75.75 0 0 0-.75.75 3.75 3.75 0 0 0 3 3.674V9.75a.75.75 0 0 0 1.5 0V7.424a3.75 3.75 0 0 0 3-3.674A.75.75 0 0 0 15 3h-.75V.75a.75.75 0 0 0-1.5 0V3h-1.5V.75ZM12 6a2.25 2.25 0 0 0 2.121-1.5H9.88A2.25 2.25 0 0 0 12 6Z' fill='%2329D305'/%3e%3c/svg%3e",
     "e-icon--electric_home":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='m21 11.584 1.724 1.702a.76.76 0 0 0 .527.216.75.75 0 0 0 .527-1.28l-10.14-10.01a2.252 2.252 0 0 0-1.485-.696.715.715 0 0 0-.306 0 2.23 2.23 0 0 0-1.47.675L3.22 9.259.222 12.216a.75.75 0 0 0 1.054 1.065l1.723-1.703v8.671A2.256 2.256 0 0 0 5.25 22.5h13.502A2.256 2.256 0 0 0 21 20.25v-8.666Zm-2.25 9.419H5.25a.751.751 0 0 1-.749-.748V10.101l6.95-6.868A.75.75 0 0 1 12 2.997c.206 0 .406.084.57.258l6.929 6.847V20.25a.752.752 0 0 1-.748.754Z' fill='black'/%3e%3cpath d='m9.196 13.332.39-.562 1.248-1.562 2.364-3.08c.167-.221.533-.134.537.097.005.23-.518 3.457-.603 3.964a.072.072 0 0 0 .038.074.08.08 0 0 0 .028.009l1.155.18a.615.615 0 0 1 .347.17c.095.09.164.203.2.328.03.124.03.253 0 .378a.878.878 0 0 1-.152.354l-1.315 1.651-2.725 3.563a.27.27 0 0 1-.304.088.254.254 0 0 1-.128-.11.243.243 0 0 1-.03-.162l.585-3.873a.084.084 0 0 0-.017-.067.09.09 0 0 0-.063-.034l-1.137-.175a.76.76 0 0 1-.324-.131.73.73 0 0 1-.227-.261.802.802 0 0 1 .133-.839Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--electric_home-color":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='m21 11.584 1.724 1.702a.76.76 0 0 0 .527.216.75.75 0 0 0 .527-1.28l-10.14-10.01a2.252 2.252 0 0 0-1.485-.696.715.715 0 0 0-.306 0 2.23 2.23 0 0 0-1.47.675L3.22 9.259.222 12.216a.75.75 0 0 0 1.054 1.065l1.723-1.703v8.671A2.256 2.256 0 0 0 5.25 22.5h13.502A2.256 2.256 0 0 0 21 20.25v-8.666Zm-2.25 9.419H5.25a.751.751 0 0 1-.749-.748V10.101l6.95-6.868A.75.75 0 0 1 12 2.997c.206 0 .406.084.57.258l6.929 6.847V20.25a.752.752 0 0 1-.748.754Z' fill='black'/%3e%3cpath d='m9.196 13.332.39-.562 1.248-1.562 2.364-3.08c.167-.221.533-.134.537.097.005.23-.518 3.457-.603 3.964a.072.072 0 0 0 .038.074.08.08 0 0 0 .028.009l1.155.18a.615.615 0 0 1 .347.17c.095.09.164.203.2.328.03.124.03.253 0 .378a.878.878 0 0 1-.152.354l-1.315 1.651-2.725 3.563a.27.27 0 0 1-.304.088.254.254 0 0 1-.128-.11.243.243 0 0 1-.03-.162l.585-3.873a.084.084 0 0 0-.017-.067.09.09 0 0 0-.063-.034l-1.137-.175a.76.76 0 0 1-.324-.131.73.73 0 0 1-.227-.261.802.802 0 0 1 .133-.839Z' fill='%2329D305'/%3e%3c/svg%3e",
     "e-icon--electrical_system":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M3.749 22a.752.752 0 0 1-.75-.754v-11l-1.72 1.73a.744.744 0 0 1-1.06-.002.76.76 0 0 1 0-1.066L10.409.662A2.229 2.229 0 0 1 12 0c.601 0 1.166.235 1.591.662l2.206 2.218 5.202 5.231 2.78 2.795a.76.76 0 0 1 0 1.067.742.742 0 0 1-1.06 0l-1.72-1.729-1.5-1.508L12.53 1.73a.746.746 0 0 0-1.061 0l-6.97 7.008v11.754H6.5s1 0 1 .754-1 .754-1 .754H3.749Z' fill='black'/%3e%3cpath d='M20.235 11H9.765C8.824 11 8 11.843 8 12.806v9.388C8 23.157 8.824 24 9.765 24h10.47c.942 0 1.765-.843 1.765-1.806v-9.388c0-.963-.823-1.806-1.765-1.806Zm.236 10.833c0 .361-.236.602-.589.602H10c-.353 0-.588-.24-.588-.602v-8.787c0-.36.235-.602.588-.602h9.882c.353 0 .589.241.589.602v8.787Z' fill='black'/%3e%3cpath d='m12.806 17.363.309-.46.99-1.278 1.876-2.52c.132-.181.423-.11.426.079.004.188-.41 2.828-.479 3.243a.061.061 0 0 0 .03.06.063.063 0 0 0 .023.008l.917.147a.482.482 0 0 1 .275.14c.075.074.13.166.158.268a.66.66 0 0 1 0 .309.732.732 0 0 1-.12.29L16.167 19l-2.162 2.915a.208.208 0 0 1-.241.071.203.203 0 0 1-.125-.222l.464-3.168a.072.072 0 0 0-.064-.083l-.901-.143a.592.592 0 0 1-.438-.321.674.674 0 0 1 .106-.686Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--electrical_system-color":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M3.749 22a.752.752 0 0 1-.75-.754v-11l-1.72 1.73a.744.744 0 0 1-1.06-.002.76.76 0 0 1 0-1.066L10.409.662A2.229 2.229 0 0 1 12 0c.601 0 1.166.235 1.591.662l2.206 2.218 5.202 5.231 2.78 2.795a.76.76 0 0 1 0 1.067.742.742 0 0 1-1.06 0l-1.72-1.729-1.5-1.508L12.53 1.73a.746.746 0 0 0-1.061 0l-6.97 7.008v11.754H6.5s1 0 1 .754-1 .754-1 .754H3.749Z' fill='black'/%3e%3cpath d='M20.235 11H9.765C8.824 11 8 11.843 8 12.806v9.388C8 23.157 8.824 24 9.765 24h10.47c.942 0 1.765-.843 1.765-1.806v-9.388c0-.963-.823-1.806-1.765-1.806Zm.236 10.833c0 .361-.236.602-.589.602H10c-.353 0-.588-.24-.588-.602v-8.787c0-.36.235-.602.588-.602h9.882c.353 0 .589.241.589.602v8.787Z' fill='black'/%3e%3cpath d='m12.806 17.363.309-.46.99-1.278 1.876-2.52c.132-.181.423-.11.426.079.004.188-.41 2.828-.479 3.243a.061.061 0 0 0 .03.06.063.063 0 0 0 .023.008l.917.147a.482.482 0 0 1 .275.14c.075.074.13.166.158.268a.66.66 0 0 1 0 .309.732.732 0 0 1-.12.29L16.167 19l-2.162 2.915a.208.208 0 0 1-.241.071.203.203 0 0 1-.125-.222l.464-3.168a.072.072 0 0 0-.064-.083l-.901-.143a.592.592 0 0 1-.438-.321.674.674 0 0 1 .106-.686Z' fill='%2329D305'/%3e%3c/svg%3e",
     "e-icon--electricity_pillar":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M7.5 23.2c0 .442.336.8.75.8s.75-.358.75-.8V7.6l5.5-4.4h1.25c.414 0 .75-.358.75-.8 0-.442-.336-.8-.75-.8H15V.8c0-.442-.336-.8-.75-.8s-.75.358-.75.8v.8H12V.8c0-.442-.336-.8-.75-.8s-.75.358-.75.8v.8H6V.8c0-.442-.336-.8-.75-.8S4.5.358 4.5.8v.8H3V.8c0-.442-.336-.8-.75-.8S1.5.358 1.5.8v.8H.75c-.414 0-.75.358-.75.8 0 .442.336.8.75.8H2l5.5 4.4v15.6Zm4.5-20-3.75 3-3.75-3H12Zm4.5 20c0 .442.336.8.75.8s.75-.358.75-.8v-7.668l4.061-4.332h1.189c.414 0 .75-.358.75-.8 0-.442-.336-.8-.75-.8h-.75v-.8c0-.442-.336-.8-.75-.8s-.75.358-.75.8v.8h-7.5v-.8c0-.442-.336-.8-.75-.8s-.75.358-.75.8v.8h-.75c-.414 0-.75.358-.75.8 0 .442.336.8.75.8h1.189l4.061 4.332V23.2Zm3.439-12-2.689 2.868-2.69-2.868h5.379Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--electricity_safety":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M5 0a.75.75 0 0 1 .75.75V4.5h4.5V.75a.75.75 0 0 1 1.5 0V4.5h.75a2.25 2.25 0 0 1 2.25 2.25v3a6.75 6.75 0 0 1-6 6.708v2.292a2.25 2.25 0 0 0 4.5 0 3.75 3.75 0 0 1 7.5 0v4.5a.75.75 0 0 1-1.5 0v-4.5a2.25 2.25 0 0 0-4.5 0 3.75 3.75 0 0 1-7.5 0v-2.292a6.75 6.75 0 0 1-6-6.708v-3A2.25 2.25 0 0 1 3.5 4.5h.75V.75A.75.75 0 0 1 5 0Zm6.712 13.462A5.25 5.25 0 0 1 2.75 9.75v-3A.75.75 0 0 1 3.5 6h9a.75.75 0 0 1 .75.75v3a5.25 5.25 0 0 1-1.538 3.712ZM7.5 7.5a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z' fill='black'/%3e%3cpath d='m17.938 5.817.412-.614L19.67 3.5 22.172.14c.176-.242.563-.146.568.105.005.252-.548 3.772-.639 4.325a.08.08 0 0 0 .07.09l1.223.196c.139.02.268.086.367.186.1.099.173.222.21.357a.879.879 0 0 1 0 .413.975.975 0 0 1-.16.387L22.42 8l-2.883 3.886a.277.277 0 0 1-.322.096.272.272 0 0 1-.166-.297l.618-4.224a.096.096 0 0 0-.048-.099.096.096 0 0 0-.037-.011l-1.202-.192a.79.79 0 0 1-.583-.427.9.9 0 0 1 .14-.915Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--electricity_safety-color":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M5 0a.75.75 0 0 1 .75.75V4.5h4.5V.75a.75.75 0 0 1 1.5 0V4.5h.75a2.25 2.25 0 0 1 2.25 2.25v3a6.75 6.75 0 0 1-6 6.708v2.292a2.25 2.25 0 0 0 4.5 0 3.75 3.75 0 0 1 7.5 0v4.5a.75.75 0 0 1-1.5 0v-4.5a2.25 2.25 0 0 0-4.5 0 3.75 3.75 0 0 1-7.5 0v-2.292a6.75 6.75 0 0 1-6-6.708v-3A2.25 2.25 0 0 1 3.5 4.5h.75V.75A.75.75 0 0 1 5 0Zm6.712 13.462A5.25 5.25 0 0 1 2.75 9.75v-3A.75.75 0 0 1 3.5 6h9a.75.75 0 0 1 .75.75v3a5.25 5.25 0 0 1-1.538 3.712ZM7.5 7.5a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z' fill='black'/%3e%3cpath d='m17.938 5.817.412-.614L19.67 3.5 22.172.14c.176-.242.563-.146.568.105.005.252-.548 3.772-.639 4.325a.08.08 0 0 0 .07.09l1.223.196c.139.02.268.086.367.186.1.099.173.222.21.357a.879.879 0 0 1 0 .413.975.975 0 0 1-.16.387L22.42 8l-2.883 3.886a.277.277 0 0 1-.322.096.272.272 0 0 1-.166-.297l.618-4.224a.096.096 0 0 0-.048-.099.096.096 0 0 0-.037-.011l-1.202-.192a.79.79 0 0 1-.583-.427.9.9 0 0 1 .14-.915Z' fill='%2329D305'/%3e%3c/svg%3e",
     "e-icon--electricity_tower":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M19.969 24a.75.75 0 0 1-.69-.455l-1.323-3.089-6.238-3.119-6.236 3.118-1.324 3.089a.747.747 0 0 1-.984.396.752.752 0 0 1-.395-.985L6.832 13.5H2.874a1.127 1.127 0 0 1-.795-1.92l4.08-4.08H2.874c-.301 0-.583-.117-.795-.33a1.114 1.114 0 0 1-.329-.796c0-.3.117-.582.329-.794L7.439.22l.02-.019a.447.447 0 0 1 .035-.029.635.635 0 0 1 .054-.042l.02-.014a.718.718 0 0 1 .061-.033.438.438 0 0 1 .053-.026l.027-.01a.67.67 0 0 1 .128-.035c.027-.005.053-.007.079-.009A.47.47 0 0 1 7.969 0h7.487a.63.63 0 0 1 .075.005h.002c.012 0 .042.003.073.009l.059.014a.908.908 0 0 1 .094.031.522.522 0 0 1 .058.029c.01.004.028.013.046.025l.03.02a1.023 1.023 0 0 1 .089.071L21.36 5.58a1.122 1.122 0 0 1-.001 1.591 1.132 1.132 0 0 1-.795.329H17.28l4.08 4.08a1.122 1.122 0 0 1-.001 1.591 1.13 1.13 0 0 1-.795.329h-3.958l4.052 9.455A.751.751 0 0 1 19.969 24Zm-2.928-5.677-1.287-3.002-2.358 1.179 3.645 1.823Zm-10.644-.001 3.644-1.822-2.358-1.179-1.286 3.001Zm5.322-2.661 3.444-1.722-.188-.439H8.464l-.188.439 3.443 1.722ZM3.78 12h3.44V8.561L3.78 12Zm15.878 0-3.439-3.439V12h3.439Zm-5.542 0-2.397-3.835L9.323 12h4.793Zm-5.397-1.865 2.115-3.385-2.115-3.385v6.77Zm6 0v-6.77L12.604 6.75l2.115 3.385ZM3.78 6h3.44V2.561L3.78 6Zm15.878 0-3.439-3.439V6h3.439Zm-7.939-.665L14.116 1.5H9.323l2.396 3.835Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--elsmart-color":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M7.5 4.02a.77.77 0 0 0-.77-.77H4.5c-1.241 0-2.25 1.035-2.25 2.308v9.83L.194 20.005a2.336 2.336 0 0 0-.194.937c0 1.273 1.009 2.308 2.25 2.308v.001h19.5c.317 0 .624-.068.914-.199 1.134-.517 1.646-1.883 1.143-3.046L21.75 15.39V5.558c0-1.273-1.01-2.308-2.25-2.308h-2.23a.77.77 0 0 0 0 1.538h2.23a.76.76 0 0 1 .75.77v9.23H3.75v-9.23a.76.76 0 0 1 .75-.77h2.23a.77.77 0 0 0 .77-.769ZM1.561 20.636a.774.774 0 0 0-.061.305c0 .424.337.77.75.77h19.5a.73.73 0 0 0 .305-.067.778.778 0 0 0 .38-1.014l-1.917-4.305H3.482l-1.921 4.31Z' fill='black'/%3e%3cpath d='M10.5 20.168a.76.76 0 0 1-.75-.769.76.76 0 0 1 .75-.769h3a.76.76 0 0 1 .75.77.76.76 0 0 1-.75.768h-3Z' fill='%2329D305'/%3e%3cpath d='M14.536 7.194c.305.284.303.783-.05 1.003a3.862 3.862 0 0 1-.747.344 4.244 4.244 0 0 1-1.528.262 3.678 3.678 0 0 1-2.634-1.091 3.823 3.823 0 0 1-.786-1.208A3.82 3.82 0 0 1 8.5 5.019c0-.533.087-1.028.262-1.484.184-.466.432-.864.742-1.194.32-.34.699-.606 1.135-.8a3.436 3.436 0 0 1 1.412-.291c.495 0 .95.097 1.368.291.427.184.79.442 1.091.771.31.33.553.728.728 1.194.175.456.262.955.262 1.499a.407.407 0 0 1-.408.407h-4.977c.078.573.32 1.048.728 1.426a2.1 2.1 0 0 0 1.455.568c.34 0 .66-.058.96-.175.077-.03.149-.064.218-.1.34-.176.78-.199 1.06.063Zm-2.5-4.605a1.71 1.71 0 0 0-1.237.495c-.29.282-.492.646-.605 1.091a.19.19 0 0 0 .189.233h3.32c.125 0 .22-.113.188-.234a2.294 2.294 0 0 0-.618-1.076c-.34-.34-.752-.51-1.237-.51Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--exit_full_screen":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M7.404 9.436v5.128h9.192V9.436H7.404Zm-.51-1.539c-.564 0-1.021.46-1.021 1.026v6.154c0 .566.457 1.026 1.02 1.026h10.214c.564 0 1.02-.46 1.02-1.026V8.923c0-.566-.456-1.026-1.02-1.026H6.894ZM5.76 7.014c0 .425-.344.77-.767.77H.908a.768.768 0 0 1-.766-.77c0-.424.343-.769.766-.769h3.32V2.912c0-.425.342-.77.765-.77s.766.345.766.77v4.102ZM5.76 16.81a.768.768 0 0 0-.767-.77H.908a.768.768 0 0 0-.766.77c0 .424.343.769.766.769h3.32v3.333c0 .425.342.77.765.77a.768.768 0 0 0 .766-.77V16.81ZM18.832 7.784a.768.768 0 0 1-.766-.77V2.912c0-.425.343-.77.766-.77s.766.345.766.77v3.333h3.319c.423 0 .766.345.766.77 0 .424-.343.769-.766.769h-4.085ZM18.831 16.04a.768.768 0 0 0-.766.77v4.102c0 .425.343.77.766.77a.768.768 0 0 0 .766-.77V17.58h3.32a.768.768 0 0 0 .765-.77.768.768 0 0 0-.765-.769H18.83Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M23.458 2.544c.3.3.3.787 0 1.088l-2.888 2.9c-.3.301-.784.301-1.083 0-.3-.3-.3-.787 0-1.087l2.888-2.901c.3-.3.784-.3 1.083 0ZM4.514 17.467c.299.3.299.788 0 1.088l-2.889 2.901c-.3.3-.784.3-1.083 0-.3-.3-.3-.787 0-1.088l2.888-2.9c.3-.301.784-.301 1.084 0ZM.542 2.544c-.3.3-.3.787 0 1.088l2.888 2.9c.3.301.784.301 1.083 0 .3-.3.3-.787 0-1.087L1.625 2.544c-.3-.3-.784-.3-1.083 0ZM19.486 17.467c-.299.3-.299.788 0 1.088l2.889 2.901c.3.3.784.3 1.083 0 .3-.3.3-.787 0-1.088l-2.888-2.9c-.3-.301-.784-.301-1.084 0Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--exit_full_screen-color":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M7.404 9.436v5.128h9.192V9.436H7.404Zm-.51-1.539c-.564 0-1.021.46-1.021 1.026v6.154c0 .566.457 1.026 1.02 1.026h10.214c.564 0 1.02-.46 1.02-1.026V8.923c0-.566-.456-1.026-1.02-1.026H6.894Z' fill='%2329D305'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M5.76 7.014c0 .425-.344.77-.767.77H.908a.768.768 0 0 1-.766-.77c0-.424.343-.769.766-.769h3.32V2.912c0-.425.342-.77.765-.77s.766.345.766.77v4.102ZM5.76 16.81a.768.768 0 0 0-.767-.77H.908a.768.768 0 0 0-.766.77c0 .424.343.769.766.769h3.32v3.333c0 .425.342.77.765.77a.768.768 0 0 0 .766-.77V16.81ZM18.832 7.784a.768.768 0 0 1-.766-.77V2.912c0-.425.343-.77.766-.77s.766.345.766.77v3.333h3.319c.423 0 .766.345.766.77 0 .424-.343.769-.766.769h-4.085ZM18.831 16.04a.768.768 0 0 0-.766.77v4.102c0 .425.343.77.766.77a.768.768 0 0 0 .766-.77V17.58h3.32a.768.768 0 0 0 .765-.77.768.768 0 0 0-.765-.769H18.83Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M23.458 2.544c.3.3.3.787 0 1.088l-2.888 2.9c-.3.301-.784.301-1.083 0-.3-.3-.3-.787 0-1.087l2.888-2.901c.3-.3.784-.3 1.083 0ZM4.514 17.467c.299.3.299.788 0 1.088l-2.889 2.901c-.3.3-.784.3-1.083 0-.3-.3-.3-.787 0-1.088l2.888-2.9c.3-.301.784-.301 1.084 0ZM.542 2.544c-.3.3-.3.787 0 1.088l2.888 2.9c.3.301.784.301 1.083 0 .3-.3.3-.787 0-1.087L1.625 2.544c-.3-.3-.784-.3-1.083 0ZM19.486 17.467c-.299.3-.299.788 0 1.088l2.889 2.901c.3.3.784.3 1.083 0 .3-.3.3-.787 0-1.088l-2.888-2.9c-.3-.301-.784-.301-1.084 0Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--expand_circle-color":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12 24C5.383 24 0 18.617 0 12S5.383 0 12 0s12 5.383 12 12-5.383 12-12 12Zm0-22.5C6.21 1.5 1.5 6.21 1.5 12S6.21 22.5 12 22.5 22.5 17.79 22.5 12 17.79 1.5 12 1.5Z' fill='%2329D305'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M12.813 15.393a1.149 1.149 0 0 1-1.626 0L6.95 11.157A.853.853 0 1 1 8.157 9.95L12 13.793l3.843-3.843a.853.853 0 0 1 1.207 1.207l-4.237 4.236Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--expand_circle-filled-color":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12 24C5.383 24 0 18.617 0 12S5.383 0 12 0s12 5.383 12 12-5.383 12-12 12Z' fill='%2329D305'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M12.813 15.393a1.149 1.149 0 0 1-1.626 0L6.95 11.157A.853.853 0 1 1 8.157 9.95L12 13.793l3.843-3.843a.853.853 0 0 1 1.207 1.207l-4.237 4.236Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--extension_cord":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M15.059 4.75a.05.05 0 0 0-.05.05v1.414a3.399 3.399 0 0 0 2.913 3.44c.093.006.186.005.28-.002a.746.746 0 0 1 .057-.002 3.25 3.25 0 0 0 3.25-3.25V4.808a.06.06 0 0 0-.058-.058h-6.392Zm-1.096-1.046a1.55 1.55 0 0 1 1.096-.454h6.41a1.56 1.56 0 0 1 1.54 1.54V6.4a4.75 4.75 0 0 1-4.722 4.75 3.469 3.469 0 0 1-.546-.007 4.9 4.9 0 0 1-4.232-4.954V4.8c0-.411.163-.805.454-1.096Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M15.859.05a.75.75 0 0 1 .75.75V4a.75.75 0 0 1-1.5 0V.8a.75.75 0 0 1 .75-.75ZM20.659.05a.75.75 0 0 1 .75.75V4a.75.75 0 0 1-1.5 0V.8a.75.75 0 0 1 .75-.75ZM18.259 9.65a.75.75 0 0 1 .75.75V16c0 2.114-.566 4.092-1.73 5.558-1.178 1.486-2.93 2.392-5.154 2.392-2.152 0-3.983-.657-5.278-1.926C5.55 20.753 4.87 18.944 4.87 16.8a8.7 8.7 0 0 1 .821-3.66c.524-1.095 1.336-2.093 2.447-2.513a.75.75 0 1 1 .531 1.402c-.606.23-1.186.843-1.625 1.759A7.2 7.2 0 0 0 6.37 16.8c0 1.823.572 3.215 1.528 4.152.958.939 2.38 1.498 4.228 1.498 1.777 0 3.091-.705 3.98-1.824.903-1.14 1.404-2.762 1.404-4.626v-5.6a.75.75 0 0 1 .75-.75Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M9.277 12.324a5.46 5.46 0 0 0-2.218-.385c-1.122 0-2.247.621-3.118 1.598-.871.98-1.391 2.211-1.391 3.263a.75.75 0 0 1-1.5 0c0-1.498.712-3.071 1.771-4.26 1.058-1.188 2.557-2.096 4.226-2.1a6.957 6.957 0 0 1 7.162 7.233 8.515 8.515 0 0 1-2.41 5.836.75.75 0 0 1-1.075-1.045 7.015 7.015 0 0 0 1.985-4.842 5.456 5.456 0 0 0-3.432-5.298Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--facebook":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M12.74 0a11.235 11.235 0 0 1 8.984 4.463 11.254 11.254 0 0 1-4.915 17.281 11.233 11.233 0 0 1-9.63-.727l-6.106 2.91a.75.75 0 0 1-1-1l2.908-6.112A11.24 11.24 0 0 1 7.042 1.546 11.22 11.22 0 0 1 12.74 0Zm0 .75v.75a9.72 9.72 0 0 0-8.514 5.001 9.742 9.742 0 0 0 .241 9.878.75.75 0 0 1 .04.718l-2.172 4.567 4.561-2.174a.75.75 0 0 1 .72.04 9.736 9.736 0 0 0 14.512-5.611 9.758 9.758 0 0 0-1.6-8.551A9.744 9.744 0 0 0 12.741 1.5L12.74.75Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M13.273 4.05c-1.515 0-2.513.59-3.103 1.444-.562.814-.697 1.784-.697 2.486v.799H8.1a.65.65 0 0 0-.65.65v2.702c0 .359.291.65.65.65h1.373V18.2c0 .359.291.65.65.65h3.372a.65.65 0 0 0 .65-.65v-5.42h1.947a.65.65 0 0 0 .646-.582l.281-2.702a.65.65 0 0 0-.646-.717h-2.228v-.634a.655.655 0 0 0-.006-.086v-.003l.002-.003.002-.001h.034l1.11.004.902.003a.65.65 0 0 0 .653-.65V4.7a.65.65 0 0 0-.65-.65h-2.92Zm2.269 2.706V5.35h-2.27c-1.132 0-1.71.415-2.032.883-.351.508-.467 1.177-.467 1.747v1.449a.65.65 0 0 1-.65.65H8.75v1.402h1.373a.65.65 0 0 1 .65.65v5.419h2.072v-5.42a.65.65 0 0 1 .65-.65h2.01l.146-1.401h-2.156a.65.65 0 0 1-.65-.65V8.18a1.308 1.308 0 0 1 1.346-1.429l1.101.004h.25Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--feedback":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M1.5 12C1.5 6.201 6.201 1.5 12 1.5S22.5 6.201 22.5 12 17.799 22.5 12 22.5 1.5 17.799 1.5 12ZM12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0Zm6.72 15.333a.75.75 0 0 0-1.344-.666A6 6 0 0 1 12 18a.75.75 0 0 0 0 1.5 7.5 7.5 0 0 0 6.72-4.167ZM8.25 7.875a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Zm6.704.33a1.125 1.125 0 1 1 1.591 1.59 1.125 1.125 0 0 1-1.59-1.59Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--filter":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M10.496 24c-.829 0-1.504-.698-1.504-1.555v-9.622C4.049 11.497.37 6.952.004 1.663.002 1.625 0 1.591 0 1.556c0-.414.156-.805.44-1.1A1.47 1.47 0 0 1 1.503 0h20.994a1.473 1.473 0 0 1 1.13.53c.264.312.396.712.37 1.128l-.001.01c-.37 5.288-4.05 9.832-8.992 11.155v7.03c0 .463-.197.898-.542 1.195l-3.005 2.591c-.27.232-.61.361-.961.361ZM1.504 1.555c.348 4.852 3.795 8.916 8.39 9.888a.774.774 0 0 1 .6.762v10.24l3.007-2.593v-7.647c0-.368.252-.689.601-.762 4.605-.972 8.057-5.039 8.395-9.89l-20.993.002Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--filter-filled":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M8.992 22.445c0 .857.675 1.555 1.504 1.555.35 0 .691-.129.96-.36l3.006-2.592c.345-.297.543-.732.542-1.196v-7.03c4.943-1.322 8.622-5.866 8.992-11.154v-.01a1.582 1.582 0 0 0-.37-1.128 1.473 1.473 0 0 0-1.13-.53H1.504C1.101 0 .723.163.44.456.156.751 0 1.142 0 1.556c0 .035.002.069.004.107.367 5.289 4.045 9.834 8.988 11.16v9.622Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--flag":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M8.1 13.07a8.86 8.86 0 0 0-3.725.322.75.75 0 1 1-.442-1.433 10.36 10.36 0 0 1 8.478 1.078 8.869 8.869 0 0 0 7.08.98.75.75 0 0 1 .412 1.442 10.364 10.364 0 0 1-8.278-1.145m-3.526-1.243a8.858 8.858 0 0 1 3.526 1.243l-3.526-1.243Z' fill='%23262626'/%3e%3cpath d='M.75 24a.75.75 0 0 1-.75-.75V.75a.75.75 0 0 1 1.5 0v1.88l2.184-.671a10.355 10.355 0 0 1 8.477 1.079 8.87 8.87 0 0 0 7.079.974l2.369-.677a1.867 1.867 0 0 1 1.839.476c.356.353.552.824.552 1.325v11.728c0 .833-.559 1.574-1.36 1.803l-2.987.854a10.362 10.362 0 0 1-8.278-1.145 8.853 8.853 0 0 0-7.25-.922l-2.625.808v4.988a.75.75 0 0 1-.75.75Zm5.981-8.438c1.919 0 3.796.531 5.43 1.537a8.874 8.874 0 0 0 7.08.98l2.987-.854a.377.377 0 0 0 .272-.361V5.137a.373.373 0 0 0-.48-.361l-2.368.677a10.372 10.372 0 0 1-8.278-1.138 8.853 8.853 0 0 0-7.25-.922L1.5 4.199v12.494l2.184-.672a10.352 10.352 0 0 1 3.047-.459Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--flag-bold":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='25' height='25' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.187 12.47a9.975 9.975 0 0 1 4.324-.385c1.452.19 2.848.699 4.093 1.49a8.162 8.162 0 0 0 3.23 1.2c1.144.163 2.309.078 3.42-.249a.973.973 0 0 1 1.209.69 1.004 1.004 0 0 1-.67 1.233 9.976 9.976 0 0 1-4.23.306 10.081 10.081 0 0 1-3.988-1.48 8.152 8.152 0 0 0-3.312-1.206 8.067 8.067 0 0 0-3.497.311.972.972 0 0 1-1.223-.663 1.005 1.005 0 0 1 .644-1.247Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M1.974.95C2.54.95 3 1.409 3 1.974v21.952a1.024 1.024 0 0 1-2.049 0V1.974C.95 1.41 1.409.95 1.974.95Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M4.75 2.397a10.404 10.404 0 0 1 8.51 1.082 8.353 8.353 0 0 0 6.67.918l2.313-.66a2.123 2.123 0 0 1 2.703 2.04v12.555a2.122 2.122 0 0 1-1.539 2.04l-2.914.834a10.407 10.407 0 0 1-8.31-1.143 8.35 8.35 0 0 0-6.833-.869l-3.073.95a1.024 1.024 0 0 1-1.327-.98V4.322c0-.45.293-.846.723-.979l3.077-.946Zm4.114 1.656a8.355 8.355 0 0 0-3.511.302l-2.354.724v12.697l1.746-.54a10.4 10.4 0 0 1 8.512 1.082 8.354 8.354 0 0 0 6.673.918l2.914-.833a.073.073 0 0 0 .053-.07V5.777a.073.073 0 0 0-.03-.06.074.074 0 0 0-.064-.011l-2.31.66a10.403 10.403 0 0 1-8.306-1.143 8.355 8.355 0 0 0-3.323-1.171Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--flag-bold-color":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='25' height='25' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.187 12.47a9.975 9.975 0 0 1 4.324-.385c1.452.19 2.848.699 4.093 1.49a8.162 8.162 0 0 0 3.23 1.2c1.144.163 2.309.078 3.42-.249a.973.973 0 0 1 1.209.69 1.004 1.004 0 0 1-.67 1.233 9.976 9.976 0 0 1-4.23.306 10.081 10.081 0 0 1-3.988-1.48 8.152 8.152 0 0 0-3.312-1.206 8.067 8.067 0 0 0-3.497.311.972.972 0 0 1-1.223-.663 1.005 1.005 0 0 1 .644-1.247Z' fill='%2329D305'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M1.974.95C2.54.95 3 1.409 3 1.974v21.952a1.024 1.024 0 0 1-2.049 0V1.974C.95 1.41 1.409.95 1.974.95Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M4.75 2.397a10.404 10.404 0 0 1 8.51 1.082 8.353 8.353 0 0 0 6.67.918l2.313-.66a2.123 2.123 0 0 1 2.703 2.04v12.555a2.122 2.122 0 0 1-1.539 2.04l-2.914.834a10.407 10.407 0 0 1-8.31-1.143 8.35 8.35 0 0 0-6.833-.869l-3.073.95a1.024 1.024 0 0 1-1.327-.98V4.322c0-.45.293-.846.723-.979l3.077-.946Zm4.114 1.656a8.355 8.355 0 0 0-3.511.302l-2.354.724v12.697l1.746-.54a10.4 10.4 0 0 1 8.512 1.082 8.354 8.354 0 0 0 6.673.918l2.914-.833a.073.073 0 0 0 .053-.07V5.777a.073.073 0 0 0-.03-.06.074.074 0 0 0-.064-.011l-2.31.66a10.403 10.403 0 0 1-8.306-1.143 8.355 8.355 0 0 0-3.323-1.171Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--flag-color":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M8.1 13.07a8.86 8.86 0 0 0-3.725.322.75.75 0 1 1-.442-1.433 10.36 10.36 0 0 1 8.478 1.078 8.869 8.869 0 0 0 7.08.98.75.75 0 0 1 .412 1.442 10.364 10.364 0 0 1-8.278-1.145m-3.526-1.243a8.858 8.858 0 0 1 3.526 1.243l-3.526-1.243Z' fill='%2329D305'/%3e%3cpath d='M.75 24a.75.75 0 0 1-.75-.75V.75a.75.75 0 0 1 1.5 0v1.88l2.184-.671a10.355 10.355 0 0 1 8.477 1.079 8.87 8.87 0 0 0 7.079.974l2.369-.677a1.867 1.867 0 0 1 1.839.476c.356.353.552.824.552 1.325v11.728c0 .833-.559 1.574-1.36 1.803l-2.987.854a10.362 10.362 0 0 1-8.278-1.145 8.853 8.853 0 0 0-7.25-.922l-2.625.808v4.988a.75.75 0 0 1-.75.75Zm5.981-8.438c1.919 0 3.796.531 5.43 1.537a8.874 8.874 0 0 0 7.08.98l2.987-.854a.377.377 0 0 0 .272-.361V5.137a.373.373 0 0 0-.48-.361l-2.368.677a10.372 10.372 0 0 1-8.278-1.138 8.853 8.853 0 0 0-7.25-.922L1.5 4.199v12.494l2.184-.672a10.352 10.352 0 0 1 3.047-.459Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--folder":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M2.571 22.5C1.153 22.5 0 21.323 0 19.875V4.125C0 2.677 1.153 1.5 2.571 1.5h4.286c.805 0 1.574.392 2.057 1.05l1.8 2.45H21.43C22.847 5 24 6.177 24 7.625v12.25c0 1.448-1.153 2.625-2.571 2.625H2.57Zm0-19.25a.867.867 0 0 0-.857.875v15.75c0 .483.384.875.857.875H21.43a.867.867 0 0 0 .857-.875V7.625a.867.867 0 0 0-.857-.875H10.286A.855.855 0 0 1 9.6 6.4L7.543 3.6a.855.855 0 0 0-.686-.35H2.571Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--folder_create":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M2.447 19.5a.725.725 0 0 1-.231-.037A2.465 2.465 0 0 1 0 17.06V2.25A2.252 2.252 0 0 1 2.25 0h4.5C7.99 0 9 1.009 9 2.25V3h9.75C19.99 3 21 4.009 21 5.25V7.5h.75c.601 0 1.166.234 1.591.658a2.235 2.235 0 0 1 .583 2.171.752.752 0 0 1-.919.531.747.747 0 0 1-.53-.918A.746.746 0 0 0 21.75 9H7.879a.755.755 0 0 0-.722.542l-2.351 8.154a2.337 2.337 0 0 1-.108.304H8.25a.75.75 0 0 1 0 1.5H2.447Zm-.197-18a.75.75 0 0 0-.75.75v14.8a.95.95 0 0 0 1.864.235l2.352-8.158A2.261 2.261 0 0 1 7.878 7.5H19.5V5.25a.75.75 0 0 0-.75-.75H8.25a.75.75 0 0 1-.75-.75v-1.5a.75.75 0 0 0-.75-.75h-4.5Zm15 22.5a6.758 6.758 0 0 1-6.75-6.75 6.758 6.758 0 0 1 6.75-6.75A6.758 6.758 0 0 1 24 17.25 6.758 6.758 0 0 1 17.25 24Zm0-12A5.256 5.256 0 0 0 12 17.25a5.256 5.256 0 0 0 5.25 5.25 5.256 5.256 0 0 0 5.25-5.25A5.256 5.256 0 0 0 17.25 12Zm-.75 8.25a.75.75 0 0 0 1.5 0V18h2.25a.75.75 0 0 0 0-1.5H18v-2.25a.75.75 0 0 0-1.5 0v2.25h-2.25a.75.75 0 0 0 0 1.5h2.25v2.25Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--folder_open":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M2.447 22.5a.731.731 0 0 1-.223-.034A2.464 2.464 0 0 1 0 20.06V3.75A2.252 2.252 0 0 1 2.25 1.5h4.5C7.99 1.5 9 2.509 9 3.75v.75h9.75C19.99 4.5 21 5.509 21 6.75V9h.75c.601 0 1.166.234 1.591.658a2.235 2.235 0 0 1 .583 2.171l-2.196 8.985A2.258 2.258 0 0 1 19.55 22.5H2.447ZM19.55 21a.75.75 0 0 0 .725-.557l2.196-8.985a.746.746 0 0 0-.721-.958H7.878a.754.754 0 0 0-.721.541l-2.342 9.625a2.81 2.81 0 0 1-.119.334H19.55ZM2.25 3a.75.75 0 0 0-.75.75v16.3a.95.95 0 0 0 1.864.235l2.344-9.631A2.276 2.276 0 0 1 7.877 9H19.5V6.75a.75.75 0 0 0-.75-.75H8.25a.75.75 0 0 1-.75-.75v-1.5A.75.75 0 0 0 6.75 3h-4.5Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--form_check-color":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M8.032 3.73a.603.603 0 0 1 .83-.115.568.568 0 0 1 .118.808L6.698 7.37a.598.598 0 0 1-.433.228.597.597 0 0 1-.46-.167l-1.63-1.578a.563.563 0 0 1 0-.816.597.597 0 0 1 .418-.169c.158 0 .308.06.42.169l1.147 1.11L8.032 3.73Z' fill='%2329D305'/%3e%3cpath d='M0 18.75C0 19.991 1.01 21 2.253 21h5.256a.75.75 0 1 0 0-1.5H2.253a.75.75 0 0 1-.751-.75V2.25a.75.75 0 0 1 .75-.75h10.642c.2 0 .388.078.53.219L16.3 4.591c.139.14.219.333.219.53V8.25a.75.75 0 0 0 1.502 0V5.12c0-.6-.235-1.165-.66-1.59L14.486.658A2.24 2.24 0 0 0 12.894 0H2.253A2.254 2.254 0 0 0 0 2.25v16.5Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M10.733 23.78a.744.744 0 0 0 .679.204l3.753-.75c.146-.029.28-.1.385-.205l7.638-7.63.021-.022c1.065-1.155 1.056-2.926-.036-4.045a2.854 2.854 0 0 0-2.022-.832c-.767 0-1.488.298-2.028.839l-7.639 7.63a.747.747 0 0 0-.205.384l-.751 3.75c-.05.246.027.5.205.677Zm3.915-1.971-2.427.485.485-2.424 7.479-7.47c.257-.258.6-.4.965-.4v-.375l.001.375c.364 0 .706.14.946.379l.021.022c.506.519.5 1.397.001 1.945l-7.471 7.463Z' fill='black'/%3e%3cpath d='M4 10.25a.75.75 0 0 1 .75-.75h6.5a.75.75 0 0 1 0 1.5h-6.5a.75.75 0 0 1-.75-.75ZM4.75 13a.75.75 0 0 0 0 1.5h3.5a.75.75 0 0 0 0-1.5h-3.5Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--form":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M0 18.75C0 19.991 1.01 21 2.253 21h5.256a.75.75 0 1 0 0-1.5H2.253a.75.75 0 0 1-.751-.75V2.25a.75.75 0 0 1 .75-.75h10.642c.2 0 .388.078.53.219L16.3 4.591c.139.14.219.333.219.53V8.25a.75.75 0 0 0 1.502 0V5.12c0-.6-.235-1.165-.66-1.59L14.486.658A2.24 2.24 0 0 0 12.894 0H2.253A2.254 2.254 0 0 0 0 2.25v16.5ZM4.844 6C4.378 6 4 6.336 4 6.75s.378.75.844.75h7.312c.466 0 .844-.336.844-.75S12.622 6 12.156 6H4.844ZM4 10.25c0-.414.378-.75.844-.75h7.312c.466 0 .844.336.844.75s-.378.75-.844.75H4.844C4.378 11 4 10.664 4 10.25ZM10.78 24a.773.773 0 0 1-.551-.228.771.771 0 0 1-.213-.702l.779-3.89a.775.775 0 0 1 .213-.397l7.93-7.913a2.958 2.958 0 0 1 2.105-.87c.793 0 1.538.307 2.1.863 1.132 1.16 1.141 2.997.037 4.195a.437.437 0 0 1-.022.022l-7.93 7.913a.773.773 0 0 1-.399.213l-3.896.777a.713.713 0 0 1-.154.017Zm.993-1.77 2.519-.502 7.756-7.74c.518-.568.524-1.478-.001-2.017l-.022-.022a1.393 1.393 0 0 0-.982-.393l-.001-.39v.39c-.378 0-.735.147-1.002.414l-7.763 7.747-.504 2.514ZM4 13.75a.75.75 0 0 1 .75-.75h3.5a.75.75 0 0 1 0 1.5h-3.5a.75.75 0 0 1-.75-.75Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--form-color":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M4 10.25c0-.414.378-.75.844-.75h7.312c.466 0 .844.336.844.75s-.378.75-.844.75H4.844C4.378 11 4 10.664 4 10.25ZM4 6.75c0-.414.378-.75.844-.75h7.312c.466 0 .844.336.844.75s-.378.75-.844.75H4.844C4.378 7.5 4 7.164 4 6.75ZM4 13.75a.75.75 0 0 1 .75-.75h3.5a.75.75 0 0 1 0 1.5h-3.5a.75.75 0 0 1-.75-.75Z' fill='%2329D305'/%3e%3cpath d='M10.78 24a.773.773 0 0 1-.551-.228.771.771 0 0 1-.213-.702l.779-3.89a.775.775 0 0 1 .213-.397l7.93-7.913a2.958 2.958 0 0 1 2.105-.87c.793 0 1.538.307 2.1.863 1.132 1.16 1.141 2.997.037 4.195a.437.437 0 0 1-.022.022l-7.93 7.913a.773.773 0 0 1-.399.213l-3.896.777a.713.713 0 0 1-.154.017Zm.993-1.77 2.519-.502 7.756-7.74c.518-.568.524-1.478-.001-2.017l-.022-.022a1.393 1.393 0 0 0-.982-.393l-.001-.39v.39c-.378 0-.735.147-1.002.414l-7.763 7.747-.504 2.514ZM2.253 21A2.253 2.253 0 0 1 0 18.75V2.25A2.254 2.254 0 0 1 2.253 0h10.64a2.24 2.24 0 0 1 1.593.658L17.36 3.53c.425.425.66.99.66 1.59v3.13a.75.75 0 0 1-1.502 0V5.121c0-.197-.08-.39-.22-.53l-2.875-2.872a.749.749 0 0 0-.53-.219H2.253a.75.75 0 0 0-.751.75v16.5c0 .414.336.75.75.75H7.51a.75.75 0 1 1 0 1.5H2.253Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--full_battery":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5 5.5H3.201c-.849 0-1.663.342-2.263.952C.338 7.062 0 7.888 0 8.75v6.5c0 .862.337 1.689.937 2.298.6.61 1.414.952 2.263.952h1.792s.814 0 .814-.813c0-.812-.814-.812-.814-.812H3.2c-.424 0-.831-.171-1.131-.476A1.638 1.638 0 0 1 1.6 15.25v-6.5c0-.431.169-.844.47-1.149.3-.305.707-.476 1.131-.476H5s.806 0 .806-.813C5.806 5.5 5 5.5 5 5.5ZM15.364 16.875H17.6c.424 0 .831-.171 1.131-.476.3-.305.469-.718.469-1.149v-.813c0-.448.358-.812.8-.812h1.6a.794.794 0 0 0 .566-.238.819.819 0 0 0 .234-.575v-1.624a.819.819 0 0 0-.234-.575.794.794 0 0 0-.566-.238H20a.806.806 0 0 1-.8-.813V8.75c0-.431-.169-.844-.469-1.149a1.588 1.588 0 0 0-1.131-.476h-2.21s-.89 0-.89-.813c0-.812.89-.812.89-.812h2.21c.849 0 1.663.342 2.263.952.6.61.937 1.436.937 2.298h.8c.636 0 1.247.257 1.697.714.45.457.703 1.077.703 1.723v1.626c0 .646-.253 1.266-.703 1.723-.45.457-1.06.714-1.697.714h-.8c0 .862-.337 1.689-.937 2.298-.6.61-1.414.952-2.263.952h-2.236s-.864 0-.864-.813c0-.812.864-.812.864-.812ZM6.725 11.802l.447-.665 1.43-1.845 2.71-3.64c.19-.262.61-.159.615.114.006.272-.593 4.085-.691 4.684a.088.088 0 0 0 .043.088c.01.006.021.01.033.01l1.324.213c.15.022.29.093.397.202.109.106.188.24.23.386.034.147.034.3 0 .447-.028.15-.087.294-.175.42l-1.507 1.95-3.124 4.21a.3.3 0 0 1-.348.104.294.294 0 0 1-.18-.321l.67-4.576a.104.104 0 0 0-.093-.12l-1.302-.207a.856.856 0 0 1-.632-.463.975.975 0 0 1 .153-.991Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--full_battery-color":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5 5.5H3.201c-.849 0-1.663.342-2.263.952C.338 7.062 0 7.888 0 8.75v6.5c0 .862.337 1.689.937 2.298.6.61 1.414.952 2.263.952h1.792s.814 0 .814-.813c0-.812-.814-.812-.814-.812H3.2c-.424 0-.831-.171-1.131-.476A1.638 1.638 0 0 1 1.6 15.25v-6.5c0-.431.169-.844.47-1.149.3-.305.707-.476 1.131-.476H5s.806 0 .806-.813C5.806 5.5 5 5.5 5 5.5ZM15.364 16.875H17.6c.424 0 .831-.171 1.131-.476.3-.305.469-.718.469-1.149v-.813c0-.448.358-.812.8-.812h1.6a.794.794 0 0 0 .566-.238.819.819 0 0 0 .234-.575v-1.624a.819.819 0 0 0-.234-.575.794.794 0 0 0-.566-.238H20a.806.806 0 0 1-.8-.813V8.75c0-.431-.169-.844-.469-1.149a1.588 1.588 0 0 0-1.131-.476h-2.21s-.89 0-.89-.813c0-.812.89-.812.89-.812h2.21c.849 0 1.663.342 2.263.952.6.61.937 1.436.937 2.298h.8c.636 0 1.247.257 1.697.714.45.457.703 1.077.703 1.723v1.626c0 .646-.253 1.266-.703 1.723-.45.457-1.06.714-1.697.714h-.8c0 .862-.337 1.689-.937 2.298-.6.61-1.414.952-2.263.952h-2.236s-.864 0-.864-.813c0-.812.864-.812.864-.812Z' fill='black'/%3e%3cpath d='m6.725 11.802.447-.665 1.43-1.845 2.71-3.64c.19-.262.61-.159.615.114.006.272-.593 4.085-.691 4.684a.088.088 0 0 0 .043.088c.01.006.021.01.033.01l1.324.213c.15.022.29.093.397.202.109.106.188.24.23.386.034.147.034.3 0 .447-.028.15-.087.294-.175.42l-1.507 1.95-3.124 4.21a.3.3 0 0 1-.348.104.294.294 0 0 1-.18-.321l.67-4.576a.104.104 0 0 0-.093-.12l-1.302-.207a.856.856 0 0 1-.632-.463.975.975 0 0 1 .153-.991Z' fill='%2329D305'/%3e%3c/svg%3e",
     "e-icon--full_screen":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M7.404 9.436v5.128h9.192V9.436H7.404Zm-.51-1.539c-.564 0-1.021.46-1.021 1.026v6.154c0 .566.457 1.026 1.02 1.026h10.214c.564 0 1.02-.46 1.02-1.026V8.923c0-.566-.456-1.026-1.02-1.026H6.894ZM0 2.77C0 2.343.343 2 .766 2h4.085c.423 0 .766.344.766.77 0 .424-.343.768-.766.768h-3.32v3.334c0 .425-.342.769-.765.769A.768.768 0 0 1 0 6.871V2.77ZM0 21.23c0 .426.343.77.766.77h4.085a.768.768 0 0 0 .766-.77.768.768 0 0 0-.766-.768h-3.32v-3.334a.768.768 0 0 0-.765-.769.768.768 0 0 0-.766.77v4.102ZM23.234 2c.423 0 .766.344.766.77v4.102c0 .425-.343.769-.766.769a.768.768 0 0 1-.766-.77V3.539h-3.32a.768.768 0 0 1-.765-.769c0-.425.343-.769.766-.769h4.085ZM23.234 22a.768.768 0 0 0 .766-.77v-4.102a.768.768 0 0 0-.766-.769.768.768 0 0 0-.766.77v3.332h-3.32a.768.768 0 0 0-.765.77c0 .425.343.769.766.769h4.085Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M18.608 7.24c-.3-.3-.3-.788 0-1.088l2.888-2.901c.3-.3.784-.3 1.083 0 .3.3.3.787 0 1.088l-2.888 2.9c-.3.301-.784.301-1.083 0ZM1.246 20.573c-.3-.3-.3-.788 0-1.088l2.888-2.9c.3-.301.784-.301 1.084 0 .299.3.299.787 0 1.087l-2.89 2.901c-.298.3-.783.3-1.082 0ZM5.218 7.24c.299-.3.299-.788 0-1.088L2.329 3.25c-.3-.3-.784-.3-1.083 0-.3.3-.3.787 0 1.088l2.888 2.9c.3.301.785.301 1.084 0ZM22.579 20.573c.3-.3.3-.788 0-1.088l-2.889-2.9c-.299-.301-.784-.301-1.083 0-.299.3-.299.787 0 1.087l2.889 2.901c.299.3.784.3 1.083 0Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--full_screen-color":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M7.404 9.436v5.128h9.192V9.436H7.404Zm-.51-1.539c-.564 0-1.021.46-1.021 1.026v6.154c0 .566.457 1.026 1.02 1.026h10.214c.564 0 1.02-.46 1.02-1.026V8.923c0-.566-.456-1.026-1.02-1.026H6.894Z' fill='%2329D305'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M0 2.77C0 2.343.343 2 .766 2h4.085c.423 0 .766.344.766.77 0 .424-.343.768-.766.768h-3.32v3.334c0 .425-.342.769-.765.769A.768.768 0 0 1 0 6.871V2.77ZM0 21.23c0 .426.343.77.766.77h4.085a.768.768 0 0 0 .766-.77.768.768 0 0 0-.766-.768h-3.32v-3.334a.768.768 0 0 0-.765-.769.768.768 0 0 0-.766.77v4.102ZM23.234 2c.423 0 .766.344.766.77v4.102c0 .425-.343.769-.766.769a.768.768 0 0 1-.766-.77V3.539h-3.32a.768.768 0 0 1-.765-.769c0-.425.343-.769.766-.769h4.085ZM23.234 22a.768.768 0 0 0 .766-.77v-4.102a.768.768 0 0 0-.766-.769.768.768 0 0 0-.766.77v3.332h-3.32a.768.768 0 0 0-.765.77c0 .425.343.769.766.769h4.085Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M18.608 7.24c-.3-.3-.3-.788 0-1.088l2.888-2.901c.3-.3.784-.3 1.083 0 .3.3.3.787 0 1.088l-2.888 2.9c-.3.301-.784.301-1.083 0ZM1.246 20.573c-.3-.3-.3-.788 0-1.088l2.888-2.9c.3-.301.784-.301 1.084 0 .299.3.299.787 0 1.087l-2.89 2.901c-.298.3-.783.3-1.082 0ZM5.218 7.24c.299-.3.299-.788 0-1.088L2.329 3.25c-.3-.3-.784-.3-1.083 0-.3.3-.3.787 0 1.088l2.888 2.9c.3.301.785.301 1.084 0ZM22.579 20.573c.3-.3.3-.788 0-1.088l-2.889-2.9c-.299-.301-.784-.301-1.083 0-.299.3-.299.787 0 1.087l2.889 2.901c.299.3.784.3 1.083 0Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--freshchat-color":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M6.887 10.35c0-.414.35-.75.783-.75h10.174c.432 0 .782.336.782.75s-.35.75-.782.75H7.67c-.433 0-.783-.336-.783-.75ZM6.887 13.35c0-.414.35-.75.783-.75h7.043c.432 0 .783.336.783.75s-.35.75-.783.75H7.67c-.433 0-.783-.336-.783-.75Z' fill='%2329D305'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M21 1.5h-9C6.201 1.5 1.5 6.201 1.5 12S6.201 22.5 12 22.5 22.5 17.799 22.5 12V3A1.5 1.5 0 0 0 21 1.5ZM12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12V3a3 3 0 0 0-3-3h-9Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--future":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M23.5 12.739c0-1.493-.301-2.886-.904-4.28a.858.858 0 0 0-.402-.398c-.2-.1-.402-.1-.602 0a.749.749 0 0 0-.503.697c0 .1.03.132.1.299.503 1.194.704 2.388.704 3.682 0 2.488-.904 4.777-2.712 6.568-1.808 1.792-4.219 2.887-6.73 2.986-2.612.1-5.022-.896-6.93-2.687-1.91-1.792-3.014-4.28-3.014-6.867 0-2.488.904-4.777 2.712-6.569 1.707-1.691 4.018-2.786 6.328-2.985 2.11-.1 4.219.398 6.027 1.592H14.66c-.402 0-.804.398-.804.796s.402.796.804.796h4.821c.402 0 .804-.398.804-.796V.796A.788.788 0 0 0 19.482 0a.788.788 0 0 0-.803.796v2.787c-1.909-1.294-4.32-2.09-6.63-1.99-.2 0-.502 0-.803.099H10.944c-2.712.298-5.022 1.493-6.83 3.384A11.196 11.196 0 0 0 1 12.838c0 1.493.301 2.887.904 4.28 0 .1.1.199.2.298.604 1.294 1.407 2.488 2.512 3.484 4.52 4.28 11.652 4.08 15.971-.299 1.808-2.19 2.913-4.976 2.913-7.862Z' fill='black'/%3e%3cpath d='M16.798 17.8a.792.792 0 0 1-.565-.234l-5-5a.79.79 0 0 1-.173-.262l-.01-.027A.786.786 0 0 1 11 12V8a.8.8 0 0 1 1.6 0v3.668l4.765 4.766A.794.794 0 0 1 17.6 17a.802.802 0 0 1-.801.801Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--graph_bar":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M2.25 10.75A2.252 2.252 0 0 0 4.5 13a2.252 2.252 0 0 0 2.25-2.25c0-.411-.115-.816-.327-1.166l4.818-5.218c.244.088.509.134.762.134.892 0 1.497-.562 1.497-.562L17.38 6.5s-.13.25-.13.75c0 1.25 1.009 2.25 2.25 2.25a2.252 2.252 0 0 0 2.25-2.25A2.252 2.252 0 0 0 19.5 5c-.5 0-1.1.28-1.1.28L14.22 2.6C14.5 1 13.166 0 12.003 0a2.252 2.252 0 0 0-2.25 2.25c0 .411.115.816.327 1.166L5.262 8.634A2.252 2.252 0 0 0 2.25 10.75ZM4.5 10a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm15-3.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm-7.497-5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5ZM0 23.25c0 .414.336.75.75.75h22.5a.75.75 0 0 0 0-1.5h-.75V15c0-.827-.673-1.5-1.5-1.5h-3c-.827 0-1.5.673-1.5 1.5v7.5H15v-12c0-.827-.673-1.5-1.5-1.5h-3C9.673 9 9 9.673 9 10.5v12H7.5V18c0-.827-.673-1.5-1.5-1.5H3c-.827 0-1.5.673-1.5 1.5v4.5H.75a.75.75 0 0 0-.75.75ZM21 15v7.5h-3V15h3Zm-7.5-4.5v12h-3v-12h3ZM6 18v4.5H3V18h3Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--graph_bar-color":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M.75 24a.75.75 0 0 1 0-1.5h.75V18c0-.827.673-1.5 1.5-1.5h3c.827 0 1.5.673 1.5 1.5v4.5H9v-12c0-.827.673-1.5 1.5-1.5h3c.827 0 1.5.673 1.5 1.5v12h1.5V15c0-.827.673-1.5 1.5-1.5h3c.827 0 1.5.673 1.5 1.5v7.5h.75a.75.75 0 0 1 0 1.5H.75ZM21 22.5V15h-3v7.5h3Zm-7.5 0v-12h-3v12h3Zm-7.5 0V18H3v4.5h3Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M4.5 13a2.252 2.252 0 0 1-2.25-2.25 2.252 2.252 0 0 1 3.012-2.116l4.818-5.218a2.257 2.257 0 0 1-.327-1.166A2.252 2.252 0 0 1 12.003 0c1.163 0 2.497 1 2.217 2.6l4.18 2.68S19 5 19.5 5a2.252 2.252 0 0 1 2.25 2.25A2.252 2.252 0 0 1 19.5 9.5c-1.241 0-2.25-1-2.25-2.25 0-.5.13-.75.13-.75L13.5 3.938s-.605.562-1.497.562c-.253 0-.518-.046-.762-.134L6.423 9.584c.212.35.327.755.327 1.166A2.252 2.252 0 0 1 4.5 13Zm-.75-2.25a.75.75 0 1 1 1.5 0 .75.75 0 0 1-1.5 0Zm15-3.5a.75.75 0 1 1 1.5 0 .75.75 0 0 1-1.5 0Zm-7.497-5a.75.75 0 1 1 1.5 0 .75.75 0 0 1-1.5 0Z' fill='%2329D305'/%3e%3c/svg%3e",
     "e-icon--graph_up":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M.22 13.28c.141.142.33.22.53.22s.389-.078.53-.22l7.19-7.189A.746.746 0 0 1 9 5.872c.201 0 .389.078.53.219l3.129 3.129a2.23 2.23 0 0 0 1.59.658c.602 0 1.167-.233 1.592-.658L22.5 2.561V7.5a.75.75 0 0 0 1.5 0V.75a.751.751 0 0 0-.052-.276l-.004-.009a.75.75 0 0 0-.401-.405l-.032-.012A.735.735 0 0 0 23.25 0H16.5a.75.75 0 0 0 0 1.5h4.941l-6.659 6.659a.747.747 0 0 1-1.062 0l-3.128-3.128a2.235 2.235 0 0 0-1.591-.658c-.602 0-1.167.233-1.592.658L.22 12.22a.743.743 0 0 0-.22.53c0 .2.078.389.22.53ZM0 23.25c0 .414.336.75.75.75h22.5a.75.75 0 0 0 0-1.5h-.75V15c0-.827-.673-1.5-1.5-1.5h-3c-.827 0-1.5.673-1.5 1.5v7.5H15v-7c0-.827-.673-1.5-1.5-1.5h-3c-.827 0-1.5.673-1.5 1.5v7H7.5V18c0-.827-.673-1.5-1.5-1.5H3c-.827 0-1.5.673-1.5 1.5v4.5H.75a.75.75 0 0 0-.75.75ZM21 15v7.5h-3V15h3Zm-7.5.5v7h-3v-7h3ZM6 18v4.5H3V18h3Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--ground_fault":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='25' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M14.249 23a.752.752 0 0 1-.75-.754v-6.034a.752.752 0 0 0-.75-.754h-1.5a.752.752 0 0 0-.75.754v6.034a.752.752 0 0 1-.75.754h-6a.752.752 0 0 1-.75-.754v-11l-1.72 1.73a.744.744 0 0 1-1.06-.002.76.76 0 0 1 0-1.066l10.19-10.246A2.229 2.229 0 0 1 12 1c.601 0 1.166.235 1.591.662l2.206 2.218 3.83 3.858.373.39a.76.76 0 0 1 0 1.066.742.742 0 0 1-1.06 0l-.814-.83L12.53 2.73a.746.746 0 0 0-1.061 0l-6.97 7.008v11.754h4.5v-5.28a2.258 2.258 0 0 1 2.25-2.262h1.5a2.258 2.258 0 0 1 2.25 2.262v5.28H16s1 0 1 .754S16 23 16 23h-1.751Z' fill='black'/%3e%3cpath d='m17.754 16.817.425-.614L19.54 14.5l2.58-3.36c.181-.242.58-.146.586.105.005.252-.565 3.772-.659 4.325a.077.077 0 0 0 .017.06.083.083 0 0 0 .056.03l1.26.196a.67.67 0 0 1 .379.186.8.8 0 0 1 .217.357.854.854 0 0 1 0 .413.96.96 0 0 1-.166.387L22.376 19l-2.973 3.886a.294.294 0 0 1-.332.096.278.278 0 0 1-.14-.12.265.265 0 0 1-.031-.177l.638-4.224a.093.093 0 0 0-.02-.074.098.098 0 0 0-.068-.036l-1.24-.191a.828.828 0 0 1-.354-.143.797.797 0 0 1-.247-.285.874.874 0 0 1 .145-.915Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--ground_fault-color":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='25' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M14.249 23a.752.752 0 0 1-.75-.754v-6.034a.752.752 0 0 0-.75-.754h-1.5a.752.752 0 0 0-.75.754v6.034a.752.752 0 0 1-.75.754h-6a.752.752 0 0 1-.75-.754v-11l-1.72 1.73a.744.744 0 0 1-1.06-.002.76.76 0 0 1 0-1.066l10.19-10.246A2.229 2.229 0 0 1 12 1c.601 0 1.166.235 1.591.662l2.206 2.218 3.83 3.858.373.39a.76.76 0 0 1 0 1.066.742.742 0 0 1-1.06 0l-.814-.83L12.53 2.73a.746.746 0 0 0-1.061 0l-6.97 7.008v11.754h4.5v-5.28a2.258 2.258 0 0 1 2.25-2.262h1.5a2.258 2.258 0 0 1 2.25 2.262v5.28H16s1 0 1 .754S16 23 16 23h-1.751Z' fill='black'/%3e%3cpath d='m17.754 16.817.425-.614L19.54 14.5l2.58-3.36c.181-.242.58-.146.586.105.005.252-.565 3.772-.659 4.325a.077.077 0 0 0 .017.06.083.083 0 0 0 .056.03l1.26.196a.67.67 0 0 1 .379.186.8.8 0 0 1 .217.357.854.854 0 0 1 0 .413.96.96 0 0 1-.166.387L22.376 19l-2.973 3.886a.294.294 0 0 1-.332.096.278.278 0 0 1-.14-.12.265.265 0 0 1-.031-.177l.638-4.224a.093.093 0 0 0-.02-.074.098.098 0 0 0-.068-.036l-1.24-.191a.828.828 0 0 1-.354-.143.797.797 0 0 1-.247-.285.874.874 0 0 1 .145-.915Z' fill='%2329D305'/%3e%3c/svg%3e",
     "e-icon--hammer_wrench-color":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M8.31 11.204a.747.747 0 0 1-.53-.22l-.693-.69a5.226 5.226 0 0 1-1.787.313 5.28 5.28 0 0 1-1.761-.304A5.27 5.27 0 0 1 .522 7.591a5.299 5.299 0 0 1-.007-4.573.751.751 0 0 1 .676-.43c.2 0 .39.079.53.22l1.426 1.425c.15.155.338.236.545.238h.039c.232 0 .402-.119.504-.218a.763.763 0 0 0 .23-.54.754.754 0 0 0-.215-.543L2.81 1.732a.754.754 0 0 1 .206-1.21A5.239 5.239 0 0 1 7.06.304a5.263 5.263 0 0 1 3.013 2.714 5.326 5.326 0 0 1 .213 4.066l.615.614c.293.293.293.77.003 1.064a.746.746 0 0 1-1.06.002l-.972-.97a.756.756 0 0 1-.148-.856 3.794 3.794 0 0 0-.004-3.272 3.77 3.77 0 0 0-2.158-1.945 3.783 3.783 0 0 0-1.816-.178l.574.574c.425.436.653 1.008.646 1.614a2.258 2.258 0 0 1-.682 1.597 2.251 2.251 0 0 1-1.583.647h-.025a2.256 2.256 0 0 1-1.594-.684L1.54 4.75c-.108.741.005 1.5.336 2.191a3.771 3.771 0 0 0 2.161 1.943 3.746 3.746 0 0 0 2.9-.157.743.743 0 0 1 .853.145L8.839 9.92a.749.749 0 0 1 .002 1.064.744.744 0 0 1-.531.221ZM18.7 24a5.28 5.28 0 0 1-1.766-.305 5.263 5.263 0 0 1-3.013-2.715 5.321 5.321 0 0 1-.213-4.064L12.64 15.85a.755.755 0 0 1-.001-1.064.746.746 0 0 1 1.061-.001l1.423 1.422a.758.758 0 0 1 .148.855 3.793 3.793 0 0 0 .003 3.27 3.769 3.769 0 0 0 2.159 1.946 3.784 3.784 0 0 0 1.814.177l-.546-.545a2.291 2.291 0 0 1-.003-3.185 2.245 2.245 0 0 1 1.616-.679c.598 0 1.16.231 1.586.65l.551.55a3.792 3.792 0 0 0-.335-2.186 3.817 3.817 0 0 0-3.429-2.16c-.567 0-1.116.125-1.632.373a.75.75 0 0 1-.852-.145l-1.424-1.423a.754.754 0 0 1 .53-1.284c.2 0 .389.078.53.22l1.067 1.066a5.226 5.226 0 0 1 1.78-.31 5.324 5.324 0 0 1 4.782 3.014 5.29 5.29 0 0 1 .007 4.568.747.747 0 0 1-1.206.21l-1.425-1.423a.753.753 0 0 0-.531-.216.754.754 0 0 0-.546.23.77.77 0 0 0-.002 1.072l1.418 1.416a.755.755 0 0 1-.207 1.212 5.223 5.223 0 0 1-2.277.52Z' fill='%2329D305'/%3e%3cpath d='M3 24c-.8 0-1.554-.31-2.12-.872a2.982 2.982 0 0 1-.012-4.218l4.714-4.696c.284-.282.66-.437 1.061-.437.401 0 .778.155 1.061.437l.44.436 6.3-6.081-2.64-2.626a2.238 2.238 0 0 1-.007-3.165L13.925.661c.424-.423.99-.656 1.592-.656.602 0 1.167.232 1.59.654l6.233 6.198c.425.422.659.983.66 1.58a2.22 2.22 0 0 1-.653 1.585l-.031.03-2.097 2.09a2.24 2.24 0 0 1-1.592.656 2.24 2.24 0 0 1-1.59-.655l-2.528-2.514-6.302 6.081.62.616c.283.283.439.658.439 1.058a1.488 1.488 0 0 1-.473 1.09l-4.671 4.654A2.988 2.988 0 0 1 3 24Zm-1.06-4.039A1.487 1.487 0 0 0 3 22.501c.402 0 .78-.156 1.062-.437l4.703-4.683L7.6 16.227l-.956-.95-4.702 4.684ZM15.52 1.505c-.2 0-.39.078-.531.217l-2.121 2.11a.743.743 0 0 0-.001 1.05l6.232 6.198c.141.141.33.218.531.218s.39-.077.531-.218l2.12-2.112a.733.733 0 0 0 0-1.048L16.049 1.72a.748.748 0 0 0-.53-.216Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--han":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M23.76 11.434 13.698.792C13.271.226 12.629 0 11.987 0c-.643 0-1.285.34-1.713.792L.214 11.434A.892.892 0 0 0 0 12c0 .226.107.453.214.566a.795.795 0 0 0 .535.226.795.795 0 0 0 .535-.226l1.82-1.925v11.434c0 .567.428.906.856.906h2.76s.937.075.937-.831c0-.906-.937-.867-.937-.867H4.71V8.943l6.742-7.132a.795.795 0 0 1 .536-.226c.107 0 .32.113.535.34l10.167 10.754a.795.795 0 0 0 .535.227.795.795 0 0 0 .535-.227.925.925 0 0 0 0-1.245Zm-8.563.226c.642 0 1.178-.566 1.178-1.245 0-.68-.536-1.245-1.178-1.245-.642 0-1.177.566-1.177 1.245 0 .68.535 1.245 1.177 1.245Zm1.178 7.132c0 .68-.536 1.246-1.178 1.246-.642 0-1.177-.566-1.177-1.246 0-.679.535-1.245 1.177-1.245s1.178.566 1.178 1.245Zm3.531-4.867h-1.498v1.584h1.07c.321 0 .535.227.535.567v5.886c0 .34-.214.566-.535.566H10.81c-.32 0-.535-.226-.535-.566v-5.886c0-.34.214-.567.535-.567h1.285v-1.584H10.38c-.856 0-1.605.792-1.605 1.698v6.679c0 .906.75 1.698 1.605 1.698h9.525c.857 0 1.606-.792 1.606-1.698v-6.68c0-.905-.75-1.697-1.606-1.697Zm-3.531.679c0 .679-.536 1.245-1.178 1.245-.642 0-1.177-.566-1.177-1.245 0-.68.535-1.245 1.177-1.245s1.178.566 1.178 1.245Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--han-color":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M15.197 11.66c.642 0 1.178-.566 1.178-1.245 0-.68-.536-1.245-1.178-1.245-.642 0-1.177.566-1.177 1.245 0 .68.535 1.245 1.177 1.245ZM15.197 20.038c.642 0 1.178-.566 1.178-1.246 0-.679-.536-1.245-1.178-1.245-.642 0-1.177.566-1.177 1.245 0 .68.535 1.246 1.177 1.246Z' fill='%2329D305'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='m13.699.792 10.06 10.642a.925.925 0 0 1 0 1.245.795.795 0 0 1-.535.227.795.795 0 0 1-.535-.227L12.522 1.925c-.214-.227-.428-.34-.535-.34a.795.795 0 0 0-.536.226L4.71 8.943v12.34H6.72s.937-.039.937.867-.937.831-.937.831H3.96c-.428 0-.856-.34-.856-.906V10.642l-1.82 1.924a.795.795 0 0 1-.535.226.795.795 0 0 1-.535-.226A.891.891 0 0 1 0 12c0-.226.107-.453.214-.566L10.274.792C10.702.34 11.344 0 11.987 0c.642 0 1.284.226 1.712.792Zm4.709 13.133h1.498c.857 0 1.606.792 1.606 1.698v6.679c0 .906-.75 1.698-1.606 1.698h-9.525c-.856 0-1.605-.792-1.605-1.698v-6.68c0-.905.75-1.697 1.605-1.697h1.713v1.584h-1.285c-.32 0-.535.227-.535.567v5.886c0 .34.214.566.535.566h8.67c.32 0 .534-.226.534-.566v-5.886c0-.34-.214-.567-.535-.567h-1.07v-1.584Z' fill='black'/%3e%3cpath d='M15.197 15.85c.642 0 1.178-.567 1.178-1.246 0-.68-.536-1.245-1.178-1.245-.642 0-1.177.566-1.177 1.245 0 .679.535 1.245 1.177 1.245Z' fill='%2329D305'/%3e%3c/svg%3e",
     "e-icon--heating":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M10.41.22a.75.75 0 0 1 0 1.06 2.25 2.25 0 0 0 0 3.18l-.53.53.53-.531a3.75 3.75 0 0 1 0 5.312.75.75 0 0 1-1.06-1.062 2.25 2.25 0 0 0 0-3.188l.53-.531-.53.53a3.75 3.75 0 0 1 0-5.3.75.75 0 0 1 1.06 0ZM14.42.22a.75.75 0 0 1 0 1.06 2.25 2.25 0 0 0 0 3.18l-.53.53.53-.531a3.75 3.75 0 0 1 0 5.312.75.75 0 0 1-1.06-1.062 2.25 2.25 0 0 0 0-3.188V5.52a3.75 3.75 0 0 1 0-5.3.75.75 0 0 1 1.06 0ZM18.42.22a.75.75 0 0 1 0 1.06 2.25 2.25 0 0 0 0 3.18l-.53.53.53-.531a3.75 3.75 0 0 1 0 5.312.75.75 0 0 1-1.06-1.062 2.25 2.25 0 0 0 0-3.188l.53-.531-.53.53a3.75 3.75 0 0 1 0-5.3.75.75 0 0 1 1.06 0ZM18.75 12a.75.75 0 0 1 .75.75v6a.75.75 0 0 1-1.5 0v-6a.75.75 0 0 1 .75-.75ZM12.75 12a.75.75 0 0 1 .75.75v6a.75.75 0 0 1-1.5 0v-6a.75.75 0 0 1 .75-.75ZM15.75 12a.75.75 0 0 1 .75.75v6a.75.75 0 0 1-1.5 0v-6a.75.75 0 0 1 .75-.75ZM9.75 12a.75.75 0 0 1 .75.75v6a.75.75 0 0 1-1.5 0v-6a.75.75 0 0 1 .75-.75ZM4.5 10.13A1.12 1.12 0 0 1 3.38 9 1.11 1.11 0 0 1 4.5 7.88 1.12 1.12 0 0 1 5.63 9M4.5 10.13A1.13 1.13 0 0 0 5.63 9m-1.5 0ZM4.5 14.5a1.12 1.12 0 0 1-1.12-1.13 1.11 1.11 0 0 1 1.12-1.12 1.12 1.12 0 0 1 1.13 1.12M4.5 14.5a1.13 1.13 0 0 0 1.13-1.13m-1.5 0ZM3.75 21a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5a.75.75 0 0 1 .75-.75ZM20.25 21a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5a.75.75 0 0 1 .75-.75Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M.659 5.159A2.25 2.25 0 0 1 2.25 4.5h3a.75.75 0 0 1 0 1.5h-3a.75.75 0 0 0-.75.75v13.5a.75.75 0 0 0 .75.75h19.5a.75.75 0 0 0 .75-.75V6.75a.75.75 0 0 0-.75-.75.75.75 0 0 1 0-1.5A2.25 2.25 0 0 1 24 6.75v13.5a2.25 2.25 0 0 1-2.25 2.25H2.25A2.25 2.25 0 0 1 0 20.25V6.75c0-.597.237-1.169.659-1.591Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--history":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M1 12.739c0-1.493.301-2.886.904-4.28.1-.199.24-.318.402-.398.2-.1.402-.1.602 0 .302.1.503.398.503.697 0 .1-.03.132-.1.299-.503 1.194-.704 2.388-.704 3.682 0 2.488.904 4.777 2.712 6.568 1.808 1.792 4.219 2.887 6.73 2.986 2.612.1 5.022-.896 6.93-2.687 1.91-1.792 3.014-4.28 3.014-6.867 0-2.488-.904-4.777-2.712-6.569-1.707-1.691-4.018-2.786-6.328-2.985-2.11-.1-4.219.398-6.027 1.592H9.84c.402 0 .804.398.804.796s-.402.796-.804.796H5.018c-.402 0-.804-.398-.804-.796V.796c0-.398.302-.796.804-.796s.803.398.803.796v2.787c1.909-1.294 4.32-2.09 6.63-1.99.2 0 .502 0 .803.099H13.556c2.712.298 5.022 1.493 6.83 3.384a11.196 11.196 0 0 1 3.114 7.762c0 1.493-.301 2.887-.904 4.28 0 .1-.1.199-.2.298-.604 1.294-1.407 2.488-2.512 3.484-4.52 4.28-11.652 4.08-15.971-.299C2.105 18.411 1 15.625 1 12.74Z' fill='black'/%3e%3cpath d='M16.798 17.8a.792.792 0 0 1-.565-.234l-5-5a.79.79 0 0 1-.173-.262l-.01-.027A.786.786 0 0 1 11 12V8a.8.8 0 0 1 1.6 0v3.668l4.765 4.766A.794.794 0 0 1 17.6 17a.802.802 0 0 1-.801.801Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--home":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='m11.469 2.73-6.97 7.008v11.754h4.5v-5.28a2.258 2.258 0 0 1 2.25-2.262h1.5a2.258 2.258 0 0 1 2.25 2.262v5.28h4.5V9.736L12.53 2.73a.746.746 0 0 0-1.061 0Zm9.53 8.514v11.002a.752.752 0 0 1-.75.754h-6a.752.752 0 0 1-.75-.754v-6.034a.752.752 0 0 0-.75-.754h-1.5a.752.752 0 0 0-.75.754v6.034a.752.752 0 0 1-.75.754h-6a.752.752 0 0 1-.75-.754v-11l-1.72 1.73a.744.744 0 0 1-1.06-.002.76.76 0 0 1 0-1.066l10.19-10.246A2.229 2.229 0 0 1 12 1c.601 0 1.166.235 1.591.662l2.206 2.218 5.202 5.231 2.78 2.795a.76.76 0 0 1 0 1.067.742.742 0 0 1-1.06 0l-1.72-1.729ZM12 12.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--home-color":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M14.249 23a.752.752 0 0 1-.75-.754v-6.034a.752.752 0 0 0-.75-.754h-1.5a.752.752 0 0 0-.75.754v6.034a.752.752 0 0 1-.75.754h-6a.752.752 0 0 1-.75-.754V9.5c0-.416.336-.754.75-.754s.75.338.75.754V21.492h4.5v-5.28a2.258 2.258 0 0 1 2.25-2.262h1.5a2.258 2.258 0 0 1 2.25 2.262v5.28h4.5V9.5c0-.416.336-.754.75-.754s.75.838.75 1.254v12.246a.752.752 0 0 1-.75.754h-6Z' fill='black'/%3e%3cpath d='M2.999 11.246V9.5c0-.416.336-.754.75-.754s.75.338.75.754v.238l6.97-7.008a.746.746 0 0 1 1.061 0l6.969 7.006V9.5c0-.416.336-.754.75-.754s.75.838.75 1.254v1.244l1.72 1.73a.742.742 0 0 0 1.06 0 .76.76 0 0 0 0-1.068l-2.78-2.795-5.202-5.231-2.206-2.218A2.232 2.232 0 0 0 12 1c-.602 0-1.167.235-1.591.662L.219 11.908a.76.76 0 0 0 0 1.066.744.744 0 0 0 1.06.001l1.72-1.729Z' fill='black'/%3e%3cpath d='M13.5 11a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z' fill='%2329D305'/%3e%3c/svg%3e",
     "e-icon--house_rebuilding-color":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M3.749 22h5.04s.711 0 .711-.754-.71-.754-.71-.754H4.499V8.738l-1.5 1.508v11c0 .416.336.754.75.754ZM19.499 20.492H16.5s-.75 0-.75.754.75.754.75.754h3.749c.414 0 .75-.338.75-.754V10.244l-1.5-1.508v11.756Z' fill='black'/%3e%3cpath d='M.219 11.974a.744.744 0 0 0 1.06.001l1.72-1.729 1.5-1.508 6.97-7.008a.746.746 0 0 1 1.061 0l6.969 7.006 1.5 1.508 1.72 1.73a.742.742 0 0 0 1.06 0 .76.76 0 0 0 0-1.068l-2.78-2.795-5.202-5.231L13.591.662A2.232 2.232 0 0 0 12 0c-.602 0-1.167.235-1.591.662L.219 10.907a.76.76 0 0 0 0 1.067Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M10.6 15.7c.1 0 .1.1.1.2v6.3c0 .9.6 1.6 1.6 1.8h.1c.9 0 1.7-.6 1.8-1.6v-6.6c0-.1.1-.2.1-.2h.1c.6.2.9.4 1.2.9.2.3.5.4.7.4.2 0 .5 0 .8-.2l.2-.2c.1-.1.2-.3.2-.5v-1.6c0-1.9-1.5-3.4-3.5-3.4h-3.8c-.1 0-.1 0-.1-.1-.1-.2-.2-.3-.3-.4-.1-.1-.4-.3-.8-.3H6.6c-.3 0-.6.3-.6.6v5c0 .3.3.6.6.6H9c.3 0 .6-.1.8-.3.1-.1.2-.2.2-.3 0-.1.1-.1.1-.1h.5Zm2.4 6.5c0 .2-.1.3-.2.4-.1.1-.2.1-.3.1-.2 0-.3-.1-.4-.2-.1-.1-.2-.2-.2-.3v-6.4c0-.1.1-.2.1-.2h.8c.2.1.2.1.2.2v6.4Zm-2.7-9.9c0-.1.1-.1.2-.1H14c1.4 0 2.3 1 2.3 2.3v.6c0 .1 0 .1-.1.1H16c-.4-.4-.8-.6-1.4-.7h-4.1c-.1 0-.2-.1-.2-.2v-2ZM8.9 15c0 .1-.1.2-.1.2H7.4c-.1 0-.2-.1-.2-.2v-3.5c0-.1.1-.1.2-.1h1.4c.1 0 .2.1.2.1V15h-.1Z' fill='%2329D305'/%3e%3c/svg%3e",
     "e-icon--image":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M1 21.75C1 22.991 1.987 24 3.2 24h17.6c1.213 0 2.2-1.009 2.2-2.25V5.133c0-.603-.242-1.19-.664-1.611L19.448.639A2.164 2.164 0 0 0 17.91 0H3.2C1.987 0 1 1.009 1 2.25v19.5Zm1.467-19.5c0-.414.328-.75.733-.75h14.712a.72.72 0 0 1 .511.213l2.888 2.883c.141.14.222.336.222.537V21.75c0 .414-.328.75-.733.75H3.2a.742.742 0 0 1-.733-.75V2.25Zm5.806 8.25c-1.654 0-3-1.346-3-3s1.346-3 3-3 3 1.346 3 3-1.346 3-3 3Zm0-4.5c-.827 0-1.5.673-1.5 1.5S7.446 9 8.273 9s1.5-.673 1.5-1.5S9.1 6 8.273 6Zm10.54 12.95a.75.75 0 0 1-.625-.334l-3.925-5.888a.264.264 0 0 0-.363-.074.262.262 0 0 0-.069.068l-2.692 3.846a.75.75 0 0 1-1.084.155l-1.668-1.338a.257.257 0 0 0-.161-.057l-.03.002a.255.255 0 0 0-.175.096l-2.125 3.19a.75.75 0 0 1-1.249-.831l2.111-3.171a1.746 1.746 0 0 1 1.471-.786c.401 0 .78.134 1.096.387l1.044.837 2.232-3.189a1.758 1.758 0 0 1 2.91.034l3.925 5.887a.748.748 0 0 1-.623 1.166Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--image_add-color":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M17.25 12a5.25 5.25 0 1 0 0 10.5 5.25 5.25 0 0 0 0-10.5Zm-6.75 5.25a6.75 6.75 0 1 1 13.5 0 6.75 6.75 0 0 1-13.5 0Z' fill='%2329D305'/%3e%3cpath d='M4.455 5.205a1.125 1.125 0 1 1 1.59 1.59 1.125 1.125 0 0 1-1.59-1.59Z' fill='%2329D305'/%3e%3cpath d='M18 14.25a.75.75 0 0 0-1.5 0v2.25h-2.25a.75.75 0 0 0 0 1.5h2.25v2.25a.75.75 0 0 0 1.5 0V18h2.25a.75.75 0 0 0 0-1.5H18v-2.25Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M2.25 1.5a.75.75 0 0 0-.75.75v16.5a.75.75 0 0 0 .75.75h6a.75.75 0 0 1 0 1.5h-6A2.25 2.25 0 0 1 0 18.75V2.25A2.25 2.25 0 0 1 2.25 0h10.629a2.25 2.25 0 0 1 1.59.658l2.872 2.873c.422.421.659.994.659 1.59V8.25a.75.75 0 0 1-1.5 0V5.121a.75.75 0 0 0-.22-.53L13.41 1.72a.75.75 0 0 0-.53-.219H2.25Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M9.94 7.332a1.499 1.499 0 0 1 1.946.521l1.03 1.65a.75.75 0 0 1-1.273.794l-1.017-1.63-2 2.85a.75.75 0 0 1-1.083.155l-1.227-.982L4.95 13.5H8.25a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.674-1.078L5.013 9.94a.751.751 0 0 1 .05-.088 1.5 1.5 0 0 1 2.186-.338l.608.487 1.54-2.195c.14-.2.327-.364.544-.475Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--information_circle":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M13.5 17.25A2.252 2.252 0 0 1 11.25 15v-3.75h-.75a.75.75 0 0 1 0-1.5h.75c.827 0 1.5.673 1.5 1.5V15c0 .414.336.75.75.75h.75a.75.75 0 0 1 0 1.5h-.75ZM11.625 8.25a1.125 1.125 0 1 0 0-2.25 1.125 1.125 0 0 0 0 2.25Z' fill='black'/%3e%3cpath d='M12 24C5.383 24 0 18.617 0 12S5.383 0 12 0s12 5.383 12 12-5.383 12-12 12Zm0-22.5C6.21 1.5 1.5 6.21 1.5 12S6.21 22.5 12 22.5 22.5 17.79 22.5 12 17.79 1.5 12 1.5Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--information_circle-color":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M11.625 8.25a1.125 1.125 0 1 0 0-2.25 1.125 1.125 0 0 0 0 2.25Z' fill='%2329D305'/%3e%3cpath d='M13.5 17.25A2.252 2.252 0 0 1 11.25 15v-3.75h-.75a.75.75 0 0 1 0-1.5h.75c.827 0 1.5.673 1.5 1.5V15c0 .414.336.75.75.75h.75a.75.75 0 0 1 0 1.5h-.75Z' fill='black'/%3e%3cpath d='M12 24C5.383 24 0 18.617 0 12S5.383 0 12 0s12 5.383 12 12-5.383 12-12 12Zm0-22.5C6.21 1.5 1.5 6.21 1.5 12S6.21 22.5 12 22.5 22.5 17.79 22.5 12 17.79 1.5 12 1.5Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--information_circle-filled-color":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12 24C5.383 24 0 18.617 0 12S5.383 0 12 0s12 5.383 12 12-5.383 12-12 12Z' fill='%2329D305'/%3e%3cpath d='M13.5 17.25A2.252 2.252 0 0 1 11.25 15v-3.75h-.75a.75.75 0 0 1 0-1.5h.75c.827 0 1.5.673 1.5 1.5V15c0 .414.336.75.75.75h.75a.75.75 0 0 1 0 1.5h-.75ZM11.625 8.25a1.125 1.125 0 1 0 0-2.25 1.125 1.125 0 0 0 0 2.25Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--installatorweb-color":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M9 4.02a.77.77 0 0 0-.77-.77H4.5c-1.241 0-2.25 1.035-2.25 2.308v9.83L.194 20.005a2.336 2.336 0 0 0-.194.937c0 1.273 1.009 2.308 2.25 2.308v.001h19.5c.317 0 .624-.068.914-.199 1.134-.517 1.646-1.883 1.143-3.046L21.75 15.39V5.558c0-1.273-1.01-2.308-2.25-2.308h-3.73a.77.77 0 0 0 0 1.538h3.73a.76.76 0 0 1 .75.77v9.23H3.75v-9.23a.76.76 0 0 1 .75-.77h3.73A.77.77 0 0 0 9 4.02ZM1.561 20.636a.774.774 0 0 0-.061.305c0 .424.337.77.75.77h19.5a.73.73 0 0 0 .305-.067.778.778 0 0 0 .38-1.014l-1.917-4.305H3.482l-1.921 4.31Z' fill='black'/%3e%3cpath d='M10.5 20.168a.76.76 0 0 1-.75-.769.76.76 0 0 1 .75-.769h3a.76.76 0 0 1 .75.77.76.76 0 0 1-.75.768h-3Z' fill='%2329D305'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M12 3.5c.414 0 .75.32.75.716v3.818c0 .395-.336.716-.75.716s-.75-.32-.75-.716V4.216c0-.395.336-.716.75-.716Z' fill='black'/%3e%3cpath d='M13 1.75a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--invoice":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M1 21.75C1 22.991 1.987 24 3.2 24h17.6c1.213 0 2.2-1.009 2.2-2.25V5.133c0-.603-.242-1.19-.664-1.611L19.448.639A2.164 2.164 0 0 0 17.91 0H3.2C1.987 0 1 1.009 1 2.25v19.5Zm1.467-19.5c0-.414.328-.75.733-.75h14.712a.72.72 0 0 1 .511.213l2.888 2.883c.141.14.222.336.222.537V21.75c0 .414-.328.75-.733.75H3.2a.742.742 0 0 1-.733-.75V2.25Zm3.573 6c0 .413.299.748.667.748h10.666c.367 0 .667-.335.667-.749 0-.413-.299-.749-.667-.749H6.707c-.368 0-.667.336-.667.75Zm.667 5.248c-.368 0-.667-.335-.667-.749 0-.413.299-.749.667-.749h10.666c.368 0 .667.336.667.75 0 .413-.299.748-.667.748H6.707ZM6.04 17.25c0 .414.299.75.667.75h5.333c.367 0 .667-.336.667-.75 0-.413-.3-.749-.667-.749H6.707c-.368 0-.667.336-.667.75Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--invoice-color":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M6.707 8.998c-.368 0-.667-.335-.667-.749 0-.413.299-.75.667-.75h10.666c.368 0 .667.337.667.75 0 .414-.3.75-.667.75H6.707Z' fill='black'/%3e%3cpath d='M3.2 24C1.987 24 1 22.991 1 21.75V2.25C1 1.009 1.987 0 3.2 0h14.71c.58 0 1.124.227 1.538.639l2.888 2.883c.422.421.664 1.008.664 1.611V21.75c0 1.241-.987 2.25-2.2 2.25H3.2Zm0-22.5a.742.742 0 0 0-.733.75v19.5c0 .414.328.75.733.75h17.6a.742.742 0 0 0 .733-.75V5.133a.762.762 0 0 0-.222-.537l-2.888-2.883a.72.72 0 0 0-.511-.213H3.2Z' fill='black'/%3e%3cpath d='M6.707 13.498c-.368 0-.667-.335-.667-.749 0-.413.299-.75.667-.75h10.666c.368 0 .667.337.667.75 0 .414-.299.75-.667.75H6.707Z' fill='black'/%3e%3cpath d='M6.707 17.998c-.368 0-.667-.335-.667-.749 0-.413.299-.749.667-.749h5.333c.367 0 .667.336.667.75 0 .413-.3.748-.667.748H6.707Z' fill='%2329D305'/%3e%3c/svg%3e",
     "e-icon--it_systems-color":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M18 3C18-1 6-1 6 3v3c0 2 3 3 6 3s6-1 6-3V3Zm-6-1.5c2.8 0 4.5 1 4.5 1.5S14.8 4.5 12 4.5 7.5 3.5 7.5 3 9.2 1.5 12 1.5Zm0 6c-2.8 0-4.5-1-4.5-1.5V5c1.2.6 2.8 1 4.5 1 1.7 0 3.3-.3 4.5-1v1c0 .5-1.7 1.5-4.5 1.5Z' fill='%2329D305'/%3e%3cpath d='M8.2 13.5h-6c-1.2 0-2.2 1-2.2 2.2v3C0 20 1 21 2.2 21h2.2v1.5H3c-.4 0-.8.3-.8.8s.4.7.8.7h4.5c.4 0 .8-.3.8-.8s-.3-.8-.8-.8H6V21h2.2c1.2 0 2.2-1 2.2-2.2v-3c.1-1.3-.9-2.3-2.2-2.3Zm.8 5.3c0 .4-.3.8-.8.8h-6c-.4 0-.8-.3-.8-.8v-3c0-.4.3-.8.8-.8h6c.5 0 .8.3.8.8v3ZM21.8 13.5h-6c-1.2 0-2.2 1-2.2 2.2v3c0 1.2 1 2.2 2.2 2.2H18v1.5h-1.5c-.4 0-.8.3-.8.8s.3.8.8.8H21c.4 0 .8-.3.8-.8s-.3-.8-.8-.8h-1.5V21h2.2c1.2 0 2.2-1 2.2-2.2v-3c.1-1.3-.9-2.3-2.1-2.3Zm.7 5.3c0 .4-.3.8-.8.8h-6c-.4 0-.8-.3-.8-.8v-3c0-.4.3-.8.8-.8h6c.4 0 .8.3.8.8v3ZM2.3 12c-.4 0-.8-.3-.8-.8V7.8c0-1.2 1-2.2 2.2-2.2.4 0 .8.3.8.8s-.3.6-.7.6c-.5 0-.8.3-.8.8v3.5c0 .4-.3.7-.7.7ZM21.8 12c-.4 0-.8-.3-.8-.8V7.8c0-.5-.3-.8-.7-.8-.4 0-.8-.3-.8-.8s.3-.8.8-.8c1.2 0 2.2 1 2.2 2.2v3.5c0 .6-.3.9-.7.9Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--laptop-color":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M2.25 21.999c-1.241 0-2.25-1.035-2.25-2.308 0-.325.065-.64.194-.937l2.056-4.615V4.308C2.25 3.035 3.259 2 4.5 2h15c1.24 0 2.25 1.035 2.25 2.308v9.832l2.057 4.615c.503 1.163-.01 2.53-1.143 3.046-.29.131-.597.199-.914.199H2.25v-.001Zm-.689-2.612a.774.774 0 0 0-.061.305c0 .424.337.77.75.77h19.5a.73.73 0 0 0 .305-.067.778.778 0 0 0 .38-1.014l-1.917-4.305H3.482l-1.921 4.31Zm18.689-5.85v-9.23a.76.76 0 0 0-.75-.769h-15a.76.76 0 0 0-.75.77v9.23h16.5Z' fill='black'/%3e%3cpath d='M10.5 18.922a.76.76 0 0 1-.75-.769.76.76 0 0 1 .75-.77h3a.76.76 0 0 1 .75.77.76.76 0 0 1-.75.77h-3Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--layers":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M11.545 1.81 1.803 6.358a.103.103 0 0 0 0 .177l9.74 4.512a1.164 1.164 0 0 0 .912 0L22.197 6.5a.103.103 0 0 0 0-.177l-9.74-4.512a1.165 1.165 0 0 0-.912 0ZM10.853.243a2.88 2.88 0 0 1 2.313.009l9.771 4.526a1.818 1.818 0 0 1 .002 3.269l-9.77 4.56c-.008.002-.015.006-.022.009a2.88 2.88 0 0 1-2.294 0l-.019-.009-9.771-4.525a1.817 1.817 0 0 1-.002-3.269l9.77-4.56a.836.836 0 0 1 .022-.01Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M23.921 12.241c.198.43.01.94-.42 1.138l-10.457 4.817-.003.001a2.571 2.571 0 0 1-2.134 0l-.004-.002L.497 13.378a.857.857 0 1 1 .72-1.556l10.402 4.815.001.001a.857.857 0 0 0 .709 0h.001l10.454-4.817a.857.857 0 0 1 1.137.42Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M23.921 17.813c.198.43.01.939-.42 1.137l-10.457 4.817-.003.001a2.571 2.571 0 0 1-2.134 0l-.004-.002L.497 18.95a.857.857 0 0 1 .72-1.555l10.402 4.815h.001a.857.857 0 0 0 .709 0h.001l10.454-4.816a.857.857 0 0 1 1.137.42Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--laws":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='25' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M14.41 13.44c0-.39.12-.75.35-1.08.23-.33.57-.6 1.03-.8.46-.2.99-.3 1.61-.3.46 0 .89.06 1.28.17.39.11.72.27 1 .46s.48.4.63.63c.15.23.22.45.22.68 0 .18-.08.33-.25.47-.17.14-.35.21-.56.21-.21 0-.35-.05-.46-.14-.11-.09-.26-.25-.45-.46-.19-.21-.38-.39-.58-.5-.2-.11-.45-.17-.76-.17-.36 0-.65.08-.86.25-.21.17-.32.35-.32.57 0 .22.09.42.27.58.18.16.49.35.93.57.44.22.72.37.86.46.41.23.78.43 1.11.61.33.18.62.37.89.58.27.21.48.45.63.73.15.28.23.6.23.97 0 .42-.12.79-.36 1.13-.24.34-.59.63-1.04.87.63.5.95 1.08.95 1.75 0 .32-.07.62-.21.9-.14.28-.35.53-.63.75-.28.22-.61.38-.99.5s-.8.18-1.25.18c-.55 0-1.03-.07-1.45-.21-.42-.14-.78-.33-1.08-.57-.3-.24-.53-.5-.67-.77s-.21-.52-.21-.76c0-.22.08-.42.25-.59a.86.86 0 0 1 .93-.2c.1.04.17.08.22.14.23.28.4.52.51.73.27.59.75.88 1.44.88.38 0 .69-.1.92-.29.23-.19.35-.42.35-.67 0-.18-.07-.34-.2-.49-.13-.15-.32-.31-.57-.47-.25-.16-.62-.39-1.13-.68-.51-.29-1.02-.6-1.54-.91-.2-.12-.4-.26-.61-.39-.21-.13-.4-.29-.56-.45-.16-.16-.28-.35-.38-.57-.1-.22-.14-.47-.14-.76 0-.8.49-1.45 1.48-1.94-.56-.45-.84-.98-.84-1.58l.01-.02Zm1.79 2.32c-.55.33-.82.67-.82 1.02 0 .18.07.35.21.5.14.15.32.3.56.45.24.15.6.35 1.09.63.15.08.34.19.6.33.26.14.5.28.75.4.56-.38.84-.71.84-1.01a.71.71 0 0 0-.15-.44c-.1-.13-.23-.26-.4-.39s-.38-.26-.63-.4-.57-.32-.97-.53l-.72-.39c-.16-.09-.28-.15-.35-.18l-.01.01ZM17.04 7.5H6.54c-.41 0-.75-.34-.75-.75S6.13 6 6.54 6h10.5c.41 0 .75.34.75.75s-.34.75-.75.75ZM10.29 12H6.54c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h3.75c.41 0 .75.34.75.75s-.34.75-.75.75ZM10.29 16.5H6.54c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h3.75c.41 0 .75.34.75.75s-.34.75-.75.75Z' fill='black'/%3e%3cpath d='M10.29 21H5.04c-1.24 0-2.25-1.01-2.25-2.25V2.25C2.79 1.01 3.8 0 5.04 0h10.63c.59 0 1.17.24 1.59.66l2.87 2.87c.42.42.66.99.66 1.59V7.5c0 .41-.34.75-.75.75s-.75-.34-.75-.75V5.12c0-.2-.08-.39-.22-.53L16.2 1.72a.75.75 0 0 0-.53-.22H5.04c-.41 0-.75.34-.75.75v16.5c0 .41.34.75.75.75h5.25c.41 0 .75.34.75.75s-.34.75-.75.75Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--laws-color":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='25' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M14.41 13.44c0-.39.12-.75.35-1.08.23-.33.57-.6 1.03-.8.46-.2.99-.3 1.61-.3.46 0 .89.06 1.28.17.39.11.72.27 1 .46s.48.4.63.63c.15.23.22.45.22.68 0 .18-.08.33-.25.47-.17.14-.35.21-.56.21-.21 0-.35-.05-.46-.14-.11-.09-.26-.25-.45-.46-.19-.21-.38-.39-.58-.5-.2-.11-.45-.17-.76-.17-.36 0-.65.08-.86.25-.21.17-.32.35-.32.57 0 .22.09.42.27.58.18.16.49.35.93.57.44.22.72.37.86.46.41.23.78.43 1.11.61.33.18.62.37.89.58.27.21.48.45.63.73.15.28.23.6.23.97 0 .42-.12.79-.36 1.13-.24.34-.59.63-1.04.87.63.5.95 1.08.95 1.75 0 .32-.07.62-.21.9-.14.28-.35.53-.63.75-.28.22-.61.38-.99.5s-.8.18-1.25.18c-.55 0-1.03-.07-1.45-.21-.42-.14-.78-.33-1.08-.57-.3-.24-.53-.5-.67-.77s-.21-.52-.21-.76c0-.22.08-.42.25-.59a.86.86 0 0 1 .93-.2c.1.04.17.08.22.14.23.28.4.52.51.73.27.59.75.88 1.44.88.38 0 .69-.1.92-.29.23-.19.35-.42.35-.67 0-.18-.07-.34-.2-.49-.13-.15-.32-.31-.57-.47-.25-.16-.62-.39-1.13-.68-.51-.29-1.02-.6-1.54-.91-.2-.12-.4-.26-.61-.39-.21-.13-.4-.29-.56-.45-.16-.16-.28-.35-.38-.57-.1-.22-.14-.47-.14-.76 0-.8.49-1.45 1.48-1.94-.56-.45-.84-.98-.84-1.58l.01-.02Zm1.79 2.32c-.55.33-.82.67-.82 1.02 0 .18.07.35.21.5.14.15.32.3.56.45.24.15.6.35 1.09.63.15.08.34.19.6.33.26.14.5.28.75.4.56-.38.84-.71.84-1.01a.71.71 0 0 0-.15-.44c-.1-.13-.23-.26-.4-.39s-.38-.26-.63-.4-.57-.32-.97-.53l-.72-.39c-.16-.09-.28-.15-.35-.18l-.01.01Z' fill='%2329D305'/%3e%3cpath d='M17.04 7.5H6.54c-.41 0-.75-.34-.75-.75S6.13 6 6.54 6h10.5c.41 0 .75.34.75.75s-.34.75-.75.75ZM10.29 12H6.54c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h3.75c.41 0 .75.34.75.75s-.34.75-.75.75ZM10.29 16.5H6.54c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h3.75c.41 0 .75.34.75.75s-.34.75-.75.75Z' fill='black'/%3e%3cpath d='M10.29 21H5.04c-1.24 0-2.25-1.01-2.25-2.25V2.25C2.79 1.01 3.8 0 5.04 0h10.63c.59 0 1.17.24 1.59.66l2.87 2.87c.42.42.66.99.66 1.59V7.5c0 .41-.34.75-.75.75s-.75-.34-.75-.75V5.12c0-.2-.08-.39-.22-.53L16.2 1.72a.75.75 0 0 0-.53-.22H5.04c-.41 0-.75.34-.75.75v16.5c0 .41.34.75.75.75h5.25c.41 0 .75.34.75.75s-.34.75-.75.75Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--lighting":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M11.132 3.092a3.75 3.75 0 0 1 1.487-.037 3.87 3.87 0 0 1 3.101 3.862v.652a8.99 8.99 0 0 1 5.266 7.317c.003.025.004.05.004.074v.07a1.49 1.49 0 0 1-1.504 1.47H4.49c-.016 0-.033 0-.049-.002a1.49 1.49 0 0 1-1.39-1.59l.002-.02A8.99 8.99 0 0 1 8.26 7.573v-.79a3.491 3.491 0 0 1 .01-.657 3.75 3.75 0 0 1 2.862-3.034Zm1.2 1.436a2.25 2.25 0 0 0-2.578 1.818 1.99 1.99 0 0 0 .003.336.752.752 0 0 1 .003.068v1.32a.75.75 0 0 1-.478.699A7.49 7.49 0 0 0 4.55 15h14.94v-.002a7.49 7.49 0 0 0-4.787-6.227.75.75 0 0 1-.483-.701V6.895a2.37 2.37 0 0 0-1.887-2.367Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M11.96 0a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-1.5 0v-3a.75.75 0 0 1 .75-.75ZM14.97 15a.75.75 0 0 1 .75.75 3.75 3.75 0 0 1-7.5 0h1.5a2.25 2.25 0 0 0 4.5 0 .75.75 0 0 1 .75-.75ZM11.96 21a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5a.75.75 0 0 1 .75-.75ZM16.794 19.626a.75.75 0 0 1 1.04.208l1.5 2.25a.75.75 0 1 1-1.248.832l-1.5-2.25a.75.75 0 0 1 .208-1.04ZM7.126 19.626a.75.75 0 0 1 .208 1.04l-1.5 2.25a.75.75 0 1 1-1.248-.832l1.5-2.25a.75.75 0 0 1 1.04-.208Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--list":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M2.25 1.5a.75.75 0 0 0-.75.75v1.5c0 .414.336.75.75.75h19.5a.75.75 0 0 0 .75-.75v-1.5a.75.75 0 0 0-.75-.75H2.25ZM0 2.25A2.25 2.25 0 0 1 2.25 0h19.5A2.25 2.25 0 0 1 24 2.25v1.5A2.25 2.25 0 0 1 21.75 6H2.25A2.25 2.25 0 0 1 0 3.75v-1.5ZM2.25 10.5a.75.75 0 0 0-.75.75v1.5c0 .415.336.75.75.75h19.5a.75.75 0 0 0 .75-.75v-1.5a.75.75 0 0 0-.75-.75H2.25ZM0 11.25A2.25 2.25 0 0 1 2.25 9h19.5A2.25 2.25 0 0 1 24 11.25v1.5A2.25 2.25 0 0 1 21.75 15H2.25A2.25 2.25 0 0 1 0 12.75v-1.5ZM2.25 19.5a.75.75 0 0 0-.75.75v1.5c0 .414.336.75.75.75h19.5a.75.75 0 0 0 .75-.75v-1.5a.75.75 0 0 0-.75-.75H2.25ZM0 20.25A2.25 2.25 0 0 1 2.25 18h19.5A2.25 2.25 0 0 1 24 20.25v1.5A2.25 2.25 0 0 1 21.75 24H2.25A2.25 2.25 0 0 1 0 21.75v-1.5Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--list_color":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cg clip-path='url(%23a)' fill-rule='evenodd' clip-rule='evenodd'%3e%3cpath d='M2.25 1.495a.75.75 0 0 0-.75.75v1.5c0 .415.336.75.75.75h19.5a.75.75 0 0 0 .75-.75v-1.5a.75.75 0 0 0-.75-.75H2.25ZM0 2.245a2.25 2.25 0 0 1 2.25-2.25h19.5A2.25 2.25 0 0 1 24 2.245v1.5a2.25 2.25 0 0 1-2.25 2.25H2.25A2.25 2.25 0 0 1 0 3.745v-1.5Z' fill='%2329D305'/%3e%3cpath d='M2.25 10.497a.75.75 0 0 0-.75.75v1.5c0 .414.336.75.75.75h19.5a.75.75 0 0 0 .75-.75v-1.5a.75.75 0 0 0-.75-.75H2.25Zm-2.25.75a2.25 2.25 0 0 1 2.25-2.25h19.5a2.25 2.25 0 0 1 2.25 2.25v1.5a2.25 2.25 0 0 1-2.25 2.25H2.25A2.25 2.25 0 0 1 0 12.747v-1.5ZM2.25 19.497a.75.75 0 0 0-.75.75v1.5c0 .414.336.75.75.75h19.5a.75.75 0 0 0 .75-.75v-1.5a.75.75 0 0 0-.75-.75H2.25Zm-2.25.75a2.25 2.25 0 0 1 2.25-2.25h19.5a2.25 2.25 0 0 1 2.25 2.25v1.5a2.25 2.25 0 0 1-2.25 2.25H2.25A2.25 2.25 0 0 1 0 21.747v-1.5Z' fill='black'/%3e%3c/g%3e%3cdefs%3e%3cclipPath id='a'%3e%3cpath fill='white' d='M0 0h24v24H0z'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e",
     "e-icon--list_bullets-bold":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M2.034 5.068a2.034 2.034 0 1 0 0-4.068 2.034 2.034 0 0 0 0 4.068ZM4.068 12.187a2.034 2.034 0 1 1-4.068 0 2.034 2.034 0 0 1 4.068 0ZM4.068 21.339a2.034 2.034 0 1 1-4.068 0 2.034 2.034 0 0 1 4.068 0ZM7.627 1.915a1.119 1.119 0 0 0 0 2.238h15.254a1.119 1.119 0 0 0 0-2.238H7.627ZM6.508 12.186c0-.617.501-1.118 1.12-1.118H22.88a1.119 1.119 0 1 1 0 2.237H7.627c-.618 0-1.119-.5-1.119-1.119ZM7.627 20.22a1.119 1.119 0 0 0 0 2.238h15.254a1.119 1.119 0 1 0 0-2.238H7.627Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--loading":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M4 15.998a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM14 14.998a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM24 11.998a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--lock":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.25 24A2.252 2.252 0 0 1 3 21.75v-10.5A2.252 2.252 0 0 1 5.25 9H6V6c0-3.308 2.692-6 6-6s6 2.692 6 6v3h.75A2.252 2.252 0 0 1 21 11.25v10.5A2.252 2.252 0 0 1 18.75 24H5.25Zm0-13.5a.75.75 0 0 0-.75.75v10.5c0 .414.336.75.75.75h13.5a.75.75 0 0 0 .75-.75v-10.5a.75.75 0 0 0-.75-.75H5.25ZM16.5 9V6c0-2.481-2.019-4.5-4.5-4.5A4.505 4.505 0 0 0 7.5 6v3h9Z' fill='black'/%3e%3cpath d='M12 18.75a.75.75 0 0 1-.75-.75v-3a.75.75 0 0 1 1.5 0v3a.75.75 0 0 1-.75.75Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--lock_hierarchy":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M21 24c-1.654 0-3-1.346-3-3 0-1.37.947-2.564 2.25-2.902V16.5h-7.5v1.598A3.016 3.016 0 0 1 15 21c0 1.654-1.346 3-3 3s-3-1.346-3-3c0-1.37.947-2.564 2.25-2.902V16.5h-7.5v1.598A3.016 3.016 0 0 1 6 21c0 1.654-1.346 3-3 3s-3-1.346-3-3c0-1.37.947-2.564 2.25-2.902V15.75A.75.75 0 0 1 3 15h8.25v-1.5H9a2.252 2.252 0 0 1-2.25-2.25V7.5c0-.96.615-1.808 1.5-2.121V3.75A3.754 3.754 0 0 1 12 0a3.754 3.754 0 0 1 3.75 3.75v1.629a2.26 2.26 0 0 1 1.5 2.121v3.75A2.252 2.252 0 0 1 15 13.5h-2.25V15H21a.75.75 0 0 1 .75.75v2.348A3.016 3.016 0 0 1 24 21c0 1.654-1.346 3-3 3Zm0-4.5c-.827 0-1.5.673-1.5 1.5s.673 1.5 1.5 1.5 1.5-.673 1.5-1.5-.673-1.5-1.5-1.5Zm-9 0c-.827 0-1.5.673-1.5 1.5s.673 1.5 1.5 1.5 1.5-.673 1.5-1.5-.673-1.5-1.5-1.5Zm-9 0c-.827 0-1.5.673-1.5 1.5s.673 1.5 1.5 1.5 1.5-.673 1.5-1.5-.673-1.5-1.5-1.5ZM9 6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75h6a.75.75 0 0 0 .75-.75V7.5a.75.75 0 0 0-.75-.75H9Zm5.25-1.5v-1.5A2.252 2.252 0 0 0 12 1.5a2.252 2.252 0 0 0-2.25 2.25v1.5h4.5Z' fill='black'/%3e%3crect x='11.3' y='8' width='1.5' height='2.5' rx='.75' fill='black'/%3e%3c/svg%3e",
     "e-icon--logout":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M13.28 7.724a.75.75 0 1 0-1.06 1.06l2.47 2.47H.75a.75.75 0 0 0 0 1.5h13.94l-2.47 2.47a.75.75 0 0 0 1.06 1.06l3.75-3.75a.748.748 0 0 0 0-1.06l-3.75-3.75Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M8.233 1.7a11.25 11.25 0 1 1-5.601 15.228.75.75 0 0 1 1.348-.656 9.75 9.75 0 1 0 .167-8.86.75.75 0 0 1-1.324-.707 11.25 11.25 0 0 1 5.41-5.006Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--mail":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M2.4 20.748c-1.324 0-2.4-1.07-2.4-2.386V5.635a2.346 2.346 0 0 1 .531-1.497l.025-.029A2.393 2.393 0 0 1 2.4 3.25h19.2a2.4 2.4 0 0 1 1.874.895l.02.028c.331.423.506.928.506 1.463v12.727a2.396 2.396 0 0 1-2.4 2.386H2.4Zm-.8-2.386c0 .439.358.795.8.795h19.2c.442 0 .8-.356.8-.795V5.966L14.639 11.9a4.365 4.365 0 0 1-2.639.892c-.95 0-1.888-.317-2.639-.892L1.6 5.966v12.396Zm8.736-7.722a2.747 2.747 0 0 0 3.327 0l7.585-5.802H2.751l7.585 5.802Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--mail_error-color":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M13.023 24a2.528 2.528 0 0 1-2.258-3.654l4.226-8.451a2.513 2.513 0 0 1 2.262-1.396c.393 0 .771.089 1.124.266.486.243.887.644 1.13 1.13l4.226 8.451A2.526 2.526 0 0 1 21.475 24h-8.452Zm4.229-12c-.392 0-.744.217-.918.567l-4.226 8.451a1.025 1.025 0 0 0 .915 1.483h8.452a1.026 1.026 0 0 0 .917-1.483l-4.226-8.451a1.037 1.037 0 0 0-.458-.459 1.013 1.013 0 0 0-.456-.108Z' fill='%2329D305'/%3e%3cpath d='M17.249 21.75c-.62 0-1.125-.505-1.125-1.125s.505-1.125 1.125-1.125l.071.005a1.117 1.117 0 0 1 1.054 1.12c0 .62-.505 1.125-1.125 1.125ZM17.249 18.75a.75.75 0 0 1-.75-.75v-3a.75.75 0 0 1 1.5 0v3a.75.75 0 0 1-.75.75ZM2.249 16.5a2.252 2.252 0 0 1-2.25-2.25v-12c0-.504.164-.981.476-1.38L.493.844A2.242 2.242 0 0 1 2.249 0h18a2.242 2.242 0 0 1 1.777.875c.309.398.472.873.472 1.375v8.25a.75.75 0 0 1-1.5 0V2.562l-7.276 5.596a4.077 4.077 0 0 1-2.474.841 4.07 4.07 0 0 1-2.473-.841L1.499 2.562V14.25c0 .414.336.75.75.75h7.5a.75.75 0 0 1 0 1.5h-7.5ZM9.69 6.969c.45.347.99.53 1.56.53.562 0 1.116-.188 1.56-.53L19.92 1.5H2.578L9.69 6.969Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--mail_monitor-color":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M6.75 23.25a.75.75 0 0 1 0-1.5h1.615l.5-3H3.75A3.754 3.754 0 0 1 0 15V4.5A3.754 3.754 0 0 1 3.75.75h16.5A3.754 3.754 0 0 1 24 4.5V15a3.754 3.754 0 0 1-3.75 3.75h-5.115l.5 3h1.615a.75.75 0 0 1 0 1.5H6.75Zm7.365-1.5-.5-3h-3.229l-.5 3h4.229ZM3.75 2.25A2.252 2.252 0 0 0 1.5 4.5V15a2.252 2.252 0 0 0 2.25 2.25h16.5A2.252 2.252 0 0 0 22.5 15V4.5a2.252 2.252 0 0 0-2.25-2.25H3.75Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M6.857 6.5a.107.107 0 0 0-.107.107V12.8c0 .06.048.107.107.107h10.286c.059 0 .107-.048.107-.107V6.607a.107.107 0 0 0-.107-.107H6.857Zm-1.607.107C5.25 5.72 5.97 5 6.857 5h10.286c.887 0 1.607.72 1.607 1.607V12.8c0 .888-.72 1.607-1.607 1.607H6.857c-.887 0-1.607-.72-1.607-1.607V6.607Z' fill='%2329D305'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M18.4 6.071a.75.75 0 0 1-.136 1.052l-4.654 3.58a2.64 2.64 0 0 1-3.22 0l-4.654-3.58a.75.75 0 1 1 .915-1.189l4.654 3.58a1.14 1.14 0 0 0 1.39 0l4.654-3.58a.75.75 0 0 1 1.052.137Z' fill='%2329D305'/%3e%3c/svg%3e",
     "e-icon--mail_send-color":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M2.25 17.63A2.252 2.252 0 0 1 0 15.38v-12a2.252 2.252 0 0 1 2.25-2.25h18a2.252 2.252 0 0 1 2.25 2.25v9a.75.75 0 0 1-1.5 0V3.633l-7.25 5.543c-.692.62-1.579.96-2.5.96a3.746 3.746 0 0 1-2.5-.96L1.5 3.635V15.38c0 .414.336.75.75.75h6a.75.75 0 0 1 0 1.5h-6Zm7.435-9.627.049.041a2.25 2.25 0 0 0 1.516.591 2.25 2.25 0 0 0 1.516-.591.677.677 0 0 1 .048-.04l7.03-5.374H2.655l7.03 5.373Z' fill='black'/%3e%3cpath d='M17.25 22.88a.747.747 0 0 1-.75-.75v-1.5h-3.75a2.252 2.252 0 0 1-2.25-2.25v-1.5a2.252 2.252 0 0 1 2.25-2.25h3.75v-1.5a.746.746 0 0 1 .75-.75c.161 0 .321.053.45.15l6.001 4.5a.753.753 0 0 1 0 1.2l-6 4.5a.759.759 0 0 1-.451.15Zm-4.5-6.75a.75.75 0 0 0-.75.75v1.5c0 .414.336.75.75.75h4.5a.75.75 0 0 1 .75.75v.75l4-3-4-3v.75a.75.75 0 0 1-.75.75h-4.5Z' fill='%2329D305'/%3e%3c/svg%3e",
     "e-icon--map_pin-color":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='25' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='m22.57 2.565-6-2.4a2.2 2.2 0 0 0-1.67 0L8.24 2.8c.27-.075-.09.014 0 0 0 0 .09.01 0-.005L2.05.355A1.49 1.49 0 0 0 0 1.755v14.37a2.25 2.25 0 0 0 1.41 2.09l6 2.4a2.26 2.26 0 0 0 1.67 0l2.87-1.17a.754.754 0 1 0-.56-1.4l-2.4 1V4.169l.08-.034 5.92-2.39v6.51a.75.75 0 1 0 1.5 0v-6.51l5.52 2.21a.76.76 0 0 1 .48.7v4.35a.75.75 0 1 0 1.5 0v-4.35a2.24 2.24 0 0 0-1.42-2.09ZM1.96 16.825a.75.75 0 0 1-.47-.7V1.745l6 2.39v14.88l-5.53-2.19Z' fill='black'/%3e%3cpath d='M18.76 24a1.5 1.5 0 0 1-1.19-.56c-1.85-2.37-4.06-5.61-4.06-7.6a5.251 5.251 0 0 1 10.5 0c0 2-2.22 5.23-4.07 7.6a1.49 1.49 0 0 1-1.18.56Zm0-11.93a3.76 3.76 0 0 0-3.75 3.75c0 1.16 1.43 3.72 3.75 6.68 2.31-3 3.75-5.52 3.75-6.68a3.76 3.76 0 0 0-3.75-3.75Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M18.8 13.3a2.2 2.2 0 1 0 0 4.4 2.2 2.2 0 0 0 0-4.4Zm-.943 2.2a.943.943 0 1 1 1.886 0 .943.943 0 0 1-1.886 0Z' fill='%2329D305'/%3e%3c/svg%3e",
     "e-icon--media":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M.75 8.25A.75.75 0 0 1 1.5 9v12.75a.75.75 0 0 0 .75.75h19.5a.75.75 0 0 0 .75-.75V9A.75.75 0 0 1 24 9v12.75A2.25 2.25 0 0 1 21.75 24H2.25A2.25 2.25 0 0 1 0 21.75V9a.75.75 0 0 1 .75-.75ZM2.25 1.5a.75.75 0 0 0-.75.75v3h21v-3a.75.75 0 0 0-.75-.75H2.25ZM.659.66A2.25 2.25 0 0 1 2.25 0h19.5A2.25 2.25 0 0 1 24 2.25V6a.75.75 0 0 1-.75.75H.75A.75.75 0 0 1 0 6V2.25C0 1.653.237 1.081.659.66Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M9.206.03a.75.75 0 0 1 .515.926l-1.5 5.25a.75.75 0 1 1-1.442-.412l1.5-5.25A.75.75 0 0 1 9.206.03ZM16.706.03a.75.75 0 0 1 .515.926l-1.5 5.25a.75.75 0 0 1-1.442-.412l1.5-5.25a.75.75 0 0 1 .927-.515ZM9.153 12.011a.105.105 0 0 0-.103.005.106.106 0 0 0-.05.09m.153-.095Zm-.12-1.51c.273-.012.545.046.79.168l5.789 2.895a1.607 1.607 0 0 1 0 2.872l-5.789 2.895a1.61 1.61 0 0 1-2.12-.655 1.606 1.606 0 0 1-.203-.782v-5.788a1.606 1.606 0 0 1 1.533-1.604Zm.12 1.51 5.788 2.895-5.788-2.895ZM9 12.106v5.788a.106.106 0 0 0 .153.095l5.788-2.895a.106.106 0 0 0 0-.188' fill='black'/%3e%3c/svg%3e",
     "e-icon--menu":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M.75 4.253a.75.75 0 0 0 0 1.5h22.5a.75.75 0 0 0 0-1.5H.75ZM0 12.003a.75.75 0 0 1 .75-.75h22.5a.75.75 0 1 1 0 1.5H.75a.75.75 0 0 1-.75-.75ZM0 19.003a.75.75 0 0 1 .75-.75h22.5a.75.75 0 1 1 0 1.5H.75a.75.75 0 0 1-.75-.75Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--menu-bold":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M1.217 3.78a1.217 1.217 0 1 0 0 2.433h21.566a1.217 1.217 0 0 0 0-2.433H1.217ZM0 11.997c0-.672.545-1.217 1.217-1.217h21.566a1.217 1.217 0 0 1 0 2.433H1.217A1.217 1.217 0 0 1 0 11.997ZM0 18.997c0-.672.545-1.217 1.217-1.217h21.566a1.217 1.217 0 0 1 0 2.433H1.217A1.217 1.217 0 0 1 0 18.997Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--minus":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M0 12.3A1.3 1.3 0 0 1 1.3 11h21.4a1.3 1.3 0 1 1 0 2.6H1.3A1.3 1.3 0 0 1 0 12.3Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--minus-bold":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M0 12.3A1.3 1.3 0 0 1 1.3 11h21.4a1.3 1.3 0 1 1 0 2.6H1.3A1.3 1.3 0 0 1 0 12.3Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--money-color":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M2.181.962C1.011 1.547 0 2.495 0 3.766v15.062c0 1.291 1.012 2.24 2.19 2.822 1.217.602 2.843.944 4.588.944.857 0 1.605-.107 2.299-.206l.017-.002a.753.753 0 1 0-.213-1.491c-.707.1-1.36.193-2.103.193-1.569 0-2.955-.31-3.921-.788-1.007-.498-1.35-1.056-1.35-1.472v-.586c.216.147.446.278.682.395 1.218.602 2.844.945 4.59.945.856 0 1.604-.107 2.298-.206l.017-.003a.753.753 0 0 0-.213-1.491c-.707.101-1.36.193-2.103.193-1.569 0-2.955-.31-3.921-.788-1.007-.497-1.35-1.055-1.35-1.471v-.586c.216.146.446.278.682.395 1.218.602 2.844.944 4.59.944.856 0 1.604-.107 2.298-.206l.017-.002a.753.753 0 1 0-.213-1.492c-.707.101-1.36.194-2.103.194-1.569 0-2.955-.31-3.921-.788-1.007-.498-1.35-1.056-1.35-1.472v-.586c.216.147.446.278.682.395 1.218.602 2.844.944 4.59.944.856 0 1.604-.106 2.298-.205l.017-.003a.753.753 0 0 0-.213-1.491c-.707.1-1.36.193-2.103.193-1.569 0-2.955-.31-3.921-.788-1.007-.497-1.35-1.055-1.35-1.471v-.586c.216.146.446.278.682.395 1.218.602 2.844.944 4.59.944 1.744 0 3.37-.342 4.588-.944a5.84 5.84 0 0 0 .683-.395v.586a.753.753 0 0 0 1.506 0V3.766c0-1.271-1.01-2.219-2.18-2.804C10.16.354 8.533 0 6.777 0 5.023 0 3.396.354 2.181.962Zm.674 1.347c-1.01.505-1.349 1.064-1.349 1.457s.338.951 1.349 1.456c.965.483 2.351.803 3.923.803s2.959-.32 3.924-.803c1.01-.505 1.348-1.063 1.348-1.456s-.338-.952-1.348-1.457c-.965-.482-2.352-.803-3.924-.803s-2.958.32-3.923.803Zm.002 5.94c-1.007-.497-1.35-1.055-1.35-1.47v-.603c.213.146.44.277.674.394 1.215.607 2.842.961 4.597.961 1.756 0 3.382-.354 4.597-.961.234-.117.461-.248.675-.394v.602c0 .416-.344.974-1.35 1.472-.966.477-2.353.788-3.922.788s-2.955-.311-3.921-.788Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M12.624 11.405c-1.17.586-2.18 1.533-2.18 2.804v6.025c0 1.291 1.011 2.24 2.189 2.822 1.218.602 2.844.944 4.589.944 1.745 0 3.37-.342 4.589-.944 1.177-.582 2.189-1.53 2.189-2.822V14.21c0-1.27-1.01-2.218-2.181-2.804-1.216-.607-2.842-.961-4.597-.961-1.756 0-3.382.354-4.598.961Zm.674 1.348c-1.01.505-1.348 1.063-1.348 1.456s.338.952 1.348 1.457c.965.482 2.351.803 3.924.803 1.572 0 2.958-.32 3.923-.803 1.01-.505 1.349-1.064 1.349-1.457s-.338-.951-1.349-1.456c-.965-.483-2.351-.803-3.923-.803-1.573 0-2.959.32-3.924.803Zm9.196 4.469v-.602a5.881 5.881 0 0 1-.675.393c-1.216.608-2.842.962-4.597.962-1.756 0-3.382-.354-4.598-.962a5.88 5.88 0 0 1-.674-.393v.602c0 .416.344.974 1.35 1.471.966.477 2.353.788 3.922.788 1.568 0 2.955-.31 3.921-.788 1.007-.497 1.35-1.055 1.35-1.471ZM11.95 19.648c.216.147.446.278.683.395 1.218.602 2.844.944 4.589.944 1.745 0 3.37-.342 4.589-.944.236-.117.466-.248.683-.395v.586c0 .416-.344.974-1.35 1.472-.967.477-2.354.788-3.922.788-1.57 0-2.956-.31-3.922-.788-1.006-.498-1.35-1.056-1.35-1.472v-.586Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M15.336 13.704a.754.754 0 0 0-1.478.204c0 .45.27.763.492.94.229.184.513.316.795.413.573.196 1.312.304 2.077.304.765 0 1.503-.108 2.076-.304.283-.097.567-.23.796-.412.22-.178.492-.49.492-.941a.753.753 0 0 0-1.478-.204 1.512 1.512 0 0 1-.297.132c-.381.13-.948.223-1.59.223-.64 0-1.207-.093-1.588-.223a1.513 1.513 0 0 1-.297-.132Zm3.827-.04-.003.002a.014.014 0 0 1 .003-.002Zm-3.88.002-.002-.002.002.002ZM4.892 3.26a.753.753 0 0 0-1.478.204c0 .45.271.764.492.94.229.184.513.316.796.413.573.196 1.311.304 2.076.304.765 0 1.504-.108 2.077-.304.282-.097.566-.229.795-.412.221-.177.492-.49.492-.94a.753.753 0 0 0-1.478-.205 1.508 1.508 0 0 1-.297.132c-.38.13-.948.223-1.589.223-.64 0-1.208-.093-1.589-.223a1.508 1.508 0 0 1-.297-.132Zm3.827-.04Zm-3.88.002Z' fill='%2329D305'/%3e%3c/svg%3e",
     "e-icon--more_menu":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M12 19.46a1.54 1.54 0 1 0 0 3.08 1.54 1.54 0 0 0 0-3.08ZM9 21a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM12 1.46a1.54 1.54 0 1 0 0 3.08 1.54 1.54 0 0 0 0-3.08ZM9 3a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM12 10.46a1.54 1.54 0 1 0 0 3.08 1.54 1.54 0 0 0 0-3.08ZM9 12a3 3 0 1 1 6 0 3 3 0 0 1-6 0Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--move_circle":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M12 1.5C6.201 1.5 1.5 6.201 1.5 12S6.201 22.5 12 22.5 22.5 17.799 22.5 12 17.799 1.5 12 1.5ZM0 12C0 5.373 5.373 0 12 0s12 5.373 12 12-5.373 12-12 12S0 18.627 0 12Zm8.25-3.75A.75.75 0 0 1 9 7.5h6.44l-1.72-1.72a.75.75 0 0 1 1.06-1.06l3 3a.748.748 0 0 1 0 1.06l-3 3a.75.75 0 1 1-1.06-1.06L15.44 9H9a.75.75 0 0 1-.75-.75ZM8.56 15l1.72-1.72a.75.75 0 1 0-1.06-1.06l-3 3a.748.748 0 0 0 0 1.06l3 3a.75.75 0 1 0 1.06-1.06L8.56 16.5H15a.75.75 0 0 0 0-1.5H8.56Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--move_truck-color":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='25' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12 6.342H8.601c-.8 0-1.5.682-1.5 1.463v1.268h-3c-.8 0-1.5.683-1.5 1.464v2.926c0 .781.7 1.464 1.5 1.464h8.2c.4 0 .7-.293.7-.78V7C13 6.5 12.623 6.342 12 6.342Zm-7.899 7.414v-3.122h3v3.122h-3Zm7.5 0h-3V7.903h3v5.853Z' fill='%2329D305'/%3e%3cpath d='M0 5.146V17.39c0 1.171 1 2.147 2.2 2.147h2.4C4.9 20.415 5.7 21 6.7 21s1.8-.585 2.1-1.463h7.8c.3.878 1.1 1.463 2.1 1.463s1.8-.585 2.1-1.463h1.5c1-.098 1.7-.878 1.7-1.756V9.731c.1-1.952-1.4-3.708-3.4-3.805h-4.7v-.78C15.9 3.975 14.9 3 13.7 3H2.2C1 3 0 3.976 0 5.146Zm14.3 8.512H1.5V5.146c0-.39.3-.78.8-.78h11.2c.4 0 .8.293.8.78v8.512Zm8.2-4.024v.866H19c-.1 0-.1 0-.1-.098V7.39h1.7c1 0 2 1.073 1.9 2.244Zm-.2 8.537h-1.4c-.3-.878-1.1-1.464-2.1-1.464s-1.8.586-2.1 1.464h-.9V7.39h1.6v3.11c0 .878.7 1.561 1.6 1.561h3.5v2.183h-1.2c-.4 0-.8.293-.8.78 0 .488.3.78.8.78h1.2v2.172l-.2.195Zm-4.3.683c0-.39.3-.78.8-.78s.8.292.8.78c0 .488-.3.78-.8.78s-.8-.39-.8-.78Zm-12 0c0-.39.3-.78.8-.78s.8.292.8.78c0 .488-.3.78-.8.78s-.8-.39-.8-.78ZM1.5 17.39v-2.17h12.8v2.95H8.9c-.3-.877-1.1-1.463-2.1-1.463s-1.8.586-2.1 1.464H2.2c-.4 0-.7-.39-.7-.78Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--new_tab":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M4.105 1.983C1.832 1.983 0 3.79 0 6.003V19.98C0 22.195 1.832 24 4.105 24h13.806c2.273 0 4.105-1.805 4.105-4.019v-4.15a.88.88 0 0 0-.892-.87.88.88 0 0 0-.892.87v4.15c0 1.266-1.045 2.281-2.32 2.281H4.104c-1.275 0-2.32-1.015-2.32-2.28V6.001c0-1.265 1.045-2.28 2.32-2.28H8.19a.88.88 0 0 0 .892-.87.88.88 0 0 0-.892-.869H4.105Z' fill='black'/%3e%3cpath d='M12.17 10.536a.916.916 0 0 0 1.294 1.295l8.705-8.705v7.134a.916.916 0 1 0 1.831 0V.916a.911.911 0 0 0-.334-.707.909.909 0 0 0-.582-.209H13.74a.916.916 0 0 0 0 1.832h7.134l-8.704 8.704Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--new_tab-bold":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='m20.142 2.26-7.811 7.811a1.13 1.13 0 0 0 1.597 1.598l7.813-7.812v6.138a1.13 1.13 0 1 0 2.259 0V1.13a1.125 1.125 0 0 0-.412-.872A1.123 1.123 0 0 0 22.87 0h-8.865a1.13 1.13 0 0 0 0 2.26h6.137ZM.05 6.209c0-2.296 1.899-4.159 4.243-4.159H8.26c.62 0 1.12.492 1.12 1.098 0 .605-.5 1.098-1.12 1.098H4.293c-1.105 0-2.002.878-2.002 1.963V19.79c0 1.085.897 1.963 2.002 1.963h13.414c1.105 0 2.002-.878 2.002-1.963v-4.033c0-.605.5-1.098 1.12-1.098.62 0 1.121.493 1.121 1.098v4.033c0 2.296-1.899 4.159-4.243 4.159H4.293C1.949 23.95.05 22.087.05 19.791V6.21Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--note_approved":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M3.25 24A2.252 2.252 0 0 1 1 21.75V2.25A2.252 2.252 0 0 1 3.25 0h17.5A2.252 2.252 0 0 1 23 2.25v11.379c0 .317-.066.625-.196.916l-.011.023a2.232 2.232 0 0 1-.451.65l-8.123 8.122a2.24 2.24 0 0 1-.691.47c-.274.124-.582.19-.899.19H3.25Zm0-22.5a.75.75 0 0 0-.75.75v19.5c0 .414.336.75.75.75h9.25v-6.75a2.252 2.252 0 0 1 2.25-2.25h6.75V2.25a.75.75 0 0 0-.75-.75H3.25ZM14.75 15a.75.75 0 0 0-.75.75v5.689L20.439 15H14.75Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='m9.489 11.315 4.027-5.75c.146-.209.21-.469.175-.73a.982.982 0 0 0-.354-.644.847.847 0 0 0-.534-.191.88.88 0 0 0-.715.385l-3.41 4.868-2.151-2.302a.854.854 0 0 0-.63-.28.853.853 0 0 0-.629.28A1.01 1.01 0 0 0 5 7.645c0 .264.096.51.268.693l2.877 3.08c.17.184.394.282.63.282l.062-.002a.88.88 0 0 0 .652-.383Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--note_approved-color":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M3.25 24A2.252 2.252 0 0 1 1 21.75V2.25A2.252 2.252 0 0 1 3.25 0h17.5A2.252 2.252 0 0 1 23 2.25v11.379c0 .317-.066.625-.196.916l-.011.023a2.232 2.232 0 0 1-.451.65l-8.123 8.122a2.24 2.24 0 0 1-.691.47c-.274.124-.582.19-.899.19H3.25Zm0-22.5a.75.75 0 0 0-.75.75v19.5c0 .414.336.75.75.75h9.25v-6.75a2.252 2.252 0 0 1 2.25-2.25h6.75V2.25a.75.75 0 0 0-.75-.75H3.25ZM14.75 15a.75.75 0 0 0-.75.75v5.689L20.439 15H14.75Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='m9.489 11.315 4.027-5.75c.146-.209.21-.469.175-.73a.982.982 0 0 0-.354-.644.847.847 0 0 0-.534-.191.88.88 0 0 0-.715.385l-3.41 4.868-2.151-2.302a.854.854 0 0 0-.63-.28.853.853 0 0 0-.629.28A1.01 1.01 0 0 0 5 7.645c0 .264.096.51.268.693l2.877 3.08c.17.184.394.282.63.282l.062-.002a.88.88 0 0 0 .652-.383Z' fill='%2329D305'/%3e%3c/svg%3e",
     "e-icon--note_check-color":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.875 18.75c-.483 0-.875-.336-.875-.75s.392-.75.875-.75h5.25c.483 0 .875.336.875.75s-.392.75-.875.75h-5.25ZM12.875 11.25c-.483 0-.875-.336-.875-.75s.392-.75.875-.75h5.25c.483 0 .875.336.875.75s-.392.75-.875.75h-5.25Z' fill='%2329D305'/%3e%3cpath d='M2.25 24A2.252 2.252 0 0 1 0 21.75v-18A2.252 2.252 0 0 1 2.25 1.5H4.5V.75a.75.75 0 0 1 1.5 0v.75h12V.75a.75.75 0 0 1 1.5 0v.75h2.25A2.252 2.252 0 0 1 24 3.75v18A2.252 2.252 0 0 1 21.75 24H2.25Zm0-21a.75.75 0 0 0-.75.75v18c0 .414.336.75.75.75h19.5a.75.75 0 0 0 .75-.75v-18a.75.75 0 0 0-.75-.75H19.5v.75a.75.75 0 0 1-1.5 0V3H6v.75a.75.75 0 0 1-1.5 0V3H2.25Z' fill='black'/%3e%3cpath d='M8.743 8.28a.7.7 0 0 1 .977-.14.704.704 0 0 1 .139.985L7.174 12.72a.697.697 0 0 1-.509.278h-.001a.69.69 0 0 1-.54-.204L4.205 10.87A.7.7 0 0 1 4 10.372a.699.699 0 0 1 1.191-.498l1.35 1.355L8.743 8.28ZM8.743 15.28a.7.7 0 0 1 .977-.14.704.704 0 0 1 .139.985L7.174 19.72a.697.697 0 0 1-.509.278h-.001a.69.69 0 0 1-.54-.204L4.205 17.87A.7.7 0 0 1 4 17.372a.699.699 0 0 1 1.191-.498l1.35 1.355 2.202-2.949Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--note_not_approved":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M3.25 24A2.252 2.252 0 0 1 1 21.75V2.25A2.252 2.252 0 0 1 3.25 0h17.5A2.252 2.252 0 0 1 23 2.25v11.379c0 .317-.066.625-.196.916l-.011.023a2.232 2.232 0 0 1-.451.65l-8.123 8.122a2.24 2.24 0 0 1-.691.47c-.274.124-.582.19-.899.19H3.25Zm0-22.5a.75.75 0 0 0-.75.75v19.5c0 .414.336.75.75.75h9.25v-6.75a2.252 2.252 0 0 1 2.25-2.25h6.75V2.25a.75.75 0 0 0-.75-.75H3.25ZM14.75 15a.75.75 0 0 0-.75.75v5.689L20.439 15H14.75Z' fill='black'/%3e%3crect width='2.007' height='10.721' rx='1.003' transform='rotate(45 2.065 16.936)' fill='black'/%3e%3crect width='2.007' height='10.721' rx='1.003' transform='rotate(135 4.705 8.44)' fill='black'/%3e%3c/svg%3e",
     "e-icon--note_not_approved-color":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M3.25 24A2.252 2.252 0 0 1 1 21.75V2.25A2.252 2.252 0 0 1 3.25 0h17.5A2.252 2.252 0 0 1 23 2.25v11.379c0 .317-.066.625-.196.916l-.011.023a2.232 2.232 0 0 1-.451.65l-8.123 8.122a2.24 2.24 0 0 1-.691.47c-.274.124-.582.19-.899.19H3.25Zm0-22.5a.75.75 0 0 0-.75.75v19.5c0 .414.336.75.75.75h9.25v-6.75a2.252 2.252 0 0 1 2.25-2.25h6.75V2.25a.75.75 0 0 0-.75-.75H3.25ZM14.75 15a.75.75 0 0 0-.75.75v5.689L20.439 15H14.75Z' fill='black'/%3e%3crect width='2.007' height='10.721' rx='1.003' transform='rotate(45 2.065 16.936)' fill='%23EE0701'/%3e%3crect width='2.007' height='10.721' rx='1.003' transform='rotate(135 4.705 8.44)' fill='%23EE0701'/%3e%3c/svg%3e",
     "e-icon--notification":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M12 0a.75.75 0 0 1 .75.75v1.534a8.25 8.25 0 0 1 7.5 8.216c0 3.476.37 5.456.715 6.54.171.54.334.851.435 1.012.05.08.086.122.099.137A.75.75 0 0 1 21 19.5H3a.75.75 0 0 1-.597-1.203v-.001a2.883 2.883 0 0 0 .16-.281c.12-.236.292-.631.468-1.226.35-1.19.719-3.18.719-6.288a8.25 8.25 0 0 1 7.5-8.216V.75A.75.75 0 0 1 12 0ZM4.205 18h15.508a8.25 8.25 0 0 1-.178-.506c-.406-1.279-.785-3.424-.785-6.994a6.75 6.75 0 0 0-13.5 0c0 3.225-.382 5.361-.78 6.712-.09.3-.179.562-.265.788Zm5.584 3.03a.75.75 0 0 1 .93.509 1.338 1.338 0 0 0 2.566 0 .75.75 0 1 1 1.44.422 2.837 2.837 0 0 1-5.445 0 .75.75 0 0 1 .509-.93Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--notification-bold":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M11.73 0c-.287 0-.556.109-.75.32-.192.208-.287.49-.287.799v1.565c-4.064.51-7.244 3.965-7.244 8.102 0 2.783-.311 4.609-.616 5.729-.152.56-.302.943-.412 1.182a3.273 3.273 0 0 1-.153.297.99.99 0 0 0-.238.502c-.03.163-.03.333-.03.467v.161l.106.105.024.023c.175.174.466.462.908.462h17.386c.249 0 .495-.06.69-.195a.774.774 0 0 0 .345-.577 1.088 1.088 0 0 0-.279-1.058 1.914 1.914 0 0 1-.13-.224 5.682 5.682 0 0 1-.373-1.049c-.28-1.045-.567-2.846-.567-5.825 0-4.11-3.217-7.54-7.244-8.09V1.12C12.866.417 12.287 0 11.73 0Zm2.31 20.535c-.544-.135-1.145.129-1.304.72-.153.44-.51.697-.909.697s-.755-.257-.908-.697c-.159-.591-.76-.855-1.304-.72-.61.15-.884.748-.747 1.29.336 1.325 1.66 2.175 2.96 2.175 1.32 0 2.517-.866 2.95-2.149l.005-.013.004-.013c.137-.541-.136-1.14-.747-1.29Zm-8.418-9.75c0-3.336 2.65-6.118 6.109-6.118 3.467 0 6.205 2.789 6.205 6.119 0 3.44.372 5.514.806 6.785H4.788c.38-1.266.834-3.398.834-6.785Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='m10.793 2.772-.088.01c-4.015.504-7.156 3.92-7.156 8.004 0 2.79-.312 4.625-.62 5.755a7.853 7.853 0 0 1-.417 1.197 3.373 3.373 0 0 1-.159.308l-.005.009-.006.007a.89.89 0 0 0-.214.452 2.501 2.501 0 0 0-.028.449v.12l.076.075.024.023c.178.176.441.433.838.433h17.386c.233 0 .459-.057.633-.178a.674.674 0 0 0 .303-.502v-.01l.003-.01a.988.988 0 0 0-.255-.96l-.01-.01-.015-.025a.263.263 0 0 1-.006-.008l.083-.055a.725.725 0 0 0 .02.028c.254.262.394.654.28 1.058a.774.774 0 0 1-.346.577 1.218 1.218 0 0 1-.69.195H3.038c-.442 0-.733-.288-.908-.462l-.024-.023L2 19.124v-.161c0-.134 0-.304.03-.467a.99.99 0 0 1 .238-.502 3.273 3.273 0 0 0 .153-.297c.11-.239.26-.622.412-1.182.305-1.12.616-2.946.616-5.73 0-4.136 3.18-7.592 7.244-8.101V1.119c0-.31.095-.591.287-.8.194-.21.463-.319.75-.319.557 0 1.136.417 1.136 1.119v1.577c4.027.55 7.244 3.98 7.244 8.09 0 2.979.288 4.78.567 5.825.14.523.277.854.374 1.049.048.097.086.16.11.196l-.084.055a1.978 1.978 0 0 1-.116-.207c-.1-.201-.24-.54-.38-1.067-.283-1.056-.571-2.866-.571-5.851 0-4.056-3.176-7.446-7.158-7.99l-.086-.013V1.12C12.766.482 12.242.1 11.73.1a.906.906 0 0 0-.678.287c-.172.187-.26.443-.26.732v1.653Zm2.037 18.516c-.165.476-.556.764-1.002.764-.447 0-.838-.288-1.003-.764l-.003-.007c-.142-.529-.681-.773-1.183-.65-.549.136-.8.673-.674 1.17.323 1.272 1.6 2.099 2.863 2.099 1.277 0 2.436-.838 2.856-2.081l.003-.01.003-.009c.126-.496-.125-1.033-.674-1.168-.502-.124-1.041.12-1.184.65l-.002.006Zm1.953.55-.004.013C14.345 23.134 13.149 24 11.828 24c-1.3 0-2.624-.85-2.96-2.175-.137-.541.136-1.14.747-1.29.544-.135 1.145.129 1.304.72.153.44.51.697.909.697s.755-.257.908-.697c.159-.591.76-.855 1.304-.72.61.15.884.748.747 1.29l-.004.013Zm4.1-4.167H4.652l.039-.128c.377-1.257.83-3.38.83-6.757 0-3.391 2.692-6.22 6.209-6.22 3.521 0 6.306 2.834 6.306 6.22 0 3.433.37 5.496.8 6.753l.045.132Zm-14.095-.1.03-.1c.373-1.277.804-3.386.804-6.685 0-3.337 2.65-6.12 6.109-6.12 3.467 0 6.205 2.79 6.205 6.12 0 3.35.353 5.406.773 6.685l.033.1H4.788Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--open_menu":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M24 1.5a.75.75 0 0 0-1.5 0v21a.75.75 0 0 0 1.5 0v-21ZM14.47 7.72a.75.75 0 0 1 1.06 0l3.75 3.75a.748.748 0 0 1 0 1.06l-3.75 3.75a.75.75 0 1 1-1.06-1.06l2.47-2.47H.75a.75.75 0 0 1 0-1.5h16.19l-2.47-2.47a.75.75 0 0 1 0-1.06Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--paper_plane_speed_color":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='25' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M20.102 2.31a.799.799 0 0 0-.44.121L3.488 12.541a.8.8 0 0 0 .424 1.479h7.3c.206 0 .4.097.524.262l4.56 6.086s-.001 0 0 0a.8.8 0 0 0 1.425-.332l3.15-16.777v-.002a.798.798 0 0 0-.769-.948Zm-1.136-.992a2.112 2.112 0 0 1 3.195 2.183v.001l-3.15 16.776a2.113 2.113 0 0 1-3.766.878l-4.362-5.824h-6.97a2.112 2.112 0 0 1-1.12-3.904l16.173-10.11Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M8.367 14.676c0-.363.294-.656.656-.656h2.188c.207 0 .402.097.525.263l2.869 3.831a.657.657 0 0 1-.156.936l-2.78 1.895a2.112 2.112 0 0 1-3.302-1.744v-4.525Zm1.313.656v3.869a.799.799 0 0 0 1.249.66l2.214-1.51-2.26-3.019H9.68Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M21.303 1.386c.288.22.345.631.125.92l-9.695 12.767a.656.656 0 1 1-1.045-.794l9.695-12.767a.656.656 0 0 1 .92-.126Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M8.256 21.954a.75.75 0 0 1 .14 1.052l-1.3 1.7a.75.75 0 0 1-1.192-.912l1.3-1.7a.75.75 0 0 1 1.052-.14ZM6.556 17.404a.75.75 0 0 1 .14 1.052l-1.3 1.7a.75.75 0 1 1-1.192-.912l1.3-1.7a.75.75 0 0 1 1.052-.14ZM13.556 21.404a.75.75 0 0 1 .14 1.052l-1.3 1.7a.75.75 0 1 1-1.192-.912l1.3-1.7a.75.75 0 0 1 1.052-.14Z' fill='%2329D305'/%3e%3c/svg%3e",
     "e-icon--paper_plane":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='m15.82 23.035-1.545-2.003-2.664 1.763a2.547 2.547 0 0 1-2.56.14 2.456 2.456 0 0 1-.967-.888 2.36 2.36 0 0 1-.357-1.246v-4.42H2.485c-.54 0-1.064-.17-1.495-.486a2.414 2.414 0 0 1-.894-1.262 2.348 2.348 0 0 1 .069-1.53c.193-.49.545-.905 1.003-1.183L20.198.367a2.54 2.54 0 0 1 2.72.054c.399.265.71.637.894 1.07.184.434.235.91.145 1.37v.002l-3.707 19.17c-.09.46-.314.885-.648 1.223a2.505 2.505 0 0 1-1.23.681c-.47.106-.961.078-1.414-.082a2.481 2.481 0 0 1-1.138-.82Zm5.245-21.424a.951.951 0 0 0-.048.028L1.987 13.192a.92.92 0 0 0-.38.447.89.89 0 0 0-.026.58c.056.19.175.358.338.478a.96.96 0 0 0 .566.184h8.204L21.065 1.61Zm1.386.709L12.04 15.633l5.015 6.502c.11.141.26.25.43.31a.968.968 0 0 0 1.002-.227.904.904 0 0 0 .245-.462L22.44 2.585v-.002a.886.886 0 0 0 .012-.263ZM9.27 16.38v4.421c0 .166.047.33.135.472a.93.93 0 0 0 .366.336.964.964 0 0 0 .97-.053l2.604-1.725-2.66-3.45H9.272Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--pause_circle-color":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M9.584 7.317h-.84a.84.84 0 0 0-.842.84v7.568c0 .464.377.84.841.84h.841a.84.84 0 0 0 .84-.84V8.158a.84.84 0 0 0-.84-.84ZM14.852 7.317h-.84a.84.84 0 0 0-.841.84v7.568c0 .464.376.84.84.84h.841a.84.84 0 0 0 .841-.84V8.158a.84.84 0 0 0-.84-.84Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M12 1.756C6.342 1.756 1.756 6.342 1.756 12c0 5.658 4.586 10.244 10.244 10.244 5.658 0 10.244-4.586 10.244-10.244 0-5.658-4.586-10.244-10.244-10.244ZM0 12C0 5.373 5.373 0 12 0s12 5.373 12 12-5.373 12-12 12S0 18.627 0 12Z' fill='%2329D305'/%3e%3c/svg%3e",
     "e-icon--pause_circle-filled-color":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M0 12C0 5.373 5.373 0 12 0s12 5.373 12 12-5.373 12-12 12S0 18.627 0 12Z' fill='%2329D305'/%3e%3cpath d='M9.682 7.37H8.84A.84.84 0 0 0 8 8.21v7.568c0 .464.376.84.84.84h.842a.84.84 0 0 0 .84-.84V8.211a.84.84 0 0 0-.84-.841ZM14.95 7.37h-.841a.84.84 0 0 0-.84.84v7.568c0 .464.376.84.84.84h.84a.84.84 0 0 0 .842-.84V8.211a.84.84 0 0 0-.841-.841Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--phone":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M8.251 24a3.754 3.754 0 0 1-3.75-3.75V3.75A3.754 3.754 0 0 1 8.251 0h7.5a3.754 3.754 0 0 1 3.75 3.75v16.5a3.754 3.754 0 0 1-3.75 3.75h-7.5Zm-2.25-3.75a2.252 2.252 0 0 0 2.25 2.25h7.5a2.252 2.252 0 0 0 2.25-2.25v-.75h-12v.75Zm12-2.25V3.75a2.252 2.252 0 0 0-2.25-2.25h-7.5a2.252 2.252 0 0 0-2.25 2.25V18h12Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--phone_comment":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M15.75 15.75A.75.75 0 0 1 15 15v-3h-3a3.754 3.754 0 0 1-3.75-3.75v-4.5A3.754 3.754 0 0 1 12 0h8.25A3.754 3.754 0 0 1 24 3.75v4.5A3.754 3.754 0 0 1 20.25 12h-.439l-3.53 3.53a.747.747 0 0 1-.531.22ZM12 1.5a2.252 2.252 0 0 0-2.25 2.25v4.5A2.252 2.252 0 0 0 12 10.5h3.75a.75.75 0 0 1 .75.75v1.939l2.47-2.47c.14-.14.333-.22.53-.22h.75a2.252 2.252 0 0 0 2.25-2.25v-4.5a2.252 2.252 0 0 0-2.25-2.25H12V1.5ZM3.483 23.998A3.487 3.487 0 0 1 0 20.518V4.98a3.489 3.489 0 0 1 3.483-3.483H6a.75.75 0 0 1 0 1.5H3.483c-1.093 0-1.983.89-1.983 1.983v13.017H12v-3.75a.75.75 0 0 1 1.5 0v6.268a3.486 3.486 0 0 1-3.482 3.482H3.483ZM1.5 20.516c0 1.093.89 1.982 1.983 1.982h6.535A1.984 1.984 0 0 0 12 20.516v-1.018H1.5v1.018ZM11.25 6c0 .62.505 1.125 1.125 1.125S13.5 6.62 13.5 6c0-.611-.48-1.104-1.081-1.122h-.021l-.022-.001-.042.001A1.12 1.12 0 0 0 11.25 6Zm4.875 1.125C15.505 7.125 15 6.62 15 6c0-.607.476-1.1 1.084-1.122l.042-.001h.021l.022.001A1.117 1.117 0 0 1 17.25 6c0 .62-.505 1.125-1.125 1.125ZM21 6a1.125 1.125 0 1 1-2.25 0A1.125 1.125 0 0 1 21 6Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--phone_comment-color":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M15.462 15.693a.75.75 0 0 0 .819-.163l3.53-3.53h.439A3.754 3.754 0 0 0 24 8.25v-4.5A3.754 3.754 0 0 0 20.25 0H12a3.754 3.754 0 0 0-3.75 3.75v4.5A3.754 3.754 0 0 0 12 12h3v3a.75.75 0 0 0 .462.693ZM9.75 3.75A2.252 2.252 0 0 1 12 1.5v-.001h8.25a2.252 2.252 0 0 1 2.25 2.25v4.5a2.252 2.252 0 0 1-2.25 2.25h-.75c-.197 0-.39.08-.53.22l-2.47 2.47V11.25a.75.75 0 0 0-.75-.75H12a2.252 2.252 0 0 1-2.25-2.25v-4.5Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M0 20.517a3.487 3.487 0 0 0 3.483 3.481h6.535a3.486 3.486 0 0 0 3.482-3.482v-6.268a.75.75 0 0 0-1.5 0v3.75H1.5V4.981c0-1.093.89-1.983 1.983-1.983H6a.75.75 0 0 0 0-1.5H3.483A3.489 3.489 0 0 0 0 4.981v15.536Zm3.483 1.981A1.985 1.985 0 0 1 1.5 20.516v-1.018H12v1.018a1.984 1.984 0 0 1-1.982 1.982H3.483Z' fill='black'/%3e%3cpath d='M12.375 7.125c-.62 0-1.125-.505-1.125-1.125 0-.607.476-1.1 1.084-1.122l.042-.001.043.001A1.117 1.117 0 0 1 13.5 6c0 .62-.505 1.125-1.125 1.125ZM16.125 7.125C15.505 7.125 15 6.62 15 6c0-.607.476-1.1 1.084-1.122l.042-.001.043.001A1.117 1.117 0 0 1 17.25 6c0 .62-.505 1.125-1.125 1.125ZM19.875 7.125a1.125 1.125 0 1 0 0-2.25 1.125 1.125 0 0 0 0 2.25Z' fill='%2329D305'/%3e%3c/svg%3e",
     "e-icon--phone_image":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M9 11.25c0 1.24 1.009 2.25 2.25 2.25h9a2.252 2.252 0 0 0 2.25-2.25v-9A2.252 2.252 0 0 0 20.25 0h-9A2.252 2.252 0 0 0 9 2.25v9Zm12 0a.75.75 0 0 1-.75.75h-7.6l1.764-2.652.002-.001 1.236.989a.752.752 0 0 0 1.082-.155l2.001-2.851L21 10.727v.523Zm-10.5-9a.75.75 0 0 1 .75-.75h9a.75.75 0 0 1 .75.75v5.773l-1.016-1.525a1.49 1.49 0 0 0-1.251-.669 1.491 1.491 0 0 0-1.226.64l-1.542 2.196-.613-.49a1.501 1.501 0 0 0-2.185.341l-2.261 3.398a.745.745 0 0 1-.406-.664v-9ZM4.983 23.998a3.486 3.486 0 0 1-3.483-3.48V4.981a3.486 3.486 0 0 1 3.483-3.483H6.75a.75.75 0 0 1 0 1.5H4.983C3.89 2.998 3 3.888 3 4.981v13.017h10.5v-2.25a.75.75 0 0 1 1.5 0v4.768a3.486 3.486 0 0 1-3.482 3.482H4.983ZM3 20.516c0 1.093.89 1.982 1.982 1.982h6.535a1.985 1.985 0 0 0 1.983-1.982v-1.018H3v1.018ZM13.875 5.25a1.124 1.124 0 0 1-.059-2.246h.007L13.875 3C14.495 3 15 3.505 15 4.125s-.505 1.125-1.125 1.125Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--pdf_document":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M2.25 1.5a.75.75 0 0 0-.75.75v19.465c0 .217.091.437.22.565.14.141.331.22.53.22h2.243a.75.75 0 0 1 0 1.5H2.25a2.25 2.25 0 0 1-1.591-.659A2.332 2.332 0 0 1 0 21.715V2.25A2.25 2.25 0 0 1 2.25 0h11.618a2.25 2.25 0 0 1 1.592.66l5.87 5.87a2.251 2.251 0 0 1 .66 1.592v4.628a.75.75 0 0 1-1.5 0V8.122a.752.752 0 0 0-.22-.53L14.399 1.72a.752.752 0 0 0-.53-.22H2.25Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M13.74 0a.75.75 0 0 1 .75.75v6a.75.75 0 0 0 .75.75h6a.75.75 0 0 1 0 1.5h-6a2.25 2.25 0 0 1-2.25-2.25v-6a.75.75 0 0 1 .75-.75ZM8.24 15a.75.75 0 0 1 .75.75v7.5a.75.75 0 0 1-1.5 0v-7.5a.75.75 0 0 1 .75-.75Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M7.49 15.75a.75.75 0 0 1 .75-.75h.753a3 3 0 0 1 0 6h-.75a.75.75 0 0 1 0-1.5h.75a1.5 1.5 0 1 0 0-3H8.24a.75.75 0 0 1-.75-.75ZM13.49 15.75a.75.75 0 0 1 .75-.75 3.75 3.75 0 0 1 3.75 3.75v1.5A3.75 3.75 0 0 1 14.24 24a.75.75 0 0 1-.75-.75v-7.5Zm1.5.879v5.742a2.25 2.25 0 0 0 1.5-2.121v-1.5a2.25 2.25 0 0 0-1.5-2.121ZM21.74 16.5a.75.75 0 0 0-.75.75v6a.75.75 0 0 1-1.5 0v-6A2.25 2.25 0 0 1 21.74 15h1.5a.75.75 0 0 1 0 1.5h-1.5Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M19.49 20.25a.75.75 0 0 1 .75-.75h2.25a.75.75 0 0 1 0 1.5h-2.25a.75.75 0 0 1-.75-.75Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--pie_chart":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M13.5 10.5a.75.75 0 0 1-.75-.75v-9A.75.75 0 0 1 13.5 0c5.376 0 9.75 4.374 9.75 9.75a.75.75 0 0 1-.75.75h-9ZM21.716 9c-.359-3.929-3.537-7.107-7.466-7.466V9h7.466Z' fill='black'/%3e%3cpath d='M10.501 24a9.688 9.688 0 0 1-6.894-2.855 9.683 9.683 0 0 1-2.856-6.894 9.687 9.687 0 0 1 2.855-6.894A9.684 9.684 0 0 1 10.5 4.5a.753.753 0 0 1 .75.75v8.741l5.401 6.873a.743.743 0 0 1 .155.553.745.745 0 0 1-.281.5A9.795 9.795 0 0 1 10.501 24ZM9.75 6.034a8.216 8.216 0 0 0-5.083 2.383 8.196 8.196 0 0 0-2.416 5.834 8.19 8.19 0 0 0 2.417 5.833 8.196 8.196 0 0 0 5.833 2.416c1.58 0 3.157-.469 4.486-1.327l-5.076-6.46a.756.756 0 0 1-.16-.463V6.034H9.75Z' fill='black'/%3e%3cpath d='M19.061 20.577a.743.743 0 0 1-.59-.287l-5.561-7.077a.753.753 0 0 1-.084-.792A.755.755 0 0 1 13.5 12h9a.75.75 0 0 1 .75.749 9.677 9.677 0 0 1-3.726 7.667.746.746 0 0 1-.463.161Zm.106-1.829a8.116 8.116 0 0 0 2.551-5.248h-6.674l4.123 5.248Z' fill='%2329D305'/%3e%3c/svg%3e",
     "e-icon--pin":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M7.227 3.477A6.75 6.75 0 0 1 18.75 8.25c0 .706-.273 1.77-.772 3.08-.49 1.287-1.167 2.732-1.907 4.169-1.48 2.874-3.184 5.665-4.071 7.001l.625.415L12 22.5l-.625.415L12 22.5c-.887-1.336-2.591-4.127-4.071-7.001-.74-1.438-1.417-2.883-1.907-4.17-.499-1.308-.772-2.373-.772-3.079a6.75 6.75 0 0 1 1.977-4.773Zm-1.06-1.06A8.25 8.25 0 0 1 20.25 8.25c0 .997-.361 2.278-.87 3.614-.518 1.358-1.222 2.857-1.975 4.321-1.508 2.928-3.24 5.766-4.155 7.145a1.5 1.5 0 0 1-2.5 0c-.914-1.379-2.647-4.217-4.155-7.145-.753-1.463-1.457-2.963-1.975-4.321-.509-1.336-.87-2.617-.87-3.614a8.25 8.25 0 0 1 2.416-5.834ZM9 8.25a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm3-4.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--pin-color":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M12 1.5a6.75 6.75 0 0 0-6.75 6.75c0 .706.273 1.77.772 3.08.49 1.287 1.167 2.732 1.907 4.169 1.48 2.874 3.184 5.665 4.071 7.001l-.625.415L12 22.5l.625.415L12 22.5c.887-1.336 2.591-4.127 4.071-7.001.74-1.438 1.417-2.883 1.907-4.17.499-1.308.772-2.373.772-3.079A6.75 6.75 0 0 0 12 1.5ZM12 0a8.25 8.25 0 0 0-8.25 8.25c0 .997.361 2.278.87 3.614.518 1.358 1.222 2.857 1.975 4.321 1.508 2.928 3.24 5.766 4.155 7.145a1.5 1.5 0 0 0 2.5 0c.914-1.379 2.647-4.217 4.155-7.145.753-1.463 1.457-2.963 1.975-4.321.509-1.336.87-2.617.87-3.614A8.25 8.25 0 0 0 12 0Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M12 5.25a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-4.5 3a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0Z' fill='%2329D305'/%3e%3c/svg%3e",
     "e-icon--pin-filled":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M12 0a8.25 8.25 0 0 0-8.25 8.25c0 .997.361 2.278.87 3.614.518 1.358 1.222 2.857 1.975 4.321 1.508 2.928 3.24 5.766 4.155 7.145a1.5 1.5 0 0 0 2.5 0c.914-1.379 2.647-4.217 4.155-7.145.753-1.463 1.457-2.963 1.975-4.321.509-1.336.87-2.617.87-3.614A8.25 8.25 0 0 0 12 0Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M12 5.25a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-4.5 3a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0Z' fill='white'/%3e%3c/svg%3e",
     "e-icon--pin-filled-color":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cg clip-path='url(%23a)' fill-rule='evenodd' clip-rule='evenodd'%3e%3cpath d='M12 3.75a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9Zm-3 4.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Z' fill='black'/%3e%3cpath d='M6.166 2.416A8.25 8.25 0 0 1 20.25 8.25c0 .997-.361 2.278-.87 3.614-.518 1.358-1.222 2.857-1.975 4.321-1.508 2.928-3.24 5.766-4.155 7.145a1.5 1.5 0 0 1-2.5 0c-.914-1.379-2.647-4.217-4.155-7.145-.753-1.463-1.457-2.963-1.975-4.321-.509-1.336-.87-2.617-.87-3.614a8.25 8.25 0 0 1 2.416-5.834Zm1.061 1.061A6.75 6.75 0 0 1 18.75 8.25c0 .706-.273 1.77-.772 3.08-.49 1.287-1.167 2.732-1.907 4.169-1.48 2.874-3.184 5.665-4.071 7.001-.887-1.336-2.591-4.127-4.071-7.001-.74-1.438-1.417-2.883-1.907-4.17-.499-1.308-.772-2.373-.772-3.079a6.75 6.75 0 0 1 1.977-4.773Z' fill='black'/%3e%3cpath d='M12 1.5a6.75 6.75 0 0 0-6.75 6.75c0 .706.273 1.77.772 3.08.49 1.287 1.167 2.732 1.907 4.169 1.48 2.874 3.184 5.665 4.071 7.001.887-1.336 2.591-4.127 4.071-7.001.74-1.438 1.417-2.883 1.907-4.17.499-1.308.772-2.373.772-3.079A6.75 6.75 0 0 0 12 1.5Zm0 2.25a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9Z' fill='%2329D305'/%3e%3c/g%3e%3cdefs%3e%3cclipPath id='a'%3e%3cpath fill='white' d='M0 0h24v24H0z'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e",
     "e-icon--play_circle-color":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M8.906 7.36a1.069 1.069 0 0 1 1.15.015l7.181 3.592c.318.16.645.455.645.894 0 .44-.326.735-.645.894l-7.182 3.591a1.069 1.069 0 0 1-1.647-1.019V8.396a1.07 1.07 0 0 1 .498-1.036Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M12 1.756C6.342 1.756 1.756 6.342 1.756 12c0 5.658 4.586 10.244 10.244 10.244 5.658 0 10.244-4.586 10.244-10.244 0-5.658-4.586-10.244-10.244-10.244ZM0 12C0 5.373 5.373 0 12 0s12 5.373 12 12-5.373 12-12 12S0 18.627 0 12Z' fill='%2329D305'/%3e%3c/svg%3e",
     "e-icon--play_circle-filled-color":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M0 12C0 5.373 5.373 0 12 0s12 5.373 12 12-5.373 12-12 12S0 18.627 0 12Z' fill='%2329D305'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M8.906 7.36a1.069 1.069 0 0 1 1.15.015l7.181 3.592c.318.16.645.455.645.894 0 .44-.326.735-.645.894l-7.182 3.591a1.069 1.069 0 0 1-1.647-1.019V8.396a1.07 1.07 0 0 1 .498-1.036Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--plus":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M13.243 1.243a1.243 1.243 0 1 0-2.486 0v9.514H1.243a1.243 1.243 0 1 0 0 2.486h9.514v9.514a1.243 1.243 0 1 0 2.486 0v-9.514h9.514a1.243 1.243 0 1 0 0-2.486h-9.514V1.243Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--plus-bold":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M13.243 1.243a1.243 1.243 0 1 0-2.486 0v9.514H1.243a1.243 1.243 0 1 0 0 2.486h9.514v9.514a1.243 1.243 0 1 0 2.486 0v-9.514h9.514a1.243 1.243 0 1 0 0-2.486h-9.514V1.243Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--position-bold":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M10.88 1a1 1 0 0 1 1-1h.25a1 1 0 0 1 1 1v1.466a9.604 9.604 0 0 1 8.405 8.409H23a1 1 0 0 1 1 1v.25a1 1 0 0 1-1 1h-1.465a9.604 9.604 0 0 1-8.405 8.41V23a1 1 0 0 1-1 1h-.25a1 1 0 0 1-1-1v-1.465a9.604 9.604 0 0 1-8.415-8.41H1a1 1 0 0 1-1-1v-.25a1 1 0 0 1 1-1h1.465a9.604 9.604 0 0 1 8.415-8.41V1ZM12 19.35a7.35 7.35 0 1 0 0-14.7 7.35 7.35 0 0 0 0 14.7Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--position-bold-color":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z' fill='%2329D305'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M10.88 1a1 1 0 0 1 1-1h.25a1 1 0 0 1 1 1v1.466a9.604 9.604 0 0 1 8.405 8.409H23a1 1 0 0 1 1 1v.25a1 1 0 0 1-1 1h-1.465a9.604 9.604 0 0 1-8.405 8.41V23a1 1 0 0 1-1 1h-.25a1 1 0 0 1-1-1v-1.465a9.604 9.604 0 0 1-8.415-8.41H1a1 1 0 0 1-1-1v-.25a1 1 0 0 1 1-1h1.465a9.604 9.604 0 0 1 8.415-8.41V1ZM12 19.35a7.35 7.35 0 1 0 0-14.7 7.35 7.35 0 0 0 0 14.7Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--position_off-bold":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M23.278.722a1.1 1.1 0 0 1 0 1.556l-21 21a1.1 1.1 0 1 1-1.556-1.556l21-21a1.1 1.1 0 0 1 1.556 0Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M10.88 1a1 1 0 0 1 1-1h.25a1 1 0 0 1 1 1v1.466a9.604 9.604 0 0 1 8.405 8.409H23a1 1 0 0 1 1 1v.25a1 1 0 0 1-1 1h-1.465a9.604 9.604 0 0 1-8.405 8.41V23a1 1 0 0 1-1 1h-.25a1 1 0 0 1-1-1v-1.465a9.604 9.604 0 0 1-8.415-8.41H1a1 1 0 0 1-1-1v-.25a1 1 0 0 1 1-1h1.465a9.604 9.604 0 0 1 8.415-8.41V1ZM12 19.35a7.35 7.35 0 1 0 0-14.7 7.35 7.35 0 0 0 0 14.7Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--power":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='m6.97 10.407-.825 1.227a1.8 1.8 0 0 0-.281 1.83 1.579 1.579 0 0 0 1.166.855l2.404.382a.191.191 0 0 1 .17.221L8.369 23.37a.543.543 0 0 0 .332.594.553.553 0 0 0 .643-.191L15.11 16l2.782-3.602a1.95 1.95 0 0 0 .322-.774 1.76 1.76 0 0 0 0-.825 1.61 1.61 0 0 0-.423-.714 1.287 1.287 0 0 0-.734-.372l-2.444-.393a.16.16 0 0 1-.136-.117.16.16 0 0 1-.005-.064C14.655 8.033 15.76.993 15.75.49c-.01-.503-.785-.694-1.137-.211L9.61 7l-2.64 3.407Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--power_2":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='m9.61 7-2.64 3.407-.825 1.227a1.8 1.8 0 0 0-.281 1.83 1.58 1.58 0 0 0 1.166.855l2.404.382a.191.191 0 0 1 .17.222L8.369 23.37a.543.543 0 0 0 .332.593.553.553 0 0 0 .643-.191L15.11 16l2.782-3.602a1.95 1.95 0 0 0 .322-.774 1.76 1.76 0 0 0 0-.825 1.609 1.609 0 0 0-.423-.714 1.287 1.287 0 0 0-.734-.372l-2.444-.392a.16.16 0 0 1-.136-.118.16.16 0 0 1-.005-.063c.147-.896.9-5.684 1.177-7.74l.008-.065.033-.254.002-.015c.038-.3.06-.504.058-.576-.01-.503-.785-.694-1.137-.21L9.61 7Zm4.155-3.07-2.96 3.977-2.618 3.379-.84 1.248-.048.058a.3.3 0 0 0-.066.233c.01.007.02.01.031.013h.002l2.379.378a1.691 1.691 0 0 1 1.443 1.93l-.685 4.681 3.51-4.732 2.763-3.576a.45.45 0 0 0 .061-.16l.008-.043.01-.044a.26.26 0 0 0 .006-.087l-2.37-.38a1.661 1.661 0 0 1-1.405-1.863l.003-.022.003-.023a546.003 546.003 0 0 0 .773-4.967Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--power_outage":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='m21.717 23.254-19.434-.02a2.238 2.238 0 0 1-2-3.33l9.748-17.98a2.24 2.24 0 0 1 3.938 0l9.748 18a2.241 2.241 0 0 1-2 3.33ZM12.03 2.234a.77.77 0 0 0-.66.39l-9.737 18a.75.75 0 0 0 0 .74.77.77 0 0 0 .65.37h19.494a.77.77 0 0 0 .65-.37.78.78 0 0 0 0-.74l-9.747-18a.77.77 0 0 0-.65-.39Z' fill='black'/%3e%3cpath d='m15.558 16.775-7.043-5.634a.566.566 0 0 0-.838.09.532.532 0 0 0 .108.787l1.256 1.007a.057.057 0 0 1 0 .079l-.464.69a1.013 1.013 0 0 0-.159 1.03.89.89 0 0 0 .657.48l1.352.215a.108.108 0 0 1 .094.081c.004.014.004.03.002.044l-.696 4.752a.305.305 0 0 0 .187.334.311.311 0 0 0 .362-.108l3.004-4.04a.062.062 0 0 1 .084 0l1.364 1.036a.513.513 0 0 0 .764-.068.52.52 0 0 0-.034-.775ZM13.98 7.526c.005.283-.617 4.243-.72 4.865a.092.092 0 0 0 .02.067.091.091 0 0 0 .06.035l1.375.22a.724.724 0 0 1 .413.21c.113.11.194.249.237.401a.991.991 0 0 1 0 .464c-.028.157-.09.305-.18.436l-.408.566a.137.137 0 0 1-.153.031.137.137 0 0 1-.045-.031l-2.133-1.726-2.036-1.63a.09.09 0 0 1 0-.124l2.93-3.903c.198-.272.634-.164.64.119Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--power_outage-2":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M18.946 16.934 6.425 6.917a1.006 1.006 0 0 0-1.489.16.945.945 0 0 0 .191 1.399l2.233 1.79a.1.1 0 0 1 0 .14l-.825 1.228a1.8 1.8 0 0 0-.281 1.83 1.58 1.58 0 0 0 1.166.855l2.404.382a.191.191 0 0 1 .171.221l-1.237 8.449a.543.543 0 0 0 .332.593.553.553 0 0 0 .644-.191l5.34-7.181a.11.11 0 0 1 .15 0l2.425 1.84a.915.915 0 0 0 1.357-.12.926.926 0 0 0-.06-1.378ZM16.14.49c.01.503-1.096 7.543-1.277 8.65a.16.16 0 0 0 .14.18l2.445.393c.278.04.536.17.734.372.2.197.346.443.422.714.066.27.066.554 0 .825-.05.278-.16.542-.322.774l-.724 1.006a.24.24 0 0 1-.352 0l-3.791-3.068L9.794 7.44a.16.16 0 0 1 0-.221l5.21-6.94c.352-.483 1.126-.292 1.136.211Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--power_outage-2-color":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M18.946 16.934 6.425 6.917a1.006 1.006 0 0 0-1.489.16.945.945 0 0 0 .191 1.399l2.233 1.79a.1.1 0 0 1 0 .14l-.825 1.228a1.8 1.8 0 0 0-.281 1.83 1.58 1.58 0 0 0 1.166.855l2.404.382a.191.191 0 0 1 .171.221l-1.237 8.449a.543.543 0 0 0 .332.593.553.553 0 0 0 .644-.191l5.34-7.181a.11.11 0 0 1 .15 0l2.425 1.84a.915.915 0 0 0 1.357-.12.926.926 0 0 0-.06-1.378ZM16.14.49c.01.503-1.096 7.543-1.277 8.65a.16.16 0 0 0 .14.18l2.445.393c.278.04.536.17.734.372.2.197.346.443.422.714.066.27.066.554 0 .825-.05.278-.16.542-.322.774l-.724 1.006a.24.24 0 0 1-.352 0l-3.791-3.068L9.794 7.44a.16.16 0 0 1 0-.221l5.21-6.94c.352-.483 1.126-.292 1.136.211Z' fill='%23FFA000'/%3e%3c/svg%3e",
     "e-icon--power_outage-color":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='m21.717 23.254-19.434-.02a2.238 2.238 0 0 1-2-3.33l9.748-17.98a2.24 2.24 0 0 1 3.938 0l9.748 18a2.241 2.241 0 0 1-2 3.33ZM12.03 2.234a.77.77 0 0 0-.66.39l-9.737 18a.75.75 0 0 0 0 .74.77.77 0 0 0 .65.37h19.494a.77.77 0 0 0 .65-.37.78.78 0 0 0 0-.74l-9.747-18a.77.77 0 0 0-.65-.39Z' fill='black'/%3e%3cpath d='m15.558 16.775-7.043-5.634a.566.566 0 0 0-.838.09.532.532 0 0 0 .108.787l1.256 1.007a.057.057 0 0 1 0 .079l-.464.69a1.013 1.013 0 0 0-.159 1.03.89.89 0 0 0 .657.48l1.352.215a.108.108 0 0 1 .094.081c.004.014.004.03.002.044l-.696 4.752a.305.305 0 0 0 .187.334.311.311 0 0 0 .362-.108l3.004-4.04a.062.062 0 0 1 .084 0l1.364 1.036a.513.513 0 0 0 .764-.068.52.52 0 0 0-.034-.775ZM13.98 7.526c.005.283-.617 4.243-.72 4.865a.092.092 0 0 0 .02.067.091.091 0 0 0 .06.035l1.375.22a.724.724 0 0 1 .413.21c.113.11.194.249.237.401a.991.991 0 0 1 0 .464c-.028.157-.09.305-.18.436l-.408.566a.137.137 0 0 1-.153.031.137.137 0 0 1-.045-.031l-2.133-1.726-2.036-1.63a.09.09 0 0 1 0-.124l2.93-3.903c.198-.272.634-.164.64.119Z' fill='%2329D305'/%3e%3c/svg%3e",
     "e-icon--power_outage_map":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='m21.997 19.584-7.825-6.261a.629.629 0 0 0-.93.1.59.59 0 0 0 .119.874l1.395 1.12a.063.063 0 0 1 0 .087l-.515.767a1.125 1.125 0 0 0-.176 1.144.987.987 0 0 0 .729.534l1.502.24a.12.12 0 0 1 .107.137l-.773 5.28a.34.34 0 0 0 .207.371.345.345 0 0 0 .403-.119l3.338-4.488a.07.07 0 0 1 .094 0l1.515 1.15a.572.572 0 0 0 .848-.075.577.577 0 0 0-.038-.861ZM20.244 9.306c.006.315-.685 4.715-.799 5.406a.1.1 0 0 0 .05.101.1.1 0 0 0 .038.012l1.528.245a.806.806 0 0 1 .459.233c.125.123.216.277.264.446.04.17.04.346 0 .516-.031.174-.1.339-.201.484l-.453.628a.152.152 0 0 1-.22 0l-2.37-1.917-2.262-1.81a.1.1 0 0 1 0-.138l3.256-4.338c.22-.301.704-.182.71.132Z' fill='%23FFA000'/%3e%3cpath d='M21.402 2.28 16.07.146a1.955 1.955 0 0 0-1.484 0L8.665 2.49c.24-.067-.08.013 0 0 0 0 .08.009 0-.004L3.162.315A1.324 1.324 0 0 0 1.34 1.56v12.773a2 2 0 0 0 1.253 1.858l5.334 2.133a2.01 2.01 0 0 0 1.484 0l2.551-1.04a.67.67 0 1 0-.497-1.244l-2.134.889V3.706l.071-.03 5.263-2.125v5.786a.667.667 0 1 0 1.333 0V1.551l4.907 1.964a.676.676 0 0 1 .426.622v3.867a.667.667 0 0 0 1.334 0V4.137a1.992 1.992 0 0 0-1.263-1.857ZM3.082 14.955a.667.667 0 0 1-.417-.622V1.551l5.333 2.124v13.227l-4.916-1.947Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--power_outage-orange-color":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='m21.717 23.254-19.434-.02a2.238 2.238 0 0 1-2-3.33l9.748-17.98a2.24 2.24 0 0 1 3.938 0l9.748 18a2.241 2.241 0 0 1-2 3.33ZM12.03 2.234a.77.77 0 0 0-.66.39l-9.737 18a.75.75 0 0 0 0 .74.77.77 0 0 0 .65.37h19.494a.77.77 0 0 0 .65-.37.78.78 0 0 0 0-.74l-9.747-18a.77.77 0 0 0-.65-.39Z' fill='black'/%3e%3cpath d='m15.558 16.525-7.043-5.634a.566.566 0 0 0-.838.09.532.532 0 0 0 .108.787l1.256 1.007a.057.057 0 0 1 0 .079l-.464.69a1.013 1.013 0 0 0-.159 1.03.89.89 0 0 0 .657.48l1.352.215a.108.108 0 0 1 .094.081c.004.014.004.03.002.044l-.696 4.752a.305.305 0 0 0 .187.334.311.311 0 0 0 .362-.108l3.004-4.04a.062.062 0 0 1 .084 0l1.364 1.036a.513.513 0 0 0 .764-.068.52.52 0 0 0-.034-.775ZM13.98 7.276c.005.283-.617 4.243-.72 4.865a.092.092 0 0 0 .02.067.091.091 0 0 0 .06.035l1.375.22a.724.724 0 0 1 .413.21c.113.11.194.249.237.401a.991.991 0 0 1 0 .464c-.028.157-.09.305-.18.436l-.408.566a.137.137 0 0 1-.153.031.137.137 0 0 1-.045-.031l-2.133-1.726-2.036-1.63a.09.09 0 0 1 0-.124l2.93-3.903c.198-.272.634-.164.64.119Z' fill='%23FFA000'/%3e%3c/svg%3e",
     "e-icon--power_service":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M17.2 10.5c-3.7 0-6.6 2.7-6.8 6.3H6.3c-3.3 0-4.8-3.1-4.8-6 0-1.7.5-3.3 1.3-4.4.9-1.3 2.3-1.9 3.9-1.9h1.5c.3 1.7 1.9 3 3.7 3h1.5c1 0 1.8-.6 2.1-1.5H18c.4 0 .8-.3.8-.8s-.4-.7-.8-.7h-2.2V3H18c.4 0 .8-.3.8-.8s-.4-.7-.8-.7h-2.4C15.3.7 14.5 0 13.5 0H12c-1.8 0-3.3 1.3-3.7 3H6.8c-2.1 0-3.9.9-5.1 2.5C.6 7 0 8.8 0 10.9c0 3.7 2.2 7.5 6.3 7.5h4.2c.6 3.2 3.4 5.6 6.7 5.6 3.8 0 6.8-3.1 6.8-6.8 0-3.7-3-6.7-6.8-6.7ZM12 1.6h1.5c.4 0 .8.3.8.8v3c-.1.3-.4.6-.8.6H12c-1.2 0-2.2-1-2.2-2.2 0-1.2 1-2.2 2.2-2.2Zm5.2 20.8c-2.8 0-5.2-2.4-5.2-5.2 0-2.8 2.3-5.2 5.2-5.2 2.9 0 5.2 2.4 5.2 5.2 0 2.8-2.4 5.2-5.2 5.2Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M18.001 17.2c0 .5-.3.8-.8.8-.4 0-.8-.3-.8-.8v-3c0-.4.3-.8.8-.8s.8.3.8.8v3ZM16.1 19.9c0-.6.5-1.1 1.1-1.1.6 0 1.1.5 1.1 1.1 0 .6-.5 1.1-1.1 1.1-.6 0-1.1-.5-1.1-1.1Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--power_service-color":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M17.2 10.5c-3.7 0-6.6 2.7-6.8 6.3H6.3c-3.3 0-4.8-3.1-4.8-6 0-1.7.5-3.3 1.3-4.4.9-1.3 2.3-1.9 3.9-1.9h1.5c.3 1.7 1.9 3 3.7 3h1.5c1 0 1.8-.6 2.1-1.5H18c.4 0 .8-.3.8-.8s-.4-.7-.8-.7h-2.2V3H18c.4 0 .8-.3.8-.8s-.4-.7-.8-.7h-2.4C15.3.7 14.5 0 13.5 0H12c-1.8 0-3.3 1.3-3.7 3H6.8c-2.1 0-3.9.9-5.1 2.5C.6 7 0 8.8 0 10.9c0 3.7 2.2 7.5 6.3 7.5h4.2c.6 3.2 3.4 5.6 6.7 5.6 3.8 0 6.8-3.1 6.8-6.8 0-3.7-3-6.7-6.8-6.7ZM12 1.6h1.5c.4 0 .8.3.8.8v3c-.1.3-.4.6-.8.6H12c-1.2 0-2.2-1-2.2-2.2 0-1.2 1-2.2 2.2-2.2Zm5.2 20.8c-2.8 0-5.2-2.4-5.2-5.2 0-2.8 2.3-5.2 5.2-5.2 2.9 0 5.2 2.4 5.2 5.2 0 2.8-2.4 5.2-5.2 5.2Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M18.001 17.2c0 .5-.3.8-.8.8-.4 0-.8-.3-.8-.8v-3c0-.4.3-.8.8-.8s.8.3.8.8v3ZM16.1 19.9c0-.6.5-1.1 1.1-1.1.6 0 1.1.5 1.1 1.1 0 .6-.5 1.1-1.1 1.1-.6 0-1.1-.5-1.1-1.1Z' fill='%2329D305'/%3e%3c/svg%3e",
     "e-icon--power-color":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='m6.98 10.407-.825 1.227a1.8 1.8 0 0 0-.281 1.83 1.579 1.579 0 0 0 1.166.855l2.404.382a.191.191 0 0 1 .17.221L8.379 23.37a.543.543 0 0 0 .332.594.553.553 0 0 0 .643-.191L15.12 16l2.782-3.602c.162-.232.272-.496.322-.774a1.758 1.758 0 0 0 0-.825 1.61 1.61 0 0 0-.423-.714 1.287 1.287 0 0 0-.734-.372l-2.444-.393a.16.16 0 0 1-.14-.18C14.662 8.032 15.77.992 15.76.49c-.01-.503-.785-.694-1.137-.211L9.62 7l-2.64 3.407Z' fill='%2329D305'/%3e%3c/svg%3e",
     "e-icon--powerline":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M14.945 4.175H13.76l-5.22 3.91V21.96a.71.71 0 1 1-1.42 0V8.085L1.9 4.17H.715a.71.71 0 1 1 0-1.42h.71v-.71c0-.395.325-.71.715-.71.39 0 .71.315.71.71v.71h1.42v-.71c0-.395.33-.71.72-.71.39 0 .71.315.71.71v.71h4.27v-.71a.71.71 0 1 1 1.42 0v.71h1.425v-.71a.71.71 0 1 1 1.42 0v.71h.71c.395 0 .71.325.71.715a.71.71 0 0 1-.71.71ZM7.83 6.845l3.555-2.67H4.27l3.56 2.67Zm15.44 6.166a.714.714 0 0 1 .73.709.72.72 0 0 1-.74.715 15.53 15.53 0 0 1-12.19-5.86.714.714 0 0 1 .11-1 .714.714 0 0 1 1 .11 14.12 14.12 0 0 0 11.08 5.325l.01.001Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--powerline-color":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M13.76 4.175h1.185a.71.71 0 0 0 .71-.71.714.714 0 0 0-.71-.715h-.71v-.71a.71.71 0 1 0-1.42 0v.71H11.39v-.71a.71.71 0 1 0-1.42 0v.71H5.7v-.71a.71.71 0 0 0-.71-.71c-.39 0-.72.315-.72.71v.71H2.85v-.71a.71.71 0 0 0-.71-.71.714.714 0 0 0-.715.71v.71h-.71a.71.71 0 1 0 0 1.42H1.9l5.22 3.915V21.96a.71.71 0 1 0 1.42 0V8.085l5.22-3.91Zm-2.375 0L7.83 6.845l-3.56-2.67h7.115Z' fill='black'/%3e%3cpath d='M23.285 13.01c-.01.005-.015 0-.025 0a14.12 14.12 0 0 1-11.08-5.325.714.714 0 0 0-1-.11.714.714 0 0 0-.11 1 15.53 15.53 0 0 0 12.19 5.86c.4.01.74-.31.74-.715a.714.714 0 0 0-.715-.71Z' fill='%2329D305'/%3e%3c/svg%3e",
     "e-icon--powermeter_ams":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M4.79 0h14.32c.995 0 1.79.797 1.89 1.793v20.415C21 23.203 19.994 24 19 24H4.79C3.796 24 3 23.203 3 22.207V1.793C3 .797 3.796 0 4.79 0Zm13.662 22.5c1.048 0 1.048-.9 1.048-1v-9.54H4.492L4.5 21.5c0 .1 0 1 1 1h12.952ZM4.492 10.615H19.5V2.5c0-1-.9-1-1-1h-13c-1 0-1 .9-1 1v-1l-.008 9.115Zm7.955 6.373c0 1.692-1.292 2.987-2.983 2.987-1.591 0-2.983-1.295-2.983-2.987C6.48 15.295 7.773 14 9.464 14c1.69 0 2.983 1.295 2.983 2.988Zm-1.491 0c0-.797-.696-1.494-1.492-1.494-.795 0-1.492.697-1.492 1.494 0 .796.697 1.493 1.492 1.493.796 0 1.492-.697 1.492-1.493Zm5.27-.797c.597 0 1.095-.498 1.095-1.096 0-.597-.498-1.095-1.095-1.095-.596 0-1.093.498-1.093 1.095 0 .598.497 1.096 1.094 1.096Zm0 3.784a1.095 1.095 0 1 0-.001-2.19 1.095 1.095 0 0 0 .002 2.19ZM13.657 4h-3.104v.918h2.172v1.02h-2.172v.92h2.172v1.224h-2.172V9h3.103V4ZM9.102 8.082H6.931V6.857h2.172V4H6v.918h2.172v1.02H6V9h3.103v-.918ZM18 5.939h-1.965v-1.02H18V4h-2.897v2.857h1.966v1.225h-1.966V9H18V5.939Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--powermeter_ams-color":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M4.79 0h14.32c.995 0 1.79.797 1.89 1.793v20.415C21 23.203 19.994 24 19 24H4.79C3.796 24 3 23.203 3 22.207V1.793C3 .797 3.796 0 4.79 0Zm13.662 22.5c1.048 0 1.048-.9 1.048-1v-9.54H4.492L4.5 21.5c0 .1 0 1 1 1h12.952ZM4.492 10.615H19.5V2.5c0-1-.9-1-1-1h-13c-1 0-1 .9-1 1v-1l-.008 9.115Zm7.955 6.373c0 1.692-1.292 2.987-2.983 2.987-1.591 0-2.983-1.295-2.983-2.987C6.48 15.295 7.773 14 9.464 14c1.69 0 2.983 1.295 2.983 2.988Zm-1.491 0c0-.797-.696-1.494-1.492-1.494-.795 0-1.492.697-1.492 1.494 0 .796.697 1.493 1.492 1.493.796 0 1.492-.697 1.492-1.493ZM13.656 4h-3.104v.918h2.172v1.02h-2.172v.92h2.172v1.224h-2.172V9h3.103V4ZM9.102 8.082H6.931V6.857h2.172V4H6v.918h2.172v1.02H6V9h3.103v-.918ZM18 5.939h-1.965v-1.02H18V4h-2.897v2.857h1.966v1.225h-1.966V9H18V5.939Z' fill='black'/%3e%3crect x='15.13' y='17.78' width='2.19' height='2.19' rx='1.095' fill='%2329D305'/%3e%3crect x='15.13' y='14' width='2.19' height='2.19' rx='1.095' fill='%2329D305'/%3e%3c/svg%3e",
     "e-icon--powermeter_old":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12 10.5c-.9 0-1.8.6-2.1 1.5H8.3c.4-1.7 1.9-3 3.7-3 .5 0 1 .1 1.5.2L16 5.5c.1-.2.3-.3.6-.3.1 0 .3 0 .4.1.1.1.3.3.3.5.1.2 0 .4-.1.6l-2.5 3.7c.5.5.9 1.2 1 1.9h-1.6c-.3-.9-1.2-1.5-2.1-1.5ZM16.2 17.2H7.8c-.4 0-.7-.3-.7-.7v-.1c0-.4.3-.7.7-.7h8.4c.4 0 .7.3.7.7v.1c0 .4-.3.7-.7.7Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M19.11 0H4.79C3.796 0 3 .797 3 1.793v20.415C3 23.203 3.796 24 4.79 24H19c.994 0 2-.797 2-1.793V1.793C20.9.797 20.105 0 19.11 0Zm.39 21.5c0 .1 0 1-1.048 1H5.5c-1 0-1-.9-1-1l-.008-8.156H19.5V21.5Zm0-9.5H4.492L4.5 4.297h15V12Zm0-9.012h-15V2.5c0-.1 0-1 1-1h13c.1 0 1 0 1 1v.488Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--powermeter-color":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12 10.5c-.9 0-1.8.6-2.1 1.5H8.3c.4-1.7 1.9-3 3.7-3 .5 0 1 .1 1.5.2L16 5.5c.1-.2.3-.3.6-.3.1 0 .3 0 .4.1.1.1.3.3.3.5.1.2 0 .4-.1.6l-2.5 3.7c.5.5.9 1.2 1 1.9h-1.6c-.3-.9-1.2-1.5-2.1-1.5Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M19.11 0H4.79C3.796 0 3 .797 3 1.793v20.415C3 23.203 3.796 24 4.79 24H19c.994 0 2-.797 2-1.793V1.793C20.9.797 20.105 0 19.11 0Zm.39 21.5c0 .1 0 1-1.048 1H5.5c-1 0-1-.9-1-1l-.008-8.156H19.5V21.5Zm0-9.5H4.492L4.5 4.297h15V12Zm0-9.012h-15V2.5c0-.1 0-1 1-1h13c.1 0 1 0 1 1v.488Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M7 16.25a.75.75 0 0 1 .75-.75h8.5a.75.75 0 0 1 0 1.5h-8.5a.75.75 0 0 1-.75-.75Z' fill='%2329D305'/%3e%3c/svg%3e",
     "e-icon--process-color":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='25' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M9.8 24h-9c-.3 0-.5-.2-.7-.4-.1-.3-.1-.6 0-.8l7.6-10.7L.1 1.2C0 1 0 .7.1.4.2.1.5 0 .8 0h9c.2 0 .5.1.6.3L19 11.6c.2.3.2.6 0 .9l-8.6 11.2c-.2.2-.4.3-.6.3Zm-7.6-1.5h7.2l8-10.4-8-10.5H2.2l7.1 10.2c.2.3.2.6 0 .9l-7.1 9.8Z' fill='black'/%3e%3cpath d='M15.4 24c-.2 0-.3 0-.4-.1-.3-.2-.4-.7-.2-1.1l7.6-10.7-7.6-10.9c-.2-.3-.2-.8.2-1 .4-.2.8-.1 1 .2l7.9 11.4c.2.3.2.6 0 .9l-7.9 11c-.2.2-.4.3-.6.3Z' fill='%2329D305'/%3e%3c/svg%3e",
     "e-icon--profile":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M6 6c0 3.308 2.692 6 6 6s6-2.692 6-6-2.692-6-6-6-6 2.692-6 6Zm1.5 0c0-2.481 2.019-4.5 4.5-4.5s4.5 2.019 4.5 4.5-2.019 4.5-4.5 4.5A4.505 4.505 0 0 1 7.5 6ZM21 23.25a.75.75 0 0 0 1.5 0c0-5.79-4.71-10.5-10.5-10.5S1.5 17.46 1.5 23.25a.75.75 0 0 0 1.5 0c0-4.963 4.037-9 9-9s9 4.037 9 9Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--profile-2":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M6 6c0 3.308 2.692 6 6 6s6-2.692 6-6-2.692-6-6-6-6 2.692-6 6Zm1.5 0c0-2.481 2.019-4.5 4.5-4.5s4.5 2.019 4.5 4.5-2.019 4.5-4.5 4.5A4.505 4.505 0 0 1 7.5 6ZM21 23.25a.75.75 0 0 0 1.5 0c0-5.79-4.71-10.5-10.5-10.5S1.5 17.46 1.5 23.25a.75.75 0 0 0 1.5 0c0-4.963 4.037-9 9-9s9 4.037 9 9Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--profile-2-color":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M6 6c0 3.308 2.692 6 6 6s6-2.692 6-6-2.692-6-6-6-6 2.692-6 6Zm1.5 0c0-2.481 2.019-4.5 4.5-4.5s4.5 2.019 4.5 4.5-2.019 4.5-4.5 4.5A4.505 4.505 0 0 1 7.5 6ZM21 23.25a.75.75 0 0 0 1.5 0c0-5.79-4.71-10.5-10.5-10.5S1.5 17.46 1.5 23.25a.75.75 0 0 0 1.5 0c0-4.963 4.037-9 9-9s9 4.037 9 9Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--profile-bold":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M7.96 6.17a4.032 4.032 0 1 1 8.065 0 4.032 4.032 0 0 1-8.065 0ZM11.992 0a6.17 6.17 0 1 0 0 12.34 6.17 6.17 0 0 0 0-12.34ZM6.05 16.988a8.405 8.405 0 0 1 14.348 5.943 1.069 1.069 0 1 0 2.138 0 10.542 10.542 0 1 0-21.085 0 1.069 1.069 0 0 0 2.138 0c0-2.229.885-4.367 2.461-5.943Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--question_circle":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12 15a.75.75 0 0 1-.75-.75v-1.006a2.251 2.251 0 0 1 1.5-2.122 2.254 2.254 0 0 0 1.5-2.121c0-.601-.234-1.166-.659-1.591A2.232 2.232 0 0 0 12 6.751c-.601 0-1.166.234-1.591.659A2.231 2.231 0 0 0 9.75 9a.75.75 0 0 1-1.5 0c0-1.002.391-1.943 1.099-2.651A3.725 3.725 0 0 1 12 5.251a3.755 3.755 0 0 1 3.75 3.75 3.756 3.756 0 0 1-2.5 3.535.752.752 0 0 0-.5.707v1.007A.75.75 0 0 1 12 15ZM12 18.75a1.125 1.125 0 1 0 0-2.25 1.125 1.125 0 0 0 0 2.25Z' fill='black'/%3e%3cpath d='M12 24C5.383 24 0 18.617 0 12S5.383 0 12 0s12 5.383 12 12-5.383 12-12 12Zm0-22.5C6.21 1.5 1.5 6.21 1.5 12S6.21 22.5 12 22.5 22.5 17.79 22.5 12 17.79 1.5 12 1.5Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--question_circle-color":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12 15a.75.75 0 0 1-.75-.75v-1.006a2.251 2.251 0 0 1 1.5-2.122 2.254 2.254 0 0 0 1.5-2.121c0-.601-.234-1.166-.659-1.591A2.232 2.232 0 0 0 12 6.751c-.601 0-1.166.234-1.591.659A2.231 2.231 0 0 0 9.75 9a.75.75 0 0 1-1.5 0c0-1.002.391-1.943 1.099-2.651A3.725 3.725 0 0 1 12 5.251a3.755 3.755 0 0 1 3.75 3.75 3.756 3.756 0 0 1-2.5 3.535.752.752 0 0 0-.5.707v1.007A.75.75 0 0 1 12 15Z' fill='black'/%3e%3cpath d='M12 24C5.383 24 0 18.617 0 12S5.383 0 12 0s12 5.383 12 12-5.383 12-12 12Zm0-22.5C6.21 1.5 1.5 6.21 1.5 12S6.21 22.5 12 22.5 22.5 17.79 22.5 12 17.79 1.5 12 1.5Z' fill='black'/%3e%3cpath d='M12 18.75a1.125 1.125 0 1 0 0-2.25 1.125 1.125 0 0 0 0 2.25Z' fill='%2329D305'/%3e%3c/svg%3e",
     "e-icon--question_circle-filled-color":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12 24C5.383 24 0 18.617 0 12S5.383 0 12 0s12 5.383 12 12-5.383 12-12 12Z' fill='%2329D305'/%3e%3cpath d='M12 15a.75.75 0 0 1-.75-.75v-1.006a2.251 2.251 0 0 1 1.5-2.122 2.254 2.254 0 0 0 1.5-2.121c0-.601-.234-1.166-.659-1.591A2.232 2.232 0 0 0 12 6.751c-.601 0-1.166.234-1.591.659A2.231 2.231 0 0 0 9.75 9a.75.75 0 0 1-1.5 0c0-1.002.391-1.943 1.099-2.651A3.725 3.725 0 0 1 12 5.251a3.755 3.755 0 0 1 3.75 3.75 3.756 3.756 0 0 1-2.5 3.535.752.752 0 0 0-.5.707v1.007A.75.75 0 0 1 12 15ZM12 18.75a1.125 1.125 0 1 0 0-2.25 1.125 1.125 0 0 0 0 2.25Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--quotation-color":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M4.54 14.584a5.322 5.322 0 0 1 .792-10.582 5.32 5.32 0 0 1 3.772 9.085l-.004.003-6.608 6.593a1.084 1.084 0 0 1-1.532 0 1.078 1.078 0 0 1 0-1.528l3.58-3.572Zm9.755 3.569 3.58-3.571A5.32 5.32 0 0 1 18.667 4a5.32 5.32 0 0 1 3.772 9.085l-.003.003-6.61 6.594a1.084 1.084 0 0 1-1.531 0 1.079 1.079 0 0 1 0-1.529Z' fill='%2329D305'/%3e%3c/svg%3e",
     "e-icon--refresh":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M11.193 23.25c1.48 0 2.926-.29 4.296-.862a.803.803 0 0 0-.616-1.485 9.518 9.518 0 0 1-3.682.74 9.538 9.538 0 0 1-6.633-2.669 9.564 9.564 0 0 1-2.952-6.735 9.566 9.566 0 0 1 2.653-6.86 9.493 9.493 0 0 1 6.93-2.963c2.484 0 4.838.945 6.628 2.664a9.59 9.59 0 0 1 2.935 6.252 9.608 9.608 0 0 1-1.563 5.991v-2.915a.803.803 0 0 0-.802-.804.803.803 0 0 0-.801.804v4.823c0 .444.359.804.802.804h.254a.397.397 0 0 0 .102 0h4.454a.803.803 0 0 0 0-1.608H20.38a11.241 11.241 0 0 0 1.998-6.649 11.27 11.27 0 0 0-.05-.816l-.008-.081c-.006-.07-.012-.14-.02-.211l-.006-.049a11.31 11.31 0 0 0-3.376-6.748A11.171 11.171 0 0 0 11.152.75c-1.48 0-2.927.288-4.296.858a.792.792 0 0 0-.278.192A11.099 11.099 0 0 0 3.1 4.268c-4.267 4.471-4.11 11.59.35 15.868a11.134 11.134 0 0 0 7.74 3.114h.003v.001Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--remove_circle":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M15.97 17.03a.746.746 0 0 0 1.06.001.752.752 0 0 0 0-1.061L13.06 12l3.97-3.97a.743.743 0 0 0 .22-.53c0-.2-.078-.389-.22-.53a.744.744 0 0 0-1.06 0L12 10.94 8.03 6.97a.743.743 0 0 0-.53-.22c-.2 0-.389.078-.53.22a.743.743 0 0 0-.22.53c0 .2.078.389.22.53L10.94 12l-3.97 3.97a.752.752 0 0 0 .53 1.281c.2 0 .388-.078.53-.22l3.97-3.97 3.97 3.969Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M0 12c0 6.617 5.383 12 12 12s12-5.383 12-12S18.617 0 12 0 0 5.383 0 12Zm1.5 0C1.5 6.21 6.21 1.5 12 1.5S22.5 6.21 22.5 12 17.79 22.5 12 22.5 1.5 17.79 1.5 12Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--remove_circle-color":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12 24C5.383 24 0 18.617 0 12S5.383 0 12 0s12 5.383 12 12-5.383 12-12 12Zm0-22.5C6.21 1.5 1.5 6.21 1.5 12S6.21 22.5 12 22.5 22.5 17.79 22.5 12 17.79 1.5 12 1.5Z' fill='%2329D305'/%3e%3cpath d='M16.5 17.25a.743.743 0 0 1-.53-.22L12 13.061l-3.97 3.97a.744.744 0 0 1-1.06 0 .752.752 0 0 1 0-1.061L10.94 12 6.97 8.03a.743.743 0 0 1-.22-.53c0-.2.078-.389.22-.53a.743.743 0 0 1 .53-.22c.2 0 .389.078.53.22L12 10.94l3.97-3.97a.744.744 0 0 1 1.06 0c.142.141.22.33.22.53s-.078.389-.22.53L13.06 12l3.97 3.97a.752.752 0 0 1 0 1.061.746.746 0 0 1-.53.219Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--remove_circle-filled":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M0 12c0 6.617 5.383 12 12 12s12-5.383 12-12S18.617 0 12 0 0 5.383 0 12Z' fill='black'/%3e%3cpath d='M16.5 17.25a.743.743 0 0 1-.53-.22L12 13.061l-3.97 3.97a.744.744 0 0 1-1.06 0 .752.752 0 0 1 0-1.061L10.94 12 6.97 8.03a.743.743 0 0 1-.22-.53c0-.2.078-.389.22-.53a.743.743 0 0 1 .53-.22c.2 0 .389.078.53.22L12 10.94l3.97-3.97a.744.744 0 0 1 1.06 0c.142.141.22.33.22.53s-.078.389-.22.53L13.06 12l3.97 3.97a.752.752 0 0 1 0 1.061.746.746 0 0 1-.53.219Z' fill='white'/%3e%3c/svg%3e",
     "e-icon--remove_circle-filled-color":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M0 12c0 6.617 5.383 12 12 12s12-5.383 12-12S18.617 0 12 0 0 5.383 0 12Z' fill='%2329D305'/%3e%3cpath d='M16.5 17.25a.743.743 0 0 1-.53-.22L12 13.061l-3.97 3.97a.744.744 0 0 1-1.06 0 .752.752 0 0 1 0-1.061L10.94 12 6.97 8.03a.743.743 0 0 1-.22-.53c0-.2.078-.389.22-.53a.743.743 0 0 1 .53-.22c.2 0 .389.078.53.22L12 10.94l3.97-3.97a.744.744 0 0 1 1.06 0c.142.141.22.33.22.53s-.078.389-.22.53L13.06 12l3.97 3.97a.752.752 0 0 1 0 1.061.746.746 0 0 1-.53.219Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--renewable_energy":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M21.22 7.466a.782.782 0 0 0 1.318-.842 10.962 10.962 0 0 0-7.55-4.93.78.78 0 0 0-.892.653.784.784 0 0 0 .654.894 9.395 9.395 0 0 1 6.47 4.225ZM3.578 17.568a10.916 10.916 0 0 0 9.723 5.91h.004c.273 0 .555-.01.84-.031a.78.78 0 0 0 .723-.838.785.785 0 0 0-.838-.723c-.247.018-.49.027-.729.027a9.356 9.356 0 0 1-8.333-5.065.78.78 0 0 0-1.441.123.776.776 0 0 0 .051.597ZM7.043 10.174a3.134 3.134 0 0 1-3.13-3.13 3.134 3.134 0 0 1 3.13-3.13 3.134 3.134 0 0 1 3.13 3.13 3.134 3.134 0 0 1-3.13 3.13Zm0-4.696c-.862 0-1.565.703-1.565 1.566 0 .862.703 1.565 1.566 1.565.862 0 1.565-.703 1.565-1.565 0-.863-.703-1.566-1.566-1.566ZM7.043 3.13a.783.783 0 0 1-.782-.782V.783a.783.783 0 0 1 1.565 0v1.565a.784.784 0 0 1-.782.782ZM11.74 7.826a.783.783 0 0 1 0-1.565h1.564a.783.783 0 0 1 0 1.565H11.74ZM7.043 14.087a.783.783 0 0 1-.782-.783V11.74a.783.783 0 0 1 1.565 0v1.565a.784.784 0 0 1-.782.783ZM.783 7.826a.783.783 0 0 1 0-1.565h1.565a.783.783 0 0 1 0 1.565H.783ZM3.723 4.506a.775.775 0 0 1-.553-.23L2.063 3.17a.777.777 0 0 1 0-1.106.775.775 0 0 1 .553-.23c.209 0 .406.082.553.23L4.276 3.17a.777.777 0 0 1 0 1.106.777.777 0 0 1-.553.23ZM10.364 4.506a.775.775 0 0 1-.553-.23.775.775 0 0 1-.23-.553c0-.208.082-.406.23-.553l1.107-1.107a.777.777 0 0 1 1.106 0c.148.147.23.344.23.553a.775.775 0 0 1-.23.553l-1.107 1.107a.777.777 0 0 1-.553.23ZM11.471 12.253a.775.775 0 0 1-.553-.23L9.81 10.918a.775.775 0 0 1-.23-.553c0-.209.082-.406.23-.553a.775.775 0 0 1 .553-.23c.209 0 .406.081.553.23l1.107 1.107c.148.147.23.344.23.553a.775.775 0 0 1-.23.553.772.772 0 0 1-.552.23ZM2.616 12.253a.775.775 0 0 1-.553-.23.775.775 0 0 1-.23-.552c0-.209.082-.406.23-.553L3.17 9.81a.775.775 0 0 1 .553-.23c.209 0 .406.081.553.23.148.147.23.344.23.553a.775.775 0 0 1-.23.553L3.17 12.024a.775.775 0 0 1-.553.23ZM17.232 17.302l.46-.665 1.475-1.845 2.795-3.64c.196-.262.629-.159.634.114.006.272-.612 4.085-.713 4.684a.085.085 0 0 0 .018.066.088.088 0 0 0 .06.033l1.366.212c.155.022.3.093.41.202.112.106.193.24.236.386.036.147.036.3 0 .447a1.04 1.04 0 0 1-.18.42l-1.554 1.95-3.22 4.21a.318.318 0 0 1-.36.104.3.3 0 0 1-.151-.129.287.287 0 0 1-.035-.192l.691-4.576a.1.1 0 0 0-.02-.08.106.106 0 0 0-.075-.04l-1.343-.207a.898.898 0 0 1-.383-.155.863.863 0 0 1-.268-.308.948.948 0 0 1 .157-.991Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--renewable_energy-color":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M21.22 7.466a.782.782 0 0 0 1.318-.842 10.962 10.962 0 0 0-7.55-4.93.78.78 0 0 0-.892.653.784.784 0 0 0 .654.894 9.395 9.395 0 0 1 6.47 4.225ZM3.578 17.568a10.916 10.916 0 0 0 9.723 5.91h.004c.273 0 .555-.01.84-.031a.78.78 0 0 0 .723-.838.785.785 0 0 0-.838-.723c-.247.018-.49.027-.729.027a9.356 9.356 0 0 1-8.333-5.065.78.78 0 0 0-1.441.123.776.776 0 0 0 .051.597ZM7.043 10.174a3.134 3.134 0 0 1-3.13-3.13 3.134 3.134 0 0 1 3.13-3.13 3.134 3.134 0 0 1 3.13 3.13 3.134 3.134 0 0 1-3.13 3.13Zm0-4.696c-.862 0-1.565.703-1.565 1.566 0 .862.703 1.565 1.566 1.565.862 0 1.565-.703 1.565-1.565 0-.863-.703-1.566-1.566-1.566ZM7.043 3.13a.783.783 0 0 1-.782-.782V.783a.783.783 0 0 1 1.565 0v1.565a.784.784 0 0 1-.782.782ZM11.74 7.826a.783.783 0 0 1 0-1.565h1.564a.783.783 0 0 1 0 1.565H11.74ZM7.043 14.087a.783.783 0 0 1-.782-.783V11.74a.783.783 0 0 1 1.565 0v1.565a.784.784 0 0 1-.782.783ZM.783 7.826a.783.783 0 0 1 0-1.565h1.565a.783.783 0 0 1 0 1.565H.783ZM3.723 4.506a.775.775 0 0 1-.553-.23L2.063 3.17a.777.777 0 0 1 0-1.106.775.775 0 0 1 .553-.23c.209 0 .406.082.553.23L4.276 3.17a.777.777 0 0 1 0 1.106.777.777 0 0 1-.553.23ZM10.364 4.506a.775.775 0 0 1-.553-.23.775.775 0 0 1-.23-.553c0-.208.082-.406.23-.553l1.107-1.107a.777.777 0 0 1 1.106 0c.148.147.23.344.23.553a.775.775 0 0 1-.23.553l-1.107 1.107a.777.777 0 0 1-.553.23ZM11.471 12.253a.775.775 0 0 1-.553-.23L9.81 10.918a.775.775 0 0 1-.23-.553c0-.209.082-.406.23-.553a.775.775 0 0 1 .553-.23c.209 0 .406.081.553.23l1.107 1.107c.148.147.23.344.23.553a.775.775 0 0 1-.23.553.772.772 0 0 1-.552.23ZM2.616 12.253a.775.775 0 0 1-.553-.23.775.775 0 0 1-.23-.552c0-.209.082-.406.23-.553L3.17 9.81a.775.775 0 0 1 .553-.23c.209 0 .406.081.553.23.148.147.23.344.23.553a.775.775 0 0 1-.23.553L3.17 12.024a.775.775 0 0 1-.553.23Z' fill='black'/%3e%3cpath d='m17.232 17.302.46-.665 1.475-1.845 2.795-3.64c.196-.262.629-.159.634.114.006.272-.612 4.085-.713 4.684a.085.085 0 0 0 .018.066.088.088 0 0 0 .06.033l1.366.212c.155.022.3.093.41.202.112.106.193.24.236.386.036.147.036.3 0 .447a1.04 1.04 0 0 1-.18.42l-1.554 1.95-3.22 4.21a.318.318 0 0 1-.36.104.3.3 0 0 1-.151-.129.287.287 0 0 1-.035-.192l.691-4.576a.1.1 0 0 0-.02-.08.106.106 0 0 0-.075-.04l-1.343-.207a.898.898 0 0 1-.383-.155.863.863 0 0 1-.268-.308.948.948 0 0 1 .157-.991Z' fill='%2329D305'/%3e%3c/svg%3e",
     "e-icon--reset":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M.75 12.739c0-1.493.301-2.886.904-4.28.1-.199.2-.398.402-.398.2-.1.402-.1.602 0 .302.1.503.398.503.697 0 .1 0 .199-.1.299-.503 1.194-.704 2.388-.704 3.682 0 2.488.904 4.777 2.712 6.568 1.808 1.792 4.219 2.887 6.73 2.986 2.612.1 5.022-.896 6.93-2.687 1.91-1.792 3.014-4.28 3.014-6.867 0-2.488-.904-4.777-2.712-6.569-1.707-1.691-4.018-2.786-6.328-2.985-2.11-.1-4.219.398-6.027 1.592H9.59c.402 0 .804.398.804.796s-.402.796-.804.796H4.768c-.402 0-.804-.398-.804-.796V.796c0-.398.302-.796.804-.796s.803.398.803.796v2.787c1.909-1.294 4.32-2.09 6.63-1.99.2 0 .502 0 .803.099H13.306c2.712.298 5.022 1.493 6.83 3.384a11.196 11.196 0 0 1 3.114 7.762c0 1.493-.301 2.887-.904 4.28 0 .1-.1.199-.2.298-.604 1.294-1.407 2.488-2.512 3.484-4.52 4.28-11.652 4.08-15.971-.299C1.855 18.411.75 15.625.75 12.74Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--rotate_right":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M7.8 11.556a.258.258 0 0 0-.257.259v10.37c0 .143.115.26.257.26h14.4a.258.258 0 0 0 .257-.26v-10.37a.258.258 0 0 0-.257-.26H7.8Zm-1.8.259C6 10.813 6.806 10 7.8 10h14.4c.994 0 1.8.813 1.8 1.815v10.37A1.807 1.807 0 0 1 22.2 24H7.8c-.994 0-1.8-.813-1.8-1.815v-10.37ZM8.559 7.693A.75.75 0 0 0 9.6 7.498l2.418-3.533a.75.75 0 0 0-.152-1.01L8.503.28a.75.75 0 1 0-.933 1.174l2.817 2.24L8.363 6.65a.75.75 0 0 0 .196 1.043Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M.506 10.421a.75.75 0 0 0 .953-.465 8.445 8.445 0 0 1 1.816-3.03A8.144 8.144 0 0 1 6.23 4.972a7.785 7.785 0 0 1 3.454-.48.75.75 0 0 0 .132-1.494 9.285 9.285 0 0 0-4.118.571 9.644 9.644 0 0 0-3.505 2.318l-.008.009A9.945 9.945 0 0 0 .04 9.468a.75.75 0 0 0 .465.953Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--rss-bold":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M8.353 19.291a3.642 3.642 0 1 1-7.285.001 3.642 3.642 0 0 1 7.285 0Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M6.896 9.722a9.843 9.843 0 0 0-5.421.285A1.112 1.112 0 1 1 .75 7.903a12.067 12.067 0 0 1 15.692 8.7 12.074 12.074 0 0 1-.349 6.646 1.112 1.112 0 1 1-2.103-.724A9.849 9.849 0 0 0 6.896 9.722Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M9.64 2.95a17.047 17.047 0 0 0-8.306-.384A1.112 1.112 0 1 1 .89.386a19.27 19.27 0 0 1 22.287 13.322c.919 3.047 1.07 6.273.44 9.392a1.112 1.112 0 1 1-2.18-.441A17.056 17.056 0 0 0 9.64 2.949Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--search":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='25' height='25' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5 9.75a.75.75 0 0 0-1.5 0 6.75 6.75 0 0 0 6.75 6.75.75.75 0 0 0 0-1.5A5.25 5.25 0 0 1 5 9.75Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M13.654 18.847a9.81 9.81 0 0 0 2.552-1.58l6.516 6.517a.75.75 0 0 0 1.06-1.061l-6.516-6.518a9.813 9.813 0 0 0 1.58-10.228C16.728.99 10.967-1.335 5.978.784.99 2.904-1.335 8.666.784 13.654c2.12 4.988 7.882 7.313 12.87 5.193ZM6.564 2.165a8.313 8.313 0 1 0 6.503 15.301A8.313 8.313 0 0 0 6.564 2.165Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--search-color":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='25' height='25' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M17.203 18.263a9.807 9.807 0 0 1-2.552 1.58c-4.988 2.12-10.75-.205-12.87-5.193C-.337 9.663 1.988 3.9 6.976 1.781c4.988-2.12 10.75.205 12.87 5.193a9.813 9.813 0 0 1-1.581 10.228l6.516 6.518a.75.75 0 0 1-1.06 1.06l-6.517-6.517Zm-14.04-4.2a8.313 8.313 0 1 1 15.3-6.502 8.313 8.313 0 0 1-15.3 6.503Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M5.25 10a.75.75 0 0 1 .75.75C6 13.65 8.35 16 11.25 16a.75.75 0 0 1 0 1.5 6.75 6.75 0 0 1-6.75-6.75.75.75 0 0 1 .75-.75Z' fill='%2329D305'/%3e%3c/svg%3e",
     "e-icon--search-bold":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M18.98 6.02C16.845.996 11.042-1.346 6.02.79.996 2.925-1.346 8.727.79 13.75c2.135 5.023 7.937 7.364 12.96 5.23a9.896 9.896 0 0 0 2.293-1.363l6.057 6.057a1.113 1.113 0 1 0 1.573-1.573l-6.057-6.058A9.88 9.88 0 0 0 18.98 6.019ZM6.89 2.837a7.657 7.657 0 1 1 5.99 14.094A7.657 7.657 0 0 1 6.89 2.838ZM4 9a1 1 0 1 1 2 0 5 5 0 0 0 5 5 1 1 0 1 1 0 2 7 7 0 0 1-7-7Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--search-bold-color":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M6.02.79c5.023-2.135 10.825.207 12.96 5.23a9.88 9.88 0 0 1-1.364 10.023l6.057 6.058a1.113 1.113 0 0 1-1.573 1.573l-6.057-6.057a9.896 9.896 0 0 1-2.293 1.363C8.727 21.114 2.925 18.773.79 13.75-1.345 8.727.997 2.925 6.02.79Zm10.912 6.1a7.657 7.657 0 1 0-14.094 5.99 7.657 7.657 0 0 0 14.093-5.99Z' fill='black'/%3e%3cpath d='M5 8a1 1 0 0 0-1 1 7 7 0 0 0 7 7 1 1 0 1 0 0-2 5 5 0 0 1-5-5 1 1 0 0 0-1-1Z' fill='%2329D305'/%3e%3c/svg%3e",
     "e-icon--season":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M22.572 9.608a.782.782 0 0 1-.581-.479 9.395 9.395 0 0 0-5.56-5.365.784.784 0 0 1-.475-1 .78.78 0 0 1 1-.474 10.962 10.962 0 0 1 6.489 6.26.784.784 0 0 1-.873 1.058ZM2.205 16.119c.266.04.489.212.598.457a9.395 9.395 0 0 0 5.753 5.159c.41.13.64.57.51.982a.78.78 0 0 1-.982.51 10.961 10.961 0 0 1-6.713-6.02.784.784 0 0 1 .834-1.088ZM7.044 10.174a3.134 3.134 0 0 1-3.13-3.13 3.134 3.134 0 0 1 3.13-3.13 3.134 3.134 0 0 1 3.13 3.13 3.134 3.134 0 0 1-3.13 3.13Zm0-4.696c-.863 0-1.566.703-1.566 1.566 0 .862.703 1.565 1.566 1.565.862 0 1.565-.703 1.565-1.565 0-.863-.703-1.566-1.565-1.566ZM7.043 3.13a.783.783 0 0 1-.782-.782V.783a.783.783 0 0 1 1.565 0v1.565a.784.784 0 0 1-.783.782ZM11.74 7.826a.783.783 0 0 1 0-1.565h1.564a.783.783 0 0 1 0 1.565H11.74ZM7.043 14.087a.783.783 0 0 1-.782-.783V11.74a.783.783 0 0 1 1.565 0v1.565a.784.784 0 0 1-.783.783ZM.783 7.826a.783.783 0 0 1 0-1.565h1.565a.783.783 0 0 1 0 1.565H.783ZM3.723 4.506a.775.775 0 0 1-.553-.23L2.063 3.17a.777.777 0 0 1 0-1.106.775.775 0 0 1 .553-.23c.209 0 .406.082.553.23L4.276 3.17a.777.777 0 0 1 0 1.106.777.777 0 0 1-.553.23ZM10.364 4.506a.775.775 0 0 1-.553-.23.775.775 0 0 1-.23-.553c0-.208.082-.406.23-.553l1.107-1.107a.777.777 0 0 1 1.106 0c.148.147.23.344.23.553a.775.775 0 0 1-.23.553l-1.107 1.107a.777.777 0 0 1-.553.23ZM11.471 12.253a.775.775 0 0 1-.553-.23L9.81 10.918a.775.775 0 0 1-.23-.553c0-.209.082-.406.23-.553a.775.775 0 0 1 .553-.23c.209 0 .406.081.553.23l1.107 1.107c.148.147.23.344.23.553a.775.775 0 0 1-.23.553.772.772 0 0 1-.552.23ZM2.616 12.253a.775.775 0 0 1-.553-.23.775.775 0 0 1-.23-.552c0-.209.082-.406.23-.553L3.17 9.81a.775.775 0 0 1 .553-.23c.209 0 .406.081.553.23.148.147.23.344.23.553a.775.775 0 0 1-.23.553L3.17 12.024a.775.775 0 0 1-.553.23Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M18.612 12.612a.612.612 0 0 0-1.224 0v1.55l-1.069-.712a.612.612 0 1 0-.679 1.019l1.748 1.165v1.754h-1.754l-1.165-1.748a.612.612 0 0 0-1.02.68l.713 1.068h-1.55a.612.612 0 0 0 0 1.224h1.55l-.712 1.069a.612.612 0 1 0 1.019.679l1.165-1.748h1.754v1.754l-1.748 1.165a.612.612 0 1 0 .68 1.02l1.068-.713v1.55a.612.612 0 0 0 1.224 0v-1.55l1.069.712a.612.612 0 1 0 .679-1.019l-1.748-1.165v-1.754h1.754l1.165 1.748a.612.612 0 0 0 1.02-.68l-.713-1.068h1.55a.612.612 0 0 0 0-1.224h-1.55l.712-1.069a.612.612 0 1 0-1.019-.68l-1.165 1.749h-1.754v-1.754l1.748-1.165a.612.612 0 1 0-.68-1.02l-1.068.713v-1.55Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--select_area":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cg clip-path='url(%23a)' fill-rule='evenodd' clip-rule='evenodd' fill='black'%3e%3cpath d='M3.751 1.497a2.25 2.25 0 0 0-2.25 2.25.75.75 0 0 1-1.5 0 3.75 3.75 0 0 1 3.75-3.75.75.75 0 0 1 0 1.5ZM.751 16.497a.75.75 0 0 1 .75.75 2.25 2.25 0 0 0 2.25 2.25.75.75 0 0 1 0 1.5 3.75 3.75 0 0 1-3.75-3.75.75.75 0 0 1 .75-.75ZM16.501.747a.75.75 0 0 1 .75-.75 3.75 3.75 0 0 1 3.75 3.75.75.75 0 0 1-1.5 0 2.25 2.25 0 0 0-2.25-2.25.75.75 0 0 1-.75-.75ZM20.251 7.497a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5a.75.75 0 0 1 .75-.75ZM.751 7.497a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5a.75.75 0 0 1 .75-.75ZM7.501.747a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75ZM7.501 20.247a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75ZM14.235 14.232a.75.75 0 0 1 .793-.172l8.486 3.182a.75.75 0 0 1 .032 1.391l-3.437 1.473-1.473 3.436a.75.75 0 0 1-1.391-.032l-3.182-8.485a.75.75 0 0 1 .172-.793Zm1.812 1.812 1.946 5.19.856-1.995a.75.75 0 0 1 .394-.393l1.995-.856-5.191-1.946Z'/%3e%3c/g%3e%3cdefs%3e%3cclipPath id='a'%3e%3cpath fill='white' d='M0 0h24v24H0z'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e",
     "e-icon--settings_vertical":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M16.5 5.265a.75.75 0 0 0-1.5 0v5.345a3.001 3.001 0 0 0-1.371 5.026 3 3 0 0 0 1.371.783v2.346a.75.75 0 1 0 1.5 0v-2.346a3.01 3.01 0 0 0 1.744-1.238A3 3 0 0 0 16.5 10.61V5.265Zm-.75 6.75a1.5 1.5 0 1 0 0 2.999 1.5 1.5 0 0 0 0-3ZM9 10.42a3 3 0 1 0-1.5 0v8.345a.75.75 0 1 0 1.5 0v-8.346Zm-.751-1.405a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 .001 3h-.001Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M2.25 0A2.25 2.25 0 0 0 0 2.25v19.5A2.25 2.25 0 0 0 2.25 24h19.5A2.25 2.25 0 0 0 24 21.75V2.25A2.25 2.25 0 0 0 21.75 0H2.25ZM1.5 2.25a.75.75 0 0 1 .75-.75h19.5a.75.75 0 0 1 .75.75v19.5a.75.75 0 0 1-.75.75H2.25a.75.75 0 0 1-.75-.75V2.25Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--shovel":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M19.022 1.747a.762.762 0 0 1 1.077 0l2.154 2.157a.762.762 0 0 1 0 1.075l-.009.008a2.285 2.285 0 1 1-3.231-3.231l.01-.01ZM19.561 0c-.604 0-1.183.239-1.611.664a3.807 3.807 0 0 0-.527 4.836l-7.02 7.019-3.23-3.232a.762.762 0 0 0-1.078 0l-4.31 4.307a6.096 6.096 0 0 0 8.621 8.62l4.309-4.309a.762.762 0 0 0 0-1.077l-1.616-1.615a.762.762 0 1 0-1.077 1.077l1.077 1.077-3.77 3.77a4.572 4.572 0 0 1-6.466-6.466l3.77-3.768 2.694 2.693-2.155 2.155a.762.762 0 1 0 1.077 1.077L18.5 6.577a3.808 3.808 0 0 0 4.836-.527 2.285 2.285 0 0 0-.005-3.222L21.177.669A2.286 2.286 0 0 0 19.56 0Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--smart_city":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='25' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M23.25 10.939a.751.751 0 0 1-.741-.71 8.788 8.788 0 0 0-8.627-8.218.74.74 0 0 1-.711-.78.75.75 0 0 1 .78-.731 10.259 10.259 0 0 1 10.069 9.648.74.74 0 0 1-.71.79h-.06ZM5.253 5.604H3.753v1.381h3.003v-1.38H5.254Zm.751-4.353v2.852h.8a1.431 1.431 0 0 1 1.502 1.311v1.571h.95a1.24 1.24 0 0 1 1.252 1.211v13.922h1.501v-7.176a1.491 1.491 0 0 1 1.501-1.431h3.753a1.491 1.491 0 0 1 1.502 1.471v7.136h2.252a.75.75 0 0 1 0 1.501H.75A.75.75 0 0 1 0 22.87V8.206a1.241 1.241 0 0 1 1.251-1.22h1V5.503a1.461 1.461 0 0 1 1.552-1.401h.7V1.251a.75.75 0 0 1 1.502 0Zm1.502 7.256H1.501v13.611h7.507V8.507H7.586a.758.758 0 0 1-.079 0Zm-4.285 2.642c.141.141.332.22.531.22h3.003a.75.75 0 1 0 0-1.501H3.753a.75.75 0 0 0-.53 1.281Zm.531 3.103a.75.75 0 0 1 0-1.502h3.003a.75.75 0 0 1 0 1.502H3.753Zm-.53 2.662c.14.14.331.22.53.22h3.003a.75.75 0 0 0 0-1.501H3.753a.75.75 0 0 0-.53 1.281Zm.53 3.102a.75.75 0 0 1 0-1.501h3.003a.75.75 0 0 1 0 1.501H3.753Zm14.471-8.142a.76.76 0 0 0 .522.216l-.01.02a.74.74 0 0 0 .73-.77 6.585 6.585 0 0 0-6.565-6.336.75.75 0 0 0 0 1.501 5.084 5.084 0 0 1 5.094 4.854.76.76 0 0 0 .23.515Zm-.96 10.244h-3.753v-7.146h3.753v7.146Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--smart_city-color":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='25' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M18.746 12.09a.76.76 0 0 1-.751-.73 5.084 5.084 0 0 0-5.094-4.855.75.75 0 0 1 0-1.501 6.585 6.585 0 0 1 6.565 6.335.74.74 0 0 1-.73.77l.01-.02ZM23.25 10.939a.751.751 0 0 1-.741-.71 8.788 8.788 0 0 0-8.627-8.218.74.74 0 0 1-.711-.78.75.75 0 0 1 .78-.731 10.259 10.259 0 0 1 10.069 9.648.74.74 0 0 1-.71.79h-.06Z' fill='%2329D305'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M5.254 5.604H3.753v1.381h3.003v-1.38H5.254Zm.751-4.353v2.852h.8a1.431 1.431 0 0 1 1.502 1.311v1.571h.95a1.24 1.24 0 0 1 1.252 1.211v13.922h1.501v-7.176a1.491 1.491 0 0 1 1.501-1.431h3.753a1.491 1.491 0 0 1 1.502 1.471v7.136h2.252a.75.75 0 0 1 0 1.501H.75A.75.75 0 0 1 0 22.87V8.206a1.241 1.241 0 0 1 1.251-1.22h1V5.503a1.461 1.461 0 0 1 1.552-1.401h.7V1.251a.75.75 0 0 1 1.502 0Zm1.502 7.256H1.501v13.611h7.507V8.507H7.586a.758.758 0 0 1-.079 0Zm-4.285 2.642c.141.141.332.22.531.22h3.003a.75.75 0 1 0 0-1.501H3.753a.75.75 0 0 0-.53 1.281Zm.531 3.103a.75.75 0 0 1 0-1.502h3.003a.75.75 0 0 1 0 1.502H3.753Zm-.53 2.662c.14.14.331.22.53.22h3.003a.75.75 0 0 0 0-1.501H3.753a.75.75 0 0 0-.53 1.281Zm.53 3.102a.75.75 0 0 1 0-1.501h3.003a.75.75 0 0 1 0 1.501H3.753Zm13.511 2.102h-3.753v-7.146h3.753v7.146Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--solar_panel":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M7.5 1.5a.75.75 0 0 0 1.5 0V.75a.75.75 0 0 0-1.5 0v.75ZM4.9 12a.75.75 0 0 1-.557-.247 5.215 5.215 0 0 1-1.342-3.788 5.213 5.213 0 0 1 1.73-3.627 5.236 5.236 0 0 1 3.51-1.346c1.488 0 2.911.632 3.904 1.734.249.276.468.579.652.9.1.175.125.377.073.57a.749.749 0 0 1-1.375.176 3.758 3.758 0 0 0-5.762-.92 3.724 3.724 0 0 0-1.235 2.59c-.052 1 .288 1.962.958 2.706A.752.752 0 0 1 4.9 12Zm11.6 12a.75.75 0 0 1-.75-.75V21h-3v2.25a.75.75 0 0 1-1.5 0V21H6.313c-.401 0-.777-.156-1.06-.439a1.489 1.489 0 0 1-.352-1.563l3.214-9A1.5 1.5 0 0 1 9.527 9h9.114c.602 0 1.143.357 1.379.911l1.707 3.983c.021.039.039.08.053.123l2.098 4.893A1.502 1.502 0 0 1 22.5 21h-5.25v2.25a.75.75 0 0 1-.75.75ZM6.314 19.502 13.5 19.5V15H7.922l-1.608 4.502ZM22.5 19.5 20.57 15H15v4.5h7.5Zm-2.573-6-1.286-3H15v3h4.927Zm-6.427 0v-3H9.529l-1.071 3H13.5Zm0-9a.743.743 0 0 1-.53-.22.743.743 0 0 1-.22-.53c0-.2.078-.389.22-.53l.75-.75a.744.744 0 0 1 1.06 0c.142.141.22.33.22.53s-.078.389-.22.53l-.75.75a.744.744 0 0 1-.53.22ZM2.47 4.28a.744.744 0 0 0 1.06 0 .743.743 0 0 0 .22-.53c0-.2-.078-.389-.22-.53l-.75-.75a.743.743 0 0 0-.53-.22c-.2 0-.389.078-.53.22A.743.743 0 0 0 1.5 3c0 .2.078.389.22.53l.75.75ZM.75 9a.75.75 0 0 1 0-1.5h.75a.75.75 0 0 1 0 1.5H.75Zm.97 5.03a.748.748 0 0 0 1.06.001l.75-.75A.752.752 0 0 0 3 12a.744.744 0 0 0-.53.219l-.75.75a.752.752 0 0 0 0 1.061Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--solar_panel-color":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M16.5 24a.75.75 0 0 1-.75-.75V21h-3v2.25a.75.75 0 0 1-1.5 0V21H6.313c-.401 0-.777-.156-1.06-.439a1.489 1.489 0 0 1-.352-1.563l3.214-9A1.5 1.5 0 0 1 9.527 9h9.114c.602 0 1.143.357 1.379.911l1.707 3.983c.021.039.039.08.053.123l2.098 4.893A1.502 1.502 0 0 1 22.5 21h-5.25v2.25a.75.75 0 0 1-.75.75ZM6.314 19.502 13.5 19.5V15H7.922l-1.608 4.502ZM22.5 19.5 20.57 15H15v4.5h7.5Zm-2.573-6-1.286-3H15v3h4.927Zm-6.427 0v-3H9.529l-1.071 3H13.5Z' fill='black'/%3e%3cpath d='M4.9 12a.75.75 0 0 1-.557-.247 5.215 5.215 0 0 1-1.342-3.788 5.213 5.213 0 0 1 1.73-3.627 5.236 5.236 0 0 1 3.51-1.346c1.488 0 2.911.632 3.904 1.734.249.276.468.579.652.9.1.175.125.377.073.57a.749.749 0 0 1-1.375.176 3.758 3.758 0 0 0-5.762-.92 3.724 3.724 0 0 0-1.235 2.59c-.052 1 .288 1.962.958 2.706A.752.752 0 0 1 4.9 12Z' fill='black'/%3e%3cpath d='M8.25 2.25a.75.75 0 0 1-.75-.75V.75a.75.75 0 0 1 1.5 0v.75a.75.75 0 0 1-.75.75ZM13.5 4.5a.743.743 0 0 1-.53-.22.743.743 0 0 1-.22-.53c0-.2.078-.389.22-.53l.75-.75a.744.744 0 0 1 1.06 0c.142.141.22.33.22.53s-.078.389-.22.53l-.75.75a.744.744 0 0 1-.53.22ZM3 4.5a.743.743 0 0 1-.53-.22l-.75-.75A.743.743 0 0 1 1.5 3c0-.2.078-.389.22-.53a.743.743 0 0 1 .53-.22c.2 0 .389.078.53.22l.75.75c.142.141.22.33.22.53s-.078.389-.22.53A.744.744 0 0 1 3 4.5ZM.75 9a.75.75 0 0 1 0-1.5h.75a.75.75 0 0 1 0 1.5H.75ZM2.25 14.25a.752.752 0 0 1-.53-1.281l.75-.75A.744.744 0 0 1 3 12a.752.752 0 0 1 .53 1.281l-.75.75a.748.748 0 0 1-.53.219Z' fill='%2329D305'/%3e%3c/svg%3e",
     "e-icon--sorting_ascending-bold":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M11.596.08a1.043 1.043 0 0 0-.339.228l-4.76 4.76A1.048 1.048 0 1 0 7.978 6.55l2.974-2.973v19.375a1.048 1.048 0 1 0 2.095 0V3.577l2.974 2.973a1.048 1.048 0 1 0 1.481-1.481L12.74.307A1.044 1.044 0 0 0 11.596.08Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--sorting_descending-bold":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M11.6 23.92a1.044 1.044 0 0 0 1.143-.229l4.76-4.76a1.048 1.048 0 0 0-1.481-1.481l-2.974 2.973V1.048a1.048 1.048 0 1 0-2.095 0v19.375L7.979 17.45a1.048 1.048 0 0 0-1.481 1.481l4.762 4.762c.1.1.216.177.34.228Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--sorting_alfabetical_a_to_z":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='m15.604 23.469 3.021-7.177h1.527l2.977 7.177h-1.417l-.791-2.01h-3.153l-.79 2.01h-1.374Zm2.549-2.974h2.405l-1.208-3.034-1.197 3.035Zm1.23-4.993a1.34 1.34 0 0 1-1.131-.594 1.107 1.107 0 0 1-.176-.605c0-.226.058-.427.175-.605.118-.178.275-.321.473-.43.198-.11.417-.165.659-.165a1.338 1.338 0 0 1 1.131.595c.117.178.176.38.176.605 0 .219-.059.42-.176.605a1.34 1.34 0 0 1-1.131.595Zm0-.533a.714.714 0 0 0 .505-.194.621.621 0 0 0 .209-.472.621.621 0 0 0-.209-.472.695.695 0 0 0-.505-.205.695.695 0 0 0-.505.205.621.621 0 0 0-.21.472c0 .184.07.342.21.472.139.13.307.194.505.194Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='m11.683 18.826-4.766 4.448a.787.787 0 0 1-1.06 0l-4.766-4.448a.667.667 0 0 1 0-.989.787.787 0 0 1 1.06 0l3.487 3.255V1.222c0-.387.335-.7.749-.7s.749.313.749.7v19.87l3.488-3.255a.787.787 0 0 1 1.059 0 .667.667 0 0 1 0 .989Z' fill='black'/%3e%3cpath d='M15.604 7.702 18.625.525h1.527l2.977 7.177h-1.417l-.791-2.01h-3.153l-.79 2.01h-1.374Zm2.549-2.973h2.405L19.35 1.694l-1.197 3.035Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--sorting_alfabetical_z_to_a":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='m15.4 23.473 2.85-7.075h1.441l2.809 7.075h-1.337l-.746-1.981h-2.975l-.746 1.98H15.4Zm2.405-2.931h2.27l-1.14-2.992-1.13 2.992Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='m11.7 18.888-4.497 4.385a.72.72 0 0 1-.999 0l-4.497-4.385a.677.677 0 0 1 0-.974.72.72 0 0 1 1 0l3.29 3.208V1.212c0-.381.317-.69.707-.69.39 0 .706.309.706.69v19.91l3.291-3.208a.72.72 0 0 1 1 0 .677.677 0 0 1 0 .974Z' fill='black'/%3e%3cpath d='m15.4 10.73 2.85-7.075h1.441l2.809 7.074h-1.337l-.746-1.98h-2.975l-.746 1.98H15.4Zm2.405-2.932h2.27l-1.14-2.991-1.13 2.991Zm1.16-4.921a1.22 1.22 0 0 1-.621-.162 1.267 1.267 0 0 1-.446-.425 1.127 1.127 0 0 1-.166-.596c0-.222.056-.42.166-.596.11-.175.26-.317.446-.425a1.22 1.22 0 0 1 .622-.161c.228 0 .435.054.622.161.186.108.335.25.445.425.11.175.166.374.166.596 0 .216-.055.415-.166.596-.11.176-.259.317-.445.425a1.22 1.22 0 0 1-.622.162Zm0-.526a.658.658 0 0 0 .477-.192.625.625 0 0 0 .197-.465.625.625 0 0 0-.197-.465.641.641 0 0 0-.476-.202.641.641 0 0 0-.477.202.625.625 0 0 0-.197.465c0 .182.066.337.197.465s.29.192.477.192Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--sorting_date_earliest_to_latest":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M15.277 23.476c-.514 0-.992-.09-1.434-.267a3.24 3.24 0 0 1-1.128-.772l.722-.692c.277.29.554.494.831.613.277.112.607.168.99.168.303 0 .567-.046.791-.138.23-.1.409-.234.534-.406a.995.995 0 0 0 .188-.603.959.959 0 0 0-.158-.545 1.033 1.033 0 0 0-.435-.366 1.42 1.42 0 0 0-.644-.138h-.85v-.91h.761c.337 0 .604-.093.802-.277.204-.185.306-.436.306-.752 0-.204-.059-.39-.178-.554a1.095 1.095 0 0 0-.464-.396 1.484 1.484 0 0 0-.673-.148c-.35 0-.656.063-.92.188-.258.118-.525.33-.802.633l-.732-.683c.317-.356.69-.626 1.118-.81.436-.192.89-.288 1.365-.288.462 0 .871.083 1.227.248.356.164.633.395.831.692.205.29.307.623.307 1 0 .369-.122.698-.366.989-.238.283-.55.481-.94.593.462.099.831.294 1.108.584.284.283.425.62.425 1.009 0 .389-.112.739-.336 1.049-.224.303-.53.544-.92.722-.383.171-.824.257-1.326.257ZM20.102 23.367V17.58l-1.226.524v-.96l1.622-.702h.683v6.925h-1.079ZM23.308 23.456a.676.676 0 0 1-.495-.208.727.727 0 0 1-.198-.504c0-.205.066-.376.198-.515a.675.675 0 0 1 .495-.207c.19 0 .352.069.484.207.139.139.208.31.208.515 0 .191-.07.36-.208.504a.643.643 0 0 1-.485.208Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='m9.737 18.823-4.293 4.454a.674.674 0 0 1-.954 0L.198 18.985a.674.674 0 1 1 .953-.954l3.142 3.14V1.195a.675.675 0 0 1 1.349 0v19.978l3.14-3.141c.264-.264.691-.425.955-.162a.675.675 0 0 1 0 .954Z' fill='black'/%3e%3cpath d='M17.033 7.446V1.658l-1.226.525v-.96l1.622-.702h.683v6.925h-1.079ZM20.238 7.535a.676.676 0 0 1-.494-.208.727.727 0 0 1-.198-.505c0-.204.066-.375.198-.514a.676.676 0 0 1 .494-.208c.192 0 .353.07.485.208.139.139.208.31.208.514 0 .192-.07.36-.208.505a.643.643 0 0 1-.485.208Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--sorting_date_latest_to_earliest":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M17.033 23.465v-5.787l-1.226.524v-.96l1.622-.702h.683v6.925h-1.079ZM20.238 23.554a.675.675 0 0 1-.494-.208.727.727 0 0 1-.198-.504c0-.205.066-.376.198-.515a.675.675 0 0 1 .494-.207c.192 0 .353.069.485.207.139.139.208.31.208.515 0 .191-.07.36-.208.504a.643.643 0 0 1-.485.208Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='m9.737 18.98-4.293 4.292a.675.675 0 0 1-.954 0L.198 18.98a.675.675 0 0 1 .953-.954l3.142 3.141V1.083a.675.675 0 0 1 1.349 0v20.084l3.14-3.141a.675.675 0 0 1 .955.954Z' fill='black'/%3e%3cpath d='M15.277 7.56c-.514 0-.992-.09-1.434-.268a3.24 3.24 0 0 1-1.128-.772l.722-.692c.277.29.554.494.831.613.277.112.607.168.99.168.303 0 .567-.046.791-.138.23-.1.409-.234.534-.406a.995.995 0 0 0 .188-.603.958.958 0 0 0-.158-.544 1.033 1.033 0 0 0-.435-.366 1.42 1.42 0 0 0-.644-.139h-.85v-.91h.761c.337 0 .604-.092.802-.277.204-.185.306-.435.306-.752 0-.204-.059-.39-.178-.554a1.094 1.094 0 0 0-.464-.396 1.484 1.484 0 0 0-.673-.148c-.35 0-.656.063-.92.188-.258.119-.525.33-.802.633l-.732-.683c.317-.356.69-.626 1.118-.81.436-.192.89-.288 1.365-.288.462 0 .871.083 1.227.248.356.165.633.395.831.692.205.29.307.623.307 1 0 .369-.122.698-.366.989-.238.283-.55.481-.94.593.462.1.831.294 1.108.584.284.284.425.62.425 1.009 0 .39-.112.739-.336 1.049a2.31 2.31 0 0 1-.92.722c-.383.171-.824.257-1.326.257ZM20.102 7.45V1.663l-1.226.524v-.96l1.622-.702h.683V7.45h-1.079ZM23.308 7.54a.676.676 0 0 1-.495-.208.727.727 0 0 1-.198-.505c0-.204.066-.376.198-.514a.676.676 0 0 1 .495-.208c.19 0 .352.07.484.208.139.138.208.31.208.514 0 .191-.07.36-.208.505a.643.643 0 0 1-.485.207Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--sorting-bold":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M17.449.307c.409-.41 1.072-.41 1.481 0l4.762 4.762a1.048 1.048 0 0 1-1.481 1.481L18.19 2.53l-4.022 4.02a1.048 1.048 0 0 1-1.481-1.481L17.449.307Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M18.19 0c.578 0 1.047.469 1.047 1.048v21.904a1.048 1.048 0 1 1-2.095 0V1.048C17.142.469 17.61 0 18.189 0ZM6.55 23.693c-.409.41-1.072.41-1.481 0L.307 18.931a1.048 1.048 0 0 1 1.481-1.481l4.021 4.02 4.022-4.02a1.048 1.048 0 0 1 1.481 1.481L6.55 23.693Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M5.81 24a1.048 1.048 0 0 1-1.048-1.048V1.048a1.048 1.048 0 0 1 2.095 0v21.904c0 .579-.469 1.048-1.048 1.048Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--sorting-2-bold":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='25' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M5.069.307c.409-.41 1.072-.41 1.481 0l4.762 4.762A1.048 1.048 0 0 1 9.831 6.55L5.81 2.53 1.788 6.55A1.048 1.048 0 0 1 .307 5.07L5.069.307Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M5.805 0c.579 0 1.048.469 1.048 1.048v21.904a1.048 1.048 0 1 1-2.095 0V1.048C4.758.469 5.227 0 5.805 0ZM19.166 23.693c-.41.41-1.073.41-1.482 0l-4.762-4.762a1.048 1.048 0 1 1 1.482-1.481l4.02 4.02 4.022-4.02a1.048 1.048 0 1 1 1.481 1.481l-4.761 4.762Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M18.429 24a1.048 1.048 0 0 1-1.048-1.048V1.048a1.048 1.048 0 0 1 2.096 0v21.904c0 .579-.47 1.048-1.048 1.048Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--sorting_number_high_to_low":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M12.565 18.85 8.13 23.288a.697.697 0 0 1-.986 0l-4.436-4.436a.697.697 0 0 1 .985-.986L6.94 21.11V1.14a.697.697 0 1 1 1.394 0V21.11l3.246-3.246a.697.697 0 0 1 .986.986Z' fill='black'/%3e%3cpath d='M18.53.512c.586 0 1.1.15 1.544.45.443.293.79.702 1.042 1.227.253.524.379 1.131.379 1.82 0 .777-.14 1.458-.42 2.044-.279.58-.667 1.03-1.165 1.35-.498.32-1.08.48-1.748.48-.341 0-.685-.054-1.033-.163-.34-.11-.63-.26-.87-.45l.614-.818c.205.143.42.252.644.327.232.068.478.103.737.103.443 0 .821-.113 1.135-.338.313-.225.555-.552.726-.981.17-.43.259-.941.265-1.534a2.614 2.614 0 0 1-.89.777 2.287 2.287 0 0 1-1.083.276 2.63 2.63 0 0 1-1.247-.286 2.176 2.176 0 0 1-.849-.777 2.148 2.148 0 0 1-.307-1.145c0-.457.11-.863.327-1.217a2.32 2.32 0 0 1 .9-.838A2.745 2.745 0 0 1 18.53.512Zm.05 3.68c.335 0 .652-.074.952-.224.306-.157.572-.368.797-.634a2.832 2.832 0 0 0-.337-.982 1.754 1.754 0 0 0-.593-.644 1.474 1.474 0 0 0-.828-.235c-.28 0-.532.061-.757.184-.218.116-.392.28-.521.49-.123.205-.184.44-.184.706 0 .26.06.491.184.695.13.205.303.365.521.481.225.11.48.164.767.164ZM18.545 23.497c-.526 0-.99-.139-1.391-.417-.395-.284-.708-.677-.936-1.177-.223-.507-.334-1.088-.334-1.743 0-.668.111-1.252.334-1.753.228-.5.54-.89.936-1.168a2.347 2.347 0 0 1 1.39-.426c.526 0 .987.142 1.382.426.402.278.714.668.937 1.168.222.501.333 1.085.333 1.753 0 .655-.11 1.236-.333 1.743-.223.5-.535.893-.937 1.177a2.341 2.341 0 0 1-1.381.417Zm0-.899c.333 0 .62-.099.862-.297.247-.204.439-.488.575-.853.136-.364.204-.794.204-1.288 0-.501-.068-.934-.204-1.298-.136-.365-.328-.646-.575-.844a1.291 1.291 0 0 0-.862-.306c-.334 0-.625.102-.872.306-.24.198-.432.479-.575.844-.136.364-.204.797-.204 1.298 0 .494.068.924.204 1.288.143.365.334.65.575.853.248.198.538.297.872.297Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--sorting_number_low_to_high":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M19.45 16.105c.585 0 1.099.15 1.541.449.442.293.79.7 1.041 1.225.252.524.378 1.13.378 1.817 0 .776-.14 1.456-.418 2.042-.28.578-.667 1.027-1.164 1.347-.497.32-1.079.48-1.746.48a3.43 3.43 0 0 1-1.03-.163 2.681 2.681 0 0 1-.869-.45l.613-.816c.204.143.418.252.643.327.231.068.476.102.735.102.442 0 .82-.113 1.133-.337.313-.225.555-.552.725-.98.17-.429.259-.94.265-1.532a2.609 2.609 0 0 1-.888.776 2.283 2.283 0 0 1-1.082.276c-.47 0-.885-.095-1.245-.286-.361-.19-.643-.449-.848-.776a2.145 2.145 0 0 1-.306-1.143c0-.456.109-.861.327-1.215.218-.354.517-.633.898-.837a2.74 2.74 0 0 1 1.297-.306Zm.05 3.675c.334 0 .65-.075.95-.225a2.56 2.56 0 0 0 .796-.633 2.828 2.828 0 0 0-.336-.98 1.751 1.751 0 0 0-.593-.643 1.47 1.47 0 0 0-.826-.235c-.28 0-.531.062-.756.184a1.335 1.335 0 0 0-.52.49 1.342 1.342 0 0 0-.184.704c0 .26.06.49.183.695.13.204.303.364.521.48.225.108.48.163.766.163Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='m11.638 18.84-4.43 4.429a.696.696 0 0 1-.984 0l-4.43-4.43a.696.696 0 0 1 .985-.984l3.241 3.241V1.245a.696.696 0 0 1 1.392 0v19.851l3.242-3.241a.696.696 0 1 1 .984.984Z' fill='black'/%3e%3cpath d='M19.507 7.222c-.525 0-.989-.139-1.39-.417-.396-.284-.708-.677-.937-1.177-.223-.507-.334-1.088-.334-1.743 0-.668.111-1.252.334-1.753.229-.5.54-.89.936-1.168a2.347 2.347 0 0 1 1.391-.426c.525 0 .986.142 1.381.426.402.278.714.668.937 1.168.222.5.334 1.085.334 1.753 0 .655-.112 1.236-.334 1.743-.223.5-.535.893-.937 1.177a2.34 2.34 0 0 1-1.381.417Zm0-.9c.334 0 .621-.098.862-.296.247-.204.44-.488.575-.853.136-.364.204-.794.204-1.288 0-.501-.068-.934-.204-1.298-.136-.365-.328-.646-.575-.844a1.291 1.291 0 0 0-.862-.306c-.334 0-.624.102-.872.306-.24.198-.432.479-.574.844-.136.364-.204.797-.204 1.298 0 .494.068.924.204 1.288.142.365.333.65.575.853.247.198.537.297.871.297Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--sorting_time_earliest_to_latest":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M13.068 23.424v-.733l2.661-2.781c.16-.167.284-.318.37-.454.094-.136.159-.266.196-.39.043-.13.064-.262.064-.398a.834.834 0 0 0-.333-.677c-.223-.18-.504-.27-.844-.27-.297 0-.575.06-.834.177-.26.117-.544.321-.853.612l-.575-.695a3.937 3.937 0 0 1 1.103-.733c.377-.167.77-.25 1.178-.25.426 0 .8.077 1.121.232.322.148.572.355.751.62.18.267.27.576.27.928 0 .21-.029.408-.084.593a1.956 1.956 0 0 1-.288.566c-.13.191-.312.41-.547.658l-2.067 2.133 3.106-.01v.872h-4.395ZM20.777 23.526c-.482 0-.93-.084-1.344-.25a3.037 3.037 0 0 1-1.057-.724l.677-.649c.26.272.519.464.779.575.26.105.568.158.927.158.284 0 .531-.044.741-.13.217-.093.384-.22.501-.38a.933.933 0 0 0 .176-.566.898.898 0 0 0-.148-.51.968.968 0 0 0-.408-.343 1.332 1.332 0 0 0-.603-.13h-.797v-.853h.714c.315 0 .565-.086.75-.26.193-.172.288-.407.288-.704a.867.867 0 0 0-.167-.519 1.024 1.024 0 0 0-.435-.37 1.39 1.39 0 0 0-.63-.14c-.328 0-.616.059-.863.176-.241.111-.491.31-.751.594l-.686-.64a2.949 2.949 0 0 1 1.047-.76c.409-.18.835-.27 1.28-.27.433 0 .816.078 1.15.233.333.154.593.37.778.649.192.271.288.584.288.936a1.4 1.4 0 0 1-.343.927 1.747 1.747 0 0 1-.881.556c.433.093.779.275 1.038.547.266.266.4.581.4.946s-.106.692-.316.983c-.21.284-.498.51-.862.677a3.01 3.01 0 0 1-1.243.24Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='m9.125 19.27-4.023 4.023a.632.632 0 0 1-.894 0L.185 19.27a.632.632 0 0 1 .894-.893l2.944 2.943V1.163a.632.632 0 1 1 1.264 0V21.32l2.944-2.944a.632.632 0 1 1 .894.894Z' fill='black'/%3e%3cpath d='M14.932 7.156c-.525 0-.989-.139-1.39-.417-.396-.284-.708-.677-.937-1.177-.223-.507-.334-1.088-.334-1.743 0-.668.111-1.252.334-1.753.229-.5.54-.89.936-1.168a2.347 2.347 0 0 1 1.391-.426c.525 0 .986.142 1.382.426.401.278.713.668.936 1.168.223.501.334 1.085.334 1.753 0 .655-.111 1.236-.334 1.743-.223.5-.535.893-.936 1.177a2.34 2.34 0 0 1-1.382.417Zm0-.899c.334 0 .621-.099.862-.297.248-.204.44-.488.575-.853.136-.364.204-.794.204-1.288 0-.501-.068-.934-.204-1.298-.136-.365-.327-.646-.575-.844a1.291 1.291 0 0 0-.862-.306c-.334 0-.624.102-.871.306-.242.198-.433.479-.575.844-.136.364-.204.797-.204 1.298 0 .494.068.924.204 1.288.142.365.333.65.575.853.247.198.537.297.871.297ZM21.348 7.156c-.525 0-.989-.139-1.39-.417-.396-.284-.708-.677-.937-1.177-.223-.507-.334-1.088-.334-1.743 0-.668.111-1.252.334-1.753.229-.5.54-.89.936-1.168a2.346 2.346 0 0 1 1.391-.426c.525 0 .986.142 1.381.426.402.278.714.668.937 1.168.222.501.334 1.085.334 1.753 0 .655-.112 1.236-.334 1.743-.223.5-.535.893-.937 1.177a2.34 2.34 0 0 1-1.381.417Zm0-.899c.334 0 .621-.099.862-.297.247-.204.44-.488.575-.853.136-.364.204-.794.204-1.288 0-.501-.068-.934-.204-1.298-.136-.365-.328-.646-.575-.844a1.291 1.291 0 0 0-.862-.306c-.334 0-.624.102-.871.306-.242.198-.433.479-.575.844-.136.364-.204.797-.204 1.298 0 .494.068.924.204 1.288.142.365.333.65.575.853.247.198.537.297.871.297Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--sorting_time_latest_to_earliest":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M14.932 23.378c-.525 0-.989-.14-1.39-.418-.396-.284-.708-.677-.937-1.177-.222-.507-.333-1.088-.333-1.743 0-.668.11-1.252.333-1.752.23-.501.541-.89.937-1.169a2.346 2.346 0 0 1 1.39-.426c.526 0 .986.142 1.382.426.402.279.714.668.936 1.169.223.5.334 1.084.334 1.752 0 .655-.111 1.236-.334 1.743-.222.5-.534.893-.936 1.177a2.34 2.34 0 0 1-1.382.418Zm0-.9c.334 0 .622-.099.863-.297.247-.204.439-.488.575-.853.136-.364.203-.794.203-1.288 0-.5-.067-.933-.203-1.298s-.328-.646-.575-.844a1.291 1.291 0 0 0-.863-.306c-.333 0-.624.102-.871.306-.241.198-.433.48-.575.844-.136.364-.204.797-.204 1.298 0 .494.068.924.204 1.288.142.365.334.65.575.854.247.197.538.296.871.296ZM21.348 23.378c-.525 0-.989-.14-1.39-.418-.396-.284-.708-.677-.937-1.177-.222-.507-.334-1.088-.334-1.743 0-.668.112-1.252.334-1.752.229-.501.541-.89.937-1.169a2.346 2.346 0 0 1 1.39-.426c.526 0 .986.142 1.382.426.402.279.714.668.936 1.169.223.5.334 1.084.334 1.752 0 .655-.111 1.236-.334 1.743-.222.5-.534.893-.936 1.177a2.34 2.34 0 0 1-1.382.418Zm0-.9c.334 0 .622-.099.863-.297.247-.204.439-.488.574-.853.136-.364.204-.794.204-1.288 0-.5-.068-.933-.204-1.298-.136-.365-.327-.646-.574-.844a1.291 1.291 0 0 0-.863-.306c-.333 0-.624.102-.871.306-.241.198-.433.48-.575.844-.136.364-.204.797-.204 1.298 0 .494.068.924.204 1.288.142.365.334.65.575.854.247.197.538.296.871.296Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='m9.125 19.279-4.023 4.023a.632.632 0 0 1-.894 0L.185 19.279a.632.632 0 0 1 .894-.894l2.944 2.943V1.154a.632.632 0 0 1 1.264 0v20.174l2.944-2.943a.632.632 0 0 1 .894.894Z' fill='black'/%3e%3cpath d='M13.069 7.113v-.732l2.66-2.781c.161-.167.285-.319.371-.455.093-.136.158-.265.195-.39.043-.129.065-.262.065-.398a.834.834 0 0 0-.334-.677c-.222-.179-.504-.268-.844-.268a2 2 0 0 0-.834.176c-.26.117-.544.321-.853.612l-.575-.696a3.937 3.937 0 0 1 1.104-.732c.377-.167.769-.25 1.177-.25.426 0 .8.077 1.122.231.321.149.572.356.75.621.18.266.27.575.27.928 0 .21-.028.408-.084.593a1.956 1.956 0 0 1-.287.566c-.13.191-.312.41-.547.658L14.357 6.25l3.106-.01v.872H13.07ZM20.778 7.215c-.482 0-.93-.083-1.345-.25a3.037 3.037 0 0 1-1.057-.723l.677-.65c.26.273.52.465.779.576.26.105.569.157.927.157.284 0 .532-.043.742-.13.216-.092.383-.219.5-.38a.933.933 0 0 0 .177-.565.898.898 0 0 0-.149-.51.968.968 0 0 0-.408-.343 1.33 1.33 0 0 0-.602-.13h-.798v-.853h.714c.316 0 .566-.086.751-.26.192-.173.288-.407.288-.704a.868.868 0 0 0-.167-.52 1.025 1.025 0 0 0-.436-.37 1.39 1.39 0 0 0-.63-.14 1.99 1.99 0 0 0-.863.177c-.24.111-.491.309-.75.593l-.687-.64A2.949 2.949 0 0 1 19.49.79c.408-.179.834-.269 1.28-.269.432 0 .815.078 1.149.232.334.155.593.371.779.65.191.271.287.583.287.936a1.4 1.4 0 0 1-.343.927 1.747 1.747 0 0 1-.88.556c.432.093.778.275 1.038.547.266.266.399.581.399.946 0 .364-.106.692-.316.983-.21.284-.497.51-.862.676a3.01 3.01 0 0 1-1.242.241Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--star-filled":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.594 23.5a1.621 1.621 0 0 1-1.445-.88 1.645 1.645 0 0 1-.161-1.033l1.079-6.278-4.572-4.441A1.626 1.626 0 0 1 0 9.718c-.006-.437.156-.85.457-1.164.25-.259.583-.429.937-.481l6.321-.92 2.831-5.734a1.626 1.626 0 0 1 2.172-.754c.327.16.595.429.755.759l2.815 5.722 6.319.919c.888.129 1.505.961 1.376 1.852-.05.357-.221.69-.477.94l-4.573 4.444 1.079 6.278a1.636 1.636 0 0 1-1.605 1.913c-.26 0-.52-.064-.751-.187l-5.65-2.964-5.66 2.973a1.62 1.62 0 0 1-.752.186Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--star":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.594 23.5a1.621 1.621 0 0 1-1.445-.88 1.645 1.645 0 0 1-.161-1.033l1.079-6.278-4.572-4.441A1.626 1.626 0 0 1 0 9.718c-.006-.437.156-.85.457-1.164.25-.259.583-.429.937-.481l6.321-.92 2.831-5.734a1.626 1.626 0 0 1 2.172-.754c.327.16.595.429.755.759l2.815 5.722 6.319.919c.888.129 1.505.961 1.376 1.852-.05.357-.221.69-.477.94l-4.573 4.444 1.079 6.278a1.636 1.636 0 0 1-1.605 1.913c-.26 0-.52-.064-.751-.187l-5.65-2.964-5.66 2.973a1.62 1.62 0 0 1-.752.186ZM8.983 8.264a.818.818 0 0 1-.612.447l-6.744.98 4.881 4.743c.194.188.281.46.236.726l-1.152 6.705 6.038-3.171a.813.813 0 0 1 .752-.002l6.027 3.163-1.152-6.705a.819.819 0 0 1 .236-.726l4.881-4.742-6.742-.981a.812.812 0 0 1-.612-.447l-3.01-6.117-3.027 6.127Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--step_1":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cmask id='a' fill='white'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12Zm10.588-12c0 5.848-4.74 10.588-10.588 10.588-5.848 0-10.588-4.74-10.588-10.588C1.412 6.152 6.152 1.412 12 1.412c5.848 0 10.588 4.74 10.588 10.588Z'/%3e%3c/mask%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12Zm10.588-12c0 5.848-4.74 10.588-10.588 10.588-5.848 0-10.588-4.74-10.588-10.588C1.412 6.152 6.152 1.412 12 1.412c5.848 0 10.588 4.74 10.588 10.588Z' fill='%2329D305'/%3e%3cpath d='M21 12a9 9 0 0 1-9 9v6c8.284 0 15-6.716 15-15h-6Zm-9-9a9 9 0 0 1 9 9h6c0-8.284-6.716-15-15-15v6Zm-9 9a9 9 0 0 1 9-9v-6C3.716-3-3 3.716-3 12h6Zm9 9a9 9 0 0 1-9-9h-6c0 8.284 6.716 15 15 15v-6Zm0 4.588c7.505 0 13.588-6.083 13.588-13.588h-6A7.588 7.588 0 0 1 12 19.588v6ZM-1.588 12c0 7.505 6.083 13.588 13.588 13.588v-6A7.588 7.588 0 0 1 4.412 12h-6ZM12-1.588C4.495-1.588-1.588 4.495-1.588 12h6A7.588 7.588 0 0 1 12 4.412v-6ZM25.588 12c0-7.505-6.083-13.588-13.588-13.588v6A7.588 7.588 0 0 1 19.588 12h6Z' fill='%2329D305' mask='url(%23a)'/%3e%3cpath d='M13.362 7.1v9.8h-1.526V8.696l-1.736.756V8.094l2.296-.994h.966Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--step_2":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cmask id='a' fill='white'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12Zm10.588-12c0 5.848-4.74 10.588-10.588 10.588-5.848 0-10.588-4.74-10.588-10.588C1.412 6.152 6.152 1.412 12 1.412c5.848 0 10.588 4.74 10.588 10.588Z'/%3e%3c/mask%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12Zm10.588-12c0 5.848-4.74 10.588-10.588 10.588-5.848 0-10.588-4.74-10.588-10.588C1.412 6.152 6.152 1.412 12 1.412c5.848 0 10.588 4.74 10.588 10.588Z' fill='%2329D305'/%3e%3cpath d='M21 12a9 9 0 0 1-9 9v6c8.284 0 15-6.716 15-15h-6Zm-9-9a9 9 0 0 1 9 9h6c0-8.284-6.716-15-15-15v6Zm-9 9a9 9 0 0 1 9-9v-6C3.716-3-3 3.716-3 12h6Zm9 9a9 9 0 0 1-9-9h-6c0 8.284 6.716 15 15 15v-6Zm0 4.588c7.505 0 13.588-6.083 13.588-13.588h-6A7.588 7.588 0 0 1 12 19.588v6ZM-1.588 12c0 7.505 6.083 13.588 13.588 13.588v-6A7.588 7.588 0 0 1 4.412 12h-6ZM12-1.588C4.495-1.588-1.588 4.495-1.588 12h6A7.588 7.588 0 0 1 12 4.412v-6ZM25.588 12c0-7.505-6.083-13.588-13.588-13.588v6A7.588 7.588 0 0 1 19.588 12h6Z' fill='%2329D305' mask='url(%23a)'/%3e%3cpath d='M8.794 16.926V15.82l4.018-4.2c.345-.373.588-.695.728-.966.15-.28.224-.574.224-.882 0-.41-.173-.751-.518-1.022-.336-.28-.76-.42-1.274-.42-.448 0-.868.093-1.26.28-.383.187-.807.495-1.274.924l-.868-1.05c.532-.495 1.083-.863 1.652-1.106A4.445 4.445 0 0 1 12.014 7c.952 0 1.727.252 2.324.756.607.495.91 1.134.91 1.918 0 .467-.103.9-.308 1.302-.205.401-.57.877-1.092 1.428l-3.136 3.234 4.718-.028v1.316H8.794Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--step_3":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cmask id='a' fill='white'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12Zm10.588-12c0 5.848-4.74 10.588-10.588 10.588-5.848 0-10.588-4.74-10.588-10.588C1.412 6.152 6.152 1.412 12 1.412c5.848 0 10.588 4.74 10.588 10.588Z'/%3e%3c/mask%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12Zm10.588-12c0 5.848-4.74 10.588-10.588 10.588-5.848 0-10.588-4.74-10.588-10.588C1.412 6.152 6.152 1.412 12 1.412c5.848 0 10.588 4.74 10.588 10.588Z' fill='%2329D305'/%3e%3cpath d='M21 12a9 9 0 0 1-9 9v6c8.284 0 15-6.716 15-15h-6Zm-9-9a9 9 0 0 1 9 9h6c0-8.284-6.716-15-15-15v6Zm-9 9a9 9 0 0 1 9-9v-6C3.716-3-3 3.716-3 12h6Zm9 9a9 9 0 0 1-9-9h-6c0 8.284 6.716 15 15 15v-6Zm0 4.588c7.505 0 13.588-6.083 13.588-13.588h-6A7.588 7.588 0 0 1 12 19.588v6ZM-1.588 12c0 7.505 6.083 13.588 13.588 13.588v-6A7.588 7.588 0 0 1 4.412 12h-6ZM12-1.588C4.495-1.588-1.588 4.495-1.588 12h6A7.588 7.588 0 0 1 12 4.412v-6ZM25.588 12c0-7.505-6.083-13.588-13.588-13.588v6A7.588 7.588 0 0 1 19.588 12h6Z' fill='%2329D305' mask='url(%23a)'/%3e%3cpath d='M15.64 14.224c0 .41-.093.793-.28 1.148-.177.355-.43.658-.756.91-.317.252-.7.453-1.148.602-.448.14-.938.21-1.47.21a5.45 5.45 0 0 1-2.03-.378 4.585 4.585 0 0 1-1.596-1.092l1.036-.966c.392.401.784.686 1.176.854.392.159.859.238 1.4.238.625 0 1.134-.15 1.526-.448.401-.308.602-.7.602-1.176a1.3 1.3 0 0 0-.49-1.05c-.327-.28-.742-.42-1.246-.42h-1.218v-1.274h1.092c.467 0 .84-.13 1.12-.392.29-.27.434-.63.434-1.078 0-.439-.177-.807-.532-1.106-.355-.299-.798-.448-1.33-.448-.485 0-.915.089-1.288.266-.364.168-.747.467-1.148.896l-1.036-.966A4.752 4.752 0 0 1 11.986 7c.485 0 .933.07 1.344.21.41.14.76.331 1.05.574.299.243.532.532.7.868.168.336.252.7.252 1.092a2.1 2.1 0 0 1-.532 1.414 2.716 2.716 0 0 1-1.372.826c.663.13 1.195.401 1.596.812.41.401.616.877.616 1.428Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--step_4":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cmask id='a' fill='white'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12Zm10.588-12c0 5.848-4.74 10.588-10.588 10.588-5.848 0-10.588-4.74-10.588-10.588C1.412 6.152 6.152 1.412 12 1.412c5.848 0 10.588 4.74 10.588 10.588Z'/%3e%3c/mask%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12Zm10.588-12c0 5.848-4.74 10.588-10.588 10.588-5.848 0-10.588-4.74-10.588-10.588C1.412 6.152 6.152 1.412 12 1.412c5.848 0 10.588 4.74 10.588 10.588Z' fill='%2329D305'/%3e%3cpath d='M21 12a9 9 0 0 1-9 9v6c8.284 0 15-6.716 15-15h-6Zm-9-9a9 9 0 0 1 9 9h6c0-8.284-6.716-15-15-15v6Zm-9 9a9 9 0 0 1 9-9v-6C3.716-3-3 3.716-3 12h6Zm9 9a9 9 0 0 1-9-9h-6c0 8.284 6.716 15 15 15v-6Zm0 4.588c7.505 0 13.588-6.083 13.588-13.588h-6A7.588 7.588 0 0 1 12 19.588v6ZM-1.588 12c0 7.505 6.083 13.588 13.588 13.588v-6A7.588 7.588 0 0 1 4.412 12h-6ZM12-1.588C4.495-1.588-1.588 4.495-1.588 12h6A7.588 7.588 0 0 1 12 4.412v-6ZM25.588 12c0-7.505-6.083-13.588-13.588-13.588v6A7.588 7.588 0 0 1 19.588 12h6Z' fill='%2329D305' mask='url(%23a)'/%3e%3cpath d='M14.39 7v6.062h1.26v1.316h-1.26V16.8h-1.526v-2.422H7.6v-1.246L12.654 7h1.736Zm-5.152 6.062h3.626V8.638l-3.626 4.424Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--step_5":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cmask id='a' fill='white'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12Zm10.588-12c0 5.848-4.74 10.588-10.588 10.588-5.848 0-10.588-4.74-10.588-10.588C1.412 6.152 6.152 1.412 12 1.412c5.848 0 10.588 4.74 10.588 10.588Z'/%3e%3c/mask%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12Zm10.588-12c0 5.848-4.74 10.588-10.588 10.588-5.848 0-10.588-4.74-10.588-10.588C1.412 6.152 6.152 1.412 12 1.412c5.848 0 10.588 4.74 10.588 10.588Z' fill='%2329D305'/%3e%3cpath d='M21 12a9 9 0 0 1-9 9v6c8.284 0 15-6.716 15-15h-6Zm-9-9a9 9 0 0 1 9 9h6c0-8.284-6.716-15-15-15v6Zm-9 9a9 9 0 0 1 9-9v-6C3.716-3-3 3.716-3 12h6Zm9 9a9 9 0 0 1-9-9h-6c0 8.284 6.716 15 15 15v-6Zm0 4.588c7.505 0 13.588-6.083 13.588-13.588h-6A7.588 7.588 0 0 1 12 19.588v6ZM-1.588 12c0 7.505 6.083 13.588 13.588 13.588v-6A7.588 7.588 0 0 1 4.412 12h-6ZM12-1.588C4.495-1.588-1.588 4.495-1.588 12h6A7.588 7.588 0 0 1 12 4.412v-6ZM25.588 12c0-7.505-6.083-13.588-13.588-13.588v6A7.588 7.588 0 0 1 19.588 12h6Z' fill='%2329D305' mask='url(%23a)'/%3e%3cpath d='M8.878 12.068 9.102 7h5.964v1.316h-4.662l-.126 2.842a4.13 4.13 0 0 1 .994-.364 4.314 4.314 0 0 1 1.05-.126c.97 0 1.755.275 2.352.826.607.541.91 1.255.91 2.142 0 .495-.093.947-.28 1.358-.177.401-.43.747-.756 1.036-.317.29-.705.518-1.162.686a4.586 4.586 0 0 1-1.512.238 5.186 5.186 0 0 1-1.862-.336 4.966 4.966 0 0 1-1.582-.994l.924-1.05c.42.373.835.644 1.246.812.41.159.854.238 1.33.238.616 0 1.115-.177 1.498-.532.392-.355.588-.817.588-1.386 0-.532-.2-.97-.602-1.316-.401-.345-.91-.518-1.526-.518a3.76 3.76 0 0 0-.966.126 5.104 5.104 0 0 0-.98.392l-1.064-.322Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--stove":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M6 19.5a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-.75A.75.75 0 0 1 6 19.5ZM9 18a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-2.25A.75.75 0 0 1 9 18ZM12 19.5a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-.75a.75.75 0 0 1 .75-.75ZM18 19.5a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-.75a.75.75 0 0 1 .75-.75ZM15 18a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-2.25A.75.75 0 0 1 15 18ZM3.75 23.25a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75ZM5.25 3.75A.75.75 0 0 1 6 3h12a.75.75 0 0 1 .75.75v11A1.75 1.75 0 0 1 17 16.5H7a1.75 1.75 0 0 1-1.75-1.75v-11Zm1.5.75v10.25A.25.25 0 0 0 7 15h10a.25.25 0 0 0 .25-.25V4.5H6.75Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M3.75 3.75A.75.75 0 0 1 4.5 3h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75ZM2.25 6.75A.75.75 0 0 1 3 6h3a.75.75 0 0 1 0 1.5H3a.75.75 0 0 1-.75-.75ZM17.25 6.75A.75.75 0 0 1 18 6h3a.75.75 0 0 1 0 1.5h-3a.75.75 0 0 1-.75-.75Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M12 1.5a2.25 2.25 0 0 0-2.25 2.25.75.75 0 0 1-1.5 0 3.75 3.75 0 1 1 7.5 0 .75.75 0 0 1-1.5 0A2.25 2.25 0 0 0 12 1.5Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--subtract_circle":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M7.5 12.748a.75.75 0 1 1 0-1.498h9a.75.75 0 1 1 0 1.498h-9Z' fill='black'/%3e%3cpath d='M12 24C5.383 24 0 18.617 0 12S5.383 0 12 0s12 5.383 12 12-5.383 12-12 12Zm0-22.5C6.21 1.5 1.5 6.21 1.5 12S6.21 22.5 12 22.5 22.5 17.79 22.5 12 17.79 1.5 12 1.5Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--subtract_circle-filled":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M0 12c0 6.617 5.383 12 12 12s12-5.383 12-12S18.617 0 12 0 0 5.383 0 12Z' fill='black'/%3e%3cpath d='M7.5 12.748a.75.75 0 1 1 0-1.498h9a.75.75 0 1 1 0 1.498h-9Z' fill='white'/%3e%3c/svg%3e",
     "e-icon--subtract_circle-filled-color":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3ccircle cx='12' cy='12' r='12' fill='%2329D305'/%3e%3cpath d='M7.75 12.748a.75.75 0 1 1 0-1.498h9a.75.75 0 1 1 0 1.498h-9Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--support":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M16.874 23.249c0 .414.343.75.765.75a.754.754 0 0 0 .762-.749v-3.778c2.108-1.32 3.663-3.422 4.284-5.798a9.516 9.516 0 0 0-1.074-7.379 9.841 9.841 0 0 0-5.503-4.307V1.5c0-.827-.687-1.5-1.53-1.5h-3.057c-.843 0-1.53.673-1.53 1.5v.367c-4.065 1.05-6.879 4.259-6.879 7.894v.523l-1.726 2.54a2.233 2.233 0 0 0-.316.702 2.198 2.198 0 0 0 .257 1.703c.315.516.817.88 1.411 1.026l.955.234a.76.76 0 0 0 .926-.546.732.732 0 0 0-.086-.568.758.758 0 0 0-.47-.341L3.11 14.8a.76.76 0 0 1-.47-.342.732.732 0 0 1 .02-.802l1.855-2.729a.735.735 0 0 0 .128-.416v-.75c0-2.864 2.13-5.36 5.35-6.334v4.472a4.446 4.446 0 0 0-1.528 3.351c0 1.704.96 3.226 2.483 3.995A6.898 6.898 0 0 1 5.406 18h-1.53a.758.758 0 0 0-.764.75c0 .414.343.75.765.75h1.529c2.842 0 5.526-1.445 7.07-3.788.194.026.385.038.575.038 2.528 0 4.586-2.019 4.586-4.5a4.448 4.448 0 0 0-1.528-3.351V3.576a8.337 8.337 0 0 1 4.188 3.483 8.051 8.051 0 0 1 .91 6.242c-.56 2.139-1.999 3.997-3.95 5.098a.75.75 0 0 0-.383.65v4.2ZM13.815 11.25a.758.758 0 0 0-.764-.75.758.758 0 0 0-.765.75c0 .938-.192 1.842-.573 2.693a3 3 0 0 1-1.72-2.693c0-1.654 1.372-3 3.058-3 1.686 0 3.058 1.346 3.058 3 0 1.591-1.27 2.897-2.868 2.994a8.014 8.014 0 0 0 .574-2.994Zm.765-4.24a4.575 4.575 0 0 0-1.53-.26c-.525 0-1.038.087-1.528.26V1.5h3.058v5.51ZM7.7 23.25c0 .414.343.75.765.75a.759.759 0 0 0 .765-.748v-2.239a.746.746 0 0 0-.27-.572.77.77 0 0 0-.62-.168l-1.03.167a2.325 2.325 0 0 1-.949-.04.763.763 0 0 0-.93.538c-.106.4.14.81.549.914a3.875 3.875 0 0 0 1.584.066l.136-.022v1.354Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--sync":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M.75 19.499h4.167l.019.001.031.002a.364.364 0 0 0 .045-.003h.238a.75.75 0 0 0 .75-.75v-4.5a.751.751 0 0 0-1.5-.001v2.721a8.976 8.976 0 0 1-1.489-5.158 8.943 8.943 0 0 1 2.775-6.307 8.967 8.967 0 0 1 6.228-2.5 8.95 8.95 0 0 1 3.451.689.748.748 0 1 0 .576-1.384 10.453 10.453 0 0 0-4.027-.804 10.46 10.46 0 0 0-7.265 2.916 10.433 10.433 0 0 0-3.237 7.358 10.493 10.493 0 0 0 1.875 6.22H.75a.75.75 0 0 0 0 1.5ZM7.957 21.693c1.288.536 2.646.808 4.038.808a10.46 10.46 0 0 0 7.274-2.925 10.438 10.438 0 0 0 3.228-7.362 10.503 10.503 0 0 0-1.882-6.215h2.635a.75.75 0 0 0 0-1.5h-4.5a.75.75 0 0 0-.75.75v4.5a.75.75 0 0 0 1.499 0V7.025a8.973 8.973 0 0 1 1.497 5.158 8.941 8.941 0 0 1-2.767 6.31 8.96 8.96 0 0 1-6.234 2.508 8.961 8.961 0 0 1-3.462-.694.748.748 0 0 0-.981.979c.076.186.22.33.405.407Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--tag_add":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M11.25 16.5a.75.75 0 0 0 1.5 0v-3.75h3.75a.75.75 0 0 0 0-1.5h-3.75V7.5a.75.75 0 0 0-1.5 0v3.75H7.5a.75.75 0 0 0 0 1.5h3.75v3.75Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M0 12c0 6.617 5.383 12 12 12s12-5.383 12-12S18.617 0 12 0 0 5.383 0 12Zm1.5 0C1.5 6.21 6.21 1.5 12 1.5S22.5 6.21 22.5 12 17.79 22.5 12 22.5 1.5 17.79 1.5 12Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--tag":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M17.798 7.487c.747 0 1.353-.608 1.353-1.359 0-.75-.606-1.359-1.353-1.359s-1.353.609-1.353 1.36c0 .75.605 1.358 1.353 1.358Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M9.396 24c-.613 0-1.226-.205-1.634-.718L.715 16.205C.306 15.795 0 15.18 0 14.565c0-.616.204-1.232.715-1.642L12.562 1.128A3.937 3.937 0 0 1 15.319 0h6.434C22.98 0 24 1.026 24 2.256v6.462c0 1.026-.409 1.949-1.123 2.77L11.03 23.281c-.409.41-1.021.718-1.634.718Zm5.923-22.462c-.613 0-1.225.206-1.634.718L1.838 14.051a.785.785 0 0 0-.204.513c0 .205.102.41.204.513l7.047 7.077a.799.799 0 0 0 1.123 0l11.847-11.898c.409-.41.715-1.025.715-1.64v-6.36c0-.41-.306-.82-.817-.82l-6.434.102Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--third_party":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M3 1.45a1.55 1.55 0 1 0 0 3.1 1.55 1.55 0 0 0 0-3.1ZM.05 3a2.95 2.95 0 1 1 5.9 0 2.95 2.95 0 0 1-5.9 0Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M4.255 3.91a.7.7 0 0 1 .978-.156L7.16 5.152a.7.7 0 0 1-.822 1.134L4.411 4.888a.7.7 0 0 1-.156-.978ZM3 19.45a1.55 1.55 0 1 0 0 3.1 1.55 1.55 0 0 0 0-3.1ZM.05 21a2.95 2.95 0 1 1 5.9 0 2.95 2.95 0 0 1-5.9 0Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M7.317 17.869a.7.7 0 0 1-.156.978l-1.928 1.399a.7.7 0 0 1-.822-1.133l1.928-1.4a.7.7 0 0 1 .978.156ZM21 1.45a1.55 1.55 0 1 0 0 3.1 1.55 1.55 0 0 0 0-3.1ZM18.05 3a2.95 2.95 0 1 1 5.9 0 2.95 2.95 0 0 1-5.9 0Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M19.745 3.91a.7.7 0 0 1-.156.978L17.66 6.286a.7.7 0 1 1-.822-1.134l1.928-1.398a.7.7 0 0 1 .978.156ZM21 19.45a1.55 1.55 0 1 0 0 3.1 1.55 1.55 0 0 0 0-3.1ZM18.05 21a2.95 2.95 0 1 1 5.9 0 2.95 2.95 0 0 1-5.9 0Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M16.683 17.869a.7.7 0 0 1 .978-.155l1.928 1.399a.7.7 0 1 1-.822 1.133l-1.928-1.4a.7.7 0 0 1-.156-.977ZM12 5.95a1.925 1.925 0 1 0 0 3.85 1.925 1.925 0 0 0 0-3.85ZM8.675 7.875a3.325 3.325 0 1 1 6.65 0 3.325 3.325 0 0 1-6.65 0Z' fill='black'/%3e%3cpath d='M12 11.95a3.8 3.8 0 0 0-3.735 3.1S8.192 16 7.5 16c-.692 0-.653-.95-.653-.95a5.2 5.2 0 0 1 10.306 0s.112.95-.653.95-.765-.95-.765-.95A3.8 3.8 0 0 0 12 11.95Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--thumbnail":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M2.25 0A2.25 2.25 0 0 0 0 2.25v6a2.25 2.25 0 0 0 2.25 2.25h6a2.25 2.25 0 0 0 2.25-2.25v-6A2.25 2.25 0 0 0 8.25 0h-6ZM1.5 2.25a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 .75.75v6a.75.75 0 0 1-.75.75h-6a.75.75 0 0 1-.75-.75v-6ZM2.25 13.5A2.25 2.25 0 0 0 0 15.75v6A2.25 2.25 0 0 0 2.25 24h6a2.25 2.25 0 0 0 2.25-2.25v-6a2.25 2.25 0 0 0-2.25-2.25h-6Zm-.75 2.25a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 .75.75v6a.75.75 0 0 1-.75.75h-6a.75.75 0 0 1-.75-.75v-6ZM13.5 2.25A2.25 2.25 0 0 1 15.75 0h6A2.25 2.25 0 0 1 24 2.25v6a2.25 2.25 0 0 1-2.25 2.25h-6a2.25 2.25 0 0 1-2.25-2.25v-6Zm2.25-.75a.75.75 0 0 0-.75.75v6c0 .414.336.75.75.75h6a.75.75 0 0 0 .75-.75v-6a.75.75 0 0 0-.75-.75h-6ZM15.75 13.5a2.25 2.25 0 0 0-2.25 2.25v6A2.25 2.25 0 0 0 15.75 24h6A2.25 2.25 0 0 0 24 21.75v-6a2.25 2.25 0 0 0-2.25-2.25h-6ZM15 15.75a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 .75.75v6a.75.75 0 0 1-.75.75h-6a.75.75 0 0 1-.75-.75v-6Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--thumbnail-color":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M2.25 0A2.25 2.25 0 0 0 0 2.25v6a2.25 2.25 0 0 0 2.25 2.25h6a2.25 2.25 0 0 0 2.25-2.25v-6A2.25 2.25 0 0 0 8.25 0h-6ZM1.5 2.25a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 .75.75v6a.75.75 0 0 1-.75.75h-6a.75.75 0 0 1-.75-.75v-6Z' fill='%2329D305'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M2.25 13.5A2.25 2.25 0 0 0 0 15.75v6A2.25 2.25 0 0 0 2.25 24h6a2.25 2.25 0 0 0 2.25-2.25v-6a2.25 2.25 0 0 0-2.25-2.25h-6Zm-.75 2.25a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 .75.75v6a.75.75 0 0 1-.75.75h-6a.75.75 0 0 1-.75-.75v-6ZM13.5 2.25A2.25 2.25 0 0 1 15.75 0h6A2.25 2.25 0 0 1 24 2.25v6a2.25 2.25 0 0 1-2.25 2.25h-6a2.25 2.25 0 0 1-2.25-2.25v-6Zm2.25-.75a.75.75 0 0 0-.75.75v6c0 .414.336.75.75.75h6a.75.75 0 0 0 .75-.75v-6a.75.75 0 0 0-.75-.75h-6ZM15.75 13.5a2.25 2.25 0 0 0-2.25 2.25v6A2.25 2.25 0 0 0 15.75 24h6A2.25 2.25 0 0 0 24 21.75v-6a2.25 2.25 0 0 0-2.25-2.25h-6ZM15 15.75a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 .75.75v6a.75.75 0 0 1-.75.75h-6a.75.75 0 0 1-.75-.75v-6Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--touch_finger-color":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M12.002 10.676a.74.74 0 0 0-.74.74v8.882a.74.74 0 0 1-1.294.492l-1.91-2.15a.797.797 0 1 0-1.191 1.058l2.727 3.07a.74.74 0 1 1-1.106.983L5.76 20.68a2.277 2.277 0 1 1 3.404-3.025l.617.695v-6.935a2.22 2.22 0 0 1 4.441 0v5.922h.74a5.18 5.18 0 0 1 5.182 5.18v.742a.74.74 0 1 1-1.48 0v-.741a3.701 3.701 0 0 0-3.702-3.701h-1.48a.74.74 0 0 1-.74-.74v-6.662a.74.74 0 0 0-.74-.74Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M7.241 1.537a8.142 8.142 0 0 1 9.646 13.118.74.74 0 1 1-.888-1.184 6.662 6.662 0 1 0-7.994 0 .74.74 0 0 1-.888 1.184A8.142 8.142 0 0 1 7.24 1.537Z' fill='%2329D305'/%3e%3c/svg%3e",
     "e-icon--transformer":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M6.452 1.674a.28.28 0 0 0-.279.28v1.953h2.512c.463 0 .837.375.837.837v14.512a.837.837 0 0 1-.837.837H6.173v1.954c0 .154.125.279.28.279h11.162a.28.28 0 0 0 .28-.28v-1.953h-2.512a.837.837 0 0 1-.838-.837V4.744c0-.462.375-.837.838-.837h2.511V1.953a.28.28 0 0 0-.279-.279H6.452ZM19.57 20.093h2.511a.837.837 0 0 0 .838-.837V4.744a.837.837 0 0 0-.838-.837H19.57V1.953A1.953 1.953 0 0 0 17.615 0H6.452A1.953 1.953 0 0 0 4.5 1.953v1.954H1.988a.837.837 0 0 0-.838.837v14.512c0 .462.375.837.838.837h2.51v1.954c0 1.078.876 1.953 1.954 1.953h11.163a1.953 1.953 0 0 0 1.954-1.953v-1.954Zm-3.35-1.674V5.58h5.024V18.42H16.22Zm-13.394 0V5.58h5.023V18.42H2.825Z' fill='black'/%3e%3cpath d='m1.152 13.416 8.371-4.932v2.1l-8.37 4.932v-2.1ZM14.546 10.482l8.371-4.931v2.1l-8.37 4.931v-2.1ZM14.546 15.998l8.371-4.932v2.1l-8.37 4.932v-2.1Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--transformer-color":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M6.452 1.674a.28.28 0 0 0-.279.28v1.953h2.512c.463 0 .837.375.837.837v14.512a.837.837 0 0 1-.837.837H6.173v1.954c0 .154.125.279.28.279h11.162a.28.28 0 0 0 .28-.28v-1.953h-2.512a.837.837 0 0 1-.838-.837V4.744c0-.462.375-.837.838-.837h2.511V1.953a.28.28 0 0 0-.279-.279H6.452ZM19.57 20.093h2.511a.837.837 0 0 0 .838-.837V4.744a.837.837 0 0 0-.838-.837H19.57V1.953A1.953 1.953 0 0 0 17.615 0H6.452A1.953 1.953 0 0 0 4.5 1.953v1.954H1.988a.837.837 0 0 0-.838.837v14.512c0 .462.375.837.838.837h2.51v1.954c0 1.078.876 1.953 1.954 1.953h11.163a1.953 1.953 0 0 0 1.954-1.953v-1.954Zm-3.35-1.674V5.58h5.024V18.42H16.22Zm-13.394 0V5.58h5.023V18.42H2.825Z' fill='black'/%3e%3cpath d='m1.152 13.416 8.371-4.932v2.1l-8.37 4.932v-2.1ZM14.546 10.482l8.371-4.931v2.1l-8.37 4.931v-2.1ZM14.546 15.998l8.371-4.932v2.1l-8.37 4.932v-2.1Z' fill='%2329D305'/%3e%3c/svg%3e",
     "e-icon--transformer_change":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M0 12a.75.75 0 0 1 .75-.75H3.5a.75.75 0 0 1 0 1.5H.75A.75.75 0 0 1 0 12ZM19.75 12a.75.75 0 0 1 .75-.75h2.75a.75.75 0 0 1 0 1.5H20.5a.75.75 0 0 1-.75-.75Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M9 16.5a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM9 18A6 6 0 1 0 9 6a6 6 0 0 0 0 12Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M15 16.5a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm0 1.5a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--transformer_change-color":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M0 12a.75.75 0 0 1 .75-.75H3.5a.75.75 0 0 1 0 1.5H.75A.75.75 0 0 1 0 12ZM19.75 12a.75.75 0 0 1 .75-.75h2.75a.75.75 0 0 1 0 1.5H20.5a.75.75 0 0 1-.75-.75Z' fill='%2329D305'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M9 16.5a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM9 18A6 6 0 1 0 9 6a6 6 0 0 0 0 12Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M15 16.5a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm0 1.5a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--tree_falling":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M21.207 9.351c.524-.324.83-.915.79-1.534l-.407-6.245a1.673 1.673 0 0 0-.837-1.345 1.677 1.677 0 0 0-1.585-.053l-5.604 2.773a1.678 1.678 0 0 0-.93 1.452c-.018.62.306 1.198.842 1.511l.094.053L8.94 7.946c-.59.254-.978.81-1.014 1.446a1.68 1.68 0 0 0 .802 1.535l-5.68 2.314a1.694 1.694 0 0 0-1.043 1.44 1.69 1.69 0 0 0 .836 1.57l5.78 3.34-1.26 2.184a.848.848 0 0 0 .306 1.15c.13.078.277.113.418.113a.828.828 0 0 0 .725-.42l1.261-2.183 5.78 3.34a1.679 1.679 0 0 0 1.774-.059c.53-.353.813-.997.725-1.622l-.843-6.091a1.677 1.677 0 0 0 2.475-1.67l-.6-5.005.093.053a1.676 1.676 0 0 0 1.733-.03Zm-2.44-2.32a.85.85 0 0 0-.884.024.847.847 0 0 0-.37.803l.8 6.675-1.455-.838a.848.848 0 0 0-.89.03.85.85 0 0 0-.365.814l1.072 7.79-6.505-3.759h-.006L3.677 14.8l7.277-2.963a.838.838 0 0 0 .1-1.505L9.6 9.493l6.175-2.638a.841.841 0 0 0 .088-1.5l-1.55-.897 5.604-2.774.407 6.245-1.556-.897Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--tree_powerline":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M1.508 1.517a.778.778 0 0 0-.979-.478.751.751 0 0 0-.49.955c.555 1.624 1.773 3.59 3.121 5.29.947 1.194 2.005 2.318 3.004 3.124a1.378 1.378 0 0 0-.145.272c-.136.343-.126.718.026 1.054.12.26.323.483.575.629l-4.757 1.96a1.384 1.384 0 0 0-.759.749c-.142.34-.14.715.005 1.053.12.282.338.52.614.67l4.902 2.677-1.034 1.804a.68.68 0 0 0 .271.938c.34.186.77.067.96-.265l1.034-1.802 4.902 2.678c.328.179.708.222 1.07.123.363-.1.664-.33.849-.65.154-.268.213-.581.165-.884l-.776-4.983c.677.35 1.522.108 1.896-.55.146-.256.206-.559.166-.851l-.238-1.731a7.027 7.027 0 0 0 3.637-1.048c1.89-1.153 3.567-3.373 4.455-7.362a.755.755 0 0 0-.592-.898.774.774 0 0 0-.92.577c-.827 3.716-2.323 5.524-3.763 6.402-1.028.627-2.1.823-3.022.838l-.12-.876.082.045c.679.37 1.541.133 1.921-.53.137-.24.198-.508.176-.78l-.41-5.12a1.375 1.375 0 0 0-.72-1.095 1.433 1.433 0 0 0-1.332-.024L10.6 5.764a1.373 1.373 0 0 0-.7.803c-.116.35-.085.724.086 1.052.13.246.319.438.57.576l.082.045-2.986 1.292C6.883 8.897 5.335 7.56 4.384 6.36 3.088 4.725 1.985 2.914 1.508 1.517Zm5.887 9.69c.049-.028.146-.087.257-.168L12.5 8.94a.683.683 0 0 0 .059-1.231l-1.317-.719 4.684-2.337.41 5.118-1.313-.718a.718.718 0 0 0-.742.032.681.681 0 0 0-.303.662l.751 5.464-1.232-.673a.726.726 0 0 0-.747.034.686.686 0 0 0-.295.67l.995 6.376-11.038-6.027 6.087-2.509a.694.694 0 0 0 .43-.596.691.691 0 0 0-.36-.64v.001l-1.174-.64Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--tree_powerline-color":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M23.39 3.99c.418.09.683.491.592.899-.888 3.99-2.564 6.209-4.455 7.362-1.876 1.143-3.635 1.128-4.9.975V11.75c1.085.13 2.625.106 4.08-.781 1.44-.878 2.936-2.686 3.763-6.402a.774.774 0 0 1 .92-.577Z' fill='%2329D305'/%3e%3cpath d='M.53 1.039a.778.778 0 0 1 .978.478c.477 1.397 1.58 3.208 2.876 4.843 1.305 1.646 3.737 3.554 3.73 3.546-.009-.008.207.295 0 .66-.208.365-.752.66-.752.66-1.302-.705-2.863-2.253-4.202-3.942C1.812 5.584.594 3.618.04 1.994a.751.751 0 0 1 .49-.955Z' fill='%2329D305'/%3e%3cpath d='M5.862 22.214a.68.68 0 0 1-.271-.938l1.034-1.804-4.902-2.677a1.396 1.396 0 0 1-.614-.67 1.338 1.338 0 0 1-.005-1.053c.143-.341.413-.607.76-.749l4.756-1.96a1.405 1.405 0 0 1-.575-.63 1.336 1.336 0 0 1-.026-1.053c.136-.344.4-.616.746-.764l3.872-1.676-.082-.045a1.376 1.376 0 0 1-.57-.576A1.342 1.342 0 0 1 9.9 6.567c.115-.35.364-.636.7-.803l4.683-2.336a1.433 1.433 0 0 1 1.331.025c.414.225.684.634.72 1.095l.41 5.119c.023.272-.038.54-.175.78-.38.663-1.242.9-1.921.53l-.083-.045.564 4.098c.04.292-.02.595-.166.852a1.433 1.433 0 0 1-1.896.549l.776 4.983c.048.302-.011.616-.165.883a1.434 1.434 0 0 1-1.918.528l-4.903-2.678-1.033 1.802a.715.715 0 0 1-.961.265Zm2.707-10.366a.691.691 0 0 1 .36.639.693.693 0 0 1-.43.596l-6.087 2.51 11.038 6.026-.995-6.376a.686.686 0 0 1 .295-.67.726.726 0 0 1 .747-.034l1.232.673-.751-5.464a.681.681 0 0 1 .303-.662.718.718 0 0 1 .742-.032l1.314.718-.41-5.118-4.685 2.337 1.316.719A.683.683 0 0 1 12.5 8.94l-5.164 2.234 1.232.673Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--unlock":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M8.25 24A2.252 2.252 0 0 1 6 21.75v-10.5A2.252 2.252 0 0 1 8.25 9h2.25V6c0-2.481-2.019-4.5-4.5-4.5A4.505 4.505 0 0 0 1.5 6v3.75a.75.75 0 0 1-1.5 0V6c0-3.308 2.692-6 6-6s6 2.692 6 6v3h9.75A2.252 2.252 0 0 1 24 11.25v10.5A2.252 2.252 0 0 1 21.75 24H8.25Zm0-13.5a.75.75 0 0 0-.75.75v10.5c0 .414.336.75.75.75h13.5a.75.75 0 0 0 .75-.75v-10.5a.75.75 0 0 0-.75-.75H8.25Z' fill='black'/%3e%3cpath d='M15 18.75a.75.75 0 0 1-.75-.75v-3a.75.75 0 0 1 1.5 0v3a.75.75 0 0 1-.75.75Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--upload":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M11.251 15.75a.75.75 0 0 0 1.5 0V5.56l3.22 3.22a.749.749 0 1 0 1.06-1.06l-4.499-4.499a.754.754 0 0 0-.257-.169l-.013-.004a.731.731 0 0 0-.522 0l-.025.009a.74.74 0 0 0-.245.163l-4.499 4.5a.743.743 0 0 0-.22.53c0 .2.078.389.22.53a.746.746 0 0 0 1.06.001l3.22-3.22V15.75Z' fill='black'/%3e%3cpath d='M.001 17.25A3.754 3.754 0 0 0 3.751 21h16.5a3.754 3.754 0 0 0 3.75-3.75v-1.5a.75.75 0 0 0-1.5 0v1.5a2.252 2.252 0 0 1-2.25 2.25h-16.5a2.252 2.252 0 0 1-2.25-2.25v-1.5a.75.75 0 0 0-1.5 0v1.5Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--user_testing-color":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M1.881 17.25A1.885 1.885 0 0 1 0 15.388V1.862A1.879 1.879 0 0 1 1.871 0h16.498c1.03 0 1.872.835 1.881 1.861V4.5a.75.75 0 0 1-.75.75h-18v10.131a.378.378 0 0 0 .379.369h9.371a.75.75 0 0 1 0 1.5H1.881ZM18.75 3.75V1.868a.377.377 0 0 0-.378-.368h-16.5a.373.373 0 0 0-.372.368V3.75h17.25Z' fill='black'/%3e%3cpath d='M11.888 24a1.5 1.5 0 0 1-1.315-2.22l4.432-7.001L15 10.5c0-.827.673-1.5 1.5-1.5H18c.827 0 1.5.673 1.5 1.5v4.287l4.204 6.992a1.505 1.505 0 0 1-.256 1.782 1.489 1.489 0 0 1-1.06.439h-10.5Zm10.5-1.5-2.255-3.75h-5.867l-2.371 3.744 10.493.006Zm-3.157-5.25-1.011-1.683a1.478 1.478 0 0 1-.22-.779V10.5h-1.5v4.287a1.512 1.512 0 0 1-.223.787l-1.061 1.676h4.015Z' fill='black'/%3e%3cpath d='M21.75 9.75A.75.75 0 0 1 21 9v-.75h-.75a.75.75 0 0 1 0-1.5H21V6a.75.75 0 0 1 1.5 0v.75h.75a.75.75 0 0 1 0 1.5h-.75V9a.75.75 0 0 1-.75.75ZM11.25 11.85a.75.75 0 0 1-.75-.75v-.75h-.75a.75.75 0 0 1 0-1.5h.75V8.1a.75.75 0 0 1 1.5 0v.75h.75a.75.75 0 0 1 0 1.5H12v.75a.75.75 0 0 1-.75.75Z' fill='%2329D305'/%3e%3c/svg%3e",
     "e-icon--users":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M4.125 7.875a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0ZM7.5 3a4.875 4.875 0 1 0 0 9.75 7.5 7.5 0 0 0-7.5 7.5.75.75 0 0 0 1.5 0 6 6 0 1 1 12 0 .75.75 0 0 0 1.5 0 7.5 7.5 0 0 0-7.5-7.5A4.875 4.875 0 1 0 7.5 3Zm10.227 4.5a2.625 2.625 0 1 0 0 5.25 2.625 2.625 0 0 0 0-5.25Zm-4.125 2.625a4.125 4.125 0 1 1 5.283 3.96A6.277 6.277 0 0 1 24 20.25a.75.75 0 0 1-1.5 0 4.775 4.775 0 0 0-6.428-4.478.75.75 0 1 1-.518-1.408c.33-.122.67-.215 1.013-.28a4.127 4.127 0 0 1-2.965-3.959Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--view_off":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M2.782 20.3a.788.788 0 0 1-.54-.212.66.66 0 0 1-.21-.493.664.664 0 0 1 .231-.486L21.011 2.503a.78.78 0 0 1 .519-.193c.203 0 .4.078.54.213a.658.658 0 0 1-.02.979L3.302 20.109a.787.787 0 0 1-.52.191ZM11.986 18.917h-.11c-1.048 0-2.103-.15-3.136-.445-.395-.114-.616-.502-.494-.866a.742.742 0 0 1 .717-.487c.075 0 .15.01.222.032a9.83 9.83 0 0 0 2.708.384h.25c3.852 0 7.754-2.57 10.123-4.975a.792.792 0 0 0-.002-1.126 19.343 19.343 0 0 0-2.959-2.447.681.681 0 0 1-.299-.452.647.647 0 0 1 .135-.515.794.794 0 0 1 1.048-.151 20.87 20.87 0 0 1 3.187 2.636c.832.852.832 2.133.003 2.983-2.586 2.626-6.894 5.43-11.236 5.43l-.157-.001ZM3.317 15.783a.793.793 0 0 0 .46.145c.234 0 .45-.097.593-.264a.648.648 0 0 0 .152-.51.678.678 0 0 0-.284-.461 19.623 19.623 0 0 1-2.502-2.131.792.792 0 0 1-.002-1.126C4.102 9.032 8.01 6.463 11.872 6.463h.23c.718 0 1.434.08 2.128.24.06.012.12.02.182.02.345 0 .645-.216.728-.525.099-.371-.146-.747-.547-.839a11.146 11.146 0 0 0-2.5-.281l-.237-.001c-4.34 0-8.649 2.804-11.234 5.428-.83.85-.83 2.132.003 2.984.824.832 1.73 1.603 2.692 2.294Z' fill='black'/%3e%3cpath d='M8.249 12.69c-.413 0-.75-.31-.75-.693 0-1.107.468-2.149 1.318-2.934.85-.785 1.978-1.217 3.178-1.217.207 0 .374.154.375.345l.002.692c0 .092-.039.18-.109.245a.387.387 0 0 1-.265.101c-.8 0-1.554.29-2.12.812-.567.523-.88 1.218-.88 1.956a.664.664 0 0 1-.218.49.78.78 0 0 1-.531.202ZM11.624 15.803c0 .192.168.346.375.346 1.202 0 2.332-.433 3.182-1.217.85-.784 1.317-1.827 1.317-2.936 0-.382-.336-.692-.75-.692s-.75.31-.75.692a2.65 2.65 0 0 1-.878 1.958 3.11 3.11 0 0 1-2.122.811.389.389 0 0 0-.265.101.33.33 0 0 0-.11.245l.001.692Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--view_on":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M8.816 14.933c.85.784 1.98 1.217 3.181 1.217 1.202 0 2.332-.432 3.182-1.215.85-.785 1.319-1.826 1.319-2.939 0-1.109-.468-2.15-1.318-2.935-.85-.783-1.98-1.215-3.182-1.215-2.48 0-4.5 1.862-4.5 4.15 0 1.11.468 2.152 1.318 2.937ZM9 11.997c0-1.526 1.345-2.767 3-2.767.8 0 1.553.288 2.12.81.566.521.878 1.216.878 1.958 0 .739-.313 1.434-.879 1.957a3.11 3.11 0 0 1-2.12.81 3.11 3.11 0 0 1-2.122-.811A2.647 2.647 0 0 1 9 11.997Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M.623 13.49c2.583 2.624 6.886 5.428 11.218 5.428h.144l.15.001c4.347 0 8.657-2.805 11.243-5.43.83-.85.83-2.132-.002-2.983-2.585-2.623-6.89-5.426-11.218-5.426h-.303c-4.342 0-8.65 2.803-11.234 5.428-.828.849-.828 2.13.002 2.982Zm1.11-2.054C4.1 9.032 8.002 6.463 11.853 6.463l.132.002.156-.001c3.85 0 7.754 2.568 10.122 4.97a.792.792 0 0 1 .002 1.126c-2.369 2.405-6.277 4.975-10.144 4.975l-.136-.002-.13.002c-3.853 0-7.754-2.57-10.12-4.973a.792.792 0 0 1-.002-1.126Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--warning_circle":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M0 12c0 6.617 5.383 12 12 12s12-5.383 12-12S18.617 0 12 0 0 5.383 0 12Zm1.5 0C1.5 6.21 6.21 1.5 12 1.5S22.5 6.21 22.5 12 17.79 22.5 12 22.5 1.5 17.79 1.5 12ZM12 14.25a.75.75 0 0 1-.75-.75V5.25a.75.75 0 0 1 1.5 0v8.25a.75.75 0 0 1-.75.75ZM12 18a1.125 1.125 0 1 0 0-2.25A1.125 1.125 0 0 0 12 18Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--warning_circle-filled":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12 24C5.383 24 0 18.617 0 12S5.383 0 12 0s12 5.383 12 12-5.383 12-12 12Z' fill='black'/%3e%3cpath d='M12 18a1.125 1.125 0 1 0 0-2.25A1.125 1.125 0 0 0 12 18ZM12 14.25a.75.75 0 0 1-.75-.75V5.25a.75.75 0 0 1 1.5 0v8.25a.75.75 0 0 1-.75.75Z' fill='white'/%3e%3c/svg%3e",
     "e-icon--warning_electricity-color":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M10.307 20.25a.846.846 0 0 1-.304-.06.434.434 0 0 1-.076-.03.839.839 0 0 1-.12-.073l-.018-.013a.856.856 0 0 1-.17-.177l-.027-.039a.838.838 0 0 1-.09-.193c-.006-.016-.012-.031-.015-.047l-.846-3.333a.834.834 0 0 1 .82-1.035c.39 0 .727.26.822.63l.29 1.148 1.751-3.445H9.461a.847.847 0 0 1-.706-.374.819.819 0 0 1-.071-.787l2.539-5.833a.849.849 0 0 1 1.111-.438.83.83 0 0 1 .445 1.094l-2.035 4.671h2.949c.291 0 .566.152.72.395.155.249.17.55.037.81l-2.563 5.047 1.6-.393a.842.842 0 0 1 1.027.607.833.833 0 0 1-.615 1.01l-3.385.833a.94.94 0 0 1-.207.024Z' fill='black'/%3e%3cpath d='m21.717 23.254-19.434-.02a2.238 2.238 0 0 1-2-3.33l9.748-17.98a2.24 2.24 0 0 1 3.938 0l9.748 18a2.241 2.241 0 0 1-2 3.33ZM12.03 2.234a.77.77 0 0 0-.66.39l-9.737 18a.75.75 0 0 0 0 .74.77.77 0 0 0 .65.37h19.494a.77.77 0 0 0 .65-.37.78.78 0 0 0 0-.74l-9.747-18a.77.77 0 0 0-.65-.39Z' fill='%23FFA000'/%3e%3c/svg%3e",
     "e-icon--warning_triangle":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='m22.235 20.515-9.74-17.561a.569.569 0 0 0-.99 0l-9.74 17.56c-.205.37.067.821.495.821h19.48c.428 0 .7-.45.495-.82Zm1.486-.797c.82 1.479-.268 3.282-1.981 3.282H2.26C.547 23-.542 21.197.28 19.718l9.74-17.561c.854-1.543 3.106-1.543 3.962 0l9.74 17.56Zm-11.739.125c-.612 0-1.11-.49-1.11-1.092 0-.602.498-1.092 1.11-1.092.613 0 1.111.49 1.111 1.092 0 .602-.498 1.092-1.11 1.092Zm-.74-4.37c0 .403.332.729.74.729s.74-.327.74-.728V8.19a.735.735 0 0 0-.74-.728.735.735 0 0 0-.74.728v7.283Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--warning_circle-filled-color":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3ccircle cx='12' cy='12' r='12' fill='%2329D305'/%3e%3cpath d='M12.125 18a1.125 1.125 0 1 0 0-2.25 1.125 1.125 0 0 0 0 2.25ZM12.125 14.25a.75.75 0 0 1-.75-.75V5.25a.75.75 0 0 1 1.5 0v8.25a.75.75 0 0 1-.75.75Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--water_heater":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M13.04 16.872a1.13 1.13 0 1 0-2.258 0 1.13 1.13 0 0 0 2.258 0Zm-1.13 0Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M12.66.75a.75.75 0 0 0-1.5 0v1.249H8c-.679 0-1.327.184-1.828.517-.494.328-.922.865-.922 1.562v17.611c0 .036.003.072.008.107a2.568 2.568 0 0 0 2.78 2.192h7.923a2.56 2.56 0 0 0 2.782-2.196.751.751 0 0 0 .007-.103V4.078c0-.693-.422-1.231-.917-1.562C17.333 2.182 16.683 2 16 2h-3.34V.749ZM7.003 3.764c-.231.154-.253.28-.253.314v.92h10.5v-.92c0-.036-.023-.163-.25-.315-.222-.148-.573-.265-1-.265H8c-.421 0-.773.117-.997.266ZM6.75 6.497v15.131a1.07 1.07 0 0 0 1.168.865A.746.746 0 0 1 8 22.49h8c.029 0 .057.002.086.005a1.06 1.06 0 0 0 1.164-.863V6.497H6.75Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M9 20.24a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 .75.75v2.998a.75.75 0 0 1-.75.75h-4.5a.75.75 0 0 1-.75-.75V20.24Zm1.5.75v1.499h3v-1.5h-3Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--washing_machine":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M11.952 9.24a4.85 4.85 0 1 0 0 9.7 4.85 4.85 0 0 0 0-9.7Zm-6.35 4.85a6.35 6.35 0 1 1 12.7 0 6.35 6.35 0 0 1-12.7 0Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M11.202 11.03a.75.75 0 0 1 .75-.75 3.81 3.81 0 0 1 3.81 3.81.75.75 0 0 1-1.5 0 2.31 2.31 0 0 0-2.31-2.31.75.75 0 0 1-.75-.75Z' fill='black'/%3e%3cpath d='M6.482 4.125a1.125 1.125 0 1 1-2.25 0 1.125 1.125 0 0 1 2.25 0ZM10.732 4.125a1.125 1.125 0 1 1-2.25 0 1.125 1.125 0 0 1 2.25 0Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M19.25 1.5H4.75A2.5 2.5 0 0 0 2.25 4v16a2.5 2.5 0 0 0 2.5 2.5h14.5a2.5 2.5 0 0 0 2.5-2.5V4a2.5 2.5 0 0 0-2.5-2.5ZM4.75 0a4 4 0 0 0-4 4v16a4 4 0 0 0 4 4h14.5a4 4 0 0 0 4-4V4a4 4 0 0 0-4-4H4.75Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--web_library-color":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M23.19 4.446a2.35 2.35 0 0 0-1.89-.559 17.807 17.807 0 0 0-8.76 3.997.92.92 0 0 1-.54.13.87.87 0 0 1-.51-.17A17.757 17.757 0 0 0 2.7 3.847a2.322 2.322 0 0 0-1.87.56A2.358 2.358 0 0 0 0 6.225v11.21a2.357 2.357 0 0 0 2.05 2.329 16.256 16.256 0 0 1 8.5 3.736c.414.324.925.5 1.45.5.529 0 1.042-.176 1.46-.5A16.156 16.156 0 0 1 22 19.764a2.36 2.36 0 0 0 2-2.328V6.225a2.347 2.347 0 0 0-.81-1.779Zm-21 13.829a.85.85 0 0 1-.74-.84V6.226a.869.869 0 0 1 .86-.86h.12a16.376 16.376 0 0 1 8.11 3.648c.215.163.455.29.71.38v12.759a17.657 17.657 0 0 0-9.01-3.877h-.05Zm20.26-.84a.849.849 0 0 1-.73.84 17.727 17.727 0 0 0-9 3.877V9.422a2.77 2.77 0 0 0 .77-.41 16.307 16.307 0 0 1 8-3.666.86.86 0 0 1 1 .859l-.04 11.23Z' fill='black'/%3e%3cpath d='M3.81 1.499a16.895 16.895 0 0 1 6.73 3.427 2.371 2.371 0 0 0 2.94 0 17.005 17.005 0 0 1 6.73-3.407.75.75 0 0 0 .54-.91.757.757 0 0 0-.91-.589 18.657 18.657 0 0 0-7.3 3.697.87.87 0 0 1-1.06 0A18.536 18.536 0 0 0 4.17.02a.76.76 0 0 0-.91.55.749.749 0 0 0 .55.929Z' fill='%2329D305'/%3e%3c/svg%3e",
     "e-icon--worker":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M12 14.42c-4.735 0-8.578 3.925-8.578 8.84 0 .408-.318.74-.711.74-.393 0-.711-.332-.711-.74 0-5.753 4.498-10.322 10-10.322 5.506 0 10 4.673 10 10.321 0 .41-.318.74-.71.74-.393 0-.712-.33-.712-.74 0-4.82-3.847-8.84-8.578-8.84ZM6.504 5.32c.418 0 .758.355.758.79 0 2.715 2.078 4.794 4.6 4.794 2.514 0 4.6-2.174 4.6-4.793 0-.436.34-.79.759-.79s.758.354.758.79c0 3.491-2.766 6.374-6.117 6.374-3.341 0-6.117-2.768-6.117-6.374 0-.436.34-.79.759-.79Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M10.021.748c.414-.07.803.222.87.652l.81 5.162c.067.431-.213.837-.627.907-.413.07-.803-.221-.87-.652l-.809-5.162c-.067-.43.213-.837.626-.907ZM13.773 1.004s.986.056.91.485l-.91 5.162c-.075.429-.47.713-.883.634-.412-.079-.684-.49-.609-.92l.91-5.162c.076-.429.582-.2.582-.2Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M4 6.69c0-.437.358-.79.8-.79h14.4c.442 0 .8.353.8.79 0 .436-.358.79-.8.79H4.8a.795.795 0 0 1-.8-.79Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M10.384 2.145a1.302 1.302 0 0 1-.447.32l-.005.001c-1.63.716-2.67 2.318-2.67 4.329 0 .436-.34.316-.758.316-.42 0-.759.12-.759-.316 0-2.582 1.343-4.744 3.493-5.737.027-.092.078-.234.18-.38.226-.32.564-.472.922-.555.358-.084.848-.123 1.522-.123.677 0 1.174.04 1.543.12.368.081.694.22.933.487a1.337 1.337 0 0 1 .268.46c2.158 1.006 3.373 3.18 3.373 5.728 0 .436-.44.316-.86.316-.418 0-.656.12-.656-.316 0-2.039-.963-3.624-2.57-4.329a1.266 1.266 0 0 1-.656-.708l-.023-.059a1.199 1.199 0 0 0-.12-.032c-.219-.048-.594-.087-1.232-.087-.64 0-.997.04-1.192.085a1.278 1.278 0 0 0-.025.006 1.226 1.226 0 0 1-.261.474Zm2.887-.423Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--work_under_line-color":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M22.374 1.111a.633.633 0 0 0 .024-.89.622.622 0 0 0-.884-.024c-1.905 1.821-5.27 2.998-8.866 3.106C9.06 3.41 5.386 2.449 2.854.17a.622.622 0 0 0-.883.05.633.633 0 0 0 .05.89c2.841 2.557 6.866 3.566 10.663 3.452 3.788-.113 7.49-1.348 9.69-3.45Z' fill='%2329D305'/%3e%3cpath d='M5.25 21.9a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM12.25 21.9a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M23.557 11.518c.08.127.125.272.13.422l.31 4.273a.813.813 0 0 1-.3.707.814.814 0 0 1-.73.177l-4.513-1.042a.904.904 0 0 1-.457-.238.88.88 0 0 1-.203-.954.886.886 0 0 1 .32-.399l1.998-1.454a.09.09 0 0 0 .027-.063.087.087 0 0 0-.027-.064L16 6.95l-1.039.884a.116.116 0 0 0 0 .088l.328 2.257c.301 2.067.652 4.475.808 5.66a2.901 2.901 0 0 1-.13 1.452c0 .013.002.026.008.038a.079.079 0 0 0 .062.043 2.835 2.835 0 0 1 1.452 1.02c.36.485.551 1.07.546 1.671v1.324a2.581 2.581 0 0 1-.765 1.84 2.669 2.669 0 0 1-1.862.773H2.626a2.668 2.668 0 0 1-1.862-.773A2.581 2.581 0 0 1 0 21.387v-1.324a2.692 2.692 0 0 1 .583-1.722 2.771 2.771 0 0 1 1.554-.98 3.87 3.87 0 0 1-.14-.893v-2.81a1.615 1.615 0 0 1 .373-1.217 1.662 1.662 0 0 1 1.145-.59h4.713a.1.1 0 0 0 .071-.028.098.098 0 0 0 .03-.07V7.726a2.486 2.486 0 0 1 .658-1.906c.093-.09.196-.167.306-.231 1.614.236 3.202.206 4.709-.002.249.207.532.602.62 1.088l.876-.644a1 1 0 0 1 1.405.223l4.307 6 1.059-.756-4.636-6.772c.376-.126.742-.261 1.097-.403l4.827 7.194Zm-.66 4.321-.179-3.32-3.295 2.456a.1.1 0 0 0-.057.088.097.097 0 0 0 .057.089l3.345.786a.101.101 0 0 0 .09-.016.097.097 0 0 0 .04-.083ZM1.666 19.054c-.25.278-.384.638-.377 1.01l-.01 1.378c0 .352.142.69.394.94.253.25.596.393.954.395h12.782a1.368 1.368 0 0 0 .95-.395c.125-.124.223-.27.29-.432.066-.162.11-.389.108-.563v-1.324a1.468 1.468 0 0 0-.373-1.006c-.247-.278-.51-.515-.883-.557H2.718c-.375.04-.803.276-1.053.554Zm12.355-1.76H3.625a.363.363 0 0 1-.25-.08c-.13-.103-.13-.167-.13-.707V13.66c0-.423.2-.501.31-.501h5.081a1 1 0 0 0 1-1V7.539c0-.539.364-.884.864-.884h2.642a.455.455 0 0 1 .409.295s.998 6.876 1.278 9.056a1.227 1.227 0 0 1-.21 1.032c-.124.222-.451.262-.599.255Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--worker-color":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M12 14.42c-4.735 0-8.578 3.925-8.578 8.84 0 .408-.318.74-.711.74-.393 0-.711-.332-.711-.74 0-5.753 4.498-10.322 10-10.322 5.506 0 10 4.673 10 10.321 0 .41-.318.74-.71.74-.393 0-.712-.33-.712-.74 0-4.82-3.847-8.84-8.578-8.84ZM6.504 5.32c.418 0 .758.355.758.79 0 2.715 2.078 4.794 4.6 4.794 2.514 0 4.6-2.174 4.6-4.793 0-.436.34-.79.759-.79s.758.354.758.79c0 3.491-2.766 6.374-6.117 6.374-3.341 0-6.117-2.768-6.117-6.374 0-.436.34-.79.759-.79Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M10.021.748c.414-.07.803.222.87.652l.81 5.162c.067.431-.213.837-.627.907-.413.07-.803-.221-.87-.652l-.809-5.162c-.067-.43.213-.837.626-.907ZM13.773 1.004s.986.056.91.485l-.91 5.162c-.075.429-.47.713-.883.634-.412-.079-.684-.49-.609-.92l.91-5.162c.076-.429.582-.2.582-.2Z' fill='%2329D305'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M4 6.69c0-.437.358-.79.8-.79h14.4c.442 0 .8.353.8.79 0 .436-.358.79-.8.79H4.8a.795.795 0 0 1-.8-.79Z' fill='%2329D305'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M10.384 2.145a1.302 1.302 0 0 1-.447.32l-.005.001c-1.63.716-2.67 2.318-2.67 4.329 0 .436-.34.316-.758.316-.42 0-.759.12-.759-.316 0-2.582 1.343-4.744 3.493-5.737.027-.092.078-.234.18-.38.226-.32.564-.472.922-.555.358-.084.848-.123 1.522-.123.677 0 1.174.04 1.543.12.368.081.694.22.933.487a1.337 1.337 0 0 1 .268.46c2.158 1.006 3.373 3.18 3.373 5.728 0 .436-.44.316-.86.316-.418 0-.656.12-.656-.316 0-2.039-.963-3.624-2.57-4.329a1.266 1.266 0 0 1-.656-.708l-.023-.059a1.199 1.199 0 0 0-.12-.032c-.219-.048-.594-.087-1.232-.087-.64 0-.997.04-1.192.085a1.278 1.278 0 0 0-.025.006 1.226 1.226 0 0 1-.261.474Zm2.887-.423Z' fill='%2329D305'/%3e%3c/svg%3e",
     "e-icon--wrench":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cg clip-path='url(%23a)'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M15.325.064a7.697 7.697 0 0 1 4.68.877.75.75 0 0 1 .17 1.19l-3.6 3.6a.752.752 0 0 0 0 1.06l.8.8a.75.75 0 0 0 1.061 0l3.55-3.546a.75.75 0 0 1 1.2.195 7.7 7.7 0 0 1-9.704 10.613l-8.475 8.475a2.295 2.295 0 0 1-3.244 0l-1.09-1.092a2.294 2.294 0 0 1 0-3.243l8.481-8.476A7.697 7.697 0 0 1 15.325.064Zm5.361 12.01a6.2 6.2 0 0 0 1.556-6.164l-2.745 2.742a2.25 2.25 0 0 1-3.182 0l-.8-.8a2.25 2.25 0 0 1 0-3.183l2.828-2.828a6.197 6.197 0 0 0-7.62 8.523.75.75 0 0 1-.148.853l-8.843 8.837a.794.794 0 0 0 0 1.121l1.092 1.093a.793.793 0 0 0 1.122 0l8.836-8.837a.75.75 0 0 1 .853-.146 6.196 6.196 0 0 0 7.051-1.212Z' fill='black'/%3e%3c/g%3e%3cdefs%3e%3cclipPath id='a'%3e%3cpath fill='white' d='M0 0h24v24H0z'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e",
     "e-icon--zoom_in":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M9.813 1.499a8.313 8.313 0 1 0-.002 16.626A8.313 8.313 0 0 0 9.813 1.5Zm-5.452.153a9.813 9.813 0 1 1 10.902 16.32A9.813 9.813 0 0 1 4.361 1.652Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M4.5 9.749a.75.75 0 0 1 .75-.75h9a.75.75 0 0 1 0 1.5h-9a.75.75 0 0 1-.75-.75Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M9.75 4.499a.75.75 0 0 1 .75.75v9a.75.75 0 0 1-1.5 0v-9a.75.75 0 0 1 .75-.75ZM15.69 15.689a.75.75 0 0 1 1.061 0l7.03 7.03a.75.75 0 0 1-1.061 1.06l-7.03-7.03a.75.75 0 0 1 0-1.06Z' fill='black'/%3e%3c/svg%3e",
     "e-icon--zoom_out":"data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M9.812 1.499a8.313 8.313 0 1 0 0 16.626 8.313 8.313 0 0 0 0-16.626Zm-5.452.154A9.813 9.813 0 1 1 15.264 17.97 9.813 9.813 0 0 1 4.36 1.653Z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M4.5 9.749a.75.75 0 0 1 .75-.75h9a.75.75 0 0 1 0 1.5h-9a.75.75 0 0 1-.75-.75ZM15.69 15.689a.75.75 0 0 1 1.061 0l7.03 7.03a.75.75 0 0 1-1.061 1.06l-7.03-7.03a.75.75 0 0 1 0-1.06Z' fill='black'/%3e%3c/svg%3e"};
    let deprecated = [
    {
        name: "e-icon--arrow_circle-color",
        version: "4.7.0",
        newIconName: "e-icon--arrow_right_circle-color"
      }
    ,{
        name: "e-icon--arrow_circle-filled-color",
        version: "4.7.0",
        newIconName: "e-icon--arrow_right_circle-filled-color"
      }
    ,{
        name: "e-icon--arrow_external",
        version: "7.4.0",
        newIconName: "e-icon--new_tab-bold"
      }
    ,{
        name: "e-icon--arrow_external-bold",
        version: "7.4.0",
        newIconName: "e-icon--new_tab-bold"
      }
    ,{
        name: "e-icon--arrow_long",
        version: "6.2.0",
        newIconName: "e-icon--arrow_long_right"
      }
    ,{
        name: "e-icon--arrow_long-bold",
        version: "6.2.0",
        newIconName: "e-icon--arrow_long_right-bold"
      }
    ,{
        name: "e-icon--check",
        version: "7.5.0",
        newIconName: "e-icon--check-bold"
      }
    ,{
        name: "e-icon--close",
        version: "7.5.0",
        newIconName: "e-icon--close-bold"
      }
    ,{
        name: "e-icon--design_process-color",
        version: "7.5.0",
        newIconName: "e-icon--bookshelf"
      }
    ,{
        name: "e-icon--minus",
        version: "7.5.0",
        newIconName: "e-icon--minus-bold"
      }
    ,{
        name: "e-icon--plus",
        version: "7.5.0",
        newIconName: "e-icon--plus-bold"
      }
    ,{
        name: "e-icon--profile-2",
        version: "7.5.0",
        newIconName: "e-icon--profile"
      }
    ,{
        name: "e-icon--profile-2-color",
        version: "7.5.0",
        newIconName: "e-icon--profile"
      }
    ,{
        name: "e-icon--settings_vertical",
        version: "7.14.1",
        newIconName: "e-icon--configurations"
      }
    ,{
        name: "e-icon--tag_add",
        version: "7.5.0",
        newIconName: "e-icon--add_circle"
      }
    ];
  
  let deprecatedElvisClasses = [
  {
    name: "e-position-picker",
    version: "10.0.0",
    sunset: "July 2023"
  },
  {
    name: "e-position-picker__icon",
    version: "10.0.0",
    sunset: "July 2023"
  },
  {
    name: "e-position-picker__description",
    version: "10.0.0",
    sunset: "July 2023"
  },
  {
    name: "e-position-picker__action",
    version: "10.0.0",
    sunset: "July 2023"
  },
  {
    name: "e-alert--close",
    version: "9.9.0",
    requiredAncestor: "e-alert--local",
    sunset: "July 2023"
  },
  {
    name: "e-link--shortcut",
    version: "9.5.0",
    replacement: {
      name: "Card",
      type: "component",
      documentation: "https://design.elvia.io/components/card"
    },
    sunset: "March 2023"
  },
  {
    name: "e-tooltip",
    version: "8.13.0",
    replacement: {
      name: "Tooltip",
      type: "component",
      documentation: "https://design.elvia.io/components/tooltip"
    },
    sunset: "March 2023"
  },
  {
    name: "e-tooltip__content",
    version: "8.13.0",
    replacement: {
      name: "Tooltip",
      type: "component",
      documentation: "https://design.elvia.io/components/tooltip"
    },
    sunset: "March 2023"
  },
  {
    name: "e-tooltip__content--bottom",
    version: "8.13.0",
    replacement: {
      name: "Tooltip",
      type: "component",
      documentation: "https://design.elvia.io/components/tooltip"
    },
    sunset: "March 2023"
  },
  {
    name: "e-tooltip__content--top",
    version: "8.13.0",
    replacement: {
      name: "Tooltip",
      type: "component",
      documentation: "https://design.elvia.io/components/tooltip"
    },
    sunset: "March 2023"
  },
  {
    name: "e-tooltip__content--left",
    version: "8.13.0",
    replacement: {
      name: "Tooltip",
      type: "component",
      documentation: "https://design.elvia.io/components/tooltip"
    },
    sunset: "March 2023"
  },
  {
    name: "e-tooltip__content--right",
    version: "8.13.0",
    replacement: {
      name: "Tooltip",
      type: "component",
      documentation: "https://design.elvia.io/components/tooltip"
    },
    sunset: "March 2023"
  },
  {
    name: "e-header",
    version: "8.13.0",
    replacement: {
      name: "Header",
      type: "component",
      documentation: "https://design.elvia.io/components/header"
    },
    sunset: "March 2023"
  },
  {
    name: "e-header__top-bar",
    version: "8.13.0",
    replacement: {
      name: "Header",
      type: "component",
      documentation: "https://design.elvia.io/components/header"
    },
    sunset: "March 2023"
  },
  {
    name: "e-header__top-bar-desktop",
    version: "8.13.0",
    replacement: {
      name: "Header",
      type: "component",
      documentation: "https://design.elvia.io/components/header"
    },
    sunset: "March 2023"
  },
  {
    name: "e-header__top-bar-desktop__title",
    version: "8.13.0",
    replacement: {
      name: "Header",
      type: "component",
      documentation: "https://design.elvia.io/components/header"
    },
    sunset: "March 2023"
  },
  {
    name: "e-header__top-bar-desktop__app",
    version: "8.13.0",
    replacement: {
      name: "Header",
      type: "component",
      documentation: "https://design.elvia.io/components/header"
    },
    sunset: "March 2023"
  },
  {
    name: "e-header__top-bar-desktop__app-menu",
    version: "8.13.0",
    replacement: {
      name: "Header",
      type: "component",
      documentation: "https://design.elvia.io/components/header"
    },
    sunset: "March 2023"
  },
  {
    name: "e-header__top-bar-desktop__app-menu-item",
    version: "8.13.0",
    replacement: {
      name: "Header",
      type: "component",
      documentation: "https://design.elvia.io/components/header"
    },
    sunset: "March 2023"
  },
  {
    name: "e-header__top-bar-desktop__app-circle",
    version: "8.13.0",
    replacement: {
      name: "Header",
      type: "component",
      documentation: "https://design.elvia.io/components/header"
    },
    sunset: "March 2023"
  },
  {
    name: "e-header__top-bar-desktop__app-menu-item--active",
    version: "8.13.0",
    replacement: {
      name: "Header",
      type: "component",
      documentation: "https://design.elvia.io/components/header"
    },
    sunset: "March 2023"
  },
  {
    name: "e-header__top-bar-desktop__app-title",
    version: "8.13.0",
    replacement: {
      name: "Header",
      type: "component",
      documentation: "https://design.elvia.io/components/header"
    },
    sunset: "March 2023"
  },
  {
    name: "e-header__top-bar-desktop__area",
    version: "8.13.0",
    replacement: {
      name: "Header",
      type: "component",
      documentation: "https://design.elvia.io/components/header"
    },
    sunset: "March 2023"
  },
  {
    name: "e-header__top-bar-desktop__area-menu",
    version: "8.13.0",
    replacement: {
      name: "Header",
      type: "component",
      documentation: "https://design.elvia.io/components/header"
    },
    sunset: "March 2023"
  },
  {
    name: "e-header__top-bar-desktop__area-menu-item",
    version: "8.13.0",
    replacement: {
      name: "Header",
      type: "component",
      documentation: "https://design.elvia.io/components/header"
    },
    sunset: "March 2023"
  },
  {
    name: "e-header__top-bar-desktop__logo",
    version: "8.13.0",
    replacement: {
      name: "Header",
      type: "component",
      documentation: "https://design.elvia.io/components/header"
    },
    sunset: "March 2023"
  },
  {
    name: "e-header__top-bar-desktop__user",
    version: "8.13.0",
    replacement: {
      name: "Header",
      type: "component",
      documentation: "https://design.elvia.io/components/header"
    },
    sunset: "March 2023"
  },
  {
    name: "e-header__top-bar-desktop__hamburger",
    version: "8.13.0",
    replacement: {
      name: "Header",
      type: "component",
      documentation: "https://design.elvia.io/components/header"
    },
    sunset: "March 2023"
  },
  {
    name: "e-header__top-bar-desktop__link",
    version: "8.13.0",
    replacement: {
      name: "Header",
      type: "component",
      documentation: "https://design.elvia.io/components/header"
    },
    sunset: "March 2023"
  },
  {
    name: "e-header__top-bar-desktop__line",
    version: "8.13.0",
    replacement: {
      name: "Header",
      type: "component",
      documentation: "https://design.elvia.io/components/header"
    },
    sunset: "March 2023"
  },
  {
    name: "e-header__top-bar-desktop__user-menu",
    version: "8.13.0",
    replacement: {
      name: "Header",
      type: "component",
      documentation: "https://design.elvia.io/components/header"
    },
    sunset: "March 2023"
  },
  {
    name: "e-header__top-bar-desktop__user-menu-name",
    version: "8.13.0",
    replacement: {
      name: "Header",
      type: "component",
      documentation: "https://design.elvia.io/components/header"
    },
    sunset: "March 2023"
  },
  {
    name: "e-header__top-bar-desktop__user-menu-mail",
    version: "8.13.0",
    replacement: {
      name: "Header",
      type: "component",
      documentation: "https://design.elvia.io/components/header"
    },
    sunset: "March 2023"
  },
  {
    name: "e-header__top-bar-desktop__user-menu-settings",
    version: "8.13.0",
    replacement: {
      name: "Header",
      type: "component",
      documentation: "https://design.elvia.io/components/header"
    },
    sunset: "March 2023"
  },
  {
    name: "e-header__top-bar-desktop__user-menu-logout",
    version: "8.13.0",
    replacement: {
      name: "Header",
      type: "component",
      documentation: "https://design.elvia.io/components/header"
    },
    sunset: "March 2023"
  },
  {
    name: "e-header__top-bar-desktop__link-icon",
    version: "8.13.0",
    replacement: {
      name: "Header",
      type: "component",
      documentation: "https://design.elvia.io/components/header"
    },
    sunset: "March 2023"
  },
  {
    name: "e-header__top-bar-desktop__app--open",
    version: "8.13.0",
    replacement: {
      name: "Header",
      type: "component",
      documentation: "https://design.elvia.io/components/header"
    },
    sunset: "March 2023"
  },
  {
    name: "e-header__top-bar-desktop__area--open",
    version: "8.13.0",
    replacement: {
      name: "Header",
      type: "component",
      documentation: "https://design.elvia.io/components/header"
    },
    sunset: "March 2023"
  },
  {
    name: "e-header__top-bar-desktop__user--open",
    version: "8.13.0",
    replacement: {
      name: "Header",
      type: "component",
      documentation: "https://design.elvia.io/components/header"
    },
    sunset: "March 2023"
  },
  {
    name: "e-header__top-bar-mobile",
    version: "8.13.0",
    replacement: {
      name: "Header",
      type: "component",
      documentation: "https://design.elvia.io/components/header"
    },
    sunset: "March 2023"
  },
  {
    name: "e-header--open",
    version: "8.13.0",
    replacement: {
      name: "Header",
      type: "component",
      documentation: "https://design.elvia.io/components/header"
    },
    sunset: "March 2023"
  },
  {
    name: "e-header__top-bar-mobile__app",
    version: "8.13.0",
    replacement: {
      name: "Header",
      type: "component",
      documentation: "https://design.elvia.io/components/header"
    },
    sunset: "March 2023"
  },
  {
    name: "e-header__top-bar-mobile__area",
    version: "8.13.0",
    replacement: {
      name: "Header",
      type: "component",
      documentation: "https://design.elvia.io/components/header"
    },
    sunset: "March 2023"
  },
  {
    name: "e-header__top-bar-mobile__user",
    version: "8.13.0",
    replacement: {
      name: "Header",
      type: "component",
      documentation: "https://design.elvia.io/components/header"
    },
    sunset: "March 2023"
  },
  {
    name: "e-header__top-bar-mobile__title",
    version: "8.13.0",
    replacement: {
      name: "Header",
      type: "component",
      documentation: "https://design.elvia.io/components/header"
    },
    sunset: "March 2023"
  },
  {
    name: "e-header__top-bar-mobile__link",
    version: "8.13.0",
    replacement: {
      name: "Header",
      type: "component",
      documentation: "https://design.elvia.io/components/header"
    },
    sunset: "March 2023"
  },
  {
    name: "e-header__top-bar-mobile__link-icon",
    version: "8.13.0",
    replacement: {
      name: "Header",
      type: "component",
      documentation: "https://design.elvia.io/components/header"
    },
    sunset: "March 2023"
  },
  {
    name: "e-header__top-bar-mobile__user-menu",
    version: "8.13.0",
    replacement: {
      name: "Header",
      type: "component",
      documentation: "https://design.elvia.io/components/header"
    },
    sunset: "March 2023"
  },
  {
    name: "e-header__top-bar-mobile__user-menu-name",
    version: "8.13.0",
    replacement: {
      name: "Header",
      type: "component",
      documentation: "https://design.elvia.io/components/header"
    },
    sunset: "March 2023"
  },
  {
    name: "e-header__top-bar-mobile__user-menu-settings",
    version: "8.13.0",
    replacement: {
      name: "Header",
      type: "component",
      documentation: "https://design.elvia.io/components/header"
    },
    sunset: "March 2023"
  },
  {
    name: "e-header__top-bar-mobile__user-menu-logout",
    version: "8.13.0",
    replacement: {
      name: "Header",
      type: "component",
      documentation: "https://design.elvia.io/components/header"
    },
    sunset: "March 2023"
  },
  {
    name: "e-header__top-bar-mobile__divider",
    version: "8.13.0",
    replacement: {
      name: "Header",
      type: "component",
      documentation: "https://design.elvia.io/components/header"
    },
    sunset: "March 2023"
  },
  {
    name: "e-header__sidebar",
    version: "8.13.0",
    replacement: {
      name: "Header",
      type: "component",
      documentation: "https://design.elvia.io/components/header"
    },
    sunset: "March 2023"
  },
  {
    name: "e-header__top-bar-mobile__app--open",
    version: "8.13.0",
    replacement: {
      name: "Header",
      type: "component",
      documentation: "https://design.elvia.io/components/header"
    },
    sunset: "March 2023"
  },
  {
    name: "e-header__top-bar-mobile__area--open",
    version: "8.13.0",
    replacement: {
      name: "Header",
      type: "component",
      documentation: "https://design.elvia.io/components/header"
    },
    sunset: "March 2023"
  },
  {
    name: "e-header__sidebar__item",
    version: "8.13.0",
    replacement: {
      name: "Header",
      type: "component",
      documentation: "https://design.elvia.io/components/header"
    },
    sunset: "March 2023"
  },
  {
    name: "e-header__sidebar__open-close",
    version: "8.13.0",
    replacement: {
      name: "Header",
      type: "component",
      documentation: "https://design.elvia.io/components/header"
    },
    sunset: "March 2023"
  },
  {
    name: "e-header__sidebar__text",
    version: "8.13.0",
    replacement: {
      name: "Header",
      type: "component",
      documentation: "https://design.elvia.io/components/header"
    },
    sunset: "March 2023"
  },
  {
    name: "e-header__sidebar__icon",
    version: "8.13.0",
    replacement: {
      name: "Header",
      type: "component",
      documentation: "https://design.elvia.io/components/header"
    },
    sunset: "March 2023"
  },
  {
    name: "e-header__sidebar__item--active",
    version: "8.13.0",
    replacement: {
      name: "Header",
      type: "component",
      documentation: "https://design.elvia.io/components/header"
    },
    sunset: "March 2023"
  },
  {
    name: "e-header__sidebar--open",
    version: "8.13.0",
    replacement: {
      name: "Header",
      type: "component",
      documentation: "https://design.elvia.io/components/header"
    },
    sunset: "March 2023"
  },
  {
    name: "e-segmented-control",
    version: "8.14.0",
    replacement: {
      name: "Segmented control",
      type: "component",
      documentation: "https://design.elvia.io/components/segmented-control"
    },
    sunset: "March 2023"
  },
  {
    name: "e-segmented-controls",
    version: "8.14.0",
    replacement: {
      name: "Segmented control",
      type: "component",
      documentation: "https://design.elvia.io/components/segmented-control"
    },
    sunset: "March 2023"
  },
  {
    name: "e-segmented-controls---focus",
    version: "8.14.0",
    replacement: {
      name: "Segmented control",
      type: "component",
      documentation: "https://design.elvia.io/components/segmented-control"
    },
    sunset: "March 2023"
  },
  {
    name: "e-segmented-controls__title",
    version: "8.14.0",
    replacement: {
      name: "Segmented control",
      type: "component",
      documentation: "https://design.elvia.io/components/segmented-control"
    },
    sunset: "March 2023"
  },
  {
    name: "e-segmented-controls--lg",
    version: "8.14.0",
    replacement: {
      name: "Segmented control",
      type: "component",
      documentation: "https://design.elvia.io/components/segmented-control"
    },
    sunset: "March 2023"
  },
  {
    name: "e-segmented-controls--sm",
    version: "8.14.0",
    replacement: {
      name: "Segmented control",
      type: "component",
      documentation: "https://design.elvia.io/components/segmented-control"
    },
    sunset: "March 2023"
  },
  {
    name: "e-radio-filter",
    version: "8.13.0",
    replacement: {
      name: "Radio Filter",
      type: "component",
      documentation: "https://design.elvia.io/components/radio-filter"
    },
    sunset: "March 2023"
  },
  {
    name: "e-radio-filter__label",
    version: "8.13.0",
    replacement: {
      name: "Radio Filter",
      type: "component",
      documentation: "https://design.elvia.io/components/radio-filter"
    },
    sunset: "March 2023"
  },
  {
    name: "e-radio-filter---focus",
    version: "8.13.0",
    replacement: {
      name: "Radio Filter",
      type: "component",
      documentation: "https://design.elvia.io/components/radio-filter"
    },
    sunset: "March 2023"
  },
  {
    name: "e-radio-filter---hover",
    version: "8.13.0",
    replacement: {
      name: "Radio Filter",
      type: "component",
      documentation: "https://design.elvia.io/components/radio-filter"
    },
    sunset: "March 2023"
  },
  {
    name: "e-radio-filter---checked",
    version: "8.13.0",
    replacement: {
      name: "Radio Filter",
      type: "component",
      documentation: "https://design.elvia.io/components/radio-filter"
    },
    sunset: "March 2023"
  },
  {
    name: "e-progress",
    version: "8.13.0",
    replacement: {
      name: "Progressbar",
      type: "component",
      documentation: "https://design.elvia.io/components/progressbar"
    },
    sunset: "March 2023"
  },
  {
    name: "e-progress__bar",
    version: "8.13.0",
    replacement: {
      name: "Progressbar",
      type: "component",
      documentation: "https://design.elvia.io/components/progressbar"
    },
    sunset: "March 2023"
  },
  {
    name: "e-progress__bar--loading",
    version: "8.13.0",
    replacement: {
      name: "Progressbar",
      type: "component",
      documentation: "https://design.elvia.io/components/progressbar"
    },
    sunset: "March 2023"
  },
  {
    name: "e-progress__bar--error",
    version: "8.13.0",
    replacement: {
      name: "Progressbar",
      type: "component",
      documentation: "https://design.elvia.io/components/progressbar"
    },
    sunset: "March 2023"
  },
  {
    name: "e-popover",
    version: "8.13.0",
    replacement: {
      name: "Popover",
      type: "component",
      documentation: "https://design.elvia.io/components/popover"
    },
    sunset: "March 2023"
  },
  {
    name: "e-popover__content",
    version: "8.13.0",
    replacement: {
      name: "Popover",
      type: "component",
      documentation: "https://design.elvia.io/components/popover"
    },
    sunset: "March 2023"
  },
  {
    name: "e-popover__close",
    version: "8.13.0",
    replacement: {
      name: "Popover",
      type: "component",
      documentation: "https://design.elvia.io/components/popover"
    },
    sunset: "March 2023"
  },
  {
    name: "e-popover__title",
    version: "8.13.0",
    replacement: {
      name: "Popover",
      type: "component",
      documentation: "https://design.elvia.io/components/popover"
    },
    sunset: "March 2023"
  },
  {
    name: "e-popover__text",
    version: "8.13.0",
    replacement: {
      name: "Popover",
      type: "component",
      documentation: "https://design.elvia.io/components/popover"
    },
    sunset: "March 2023"
  },
  {
    name: "e-popover--bottom",
    version: "8.13.0",
    replacement: {
      name: "Popover",
      type: "component",
      documentation: "https://design.elvia.io/components/popover"
    },
    sunset: "March 2023"
  },
  {
    name: "e-popover--left",
    version: "8.13.0",
    replacement: {
      name: "Popover",
      type: "component",
      documentation: "https://design.elvia.io/components/popover"
    },
    sunset: "March 2023"
  },
  {
    name: "e-popover--left-50",
    version: "8.13.0",
    replacement: {
      name: "Popover",
      type: "component",
      documentation: "https://design.elvia.io/components/popover"
    },
    sunset: "March 2023"
  },
  {
    name: "e-popover--right",
    version: "8.13.0",
    replacement: {
      name: "Popover",
      type: "component",
      documentation: "https://design.elvia.io/components/popover"
    },
    sunset: "March 2023"
  },
  {
    name: "e-popover--right-50",
    version: "8.13.0",
    replacement: {
      name: "Popover",
      type: "component",
      documentation: "https://design.elvia.io/components/popover"
    },
    sunset: "March 2023"
  },
  {
    name: "e-popover--w-200",
    version: "8.13.0",
    replacement: {
      name: "Popover",
      type: "component",
      documentation: "https://design.elvia.io/components/popover"
    },
    sunset: "March 2023"
  },
  {
    name: "e-popover--w-220",
    version: "8.13.0",
    replacement: {
      name: "Popover",
      type: "component",
      documentation: "https://design.elvia.io/components/popover"
    },
    sunset: "March 2023"
  },
  {
    name: "e-popover--w-240",
    version: "8.13.0",
    replacement: {
      name: "Popover",
      type: "component",
      documentation: "https://design.elvia.io/components/popover"
    },
    sunset: "March 2023"
  },
  {
    name: "e-popover--w-260",
    version: "8.13.0",
    replacement: {
      name: "Popover",
      type: "component",
      documentation: "https://design.elvia.io/components/popover"
    },
    sunset: "March 2023"
  },
  {
    name: "e-pagination",
    version: "8.13.0",
    replacement: {
      name: "Pagination",
      type: "component",
      documentation: "https://design.elvia.io/components/pagination"
    },
    sunset: "March 2023"
  },
  {
    name: "e-pagination__number-per-page",
    version: "8.13.0",
    replacement: {
      name: "Pagination",
      type: "component",
      documentation: "https://design.elvia.io/components/pagination"
    },
    sunset: "March 2023"
  },
  {
    name: "e-pagination__dropdown",
    version: "8.13.0",
    replacement: {
      name: "Pagination",
      type: "component",
      documentation: "https://design.elvia.io/components/pagination"
    },
    sunset: "March 2023"
  },
  {
    name: "e-pagination__choosing-page",
    version: "8.13.0",
    replacement: {
      name: "Pagination",
      type: "component",
      documentation: "https://design.elvia.io/components/pagination"
    },
    sunset: "March 2023"
  },
  {
    name: "e-pagination__dots",
    version: "8.13.0",
    replacement: {
      name: "Pagination",
      type: "component",
      documentation: "https://design.elvia.io/components/pagination"
    },
    sunset: "March 2023"
  },
  {
    name: "e-pagination__number",
    version: "8.13.0",
    replacement: {
      name: "Pagination",
      type: "component",
      documentation: "https://design.elvia.io/components/pagination"
    },
    sunset: "March 2023"
  },
  {
    name: "e-pagination__arrow",
    version: "8.13.0",
    replacement: {
      name: "Pagination",
      type: "component",
      documentation: "https://design.elvia.io/components/pagination"
    },
    sunset: "March 2023"
  },
  {
    name: "e-pagination__number--active",
    version: "8.13.0",
    replacement: {
      name: "Pagination",
      type: "component",
      documentation: "https://design.elvia.io/components/pagination"
    },
    sunset: "March 2023"
  },
  {
    name: "e-pagination__number---hover",
    version: "8.13.0",
    replacement: {
      name: "Pagination",
      type: "component",
      documentation: "https://design.elvia.io/components/pagination"
    },
    sunset: "March 2023"
  },
  {
    name: "e-pagination__arrow---hover",
    version: "8.13.0",
    replacement: {
      name: "Pagination",
      type: "component",
      documentation: "https://design.elvia.io/components/pagination"
    },
    sunset: "March 2023"
  },
  {
    name: "e-modal",
    version: "8.13.0",
    replacement: {
      name: "Modal",
      type: "component",
      documentation: "https://design.elvia.io/components/modal"
    },
    sunset: "March 2023"
  },
  {
    name: "e-modal__content",
    version: "8.13.0",
    replacement: {
      name: "Modal",
      type: "component",
      documentation: "https://design.elvia.io/components/modal"
    },
    sunset: "March 2023"
  },
  {
    name: "e-modal__title",
    version: "8.13.0",
    replacement: {
      name: "Modal",
      type: "component",
      documentation: "https://design.elvia.io/components/modal"
    },
    sunset: "March 2023"
  },
  {
    name: "e-modal__text",
    version: "8.13.0",
    replacement: {
      name: "Modal",
      type: "component",
      documentation: "https://design.elvia.io/components/modal"
    },
    sunset: "March 2023"
  },
  {
    name: "e-modal__actions",
    version: "8.13.0",
    replacement: {
      name: "Modal",
      type: "component",
      documentation: "https://design.elvia.io/components/modal"
    },
    sunset: "March 2023"
  },
  {
    name: "e-dropdown",
    version: "8.13.0",
    replacement: {
      name: "Dropdown",
      type: "component",
      documentation: "https://design.elvia.io/components/dropdown"
    },
    sunset: "March 2023"
  },
  {
    name: "e-chip",
    version: "8.13.0",
    replacement: {
      name: "Chip",
      type: "component",
      documentation: "https://design.elvia.io/components/chip"
    },
    sunset: "March 2023"
  },
  {
    name: "e-chip-container",
    version: "8.13.0",
    replacement: {
      name: "Chip",
      type: "component",
      documentation: "https://design.elvia.io/components/chip"
    },
    sunset: "March 2023"
  },
  {
    name: "e-chip__label",
    version: "8.13.0",
    replacement: {
      name: "Chip",
      type: "component",
      documentation: "https://design.elvia.io/components/chip"
    },
    sunset: "March 2023"
  },
  {
    name: "e-chip__close",
    version: "8.13.0",
    replacement: {
      name: "Chip",
      type: "component",
      documentation: "https://design.elvia.io/components/chip"
    },
    sunset: "March 2023"
  },
  {
    name: "e-chip--yellow",
    version: "8.13.0",
    replacement: {
      name: "Chip",
      type: "component",
      documentation: "https://design.elvia.io/components/chip"
    },
    sunset: "March 2023"
  },
  {
    name: "e-chip---disabled",
    version: "8.13.0",
    replacement: {
      name: "Chip",
      type: "component",
      documentation: "https://design.elvia.io/components/chip"
    },
    sunset: "March 2023"
  },
  {
    name: "e-chip--orange",
    version: "8.13.0",
    replacement: {
      name: "Chip",
      type: "component",
      documentation: "https://design.elvia.io/components/chip"
    },
    sunset: "March 2023"
  },
  {
    name: "e-chip--red",
    version: "8.13.0",
    replacement: {
      name: "Chip",
      type: "component",
      documentation: "https://design.elvia.io/components/chip"
    },
    sunset: "March 2023"
  },
  {
    name: "e-chip--green-apple",
    version: "8.13.0",
    replacement: {
      name: "Chip",
      type: "component",
      documentation: "https://design.elvia.io/components/chip"
    },
    sunset: "March 2023"
  },
  {
    name: "e-chip--violet-grape",
    version: "8.13.0",
    replacement: {
      name: "Chip",
      type: "component",
      documentation: "https://design.elvia.io/components/chip"
    },
    sunset: "March 2023"
  },
  {
    name: "e-chip--blue-berry",
    version: "8.13.0",
    replacement: {
      name: "Chip",
      type: "component",
      documentation: "https://design.elvia.io/components/chip"
    },
    sunset: "March 2023"
  },
  {
    name: "e-chip--purple-plum",
    version: "8.13.0",
    replacement: {
      name: "Chip",
      type: "component",
      documentation: "https://design.elvia.io/components/chip"
    },
    sunset: "March 2023"
  },
  {
    name: "e-chip--orange-mango",
    version: "8.13.0",
    replacement: {
      name: "Chip",
      type: "component",
      documentation: "https://design.elvia.io/components/chip"
    },
    sunset: "March 2023"
  },
  {
    name: "e-chip--red-tomato",
    version: "8.13.0",
    replacement: {
      name: "Chip",
      type: "component",
      documentation: "https://design.elvia.io/components/chip"
    },
    sunset: "March 2023"
  },
  {
    name: "e-chip--green",
    version: "8.13.0",
    replacement: {
      name: "Chip",
      type: "component",
      documentation: "https://design.elvia.io/components/chip"
    },
    sunset: "March 2023"
  },
  {
    name: "e-chip---hover",
    version: "8.13.0",
    replacement: {
      name: "Chip",
      type: "component",
      documentation: "https://design.elvia.io/components/chip"
    },
    sunset: "March 2023"
  },
  {
    name: "e-select",
    version: "8.13.0",
    replacement: {
      name: "Dropdown",
      type: "component",
      documentation: "https://design.elvia.io/components/dropdown"
    },
    sunset: "March 2023"
  },
  {
    name: "e-link--jumbo",
    version: "8.5.12",
    replacement: {
      name: "action group",
      type: "pattern",
      documentation: "https://design.elvia.io/patterns/groups"
    }
  },
  {
    name: "e-label",
    version: "8.4.1",
    replacement: {
      name: "e-tag",
      type: "class",
      documentation: "https://design.elvia.io/components/tag"
    }
  },
  {
    name: "e-table__sort-icon--inactive",
    version: "8.0.4"
  },
  {
    name: "e-table__sort-icon--up",
    version: "8.0.4"
  },
  {
    name: "e-table__sort-icon",
    version: "8.0.4"
  },
  {
    name: "e-link--card",
    version: "7.13.5",
    replacement: {
      name: "Card",
      type: "component",
      documentation: "https://design.elvia.io/components/card"
    }
  },
  {
    name: "e-card",
    version: "7.13.5",
    replacement: {
      name: "Card",
      type: "component",
      documentation: "https://design.elvia.io/components/card"
    }
  },
  {
    name: "e-card--text-only",
    version: "7.13.5",
    replacement: {
      name: "Card",
      type: "component",
      documentation: "https://design.elvia.io/components/card"
    }
  },
  {
    name: "e-card--shadow-soft",
    version: "7.13.5",
    replacement: {
      name: "Card",
      type: "component",
      documentation: "https://design.elvia.io/components/card"
    }
  },
  {
    name: "e-card--shadow-medium",
    version: "7.13.5",
    replacement: {
      name: "Card",
      type: "component",
      documentation: "https://design.elvia.io/components/card"
    }
  },
  {
    name: "e-card--shadow-hard",
    version: "7.13.5",
    replacement: {
      name: "Card",
      type: "component",
      documentation: "https://design.elvia.io/components/card"
    }
  },
  {
    name: "e-card--on-white",
    version: "7.13.5",
    replacement: {
      name: "Card",
      type: "component",
      documentation: "https://design.elvia.io/components/card"
    }
  },
  {
    name: "e-card__title",
    version: "7.13.5",
    replacement: {
      name: "Card",
      type: "component",
      documentation: "https://design.elvia.io/components/card"
    }
  },
  {
    name: "e-card__title--above",
    version: "7.13.5",
    replacement: {
      name: "Card",
      type: "component",
      documentation: "https://design.elvia.io/components/card"
    }
  },
  {
    name: "e-card__content",
    version: "7.13.5",
    replacement: {
      name: "Card",
      type: "component",
      documentation: "https://design.elvia.io/components/card"
    }
  },
  {
    name: "e-fileupload---hover",
    version: "7.9.3",
    replacement: {
      name: "e-fileupload--dragover",
      type: "class",
      documentation: "https://design.elvia.io/components/file-upload#States"
    }
  },
  {
    name: "e-table__sort-header",
    version: "7.5.0"
  },
  {
    name: "e-link--external",
    version: "7.4.0",
    replacement: {
      name: "e-link--new-tab",
      type: "class",
      documentation: "https://design.elvia.io/components/link#Type"
    }
  },
  {
    name: "e-divider",
    version: "2.9.22",
    replacement: {
      name: "Divider",
      type: "component",
      documentation: "https://design.elvia.io/components/divider"
    },
    sunset: "March 2023"
  },
  {
    name: "e-divider--inverted",
    version: "2.9.22",
    replacement: {
      name: "Divider",
      type: "component",
      documentation: "https://design.elvia.io/components/divider"
    },
    sunset: "March 2023"
  },
  {
    name: "e-divider--title",
    version: "2.9.22",
    replacement: {
      name: "Divider",
      type: "component",
      documentation: "https://design.elvia.io/components/divider"
    },
    sunset: "March 2023"
  },
  {
    name: "e-divider__title",
    version: "2.9.22",
    replacement: {
      name: "Divider",
      type: "component",
      documentation: "https://design.elvia.io/components/divider"
    },
    sunset: "March 2023"
  },
  {
    name: "e-divider--curved",
    version: "2.9.22",
    replacement: {
      name: "Divider",
      type: "component",
      documentation: "https://design.elvia.io/components/divider"
    },
    sunset: "March 2023"
  },
];

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
