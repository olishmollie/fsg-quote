class FileInput extends Component {
  constructor(opts) {
    super();
    this.label = opts.label;
    this.accept = opts.accept;

    this.onchange = opts.onchange;
    this.onclear = opts.onclear;

    this.input = jsml.input({
      type: "file",
      accept: this.accept,
      // TODO: might not work on older browsers
      onchange: this.onchange
    });

    this.clearButton = jsml.button({
      innerText: "clear",
      onclick: () => {
        this.clear();
        this.onclear();
      }
    });
  }

  get files() {
    return this.input.files;
  }

  clear() {
    // TODO: may not work on older browsers
    this.input.value = null;
  }

  render() {
    return super.render(
      "div",
      {},
      jsml.label({
        innerText: this.label
      }),
      jsml.component(this.input, {
        className: "form-control"
      }),
      jsml.component(this.clearButton, {
        className: "btn btn-sm btn-danger"
      })
    );
  }
}
