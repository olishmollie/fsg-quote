class Router {
  constructor(opts) {
    this.container = opts.container;
    this.routes = opts.routes || [];
    // TODO: fix history api
    this.history = [];
    // TODO: listen for changes in window location?
  }

  dispatch(href) {
    let route = this.routes.find(route => {
      return route.regex.exec(href);
    });

    if (!route) {
      throw "unregistered route: " + href;
    }

    // add current url to history
    // this.history.push(this.location);

    // update url in nav bar
    let currentUrl = window.location.href;
    window.location.href = currentUrl.replace(/#.*$/, "") + "#" + href;

    // load the view
    this.container.innerHTML = "";
    this.container.appendChild(route.resolve(href).render());
  }

  // TODO: fix history api
  // back() {
  //   let prevUrl = this.history.pop();
  //   this.dispatch(prevUrl);
  //   return prevUrl;
  // }

  get location() {
    return window.location.href.replace(/#/, "");
  }

  set location(path) {
    this.dispatch(path);
  }
}
