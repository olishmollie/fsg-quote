class ColorPicker extends Component {
  constructor(props) {
    super(props);
  }

  init() {
    this.color = this.props.color;
    this.colors = this.props.colors;
    this.onchange = this.props.onchange;
  }

  render() {
    return jsml.div(
      {},
      ...this.colors.map(color => {
        return jsml.component(
          {},
          new ShirtColor({
            color: color,
            onclick: color => {
              this.color = color;
              this.onchange(color);
            }
          })
        );
      })
    );
  }
}
