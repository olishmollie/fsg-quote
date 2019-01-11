class CustomizeView extends Component {
  constructor(opts) {
    super();
    this.quote = APP.quote;

    this.product = opts.productId
      ? new Product(this.quote.products[opts.productId])
      : new Product({
          shirt: APP.shirts[opts.shirtId],
          quantity: 50,
          frontColorCount: 1,
          backColorCount: 1
        });

    this.productDetail = new ProductDetail({
      product: this.product,
      onsave: () => {
        this.save();
      }
    });

    this.imageViewer = new ImageViewer({
      product: this.product,
      width: 500,
      height: 300
    });
  }

  save() {
    if (this.imageViewer.hasBeenEdited) {
      let image = this.imageViewer.getCanvasImage();
      this.product.frontMockup = image;
    }

    if (!this.product.persisted()) {
      this.product.distributeSizes();
      this.quote.add(this.product);
    }
    this.quote.updateProduct(this.product.id, this.product);
    APP.router.load("#/quote");
  }

  render() {
    return super.render(
      jsml.div(
        {
          className: "text-center"
        },
        jsml.h1({
          innerText: this.product.shirt.name
        }),
        jsml.p({
          innerText: this.product.shirt.description
        }),
        jsml.component(this.imageViewer),
        jsml.component(this.productDetail)
      )
    );
  }
}
