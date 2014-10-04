describe('Request', function () {
  describe('#initialize', function () {
    describe('arguments', function () {
      describe('when args are not set', function () {
        it ('should be the defaults options', function () {
          this.instance = new Request();
          expect(this.instance.options.method).toBe('GET');
          expect(this.instance.options.isAsync).toBeTruthy();
          expect(this.instance.options.url).toBe('');
        });
      });

      describe('when args are set', function () {
        it ('should be the setted options', function () {
          this.instance = new Request({
            method: 'POST',
            isAsync: false,
            url: 'http://example.com'
          });

          expect(this.instance.options.method).toBe('POST');
          expect(this.instance.options.isAsync).toBeFalsy();
          expect(this.instance.options.url).toBe('http://example.com');
        });
      });

    });

    describe('prepare and binders', function () {
      it ('should call prepare and bind methods', function () {
        var prepare = spyOn(Request.prototype, 'prepare'),
          bind = spyOn(Request.prototype, 'bind');

        this.instance = new Request();

        expect(prepare).toHaveBeenCalled();
        expect(bind).toHaveBeenCalled();
      });
    });

  });

  describe('#prepare', function () {
    it ('should be a instance of XMLHttpRequest', function () {
      this.instance = new Request();
      this.instance.prepare();
      expect(this.instance.request).toEqual(jasmine.any(XMLHttpRequest));
    });
  });

  describe('#bind', function () {
    it ('should bind a load event into the request instance', function () {
      this.instance = new Request();
      this.instance.bind();

      expect(this.instance.request.onload).toBeDefined();
    });
  });

  describe('#get', function () {
    it ('should open and send a request', function () {
      this.instance = new Request({
        method: 'GET',
        isAsync: true,
        url: 'http://example.com'
      });

      var open = spyOn(this.instance.request, 'open'),
        send = spyOn(this.instance.request, 'send');


      this.instance.get();

      expect(open).toHaveBeenCalled();
      expect(send).toHaveBeenCalled();
    });
  });

});
