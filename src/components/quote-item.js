class QuoteItem extends Component {
  constructor(props) {
    super(props);
  }

  init() {
    this.slideDown = new Slidedown();

    this.flash = new Flash();

    this.colorCountDropdowns = new ColorCountDropdowns({
      product: this.props.product,
      onchange: () => {
        this.handleDropdownChange();
      }
    });
  }

  customizeRoute() {
    return (
      "#/products/" +
      this.props.product.shirt.id +
      "?productId=" +
      this.props.product.id
    );
  }

  handleDropdownChange() {
    if (!this.props.product.hasErrors()) {
      this.props.quote.updateProduct(this.props.product.id, this.props.product);
      this.flash.hide();
      this.props.onchange();
      this.noErrors();
    } else {
      this.handleErrors();
    }
  }

  handleInputChange(size, value) {
    if (!isNaN(value)) {
      this.props.product.quantities[size] = parseInt(value);
      this.props.product.quantity = this.props.product.quantityFromSizes();
      this.props.quote.updateProduct(this.props.product.id, this.props.product);
      if (!this.props.product.hasErrors()) {
        this.colorCountDropdowns.updateSelections();
        this.props.onchange();
        this.noErrors();
      } else {
        this.handleErrors();
      }
    }
  }

  handleErrors() {
    if (this.props.product.notEnoughQuantity()) {
      this.node.style.borderColor = "red";
      this.flash.show(
        "danger",
        "A minimum of " +
          this.props.product.minQuantity() +
          " shirts are required."
      );
    }
    if (this.props.product.notEnoughColors()) {
      this.node.style.borderColor = "red";
      this.flash.show("danger", "A minimum of 1 color is required.");
    }
    this.props.onerror();
  }

  noErrors() {
    this.node.style.borderColor = "";
    this.flash.hide();
  }

  didRender() {
    if (this.props.product.hasErrors()) {
      this.handleErrors();
    } else {
      this.noErrors();
    }
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
                  this.props.quote.remove(this.props.product);
                  this.props.ondelete();
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
              src: this.props.product.frontMockup,
              width: "64",
              height: "64"
            }),
            jsml.h5(
              {},
              jsml.strong({}, jsml.text(this.props.index + 1 + ". ")),
              jsml.text(this.props.product.shirt.name)
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
            ...this.props.product.shirt.availableSizes.map(size => {
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
                    value: this.props.product.quantities[size],
                    min: 1,
                    max: 2000,
                    onchange: value => {
                      this.handleInputChange(size, parseInt(value));
                    },
                    onblur: () => {
                      this.handleInputChange(
                        size,
                        this.props.product.quantities[size]
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
