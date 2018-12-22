const DEFAULT_QUANTITY = 50;

function Product(opts) {
  this.shirt = opts.shirt;
  this.quantity = opts.quantity;
  this.frontColorCount = opts.frontColorCount;
  this.backColorCount = opts.backColorCount;
}

function ProductComponent(shirtId) {
  this.product = new Product({
    shirt: shirts[shirtId],
    quantity: DEFAULT_QUANTITY,
    frontColorCount: 1,
    backColorCount: 1
  });

  this.minQuantity = 1;

  Object.defineProperties(this, {
    shirt: {
      get: () => this.product.shirt
    },
    quantity: {
      get: () => this.product.quantity,
      set: v => {
        this.quantityInput.value = v;
        this.product.quantity = v;
        this.updateColorCounts();
        this.amountPerShirtLabel.innerText = this.amountPerShirt.toFixed(2);
      }
    },
    amountPerShirt: {
      get: () => this.calcAmountPerShirt()
    },
    frontColorCount: {
      get: () => this.product.frontColorCount,
      set: v => {
        this.product.frontColorCount = v;
        this.updateColorCounts();
      }
    },
    backColorCount: {
      get: () => this.product.backColorCount,
      set: v => {
        this.product.backColorCount = v;
        this.updateColorCounts();
      }
    }
  });

  this.mount();

  this.amountPerShirtLabel = document.getElementById("amount-per-shirt-label");
  this.quantityInput = document.getElementById("product-quantity-input");
  this.incrementButton = document.getElementById("product-increment-button");
  this.decrementButton = document.getElementById("product-decrement-button");
  this.frontColorCountDropdown = document.getElementById(
    "front-colorcount-dropdown"
  );
  this.backColorCountDropdown = document.getElementById(
    "back-colorcount-dropdown"
  );
  this.addToQuoteButton = document.getElementById("add-to-quote-button");

  this.incrementButton.onclick = function() {
    this.quantity++;
  }.bind(this);

  this.decrementButton.onclick = function() {
    this.quantity--;
  }.bind(this);

  // INIT
  this.quantity = DEFAULT_QUANTITY;
}

ProductComponent.prototype.mount = function() {
  let html = this.render();
  let main = document.createElement("div");
  main.className = "main";
  main.innerHTML = html;
  document.querySelector("body").appendChild(main);
};

ProductComponent.prototype.updateColorCounts = function() {
  this.frontColorCountDropdown.innerHTML = "";
  this.backColorCountDropdown.innerHTML = "";
  var num;
  if (this.quantity < 24) {
    num = 3;
  } else if (this.quantity <= 49) {
    num = 5;
  } else {
    num = 7;
  }
  for (let i = 0; i < num; i++) {
    let option = document.createElement("option");
    option.value = i.toString();
    option.innerText = i.toString();
    this.frontColorCountDropdown.appendChild(option);
    this.backColorCountDropdown.appendChild(option.cloneNode(true));
  }

  this.frontColorCountDropdown.value = this.frontColorCount;
  this.backColorCountDropdown.value = this.backColorCount;
};

ProductComponent.prototype.updateMinQuantity = function() {
  if (this.frontColorCount <= 2 && this.backColorCount <= 2) {
    this.quantityInput.setAttribute("min", 1);
  } else if (this.frontColorCount <= 4 && this.backColorCount <= 4) {
    this.quantityInput.setAttribute("min", 24);
  } else {
    this.quantityInput.setAttribute("min", 50);
  }
};

ProductComponent.prototype.calcAmountPerShirt = function() {
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
};

ProductComponent.prototype.priceTable = function() {
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
};

ProductComponent.prototype.render = function() {
  return `<div class="shirt-description">
  <h2>${this.shirt.name}</h2>
  <p>${this.shirt.description}</p>
</div>
<div class="form-box">
  <div class="form-group mt-3">
    <strong><span id="amount-per-shirt-label"></span>/shirt</strong><br />
  </div>
  <div class="form-group">
    <button id="product-decrement-button">&minus;</button>
    <input id="product-quantity-input" value="50" min="${
      this.minQuantity
    }" max="500">
    <button id="product-increment-button">&plus;</button>
  </div>
  <div class="form-group">
    <select id="front-colorcount-dropdown">
    </select>
  </div>
  <div class="form-group">
    <select id="back-colorcount-dropdown">
    </select>
  </div>
  <div class="form-group">
    <button id="add-to-quote-button" class="btn btn-primary">Add To Quote &rarr;</button>
  </div>
</div>
`;
};

window.onload = event => {
  let shirtId = document.getElementById("shirt-id").value;
  pc = new ProductComponent(shirtId);
};
