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

  // position: fixed;
  // top: 0;
  // left: 0;
  // width: 100%;
  // height: 100%;
  // background-color: rgba(0, 0, 0, 0.5);
  // z-index: 1;
  render() {
    return jsml.div(
      {
        className: "container"
      },
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
          id: "app"
        },
        this.container
      )
    );
  }
}
