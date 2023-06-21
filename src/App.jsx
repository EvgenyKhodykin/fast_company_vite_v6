import { React } from 'react'
import { Routes, Route } from 'react-router-dom'
import { MainLayout, LoginLayout, UsersLayout } from './layouts'
import MainPage from './components/UI/MainPage'
import { ToastContainer } from 'react-toastify'
import ProfessionsProvider from './hooks/useProfessions'
import QualitiesProvider from './hooks/useQualities'
import 'react-toastify/dist/ReactToastify.css'
import AuthProvider from './hooks/useAuth'
import ProtectedRoutes from './components/common/ProtectedRoutes'

function App() {
    return (
        <>
            <AuthProvider>
                <ProfessionsProvider>
                    <QualitiesProvider>
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
                            </Route>
                        </Routes>
                    </QualitiesProvider>
                </ProfessionsProvider>
            </AuthProvider>
            <ToastContainer />
        </>
    )
}

export default App
