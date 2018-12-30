class Root {
  constructor() {}
  render() {
    return jsml.div(
      {},
      new Navbar().render(),
      jsml.div({
        id: "app",
        className: "container"
      })
    );
  }
}
