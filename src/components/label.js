class Label extends Component {
  constructor(props) {
    super(props);
  }

  init() {
    this._text = this.props.text;
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
    return jsml.span({}, this.textNode);
  }
}
