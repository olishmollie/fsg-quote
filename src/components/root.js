class Root extends Component {
  constructor() {
    super();

    this.container = jsml.div({
      id: "app"
    });
  }

  render() {
    return super.render(
      jsml.div(
        {
          className: "container"
        },
        jsml.component(new Navbar()),
        jsml.element(this.container)
      )
    );
  }
}
