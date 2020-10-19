/* This file is going to be a part of the designsystem and elvis-bundle.js in the future, only use IE11 compatible JS */

/* Import polyfills */
import '@webcomponents/webcomponentsjs/custom-elements-es5-adapter'; // Can not be transpiled / compiled without breaking functionality
import '@webcomponents/webcomponentsjs/webcomponents-bundle.js';

/* Dynamically inject required components */
import './elvia-components.js';

