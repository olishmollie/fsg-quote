class NumberInput extends Component {
  constructor(props) {
    super(props);
  }

  init() {
    this._max = this.props.max;
    this._min = this.props.min;
    this._readOnly = this.props.readOnly || false;
    this.onchange = this.props.onchange;

    this.input = new ControlledInput({
      type: "number",
      value: this.props.value,
      min: this.min,
      max: this.max,
      readOnly: this.readOnly,
      onchange: value => {
        this.handleInput(value);
      },
      onblur: () => {
        this.input.value = this.props.value;
      }
    });
  }

  get min() {
    return this._min;
  }

  set min(min) {
    this._min = min;
    if (this.props.value <= min) {
      this.props.value = min;
      this.handleInput(this.props.value);
    }
  }

  get max() {
    return this._max;
  }

  set max(max) {
    this._max = max;
    if (this.props.value >= max) {
      this.props.value = max;
      this.handleInput(this.props.value);
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
      this.props.value = value;
      this.input.value = value;
      this.onchange(this.props.value);
    }
  }

  render() {
    return jsml.div(
      {},
      jsml.button(
        {
          onclick: () => {
            let value = this.props.value - 1;
            this.handleInput(value);
          }
        },
        jsml.text("\u2212")
      ),
      jsml.component({}, this.input),
      jsml.button(
        {
          onclick: () => {
            let value = this.props.value + 1;
            this.handleInput(value);
          }
        },
        jsml.text("\u002B")
      )
    );
  }
}
