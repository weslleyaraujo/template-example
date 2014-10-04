(function (root) {
  var defaults = {
    url: '',
    method: 'GET',
    isAsync: true
  };

  Request.methods = {};

  function Request(options) {
    // mix options
    this.options = Object.create(defaults).extend(options);

    this.prepare();
    this.bind();

    return this;
  }

  Request.prototype.prepare = function () {
    this.request = new XMLHttpRequest();
  };

  Request.prototype.bind = function () {
    this.request.onload = this.onload.bind(this);
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
    }

    this.registerd = fn;
  };

  root.Request = Request;

}(window));
