export const errorName = {
    UNAUTHORIZED: 'UNAUTHORIZED',
    AUTHFAILED: 'AUTHFAILED',
    VALIDATION: 'VALIDATION',
    ALREADYEXIST: 'ALREADYEXIST',
    NOTFOUND: 'NOTFOUND',
    REQUIRED: 'REQUIRED'
}

export const errorType = {
    UNAUTHORIZED: {
        message: 'Access forbidden',
        statusCode: 403
    },
    AUTHFAILED: {
        message: 'Auth failed',
        statusCode: 403
    },
    VALIDATION: {
        message: 'Validation error found',
        statusCode: 400
    },
    ALREADYEXIST: {
        message: 'Already exist',
        statusCode: 400
    },
    NOTFOUND: {
        message: 'Not found',
        statusCode: 404
    },
    REQUIRED: {
        message: 'Required field is missing',
        statusCode: 404
    }
}