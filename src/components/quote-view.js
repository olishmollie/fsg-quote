class QuoteView {
  constructor() {
    this.quote = app.quote;
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
            app.router.load(app.root);
          } else {
            // HACK: fix this shite
            app.router.load("/quote");
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
