class ProductDetail extends Component {
  constructor(props) {
    super(props);
  }

  init() {
    this.flash = new Flash();

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
          this.noErrors();
        } else {
          this.handleErrors();
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
          this.noErrors();
        } else {
          this.handleErrors();
        }
      }
    });

    this.saveButton = jsml.button({
      onclick: () => {
        this.props.onsave();
      }
    });
  }

  handleErrors() {
    if (this.props.product.notEnoughColors()) {
      this.flash.show("danger", "A minimum of 1 color is required.");
      this.saveButton.disabled = true;
    }
    if (this.props.product.notEnoughQuantity()) {
      this.flash.show(
        "danger",
        "A minimum of " +
          this.props.product.minQuantity() +
          " shirts is required."
      );
      this.saveButton.disabled = true;
    }
  }

  noErrors() {
    this.flash.hide();
    this.saveButton.disabled = false;
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
        {},
        jsml.component({}, this.colorPicker),
        jsml.div(
          { className: "form-group" },
          jsml.strong(
            {},
            jsml.component({}, this.pricePerShirtLabel),
            jsml.text("/shirt")
          )
        ),
        jsml.div(
          { className: "form-group" },
          jsml.component({}, this.quantityInput)
        ),
        jsml.component({}, this.colorCountDropdowns),
        jsml.component({}, this.flash),
        jsml.element(
          {
            className: "btn btn-primary"
          },
          this.saveButton,
          jsml.text("Save")
        )
      )
    );
  }
}
