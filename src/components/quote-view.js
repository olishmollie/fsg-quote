class QuoteView {
  constructor() {
    // TODO: figure out how to pass this while playing nice with router
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
            app.router.location = app.root;
          } else {
            // HACK: fix this shite
            app.router.location = "/quote";
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
