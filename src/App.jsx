import { React } from 'react'
import { Routes, Route } from 'react-router-dom'
import { MainLayout, LoginLayout, UsersLayout } from './layouts'
import { UserPageEdit } from './components/page/userPage'
import MainPage from './components/UI/MainPage'

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
                        path='login/:type?'
                        element={<LoginLayout />}
                    />
                    <Route
                        path='users/:userId?'
                        element={<UsersLayout />}
                    />
                    <Route
                        path='users/:userId/edit'
                        element={<UserPageEdit />}
                    />
                </Route>
            </Routes>
        </>
    )
}

export default App
