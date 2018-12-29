class QuoteView {
  constructor() {
    // TODO: figure out how to pass this while playing nice with router
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
