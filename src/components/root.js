class Root extends Component {
  constructor(props) {
    super(props);
  }

  init() {
    this.container = jsml.div();
    // for modal presentations
    this.overlay = jsml.div();
  }

  dim() {
    this.overlay.style.display = "block";
  }

  brighten() {
    this.overlay.style.display = "none";
  }

  render() {
    return jsml.div(
      {},
      jsml.component({}, new Navbar()),
      jsml.element(
        {
          style: {
            display: "none",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 1
          }
        },
        this.overlay
      ),
      jsml.element(
        {
          id: "app",
          className: "container"
        },
        this.container
      )
    );
  }
}
