import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'
import validator from '../../../utils/validator'

function AddCommentForm({ users, onSubmit }) {
    const { userId } = useParams()
    const defaultSelectValue = '0'
    const initialComment = { userId: '', content: '', pageId: userId }

    const [comment, setComment] = useState(initialComment)
    const [textValue, setTextValue] = useState('')
    const [selectValue, setSelectValue] = useState(defaultSelectValue)
    const [errors, setErrors] = useState({})

    const handleAuthorChange = ({ target }) => {
        setSelectValue(target.value)
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
        setSelectValue(defaultSelectValue)
        setTextValue('')
        setErrors({})
        setComment(initialComment)
    }

    const validatorConfig = {
        userId: {
            isRequired: {
                message: 'Message author is required'
            }
        },
        content: {
            isRequired: {
                message: 'Message field is required'
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
            <h2>New Comment</h2>
            <form onSubmit={handleSubmit}>
                <label
                    className='mt-4'
                    htmlFor='floatingTextarea2'
                >
                    Select a message author
                </label>
                <select
                    className={
                        'form-select' + (errors.userId ? ' is-invalid' : '')
                    }
                    name='userId'
                    value={selectValue}
                    onChange={handleAuthorChange}
                >
                    <option value='0'></option>
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
                    Message
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
                    Create
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
