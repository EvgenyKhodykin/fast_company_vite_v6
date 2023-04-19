import { React } from 'react'
import { Routes, Route } from 'react-router-dom'
import Main from './layouts/Main'
import Login from './layouts/Login'
import Users from './layouts/Users'
import MainPage from './components/MainPage'

function App() {
    return (
        <>
            <Routes>
                <Route path='/' element={<Main />}>
                    <Route index element={<MainPage />} />
                    <Route path='login' element={<Login />} />
                    <Route path='users/:userId?' element={<Users />} />
                </Route>
            </Routes>
        </>
    )
}

export default App
