class ImageCanvas extends Component {
  constructor(opts) {
    super();
    this.height = opts.height;
    this.width = opts.width;
    this.canvas = jsml.canvas({
      style: "height: auto; width: 100%",
      height: this.height,
      width: this.width
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
        style: "margin: 50px"
      },
      jsml.component(this.canvas, {
        style: "height: auto; width: 100%; background-color: gray"
      })
    );
  }
}
