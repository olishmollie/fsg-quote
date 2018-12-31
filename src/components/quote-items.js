class QuoteItems {
  constructor(opts) {
    this.quote = opts.quote;
    this.onchange = opts.onchange;
  }

  node() {
    return jsml.div(
      {
        className: "quote-items"
      },
      ...this.quote.products.map((product, index) => {
        return new QuoteItem({
          index: index,
          product: product,
          onchange: () => {
            this.onchange();
          }
        }).node();
      })
    );
  }
}
