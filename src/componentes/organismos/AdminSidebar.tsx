import { Link, NavLink, useNavigate } from 'react-router-dom'

const enlaces = [
    { texto: 'Dashboard', ruta: '/admin', icono: 'bi-speedometer2', exacto: true },
    { texto: 'Órdenes', ruta: '/admin/ordenes', icono: 'bi-cart3' },
    { texto: 'Productos', ruta: '/admin/productos', icono: 'bi-box-seam' },
    { texto: 'Categorías', ruta: '/admin/categorias', icono: 'bi-tags' },
    { texto: 'Usuarios', ruta: '/admin/usuarios', icono: 'bi-people' },
    { texto: 'Reportes', ruta: '/admin/reportes', icono: 'bi-bar-chart-line' },
    { texto: 'Perfil', ruta: '/admin/perfil', icono: 'bi-person' }
]

function AdminSidebar() {

    const navigate = useNavigate()

    const cerrarSesion = () => {
        localStorage.removeItem('usuarioActivo')
        navigate('/login')
    }

    return (
        <aside className="admin-sidebar">

            {/* Logo + nombre, igual que en la Navbar de la tienda */}
            <Link to="/admin" className="d-flex align-items-center text-white text-decoration-none mb-4">
                <img src="/img/Solo_Logo_Barra.png" className="img-logo-barra me-2" alt="Logo Ferretería" />
                <span className="fw-bold">Los Maestros</span>
            </Link>

            {/* NavLink agrega solo la clase "active" a la página actual */}
            <nav className="nav flex-column gap-1">
                {enlaces.map(e => (
                    <NavLink key={e.ruta} to={e.ruta} end={e.exacto} className="nav-link">
                        <i className={`bi ${e.icono}`}></i>
                        {e.texto}
                    </NavLink>
                ))}
            </nav>

            <div className="mt-auto d-grid gap-2">
                <Link to="/" className="btn btn-outline-light">Tienda</Link>
                <button className="btn btn-danger" onClick={cerrarSesion}>Cerrar sesión</button>
            </div>

        </aside>
    )
}

export default AdminSidebar