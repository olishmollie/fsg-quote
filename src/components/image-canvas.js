class ImageCanvas extends Component {
  constructor(opts) {
    super();
    this.quote = APP.quote;
    this.product = opts.product;

    this.backgroundImage = opts.backgroundImage;

    this.fileInput = jsml.input({
      type: "file",
      accept: "image/png, image/jpeg",
      onchange: () => {
        let files = this.fileInput.files;
        if (files.length > 0) {
          let file = files[0];
          this.drawImage(file);
          this.product.frontImage = file;
        }
      }
    });

    this.canvas = jsml.canvas();

    this.clearButton = jsml.button({
      onclick: () => {
        this.clearCanvas();
        this.product.frontImage = null;
        // TODO: might not work on older browsers
        this.fileInput.value = null;
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
      jsml.component(this.fileInput, {
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
