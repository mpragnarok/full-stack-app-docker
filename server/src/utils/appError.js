class AppError extends Error {
    constructor(message, code) {
        super(message);
        this.result = 'error';
        this.code = code ?? 400;
        this.msg = message;
    }
}

module.exports = AppError;
