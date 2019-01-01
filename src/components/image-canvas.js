class ImageCanvas extends Component {
  constructor(opts) {
    super();
    this.quote = APP.quote;
    this.product = this.quote.products[opts.productId];

    this.frontImageInput = jsml.input({
      type: "file",
      accept: "image/png, image/jpeg",
      onchange: () => {
        let files = this.frontImageInput.files;
        if (files.length > 0) {
          let file = files[0];
          this.drawImage(file);
          this.product.frontImage = file;
        }
      }
    });

    this.backImageInput = jsml.input({
      type: "file",
      accept: "image/png, image/jpeg",
      onchange: () => {
        let files = this.backImageInput.files;
        if (files.length > 0) {
          let file = files[0];
          this.drawImage(file);
          this.product.backImage = file;
        }
      }
    });

    this.canvas = jsml.canvas();

    this.clearButton = jsml.button({
      onclick: () => {
        this.clearCanvas();
        this.product.frontImage = null;
        // TODO: might not work on older browsers
        this.frontImageInput.value = null;
      }
    });
  }

  drawImage(file) {
    let url = window.URL.createObjectURL(file);
    $("canvas")
      .addLayer({
        name: "image",
        type: "image",
        source: url,
        draggable: true,
        x: 100,
        y: 100,
        resizeFromCenter: false
      })
      .drawLayers();

    // avoids weird bug where handles appear in center of image
    setTimeout(() => {
      $("canvas")
        .setLayer("image", {
          handlePlacement: "both",
          handle: {
            type: "rectangle",
            fillStyle: "#fff",
            strokeStyle: "#111",
            strokeWidth: 1,
            width: 10,
            height: 10,
            cornerRadius: 3
          }
        })
        .drawLayers();
    }, 100);
  }

  clearCanvas() {
    $("canvas")
      .removeLayer("image")
      .drawLayers();
  }

  render() {
    return super.render(
      "div",
      {
        className: "text-center",
        style: "margin: 50px"
      },
      jsml.component(this.frontImageInput, {
        className: "form-control"
      }),
      jsml.div(
        {
          className: "canvas"
        },
        jsml.component(this.canvas, {
          className: "mt-2",
          style: "background-color: gray"
        })
      ),
      jsml.component(this.clearButton, {
        className: "btn btn-danger btn-sm",
        innerText: "Clear"
      })
    );
  }
}
