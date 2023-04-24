import React, { useState } from 'react'
import TextField from '../components/TextField'

function LoginLayout() {
    const [data, setData] = useState({ email: '', password: '' })

    const handleChange = ({ target }) => {
        setData(prevState => ({ ...prevState, [target.name]: target.value }))
    }

    return (
        <form action=''>
            <TextField
                label='Email'
                name='email'
                value={data.email}
                onChange={handleChange}
            />
            <TextField
                label='Пароль'
                type='password'
                name='password'
                value={data.password}
                onChange={handleChange}
            />
        </form>
    )
}

export default LoginLayout
