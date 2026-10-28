import Boton from '../atomos/Boton'

interface CardProps {
    id: string;
    titulo: string;
    precio: number;
    precioOferta?: number;   // opcional: solo si el producto está en oferta
    imagen: string;
}

function CardProducto({ id, titulo, precio, precioOferta, imagen }: CardProps) {

    // Porcentaje de descuento (solo si hay oferta)
    
    const descuento = precioOferta ? Math.round((1 - precioOferta / precio) * 100) : 0

    return (
        <div className="col">

            <div className="card h-100 text-center position-relative">

                {/* Insignia de descuento, solo si está en oferta */}
                {precioOferta && (
                    <span className="badge bg-danger position-absolute top-0 start-0 m-2 fs-6">
                        -{descuento}%
                    </span>
                )}

                <img
                    src={imagen}
                    className="card-img-top p-2 img-card-producto"
                    alt={titulo}
                />

                <div className="card-body d-flex flex-column">

                    <h5 className="card-title titulo-card-producto">
                        {titulo}
                    </h5>

                    {precioOferta ? (
                        <>
                            <p className="card-text mb-1">
                                <span className="text-muted text-decoration-line-through">
                                    ${precio.toLocaleString('es-CL')}
                                </span>
                            </p>
                            <p className="card-text fw-bold fs-5 text-danger">
                                ${precioOferta.toLocaleString('es-CL')}
                            </p>
                        </>
                    ) : (
                        <p className="card-text fs-5">
                            ${precio.toLocaleString('es-CL')}
                        </p>
                    )}

                    {/* Empuja el botón hacia abajo para alinear todos los botones */}
                    <div className="mt-auto">
                        <Boton id={id} />
                    </div>

                </div>

            </div>

        </div>
    )
}

export default CardProducto