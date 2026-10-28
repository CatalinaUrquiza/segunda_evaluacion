import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { obtenerCarrito, calcularTotal, suscribirCarrito } from '../../utils/carrito'

function Navbar() {

    const navigate = useNavigate()

    // Total del carrito; se actualiza solo cuando se añade, quita o cambia un producto
    const [total, setTotal] = useState(() => calcularTotal(obtenerCarrito()))

    useEffect(() => {
        return suscribirCarrito(() => setTotal(calcularTotal(obtenerCarrito())))
    }, [])

    // Quién tiene la sesión iniciada (se vuelve a leer cada vez que cambia la página)
    const guardado = localStorage.getItem('usuarioActivo')
    const usuario = guardado ? JSON.parse(guardado) : null
    const esAdmin = usuario !== null && usuario.rol === 'Administrador'

    // Solo el primer nombre, para que no ocupe tanto espacio
    const primerNombre = usuario
        ? (usuario.nombre ? usuario.nombre.trim().split(' ')[0] : usuario.correo)
        : ""

    const cerrarSesion = () => {
        localStorage.removeItem('usuarioActivo')
        navigate('/login')
    }

    return(

        <nav className = "navbar navbar-expand bg-dark">

            <div className = "container">
                <Link
                    className="navbar-brand text-white d-flex align-items-center text-nowrap"
                    to="/"
                >
                <img
                    src="/img/Solo_Logo_Barra.png"
                    className="img-logo-barra me-2"
                    alt="Logo Ferretería"
                />
                    Ferretería Los Maestros
                </Link>

                <div className = "navbar-nav align-items-center flex-nowrap text-nowrap">

                    <Link className = "nav-link text-white" to = "/">
                        Inicio
                    </Link>

                    <Link className = "nav-link text-white" to = "/productos">
                        Productos
                    </Link>

                    <Link className="nav-link text-white" to="/ofertas">
                        Ofertas
                    </Link>

                    <Link className = "nav-link text-white" to = "/quienesSomos">
                        Quiénes Somos
                    </Link>

                    <Link className = "nav-link text-white" to = "/blogs">
                        Blogs
                    </Link>

                    <Link className = "nav-link text-white" to = "/contacto">
                        Contacto
                    </Link>

                    {/* Si hay sesión: nombre, panel (solo admin) y cerrar sesión. Si no: Login */}
                    {usuario === null && (
                        <Link className = "nav-link text-white" to = "/login">
                            Login
                        </Link>
                    )}

                    {usuario !== null && (
                        <div className="d-flex align-items-center gap-2 ms-2">

                            <span className="text-white-50 small">
                                Hola, {primerNombre}
                            </span>

                            {esAdmin && (
                                <Link className = "btn btn-sm btn-panel" to = "/admin">
                                    Panel admin
                                </Link>
                            )}

                            <button className="btn btn-sm btn-outline-light" onClick={cerrarSesion}>
                                Salir
                            </button>

                        </div>
                    )}

                    <Link className="nav-link text-white d-flex align-items-center gap-2 ms-2" to="/carrito">
                        <img
                            src="/img/Carrito_Icono.png"
                            className="img-carrito"
                            alt="Carrito"
                        />
                        {total > 0 && (
                            <span className="badge bg-success">
                                ${total.toLocaleString('es-CL')}
                            </span>
                        )}
                    </Link>
                
                </div>

            </div>
        
        </nav>

    )   
}

export default Navbar