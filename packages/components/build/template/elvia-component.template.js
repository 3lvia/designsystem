import * as ReactComponent from '../../react.js';
import { ElvisComponentWrapper } from '@elvia/elvis-component-wrapper';

export default class ElviaComponent extends ElvisComponentWrapper {
    static get observedAttributes() {
        return ['{{INSERT_ATTRIBUTES}}'];
    }

    //{{INSERT_COMPONENT_DATA}}

    //{{INSERT_SETTERS_AND_GETTERS}}
    constructor() {
        super(ElviaComponent, ReactComponent['{{INSERT_REACT_NAME}}']);
    }
}

window.customElements.define(`{{INSERT_COMPONENT_NAME}}`, ElviaComponent);
