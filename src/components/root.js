class Root extends Component {
  constructor(props) {
    super(props);
  }

  init() {
    this.container = jsml.div();
  }

  render() {
    return jsml.div(
      {
        className: "container"
      },
      jsml.component({}, new Navbar()),
      jsml.element(
        {
          id: "app"
        },
        this.container
      )
    );
  }
}
