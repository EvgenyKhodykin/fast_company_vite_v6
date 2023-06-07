import httpService from './http.service'

const userEndPoint = 'users/'

const userService = {
    get: async () => {
        const { data } = await httpService.get(userEndPoint)
        return data
    }
}

export default userService
