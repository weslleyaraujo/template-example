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
    // this.request.addEventListener('load', this.onload.bind(this), false);
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
    if (this.registered && typeof this.registered === 'function') {
      this.registered.apply(this, arguments);
      delete this.registered;
      return;
    }

    this.registered = fn;
  };

  root.Request = Request;

}(window));
