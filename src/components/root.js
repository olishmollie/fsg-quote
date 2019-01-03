class Root extends Component {
  constructor() {
    super();

    this.container = jsml.div({
      id: "app"
    });
  }

  render() {
    return super.render(
      "div",
      {
        className: "container"
      },
      jsml.component(new Navbar()),
      jsml.component(APP.flashContainer),
      jsml.component(this.container)
    );
  }

  mount(component) {
    this.container.innerHTML = "";
    this.container.appendChild(component.render());
  }
}
