class QuoteView {
  constructor() {
    this.quote = APP.quote;
  }

  get products() {
    return this.quote.products;
  }

  get productDetailViews() {
    return this.products.map((product, i) => {
      return new ProductDetailView({
        id: i,
        product: product,
        onchange: () => {
          if (this.quote.size == 0) {
            APP.router.load(APP.root);
          } else {
            // HACK: fix this shite
            APP.router.load("/quote");
          }
        }
      });
    });
  }

  render() {
    return jsml.div(
      {
        className: "quote-view"
      },
      ...this.productDetailViews.map(x => x.render())
    );
  }
}
