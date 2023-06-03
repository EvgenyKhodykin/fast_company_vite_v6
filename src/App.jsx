import { React } from 'react'
import { Routes, Route } from 'react-router-dom'
import { MainLayout, LoginLayout, UsersLayout } from './layouts'
import MainPage from './components/UI/MainPage'
import { ToastContainer } from 'react-toastify'
import ProfessionsProvider from './hooks/useProfessions'
import QualitiesProvider from './hooks/useQualities'

function App() {
    return (
        <>
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
                            <Route
                                path='users/:userId?/:edit?'
                                element={<UsersLayout />}
                            />
                        </Route>
                    </Routes>
                </QualitiesProvider>
            </ProfessionsProvider>
            <ToastContainer />
        </>
    )
}

export default App
