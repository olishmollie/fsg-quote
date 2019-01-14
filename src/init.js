window.onload = function() {
  let APP = new App({
    root: new Root(),
    localStorage: new Storage(),
    shirts: SHIRTS
  });

  let router = new Router({
    container: APP.root.container,
    routes: [
      new Route({
        href: "/",
        component: PickAShirt,
        params: {
          shirts: APP.shirts
        }
      }),
      new Route({
        href: "/products/:shirtId",
        component: CustomizeView,
        params: { quote: APP.quote }
      }),
      new Route({
        href: "/quote",
        component: QuoteView,
        params: { quote: APP.quote }
      })
    ]
  });

  APP.router = router;

  // make APP a global
  window.APP = APP;

  // start the app
  APP.start();
};
