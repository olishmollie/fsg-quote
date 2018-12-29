class QuoteView {
  constructor() {
    this.quote = quote;
  }

  render() {
    return jsml.div(
      {
        className: "quote-view"
      },
      jsml.p({
        innerText: "This is the quote view."
      })
    );
  }
}
