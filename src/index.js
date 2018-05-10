import util from 'util';

function Errors() {}

util.inherits(Errors, Error);

function buildErrorType(errorConfig, errorName) {
  function ConcreteCustomError(extra, message) {
    Error.captureStackTrace(this, this.constructor);

    this.name = errorName || this.constructor.name;
    this.message = message || errorConfig.message;

    this.extra = extra;
    this.code = errorConfig.code;
  }

  util.inherits(ConcreteCustomError, Errors);
  return ConcreteCustomError;
}

function lift(errorMap) {
  Object.keys(errorMap).forEach((errorName) => {
    let errorConfig = errorMap[errorName];
    Errors[errorName] = buildErrorType(errorConfig, errorName);
  });

  global.Errors = Errors;
}

export default lift;
