import { Link } from 'react-router-dom'

interface CategoriaProps {
    titulo: string;
    imagen: string;
    categoria: string;
}

function CardCategoria({ titulo, imagen, categoria }: CategoriaProps) {

    return (
        <div className="col">
            <Link to={`/productos?cat=${categoria}`} className="text-decoration-none">
                <div className="card text-white border-0 shadow-sm categoria-card">

                    <img src={imagen} className="card-img" alt={titulo} />

                    <div className="card-img-overlay categoria-overlay d-flex flex-column justify-content-center align-items-center">
                        <h3 className="card-title fw-bold text-uppercase text-center text-white">
                            {titulo}
                        </h3>
                        <span className="btn btn-outline-light rounded-pill mt-3 px-4 fw-semibold border-2">
                            VER CATEGORÍA
                        </span>
                    </div>

                </div>
            </Link>
        </div>
    )
}

export default CardCategoria