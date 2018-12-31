class QuoteItems extends Component {
  constructor(opts) {
    super();
    this.quote = opts.quote;
    this.onchange = opts.onchange;
  }

  get quoteItems() {
    if (this.empty()) {
      return [
        jsml.p({
          innerText: "There are no items here yet."
        })
      ];
    }
    return this.quote.products.map((product, index) => {
      return new QuoteItem({
        quote: this.quote,
        index: index,
        product: product,
        onchange: () => {
          console.log("changed a quote item.");
          this.onchange();
        },
        ondelete: index => {
          this.node.innerHTML = "";
          this.node.appendChild(this.render());
        }
      }).render();
    });
  }

  empty() {
    return this.quote.size == 0;
  }

  render() {
    return super.render("div", {}, ...this.quoteItems);
  }
}
