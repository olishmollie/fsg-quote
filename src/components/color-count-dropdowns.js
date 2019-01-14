class ColorCountDropdowns extends Component {
  constructor(props) {
    super(props);
  }

  init() {
    this.product = this.props.product;
    this.onchange = this.props.onchange;

    this.frontColorCountLabel = new Label({
      text: this.colorLabel("front")
    });

    this.frontColorCountDropdown = new Dropdown({
      selections: this.dropdownSelections(),
      selected: this.product.frontColorCount,
      onchange: selection => {
        this.handleFrontSelection(selection);
      }
    });

    this.backColorCountLabel = new Label({
      text: this.colorLabel("back")
    });

    this.backColorCountDropdown = new Dropdown({
      selections: this.dropdownSelections(),
      selected: this.product.backColorCount,
      onchange: selection => {
        this.handleBackSelection(selection);
      }
    });
  }

  handleFrontSelection(selection) {
    this.product.frontColorCount = parseInt(selection);
    this.frontColorCountLabel.text = this.colorLabel("front");
    this.onchange();
  }

  handleBackSelection(selection) {
    this.product.backColorCount = parseInt(selection);
    this.backColorCountLabel.text = this.colorLabel("back");
    this.onchange();
  }

  updateSelections() {
    this.backColorCountDropdown.selections = this.dropdownSelections();
    this.frontColorCountDropdown.selections = this.dropdownSelections();
  }

  dropdownSelections() {
    var count;
    if (this.product.quantity < 24) {
      count = 3;
    } else if (this.product.quantity <= 49) {
      count = 5;
    } else {
      count = 7;
    }
    return new Array(count).fill(0).map((_, i) => i.toString());
  }

  colorLabel(side) {
    if (side != "front" && side != "back") {
      throw "invalid side for color label";
    }
    let count =
      side === "front"
        ? this.product.frontColorCount
        : this.product.backColorCount;
    return side + (count === 1 ? " color" : " colors");
  }

  render() {
    return super.render(
      jsml.div(
        {},
        jsml.component({}, this.frontColorCountDropdown),
        jsml.component({}, this.frontColorCountLabel),
        jsml.component({}, this.backColorCountDropdown),
        jsml.component({}, this.backColorCountLabel)
      )
    );
  }
}
