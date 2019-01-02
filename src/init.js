window.onload = function() {
  new App({
    root: new Root(),
    localStorage: new Storage(),
    shirts: SHIRTS,
    router: new Router({
      routes: [
        new Route({ href: "/", component: PickAShirt }),
        new Route({ href: "/products/:shirtId", component: CustomizeView }),
        new Route({ href: "/quote", component: QuoteView })
      ]
    })
  });
};
