import util from"util";function Errors(){}function buildErrorType(r,t){function o(o,i){Error.captureStackTrace(this,this.constructor),this.name=t||this.constructor.name,this.message=i||r.message,this.extra=o,this.code=r.code}return util.inherits(o,Errors),o}function lift(){this.config.errors.forEach((r,t)=>{Errors[t]=buildErrorType(r,t)}),global.Errors=Errors}util.inherits(Errors,Error);export default lift;
//# sourceMappingURL=bundle.esm.js.map
