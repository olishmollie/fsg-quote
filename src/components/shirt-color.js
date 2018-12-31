class ShirtColor extends Component {
  constructor(opts) {
    super();
    this.color = opts.color;
    this.onclick = opts.onclick;
  }

  render() {
    return super.container("div", {
      className: "col-sm",
      style: "display: inline; background-color: " + this.color.hex,
      onclick: () => {
        this.onclick(this.color);
      }
    });
  }
}
