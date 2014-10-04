(function (root, Request, tmpl) {
  var defaults = {
    el: '#users',
    template: '#user-template',
    url: 'http://www.filltext.com/?rows=10&fname={firstName}&lname={lastName}&pretty=true',
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
    this.options.extend(options);    

    this.prepare();
    this.bind();

    // start
    this.request.get();
  };

  App.prototype.prepare = function () {
    this.request = new Request({
      url: this.options.url
    });

    // get dom elements
    this.elements = {};
    this.el = document.querySelector(this.options.el);
    this.template = tmpl(document.querySelector(this.options.template).innerHTML);
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
    data.forEach(function (user) {
      this.el.innerHTML += this.template(user);
    }.bind(this));
  };

  root.App = new App();

}(window, Request, tmpl));
