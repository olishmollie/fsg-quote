class Slidedown extends Component {
  constructor(opts) {
    super();
    this.div = jsml.div({});
    this.down = false;
  }

  slideDown() {
    this.div.style.maxHeight = "1000px";
    this.div.style.opacity = "1";
    this.down = true;
  }

  slideUp() {
    this.down = false;
  }

  render() {
    return super.render(jsml.element(this.div));
  }
}
