import { React, useState, useEffect } from 'react'
import TextField from '../common/form/TextField'
import validator from '../../utils/validator'
import API from '../../api'
import SelectField from '../common/form/SelectField'
import RadioField from '../common/form/RadioField'
import MultiSelectField from '../common/form/MultiSelectField'
import CheckBoxField from '../common/form/CheckBoxField'

function RegisterForm() {
    const [data, setData] = useState({
        email: '',
        password: '',
        profession: '',
        sex: 'male',
        qualities: [],
        licence: false
    })
    const [errors, setErrors] = useState({})
    const [professions, setProfessions] = useState()
    const [qualities, setQualities] = useState({})

    useEffect(() => {
        API.professions.fetchAll().then(data => setProfessions(data))
        API.qualities.fetchAll().then(data => setQualities(data))
    }, [])

    const handleChange = target => {
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
        },
        profession: {
            isRequired: {
                message: 'Поле Profession обязательно для заполнения'
            }
        },
        licence: {
            isRequired: {
                message: 'Подтвердите лицензионное соглашение '
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
        return undefined
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
            <SelectField
                label='Profession'
                onChange={handleChange}
                options={professions}
                defaultOption='choose...'
                error={errors.profession}
                value={data.profession}
            />
            <RadioField
                options={[
                    { name: 'Male', value: 'male' },
                    { name: 'Female', value: 'female' }
                ]}
                value={data.sex}
                name='sex'
                onChange={handleChange}
                label='Sex'
            />
            <MultiSelectField
                onChange={handleChange}
                options={qualities}
                name='qualities'
                label='Qualities '
            />
            <CheckBoxField
                value={data.licence}
                onChange={handleChange}
                name='licence'
                error={errors.licence}
            >
                Подтвердить <a>лицензионное соглашение</a>
            </CheckBoxField>
            <button
                disabled={!isValid}
                className='btn btn-primary w-100 mx-auto'
            >
                Submit
            </button>
        </form>
    )
}

export default RegisterForm
