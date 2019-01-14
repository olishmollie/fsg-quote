class ShirtColor extends Component {
  constructor(props) {
    super(props);
  }

  init() {
    this.color = this.props.color;
    this.onclick = this.props.onclick;
  }

  render() {
    return jsml.div({
      className: "col-sm",
      style: {
        display: "inline",
        backgroundColor: this.color.hex
      },
      onclick: () => {
        this.onclick(this.color);
      }
    });
  }
}
