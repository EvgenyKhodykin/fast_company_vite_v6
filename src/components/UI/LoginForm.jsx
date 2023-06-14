import { React, useEffect, useState } from 'react'
import TextField from '../common/form/TextField'
import validator from '../../utils/validator'
import CheckBoxField from '../common/form/CheckBoxField'
import { useAuth } from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

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
            },
            isEmail: {
                message: 'Incorrect Email'
            }
        },
        password: {
            isRequired: {
                message: 'Password field is required'
            },
            isCapitalSymbol: {
                message: 'Пароль должен содержать хотя бы одну заглавную букву'
            },
            isContainDigit: {
                message: 'Пароль должен содержать хотя бы одну цифру'
            },
            min: {
                message: 'Пароль должен состоять минимум из 8 символов',
                value: 8
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
                Оставаться в системе
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
