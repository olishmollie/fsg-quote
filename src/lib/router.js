class Router {
  constructor(opts) {
    this.container = opts.container;
    this.routes = opts.routes || [];
    this.location = null;
    this.listen();
  }

  load(href) {
    let route = this.routes.find(route => {
      return route.regex.exec(href);
    });

    if (!route) {
      throw "unregistered route: " + href;
    }

    // update location
    this.location = window.location.hash;

    // load the view
    this.container.innerHTML = "";
    this.container.appendChild(route.resolve(href).node());
  }

  listen() {
    setTimeout(() => {
      if (window.location.hash != this.location) {
        console.log("detected change in window location");
        this.load(window.location.hash);
      }
      this.listen();
    });
  }
}
