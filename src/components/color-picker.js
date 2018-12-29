class ColorPicker {
  constructor(opts) {
    this.color = opts.color;
    this.colors = opts.colors;
    this.onchange = opts.onchange;
    this.shirtColors = this.colors.map(color => {
      return new ShirtColor({
        color: color,
        onclick: color => {
          this.onchange(color);
          this.color = color;
        }
      });
    });
  }

  render() {
    return jsml.div(
      {
        className: "color-picker"
      },
      ...this.shirtColors.map(x => x.render())
    );
  }
}
