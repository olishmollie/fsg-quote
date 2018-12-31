class ColorPicker extends Component {
  constructor(opts) {
    super();
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
    return super.container("div", {}, ...this.shirtColors.map(x => x.render()));
  }
}
