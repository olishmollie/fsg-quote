class ShirtColor {
  constructor(opts) {
    this.color = opts.color;
    this.onclick = opts.onclick;
  }

  render() {
    return jsml.div({
      className: "shirt-color col-sm",
      style: "display: inline; background-color: " + this.color,
      onclick: () => {
        this.onclick(this.color);
      }
    });
  }
}
