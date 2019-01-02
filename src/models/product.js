class Product {
  constructor(opts) {
    this.shirt = opts.shirt;
    this.color = opts.color;
    this.quantity = opts.quantity;
    this.frontColorCount = opts.frontColorCount;
    this.backColorCount = opts.backColorCount;
    this.quantities = opts.quantities || {};

    this.frontImage = opts.frontImage || null;
    this.backImage = opts.backImage || null;

    // assigned when added to a quote
    this.id = opts.id;
  }

  persisted() {
    return this.id != null && this.id != undefined;
  }

  quantityFromSizes() {
    let quantity = 0;
    for (let key in this.quantities) {
      quantity += parseInt(this.quantities[key]);
    }
    return quantity;
  }

  costPerShirt() {
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
