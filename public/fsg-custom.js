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
    this.shirtViews = app.shirts.map(shirt => {
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
class ProductDetailView {
  constructor(opts) {
    this.id = opts.id;
    this.product = opts.product;
    this.onchange = opts.onchange;

    this.quantityInputView = new QuantityInputView({
      product: this.product
    });
  }

  render() {
    return jsml.div(
      {
        className: "product-detail media",
        style: "border: 1px solid black"
      },
      jsml.div(
        {
          className: "media-body"
        },
        jsml.h5(
          {
            className: "product-detail-title"
          },
          jsml.strong({
            className: "product-detail-number mr-2",
            innerText: this.id + 1 + "."
          }),
          jsml.text(this.product.shirt.name),
          jsml.button({
            className: "trash-button float-right btn btn-danger",
            innerText: "TRASH",
            onclick: () => {
              // DEBT: implicit dependency on app
              app.quote.remove(this.product);
              this.onchange();
            }
          })
        ),
        this.quantityInputView.render()
      )
    );
  }
}
const DEFAULT_QUANTITY = 50;

class ProductView {
  constructor(opts) {
    this.product = new Product({
      shirt: app.shirts[opts.shirtId],
      quantity: DEFAULT_QUANTITY,
      frontColorCount: 1,
      backColorCount: 1
    });

    this.colorPicker = new ColorPicker({
      color: "black",
      colors: ["black", "white", "red", "green", "blue"],
      onchange: color => {
        this.product.color = color;
        console.log(color + " clicked.");
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
        app.quote.add(this.product);
        app.router.location = "/quote";
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
class QuantityInputView {
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
class QuoteView {
  constructor() {
    // TODO: figure out how to pass this while playing nice with router
    this.quote = app.quote;
  }

  get products() {
    return this.quote.products;
  }

  get productDetailViews() {
    return this.products.map((product, i) => {
      return new ProductDetailView({
        id: i,
        product: product,
        onchange: () => {
          if (this.quote.size == 0) {
            app.router.location = app.root;
          } else {
            // HACK: fix this shite
            app.router.location = "/quote";
          }
        }
      });
    });
  }

  render() {
    return jsml.div(
      {
        className: "quote-view"
      },
      ...this.productDetailViews.map(x => x.render())
    );
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
      style: "display: inline; background-color: " + this.color,
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
            href: "#/shirts/" + this.shirt.id,
            onclick: () => {
              window.app.router.location = "/shirts/" + this.shirt.id;
            }
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
    a: (attributes, ...children) => {
      return makeElement("a", attributes, ...children);
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
  }
}
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
    this.container = opts.container;
    this.routes = opts.routes || [];
    // TODO: fix history api
    this.history = [];
    // TODO: listen for changes in window location?
  }

  dispatch(href) {
    let route = this.routes.find(route => {
      return route.regex.exec(href);
    });

    if (!route) {
      throw "unregistered route: " + href;
    }

    // add current url to history
    // this.history.push(this.location);

    // update url in nav bar
    let currentUrl = window.location.href;
    window.location.href = currentUrl.replace(/#.*$/, "") + "#" + href;

    // load the view
    this.container.innerHTML = "";
    this.container.appendChild(route.resolve(href).render());
  }

  // TODO: fix history api
  // back() {
  //   let prevUrl = this.history.pop();
  //   this.dispatch(prevUrl);
  //   return prevUrl;
  // }

  get location() {
    return window.location.href.replace(/#/, "");
  }

  set location(path) {
    this.dispatch(path);
  }
}
window.onload = function() {
  let shirts = [
    new Shirt({
      id: 0,
      price: 5,
      tier: "middle",
      name: "Unisex Jersey Short Sleeve",
      imageUrl: "public/assets/3001_06_1.jpg",
      description:
        "This updated unisex essential fits like a well-loved favorite, featuring a crew neck, short sleeves and designed with superior combed and ring-spun cotton that acts as the best blank canvas for printing. Offered in a variety of solid and heather cvc colors.",
      availableSizes: ["XS", "S", "M", "L", "XL"]
    }),
    new Shirt({
      id: 1,
      price: 7,
      tier: "top",
      name: "Tri-Blend Crew",
      imageUrl: "public/assets/mn1_000032.jpg",
      description:
        "Top quality tri-blend crew cut. Superior design for a great feel and a perfect fit.",
      availableSizes: ["XS", "S", "M", "L", "XL", "2XL"]
    }),
    new Shirt({
      id: 2,
      price: 4,
      tier: "bottom",
      name: "Classic Short Sleeve",
      imageUrl: "public/assets/G2000-095-SM.png",
      description:
        "Classic tee that'll never go out of style. Great shirt at a great price.",
      availableSizes: ["XS", "S", "M", "L", "XL", "2XL"]
    })
  ];

  let app = (function() {
    let container = document.getElementById("app");
    return {
      root: "/",
      container: container,
      quote: new Quote(),
      shirts: shirts,
      router: new Router({
        container: container,
        routes: [
          new Route({ href: "/", component: PickAShirt }),
          new Route({ href: "/shirts/:shirtId", component: ProductView }),
          new Route({ href: "/quote", component: QuoteView })
        ]
      })
    };
  })();

  window.app = app;

  //load root
  app.router.location = "/";
};
