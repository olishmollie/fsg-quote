class Dropdown extends Component {
  constructor(opts) {
    super();
    this._selections = opts.selections;
    this._selected = opts.selected;
    this.onchange = opts.onchange;

    this.select = jsml.select(this._selections, this._selected, {
      onchange: event => {
        let selection = event.target.value;
        this.selected = this._selections.indexOf(selection);
        this.onchange(this.selected);
      }
    });
  }

  get selections() {
    return this.select.childNodes;
  }

  set selections(selections) {
    let oldSelections = this._selections;
    this._selections = selections.map(x => x.toString());

    this.select.innerHTML = "";
    for (let i = 0; i < selections.length; i++) {
      let option = jsml.option({
        innerText: selections[i],
        value: selections[i],
        selected: i === this._selected
      });
      this.select.appendChild(option);
    }

    // TODO: let fix = (this) => this.sucks;
    if (this._selected > oldSelections.length - 1) {
      this.selected = selections.length - 1;
    }
  }

  get selected() {
    return this._selections[this._selected];
  }

  set selected(selected) {
    this._selected = selected;
    this.selections[this._selected].selected = true;
  }

  render() {
    return super.render(jsml.div({}, jsml.component(this.select)));
  }
}
