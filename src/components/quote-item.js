class QuoteItem extends Component {
  constructor(opts) {
    super();
    this.quote = opts.quote;
    this.index = opts.index;
    this.product = opts.product;
    this.onchange = opts.onchange;
    this.ondelete = opts.ondelete;
    this.onerror = opts.onerror;

    this.slideDown = new Slidedown();

    this.flash = new Flash();

    this.colorCountDropdowns = new ColorCountDropdowns({
      product: this.product,
      onchange: () => {
        this.handleDropdownChange();
      }
    });
  }

  customizeRoute() {
    return (
      "#/products/" + this.product.shirt.id + "?productId=" + this.product.id
    );
  }

  handleDropdownChange() {
    if (!this.hasErrors()) {
      this.quote.updateProduct(this.product.id, this.product);
      this.flash.hide();
      this.onchange();
    } else {
      this.onerror();
    }
  }

  handleInputChange(size, value) {
    if (!isNaN(value)) {
      this.product.quantities[size] = parseInt(value);
      this.product.quantity = this.product.quantityFromSizes();
      if (!this.hasErrors()) {
        this.colorCountDropdowns.updateSelections();
        this.quote.updateProduct(this.product.id, this.product);
        this.onchange();
      } else {
        this.onerror();
      }
    }
  }

  hasErrors() {
    if (this.product.notEnoughQuantity()) {
      this.node.style.borderColor = "red";
      this.flash.show(
        "danger",
        "A minimum of " + this.product.minQuantity() + " shirts are required."
      );
      return true;
    }
    if (this.product.notEnoughColors()) {
      this.node.style.borderColor = "red";
      this.flash.show("danger", "A minimum of 1 color is required.");
      return true;
    }
    this.node.style.borderColor = "";
    this.flash.hide();
    return false;
  }

  render() {
    return super.render(
      jsml.div(
        {
          className: "media"
        },
        jsml.component(
          {
            style: {
              backgroundColor: "blue",
              color: "white"
            }
          },
          this.slideDown,
          jsml.div(
            {
              style: {
                position: "relative",
                top: "40%"
              }
            },
            jsml.p(
              {
                style: {
                  display: "inline"
                }
              },
              jsml.text("Are you sure?")
            ),
            jsml.button(
              {
                onclick: () => {
                  this.slideDown.slideUp();
                }
              },
              jsml.text("Cancel")
            ),
            jsml.button(
              {
                onclick: () => {
                  this.quote.remove(this.product);
                  this.ondelete();
                }
              },
              jsml.text("Delete")
            )
          )
        ),
        jsml.div(
          {
            className: "media-body"
          },
          jsml.a(
            {
              href: this.customizeRoute()
            },
            jsml.img({
              src: this.product.frontMockup,
              width: "64",
              height: "64"
            }),
            jsml.h5(
              {},
              jsml.strong({}, jsml.text(this.index + 1 + ". ")),
              jsml.text(this.product.shirt.name)
            )
          ),
          jsml.button(
            {
              className: "delete-button",
              onclick: () => {
                this.slideDown.slideDown();
              }
            },
            jsml.text("TRASH")
          ),
          jsml.div(
            {
              className: "quantity-inputs"
            },
            ...this.product.shirt.availableSizes.map(size => {
              return jsml.div(
                {
                  style: {
                    display: "inline-block"
                  }
                },
                jsml.label(
                  {
                    style: {
                      display: "block",
                      textAlign: "center",
                      margin: 0
                    }
                  },
                  jsml.text(size)
                ),
                jsml.component(
                  {},
                  new ControlledInput({
                    type: "number",
                    value: this.product.quantities[size],
                    min: 1,
                    max: 2000,
                    onchange: value => {
                      this.handleInputChange(size, parseInt(value));
                    },
                    onblur: () => {
                      this.handleInputChange(
                        size,
                        this.product.quantities[size]
                      );
                    }
                  })
                )
              );
            })
          ),
          jsml.component({}, this.flash),
          jsml.component({}, this.colorCountDropdowns)
        )
      )
    );
  }
}
