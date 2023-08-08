import Jwt from 'jsonwebtoken'
import config from 'config'
import Token from '../models/Token.js'

class TokenService {
    generate(payload) {
        const accessToken = Jwt.sign(payload, config.get('accessSecret'), {
            expiresIn: '1h'
        })

        const refreshToken = Jwt.sign(payload, config.get('refreshSecret'))

        return { accessToken, refreshToken, expiresIn: 3600 }
    }

    async save(user, refreshToken) {
        const data = await Token.findOne({ user })
        if (data) {
            data.refreshToken = refreshToken
            return data.save()
        }
        const token = await Token.create({ user, refreshToken })
        return token
    }
}

export default new TokenService()
