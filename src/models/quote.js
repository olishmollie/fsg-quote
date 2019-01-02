class Quote {
  constructor(opts = {}) {
    this._products = opts._products || [];
    this.size = this._products.length;
  }

  get products() {
    return this._products.map(productParams => {
      return new Product(productParams);
    });
  }

  estimatedCost() {
    let cost = 0;
    for (let i = 0; i < this.size; i++) {
      cost += this.products[i].costPerShirt() * this.products[i].quantity;
    }
    return cost;
  }

  add(product) {
    product.id = this.size++;
    this._products.push(product);
  }

  remove(product) {
    this._products.splice(product.id, 1);
    this.size--;
  }

  save() {
    APP.localStorage.setItem("quote", this);
  }

  updateProduct(productId, product) {
    this._products[productId] = product;
    this.save();
  }
}
