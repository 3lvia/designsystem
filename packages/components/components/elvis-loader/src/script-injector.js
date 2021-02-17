const integrity = require('./integrity');
const semver = require('semver');

const INJECTED_COMPONENTS = {};

const injectScript = function (componentName) {
  if (!componentName) {
    return;
  }

  const version = getComponentVersion(componentName);
  if (!version) {
    return;
  }
  let script = createScript(componentName, version);

  if (script && !INJECTED_COMPONENTS[componentName]) {
    INJECTED_COMPONENTS[componentName] = true;
    document.body.appendChild(script);
  }
};

function getComponentVersion(componentName) {
  if (!integrity[componentName]) {
    console.error('Elvis - Found no component with the name!', componentName);
    return false;
  }

  const sorted = Object.keys(integrity[componentName].versions).sort((v1, v2) => {
    return semver.gt(v2, v1);
  });

  const configVersion = getVersionFromConfig(componentName);
  let version;
  if (!configVersion) {
    console.warn('Elvis - No specified version for component, using latest', componentName);
    version = sorted[0];
  } else {
    version = configVersion;
  }
  return version;
}

function getVersionFromConfig(componentName) {
  if (!window.ELVIS_CONFIG || !window.ELVIS_CONFIG[componentName]) {
    return;
  }
  return window.ELVIS_CONFIG[componentName];
}

function createScript(componentName, version) {
  if (window.location.href.indexOf('?cdn_dev=true') > -1) {
    return createDevScript(componentName);
  }
  const integrityComponent = integrity[componentName].versions[version];
  const scriptTag = document.createElement('script');
  scriptTag.src = 'https://cdn.elvia.io/npm/' + componentName + '-' + version + integrityComponent.cdn;
  scriptTag.integrity = integrityComponent.hash;
  scriptTag.crossOrigin = 'anonymous';
  return scriptTag;
}

function createDevScript(componentName) {
  const scriptTag = document.createElement('script');
  scriptTag.src = '../../' + componentName + '/dist/cdn/elvia-' + componentName.substr(6) + '.js';
  return scriptTag;
}

module.exports = injectScript;
