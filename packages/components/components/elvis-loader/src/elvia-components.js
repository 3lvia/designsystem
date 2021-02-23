/* This file is going to be a part of the designsystem and elvis-bundle.js in the future */
const components = require('../../../elvia-components.config');
const injector = require('./script-injector');

document.addEventListener('DOMContentLoaded', function () {
  const elementNames = {};

  components.forEach((comp) => {
    elementNames[comp.elementName] = comp;
  });

  function searchForComponents(domElement) {
    for (var i = 0; i < components.length; i++) {
      const elements = domElement.querySelectorAll(components[i].elementName);
      if (elements && elements.length > 0) {
        injector(components[i].name);
      }
    }
  }

  // Initial Load
  searchForComponents(document);
  startMutationObserver();

  function startMutationObserver() {
    let mo = new MutationObserver(function (mutations) {
      for (let i = 0; i < mutations.length; i++) {
        injectScriptIfEligible(mutations[i].target, mutations[i]);
      }
    });

    function injectScriptIfEligible(node, mutation) {
      if (mutation.addedNodes.length > 0) {
        for (let i = 0; i < mutation.addedNodes.length; i++) {
          let addedNode = mutation.addedNodes[i];
          const component = elementNames[addedNode.localName];
          if (component) {
            injector(component.name);
          }
          if (addedNode.querySelectorAll) {
            searchForComponents(addedNode);
          }
        }
      }
      const component = elementNames[node.localName];
      if (component) {
        injector(component.name);
      }
    }

    mo.observe(document.documentElement, {
      childList: true,
      attributes: true,
      characterData: true,
      subtree: true,
    });
  }
});
