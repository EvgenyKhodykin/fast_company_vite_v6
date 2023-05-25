import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'

function AddCommentForm({ users, onSubmit }) {
    const [comment, setComment] = useState({
        userId: '',
        content: '',
        pageId: ''
    })
    // const [commentAuthor, setCommentAuthor] = useState('Выберите пользователя')
    // const [textAreaValue, setTextAreaValue] = useState('')

    const { userId } = useParams()

    const handleChange = ({ target }) => {
        setComment(prevState => ({
            ...prevState,
            pageId: userId,
            [target.name]: target.value
        }))
    }

    const handleSubmit = event => {
        event.preventDefault()
        onSubmit(comment)
    }

    return (
        <>
            <h2>New Comment</h2>
            <form onSubmit={handleSubmit}>
                <select
                    className='form-select mt-4'
                    name='userId'
                    onChange={handleChange}
                >
                    <option value=''>Выберите пользователя</option>
                    {users.map(user => (
                        <option
                            key={user._id}
                            value={user._id}
                        >
                            {user.name}
                        </option>
                    ))}
                </select>

                <label
                    className='mt-4'
                    htmlFor='floatingTextarea2'
                >
                    Сообщение
                </label>
                <textarea
                    className='form-control'
                    style={{ height: '90px' }}
                    // value={textAreaValue}
                    name='content'
                    onChange={handleChange}
                ></textarea>
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
