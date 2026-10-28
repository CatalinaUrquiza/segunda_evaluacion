import { Link, useParams } from 'react-router-dom'
import { obtenerOrden } from '../../datos/ordenes'

function AdminBoleta() {

    const { numero } = useParams()
    const orden = obtenerOrden(Number(numero))

    if (!orden) {
        return (
            <div>
                <h2>Boleta no encontrada</h2>
                <Link to="/admin/ordenes" className="btn btn-outline-dark mt-3">Volver</Link>
            </div>
        )
    }

    // El total ya incluye IVA (19%)
    const neto = Math.round(orden.total / 1.19)
    const iva = orden.total - neto

    return (
        <div className="row justify-content-center">
            <div className="col-12 col-lg-8">

                <div className="d-flex justify-content-between align-items-center mb-4 d-print-none">
                    <Link to="/admin/ordenes" className="btn btn-outline-secondary">← Volver</Link>
                    <button className="btn btn-dark" onClick={() => window.print()}>Imprimir boleta</button>
                </div>

                <div className="card shadow-sm p-4">

                    <div className="d-flex justify-content-between mb-4">
                        <div>
                            <h4 className="mb-0">Ferretería</h4>
                            <small className="text-muted">Boleta electrónica</small>
                        </div>
                        <div className="text-end">
                            <h5 className="mb-0">N° {orden.numero}</h5>
                            <small className="text-muted">{new Date(orden.fecha).toLocaleString('es-CL')}</small>
                        </div>
                    </div>

                    <p className="mb-1"><strong>Cliente:</strong> {orden.nombre || "—"}</p>
                    <p className="mb-1"><strong>Correo:</strong> {orden.correo}</p>
                    <p className="mb-4"><strong>Estado:</strong> {orden.estado}</p>

                    <table className="table">
                        <thead>
                            <tr>
                                <th>Código</th>
                                <th>Producto</th>
                                <th className="text-end">Precio</th>
                                <th className="text-end">Cant.</th>
                                <th className="text-end">Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orden.items.map(i => (
                                <tr key={i.id}>
                                    <td>{i.id}</td>
                                    <td>{i.nombre}</td>
                                    <td className="text-end">${i.precio.toLocaleString('es-CL')}</td>
                                    <td className="text-end">{i.cantidad}</td>
                                    <td className="text-end">${(i.precio * i.cantidad).toLocaleString('es-CL')}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="text-end">
                        <p className="mb-1">Neto: ${neto.toLocaleString('es-CL')}</p>
                        <p className="mb-1">IVA (19%): ${iva.toLocaleString('es-CL')}</p>
                        <h5>Total: ${orden.total.toLocaleString('es-CL')}</h5>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default AdminBoleta