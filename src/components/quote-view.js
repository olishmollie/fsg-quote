class QuoteView {
  constructor() {
    this.quote = APP.quote;
  }

  get size() {
    return this.products.length;
  }

  get products() {
    return this.quote.products;
  }

  get productDetails() {
    if (this.size == 0) {
      // TODO: conditional rendering?
      return [
        jsml.p({
          innerText: "This quote has no items yet."
        })
      ];
    }

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
      }).render();
    });
  }

  render() {
    return jsml.div(
      {
        className: "quote-view"
      },
      ...this.productDetails
    );
  }
}
