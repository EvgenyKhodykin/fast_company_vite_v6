import { React, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { MainLayout, LoginLayout, UsersLayout, LogOut } from './layouts'
import { MainPage } from './components/pages'
import { ToastContainer } from 'react-toastify'
import ProfessionsProvider from './hooks/useProfessions'
import 'react-toastify/dist/ReactToastify.css'
import AuthProvider from './hooks/useAuth'
import ProtectedRoutes from './components/common/ProtectedRoutes'
import { useDispatch } from 'react-redux'
import { loadQualitiesList } from './store/qualities'

function App() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadQualitiesList())
    }, [])

    return (
        <>
            <AuthProvider>
                <ProfessionsProvider>
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
                            <Route element={<ProtectedRoutes />}>
                                <Route
                                    path='users/:userId?/:edit?'
                                    element={<UsersLayout />}
                                />
                            </Route>
                            <Route
                                path='logout'
                                element={<LogOut />}
                            />
                        </Route>
                    </Routes>
                </ProfessionsProvider>
            </AuthProvider>
            <ToastContainer />
        </>
    )
}

export default App
