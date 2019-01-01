class ShirtView extends Component {
  constructor(opts = {}) {
    super();
    this.shirt = opts.shirt;
  }

  render() {
    return super.render(
      "div",
      {
        className: "card"
      },
      jsml.figure(
        {
          className: "figure"
        },
        jsml.a(
          {
            href: "#/shirts/" + this.shirt.id
          },
          jsml.img({
            className: "figure-img img-fluid rounded",
            src: this.shirt.imageUrl,
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
