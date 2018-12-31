class Component {
  constructor() {
    this.id = this.className = util.camelToDashed(this.constructor.name);
    this.id += "_" + util.randomString(5);
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

  render(tag, attributes, ...children) {
    let id = { id: this.id };

    // combine class names
    if (attributes.className) {
      attributes.className += " " + this.className;
    } else {
      attributes.className = this.className;
    }

    return jsml.makeElement(tag, Object.assign(attributes, id), ...children);
  }
}