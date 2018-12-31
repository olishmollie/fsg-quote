class QuoteItem {
  constructor(opts) {
    this.quote = opts.quote;
    this.index = opts.index;
    this.product = opts.product;
    this.onchange = opts.onchange;
  }

  node() {
    return jsml.div(
      {
        className: "quote-item media",
        style: "border: 1px solid black"
      },
      jsml.div(
        {
          className: "media-body"
        },
        jsml.h5(
          {
            className: "quote-item-title"
          },
          jsml.strong({
            className: "quote-item-index mr-2",
            innerText: this.index + 1 + "."
          }),
          jsml.text(this.product.shirt.name),
          jsml.button({
            className: "trash-button float-right btn btn-danger",
            innerText: "TRASH",
            onclick: () => {
              this.quote.remove(this.product);
              APP.router.load("/quote");
            }
          })
        ),
        new QuantityInputs({
          product: this.product
        }).node()
      )
    );
  }
}
