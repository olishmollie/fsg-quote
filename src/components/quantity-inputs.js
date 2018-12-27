class QuantityInputs {
  constructor(opts) {
    this.product = opts.product;
    this.quantities = this.product.quantities;

    this.inputs = this.shirt.availableSizes.map((size, i) => {
      return jsml.div(
        {
          className: "quantity-input"
        },
        jsml.label({
          innerText: size
        }),
        jsml.input({
          className: "form-control col-1",
          value: this.quantities[i]
        })
      );
    });
  }

  get shirt() {
    return this.product.shirt;
  }

  render() {
    jsml.div(
      {
        className: "quantity-inputs form-group"
      },
      ...this.inputs.map(x => x.render())
    );
  }
}
