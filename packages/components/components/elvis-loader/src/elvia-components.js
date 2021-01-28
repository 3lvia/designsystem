/* This file is going to be a part of the designsystem and elvis-bundle.js in the future */
components = require('../../../elvia-components.config');

/** TODO: Replace with mutationobserver implementation */
document.addEventListener('DOMContentLoaded', function () {
  const componentList = [];
  for (var i = 0; i < components.length; i++) {
    componentList.push(components[i]);
  }

  for (var i = 0; i < componentList.length; i++) {
    console.log(componentList[i].name);
    const elements = document.querySelectorAll(componentList[i].elementName);
    if (elements && elements.length > 0) {
      console.log('[Success] Detected webcomponent: ' + componentList[i].name);
      injectScript(componentList[i]);
    }
  }

  function injectScript(component) {
    // Only inject legacy script on IE11;
    if (!!window.MSInputMethodContext && !!document.documentMode) {
      document.body.appendChild(createScript(component));
      //document.body.appendChild(createLegacyScript(name));
    } else {
      //document.body.appendChild(createLegacyScript(name));
      document.body.appendChild(createScript(component));
    }
  }

  /*function createLegacyScript(name) {
        const scriptTag = document.createElement('script');
        scriptTag.src = name + '.legacy.js';
        scriptTag.setAttribute('nomodule', '');
        return scriptTag;
    }*/

  function createScript(component) {
    const scriptTag = document.createElement('script');
    scriptTag.src = '../../' + component.name + '/dist/cdn/' + component.elementName + '.js';
    //scriptTag.setAttribute('type', 'module');
    return scriptTag;
  }
  //<script src="components/elvis-popover/dist/cdn/elvia-popover.js"></script>
  /*
    function createScript(name) {
      const scriptTag = document.createElement('script');
      scriptTag.src = '/cdn/components/' + name + '.js';
      //scriptTag.setAttribute('type', 'module');
      return scriptTag;
    }*/
});
