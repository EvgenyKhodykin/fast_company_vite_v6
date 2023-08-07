function validator(data, config) {
    const errors = {}

    const validate = (vaildateMethod, data, config) => {
        let statusValidate = null

        switch (vaildateMethod) {
            case 'isRequired': {
                if (typeof data === 'boolean') statusValidate = !data
                else statusValidate = data.trim() === ''
                break
            }

            case 'isEmail': {
                const emailRegExp = /^\S+@\S+\.\S+$/g
                statusValidate = !emailRegExp.test(data)
                break
            }

            case 'isCapitalSymbol': {
                const capitalRegExp = /[A-Z]+/g
                statusValidate = !capitalRegExp.test(data)
                break
            }

            case 'isContainDigit': {
                const digitRegExpo = /\d+/g
                statusValidate = !digitRegExpo.test(data)
                break
            }

            case 'min': {
                statusValidate = data.length < config.value
                break
            }

            default:
                break
        }
        if (statusValidate) return config.message
    }

    for (const fieldName in data) {
        for (const vaildateMethod in config[fieldName]) {
            const error = validate(
                vaildateMethod,
                data[fieldName],
                config[fieldName][vaildateMethod]
            )
            if (error && !errors[fieldName]) {
                errors[fieldName] = error
            }
        }
    }
    return errors
}

export default validator
