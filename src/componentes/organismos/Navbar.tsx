import { Link } from 'react-router-dom'

function Navbar() {

    return(

        <nav className = "navbar navbar-expand bg-dark">

            <div className = "container">
                <Link
                    className="navbar-brand text-white d-flex align-items-center"
                    to="/"
                >
                <img
                    src="/img/Solo_Logo_Barra.png"
                    className="img-logo-barra me-2"
                    alt="Logo Ferretería"
                />
                    Ferretería Los Maestros
                </Link>

                <div className = "navbar-nav">

                    <Link className = "nav-link text-white" to = "/">
                        Inicio
                    </Link>

                    <Link className = "nav-link text-white" to = "/productos">
                        Productos
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

                    <Link className = "nav-link text-white" to = "/login">
                        Login
                    </Link>
                
                </div>

            </div>
        
        </nav>

    )   
}

export default Navbar