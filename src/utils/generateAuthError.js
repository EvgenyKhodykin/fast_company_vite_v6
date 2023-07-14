/* eslint-disable n/handle-callback-err */

function generateAuthError(message) {
    switch (message) {
        case 'INVALID_PASSWORD':
            return 'Incorrect Password'

        case 'EMAIL_EXISTS':
            return 'This Email already exists'

        case 'EMAIL_NOT_FOUND':
            return 'Incorrect Email'

        default:
            return 'Too many login attempts. Try later'
    }
}

export default generateAuthError
