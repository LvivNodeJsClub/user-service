const HttpStatus = require('http-status-codes');

export default class BadRequestError extends Error {
    public status: number;

    constructor(message: string) {
        super(message);
        this.status = HttpStatus.BAD_REQUEST;
    }
}

module.exports = BadRequestError;
