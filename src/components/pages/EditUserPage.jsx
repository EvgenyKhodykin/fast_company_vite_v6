import { React, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import TextField from '../common/form/TextField'
import SelectField from '../common/form/SelectField'
import RadioField from '../common/form/RadioField'
import MultiSelectField from '../common/form/MultiSelectField'
import Loading from '../UI/Loading'
import validator from '../../utils/validator'
import { useDispatch, useSelector } from 'react-redux'
import { getQualities, getQualitiesLoadingStatus } from '../../store/qualities'
import { getProfessions, getProfessionsLoadingStatus } from '../../store/professions'
import { getCurrentUser, updateCurrentUser } from '../../store/users'

export function EditUserPage() {
    const professions = useSelector(getProfessions)
    const qualities = useSelector(getQualities)
    const professionsLoading = useSelector(getProfessionsLoadingStatus)
    const qualitiesLoading = useSelector(getQualitiesLoadingStatus)

    const dispatch = useDispatch()
    const currentUser = useSelector(getCurrentUser())
    const [user, setUser] = useState(currentUser)
    const [errors, setErrors] = useState({})
    const navigate = useNavigate()

    const transformedDataArray = array => {
        return array.map(item => ({
            value: item._id,
            label: item.name,
            color: item.color
        }))
    }

    const handleChange = target => {
        if (target.name === 'qualities') {
            setUser(prevState => ({
                ...prevState,
                [target.name]: target.value.map(item => item.value)
            }))
        } else {
            setUser(prevState => ({
                ...prevState,
                [target.name]: target.value
            }))
        }
    }

    const validatorConfig = {
        email: {
            isRequired: {
                message: 'Email field is empty'
            },
            isEmail: {
                message: 'Incorrect Email'
            }
        },
        name: {
            isRequired: {
                message: 'Name field is empty'
            }
        }
    }

    useEffect(() => {
        validate()
    }, [user])

    const validate = () => {
        const errors = validator(user, validatorConfig)
        setErrors(errors)
        return Object.keys(errors).length === 0
    }

    const handleSubmit = async event => {
        event.preventDefault()
        const isValid = validate()
        if (!isValid) return
        dispatch(updateCurrentUser(user))
        navigate(`/users/${currentUser._id}`, { replace: true })
    }

    if (!professionsLoading && currentUser && !qualitiesLoading) {
        return (
            <div className='container mt-5'>
                <div className='row '>
                    <div className='col-md-6 offset-md-3 shadow p-4'>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label='Name'
                                name='name'
                                value={user.name}
                                onChange={handleChange}
                                error={errors.name}
                            />
                            <TextField
                                label='Email'
                                name='email'
                                value={user.email}
                                onChange={handleChange}
                                error={errors.email}
                            />
                            <SelectField
                                label='Choose profession'
                                name='profession'
                                defaultOption='Choose...'
                                value={user.profession}
                                options={transformedDataArray(professions)}
                                onChange={handleChange}
                            />
                            <RadioField
                                options={[
                                    { name: 'Male', value: 'male' },
                                    { name: 'Female', value: 'female' }
                                ]}
                                name='sex'
                                label='Sex'
                                value={user.sex}
                                onChange={handleChange}
                            />
                            <MultiSelectField
                                name='qualities'
                                label='Choose qualities'
                                options={transformedDataArray(qualities)}
                                onChange={handleChange}
                                defaultValue={transformedDataArray(qualities).filter(
                                    quality => user.qualities.includes(quality.value)
                                )}
                            />
                            <div className='d-flex justify-content-between'>
                                <Link to={`/users/${currentUser._id}`}>
                                    <button
                                        type='button'
                                        className='btn btn-primary'
                                    >
                                        <i className='bi bi-caret-left'></i>
                                        Back
                                    </button>
                                </Link>
                                <button
                                    type='submit'
                                    className='btn btn-primary w-50 mx-6'
                                >
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
    return <Loading />
}
