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
      },
      ondelete: () => {
        if (this.quote.size == 0) {
          console.log("got here!");
          APP.router.load("/");
        } else {
          let node = document.getElementById("quote-view");
          node.innerHTML = "";
          node.appendChild(this.render());
        }
      }
    }).render();
  }

  render() {
    return jsml.div(
      {
        id: "quote-view"
      },
      this.quoteItems
    );
  }
}
