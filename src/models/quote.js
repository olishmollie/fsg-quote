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

  get subtotal() {
    return 100;
  }

  get total() {
    return 110;
  }
}
