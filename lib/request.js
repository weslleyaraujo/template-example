(function (root) {
  var defaults = {
    url: '',
    method: 'GET',
    isAsync: true
  };

  Request.methods = {};

  function Request(options) {
    // mix options
    this.options = Object.create(defaults).extend(options || {});

    // prepare request
    this.request = new XMLHttpRequest();

    // bind onload
    this.request.addEventListener('load', this.onload.bind(this), false);

    return this;
  };


  Request.prototype.get = function () {
    this.request.open(
      this.options.method,
      this.options.url,
      this.options.isAsync
    );

    this.request.send();
    return this;
  };

  Request.prototype.onload = function (fn) {
    if (this.registerd) {
      this.registerd.apply(this, arguments);
      delete this.registerd;
      return;
    };

    this.registerd = fn;
  };

  root.Request = Request;

}(window));
