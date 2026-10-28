import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import AdminSidebar from '../../componentes/organismos/AdminSidebar'

function AdminLayout() {

    const navigate = useNavigate()

    // Revisa quién inició sesión
    const guardado = localStorage.getItem('usuarioActivo')
    const usuario = guardado ? JSON.parse(guardado) : null
    const esAdmin = usuario !== null && usuario.rol === 'Administrador'

    // Si no es administrador, lo devuelve al inicio
    useEffect(() => {
        if (!esAdmin) {
            navigate('/')
        }
    }, [esAdmin, navigate])

    if (!esAdmin) {
        return null
    }

    return (
        <div className="admin-layout">

            <AdminSidebar />

            <main className="admin-main">

                <div className="admin-topbar">
                    <span className="text-muted">Panel de administración</span>
                    <span className="fw-semibold">{usuario.nombre || usuario.correo}</span>
                </div>

                {/* Aquí se muestra la página elegida en la barra lateral */}
                <div className="p-4">
                    <Outlet />
                </div>

            </main>

        </div>
    )
}

export default AdminLayout
