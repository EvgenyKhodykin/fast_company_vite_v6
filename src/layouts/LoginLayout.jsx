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
            },
            isEmail: {
                message: 'Email введён некорректно'
            }
        },
        password: {
            isRequired: {
                message: 'Поле Пароль обязательно для заполнения'
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

    const handleSubmit = event => {
        event.preventDefault()
        const isValid = validate()
        if (!isValid) return
        console.log(data)
    }

    return (
        <div className='container mt-5'>
            <div className='row '>
                <div className='col-md-6 offset-md-3 shadow p-4'>
                    <h3 className='mb-4'>Autorization</h3>
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
                        <button
                            disabled={!isValid}
                            className='btn btn-primary w-100 mx-auto'
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginLayout
