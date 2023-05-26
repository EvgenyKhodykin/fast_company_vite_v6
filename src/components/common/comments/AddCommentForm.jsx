import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'
import validator from '../../../utils/validator'

function AddCommentForm({ users, onSubmit }) {
    const { userId } = useParams()

    const [comment, setComment] = useState({
        userId: '',
        content: '',
        pageId: userId
    })
    const [textValue, setTextValue] = useState('')
    const [errors, setErrors] = useState({})

    const handleAuthorChange = ({ target }) => {
        setComment(prevState => ({
            ...prevState,
            [target.name]: target.value
        }))
    }

    const handleTextChange = ({ target }) => {
        setTextValue(target.value)
        setComment(prevState => ({
            ...prevState,
            [target.name]: target.value
        }))
    }

    const handleSubmit = event => {
        event.preventDefault()
        const isValid = validate()
        if (!isValid) return
        onSubmit(comment)
        setTextValue('')
        setErrors({})
    }

    const validatorConfig = {
        userId: {
            isRequired: {
                message: 'Выберите автора сообщения'
            }
        },
        content: {
            isRequired: {
                message: 'Сообщение не должно быть пустым'
            }
        }
    }

    const validate = () => {
        const errors = validator(comment, validatorConfig)
        setErrors(errors)
        return Object.keys(errors).length === 0
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <h2>New Comment</h2>
                <label
                    className='mt-4'
                    htmlFor='floatingTextarea2'
                >
                    Выберите автора сообщения
                </label>
                <select
                    className={
                        'form-select' + (errors.userId ? ' is-invalid' : '')
                    }
                    name='userId'
                    onChange={handleAuthorChange}
                >
                    <option></option>
                    {users.map(user => (
                        <option
                            key={user._id}
                            value={user._id}
                        >
                            {user.name}
                        </option>
                    ))}
                </select>
                {errors.userId && (
                    <div className='text-danger'>{errors.userId}</div>
                )}
                <label
                    className='mt-4'
                    htmlFor='floatingTextarea2'
                >
                    Сообщение
                </label>
                <div className='input-group'>
                    <textarea
                        className={
                            'form-control' +
                            (errors.content ? ' is-invalid' : '')
                        }
                        style={{ height: '90px' }}
                        name='content'
                        value={textValue}
                        onChange={handleTextChange}
                    />
                </div>
                {errors.content && (
                    <div className='text-danger'>{errors.content}</div>
                )}
                <button
                    className='btn btn-primary mt-4 float-end'
                    type='submit'
                >
                    Опубликовать
                </button>
            </form>
        </>
    )
}

AddCommentForm.propTypes = {
    users: PropTypes.array,
    onSubmit: PropTypes.func
}

export default AddCommentForm
