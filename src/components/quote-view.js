class QuoteView extends Component {
  constructor() {
    super();
    this.quote = APP.quote;

    this.estimatedCostLabel = new Label({
      text: "$" + this.quote.estimatedCost().toFixed(2)
    });

    this.submitButton = jsml.button(
      {
        className: "form-submit btn btn-primary mt-1",
        onclick: () => {
          // TODO: mailto script
          console.log(this.quote);
        }
      },
      jsml.text("Submit")
    );
  }

  render() {
    if (this.quote.size === 0) {
      return super.render(
        jsml.div(
          {},
          jsml.p({
            innerText: "There are no items here yet."
          })
        )
      );
    } else {
      return super.render(
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
                  this.submitButton.disabled = false;
                },
                ondelete: () => {
                  this.node.innerHTML = "";
                  this.node.appendChild(this.render());
                  this.estimatedCostLabel.text =
                    "$" + this.quote.estimatedCost().toFixed(2);
                },
                onerror: () => {
                  this.submitButton.disabled = true;
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
            )
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
            jsml.component(this.submitButton)
          ),
          jsml.p({
            innerText:
              "Submit your order and we'll email you with a mockup within the week."
          })
        )
      );
    }
  }
}
