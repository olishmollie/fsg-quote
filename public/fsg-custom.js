class Dropdown {
  constructor(opts) {
    this._selections = opts.selections.map(x => x.toString());
    this._selected = opts.selected;
    this.onchange = opts.onchange;

    this.select = jsml.select(this._selections, this._selected, {
      className: opts.className,
      style: opts.style,
      onchange: event => {
        let selection = event.target.value;
        this.selected = this._selections.indexOf(selection);
        this.onchange(this.selected);
      }
    });
  }

  get selections() {
    return this.select.childNodes;
  }

  set selections(selections) {
    let oldSelections = this._selections;
    this._selections = selections.map(x => x.toString());

    this.select.innerHTML = "";
    for (let i = 0; i < selections.length; i++) {
      let option = jsml.option({
        innerText: selections[i],
        value: selections[i],
        selected: i === this._selected
      });
      this.select.appendChild(option);
    }

    // TODO: let fix = (this) => this.sucks;
    if (this._selected > oldSelections.length - 1) {
      this.selected = selections.length - 1;
    }
  }

  get selected() {
    return this._selections[this._selected];
  }

  set selected(selected) {
    this._selected = selected;
    this.selections[this._selected].selected = true;
  }

  render() {
    return this.select;
  }
}
class Label {
  constructor(opts) {
    this._text = opts.text;

    this.span = jsml.span({
      innerText: this._text,
      style: opts.style
    });
  }

  get text() {
    return this._text;
  }

  set text(text) {
    this._text = text;
    this.span.innerText = this._text;
  }

  render() {
    return this.span;
  }
}
class NumberInput {
  constructor(opts) {
    this._value = opts.value || 50;
    this._max = opts.max || 500;
    this._min = opts.min || 1;
    this.onchange = opts.onchange;

    this.incrementButton = jsml.button({
      className: "btn btn-sm btn-outline-primary",
      innerText: "\u002B",
      onclick: () => {
        this.value++;
      }
    });

    this.decrementButton = jsml.button({
      className: "btn btn-sm btn-outline-primary",
      innerText: "\u2212",
      onclick: () => {
        this.value--;
      }
    });

    this.input = jsml.input({
      className: "form-control form-control-sm text-center",
      type: "number",
      value: this.value,
      min: this.min,
      max: this.max,
      // style: "-webkit-appearance: none; margin: 0;",
      onchange: event => {
        let el = event.target;
        this.value = el.value;
      }
    });
  }

  get value() {
    return this._value;
  }

  set value(v) {
    if (v >= this.min && v <= this.max) {
      this._value = v;
    }
    this.input.value = this._value;
    this.onchange(this._value);
  }

  get min() {
    return this._min;
  }

  set min(min) {
    this._min = min;
    this.input.min = this._min;
    if (this.value < this.min) {
      this.value = this.min;
    }
  }

  get max() {
    return this._max;
  }

  set max(max) {
    this._max = max;
    this.input.max = this._max;
    if (this.value > this.max) {
      this.value = this.max;
    }
  }

  render() {
    return jsml.div(
      { className: "input-group" },
      jsml.div({ className: "input-group-prepend" }, this.decrementButton),
      this.input,
      jsml.div(
        {
          className: "input-group-append"
        },
        this.incrementButton
      )
    );
  }
}
class PickAShirt {
  constructor(opts) {
    this.shirts = opts.shirts;
    this.shirtViews = this.shirts.map(shirt => {
      return new ShirtView({
        shirt: shirt
      });
    });
  }

  // <div class="d-flex justify-content-md-between justify-content-sm-center text-center">
  //     <div *ngFor="let shirt of shirts">
  //       <cut [shirt]="shirt"></cut>
  //     </div>
  //   </div>

  render() {
    return jsml.div(
      {
        className: "pick-a-shirt d-flex justify-content-center text-center"
      },
      jsml.div({}, ...this.shirtViews.map(x => x.render()))
    );
  }
}
const DEFAULT_QUANTITY = 50;

