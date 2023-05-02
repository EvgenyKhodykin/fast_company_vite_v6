import { React, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import API from '../../../api'
import TextField from '../../common/form/TextField'
import SelectField from '../../common/form/SelectField'
import RadioField from '../../common/form/RadioField'
import MultiSelectField from '../../common/form/MultiSelectField'
import Loading from '../../UI/Loading'

export function UserPageEdit() {
    const [users, setUsers] = useState()
    const { userId } = useParams()
    console.log(users, userId)

    useEffect(() => {
        API.users.fetchAll().then(data => setUsers(data))
    }, [])

    if (users) {
        return (
            <div className='container mt-5'>
                <div className='row '>
                    <div className='col-md-6 offset-md-3 shadow p-4'>
                        <TextField
                            label='Имя'
                            name='name'
                        />
                        <TextField
                            label='Электронная почта'
                            name='email'
                        />
                        <SelectField
                            label='Выбери свою профессию'
                            name='profession '
                        />
                        <RadioField
                            options={[
                                { name: 'Мужской', value: 'male' },
                                { name: 'Женский', value: 'female' }
                            ]}
                            name='sex'
                            label='Выберите пол'
                        />
                        <MultiSelectField
                            name='qualities'
                            label='Выберите качества'
                        />
                        <button className='btn btn-primary w-100 mx-auto'>
                            Обновить
                        </button>
                    </div>
                </div>
            </div>
        )
    }
    return <Loading />
}
