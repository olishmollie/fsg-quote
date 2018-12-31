class QuoteView {
  constructor() {
    this.quote = APP.quote;
  }

  get quoteItems() {
    if (this.quote.size == 0) {
      // TODO: conditional rendering?
      return jsml.p({
        innerText: "This quote has no items yet."
      });
    }
    return new QuoteItems({
      quote: this.quote,
      onchange: () => {
        console.log("something changed");
      }
    }).node();
  }

  node() {
    return jsml.div(
      {
        className: "quote-view"
      },
      this.quoteItems
    );
  }
}
