class Flash extends Component {
  constructor(opts = {}) {
    super();

    this.type = opts.type;
    this.p = jsml.p();
  }

  show(msg) {
    this.p.innerText = msg;
    this.node.style.display = "block";
  }

  hide() {
    this.node.style.display = "none";
  }

  render() {
    return super.render(
      "div",
      {
        className: "alert alert-danger",
        style: "display: none"
      },
      jsml.button({
        innerText: "\u2716",
        onclick: () => {
          this.hide();
        }
      }),
      jsml.component(this.p)
    );
  }
}
