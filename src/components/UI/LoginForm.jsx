import { React, useEffect, useState } from 'react'
import TextField from '../common/form/TextField'
import validator from '../../utils/validator'
import CheckBoxField from '../common/form/CheckBoxField'
import { useAuth } from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function LoginForm() {
    const [data, setData] = useState({ email: '', password: '', stayOn: false })
    const [errors, setErrors] = useState({})
    const { signIn } = useAuth()
    const navigate = useNavigate()

    const handleChange = target => {
        setData(prevState => ({
            ...prevState,
            [target.name]: target.value
        }))
    }

    const validatorConfig = {
        email: {
            isRequired: {
                message: 'Email field is required'
            }
        },
        password: {
            isRequired: {
                message: 'Password field is required'
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

    const isValid = Object.keys(errors).length === 0

    const handleSubmit = async event => {
        event.preventDefault()
        const isValid = validate()
        if (!isValid) return
        try {
            await signIn(data)
            navigate('/')
            toast(`Welcome, ${data.email}!`)
        } catch (error) {
            setErrors(error)
        }
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
                label='Password'
                type='password'
                name='password'
                value={data.password}
                onChange={handleChange}
                error={errors.password}
            />
            <CheckBoxField
                value={data.stayOn}
                onChange={handleChange}
                name='stayOn'
            >
                Stay logged in
            </CheckBoxField>
            <button
                disabled={!isValid}
                className='btn btn-primary w-100 mx-auto'
            >
                Log In
            </button>
        </form>
    )
}

export default LoginForm
