class ImageViewer extends Component {
  constructor(props) {
    super(props);
  }

  init() {
    this.product = this.props.product;
    this.width = this.props.width;
    this.height = this.props.height;
    this.hasBeenEdited = false;

    this.flash = new Flash();

    this.imageCanvas = new ImageCanvas({
      width: this.width,
      height: this.height,
      onload: file => {
        this.hasBeenEdited = true;
        this.product.frontImage = file;
      },
      oninvalidfile: () => {
        this.flash.show("danger", "Invalid file type.");
      }
    });

    // if product has a mockup, render it, otherwise use the background image
    this.backgroundImage = jsml.img({
      src: this.product.hasMockup()
        ? this.initialMockup()
        : this.product.shirt.frontImageUrl,
      width: this.width,
      height: this.height
    });

    this.editButton = jsml.button(
      {
        onclick: () => {
          this.hasBeenEdited = true;
          this.editCanvas();
        }
      },
      jsml.text("Edit")
    );

    this.clearButton = jsml.button(
      {
        onclick: () => {
          this.clearCanvas();
        }
      },
      jsml.text("Clear")
    );
  }

  initialMockup() {
    if (this.product.frontMockup) {
      return this.product.frontMockup;
    }
    return this.product.backMockup;
  }

  editCanvas() {
    // clear the canvas (w/o nulling the product image);
    this.imageCanvas.clearCanvas();

    // set the backgroundImage to the stock photo
    let newImage = jsml.img({
      width: this.width,
      height: this.height,
      src: this.initialBackground()
    });
    this.node.replaceChild(newImage, this.backgroundImage);
    this.backgroundImage = newImage;

    // get cached x, y, and size
    let x = this.product.prevX;
    let y = this.product.prevY;
    let width = this.product.prevWidth;
    let height = this.product.prevHeight;

    // draw the image onto the canvas
    this.imageCanvas.drawImage(this.initialImage(), x, y, width, height);

    // replace the edit button with the clear button
    this.node.replaceChild(this.clearButton, this.editButton);
  }

  initialBackground() {
    if (this.product.frontMockup) {
      return this.product.shirt.frontImageUrl;
    }
    return this.product.shirt.backImageUrl;
  }

  initialImage() {
    if (this.product.frontMockup) {
      return this.product.frontImage;
    }
    return this.product.backImage;
  }

  clearCanvas() {
    this.imageCanvas.clearCanvas();
    this.product.frontImage = null;
    this.product.frontMockup = null;
    if (this.product.persisted()) {
      this.product.save();
    }
  }

  getCanvasImage() {
    if (this.containsImage()) {
      this.imageCanvas.removeImageHandles();

      // draw the background image onto the canvas
      this.imageCanvas.drawBackground(this.backgroundImage);

      // cache x, y, and size of image
      let imageLayer = $("canvas").getLayer("image");
      this.product.prevX = imageLayer.x;
      this.product.prevY = imageLayer.y;
      this.product.prevWidth = imageLayer.width;
      this.product.prevHeight = imageLayer.height;
      this.product.save();

      return $("canvas").getCanvasImage();
    }
    return null;
  }

  containsImage() {
    return !!$("canvas").getLayer("image");
  }

  render() {
    return super.render(
      jsml.div(
        {},
        jsml.component({}, this.flash),
        jsml.element({}, this.backgroundImage),
        jsml.component({}, this.imageCanvas),
        jsml.cond(
          this.product.hasMockup(),
          jsml.element({}, this.editButton),
          jsml.element({}, this.clearButton)
        )
      )
    );
  }
}
