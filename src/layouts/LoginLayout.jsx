import { React, useEffect, useState } from 'react'
import TextField from '../components/TextField'

function LoginLayout() {
    const [data, setData] = useState({ email: '', password: '' })
    const [errors, setErrors] = useState({})

    const handleChange = ({ target }) => {
        setData(prevState => ({ ...prevState, [target.name]: target.value }))
    }

    useEffect(() => {
        validate()
    }, [data])

    const validate = () => {
        const errors = {}
        for (const fieldName in data) {
            if (data[fieldName].trim() === '') {
                errors[fieldName] = `${fieldName} обязательно для заполнения`
            }
        }
        setErrors(errors)
        return Object.keys(errors).length === 0 || false
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
            <button type='button'>Submit</button>
        </form>
    )
}

export default LoginLayout
