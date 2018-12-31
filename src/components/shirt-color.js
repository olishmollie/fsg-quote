class ShirtColor {
  constructor(opts) {
    this.color = opts.color;
    this.onclick = opts.onclick;
  }

  node() {
    return jsml.div({
      className: "shirt-color col-sm",
      style: "display: inline; background-color: " + this.color.hex,
      onclick: () => {
        this.onclick(this.color);
      }
    });
  }
}
