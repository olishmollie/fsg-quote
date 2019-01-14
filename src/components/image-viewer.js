class ImageViewer extends Component {
  constructor(props) {
    super(props);
  }

  init() {
    this.hasBeenEdited = false;

    this.flash = new Flash();

    this.imageCanvas = new ImageCanvas({
      width: this.props.width,
      height: this.props.height,
      onload: file => {
        this.hasBeenEdited = true;
        this.props.product.frontImage = file;
        this.props.product.save();
        this.props.onload();
      },
      oninvalidfile: () => {
        this.flash.show("danger", "Invalid file type.");
      }
    });

    // if product has a mockup, render it, otherwise use the background image
    this.backgroundImage = jsml.img({
      src: this.props.product.hasMockup()
        ? this.initialMockup()
        : this.props.product.shirt.frontImageUrl,
      width: this.props.width,
      height: this.props.height
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
    if (this.props.product.frontMockup) {
      return this.props.product.frontMockup;
    }
    return this.props.product.backMockup;
  }

  editCanvas() {
    // clear the canvas (w/o nulling the product image);
    this.imageCanvas.clearCanvas();

    // set the backgroundImage to the stock photo
    let newImage = jsml.img({
      width: this.props.width,
      height: this.props.height,
      src: this.initialBackground()
    });
    this.node.replaceChild(newImage, this.backgroundImage);
    this.backgroundImage = newImage;

    // get cached x, y, and size
    let x = this.props.product.prevX;
    let y = this.props.product.prevY;
    let width = this.props.product.prevWidth;
    let height = this.props.product.prevHeight;

    // draw the image onto the canvas
    this.imageCanvas.drawImage(this.initialImage(), x, y, width, height);

    // replace the edit button with the clear button
    this.node.replaceChild(this.clearButton, this.editButton);
  }

  initialBackground() {
    if (this.props.product.frontMockup) {
      return this.props.product.shirt.frontImageUrl;
    }
    return this.props.product.shirt.backImageUrl;
  }

  initialImage() {
    if (this.props.product.frontMockup) {
      return this.props.product.frontImage;
    }
    return this.props.product.backImage;
  }

  clearCanvas() {
    this.imageCanvas.clearCanvas();
    this.props.product.frontImage = null;
    this.props.product.frontMockup = null;
    if (this.props.product.persisted()) {
      this.props.product.save();
    }
  }

  getCanvasImage() {
    if (this.containsImage()) {
      this.imageCanvas.removeImageHandles();

      // draw the background image onto the canvas
      this.imageCanvas.drawBackground(this.backgroundImage);

      // cache x, y, and size of image
      let imageLayer = $("canvas").getLayer("image");
      this.props.product.prevX = imageLayer.x;
      this.props.product.prevY = imageLayer.y;
      this.props.product.prevWidth = imageLayer.width;
      this.props.product.prevHeight = imageLayer.height;
      this.props.product.save();

      return $("canvas").getCanvasImage();
    }
    return null;
  }

  containsImage() {
    return !!$("canvas").getLayer("image");
  }

  render() {
    return jsml.div(
      {},
      jsml.component({}, this.flash),
      jsml.element({}, this.backgroundImage),
      jsml.component({}, this.imageCanvas),
      jsml.cond(
        this.props.product.hasMockup(),
        jsml.element({}, this.editButton),
        jsml.element({}, this.clearButton)
      )
    );
  }
}
