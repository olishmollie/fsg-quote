class ShirtView extends Component {
  constructor(props) {
    super(props);
  }

  init() {
    this.shirt = this.props.shirt;
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
            href: "#/products/" + this.shirt.id
          },
          jsml.img({
            className: "figure-img img-fluid rounded",
            src: this.shirt.frontImageUrl,
            width: 120,
            alt: this.shirt.name
          }),
          jsml.figcaption({
            className: "figure-caption text-center",
            innerText: this.shirt.name
          })
        )
      )
    );
  }
}
