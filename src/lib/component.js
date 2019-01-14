class Component {
  static mount(component, parent) {
    parent.innerHTML = "";
    parent.appendChild(component.render());
  }

  constructor(props) {
    this.props = props;
    this.className = util.camelToDashed(this.constructor.name);
    this.id = this.className + "_" + util.randomString(5);

    this.init();

    this.node = this.render();
    this.node.id = this.id;
    this.node.className = this.className + " " + this.node.className;

    this.didRender();
  }

  init() {}
  didRender() {}

  render(node) {
    node.id = this.id;
    node.className = this.className + " " + node.className;
    return node;
  }
}
