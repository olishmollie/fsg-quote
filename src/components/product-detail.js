class ProductDetail extends Component {
  constructor(props) {
    super(props);
  }

  init() {
    this.colorPicker = new ColorPicker({
      color: { name: "black", hex: "#111" },
      colors: this.props.product.shirt.availableColors,
      onchange: color => {
        this.props.product.color = color;
        console.log(color.name + " clicked.");
      }
    });

    this.pricePerShirtLabel = new Label({
      text: "$" + this.props.product.costPerShirt().toFixed(2)
    });

    this.quantityInput = new NumberInput({
      value: this.props.product.quantity,
      min: this.props.product.minQuantity(),
      onchange: quantity => {
        this.props.product.quantity = quantity;
        if (!this.props.product.hasErrors()) {
          this.props.product.distributeSizes();
          this.colorCountDropdowns.updateSelections();
          this.pricePerShirtLabel.text =
            "$" + this.props.product.costPerShirt().toFixed(2);
          this.props.noerrors();
        } else {
          this.props.onerror();
        }
      }
    });

    this.colorCountDropdowns = new ColorCountDropdowns({
      product: this.props.product,
      onchange: () => {
        if (!this.props.product.hasErrors()) {
          this.quantityInput.min = this.props.product.minQuantity();
          this.pricePerShirtLabel.text =
            "$" + this.props.product.costPerShirt().toFixed(2);
          this.props.noerrors();
        } else {
          this.props.onerror();
        }
      }
    });
  }

  didRender() {
    if (this.props.product.hasErrors()) {
      this.props.onerror();
    } else {
      this.props.noerrors();
    }
  }

  render() {
    return jsml.div(
      {},
      jsml.component({}, this.colorPicker),
      jsml.div(
        {
          className: "price-per-shirt-label"
        },
        jsml.strong(
          {},
          jsml.component({}, this.pricePerShirtLabel),
          jsml.text("/shirt")
        )
      ),
      jsml.button(
        {
          className: "btn btn-sm btn-link",
          onclick: () => {
            this.props.onShowPricingModal();
          }
        },
        jsml.text("Show Pricing")
      ),
      jsml.div({}, jsml.component({}, this.quantityInput)),
      jsml.component({}, this.colorCountDropdowns)
    );
  }
}
