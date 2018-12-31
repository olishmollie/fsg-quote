class QuoteItems {
  constructor(opts) {
    this.quote = opts.quote;
    this.onchange = opts.onchange;
    this.ondelete = opts.ondelete;
  }

  render() {
    return jsml.div(
      {
        className: "quote-items"
      },
      ...this.quote.products.map((product, index) => {
        return new QuoteItem({
          quote: this.quote,
          index: index,
          product: product,
          onchange: () => {
            this.onchange();
          },
          ondelete: () => {
            this.ondelete();
          }
        }).render();
      })
    );
  }
}
