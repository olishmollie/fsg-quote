class ShirtView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return jsml.div(
      {
        className: "card",
        style: {
          maxWidth: "130px"
        }
      },
      jsml.figure(
        {
          className: "figure"
        },
        jsml.a(
          {
            href: "#/products/" + this.props.shirt.id
          },
          jsml.img({
            className: "figure-img img-fluid rounded",
            src: util.frontImageUrl(this.props.shirt.defaultColor),
            width: 120,
            alt: this.props.shirt.name
          }),
          jsml.figcaption({
            className: "figure-caption text-center",
            innerText: this.props.shirt.name
          })
        )
      )
    );
  }
}
