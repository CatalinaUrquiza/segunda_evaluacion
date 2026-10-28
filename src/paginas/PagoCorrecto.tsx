import { Link, Navigate } from 'react-router-dom'
import DetallePedido from '../componentes/organismos/DetallePedido'
import { obtenerUltimoPedido } from '../utils/carrito'
import type { Pedido } from '../utils/tipos'

function PagoCorrecto() {

    const pedido: Pedido | null = obtenerUltimoPedido()

    // Esta pantalla solo se muestra después de una compra exitosa
    if (!pedido || pedido.estado !== "exitoso") {
        return <Navigate to="/" replace />
    }

    // Simulación: no hay servidor de correo
    const enviarBoleta = () => {
        alert(`Boleta enviada a ${pedido.cliente.correo}`)
    }

    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-lg-9">

                    <div className="bg-white p-4 rounded shadow-sm border">

                        <p className="text-end text-muted small mb-1">Código orden: {pedido.codigoOrden}</p>

                        <h4 className="fw-bold text-success">
                            <i className="bi bi-check-circle me-2"></i>
                            Se ha realizado la compra. nro #{pedido.numero}
                        </h4>
                        <small className="text-muted">Gracias por tu compra, te enviaremos tus productos a la dirección indicada.</small>

                        <DetallePedido pedido={pedido} etiquetaTotal="Total pagado" />

                        <div className="d-flex justify-content-center gap-2 flex-wrap d-print-none">
                            <button className="btn btn-danger" onClick={() => window.print()}>
                                Imprimir boleta en PDF
                            </button>
                            <button className="btn btn-success" onClick={enviarBoleta}>
                                Enviar boleta por email
                            </button>
                            <Link to="/productos" className="btn btn-outline-dark">
                                Seguir comprando
                            </Link>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default PagoCorrecto
