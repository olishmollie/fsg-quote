class ControlledInput extends Component {
  constructor(opts) {
    super();
    this._value = opts.value;
    this._readOnly = opts.readOnly;
    this._min = opts.min;
    this._max = opts.max;

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

  get min() {
    return this._min;
  }

  set min(min) {
    this._min = min;
    this.input.min = this._min;
  }

  get max() {
    return this._max;
  }

  set max(max) {
    this._max = max;
    this.input.max = this._max;
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
          min: this.min,
          max: this.max,
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
