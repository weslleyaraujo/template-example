describe('App', function () {
  beforeEach(function () {
    var body = document.querySelector('body'),
      el = document.createElement('div'),
      template = document.createElement('div');
      
    el.id = 'users';
    template.id = 'user-template';
    template.innerHTML = 'some example';

    body.appendChild(el);
    body.appendChild(template);
  });

  describe('#methods', function () {
    describe('#parse', function () {
      it('should parse the data from the object', function () {
        var data = {
          currentTarget: {
            response: '{}'
          }
        };

        expect(Object.prototype.toString.call(App.methods.parse(data))).toBe('[object Object]');
      });

      it('should throw an error', function () {
        var data = '';
        expect(function () {
          App.methods.parse(data);
        }).toThrow(new Error('Only request data are allowed to parse.'));
      });
    });
  });

  describe('#initialize', function () {
    describe('arguments', function () {

      describe('when args are not set', function () {
        it('should be the defaults options', function () {
          this.instance = new App();

          expect(this.instance.options.el).toBe('#users');
          expect(this.instance.options.template).toBe('#user-template');
          expect(this.instance.options.url).toBe('http://www.filltext.com/?rows=10&fname={firstName}&lname={lastName}&pretty=true');
        });
      });

      describe('when args are set', function () {
        var otherTemplate = document.createElement('div');
        otherTemplate.id = 'some-other-id';
        otherTemplate.innerHTML = 'some example';

        it('should be the setted options', function () {
          this.instance = new App({
            el: '#some-id',
            template: '#some-other-id',
            url: '/some/url'
          });

          expect(this.instance.options.el).toBe('#some-id');
          expect(this.instance.options.template).toBe('#some-other-id');
          expect(this.instance.options.url).toBe('/some/url');
        });
      });
    });

    describe('prepare and binders', function () {
      it('should call prepare and bind methods', function () {
        var prepare = spyOn(App.prototype, 'prepare'),
          bind = spyOn(App.prototype, 'bind');

        this.instance = new App();

        expect(prepare).toHaveBeenCalled();
        expect(bind).toHaveBeenCalled();
      });
    });

  });

  describe('#start', function () {
    it('should call method get from request', function () {
      var get;

      this.instance = new App();
      get = spyOn(this.instance.request, 'get');

      this.instance.start();

      expect(get).toHaveBeenCalled();
    });
  });

  describe('#prepare', function () {

    it('should set the request instance, the DOM elements and register the template function', function () {
      // instance
      this.instance = new App();

      expect(this.instance.request).toBeDefined();
      expect(this.instance.elements.el).toBeDefined();
      expect(this.instance.template).toBeDefined();
    });
  });

  describe('#bind', function () {
    it('should registered the onload method into the request instance', function () {
      // instance
      this.instance = new App();
      expect(this.instance.request.registered).toBeDefined();
    });
  });

  describe('#render', function () {
    it('should parse the request data and render into view', function () {
      var request = { 
        currentTarget: {
          response: '[{"fname": "Weslley", "lname": "Araujo" }]'
        }   
      };

      // instance
      this.instance = new App();
      this.instance.render(request);

      expect(this.instance.elements.el.innerHTML).toBe('some example');
    });
  });

});
