class ShirtView {
  constructor(opts) {
    this.shirt = opts.shirt;
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
    );
  }
}
