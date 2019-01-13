class Slidedown extends Component {
  constructor() {
    super();
    this.div = jsml.div();
    this.down = false;
  }

  slideDown() {
    if (this.down) return;
    this.div.style.zIndex = 1;
    this.div.style.opacity = 0.75;
    this.down = true;
    let timer = setInterval(() => {
      if (this.div.style.height === "100%") {
        clearInterval(timer);
      }
      this.div.style.height = parseInt(this.div.style.height) + 1 + "%";
    });
  }

  slideUp() {
    if (!this.down) return;
    let timer = setInterval(() => {
      if (this.div.style.height === "0%") {
        clearInterval(timer);
        this.div.style.opacity = 0;
        this.div.style.zIndex = -1;
      }
      this.div.style.height = parseInt(this.div.style.height) - 1 + "%";
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
            opacity: 0
          }
        },
        this.div
      )
    );
  }
}
