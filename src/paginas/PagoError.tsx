import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import DetallePedido from '../componentes/organismos/DetallePedido'
import { obtenerUltimoPedido, procesarPago } from '../utils/carrito'
import type { Pedido } from '../utils/tipos'

function PagoError() {

    const navigate = useNavigate()

    const [pedido, setPedido] = useState<Pedido | null>(obtenerUltimoPedido)

    // Esta pantalla solo se muestra después de un pago fallido
    if (!pedido || pedido.estado !== "error") {
        return <Navigate to="/" replace />
    }

    // Vuelve a intentar el pago con los mismos datos
    const reintentar = () => {
        const nuevo: Pedido = procesarPago(pedido.cliente)

        if (nuevo.estado === "exitoso") {
            navigate("/pago-correcto")
        } else {
            setPedido(nuevo)
        }
    }

    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-lg-9">

                    <div className="bg-white p-4 rounded shadow-sm border">

                        <h4 className="fw-bold text-danger">
                            <i className="bi bi-x-circle me-2"></i>
                            No se pudo realizar el pago. nro #{pedido.numero}
                        </h4>
                        <small className="text-muted d-block mb-3">
                            {pedido.motivo} Tu carrito sigue guardado.
                        </small>

                        <div className="text-center mb-2 d-print-none">
                            <button className="btn btn-success btn-lg" onClick={reintentar}>
                                VOLVER A REALIZAR EL PAGO
                            </button>
                            <div className="mt-2">
                                <Link to="/carrito">Volver al carrito</Link>
                            </div>
                        </div>

                        <DetallePedido pedido={pedido} etiquetaTotal="Total a pagar" />

                    </div>

                </div>
            </div>
        </div>
    )
}

export default PagoError
