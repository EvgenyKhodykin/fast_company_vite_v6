import { React } from 'react'
import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import LoginLayout from './layouts/LoginLayout'
import UsersLayout from './layouts/UsersLayout'
import MainPage from './components/page/MainPage'

function App() {
    return (
        <>
            <Routes>
                <Route
                    path='/'
                    element={<MainLayout />}
                >
                    <Route
                        index
                        element={<MainPage />}
                    />
                    <Route
                        path='login'
                        element={<LoginLayout />}
                    />
                    <Route
                        path='users/:userId?'
                        element={<UsersLayout />}
                    />
                </Route>
            </Routes>
        </>
    )
}

export default App
