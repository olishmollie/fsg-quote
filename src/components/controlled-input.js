class ControlledInput extends Component {
  constructor(opts) {
    super();
    this.value = opts.value;
    this.type = opts.type;
    this.readOnly = opts.readOnly;
    this.autofocus = opts.autofocus;
    this.onchange = opts.onchange;
    this.onblur = opts.onblur;
  }

  handleInput(value) {
    if (value) {
      this.value = value;
      this.node.value = value;
    }
  }

  render() {
    return super.render(
      jsml.input({
        type: this.type,
        value: this.value,
        readOnly: this.readOnly,
        autofocus: this.autofocus,
        onchange: event => {
          let value = event.target.value;
          this.handleInput(value);
        },
        onkeyup: event => {
          let value = event.target.value;
          this.handleInput(value);
          this.onchange(value);
        },
        onblur: () => {
          this.handleInput(this.value);
          this.onblur();
        }
      })
    );
  }
}
