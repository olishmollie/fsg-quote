class Router {
  constructor(opts) {
    this.routes = opts.routes || [];
    this.location = null;
    this.listen();
  }

  load(hash) {
    let route = this.routes.find(route => {
      return route.regex.exec(hash);
    });

    // load base route if not found
    if (!route) {
      this.load("/");
      return;
    }

    // update location
    this.location = hash;

    //replace url in browser
    window.location.hash = hash;

    // load the view
    let component = route.resolve(hash);
    APP.root.mount(component);
  }

  listen() {
    setTimeout(() => {
      if (window.location.hash != this.location) {
        this.load(window.location.hash);
      }
      this.listen();
    });
  }
}
