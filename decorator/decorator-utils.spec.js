const {decorate} = require('./decorator-utils');

describe('decorator-utils', () => {
  describe('decorate', () => {
    it('should prepend to existing method', () => {
      expect.assertions(4);
      const NAME = 'name';

      function Test() {
        this.name = NAME;
      }
      Test.prototype.doStuff = function(name) {
        expect(this.name).toBe(NAME);
        expect(name).toBe(NAME);
      };

      Test = decorate(Test, {
        prepend: {
          doStuff: function(name) {
            expect(this.name).toBe(NAME);
            expect(name).toBe(NAME);
          }
        },
      });

      const test = new Test();
      test.doStuff(NAME);
    });

    it('should create new methods', () => {
      expect.assertions(1);
      const NAME = 'name';

      function Test() {
        this.name = NAME;
      };

      Test = decorate(Test, {
        prepend: {
          newStuff: function() {
            expect(this.name).toBe(NAME);
          }
        }
      });

      const test = new Test();
      test.newStuff();
    });

    it('should extend the constructor', () => {
      const A = 'a';
      const B = 'b';
      const B_UPPER = 'B';

      function Test(a, b) {
        this.a = a;
        this.b = b;
      };

      Test = decorate(Test, {
        constructor: function(a, b) {
          this.b = b.toUpperCase();
        }
      });

      const test = new Test(A, B);
      expect(test.a).toBe(A);
      expect(test.b).toBe(B_UPPER);
    });

    it('should work without options', () => {
      const NAME = 'name';
      function Test(name) {
        this.name = name;
      };

      Test.prototype.getName = function() {
        return this.name;
      };

      Test = decorate(Test);
      const test = new Test(NAME);
      expect(test.getName()).toBe(NAME);
    });

    it('should work with es6 classes', () => {
      expect.assertions(5);
      const A = 'a';
      const B = 'b';
      class Test {
        constructor(a) {
          this.a = a;
        }

        doStuff(b) {
          expect(this.a).toBe(A);
          expect(b).toBe(B);
        }
      }

      Test = decorate(Test, {
        prepend: {
          doStuff: function(b) {
            expect(this.a).toBe(A);
            expect(this.b).toBe(B);
            expect(b).toBe(B);
          }
        },
        constructor: function() {
          this.b = B;
        }
      });
      const test = new Test(A);
      test.doStuff(B);
    });
  });
});
