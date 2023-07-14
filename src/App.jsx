import { React } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import { MainLayout, LoginLayout, UsersLayout, LogOut } from './layouts'
import { MainPage } from './components/pages'
import { ToastContainer } from 'react-toastify'
import AuthProvider from './hooks/useAuth'
import ProtectedRoutes from './components/common/ProtectedRoutes'
import AppLoader from './components/UI/hoc/AppLoader'
import { history } from './utils/history'

function App() {
    history.navigate = useNavigate()
    history.location = useLocation()

    return (
        <>
            <AppLoader>
                <AuthProvider>
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
                </AuthProvider>
            </AppLoader>
            <ToastContainer />
        </>
    )
}

export default App
