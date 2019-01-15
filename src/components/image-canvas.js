class ImageCanvas extends Component {
  constructor(props) {
    super(props);
  }

  init() {
    this.height = this.props.height;
    this.width = this.props.width;
    this.onload = this.props.onload;
    this.oninvalidfile = this.props.oninvalidfile;

    this.canvas = jsml.canvas({
      width: this.width,
      height: this.height
    });

    this.initCanvas();
  }

  initCanvas() {
    this.canvas.addEventListener(
      "dragover",
      event => {
        event.preventDefault();
      },
      false
    );

    this.canvas.addEventListener(
      "dragenter",
      event => {
        event.preventDefault();
        // turn on dragged over effect
        this.canvas.className += " dragged-over";
      },
      false
    );

    this.canvas.addEventListener(
      "dragleave",
      event => {
        event.preventDefault();
        // turn off dragged over effect
        this.canvas.className = this.className;
      },
      false
    );

    this.canvas.addEventListener(
      "drop",
      dropEvent => {
        event.preventDefault();

        // turn off dragged over effect
        this.canvas.className = this.className;

        // convert file to binary string and draw it on canvas
        if (dropEvent.dataTransfer.files.length > 0) {
          let file = dropEvent.dataTransfer.files[0];
          if (this.isValidFile(file)) {
            let fileReader = new FileReader();
            fileReader.onload = loadEvent => {
              let url = loadEvent.target.result;
              this.drawImage(url, dropEvent.layerX, dropEvent.layerY);
              this.onload(url);
            };
            fileReader.readAsDataURL(file);
          } else {
            this.oninvalidfile();
          }
        }
      },
      false
    );
  }

  isValidFile(file) {
    return ImageCanvas.validFileTypes.includes(file.type);
  }

  drawImage(url, x, y, width = null, height = null) {
    $("canvas").addLayer({
      name: "image",
      type: "image",
      source: url,
      draggable: true,
      x: x,
      y: y,
      width: width,
      height: height,
      resizeFromCenter: false,
      mouseover: function() {
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
      },
      mouseout: function() {
        $("canvas")
          .setLayer("image", {
            handle: null
          })
          .drawLayers();
      }
    });

    $("canvas").drawLayers();
  }

  drawBackground(image) {
    $("canvas")
      .addLayer({
        name: "background",
        type: "image",
        source: image,
        index: 0,
        x: 0,
        y: 0,
        fromCenter: false
      })
      .drawLayers();
  }

  removeImageHandles() {
    $("canvas")
      .setLayer("image", {
        handle: null
      })
      .drawLayers();
  }

  clearCanvas() {
    $("canvas")
      .removeLayer("image")
      .drawLayers();
  }

  render() {
    return this.canvas;
  }
}

ImageCanvas.validFileTypes = ["image/jpeg", "image/png"];
