class Component {
  static mount(component, parent) {
    parent.innerHTML = "";
    parent.appendChild(component.render());
  }

  constructor() {
    this.className = util.camelToDashed(this.constructor.name);
    this.id = this.className + "_" + util.randomString(5);
  }

  get node() {
    return document.getElementById(this.id);
  }

  render(node) {
    node.id = this.id;
    node.className = this.className + " " + node.className;
    return node;
  }
}
