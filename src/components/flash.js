class Flash extends Component {
  constructor(props) {
    super(props);
  }

  init() {
    this.p = jsml.p({});
  }

  show(type, msg) {
    this.p.innerText = msg;
    this.node.style.display = "block";
    this.node.className += " flash-" + type;
  }

  hide() {
    this.node.style.display = "none";
    this.node.className = this.className;
  }

  render() {
    return super.render(jsml.div({}, jsml.element({}, this.p)));
  }
}
