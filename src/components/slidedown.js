class Slidedown extends Component {
  constructor(props) {
    super(props);
  }

  init() {
    this.div = jsml.div();
    this.down = false;
  }

  slideDown() {
    if (this.down) return;
    this.div.style.zIndex = 1;
    this.down = true;
    let timer = setInterval(() => {
      if (this.div.style.height === "100%") {
        clearInterval(timer);
        return;
      }
      this.div.style.height = parseInt(this.div.style.height) + 1 + "%";
      this.div.style.opacity = parseInt(this.div.style.height) / 100;
    });
  }

  slideUp() {
    if (!this.down) return;
    let timer = setInterval(() => {
      if (this.div.style.height === "0%") {
        clearInterval(timer);
        this.div.style.zIndex = -1;
        return;
      }
      this.div.style.height = parseInt(this.div.style.height) - 1 + "%";
      this.div.style.opacity -= 0.01;
    });
    this.down = false;
  }

  render() {
    return super.render(
      jsml.element(
        {
          style: {
            width: "100%",
            height: "0",
            textAlign: "center",
            position: "absolute",
            zIndex: -1,
            opacity: 0,
            borderRadius: "inherit"
          }
        },
        this.div
      )
    );
  }
}
