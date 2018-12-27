class Product {
  constructor(opts) {
    this.shirt = opts.shirt;
    this.quantity = opts.quantity;
    this.frontColorCount = opts.frontColorCount;
    this.backColorCount = opts.backColorCount;
    this.quantities = new Array(this.shirt.availableSizes.length).fill(0);
  }

  distributeSizes() {
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

    return sizes;
  }
}
