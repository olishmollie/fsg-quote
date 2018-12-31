class App {
  constructor(opts) {
    this.root = opts.root;
    this.quote = opts.quote;
    this.shirts = opts.shirts;
    this.router = opts.router;

    window.APP = this;
    this.router.load(window.location.hash);
  }
}
class Component {
  constructor() {
    this.container = jsml.div({
      id: util.idName(this)
    });
  }

  render() {
    this.container.innerHTML = "";
    this.container.appendChild(this.render());
    return this.container;
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
    a: (attributes, ...children) => {
      return makeElement("a", attributes, ...children);
    },
    div: (attributes, ...children) => {
      return makeElement("div", attributes, ...children);
    },
    nav: (attributes, ...children) => {
      return makeElement("nav", attributes, ...children);
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
    label: (attributes, ...children) => {
      return makeElement("label", attributes, ...children);
    },
    input: attributes => {
      return makeElement("input", attributes);
    },
    ul: (attributes, ...children) => {
      return makeElement("ul", attributes, ...children);
    },
    li: (attributes, ...children) => {
      return makeElement("li", attributes, ...children);
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
class Route {
  constructor(opts) {
    this.href = opts.href;
    this.path = this.href
      .replace(":", "")
      .split("/")
      .slice(1);
    this.variables = [];
    this.regex = this.parse(this.href);
    this.component = opts.component;
  }

  parse(href) {
    return new RegExp(
      href.replace(/:(\w+)/g, (_, name) => {
        this.variables.push(name);
        return "([^/]+)";
      }) + "(?:/|$)"
    );
  }

  resolve(path) {
    let match = path.match(this.regex);
    if (match) {
      let params = {};
      match = match.slice(1); // get rid of matched string
      for (let i = 0; i < this.variables.length; i++) {
        params[this.variables[i]] = match[i];
      }
      return new this.component(params);
    }
    throw "could not resolve path: " + path;
  }
}
class Router {
  constructor(opts) {
    this.routes = opts.routes || [];
    this.location = null;
    this.listen();
  }

  load(hash) {
    let route = this.routes.find(route => {
      return route.regex.exec(hash);
    });

    // load base route if not found
    if (!route) {
      this.load("/");
      return;
    }

    // update location
    this.location = hash;

    //replace url in browser
    window.location.hash = hash;

    // load the view
    let component = route.resolve(hash);
    APP.root.mount(component);
  }

  listen() {
    setTimeout(() => {
      if (window.location.hash != this.location) {
        this.load(window.location.hash);
      }
      this.listen();
    });
  }
}
let util = (function() {
  function idName(component) {
    var result = [];
    var name = component.constructor.name;
    var i = 0;
    while (i < name.length) {
      if (isUpper(name[i])) {
        result.push(name[i++].toLowerCase());
        while (i < name.length && !isUpper(name[i])) {
          result.push(name[i++]);
        }
        if (i < name.length) result.push("-");
      }
    }
    return result.join("");
  }

  function isUpper(c) {
    return c === c.toUpperCase();
  }

  return {
    idName
  };
})();
class Product {
  constructor(opts) {
    this.shirt = opts.shirt;
    this.color = opts.color;
    this.quantity = opts.quantity;
    this.frontColorCount = opts.frontColorCount;
    this.backColorCount = opts.backColorCount;
    this.quantities = {};
  }

  distributeSizes() {
    const ratios = {
      XS: 0.5,
      S: 1,
      M: 2.5,
      L: 2,
      XL: 0.75,
      "2XL": 0.25
    };

    var sizes = {};
    var total = 0;
    const divisor = 7;

    var multiplier = this.quantity / divisor;

    for (var i = 0, len = this.shirt.availableSizes.length; i < len; i++) {
      const size = this.shirt.availableSizes[i];
      sizes[size] = Math.floor(multiplier * ratios[size]);
      total += sizes[size];
    }

    if (total < this.quantity) {
      for (i = 0; i < this.quantity - total; i++) {
        i % 2 == 0 ? sizes["M"]++ : sizes["L"]++;
      }
    }

    this.quantities = sizes;
  }
}
class Quote {
  constructor(products) {
    this.products = products || [];
  }

  add(product) {
    this.products.push(product);
  }

  remove(product) {
    this.products.splice(this.products.indexOf(product), 1);
  }

  get size() {
    return this.products.length;
  }

  get subtotal() {
    return 100;
  }

  get total() {
    return 110;
  }
}
class Shirt {
  constructor(opts) {
    this.id = opts.id;
    this.name = opts.name;
    this.price = opts.price;
    this.imageUrl = opts.imageUrl;
    this.description = opts.description;
    this.availableSizes = opts.availableSizes;
    this.availableColors = opts.availableColors;
  }
}
let SHIRTS = [
  new Shirt({
    id: 0,
    price: 5,
    tier: "middle",
    name: "Unisex Jersey Short Sleeve",
    imageUrl: "public/assets/3001_06_1.jpg",
    description:
      "This updated unisex essential fits like a well-loved favorite, featuring a crew neck, short sleeves and designed with superior combed and ring-spun cotton that acts as the best blank canvas for printing. Offered in a variety of solid and heather cvc colors.",
    availableSizes: ["XS", "S", "M", "L", "XL"],
    availableColors: [
      {
        name: "Black",
        hex: "#000000"
      },
      {
        name: "Vintage Black",
        hex: "#000000"
      },
      {
        name: "White",
        hex: "#ffffff"
      },
      {
        name: "Aqua",
        hex: "#50B3CF"
      },
      {
        name: "Army",
        hex: "#4D493B"
      },
      {
        name: "Ash",
        hex: "#F3F4F6"
      },
      {
        name: "Asphalt",
        hex: "#5F6062"
      },
      {
        name: "Athletic Heather",
        hex: "#9A9A9B"
      },
      {
        name: "Brown",
        hex: "#5B4F4B"
      },
      {
        name: "Burnt Orange",
        hex: "#D46F34"
      },
      {
        name: "Cardinal",
        hex: "#7D252D"
      },
      {
        name: "Coral",
        hex: "#F85561"
      }
    ]
  }),
  new Shirt({
    id: 1,
    price: 7,
    tier: "top",
    name: "Tri-Blend Crew",
    imageUrl: "public/assets/mn1_000032.jpg",
    description:
      "Top quality tri-blend crew cut. Superior design for a great feel and a perfect fit.",
    availableSizes: ["XS", "S", "M", "L", "XL", "2XL"],
    availableColors: [
      {
        name: "Black",
        hex: "#000000"
      },
      {
        name: "Vintage Black",
        hex: "#000000"
      },
      {
        name: "White",
        hex: "#ffffff"
      },
      {
        name: "Aqua",
        hex: "#50B3CF"
      },
      {
        name: "Army",
        hex: "#4D493B"
      },
      {
        name: "Ash",
        hex: "#F3F4F6"
      },
      {
        name: "Asphalt",
        hex: "#5F6062"
      },
      {
        name: "Athletic Heather",
        hex: "#9A9A9B"
      },
      {
        name: "Brown",
        hex: "#5B4F4B"
      },
      {
        name: "Burnt Orange",
        hex: "#D46F34"
      },
      {
        name: "Cardinal",
        hex: "#7D252D"
      },
      {
        name: "Coral",
        hex: "#F85561"
      }
    ]
  }),
  new Shirt({
    id: 2,
    price: 4,
    tier: "bottom",
    name: "Classic Short Sleeve",
    imageUrl: "public/assets/G2000-095-SM.png",
    description:
      "Classic tee that'll never go out of style. Great shirt at a great price.",
    availableSizes: ["XS", "S", "M", "L", "XL", "2XL"],
    availableColors: [
      {
        name: "Black",
        hex: "#000000"
      },
      {
        name: "Vintage Black",
        hex: "#000000"
      },
      {
        name: "White",
        hex: "#ffffff"
      },
      {
        name: "Aqua",
        hex: "#50B3CF"
      },
      {
        name: "Army",
        hex: "#4D493B"
      },
      {
        name: "Ash",
        hex: "#F3F4F6"
      },
      {
        name: "Asphalt",
        hex: "#5F6062"
      },
      {
        name: "Athletic Heather",
        hex: "#9A9A9B"
      },
      {
        name: "Brown",
        hex: "#5B4F4B"
      },
      {
        name: "Burnt Orange",
        hex: "#D46F34"
      },
      {
        name: "Cardinal",
        hex: "#7D252D"
      },
      {
        name: "Coral",
        hex: "#F85561"
      }
    ]
  })
];
class ColorPicker {
  constructor(opts) {
    this.color = opts.color;
    this.colors = opts.colors;
    this.onchange = opts.onchange;
    this.shirtColors = this.colors.map(color => {
      return new ShirtColor({
        color: color,
        onclick: color => {
          this.onchange(color);
          this.color = color;
        }
      });
    });
  }

  render() {
    return jsml.div(
      {
        className: "color-picker"
      },
      ...this.shirtColors.map(x => x.render())
    );
  }
}
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
class Navbar {
  constructor() {}
  render() {
    return jsml.nav(
      {
        className: "navbar navbar-light bg-light"
      },
      jsml.a({
        className: "navbar-brand",
        href: "#/",
        innerText: "FSG"
      }),
      jsml.ul(
        {
          className: "navbar-nav list-inline"
        },
        jsml.li(
          {
            className: "nav-item list-inline-item"
          },
          jsml.a({
            className: "nav-link",
            href: "#/",
            innerText: "Shirts"
          })
        ),
        jsml.li(
          {
            className: "nav-item list-inline-item"
          },
          jsml.a({
            className: "nav-link",
            href: "#/quote",
            innerText: "Quote"
          })
        )
      )
    );
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
  constructor() {
    this.shirtViews = APP.shirts.map(shirt => {
      return new ShirtView({
        shirt: shirt
      });
    });
  }

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
      shirt: APP.shirts[opts.shirtId],
      quantity: DEFAULT_QUANTITY,
      frontColorCount: 1,
      backColorCount: 1
    });

    this.colorPicker = new ColorPicker({
      color: "black",
      colors: this.shirt.availableColors,
      onchange: color => {
        this.product.color = color;
        console.log(color.name + " clicked.");
      }
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
        this.product.distributeSizes();
        console.log(this.product);
        APP.quote.add(this.product);
        APP.router.load("/quote");
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
        this.colorPicker.render(),
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
class QuantityInputs {
  constructor(opts) {
    this.product = opts.product;

    this.inputs = this.shirt.availableSizes.map((size, i) => {
      return jsml.li(
        {
          className: "list-inline-item"
        },
        jsml.label({
          innerText: size
        }),
        jsml.input({
          className: "form-control",
          value: this.product.quantities[this.shirt.availableSizes[i]]
        })
      );
    });
  }

  get shirt() {
    return this.product.shirt;
  }

  render() {
    return jsml.ul(
      {
        className: "list-inline"
      },
      ...this.inputs
    );
  }
}
class QuoteItem {
  constructor(opts) {
    this.quote = opts.quote;
    this.index = opts.index;
    this.product = opts.product;
    this.onchange = opts.onchange;
    this.ondelete = opts.ondelete;
  }

  render() {
    return jsml.div(
      {
        className: "quote-item media",
        style: "border: 1px solid black"
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
              this.ondelete();
            }
          })
        ),
        new QuantityInputs({
          product: this.product
        }).render()
      )
    );
  }
}
class QuoteItems {
  constructor(opts) {
    this.quote = opts.quote;
    this.onchange = opts.onchange;
    this.ondelete = opts.ondelete;
  }

  render() {
    return jsml.div(
      {
        className: "quote-items"
      },
      ...this.quote.products.map((product, index) => {
        return new QuoteItem({
          quote: this.quote,
          index: index,
          product: product,
          ondelete: () => {
            this.ondelete();
          },
          onchange: () => {
            this.onchange();
          }
        }).render();
      })
    );
  }
}
class QuoteView {
  constructor() {
    this.quote = APP.quote;
  }

  get quoteItems() {
    if (this.quote.size == 0) {
      // TODO: conditional rendering?
      return jsml.p({
        innerText: "This quote has no items yet."
      });
    }
    return new QuoteItems({
      quote: this.quote,
      onchange: () => {
        console.log("something changed");
      },
      ondelete: () => {
        if (this.quote.size == 0) {
          console.log("got here!");
          APP.router.load("/");
        } else {
          let node = document.getElementById("quote-view");
          node.innerHTML = "";
          node.appendChild(this.render());
        }
      }
    }).render();
  }

  render() {
    return jsml.div(
      {
        id: "quote-view"
      },
      this.quoteItems
    );
  }
}
class Root {
  constructor() {
    this.container = jsml.div({
      id: "app",
      className: "container"
    });

    document.body.appendChild(this.render());
  }

  render() {
    return jsml.div({}, new Navbar().render(), this.container);
  }

  mount(component) {
    this.container.innerHTML = "";
    this.container.appendChild(component.render());
  }
}
class ShirtColor {
  constructor(opts) {
    this.color = opts.color;
    this.onclick = opts.onclick;
  }

  render() {
    return jsml.div({
      className: "shirt-color col-sm",
      style: "display: inline; background-color: " + this.color.hex,
      onclick: () => {
        this.onclick(this.color);
      }
    });
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
        jsml.a(
          {
            href: "#/shirts/" + this.shirt.id
            // onclick: () => {
            //   APP.router.load("/shirts/" + this.shirt.id);
            // }
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
      )
    );
  }
}
window.onload = function() {
  new App({
    root: new Root(),
    quote: new Quote(),
    shirts: SHIRTS,
    router: new Router({
      routes: [
        new Route({ href: "/", component: PickAShirt }),
        new Route({ href: "/shirts/:shirtId", component: ProductView }),
        new Route({ href: "/quote", component: QuoteView })
      ]
    })
  });
};
