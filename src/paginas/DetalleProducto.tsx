import { useState } from 'react'
import { useParams } from 'react-router-dom'
import BotonVolver from '../componentes/atomos/BotonVolver'
import BotonAgregar from '../componentes/atomos/BotonAgregar'
import { obtenerProductos } from '../datos/productos'

function DetalleProducto() {

    const productos = obtenerProductos()

    // Obtenemos el ID que viene de la URL
    const { id } = useParams()

    // Cantidad que el usuario quiere agregar
    const [cantidad, setCantidad] = useState(1)

    // Buscamos el producto que corresponde al ID recibido
    const producto = productos.find(p => p.id === id)

    // Si el ID no existe, mostramos un aviso
    if (!producto) {
        return (
            <div className="container my-5 text-center">
                <h2>Producto no encontrado</h2>
                <BotonVolver />
            </div>
        )
    }

    // Precio final: el de oferta si existe, si no el normal
    const precioFinal = producto.precioOferta ?? producto.precio

    // Guarda el producto en el carrito (localStorage)
    const agregarAlCarrito = () => {
        const guardado = localStorage.getItem('carritoFerreteria')
        const carrito = guardado ? JSON.parse(guardado) : []

        // Si el producto ya está en el carrito, solo suma la cantidad
        const existente = carrito.find((item: { id: string }) => item.id === producto.id)

        if (existente) {
            existente.cantidad += cantidad
        } else {
            carrito.push({
                id: producto.id,
                nombre: producto.nombre,
                precio: precioFinal,
                precioOriginal: producto.precioOferta ? producto.precio : undefined,
                cantidad: cantidad,
                imagen: producto.imagen
            })
        }

        localStorage.setItem('carritoFerreteria', JSON.stringify(carrito))
        alert("Producto añadido al carrito")
    }

    return (
        <div className="container my-5">

            <div className="bg-white p-4 p-md-5 rounded shadow-sm">

                <div className="row align-items-center">

                    {/* Imagen a la izquierda */}
                    <div className="col-md-6 text-center mb-4 mb-md-0">
                        <img
                            src={producto.imagen}
                            alt={producto.nombre}
                            className="img-detalle-producto"
                        />
                    </div>

                    {/* Información a la derecha */}
                    <div className="col-md-6">

                        <p className="text-muted mb-1">Código: {producto.id}</p>

                        <h2 className="detalle-titulo">{producto.nombre}</h2>

                        {/* Si hay oferta, muestra el precio anterior tachado */}
                        {producto.precioOferta && (
                            <p className="text-muted text-decoration-line-through mb-0">
                                ${producto.precio.toLocaleString('es-CL')}
                            </p>
                        )}
                        <p className="precio-detalle">
                            ${precioFinal.toLocaleString('es-CL')}
                        </p>

                        <hr />

                        <h5 className="titulo-especificaciones">Especificaciones Técnicas:</h5>
                        <ul>
                            <li>Marca: {producto.marca}</li>
                            <li>Subcategoría: {producto.subcategoria}</li>
                            <li>Unidad de venta: {producto.unidad}</li>
                        </ul>

                        {/* Cantidad */}
                        <div className="d-flex align-items-center gap-3 my-4">
                            <label htmlFor="cantidad" className="fw-bold">Cantidad</label>
                            <input
                                type="number"
                                id="cantidad"
                                className="form-control ancho-cantidad-detalle"
                                min="1"
                                value={cantidad}
                                onChange={(e) => setCantidad(Math.max(1, Number(e.target.value)))}
                            />
                        </div>

                        <BotonAgregar alClick={agregarAlCarrito} />

                    </div>

                </div>

            </div>

            <div className="mt-4">
                <BotonVolver />
            </div>

        </div>
    )
}

export default DetalleProducto