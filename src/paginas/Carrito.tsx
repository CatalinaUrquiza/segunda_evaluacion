import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CardCarrito from '../componentes/moleculas/CardCarrito'
import ResumenCarrito from '../componentes/moleculas/ResumenCarrito'
import { obtenerCarrito, cambiarCantidad, quitarProducto, vaciarCarrito, calcularTotal } from '../utils/carrito'
import type { ItemCarrito } from '../utils/tipos'

function Carrito() {

    const navigate = useNavigate()

    // Carga el carrito desde la memoria del navegador
    const [carrito, setCarrito] = useState<ItemCarrito[]>(obtenerCarrito)

    // Calcula el total
    const total = calcularTotal(carrito)

    // Vacía todo el carrito (pide confirmación)
    const limpiar = () => {
        if (carrito.length === 0) return
        if (confirm("¿Quieres vaciar el carrito?")) {
            setCarrito(vaciarCarrito())
        }
    }

    // Lleva a la pantalla de compra
    const comprar = () => {
        if (carrito.length === 0) {
            alert("No tienes productos en el carrito para pagar.")
            return
        }
        navigate("/checkout")
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

                        {carrito.map((p) => (
                            <CardCarrito
                                key = {p.id}
                                id = {p.id}
                                nombre = {p.nombre}
                                precio = {p.precio}
                                precioOriginal = {p.precioOriginal}
                                cantidad = {p.cantidad}
                                imagen = {p.imagen}
                                alSumar = {() => setCarrito(cambiarCantidad(p.id, 1))}
                                alRestar = {() => setCarrito(cambiarCantidad(p.id, -1))}
                                alEliminar = {() => setCarrito(quitarProducto(p.id))}
                            />
                        ))}

                    </div>
                </div>

                {/* COLUMNA DERECHA: RESUMEN Y PAGO */}
                <div className="col-lg-4">
                    <ResumenCarrito total={total} alPagar={comprar} alLimpiar={limpiar} />
                </div>

            </div>
        </div>
    )
}

export default Carrito
