(function (root, Request, tmpl) {
  'use strict';
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
      throw new Error('Only request data are allowed to parse.');
    }
  };

  function App(options) {
    // mix options
    this.options = Object.create(defaults).extend(options);

    this.prepare();
    this.bind();

    return this;
  }

  App.prototype.start = function () {
    this.request.get();
  };

  App.prototype.prepare = function () {
    this.request = new Request({
      url: this.options.url
    });

    // get dom elements
    this.elements = {};
    this.elements.el = document.querySelector(this.options.el);

    // template
    try {
      this.template = tmpl(document.querySelector(this.options.template).innerHTML);
    } catch (e) {}
  };

  App.prototype.bind = function () {
    this.request.onload(this.render.bind(this));
  };

  App.prototype.render = function (request) {

    var request = {
      currentTarget: {
        response: '[ { "fname": "Shauntell", "lname": "Leite" }, { "fname": "Donald", "lname": "User" } ]'
      }
    };

    // parse json data
    var data = App.methods.parse(request);

    // clear element
    this.elements.el.innerHTML = '';


    // // render data
    data.forEach(function (user) {
      this.elements.el.innerHTML += this.template(user);
    }.bind(this));
  };

  root.App = App;

}(window, Request, tmpl));
