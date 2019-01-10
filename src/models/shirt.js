class Shirt {
  constructor(opts) {
    this.id = opts.id;
    this.name = opts.name;
    this.price = opts.price;
    this.frontImageUrl = opts.frontImageUrl;
    this.backImageUrl = opts.backImageUrl;
    this.description = opts.description;
    this.availableSizes = opts.availableSizes;
    this.availableColors = opts.availableColors;
  }
}
