class CustomizeView extends Component {
  constructor(opts) {
    super();
    this.quote = APP.quote;

    this.product = opts.productId
      ? new Product(this.quote.products[opts.productId])
      : new Product({
          shirt: APP.shirts[opts.shirtId],
          quantity: 50,
          frontColorCount: 1,
          backColorCount: 1
        });

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
      max: 500,
      min: this.minQuantity(),
      onchange: quantity => {
        this.product.quantity = parseInt(quantity);
        this.frontColorCountDropdown.selections = this.dropdownSelections();
        this.backColorCountDropdown.selections = this.dropdownSelections();
        this.pricePerShirtLabel.text =
          "$" + this.product.costPerShirt().toFixed(2);
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
        this.quantityInput.min = this.minQuantity();
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
        this.quantityInput.min = this.minQuantity();
        this.pricePerShirtLabel.text =
          "$" + this.product.costPerShirt().toFixed(2);
      }
    });

    this.saveButton = jsml.button({
      onclick: () => {
        this.save();
        APP.router.load("#/quote");
      }
    });
  }

  save() {
    if (!this.product.persisted()) {
      this.quote.add(this.product);
      this.quote.save();
    }
    this.product.distributeSizes();
    this.quote.updateProduct(this.product.id, this.product);
  }

  get shirt() {
    return this.product.shirt;
  }

  dropdownSelections() {
    var count;
    if (this.quantity < 24) {
      count = 3;
    } else if (this.quantity <= 49) {
      count = 5;
    } else {
      count = 7;
    }
    return new Array(count).fill(0).map((_, i) => i.toString());
  }

  minQuantity() {
    if (this.product.frontColorCount <= 2 && this.product.backColorCount <= 2) {
      return 1;
    } else if (
      this.product.frontColorCount <= 4 &&
      this.product.backColorCount <= 4
    ) {
      return 24;
    } else {
      return 50;
    }
  }

  colorLabel(side) {
    if (side != "front" && side != "back") {
      throw "invalid side for color label";
    }
    let count = side === "front" ? this.frontColorCount : this.backColorCount;
    return side + (count === 1 ? " color" : " colors");
  }

  render() {
    return super.render(
      "div",
      {
        className: "text-center"
      },
      jsml.h1({
        innerText: this.product.shirt.name
      }),
      jsml.div(
        {},
        jsml.p({
          innerText: this.product.shirt.description
        }),
        jsml.component(this.colorPicker),
        jsml.div(
          {
            className: "text-center m-auto p-3",
            style:
              "border: 1px solid black; box-shadow: 8px 10px rgba(0,0,0,0.05);"
          },
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
              className: "form-control col-sm-1 m-auto",
              style: "display: inline; border: 0;"
            }),
            jsml.component(this.frontColorCountLabel),
            jsml.component(this.backColorCountDropdown, {
              className: "form-control col-sm-1 m-auto",
              style: "display: inline; border: 0;"
            }),
            jsml.component(this.backColorCountLabel)
          ),
          jsml.div(
            { className: "form-group" },
            jsml.component(this.saveButton, {
              className: "btn btn-primary",
              innerText: "Save"
            })
          )
        ),
        jsml.component(
          new ImageCanvas({
            product: this.product
          })
        )
      )
    );
  }
}
