import util from 'util';

function OperationalError() {
  Error.call(this);
}

util.inherits(OperationalError, Error);

if (!('response' in OperationalError.prototype)) {
  Object.defineProperty(OperationalError.prototype, 'response', {
    value() {
      let alt = {};

      Object.getOwnPropertyNames(this).forEach((key) => {
        if (key !== 'stack' && key !== '__stackCleaned__') {
          alt[key] = this[key];
        }
      });

      alt.errcode = alt.code;
      alt.errmsg = alt.message;
      return alt;
    },
    configurable: true,
    writable: true,
  });
}

function buildErrorType(defaultMessage, code) {
  function ConcreteCustomError(extra, message) {
    Error.captureStackTrace(this, this.constructor);
    this.name = code || this.constructor.name;
    this.message = message || defaultMessage;
    this.extra = extra;
    this.code = code;
  }

  util.inherits(ConcreteCustomError, OperationalError);
  return ConcreteCustomError;
}

function lift(errors) {
  let result = {};

  Object.keys(errors).forEach((code) => {
    let message = errors[code];
    result[code] = buildErrorType(message, code);
  });

  result.OperationalError = OperationalError;
  return result;
}

export default lift;
