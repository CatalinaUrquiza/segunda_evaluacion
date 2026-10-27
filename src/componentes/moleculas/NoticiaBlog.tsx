import { useState } from 'react'

interface NoticiaProps {
    titulo: string;
    resumen: string;
    imagen: string;
    tituloDetalle: string;
    detalle: string;
}

function NoticiaBlog({ titulo, resumen, imagen, tituloDetalle, detalle }: NoticiaProps) {

    // Controla si el detalle está abierto o cerrado
    const [abierto, setAbierto] = useState(false)

    return (
        <div className="bg-white p-4 p-md-5 rounded shadow-sm mb-5 border">

            <div className="row align-items-center">

                {/* Textos a la izquierda */}
                <div className="col-md-6 order-2 order-md-1 mt-4 mt-md-0">

                    <h3 className="fw-bold text-uppercase">
                        {titulo}
                    </h3>

                    <p className="text-muted">
                        {resumen}
                    </p>

                    {/* Botón que despliega el detalle */}
                    <button
                        className="btn btn-outline-dark text-uppercase mt-3 fw-bold rounded-0"
                        type="button"
                        onClick={() => setAbierto(!abierto)}
                        style={{ borderWidth: '2px' }}
                    >
                        Ver Caso {abierto ? '▲' : '▼'}
                    </button>

                </div>

                {/* Imagen a la derecha */}
                <div className="col-md-6 order-1 order-md-2">
                    <img
                        src={imagen}
                        className="img-fluid rounded"
                        style={{ width: '100%', height: '350px', objectFit: 'cover' }}
                        alt="Imagen No Disponible"
                    />
                </div>

            </div>

            {/* Texto que se despliega */}
            {abierto && (
                <div className="mt-4">
                    <div className="card card-body bg-light border-0 p-4">
                        <h4 className="fw-bold mb-3">{tituloDetalle}</h4>
                        <p>{detalle}</p>
                    </div>
                </div>
            )}

        </div>
    )
}

export default NoticiaBlog