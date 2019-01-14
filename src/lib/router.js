class Router {
  constructor(props) {
    this.routes = props.routes || [];
    this.container = props.container;
    this.location = null;
    this.listen();
  }

  load(path) {
    let route = this.findRoute(path);
    if (!route) {
      // load base route if not found
      console.log("unknown route: " + path);
      this.load("/");
      return;
    }

    this.location = path;
    // update url in the browser window
    window.location.hash = path;

    let params = this.parseParams(route, path);
    let component = route.component;

    try {
      Component.mount(new component(params), this.container);
    } catch (err) {
      // TODO: flash user a message?
      console.error(err);
      this.load("/");
    }
  }

  findRoute(path) {
    return this.routes.find(route => {
      return route.regex.exec(path);
    });
  }

  parseParams(route, path) {
    let params = Object.assign({}, route.params);
    this.parseColons(route, path, params);
    this.parseQuery(path, params);
    return params;
  }

  parseColons(route, path, params) {
    let match = path.match(route.regex);
    if (match) {
      match = match.slice(1); // get rid of matched string
      for (let i = 0; i < route.variables.length; i++) {
        params[route.variables[i]] = match[i];
      }
    } else {
      throw "Could not resolve route: " + path;
    }
  }

  parseQuery(path, params) {
    let query = path.split("?")[1];
    if (query && query.length > 0) {
      let queryParams = query.split("&");
      for (let i = 0; i < queryParams.length; i++) {
        let param = queryParams[i].split("=");
        for (let j = 0; j < param.length; j += 2) {
          params[param[j]] = param[j + 1];
        }
      }
    }
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
