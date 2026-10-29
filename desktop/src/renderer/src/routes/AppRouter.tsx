import { HashRouter, Route, Routes } from 'react-router-dom'
import { ROUTES } from './routePaths'
import Login from '@renderer/pages/Login'

export default function AppRouter(): React.JSX.Element {
  return (
    <HashRouter>
      <Routes>
        <Route path={ROUTES.LOGIN} element={<Login/>} />
        <Route path={ROUTES.DASHBOARD} element={<div>Dashboard</div>} />
        <Route path={ROUTES.PROJECTS} element={<div>Proyectos</div>} />
        <Route path={ROUTES.ASSISTANT} element={<div>Asistente de IA</div>} />
        <Route path={ROUTES.SETTINGS} element={<div>Configuracion</div>} />
      </Routes>
    </HashRouter>

  )
}
