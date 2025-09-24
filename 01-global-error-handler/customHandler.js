export class AppError extends Error {
  constructor (message, {status = 500, code = "INTERNAL_ERROR", details = null} = {}){
    super(message);
    this.name = this.constructor.name;
    this.status = status;
    this.code = code;
    this.details = details
  }
}

export class BadRequest extends AppError {
   constructor(message = "Bad request", details){
     super(message, {status: 400, code: "BAD_REQUEST", details})
   }
}
export class UnauthorizedError extends AppError {
   constructor(message = "Unautorized", details){
     super(message, {status: 401, code: "UNAUTHORIZED", details})
   }
}
export class ForbidenError extends AppError {
   constructor(message = "Forbidden", details){
     super(message, {status: 403, code: "FORBIDDEN", details})
   }
}
export class NotFountError extends AppError {
   constructor(message = "Not Found", details){
     super(message, {status: 404, code: "NOT FOUND", details})
   }
}