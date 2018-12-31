class Component {
  constructor() {
    this.id = util.idName(this);
    this.container = jsml.div({
      id: this.id
    });
    this._node = null;
  }

  get node() {
    if (this._node) {
      return this._node;
    }
    this._node = document.getElementById(this.id);
    return this._node;
  }

  container(tag, attributes, ...children) {
    let id = { id: util.idName(this) };
    return jsml.makeElement(tag, Object.assign(attributes, id), ...children);
  }
}
