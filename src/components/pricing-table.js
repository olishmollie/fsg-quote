class PricingTable extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return jsml.table(
      {
        className: "table table-default"
      },
      jsml.tr(
        {},
        jsml.th({}, jsml.text("Design Qty")),
        jsml.th({}, jsml.text("<24")),
        jsml.th({}, jsml.text("24-49")),
        jsml.th({}, jsml.text("50-59")),
        jsml.th({}, jsml.text("100-249")),
        jsml.th({}, jsml.text("250-499"))
      ),
      jsml.tr(
        {},
        jsml.td({}, jsml.text("1 Color")),
        jsml.td({}, jsml.text("$8")),
        jsml.td({}, jsml.text("$3")),
        jsml.td({}, jsml.text("$2.25")),
        jsml.td({}, jsml.text("$2")),
        jsml.td({}, jsml.text("$1.75"))
      ),
      jsml.tr(
        {},
        jsml.td({}, jsml.text("2 Color")),
        jsml.td({}, jsml.text("$11")),
        jsml.td({}, jsml.text("$4")),
        jsml.td({}, jsml.text("$3.25")),
        jsml.td({}, jsml.text("$3")),
        jsml.td({}, jsml.text("$2.85"))
      ),
      jsml.tr(
        {},
        jsml.td({}, jsml.text("3 Color")),
        jsml.td({}, jsml.text("X")),
        jsml.td({}, jsml.text("$6")),
        jsml.td({}, jsml.text("$5.25")),
        jsml.td({}, jsml.text("$5")),
        jsml.td({}, jsml.text("$4.85"))
      ),
      jsml.tr(
        {},
        jsml.td({}, jsml.text("4 Color")),
        jsml.td({}, jsml.text("X")),
        jsml.td({}, jsml.text("$6")),
        jsml.td({}, jsml.text("$5.25")),
        jsml.td({}, jsml.text("$5")),
        jsml.td({}, jsml.text("$4.85"))
      ),
      jsml.tr(
        {},
        jsml.td({}, jsml.text("5 Color")),
        jsml.td({}, jsml.text("X")),
        jsml.td({}, jsml.text("X")),
        jsml.td({}, jsml.text("$6.15")),
        jsml.td({}, jsml.text("$6")),
        jsml.td({}, jsml.text("$5.60"))
      ),
      jsml.tr(
        {},
        jsml.td({}, jsml.text("6 Color")),
        jsml.td({}, jsml.text("X")),
        jsml.td({}, jsml.text("X")),
        jsml.td({}, jsml.text("$7.15")),
        jsml.td({}, jsml.text("$7")),
        jsml.td({}, jsml.text("$6.75"))
      )
    );
  }
}
