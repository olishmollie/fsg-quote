class ColorPicker extends Component {
  constructor(opts) {
    super();
    this.color = opts.color;
    this.colors = opts.colors;
    this.onchange = opts.onchange;
  }

  render() {
    return super.render(
      "div",
      {},
      ...this.colors.map(color => {
        return jsml.component(
          new ShirtColor({
            color: color,
            onclick: color => {
              this.onchange(color);
              this.color = color;
            }
          })
        );
      })
    );
  }
}
