class QuantityInputs extends Component {
  constructor(opts) {
    super();
    this.quote = opts.quote;
    this.product = opts.product;
    this.onchange = opts.onchange;
  }

  get shirt() {
    return this.product.shirt;
  }

  render() {
    return super.render(
      "ul",
      {
        className: "list-inline"
      },
      ...this.shirt.availableSizes.map((size, i) => {
        return jsml.li(
          {
            className: "list-inline-item"
          },
          jsml.label({
            innerText: size
          }),
          jsml.input({
            className: "form-control",
            value: this.product.quantities[this.shirt.availableSizes[i]],
            onchange: event => {
              this.product.quantities[size] = parseInt(event.target.value);
              this.product.quantity = this.product.quantityFromSizes();
              this.quote.updateProduct(this.product.id, this.product);
              this.onchange();
            }
          })
        );
      })
    );
  }
}
