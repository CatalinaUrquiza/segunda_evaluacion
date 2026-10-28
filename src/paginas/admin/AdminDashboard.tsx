import { Link } from 'react-router-dom'
import CardEstadistica from '../../componentes/moleculas/CardEstadistica'
import { obtenerProductos } from '../../datos/productos'
import { obtenerUsuarios } from '../../datos/usuarios'

function AdminDashboard() {

    const productos = obtenerProductos()
    const usuarios = obtenerUsuarios()

    // Productos cuyo stock llegó al nivel crítico
    const criticos = productos.filter(p => p.stock <= p.stockCritico)

    return (
        <div>

            <h2>Dashboard</h2>
            <p className="text-muted mb-4">Resumen de las actividades diarias</p>

            <div className="row row-cols-1 row-cols-md-3 g-4 mb-4">

                <CardEstadistica
                    titulo="Productos"
                    valor={productos.length}
                    detalle="en el catálogo"
                    color="bg-success"
                />

                <CardEstadistica
                    titulo="Stock crítico"
                    valor={criticos.length}
                    detalle="productos por reponer"
                    color="bg-danger"
                />

                <CardEstadistica
                    titulo="Usuarios"
                    valor={usuarios.length}
                    detalle="cuentas registradas"
                    color="bg-primary"
                />

            </div>

            <div className="card shadow-sm">
                <div className="card-body">

                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h5 className="mb-0">Productos con stock crítico</h5>
                        <Link to="/admin/productos" className="btn btn-sm btn-outline-dark">Ver productos</Link>
                    </div>

                    {criticos.length === 0 && (
                        <p className="text-muted mb-0">No hay productos con stock crítico.</p>
                    )}

                    {criticos.length > 0 && (
                        <table className="table align-middle mb-0">
                            <thead>
                                <tr>
                                    <th>Código</th>
                                    <th>Producto</th>
                                    <th>Stock</th>
                                </tr>
                            </thead>
                            <tbody>
                                {criticos.slice(0, 5).map(p => (
                                    <tr key={p.id}>
                                        <td>{p.id}</td>
                                        <td>{p.nombre}</td>
                                        <td><span className="badge bg-danger">{p.stock}</span></td>
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

export default AdminDashboard