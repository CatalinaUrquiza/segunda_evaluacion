import CardProducto from '../componentes/moleculas/CardProducto'
import { obtenerProductos } from '../datos/productos'

function Ofertas() {

    const productos = obtenerProductos()

    // Solo los productos que tienen precio de oferta
    const enOferta = productos.filter(p => p.precioOferta)

    return (
        <div className="container mt-4">

            <h2>Ofertas</h2>

            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">

                {enOferta.map(p => (
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

export default Ofertas