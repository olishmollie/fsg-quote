class ControlledInput extends Component {
  constructor(opts) {
    super();
    this._value = opts.value;
    this._readOnly = opts.readOnly;
    this.type = opts.type;
    this.autofocus = opts.autofocus;
    this.onchange = opts.onchange;
    this.onblur = opts.onblur;

    this.input = jsml.input();
  }

  get value() {
    return this._value;
  }

  set value(value) {
    this._value = value;
    this.input.value = this._value;
  }

  get readOnly() {
    return this._readOnly;
  }

  set readOnly(ro) {
    this._readOnly = ro;
    this.input.readOnly = this._readOnly;
  }

  handleInput(value) {
    if (value) {
      this.value = value;
      this.node.value = value;
    }
  }

  render() {
    return super.render(
      jsml.element(
        {
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
        },
        this.input
      )
    );
  }
}
