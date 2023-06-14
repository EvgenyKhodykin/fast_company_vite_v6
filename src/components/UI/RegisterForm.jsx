import { React, useState, useEffect } from 'react'
import TextField from '../common/form/TextField'
import validator from '../../utils/validator'
import SelectField from '../common/form/SelectField'
import RadioField from '../common/form/RadioField'
import MultiSelectField from '../common/form/MultiSelectField'
import CheckBoxField from '../common/form/CheckBoxField'
import { useQualities } from '../../hooks/useQualities'
import { useProfessions } from '../../hooks/useProfessions'
import { useAuth } from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

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
    const { signUp } = useAuth()
    const navigate = useNavigate()

    const { professions } = useProfessions()
    const professionsList = professions.map(profession => ({
        label: profession.name,
        value: profession._id
    }))

    const { qualities } = useQualities()
    const qualitiesList = qualities.map(quality => ({
        label: quality.name,
        value: quality._id
    }))

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
        },
        profession: {
            isRequired: {
                message: 'Profession field is required'
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

    const handleSubmit = async event => {
        event.preventDefault()
        const isValid = validate()
        if (!isValid) return
        const newData = {
            ...data,
            qualities: data.qualities.map(quality => quality.value)
        }
        try {
            await signUp(newData)
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
            <SelectField
                label='Profession'
                onChange={handleChange}
                options={professionsList}
                defaultOption='Choose...'
                error={errors.profession}
                value={data.profession}
                name='profession'
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
                options={qualitiesList}
                name='qualities'
                label='Qualities'
                defaultValue={data.qualities}
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
                type='submit'
                disabled={!isValid}
                className='btn btn-primary w-100 mx-auto'
            >
                Submit
            </button>
        </form>
    )
}

export default RegisterForm
