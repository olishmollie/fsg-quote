class Quote {
  constructor(opts = {}) {
    this.products = opts.products || [];
    this.size = this.products.length;
  }

  add(product) {
    product.id = this.size++;
    this.products.push(product);
  }

  remove(product) {
    this.products.splice(this.products.indexOf(product), 1);
    this.size--;
  }

  save() {
    APP.localStorage.setItem("quote", this);
  }

  updateProduct(productId, product) {
    this.products[productId] = product;
    this.save();
  }
}
