import Boton from '../atomos/Boton'

interface CardProps {
    id: string;
    titulo: string;
    precio: number;
    imagen: string;
}

function CardProducto({ id, titulo, precio, imagen }: CardProps) {

    return (
        <div className="col">

            <div className="card h-100 text-center">

                <img
                    src={imagen}
                    className="card-img-top p-2"
                    alt={titulo}
                    style={{ height: '200px', objectFit: 'contain' }}
                />

                <div className="card-body d-flex flex-column">

                    <h5
                        className="card-title"
                        style={{ minHeight: '84px' }}
                    >
                        {titulo}
                    </h5>

                    <p className="card-text">
                        ${precio}
                    </p>

                    <div className="mt-auto">
                        <Boton id={id} />
                    </div>

                </div>

            </div>

        </div>
    )
}

export default CardProducto