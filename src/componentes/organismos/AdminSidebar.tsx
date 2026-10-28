import { Link, NavLink, useNavigate } from 'react-router-dom'

function AdminSidebar() {

    const navigate = useNavigate()

    const cerrarSesion = () => {
        localStorage.removeItem('usuarioActivo')
        navigate('/login')
    }

    return (
        <aside className="admin-sidebar">

            {/* Logo + nombre, igual que en la Navbar de la tienda /}
            <Link to="/admin" className="d-flex align-items-center text-white text-decoration-none mb-4">
                <img src="/img/Solo_Logo_Barra.png" className="img-logo-barra me-2" alt="Logo Ferretería" />
                <span className="fw-bold">Los Maestros</span>
            </Link>

            {/ NavLink agrega solo la clase "active" a la página actual */}
            <nav className="nav flex-column gap-1">
                <NavLink end to="/admin" className="nav-link">Dashboard</NavLink>
                <NavLink to="/admin/productos" className="nav-link">Productos</NavLink>
            </nav>

            <div className="mt-auto d-grid gap-2">
                <Link to="/" className="btn btn-outline-light">Tienda</Link>
                <button className="btn btn-danger" onClick={cerrarSesion}>Cerrar sesión</button>
            </div>

        </aside>
    )
}

export default AdminSidebar