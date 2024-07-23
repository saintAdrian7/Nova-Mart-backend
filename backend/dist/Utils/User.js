"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDoesNotExist = exports.invalidEmailorPasswordError = exports.UnableToSaveUserError = void 0;
class UnableToSaveUserError extends Error {
    constructor(message) {
        super(message);
        this.name = "UnableToSaveUserError";
    }
}
exports.UnableToSaveUserError = UnableToSaveUserError;
class invalidEmailorPasswordError extends Error {
    constructor(message) {
        super(message);
        this.name = "invalidEmailorPasswordError";
    }
}
exports.invalidEmailorPasswordError = invalidEmailorPasswordError;
class UserDoesNotExist extends Error {
    constructor(message) {
        super(message);
    }
}
exports.UserDoesNotExist = UserDoesNotExist;
exports.default = {};
