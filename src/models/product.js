class Product {
  constructor(props) {
    this.shirt = props.shirt;
    this.color = props.color;
    this.quantity = props.quantity;
    this.frontColorCount = props.frontColorCount;
    this.backColorCount = props.backColorCount;
    this.quantities = props.quantities || {};

    this.frontImage = props.frontImage || null;
    this.backImage = props.backImage || null;
    this.frontMockup = props.frontMockup || null;
    this.backMockup = props.backMockup || null;

    // image data cache
    this.prevX = props.prevX || null;
    this.prevY = props.prevY || null;
    this.prevWidth = props.prevWidth || null;
    this.prevHeight = props.prevHeight || null;

    // assigned when added to a quote
    this.id = props.id;
  }

  save() {
    APP.quote.updateProduct(this.id, this);
  }

  hasImage() {
    return !!this.frontImage || !!this.backImage;
  }

  hasMockup() {
    return !!this.frontMockup || !!this.backMockup;
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

  hasErrors() {
    return this.notEnoughColors() || this.notEnoughQuantity();
  }

  notEnoughColors() {
    return this.frontColorCount === 0 && this.backColorCount === 0;
  }

  notEnoughQuantity() {
    return this.quantity < this.minQuantity();
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
    let result = this.shirt.price + firstLocationPrice + secondLocationPrice;
    return isNaN(result) ? 0 : result;
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
