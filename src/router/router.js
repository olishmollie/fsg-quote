class Router {
  constructor(app, opts = {}) {
    this.app = app;
    this.routes = opts.routes || [];
    this.history = [];
  }

  dispatch(href) {
    let route = this.routes.find(route => {
      return route.regex.exec(href);
    });

    if (!route) {
      throw "unregistered route: " + href;
    }

    // add current url to history
    this.history.push(this.location);

    // update url in nav bar
    let currentUrl = window.location.href;
    window.location.href = currentUrl.replace(/#.*$/, "") + "#" + href;

    // load the view
    this.app.innerHTML = "";
    this.app.appendChild(route.resolve(href).render());
  }

  back() {
    let prevUrl = this.history.pop();
    this.dispatch(prevUrl);
  }

  get location() {
    return window.location.pathname.replace(/#/, "");
  }

  set location(path) {
    this.dispatch(path);
  }
}
