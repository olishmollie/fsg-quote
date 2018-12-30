(function() {
  let Root = function() {};

  Root.prototype.render = function() {
    return jsml.div(
      {},
      new Navbar().render(),
      jsml.div({
        id: "app",
        className: "container"
      })
    );
  };

  window.Root = Root;
  return Root;
})();
