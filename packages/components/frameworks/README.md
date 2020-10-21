# Frameworks

## ONLY FOR TESTING AND DEVELOPMENT, GET THE COMPONENT DIRECTLY FROM /DIST

Used to verify that the works correctly in the most commonly used frameworks.

Web components passes all tests on Angular and Vue and should be expected to work flawlessly there.

React however does not support the advanced tests and stringifies the object when sending it in for instance.
https://custom-elements-everywhere.com/

That's why we are creating the components in React and wrap them in web components for everyone else.
By doing that React can use them directly and Angular, Vue, Preact etc. can use them directly.
