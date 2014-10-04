describe('Request', function () {
  describe('initialize', function () {
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

});
