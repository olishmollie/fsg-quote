class ShirtColor extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return jsml.div(
      {
        style: {
          display: "inline-block",
          margin: "2px",
          backgroundColor: this.props.color.hex,
          width: "30px"
        },
        onclick: () => {
          this.props.onclick(this.props.color);
        }
      },
      jsml.text("\u00A0")
    );
  }
}
