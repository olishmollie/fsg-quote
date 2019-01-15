class CustomizeView extends Component {
  constructor(props) {
    super(props);
  }

  init() {
    this.isNewProduct = this.props.productId ? false : true;
    this.product = this.isNewProduct
      ? new Product({
          shirt: APP.shirts[this.props.shirtId],
          quantity: 50,
          frontColorCount: 1,
          backColorCount: 1
        })
      : new Product(this.props.quote.products[this.props.productId]);

    this.flash = new Flash();

    this.saveButton = jsml.button({
      onclick: () => {
        this.save();
      }
    });

    this.productDetail = new ProductDetail({
      product: this.product,
      onsave: () => {
        this.save();
      },
      onerror: () => {
        this.handleProductErrors();
      },
      noerrors: () => {
        this.noErrors();
      },
      onShowPricingModal: () => {
        this.pricingModal.show();
      }
    });

    this.imageViewer = new ImageViewer({
      product: this.product,
      width: 500,
      height: 300,
      onload: () => {
        this.noErrors();
      }
    });

    this.pricingModal = new Modal();
  }

  save() {
    // check for image before save
    if (!this.product.hasImage()) {
      this.handleImageError();
      return;
    }

    this.noErrors();

    if (this.newProduct || this.imageViewer.hasBeenEdited) {
      let image = this.imageViewer.getCanvasImage();
      this.product.frontMockup = image;
    }

    if (this.isNewProduct) {
      this.product.distributeSizes();
      this.props.quote.add(this.product);
    }

    this.props.quote.updateProduct(this.product.id, this.product);
    APP.router.load("#/quote");
  }

  handleProductErrors() {
    if (this.product.notEnoughColors()) {
      this.flash.show("danger", "A minimum of 1 color is required.");
    }
    if (this.product.notEnoughQuantity()) {
      this.flash.show(
        "danger",
        "A minimum of " + this.product.minQuantity() + " shirts is required."
      );
    }
    this.saveButton.disabled = true;
  }

  handleImageError() {
    if (!this.product.hasImage() || !this.product.hasMockup()) {
      this.flash.show("danger", "Please upload an image.");
    }
    this.saveButton.disabled = true;
  }

  noErrors() {
    this.saveButton.disabled = false;
    this.flash.hide();
  }

  render() {
    return jsml.div(
      {},
      jsml.h1({
        innerText: this.product.shirt.name
      }),
      jsml.p({
        innerText: this.product.shirt.description
      }),
      jsml.component({}, this.imageViewer),
      jsml.component(
        {
          style: {
            textAlign: "center",
            backgroundColor: "blue",
            color: "white"
          }
        },
        this.pricingModal,
        jsml.component({}, new PricingTable())
      ),
      jsml.div(
        {
          className: "product-detail-box"
        },
        jsml.component({}, this.productDetail),
        jsml.component({}, this.flash),
        jsml.element(
          {
            className: "btn btn-primary"
          },
          this.saveButton,
          jsml.text("Save")
        )
      )
    );
  }
}
