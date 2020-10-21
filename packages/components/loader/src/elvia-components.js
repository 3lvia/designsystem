/* This file is going to be a part of the designsystem and elvis-bundle.js in the future */
components = require('../../elvia-components.config');



/** TODO: Replace with mutationobserver implementation */
document.addEventListener("DOMContentLoaded", function () {
    const componentList = [];
    for (var i = 0; i < components.length; i++) {
        componentList.push(components[i].name);
    }

    for (var i = 0; i < componentList.length; i++) {
        const elements = document.querySelectorAll(componentList[i]);
        if (elements && elements.length > 0) {
            console.log("[Success] Detected webcomponent: " + componentList[i]);
            injectScript(componentList[i]);
        }
    }

    function injectScript(name) {
        // Only inject legacy script on IE11;
        if (!!window.MSInputMethodContext && !!document.documentMode) {
            document.body.appendChild(createScript(name));
            //document.body.appendChild(createLegacyScript(name));
        } else {
            //document.body.appendChild(createLegacyScript(name));
            document.body.appendChild(createScript(name));
        }
    }

    /*function createLegacyScript(name) {
        const scriptTag = document.createElement('script');
        scriptTag.src = name + '.legacy.js';
        scriptTag.setAttribute('nomodule', '');
        return scriptTag;
    }*/

    function createScript(name) {
        const scriptTag = document.createElement('script');
        scriptTag.src = '/cdn/components/' + name + '.js';
        //scriptTag.setAttribute('type', 'module');
        return scriptTag;
    }
});
