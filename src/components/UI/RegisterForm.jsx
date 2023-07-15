import { React, useState, useEffect } from 'react'
import TextField from '../common/form/TextField'
import validator from '../../utils/validator'
import SelectField from '../common/form/SelectField'
import RadioField from '../common/form/RadioField'
import MultiSelectField from '../common/form/MultiSelectField'
import CheckBoxField from '../common/form/CheckBoxField'
import { useDispatch, useSelector } from 'react-redux'
import { getQualities } from '../../store/qualities'
import { getProfessions } from '../../store/professions'
import { signUp } from '../../store/users'

function RegisterForm() {
    const dispatch = useDispatch()

    const [data, setData] = useState({
        email: '',
        password: '',
        profession: '',
        sex: 'male',
        name: '',
        qualities: [],
        licence: false
    })
    const [errors, setErrors] = useState({})
    const professions = useSelector(getProfessions)
    const professionsList = professions.map(profession => ({
        label: profession.name,
        value: profession._id
    }))

    const qualities = useSelector(getQualities)
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
        name: {
            isRequired: {
                message: 'Name field is required'
            },
            min: {
                message: 'Name must be at least 3 characters long',
                value: 3
            }
        },
        password: {
            isRequired: {
                message: 'Password field is required'
            },
            isCapitalSymbol: {
                message: 'Password must be received for one capital letter'
            },
            isContainDigit: {
                message: 'Password must be received for one digit'
            },
            min: {
                message: 'Password must be at least 8 characters long',
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
                message: 'Confirm the license agreement '
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
        const newData = {
            ...data,
            qualities: data.qualities.map(quality => quality.value)
        }
        dispatch(signUp(newData))
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
                label='Name'
                name='name'
                value={data.name}
                onChange={handleChange}
                error={errors.name}
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
                Confirm <a>license agreement</a>
            </CheckBoxField>
            <button
                type='submit'
                disabled={!isValid}
                className='btn btn-primary w-100 mx-auto'
            >
                Sign Up
            </button>
        </form>
    )
}

export default RegisterForm
