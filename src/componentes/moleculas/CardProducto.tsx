import { useSearchParams } from 'react-router-dom'
import Boton from '../atomos/Boton'

interface CardProps {
    id: string;
    titulo: string;
    precio: number;
    imagen: string;
}

// Prefijos de ID que pertenecen a cada categoría
const categorias: { [categoria: string]: string[] } = {
    construccion: ["MC"],
    pinturas: ["PT"],
    herramientas: ["HM", "HE"],
    gasfiteria: ["GS"],
    electricidad: ["EL"],
    tornilleria: ["TR"],
    madera: ["MD"],
    seguridad: ["SE"],
    jardin: ["JA"]
}

function CardProducto({ id, titulo, precio, imagen }: CardProps) {

    // Lee la categoría de la URL (por ejemplo /productos?cat=pinturas)
    const [params] = useSearchParams()
    const categoria = params.get("cat")

    // Si hay una categoría válida y este producto no es de ella, no se muestra
    if (categoria && categorias[categoria] && !categorias[categoria].includes(id.slice(0, 2))) {
        return null
    }

    return (
        <div className="col">

            <div className="card h-100 text-center">

                <img
                    src={imagen}
                    className="card-img-top p-2 img-card-producto"
                    alt={titulo}
                />

                <div className="card-body d-flex flex-column">

                    <h5 className="card-title titulo-card-producto">
                        {titulo}
                    </h5>

                    <p className="card-text">
                        ${precio}
                    </p>

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