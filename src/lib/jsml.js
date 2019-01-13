var jsml = (function() {
  // creates a standard HTML dom element
  function makeElement(tag, attributes, ...children) {
    let element = document.createElement(tag);
    return jsml.element(attributes, element, ...children);
  }

  // renders a component or a custom made node
  function component(attributes, component, ...children) {
    let node = component.render();
    for (let attr in attributes) {
      // b/c node is already set up as a tree, we must apply styles using object notation (instead of strings)
      if (attr === "style") {
        for (let styleAttr in attributes[attr]) {
          node.style[styleAttr] = attributes[attr][styleAttr];
        }
      } else {
        node[attr] = attributes[attr];
      }
    }
    for (let i = 0; i < children.length; i++) {
      node.appendChild(children[i]);
    }
    return node;
  }

  // renders a traditional html element
  function element(attributes, element, ...children) {
    for (let attr in attributes) {
      // convert style object to inline string
      if (attr === "style") {
        element.style = util.styleObjectToString(attributes[attr]);
      } else {
        element[attr] = attributes[attr];
      }
    }
    for (let i = 0; i < children.length; i++) {
      element.appendChild(children[i]);
    }
    return element;
  }

  // conditional rendering
  function cond(predicate, thenComponent, elseComponent) {
    if (predicate) {
      return thenComponent;
    }
    return elseComponent;
  }

  return {
    makeElement: makeElement,
    component: component,
    element: element,
    cond: cond,
    h1: (attributes, ...children) => {
      return makeElement("h1", attributes, ...children);
    },
    h2: (attributes, ...children) => {
      return makeElement("h2", attributes, ...children);
    },
    h3: (attributes, ...children) => {
      return makeElement("h3", attributes, ...children);
    },
    h4: (attributes, ...children) => {
      return makeElement("h4", attributes, ...children);
    },
    h5: (attributes, ...children) => {
      return makeElement("h5", attributes, ...children);
    },
    h6: (attributes, ...children) => {
      return makeElement("h6", attributes, ...children);
    },
    a: (attributes, ...children) => {
      return makeElement("a", attributes, ...children);
    },
    div: (attributes, ...children) => {
      return makeElement("div", attributes, ...children);
    },
    nav: (attributes, ...children) => {
      return makeElement("nav", attributes, ...children);
    },
    p: (attributes, ...children) => {
      return makeElement("p", attributes, ...children);
    },
    strong: (attributes, ...children) => {
      return makeElement("strong", attributes, ...children);
    },
    span: (attributes, ...children) => {
      return makeElement("span", attributes, ...children);
    },
    figure: (attributes, ...children) => {
      return makeElement("figure", attributes, ...children);
    },
    figcaption: attributes => {
      return makeElement("figcaption", attributes);
    },
    img: attributes => {
      return makeElement("img", attributes);
    },
    button: (attributes, ...children) => {
      return makeElement("button", attributes, ...children);
    },
    label: (attributes, ...children) => {
      return makeElement("label", attributes, ...children);
    },
    input: attributes => {
      return makeElement("input", attributes);
    },
    ul: (attributes, ...children) => {
      return makeElement("ul", attributes, ...children);
    },
    li: (attributes, ...children) => {
      return makeElement("li", attributes, ...children);
    },
    text: text => {
      return document.createTextNode(text);
    },
    select: (selections, selected, attributes, ...children) => {
      let select = makeElement("select", attributes, ...children);
      for (let i = 0; i < selections.length; i++) {
        let option = jsml.option({
          innerText: selections[i],
          value: selections[i],
          selected: i === selected
        });
        select.appendChild(option);
      }
      return select;
    },
    option: (attributes, ...children) => {
      return makeElement("option", attributes, ...children);
    },
    canvas: attributes => {
      return makeElement("canvas", attributes);
    }
  };
})();
