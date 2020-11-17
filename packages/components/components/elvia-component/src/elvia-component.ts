


export class ElviaComponent extends HTMLElement {

  protected _data: any;

  constructor() {
    super();
    this._data = {};
  }

  getProps(): any {
    return this.clone(this._data);
  }

  // Does not create a reliable deep clone, but is sufficient for v1
  protected clone(item: any): any {
    return JSON.parse(JSON.stringify(item));
  }
}