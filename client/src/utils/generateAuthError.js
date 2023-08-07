/* eslint-disable n/handle-callback-err */

function generateAuthError(message) {
    switch (message) {
        case 'INVALID_PASSWORD':
            return `Incorrect Password ${String.fromCodePoint(0x1f914)}`

        case 'EMAIL_EXISTS':
            return `This Email already exists ${String.fromCodePoint(0x1f914)}`

        case 'EMAIL_NOT_FOUND':
            return `Incorrect Email ${String.fromCodePoint(0x1f914)}`

        default:
            return 'Too many login attempts. Try later'
    }
}

export default generateAuthError
