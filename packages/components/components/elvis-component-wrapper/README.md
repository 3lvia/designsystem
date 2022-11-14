# Wrapper component

This component, coupled with the elvia-components.config.js, is responsible for rendering the react-components
inside custom elements so that they can be used in other frameworks and in native html.

## Updating the wrapper or config

There are a few different scenarios for updating the component or the elvia-components.config.js.

1. <strong>Changing the config:</strong> If you update the config only, you can just bump the version of the
   component package that was affected by the config change.
2. <strong>Changing the wrapper:</strong> When the wrapper is updated you should always bump the packages that
   was affected by the change as well as the wrapper. You also need to remember to bump the version for the
   wrapper in the component that wants to use the new version.
3. <strong>Changes affecting each other:</strong> If a wrapper or config change affects each other, the
   wrapper needs to be bumped and all the components that have been affected by the config or wrapper. Often
   this can mean that all components needs to be updated.
