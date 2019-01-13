class Flash extends Component {
  constructor() {
    super();
    this.p = jsml.p();
  }

  show(type, msg) {
    this.p.innerText = msg;
    this.node.style.display = "block";
    this.node.className = "alert-" + type;
  }

  hide() {
    this.node.style.display = "none";
  }

  render() {
    return super.render(
      jsml.div(
        {
          className: "alert alert-danger",
          style: {
            display: "none"
          }
        },
        jsml.button({
          innerText: "\u2716",
          onclick: () => {
            this.hide();
          }
        }),
        jsml.element({}, this.p)
      )
    );
  }
}
