class Quote {
  constructor(opts = {}) {
    this.products = opts.products || [];
  }

  add(product) {
    product.id = this.size;
    this.products.push(product);
    APP.localStorage.setItem("quote", this);
  }

  remove(product) {
    this.products.splice(this.products.indexOf(product), 1);
    APP.localStorage.setItem("quote", this);
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
