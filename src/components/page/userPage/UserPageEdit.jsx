import { React, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import API from '../../../api'
import TextField from '../../common/form/TextField'
import SelectField from '../../common/form/SelectField'
import RadioField from '../../common/form/RadioField'
import MultiSelectField from '../../common/form/MultiSelectField'
import Loading from '../../UI/Loading'

export function UserPageEdit() {
    const [user, setUser] = useState({
        name: '',
        email: '',
        profession: '',
        sex: 'male',
        qualities: []
    })
    const [professions, setProfessions] = useState()
    const [qualities, setQualities] = useState()
    const { userId } = useParams()

    useEffect(() => {
        API.users.getById(userId).then(data => setUser(data))
        API.professions.fetchAll().then(data => setProfessions(data))
        API.qualities.fetchAll().then(data => setQualities(data))
    }, [])

    const handleChange = event => {
        setUser(prevState => ({
            ...prevState,
            [event.name]: event.value
        }))
    }

    if (user) {
        return (
            <div className='container mt-5'>
                <div className='row '>
                    <div className='col-md-6 offset-md-3 shadow p-4'>
                        <TextField
                            label='Имя'
                            name='name'
                            value={user.name}
                            onChange={handleChange}
                        />
                        <TextField
                            label='Электронная почта'
                            name='email'
                            value={user.email}
                            onChange={handleChange}
                        />
                        <SelectField
                            label='Выбери свою профессию'
                            name='profession'
                            defaultOption={user.profession.name}
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
                            defaultValue={user.qualities}
                        />
                        <button
                            className='btn btn-primary w-100 mx-auto'
                            disabled
                        >
                            Обновить
                        </button>
                    </div>
                </div>
            </div>
        )
    }
    return <Loading />
}
