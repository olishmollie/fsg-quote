class ProductDetail extends Component {
  constructor(opts) {
    super();

    this.product = opts.product;
    this.onsave = opts.onsave;

    this.flash = new Flash();

    this.colorPicker = new ColorPicker({
      color: { name: "black", hex: "#111" },
      colors: this.product.shirt.availableColors,
      onchange: color => {
        this.product.color = color;
        console.log(color.name + " clicked.");
      }
    });

    this.pricePerShirtLabel = new Label({
      text: "$" + this.product.costPerShirt().toFixed(2)
    });

    this.quantityInput = new NumberInput({
      value: this.product.quantity,
      min: this.product.minQuantity(),
      onchange: quantity => {
        this.product.quantity = quantity;
        if (!this.hasErrors()) {
          this.product.distributeSizes();
          this.colorCountDropdowns.updateSelections();
          this.pricePerShirtLabel.text =
            "$" + this.product.costPerShirt().toFixed(2);
        }
      }
    });

    this.colorCountDropdowns = new ColorCountDropdowns({
      product: this.product,
      onchange: () => {
        if (!this.hasErrors()) {
          this.quantityInput.min = this.product.minQuantity();
          this.pricePerShirtLabel.text =
            "$" + this.product.costPerShirt().toFixed(2);
        }
      }
    });

    this.saveButton = jsml.button({
      onclick: () => {
        this.onsave();
      }
    });
  }

  hasErrors() {
    if (this.product.notEnoughColors()) {
      this.flash.show("danger", "A minimum of 1 color is required.");
      this.saveButton.disabled = true;
      return true;
    }
    if (this.product.notEnoughQuantity()) {
      this.flash.show(
        "danger",
        "A minimum of " + this.product.minQuantity() + " shirts is required."
      );
      this.saveButton.disabled = true;
      return true;
    }
    this.flash.hide();
    this.saveButton.disabled = false;
    return false;
  }

  render() {
    return super.render(
      jsml.div(
        {
          className: "text-center m-auto p-3",
          style:
            "border: 1px solid black; box-shadow: 8px 10px rgba(0,0,0,0.05);"
        },
        jsml.component(this.flash),
        jsml.component(this.colorPicker),
        jsml.div(
          { className: "form-group mt-3" },
          jsml.strong(
            {},
            jsml.component(this.pricePerShirtLabel),
            jsml.text("/shirt")
          )
        ),
        jsml.div(
          { className: "form-group" },
          jsml.component(this.quantityInput)
        ),
        jsml.component(this.colorCountDropdowns),
        jsml.element(this.saveButton, {
          className: "btn btn-primary",
          innerText: "Save"
        })
      )
    );
  }
}
