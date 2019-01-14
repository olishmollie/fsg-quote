class Component {
  static mount(component, parent) {
    parent.innerHTML = "";
    parent.appendChild(component.node);
  }

  constructor(props) {
    this.props = props;
    this.className = util.camelToDashed(this.constructor.name);
    this.id = this.className + "_" + util.randomString(5);
    this.init();
    this.createNode();
    this.didRender();
  }

  createNode() {
    this.node = this.render();
    this.node.id = this.id;
    this.node.className = this.className + " " + this.node.className;
  }

  update() {
    this.willUpdate();
    let parent = this.node.parentElement;
    this.createNode();
    Component.mount(this, parent);
    this.didUpdate();
  }

  init() {}
  didRender() {}
  willUpdate() {}
  didUpdate() {}
}
