class HTTPError extends Error {
    timestamp = Date.now()
}

export class BadRequestError extends HTTPError {
    code = 400
}

export class NotFoundError extends HTTPError {
    code = 404
}

export class InternalError extends HTTPError {
    code = 500
}
