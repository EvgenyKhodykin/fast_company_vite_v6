import { React, useEffect, useState } from 'react'
import TextField from '../components/TextField'
import validator from '../utils/validator'

function LoginLayout() {
    const [data, setData] = useState({ email: '', password: '' })
    const [errors, setErrors] = useState({})

    const handleChange = ({ target }) => {
        setData(prevState => ({
            ...prevState,
            [target.name]: target.value
        }))
    }

    const validatorConfig = {
        email: {
            isRequired: {
                message: 'Поле Email обязательно для заполнения'
            }
        },
        password: {
            isRequired: {
                message: 'Поле Пароль обязательно для заполнения'
            }
        }
    }

    useEffect(() => {
        validate()
    }, [data])

    const validate = () => {
        const errors = validator(data, validatorConfig)
        setErrors(errors)
        return Object.keys(errors).length === 0
    }

    const handleSubmit = event => {
        event.preventDefault()
        const isValid = validate()
        if (!isValid) return
        console.log(data)
    }

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label='Email'
                name='email'
                value={data.email}
                onChange={handleChange}
                error={errors.email}
            />
            <TextField
                label='Пароль'
                type='password'
                name='password'
                value={data.password}
                onChange={handleChange}
                error={errors.password}
            />
            <button>Submit</button>
        </form>
    )
}

export default LoginLayout
