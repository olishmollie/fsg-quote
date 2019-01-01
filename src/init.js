window.onload = function() {
  new App({
    root: new Root(),
    localStorage: new Storage(),
    shirts: SHIRTS,
    router: new Router({
      routes: [
        new Route({ href: "/", component: PickAShirt }),
        new Route({ href: "/shirts/:shirtId", component: ProductView }),
        new Route({
          href: "/products/:productId/canvas",
          component: ImageCanvas
        }),
        new Route({ href: "/quote", component: QuoteView })
      ]
    })
  });
};
