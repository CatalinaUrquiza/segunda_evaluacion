import { Link, useParams } from 'react-router-dom'
import { buscarUsuario, esDePrueba } from '../../datos/usuarios'
import { obtenerOrdenes } from '../../datos/ordenes'

function AdminUsuarioDetalle() {

    const { correo } = useParams()
    const usuario = buscarUsuario(correo)

    if (!usuario) {
        return (
            <div>
                <h2>Usuario no encontrado</h2>
                <Link to="/admin/usuarios" className="btn btn-outline-dark mt-3">Volver</Link>
            </div>
        )
    }

    // Historial: las órdenes hechas con el correo de este usuario
    const compras = obtenerOrdenes().filter(o => o.correo === usuario.correo)
    const totalGastado = compras
        .filter(o => o.estado !== 'Cancelada')
        .reduce((suma, o) => suma + o.total, 0)

    return (
        <div>

            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2>{usuario.nombre || usuario.correo}</h2>
                    <p className="text-muted mb-0">Detalle del usuario</p>
                </div>
                <div className="d-flex gap-2">
                    <Link to="/admin/usuarios" className="btn btn-outline-secondary">← Volver</Link>
                    {!esDePrueba(usuario.correo) && (
                        <Link to={`/admin/usuarios/editar/${encodeURIComponent(usuario.correo)}`} className="btn btn-dark">
                            Editar
                        </Link>
                    )}
                </div>
            </div>

            <div className="row g-4 mb-4">

                <div className="col-12 col-lg-6">
                    <div className="card shadow-sm dash-card h-100">
                        <div className="card-body">
                            <h5 className="mb-3">Datos</h5>
                            <p className="mb-1"><strong>Correo:</strong> {usuario.correo}</p>
                            <p className="mb-1"><strong>Nombre:</strong> {usuario.nombre || "—"}</p>
                            <p className="mb-0"><strong>Rol:</strong> {usuario.rol}</p>
                            {esDePrueba(usuario.correo) && (
                                <p className="text-muted small mt-3 mb-0">Usuario de prueba predefinido.</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="col-12 col-lg-6">
                    <div className="card shadow-sm dash-card h-100">
                        <div className="card-body">
                            <h5 className="mb-3">Resumen de compras</h5>
                            <p className="mb-1"><strong>Compras realizadas:</strong> {compras.length}</p>
                            <p className="mb-0"><strong>Total gastado:</strong> ${totalGastado.toLocaleString('es-CL')}</p>
                        </div>
                    </div>
                </div>

            </div>

            <div className="card shadow-sm dash-card">
                <div className="card-body">

                    <h5 className="mb-3">Historial de compras</h5>

                    {compras.length === 0 && (
                        <p className="text-muted mb-0">Este usuario aún no tiene compras.</p>
                    )}

                    {compras.length > 0 && (
                        <table className="table align-middle mb-0">
                            <thead>
                                <tr>
                                    <th>N°</th>
                                    <th>Fecha</th>
                                    <th>Total</th>
                                    <th>Estado</th>
                                    <th>Boleta</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[...compras].reverse().map(o => (
                                    <tr key={o.numero}>
                                        <td>#{o.numero}</td>
                                        <td>{new Date(o.fecha).toLocaleDateString('es-CL')}</td>
                                        <td>${o.total.toLocaleString('es-CL')}</td>
                                        <td>{o.estado}</td>
                                        <td>
                                            <Link to={`/admin/ordenes/${o.numero}`} className="btn btn-sm btn-outline-dark">
                                                Ver boleta
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}

                </div>
            </div>

        </div>
    )
}

export default AdminUsuarioDetalle