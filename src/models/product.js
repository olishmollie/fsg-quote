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
