import tokenService from '../services/token.service.js'

function authMiddleware(request, response, next) {
    if (request.method === 'OPTIONS') return next()

    try {
        const token = request.headers.authorization.split(' ')[1]
        if (!token) {
            return response.status(401).json({ message: 'Unauthorized' })
        }

        const data = tokenService.validateAccess(token)
        if (!data) {
            return response.status(401).json({ message: 'Unauthorized' })
        }

        request.user = data
        next()
    } catch (error) {
        response.status(401).json({ message: 'Unauthorized' })
    }
}

export default authMiddleware
