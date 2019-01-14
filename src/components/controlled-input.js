class ControlledInput extends Component {
  constructor(props) {
    super(props);
  }

  init() {
    this._value = this.props.value;
    this._readOnly = this.props.readOnly;
    this._min = this.props.min;
    this._max = this.props.max;

    this.type = this.props.type;
    this.autofocus = this.props.autofocus;
    this.onchange = this.props.onchange;
    this.onblur = this.props.onblur;

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
