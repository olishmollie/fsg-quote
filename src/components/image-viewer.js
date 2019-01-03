class ImageViewer extends Component {
  constructor(opts) {
    super();

    this.product = opts.product;

    this.colorPicker = new ColorPicker({
      color: { name: "black", hex: "#111" },
      colors: this.product.shirt.availableColors,
      onchange: color => {
        this.product.color = color;
        console.log(color.name + " clicked.");
      }
    });

    this.frontImageFileInput = new FileInput({
      file: this.product.frontImage,
      label: "Image Front",
      accept: "image/png, image/jpeg",
      onchange: () => {
        let files = this.frontImageFileInput.files;
        if (files.length > 0) {
          let file = files[0];
          this.imageCanvas.drawImage(file);
          this.product.frontImage = file;
        }
      },
      onclear: () => {
        this.imageCanvas.clearCanvas();
      }
    });

    this.backImageFileInput = new FileInput({
      file: this.product.backImage,
      label: "Image Back",
      accept: "image/png, image/jpeg",
      onchange: () => {
        let files = this.backImageFileInput.files;
        if (files.length > 0) {
          let file = files[0];
          this.imageCanvas.drawImage(file);
          this.product.backImage = file;
        }
      },
      onclear: () => {
        this.imageCanvas.clearCanvas();
      }
    });

    this.imageCanvas = new ImageCanvas({
      height: 500,
      width: 800
    });
  }

  render() {
    return super.render(
      "div",
      {
        className: "form-group mt-5"
      },
      jsml.component(this.frontImageFileInput),
      jsml.component(this.backImageFileInput),
      jsml.component(this.imageCanvas),
      jsml.component(this.colorPicker)
    );
  }
}
