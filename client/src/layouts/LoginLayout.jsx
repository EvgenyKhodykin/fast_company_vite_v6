import React, { useState } from 'react'
import LoginForm from '../components/UI/LoginForm'
import { useParams } from 'react-router-dom'
import RegisterForm from '../components/UI/RegisterForm'
import NavBar from '../components/UI/NavBar'

export function LoginLayout() {
    const { type } = useParams()
    const [formType, setFormType] = useState(type === 'register' ? type : 'login')

    const toggleFormType = () => {
        setFormType(prevState => (prevState === 'register' ? 'login' : 'register'))
    }

    return (
        <>
            <NavBar />
            <div className='container mt-5'>
                <div className='row '>
                    <div className='col-md-6 offset-md-3 shadow p-4'>
                        {formType === 'register' ? (
                            <>
                                <h3 className='mb-4'>Register</h3>
                                <RegisterForm />
                                <p className='mt-4'>
                                    Already have an account?{' '}
                                    <a role='button' onClick={toggleFormType}>
                                        Sign In
                                    </a>
                                </p>
                            </>
                        ) : (
                            <>
                                <h3 className='mb-4'>Login</h3>
                                <LoginForm />
                                <p className='mt-4'>
                                    Do not have an account?{' '}
                                    <a role='button' onClick={toggleFormType}>
                                        Sign Up
                                    </a>
                                </p>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}
