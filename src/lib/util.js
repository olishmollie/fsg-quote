let util = (function() {
  function idName(component) {
    var result = [];
    var name = component.constructor.name;
    var i = 0;
    while (i < name.length) {
      if (isUpper(name[i])) {
        result.push(name[i++].toLowerCase());
        while (i < name.length && !isUpper(name[i])) {
          result.push(name[i++]);
        }
        if (i < name.length) result.push("-");
      }
    }
    return result.join("");
  }

  function isUpper(c) {
    return c === c.toUpperCase();
  }

  return {
    idName
  };
})();
