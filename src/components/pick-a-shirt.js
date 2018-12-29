class PickAShirt {
  constructor() {
    // TODO: figure out how to pass this while playing nice with router
    this.shirts = [
      new Shirt({
        price: 5,
        tier: "middle",
        name: "Unisex Jersey Short Sleeve",
        imageUrl: "assets/3001_06_1.jpg",
        description:
          "This updated unisex essential fits like a well-loved favorite, featuring a crew neck, short sleeves and designed with superior combed and ring-spun cotton that acts as the best blank canvas for printing. Offered in a variety of solid and heather cvc colors.",
        availableSizes: ["XS", "S", "M", "L", "XL", "2XL"]
      }),
      new Shirt({
        price: 7,
        tier: "top",
        name: "Tri-Blend Crew",
        imageUrl: "assets/mn1_000032.jpg",
        description:
          "Top quality tri-blend crew cut. Superior design for a great feel and a perfect fit.",
        availableSizes: ["XS", "S", "M", "L", "XL", "2XL"]
      }),
      new Shirt({
        price: 4,
        tier: "bottom",
        name: "Classic Short Sleeve",
        imageUrl: "assets/G2000-095-SM.png",
        description:
          "Classic tee that'll never go out of style. Great shirt at a great price.",
        availableSizes: ["XS", "S", "M", "L", "XL", "2XL"]
      })
    ];
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
