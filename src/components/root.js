class Root extends Component {
  constructor() {
    super();

    this.flashContainer = new Flash();

    this.container = jsml.div({
      id: "app"
    });
  }

  flash(msg) {
    this.flashContainer.show(msg);
  }

  render() {
    return super.render(
      "div",
      {
        className: "container"
      },
      jsml.component(new Navbar()),
      jsml.component(this.flashContainer),
      jsml.component(this.container)
    );
  }

  mount(component) {
    this.container.innerHTML = "";
    this.container.appendChild(component.render());
  }
}
