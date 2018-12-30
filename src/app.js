window.onload = function() {
  // mount root component
  document.getElementsByTagName("body")[0].appendChild(new Root().render());

  let APP = {
    root: "/",
    quote: new Quote(),
    shirts: SHIRTS,
    router: new Router({
      container: document.getElementById("app"),
      routes: [
        new Route({ href: "/", component: "PickAShirt" }),
        new Route({ href: "/shirts/:shirtId", component: "ProductView" }),
        new Route({ href: "/quote", component: "QuoteView" })
      ]
    })
  };

  // make app a global variable
  window.APP = APP;

  //load root page
  APP.router.load("/");
};
