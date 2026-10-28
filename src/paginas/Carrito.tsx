import { useState } from 'react'
import { Link } from 'react-router-dom'
import CardCarrito from '../componentes/moleculas/CardCarrito'
import ResumenCarrito from '../componentes/moleculas/ResumenCarrito'

interface ItemCarrito {
    id: string;
    nombre: string;
    precio: number;
    precioOriginal?: number;
    cantidad: number;
    imagen: string;
}

function Carrito() {

    // Carga el carrito desde la memoria del navegador
    const [carrito, setCarrito] = useState<ItemCarrito[]>(() => {
        const guardado = localStorage.getItem('carritoFerreteria')
        return guardado ? JSON.parse(guardado) : []
    })

    // Suma o resta cantidad; si llega a 0, el producto se elimina
    const cambiarCantidad = (index: number, cambio: number) => {
        const nuevoCarrito = [...carrito]
        nuevoCarrito[index] = { ...nuevoCarrito[index], cantidad: nuevoCarrito[index].cantidad + cambio }

        if (nuevoCarrito[index].cantidad <= 0) {
            nuevoCarrito.splice(index, 1)
        }

        localStorage.setItem('carritoFerreteria', JSON.stringify(nuevoCarrito))
        setCarrito(nuevoCarrito)
    }

    // Calcula el total
    let total = 0
    carrito.forEach((producto) => {
        total += producto.precio * producto.cantidad
    })

    // Botón pagar no habilitado por ahora
    const pagar = () => {
        if (carrito.length === 0) {
            alert("No tienes productos en el carrito para pagar.")
            return
        }
        alert("Botón no habilitado por el momento.")
    }

    return (
        <div className="container my-5">

            <h2>Mi carrito de compras</h2>

            <div className="row g-5">

                {/* COLUMNA IZQUIERDA: LISTA DE PRODUCTOS */}
                <div className="col-lg-8">
                    <div className="d-flex flex-column gap-3">

                        {carrito.length === 0 && (
                            <div className="text-center py-5 bg-white rounded shadow-sm border">
                                <h4 className="text-muted fw-bold">Tu carrito está vacío</h4>
                                <p className="text-muted mb-4">¡Explora nuestro catálogo y añade lo que necesites para tus proyectos!</p>
                                <Link to="/productos" className="btn btn-dark fw-bold">Ir al Catálogo</Link>
                            </div>
                        )}

                        {carrito.map((p, index) => (
                            <CardCarrito
                                key = {p.id}
                                id = {p.id}
                                nombre = {p.nombre}
                                precio = {p.precio}
                                precioOriginal = {p.precioOriginal}
                                cantidad = {p.cantidad}
                                imagen = {p.imagen}
                                alSumar = {() => cambiarCantidad(index, 1)}
                                alRestar = {() => cambiarCantidad(index, -1)}
                            />
                        ))}

                    </div>
                </div>

                {/* COLUMNA DERECHA: RESUMEN Y PAGO */}
                <div className="col-lg-4">
                    <ResumenCarrito total={total} alPagar={pagar} />
                </div>

            </div>
        </div>
    )
}

export default Carrito