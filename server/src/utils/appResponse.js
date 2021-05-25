class AppResponse {
    constructor(message, data, responseCode) {
        // super(message);
        this.result = 'success';
        this.msg = message;
        this.code = responseCode ?? 200;
        this.data = data ?? null;
    }
}

module.exports = AppResponse;
