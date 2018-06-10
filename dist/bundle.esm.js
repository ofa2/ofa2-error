import util from 'util';

function Errors() {}

if (!('response' in Errors.prototype)) {
  Object.defineProperty(Errors.prototype, 'response', {
    value() {
      let alt = {};
      Object.getOwnPropertyNames(this).forEach(key => {
        if (key !== 'stack' && key !== '__stackCleaned__') {
          alt[key] = this[key];
        }
      });
      return alt;
    },

    configurable: true,
    writable: true
  });
}

util.inherits(Errors, Error);

function buildErrorType(errorConfig, errorName) {
  function ConcreteCustomError(extra, message) {
    Error.captureStackTrace(this, this.constructor);
    this.name = errorName || this.constructor.name;
    this.message = message || errorConfig.message;
    this.extra = extra; // use attribute 'error' and 'code' to confirm return a CustomerError

    this.error = this.message;
    this.code = errorConfig.code;
  }

  util.inherits(ConcreteCustomError, Errors);
  return ConcreteCustomError;
}

function lift(errorMap) {
  Object.keys(errorMap).forEach(errorName => {
    let errorConfig = errorMap[errorName];
    Errors[errorName] = buildErrorType(errorConfig, errorName);
  });
  global.Errors = Errors;
  return Errors;
}

export default lift;
//# sourceMappingURL=bundle.esm.js.map
