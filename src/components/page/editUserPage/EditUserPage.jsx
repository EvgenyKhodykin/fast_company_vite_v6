import { React, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import API from '../../../api'
import TextField from '../../common/form/TextField'
import SelectField from '../../common/form/SelectField'
import RadioField from '../../common/form/RadioField'
import MultiSelectField from '../../common/form/MultiSelectField'
import Loading from '../../UI/Loading'
import validator from '../../../utils/validator'

export function EditUserPage() {
    const [user, setUser] = useState({
        name: '',
        email: '',
        profession: '',
        sex: 'male',
        qualities: []
    })
    const [professions, setProfessions] = useState([])
    const [qualities, setQualities] = useState([])
    const [errors, setErrors] = useState({})
    const { userId } = useParams()
    const navigate = useNavigate()

    const transformedQualities = user.qualities.map(quality => ({
        value: quality._id,
        label: quality.name,
        color: quality.color
    }))

    useEffect(() => {
        API.users.getById(userId).then(data => setUser(data))
        API.professions.fetchAll().then(data => {
            const professionsObject = Object.keys(data).map(professionName => ({
                label: data[professionName].name,
                value: data[professionName]._id
            }))
            setProfessions(professionsObject)
        })
        API.qualities.fetchAll().then(data => {
            const qualitiesObject = Object.keys(data).map(optionName => ({
                value: data[optionName]._id,
                label: data[optionName].name,
                color: data[optionName].color
            }))
            setQualities(qualitiesObject)
        })
    }, [])

    const handleChange = target => {
        setUser(prevState => ({
            ...prevState,
            [target.name]: target.value
        }))
    }

    const getProfession = value => {
        if (typeof value === 'object') return value
        return professions
            .filter(profession => profession.label === value)
            .map(profession => ({
                _id: profession.value,
                name: profession.label
            }))[0]
    }

    const getQualities = value => {
        if (value[0]._id !== undefined) return value
        return value.map(quality => ({
            _id: quality.value,
            name: quality.label,
            color: quality.color
        }))
    }

    const validatorConfig = {
        email: {
            isRequired: {
                message: 'Email обязателен для заполнения'
            },
            isEmail: {
                message: 'Email введён некорректно'
            }
        },
        name: {
            isRequired: {
                message: 'Имя не должно быть пустым'
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

    const handleSubmit = event => {
        event.preventDefault()
        const isValid = validate()
        if (!isValid) return
        API.users
            .update(userId, {
                ...user,
                profession: getProfession(user.profession),
                qualities: getQualities(user.qualities)
            })
            .then(data => navigate(`/users/${data._id}`))
    }

    if (professions.length > 0 && qualities.length > 0) {
        return (
            <div className='container mt-5'>
                <div className='row '>
                    <div className='col-md-6 offset-md-3 shadow p-4'>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label='Имя'
                                name='name'
                                value={user.name}
                                onChange={handleChange}
                                error={errors.name}
                            />
                            <TextField
                                label='Электронная почта'
                                name='email'
                                value={user.email}
                                onChange={handleChange}
                                error={errors.email}
                            />
                            <SelectField
                                label='Выбери свою профессию'
                                name='profession'
                                defaultOption='Choose...'
                                value={user.profession.name}
                                options={professions}
                                onChange={handleChange}
                            />
                            <RadioField
                                options={[
                                    { name: 'Мужской', value: 'male' },
                                    { name: 'Женский', value: 'female' }
                                ]}
                                name='sex'
                                label='Выберите пол'
                                value={user.sex}
                                onChange={handleChange}
                            />
                            <MultiSelectField
                                name='qualities'
                                label='Выберите качества'
                                options={qualities}
                                onChange={handleChange}
                                defaultValue={transformedQualities}
                            />
                            <div className='d-flex justify-content-between'>
                                <button
                                    type='submit'
                                    className='btn btn-primary'
                                    onClick={() => navigate(-1)}
                                >
                                    <i className='bi bi-caret-left'></i>
                                    Назад
                                </button>
                                <button
                                    type='submit'
                                    className='btn btn-primary w-50 mx-6'
                                >
                                    Обновить
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
