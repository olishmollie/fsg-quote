let util = (function() {
  // takes a camel cased string and returns dashed equivalent
  // e.g. ClassName -> class-name
  function camelToDashed(name) {
    var result = [];
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

  function randomString(length) {
    var result = "";
    var alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

    for (var i = 0; i < length; i++) {
      result += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
    }

    return result;
  }

  return {
    camelToDashed,
    randomString
  };
})();
