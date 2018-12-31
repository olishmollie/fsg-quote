class QuoteItem extends Component {
  constructor(opts) {
    super();
    this.quote = opts.quote;
    this.index = opts.index;
    this.product = opts.product;
    this.onchange = opts.onchange;
    this.ondelete = opts.ondelete;
  }

  render() {
    return super.render(
      "div",
      {
        className: "media"
      },
      jsml.div(
        {
          className: "media-body"
        },
        jsml.h5(
          {
            className: "quote-item-title"
          },
          jsml.strong({
            className: "quote-item-index mr-2",
            innerText: this.index + 1 + "."
          }),
          jsml.text(this.product.shirt.name),
          jsml.button({
            className: "trash-button float-right btn btn-danger",
            innerText: "TRASH",
            onclick: () => {
              this.quote.remove(this.product);
              this.ondelete(this.index);
            }
          })
        ),
        new QuantityInputs({
          product: this.product,
          onchange: this.onchange
        }).render()
      )
    );
  }
}