"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = exports.UniqueValueError = void 0;
class UniqueValueError extends Error {
    constructor(message) {
        super(message);
        this.name = "UniqueValueError";
    }
}
exports.UniqueValueError = UniqueValueError;
class NotFoundError extends Error {
    constructor(message, query) {
        super(message);
        this.query = query;
        this.name = "NotFoundError";
    }
}
exports.NotFoundError = NotFoundError;
