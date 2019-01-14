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
        className: "card"
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
