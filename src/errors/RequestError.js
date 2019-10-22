class RequestError extends Error {
    constructor(props) {
        let message,
            status = 500

        if (typeof props === 'string') message = props
        else {
            message = props.message
            status = props.status
        }

        super(message)

        this.status = status
    }
}

export default RequestError
