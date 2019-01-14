class NumberInput extends Component {
  constructor(props) {
    super(props);
  }

  init() {
    this.value = this.props.value || 50;
    this._max = this.props.max || 10000;
    this._min = this.props.min || 1;
    this._readOnly = this.props.readOnly || false;
    this.onchange = this.props.onchange;

    this.input = new ControlledInput({
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
    });
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
        jsml.component({}, this.input),
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
