class NumberInput extends Component {
  constructor(opts) {
    super();
    this.value = opts.value || 50;
    this._max = opts.max || 10000;
    this._min = opts.min || 1;
    this._readOnly = opts.readOnly || false;
    this.onchange = opts.onchange;

    this.input = jsml.component(
      new ControlledInput({
        type: "number",
        value: this.value,
        min: this.min,
        max: this.max,
        readOnly: this.readOnly,
        onchange: value => {
          this.handleInput(value);
        },
        onblur: () => {
          this.input.value = this.value;
        }
      })
    );
  }

  get min() {
    return this._min;
  }

  set min(min) {
    this._min = min;
    if (this.value <= min) {
      this.value = min;
      this.handleInput(this.value);
    }
  }

  get max() {
    return this._max;
  }

  set max(max) {
    this._max = max;
    if (this.value >= max) {
      this.value = max;
      this.handleInput(this.value);
    }
  }

  get readOnly() {
    return this._readOnly;
  }

  set readOnly(ro) {
    this._readOnly = ro;
    this.input.readOnly = this._readOnly;
  }

  handleInput(value) {
    value = parseInt(value);
    if (!isNaN(value)) {
      this.value = value;
      this.input.value = value;
      this.onchange(this.value);
    }
  }

  render() {
    return super.render(
      jsml.div(
        {},
        jsml.button(
          {
            onclick: () => {
              let value = this.value - 1;
              this.handleInput(value);
            }
          },
          jsml.text("\u2212")
        ),
        jsml.element(this.input),
        jsml.button(
          {
            onclick: () => {
              let value = this.value + 1;
              this.handleInput(value);
            }
          },
          jsml.text("\u002B")
        )
      )
    );
  }
}
