import * as ReactComponent from '../../../react.js';
import { ElvisComponentWrapper } from '@elvia/elvis-component-wrapper';
const style = `{{INSERT_STYLE_HERE}}`;

export default class ElviaComponent extends ElvisComponentWrapper {
    static get observedAttributes(): any[] {
        return ['{{INSERT_ATTRIBUTES}}'];
    }

    //{{INSERT_SETTERS_AND_GETTERS}}

    constructor() {
        super(ElviaComponent, ReactComponent['{{INSERT_REACT_NAME}}'], style, `{{INSERT_ROLE}}`);
    }
}

window.customElements.define(`{{INSERT_COMPONENT_NAME}}`, ElviaComponent as any);
