window.onload = function() {
  let routes = [
    new Route({ href: "/", component: PickAShirt }),
    new Route({ href: "/shirts/:shirtId", component: ProductView }),
    new Route({ href: "/quote", component: QuoteView })
  ];

  let app = document.getElementById("app");
  var router = new Router(app, { routes });

  window.router = router;
};
