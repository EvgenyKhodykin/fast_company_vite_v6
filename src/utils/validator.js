function validator(data, config) {
    const errors = {}

    const validate = (vaildateMethod, data, config) => {
        switch (vaildateMethod) {
            case 'isRequired':
                if (data.trim() === '') return config.message
                break

            case 'isEmail': {
                const emailRegExp = /^\S+@\S+\.\S+$/g
                if (!emailRegExp.test(data)) return config.message
                break
            }

            default:
                break
        }
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
