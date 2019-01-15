class Modal extends Component {
  constructor(props) {
    super(props);
  }

  init() {
    this.div = jsml.div();
    // do this in order to remove the click event later
    this.hideHandler = this.hide.bind(this);
  }

  show() {
    this.div.style.display = "block";
    APP.root.dim();
    // wait until we're sure the modal has rendered to bind the close event
    setTimeout(() => {
      document.addEventListener("click", this.hideHandler);
    });
  }

  hide() {
    this.div.style.display = "none";
    document.removeEventListener("click", this.hideHandler);
    APP.root.brighten();
  }

  render() {
    return jsml.element(
      {
        style: {
          display: "none"
        }
      },
      this.div
    );
  }
}
