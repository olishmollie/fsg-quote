window.onload = function() {
  let app = {
    router: new Router({
      quote: new Quote(),
      container: document.getElementById("app"),
      routes: [
        new Route({ href: "/", component: PickAShirt }),
        new Route({ href: "/shirts/:shirtId", component: ProductView }),
        new Route({ href: "/quote", component: QuoteView })
      ]
    })
  };

  window.app = app;

  //load root
  app.router.location = "/";
};
