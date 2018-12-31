class QuantityInputs extends Component {
  constructor(opts) {
    super();
    this.product = opts.product;

    this.inputs = this.shirt.availableSizes.map((size, i) => {
      return jsml.li(
        {
          className: "list-inline-item"
        },
        jsml.label({
          innerText: size
        }),
        jsml.input({
          className: "form-control",
          value: this.product.quantities[this.shirt.availableSizes[i]]
        })
      );
    });
  }

  get shirt() {
    return this.product.shirt;
  }

  render() {
    return super.container(
      "ul",
      {
        className: "list-inline"
      },
      ...this.inputs
    );
  }
}
