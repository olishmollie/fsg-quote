class ColorPicker extends Component {
  constructor(props) {
    super(props);
  }

  init() {}

  render() {
    return jsml.div(
      {},
      ...this.props.colors.map(color => {
        return jsml.component(
          {},
          new ShirtColor({
            color: color,
            onclick: color => {
              this.props.color = color;
              this.props.onchange(color);
            }
          })
        );
      })
    );
  }
}
