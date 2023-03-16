class expressError extends Error {
    constructor(message, statusCode) {
        super();
        this.message = message;
        this.status = statusCode;
    }
}

export default expressError;