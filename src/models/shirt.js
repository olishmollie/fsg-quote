class Shirt {
  constructor(opts = {}) {
    this.id = opts.id;
    this.name = opts.name;
    this.price = opts.price;
    this.imageUrl = opts.imageUrl;
    this.description = opts.description;
    this.availableSizes = opts.availableSizes;
    this.availableColors = opts.availableColors;
  }
}
