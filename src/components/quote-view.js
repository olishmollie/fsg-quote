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
          jsml.div(
            { className: "mt-3" },
            jsml.h3(
              {
                innerText: "Estimated Cost: "
              },
              jsml.component(this.estimatedCostLabel)
            ),
            jsml.div(
              {
                className: "form-group"
              },
              jsml.input({
                type: "email",
                className: "form-control user-email",
                placeholder: "Email"
              }),
              jsml.button({
                className: "form-submit btn btn-primary mt-1",
                innerText: "Submit",
                onclick: () => {
                  // TODO: mailto script
                }
              })
            ),
            jsml.p({
              innerText:
                "Submit your order and we'll email you with a mockup within the week."
            })
          )
        )
      )
    );
  }
}
