class ProductDetailView {
  constructor(opts) {
    this.id = opts.id;
    this.product = opts.product;
    this.onchange = opts.onchange;

    this.quantityInputView = new QuantityInputView({
      product: this.product
    });
  }

  render() {
    return jsml.div(
      {
        className: "product-detail media",
        style: "border: 1px solid black"
      },
      jsml.div(
        {
          className: "media-body"
        },
        jsml.h5(
          {
            className: "product-detail-title"
          },
          jsml.strong({
            className: "product-detail-number mr-2",
            innerText: this.id + 1 + "."
          }),
          jsml.text(this.product.shirt.name),
          jsml.button({
            className: "trash-button float-right btn btn-danger",
            innerText: "TRASH",
            onclick: () => {
              // DEBT: implicit dependency on app
              app.quote.remove(this.product);
              this.onchange();
            }
          })
        ),
        this.quantityInputView.render()
      )
    );
  }
}
