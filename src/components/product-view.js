class ProductView extends Component {
  constructor(opts = {}) {
    super();
    this.quote = APP.quote;

    this.product = new Product({
      shirt: APP.shirts[opts.shirtId],
      quantity: 50,
      frontColorCount: 1,
      backColorCount: 1
    });

    this.colorPicker = new ColorPicker({
      color: { name: "black", hex: "#111" },
      colors: this.shirt.availableColors,
      onchange: color => {
        this.product.color = color;
        console.log(color.name + " clicked.");
      }
    });

    this.pricePerShirtLabel = new Label({
      text: this.pricePerShirt
    });

    this.quantityInput = new NumberInput({
      quantity: this.quantity,
      max: 500,
      min: this.minQuantity(),
      onchange: quantity => {
        this.quantity = quantity;
        this.frontColorCountDropdown.selections = this.dropdownSelections();
        this.backColorCountDropdown.selections = this.dropdownSelections();
        this.pricePerShirt = this.calcAmountPerShirt();
      }
    });

    this.frontColorCountLabel = new Label({
      text: this.colorLabel("front")
    });

    this.frontColorCountDropdown = new Dropdown({
      selections: this.dropdownSelections(),
      selected: this.frontColorCount,
      onchange: selection => {
        this.frontColorCount = selection;
        this.frontColorCountLabel.text = this.colorLabel("front");
        this.quantityInput.min = this.minQuantity();
        this.pricePerShirt = this.calcAmountPerShirt();
      }
    });

    this.backColorCountLabel = new Label({
      text: this.colorLabel("back")
    });

    this.backColorCountDropdown = new Dropdown({
      selections: this.dropdownSelections(),
      selected: this.backColorCount,
      onchange: selection => {
        this.backColorCount = selection;
        this.backColorCountLabel.text = this.colorLabel("back");
        this.quantityInput.min = this.minQuantity();
        this.pricePerShirt = this.calcAmountPerShirt();
      }
    });

    this.submitButton = jsml.button({
      onclick: () => {
        this.product.distributeSizes();
        this.quote.add(this.product);
        APP.router.load("#/products/" + this.product.id + "/canvas");
      }
    });
  }

  get shirt() {
    return this.product.shirt;
  }

  get pricePerShirt() {
    return "$" + this.calcAmountPerShirt().toFixed(2);
  }

  set pricePerShirt(price) {
    this.pricePerShirtLabel.text = "$" + price.toFixed(2);
  }

  get quantity() {
    return this.product.quantity;
  }

  set quantity(quantity) {
    this.product.quantity = parseInt(quantity);
  }

  get frontColorCount() {
    return this.product.frontColorCount;
  }

  set frontColorCount(count) {
    this.product.frontColorCount = parseInt(count);
  }

  get backColorCount() {
    return this.product.backColorCount;
  }

  set backColorCount(count) {
    this.product.backColorCount = parseInt(count);
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
    if (this.frontColorCount <= 2 && this.backColorCount <= 2) {
      return 1;
    } else if (this.frontColorCount <= 4 && this.backColorCount <= 4) {
      return 24;
    } else {
      return 50;
    }
  }

  calcAmountPerShirt() {
    let prices = this.priceTable();
    let firstLocationPrice =
      prices[this.frontColorCount] > prices[this.backColorCount]
        ? prices[this.frontColorCount]
        : prices[this.backColorCount];
    let secondLocationPrice =
      prices[this.frontColorCount] > prices[this.backColorCount]
        ? prices[this.backColorCount] / 2
        : prices[this.frontColorCount] / 2;
    return this.shirt.price + firstLocationPrice + secondLocationPrice;
  }

  priceTable() {
    var result;
    if (this.quantity < 24) {
      result = {
        "0": 0,
        "1": 8,
        "2": 11
      };
    } else if (this.quantity <= 49) {
      result = {
        "0": 0,
        "1": 3,
        "2": 4,
        "3": 5,
        "4": 6
      };
    } else if (this.quantity <= 99) {
      result = {
        "0": 0,
        "1": 2.25,
        "2": 3.25,
        "3": 4.25,
        "4": 5.25,
        "5": 6.15,
        "6": 7.15
      };
    } else if (this.quantity <= 249) {
      result = {
        "0": 0,
        "1": 2,
        "2": 3,
        "3": 4,
        "4": 5,
        "5": 6,
        "6": 7
      };
    } else {
      result = {
        "0": 0,
        "1": 1.75,
        "2": 2.85,
        "3": 3.85,
        "4": 4.85,
        "5": 5.6,
        "6": 6.75
      };
    }
    return result;
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
        innerText: this.shirt.name
      }),
      jsml.div(
        {},
        jsml.p({
          innerText: this.shirt.description
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
            jsml.component(this.submitButton, {
              className: "btn btn-primary",
              innerText: "Submit"
            })
          )
        )
      )
    );
  }
}
