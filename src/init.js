window.onload = function() {
  new App({
    root: new Root(),
    quote: new Quote(),
    shirts: SHIRTS,
    router: new Router({
      routes: [
        new Route({ href: "/", component: PickAShirt }),
        new Route({ href: "/shirts/:shirtId", component: ProductView }),
        new Route({ href: "/quote", component: QuoteView })
      ]
    })
  });
};
