class QuoteView extends Component {
  constructor() {
    super();
    this.quote = APP.quote;

    this.quoteItems = this.estimatedCostLabel = new Label({
      text: "$" + this.quote.estimatedCost().toFixed(2)
    });
  }

  render() {
    return super.render(
      "div",
      {},
      jsml.cond(
        this.quote.size === 0,
        jsml.p({
          innerText: "There are no items here yet."
        }),
        jsml.div(
          {},
          ...this.quote.products.map((product, index) => {
            return jsml.component(
              new QuoteItem({
                quote: this.quote,
                product: product,
                index: index,
                onchange: () => {
                  this.estimatedCostLabel.text =
                    "$" + this.quote.estimatedCost().toFixed(2);
                },
                ondelete: () => {
                  this.node.innerHTML = "";
                  this.node.appendChild(this.render());
                  this.estimatedCostLabel.text =
                    "$" + this.quote.estimatedCost().toFixed(2);
                }
              })
            );
          }),
          jsml.h3(
            {
              innerText: "Estimated Cost: "
            },
            jsml.component(this.estimatedCostLabel)
          )
        )
      )
    );
  }
}
