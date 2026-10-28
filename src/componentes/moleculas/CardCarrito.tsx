interface CardCarritoProps {
    id: string;
    nombre: string;
    precio: number;
    precioOriginal?: number;
    cantidad: number;
    imagen: string;
    alSumar: () => void;
    alRestar: () => void;
}

function CardCarrito({ id, nombre, precio, precioOriginal, cantidad, imagen, alSumar, alRestar }: CardCarritoProps) {

    return (
        <div className="card shadow-sm border border-secondary">
            <div className="row g-0 align-items-center p-3">

                {/* Imagen a la izquierda */}
                <div className="col-4 col-md-3 text-center border-end pe-3">
                    <img
                        src={imagen}
                        className="img-fluid rounded img-carrito-miniatura"
                        alt={nombre}
                    />
                </div>

                {/* Textos y controles */}
                <div className="col-8 col-md-9">
                    <div className="card-body p-0 ps-3">
                        <div className="d-flex justify-content-between align-items-start flex-wrap">

                            <div className="mb-2 mb-md-0 col-12 col-md-7">
                                <h5 className="card-title fw-bold m-0 fs-6">{nombre}</h5>
                                <small className="text-muted">Cod: {id}</small>
                            </div>

                            <div className="d-flex flex-column align-items-end col-12 col-md-5 mt-2 mt-md-0">
                                {precioOriginal && (
                                    <div className="d-flex align-items-center gap-2">
                                        <span className="badge bg-danger">Oferta</span>
                                        <span className="text-muted text-decoration-line-through">
                                            ${precioOriginal.toLocaleString('es-CL')}
                                        </span>
                                    </div>
                                )}
                                <p className={`fw-bold mb-2 fs-5 ${precioOriginal ? 'text-danger' : 'text-dark'}`}>
                                    ${precio.toLocaleString('es-CL')}
                                </p>

                                <div className="input-group input-group-sm ancho-cantidad">
                                    <button className="btn btn-outline-dark fw-bold" type="button" onClick={alRestar}>
                                        -
                                    </button>
                                    <input
                                        type="text"
                                        className="form-control text-center fw-bold bg-white"
                                        value={cantidad}
                                        readOnly
                                    />
                                    <button className="btn btn-outline-dark fw-bold" type="button" onClick={alSumar}>
                                        +
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default CardCarrito