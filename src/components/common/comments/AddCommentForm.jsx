import React, { useState } from 'react'
import PropTypes from 'prop-types'
import validator from '../../../utils/validator'

function AddCommentForm({ onSubmit }) {
    const [comment, setComment] = useState({})
    const [textValue, setTextValue] = useState('')
    const [errors, setErrors] = useState({})

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
                {errors.userId && (
                    <div className='text-danger'>{errors.userId}</div>
                )}

                <div className='input-group mt-4'>
                    <textarea
                        className={
                            'form-control' +
                            (errors.content ? ' is-invalid' : '')
                        }
                        style={{ height: '101px' }}
                        placeholder='Your message...'
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