class ProductView {
  constructor(opts) {
    this.product = new Product({
      shirt: shirts[opts.shirtId],
      quantity: DEFAULT_QUANTITY,
      frontColorCount: 1,
      backColorCount: 1
    });

    this.pricePerShirtLabel = new Label({
      text: this.pricePerShirt,
      style: "font-size: 1.3em"
    });

    this.quantityInput = new NumberInput({
      quantity: DEFAULT_QUANTITY,
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
      className: "form-control col-sm-1 m-auto",
      style: "display: inline; border: 0;",
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
      className: "form-control col-sm-1 m-auto",
      style: "display: inline; border: 0;",
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
      className: "btn btn-primary",
      innerText: "Submit",
      onclick: () => {
        console.log(this.product);
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
    return jsml.div(
      {
        className: "product-view text-center"
      },
      jsml.h1({
        innerText: this.shirt.name
      }),
      jsml.div(
        {},
        jsml.p({
          innerText: this.shirt.description
        }),
        jsml.div(
          {
            className: "text-center m-auto p-3",
            style:
              "border: 1px solid black; box-shadow: 8px 10px rgba(0,0,0,0.05);"
          },
          jsml.div(
            { className: "form-group mt-3" },
            jsml.strong(
              { id: "amount-per-shirt" },
              this.pricePerShirtLabel.render(),
              jsml.text("/shirt")
            )
          ),
          jsml.div({ className: "form-group" }, this.quantityInput.render()),
          jsml.div(
            { className: "form-group" },
            this.frontColorCountDropdown.render(),
            this.frontColorCountLabel.render(),
            this.backColorCountDropdown.render(),
            this.backColorCountLabel.render()
          ),
          jsml.div({ className: "form-group" }, this.submitButton)
        )
      )
    );
  }
}
class ShirtView {
  constructor(opts) {
    this.shirt = opts.shirt;
  }

  render() {
    return jsml.div(
      {
        className: "card"
      },
      jsml.figure(
        {
          className: "figure"
        },
        jsml.img({
          className: "figure-img img-fluid rounded",
          src: this.shirt.imageUrl,
          alt: this.shirt.name
        }),
        jsml.figcaption({
          className: "figure-caption text-center",
          innerText: this.shirt.name
        })
      )
    );
  }
}
class Component {
  constructor(tag, attributes, ...args) {
    this.element = document.createElement(tag);
    for (let attr in attributes) {
      this.element[attr] = attributes[attr];
    }
    for (let i = 0; i < args.length; i++) {
      if (args[i] instanceof Component) {
        this.element.appendChild(args[i].element);
      } else if (args[i] instanceof HTMLElement) {
        this.element.appendChild(args[i]);
      }
    }
  }

  render(base) {
    base.appendChild(this.element);
  }

  get style() {
    return this.element.style;
  }

  static span(opts) {
    return new Component("span", opts);
  }

  static button(opts) {
    return new Component("button", opts);
  }

  static input(opts) {
    return new Component("input", opts);
  }

  static select(selections, selected, opts) {
    let select = new Component("select", opts);
    for (let i = 0; i < selections.length; i++) {
      let option = new Component("option", {
        innerText: selections[i],
        value: selections[i],
        selected: i === selected
      });
      select.element.appendChild(option.element);
    }
    return select;
  }

  static mount(component, mountPoint) {
    mountPoint.appendChild(component.render());
  }
}
var jsml = (function() {
  function makeElement(tag, attributes, ...children) {
    let element = document.createElement(tag);

    for (let attr in attributes) {
      element[attr] = attributes[attr];
    }

    for (let i = 0; i < children.length; i++) {
      element.appendChild(children[i]);
    }

    return element;
  }

  return {
    h1: (attributes, ...children) => {
      return makeElement("h1", attributes, ...children);
    },
    h2: (attributes, ...children) => {
      return makeElement("h2", attributes, ...children);
    },
    h3: (attributes, ...children) => {
      return makeElement("h3", attributes, ...children);
    },
    h4: (attributes, ...children) => {
      return makeElement("h4", attributes, ...children);
    },
    h5: (attributes, ...children) => {
      return makeElement("h5", attributes, ...children);
    },
    h6: (attributes, ...children) => {
      return makeElement("h6", attributes, ...children);
    },
    div: (attributes, ...children) => {
      return makeElement("div", attributes, ...children);
    },
    p: (attributes, ...children) => {
      return makeElement("p", attributes, ...children);
    },
    strong: (attributes, ...children) => {
      return makeElement("strong", attributes, ...children);
    },
    span: (attributes, ...children) => {
      return makeElement("span", attributes, ...children);
    },
    figure: (attributes, ...children) => {
      return makeElement("figure", attributes, ...children);
    },
    figcaption: attributes => {
      return makeElement("figcaption", attributes);
    },
    img: attributes => {
      return makeElement("img", attributes);
    },
    button: attributes => {
      return makeElement("button", attributes);
    },
    input: attributes => {
      return makeElement("input", attributes);
    },
    text: text => {
      return document.createTextNode(text);
    },
    select: (selections, selected, attributes, ...children) => {
      let select = makeElement("select", attributes, ...children);
      for (let i = 0; i < selections.length; i++) {
        let option = jsml.option({
          innerText: selections[i],
          value: selections[i],
          selected: i === selected
        });
        select.appendChild(option);
      }
      return select;
    },
    option: (attributes, ...children) => {
      return makeElement("option", attributes, ...children);
    }
  };
})();
class Product {
  constructor(opts) {
    this.shirt = opts.shirt;
    this.quantity = opts.quantity;
    this.frontColorCount = opts.frontColorCount;
    this.backColorCount = opts.backColorCount;
  }
}
class Shirt {
  constructor(opts) {
    this.name = opts.name;
    this.price = opts.price;
    this.imageUrl = opts.imageUrl;
    this.description = opts.description;
    this.availableSizes = opts.availableSizes;
  }
}

const shirts = [
  new Shirt({
    price: 5,
    tier: "middle",
    name: "Unisex Jersey Short Sleeve",
    imageUrl: "assets/3001_06_1.jpg",
    description:
      "This updated unisex essential fits like a well-loved favorite, featuring a crew neck, short sleeves and designed with superior combed and ring-spun cotton that acts as the best blank canvas for printing. Offered in a variety of solid and heather cvc colors.",
    availableSizes: ["XS", "S", "M", "L", "XL", "2XL"]
  }),
  new Shirt({
    price: 7,
    tier: "top",
    name: "Tri-Blend Crew",
    imageUrl: "assets/mn1_000032.jpg",
    description:
      "Top quality tri-blend crew cut. Superior design for a great feel and a perfect fit.",
    availableSizes: ["XS", "S", "M", "L", "XL", "2XL"]
  }),
  new Shirt({
    price: 4,
    tier: "bottom",
    name: "Classic Short Sleeve",
    imageUrl: "assets/G2000-095-SM.png",
    description:
      "Classic tee that'll never go out of style. Great shirt at a great price.",
    availableSizes: ["XS", "S", "M", "L", "XL", "2XL"]
  })
];
