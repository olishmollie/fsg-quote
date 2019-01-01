class NumberInput extends Component {
  constructor(opts) {
    super();
    this._value = opts.value || 50;
    this._max = opts.max || 500;
    this._min = opts.min || 1;
    this.onchange = opts.onchange;

    this.incrementButton = jsml.button({
      onclick: () => {
        this.value++;
      }
    });

    this.decrementButton = jsml.button({
      onclick: () => {
        this.value--;
      }
    });

    this.input = jsml.input({
      className: "form-control form-control-sm text-center",
      type: "number",
      value: this.value,
      min: this.min,
      max: this.max,
      onchange: event => {
        let el = event.target;
        this.value = el.value;
      }
    });
  }

  get value() {
    return this._value;
  }

  set value(v) {
    if (v >= this.min && v <= this.max) {
      this._value = v;
    }
    this.input.value = this._value;
    this.onchange(this._value);
  }

  get min() {
    return this._min;
  }

  set min(min) {
    this._min = min;
    this.input.min = this._min;
    if (this.value < this.min) {
      this.value = this.min;
    }
  }

  get max() {
    return this._max;
  }

  set max(max) {
    this._max = max;
    this.input.max = this._max;
    if (this.value > this.max) {
      this.value = this.max;
    }
  }

  render() {
    return super.render(
      "div",
      { className: "input-group" },
      jsml.div({ className: "input-group-prepend" }),
      jsml.component(this.decrementButton, {
        className: "btn btn-sm btn-outline-primary",
        innerText: "\u2212"
      }),
      this.input,
      jsml.div(
        {
          className: "input-group-append"
        },
        jsml.component(this.incrementButton, {
          className: "btn btn-sm btn-outline-primary",
          innerText: "\u002B"
        })
      )
    );
  }
}
