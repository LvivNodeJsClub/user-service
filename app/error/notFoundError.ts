const HttpStatus = require('http-status-codes');

export default class NotFoundError extends Error {
    public status: number;

    constructor(message:string) {
        super(message);
        this.status = HttpStatus.NOT_FOUND;
    }
}

module.exports = NotFoundError;
