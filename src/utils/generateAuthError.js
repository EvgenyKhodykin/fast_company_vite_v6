/* eslint-disable n/handle-callback-err */

function generateAuthError(message) {
    switch (message) {
        case 'INVALID_PASSWORD':
            return 'Incorrect Password &#128533;'

        case 'EMAIL_EXISTS':
            return 'This Email already exists &#128558;'

        case 'EMAIL_NOT_FOUND':
            return 'Incorrect Email &#128533;'

        default:
            return 'Too many login attempts. Try later'
    }
}

export default generateAuthError
