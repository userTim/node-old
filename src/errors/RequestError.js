class RequestError extends Error {
    constructor({ message = 'Internal Error', status = 500 }) {
        super(message)

        this.status = status
    }
}

export default RequestError
