class PickAShirt {
  constructor() {
    // TODO: figure out how to pass this while playing nice with router
    this.shirts = shirts;
    this.shirtViews = this.shirts.map(shirt => {
      return new ShirtView({
        shirt: shirt
      });
    });
  }

  render() {
    return jsml.div(
      {
        className: "pick-a-shirt d-flex justify-content-center text-center"
      },
      jsml.div({}, ...this.shirtViews.map(x => x.render()))
    );
  }
}
