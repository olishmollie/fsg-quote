class ShirtColor extends Component {
  constructor(opts) {
    super();
    this.color = opts.color;
    this.onclick = opts.onclick;
  }

  render() {
    return super.render(
      jsml.div({
        className: "col-sm",
        style: {
          display: "inline",
          backgroundColor: this.color.hex
        },
        onclick: () => {
          this.onclick(this.color);
        }
      })
    );
  }
}
