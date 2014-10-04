Object.defineProperty(Object.prototype, 'extend', {
  enumerable: false,
  value: function (from) {
    var props = Object.getOwnPropertyNames(from),
      dest = this;

    props.forEach(function(name) {
      var destination;

      if (name in dest) {
        destination = Object.getOwnPropertyDescriptor(from, name);
        Object.defineProperty(dest, name, destination);
        return;
      }

      Object.defineProperty(dest, name, {
        value: from[name]
      });
    });

    return this;
  }
});

