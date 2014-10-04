(function (root, Request) {
  var defaults = {
    el: '#users'
  };

  App.methods = {};

  App.methods.parse = function (request) {
    try {
      return JSON.parse(request.currentTarget.response);
    } catch (e) {
      throw new Error(e);
    };
  };

  function App(options) {
    // mix options
    this.options = defaults;
    this.options.extend(defaults);    

    this.prepare();
    this.bind();

    // start
    this.request.get();
  };

  App.prototype.prepare = function () {
    this.request = new Request();

    // get dom elements
    this.elements = {};
    this.el = document.querySelector(this.options.el);
  };

  App.prototype.bind = function () {
    this.request.onload(this.render.bind(this));
  };

  App.prototype.render = function (request) {
    // parse json data
    var data = App.methods.parse(request);

    // clear element
    this.el.innerHTML = '';

    // render data
    debugger
  };

  root.App = new App();

}(window, Request));
