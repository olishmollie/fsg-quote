class ProductDetail extends Component {
  constructor(opts) {
    super();

    this.product = opts.product;
    this.onsave = opts.onsave;

    this.flash = new Flash();

    this.pricePerShirtLabel = new Label({
      text: "$" + this.product.costPerShirt().toFixed(2)
    });

    this.quantityInput = new NumberInput({
      value: this.product.quantity,
      min: this.product.minQuantity(),
      onchange: quantity => {
        this.product.quantity = quantity;
        this.product.distributeSizes();
        this.frontColorCountDropdown.selections = this.dropdownSelections();
        this.backColorCountDropdown.selections = this.dropdownSelections();
        console.log(this.frontColorCountDropdown.selections);
        this.pricePerShirtLabel.text =
          "$" + this.product.costPerShirt().toFixed(2);
      },
      outofbounds: () => {
        this.flash.show(
          "danger",
          "A minimum of " + this.product.minQuantity() + " shirts are required."
        );
        this.saveButton.disabled = true;
      },
      inbounds: () => {
        this.flash.hide();
        this.saveButton.disabled = false;
      }
    });

    this.frontColorCountLabel = new Label({
      text: this.colorLabel("front")
    });

    this.frontColorCountDropdown = new Dropdown({
      selections: this.dropdownSelections(),
      selected: this.product.frontColorCount,
      onchange: selection => {
        this.product.frontColorCount = parseInt(selection);
        this.frontColorCountLabel.text = this.colorLabel("front");
        this.quantityInput.min = this.product.minQuantity();
        this.pricePerShirtLabel.text =
          "$" + this.product.costPerShirt().toFixed(2);
      }
    });

    this.backColorCountLabel = new Label({
      text: this.colorLabel("back")
    });

    this.backColorCountDropdown = new Dropdown({
      selections: this.dropdownSelections(),
      selected: this.product.backColorCount,
      onchange: selection => {
        this.product.backColorCount = parseInt(selection);
        this.backColorCountLabel.text = this.colorLabel("back");
        this.quantityInput.min = this.product.minQuantity();
        this.pricePerShirtLabel.text =
          "$" + this.product.costPerShirt().toFixed(2);
      }
    });

    this.saveButton = jsml.button({
      onclick: () => {
        this.onsave();
      }
    });
  }

  colorLabel(side) {
    if (side != "front" && side != "back") {
      throw "invalid side for color label";
    }
    let count =
      side === "front"
        ? this.product.frontColorCount
        : this.product.backColorCount;
    return side + (count === 1 ? " color" : " colors");
  }

  dropdownSelections() {
    var count;
    if (this.product.quantity < 24) {
      count = 3;
    } else if (this.product.quantity <= 49) {
      count = 5;
    } else {
      count = 7;
    }
    return new Array(count).fill(0).map((_, i) => i.toString());
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
        jsml.div(
          { className: "form-group mt-3" },
          jsml.strong(
            {},
            jsml.component(this.pricePerShirtLabel, {
              style: "font-size: 1.3em"
            }),
            jsml.text("/shirt")
          )
        ),
        jsml.div(
          { className: "form-group" },
          jsml.component(this.quantityInput)
        ),
        jsml.div(
          { className: "form-group" },
          jsml.component(this.frontColorCountDropdown, {
            className: "col-sm-1 m-auto",
            style: "display: inline; border: 0;"
          }),
          jsml.component(this.frontColorCountLabel),
          jsml.component(this.backColorCountDropdown, {
            className: "col-sm-1 m-auto",
            style: "display: inline; border: 0;"
          }),
          jsml.component(this.backColorCountLabel)
        ),
        jsml.component(this.saveButton, {
          className: "btn btn-primary",
          innerText: "Save"
        })
      )
    );
  }
}
