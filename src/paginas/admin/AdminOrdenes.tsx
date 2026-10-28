import { useState } from 'react'
import { Link } from 'react-router-dom'
import { obtenerOrdenes, cambiarEstadoOrden, estadosOrden } from '../../datos/ordenes'

function AdminOrdenes() {

    const [ordenes, setOrdenes] = useState(obtenerOrdenes())

    const cambiarEstado = (numero, estado) => {
        cambiarEstadoOrden(numero, estado)
        setOrdenes(obtenerOrdenes())
    }

    return (
        <div>

            <div className="mb-4">
                <h2>Órdenes</h2>
                <p className="text-muted mb-0">{ordenes.length} órdenes</p>
            </div>

            <div className="card shadow-sm">
                <div className="table-responsive">
                    <table className="table align-middle mb-0">
                        <thead>
                            <tr>
                                <th>N°</th>
                                <th>Fecha</th>
                                <th>Cliente</th>
                                <th>Total</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>

                            {ordenes.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="text-center text-muted py-4">
                                        Aún no hay órdenes registradas.
                                    </td>
                                </tr>
                            )}

                            {[...ordenes].reverse().map(o => (
                                <tr key={o.numero}>
                                    <td>#{o.numero}</td>
                                    <td>{new Date(o.fecha).toLocaleDateString('es-CL')}</td>
                                    <td>{o.nombre || o.correo}</td>
                                    <td>${o.total.toLocaleString('es-CL')}</td>
                                    <td>
                                        <select
                                            className="form-select form-select-sm"
                                            value={o.estado}
                                            onChange={(e) => cambiarEstado(o.numero, e.target.value)}
                                        >
                                            {estadosOrden.map(est => <option key={est} value={est}>{est}</option>)}
                                        </select>
                                    </td>
                                    <td>
                                        <Link to={`/admin/ordenes/${o.numero}`} className="btn btn-sm btn-outline-dark">
                                            Ver boleta
                                        </Link>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    )
}

export default AdminOrdenes