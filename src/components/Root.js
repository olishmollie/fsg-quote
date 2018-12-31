class Root {
  constructor() {}
  node() {
    return jsml.div(
      {},
      new Navbar().node(),
      jsml.div({
        id: "app",
        className: "container"
      })
    );
  }
}
