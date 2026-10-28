import { useSearchParams } from 'react-router-dom'
import CardProducto from '../componentes/moleculas/CardProducto'
import { obtenerProductos } from '../datos/productos'

// Nombre que se muestra como título para cada categoría
const titulosCategorias: { [categoria: string]: string } = {
    construccion: "Materiales de Construcción",
    pinturas: "Pinturas",
    herramientas: "Herramientas",
    gasfiteria: "Gasfitería",
    electricidad: "Electricidad",
    tornilleria: "Tornillería",
    madera: "Madera",
    seguridad: "Seguridad",
    jardin: "Jardín"
}

function Productos() {

    const productos = obtenerProductos()

    // Lee la categoría de la URL (por ejemplo /productos?cat=pinturas)
    const [params] = useSearchParams()
    const categoria = params.get("cat")

    // Título según la categoría
    const titulo = categoria && titulosCategorias[categoria] ? titulosCategorias[categoria] : "Productos"

    // Si hay categoría, se filtra; si no, se muestran todos
    const lista = categoria
        ? productos.filter(p => p.categoria === categoria)
        : productos

    return (
        <div className="container mt-4">

            <h2>{titulo}</h2>

            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">

                {lista.map(p => (
                    <CardProducto
                        key={p.id}
                        id={p.id}
                        titulo={p.nombre}
                        precio={p.precio}
                        precioOferta={p.precioOferta}
                        imagen={p.imagen}
                    />
                ))}

            </div>

        </div>
    )
}

export default Productos