import { React } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { MainLayout, LoginLayout, UsersLayout, LogOut } from './layouts'
import { MainPage } from './components/pages'
import ProtectedRoutes from './components/common/ProtectedRoutes'
import AppLoader from './components/UI/hoc/AppLoader'

function App() {
    return (
        <>
            <AppLoader>
                <Routes>
                    <Route path='/' element={<MainLayout />}>
                        <Route index element={<MainPage />} />
                    </Route>
                    <Route path='login' element={<LoginLayout />} />
                    <Route element={<ProtectedRoutes />}>
                        <Route path='users/:userId?/:edit?' element={<UsersLayout />} />
                    </Route>
                    <Route path='logout' element={<LogOut />} />
                    <Route path='*' element={<Navigate to='/' />} />
                </Routes>
            </AppLoader>
            <ToastContainer />
        </>
    )
}

export default App
