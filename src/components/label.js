class Label extends Component {
  constructor(opts) {
    super();
    this._text = opts.text;
    this.textNode = jsml.text(this._text);
  }

  get text() {
    return this._text;
  }

  set text(text) {
    this._text = text;
    this.textNode.nodeValue = text;
  }

  render() {
    return super.render(jsml.span({}, this.textNode));
  }
}
