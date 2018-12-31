class PickAShirt {
  constructor() {
    this.shirtViews = APP.shirts.map(shirt => {
      return new ShirtView({
        shirt: shirt
      });
    });
  }

  node() {
    return jsml.div(
      {
        className: "pick-a-shirt d-flex justify-content-center text-center"
      },
      jsml.div({}, ...this.shirtViews.map(x => x.node()))
    );
  }
}
