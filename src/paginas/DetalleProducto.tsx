import { useParams } from 'react-router-dom'
import BotonVolver from '../componentes/atomos/BotonVolver'

const productos = [
    {
        id: "1",
        titulo: "Notebook",
        descripcion: "Notebook ideal para estudiar y trabajar.",
        precio: 400990,
        imagen: "/img/notebook.webp"

    },
    {
        id: "2",
        titulo: "Mouse",
        descripcion: "Mouse inalámbrico.",
        precio: 19990,
        imagen: "/img/mouse.jpg"

    },
    {
        id: "3",
        titulo: "Teclado",
        descripcion: "Teclado mecánico.",
        precio: 39990,
        imagen: "/img/teclado.jpg"

    },
    {
        id: "4",
        titulo: "Audífonos",
        descripcion: "Audífonos inalámbricos",
        precio: 44490,
        imagen: "/img/audifonos.png"

    }

]

function DetalleProducto(){

    // Obtenemos el ID que viene de la URL
    const { id } = useParams()

    // Buscamos el producto que corresponde al ID recibido
    const producto = productos.find(
        producto => producto.id === id
    )

    return (
        <div>
            <h1>Detalle del producto</h1>

            <img
                src = {producto?.imagen}
                alt = {producto?.titulo}
                style = {{ width: '300px '}}
            />

            <h2>{producto?.titulo}</h2>
            <p>{producto?.descripcion}</p>
            <p>{producto?.precio}</p>

            <BotonVolver />

        </div>

    )
    
}

export default DetalleProducto