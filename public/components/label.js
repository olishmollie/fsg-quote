class Label {
  constructor(opts) {
    this._text = opts.text;

    this.span = jsml.span({
      innerText: this._text,
      style: opts.style
    });
  }

  get text() {
    return this._text;
  }

  set text(text) {
    this._text = text;
    this.span.innerText = this._text;
  }

  render() {
    return this.span;
  }
}
