import { Link } from 'react-router-dom'
import { obtenerProductos } from '../../datos/productos'
import { obtenerUsuarios } from '../../datos/usuarios'
import { obtenerOrdenes } from '../../datos/ordenes'

const accesos = [
    { titulo: 'Órdenes', texto: 'Gestión y seguimiento de todas las órdenes de compra realizadas.', icono: 'bi-cart3', ruta: '/admin/ordenes' },
    { titulo: 'Productos', texto: 'Administrar inventario y detalles de los productos disponibles.', icono: 'bi-box-seam', ruta: '/admin/productos' },
    { titulo: 'Categorías', texto: 'Organizar productos en categorías para facilitar su navegación.', icono: 'bi-tags', ruta: '/admin/categorias' },
    { titulo: 'Usuarios', texto: 'Gestión de cuentas de usuario y sus roles dentro del sistema.', icono: 'bi-people', ruta: '/admin/usuarios' },
    { titulo: 'Reportes', texto: 'Generación de informes detallados sobre las operaciones del sistema.', icono: 'bi-bar-chart-line', ruta: '/admin/reportes' },
    { titulo: 'Perfil', texto: 'Administración de la información personal y configuraciones de cuenta.', icono: 'bi-person', ruta: '/admin/perfil' },
    { titulo: 'Stock crítico', texto: 'Revisa los productos que necesitan reposición urgente.', icono: 'bi-exclamation-triangle', ruta: '/admin/productos' },
    { titulo: 'Tienda', texto: 'Visualiza tu tienda en tiempo real tal como la ven los clientes.', icono: 'bi-shop', ruta: '/' }
]

function AdminDashboard() {

    const productos = obtenerProductos()
    const usuarios = obtenerUsuarios()
    const ordenes = obtenerOrdenes()

    // Productos cuyo stock llegó al nivel crítico
    const criticos = productos.filter(p => p.stock <= p.stockCritico)

    // Total vendido (sin contar órdenes canceladas)
    const totalVendido = ordenes
        .filter((o: { estado: string }) => o.estado !== 'Cancelada')
        .reduce((suma: number, o: { total: number }) => suma + o.total, 0)

    return (
        <div>

            <h2>Dashboard</h2>
            <p className="text-muted mb-4">Resumen de las actividades diarias</p>

            {/* Tarjetas de métricas */}
            <div className="row row-cols-1 row-cols-md-3 g-4 mb-4">

                <div className="col">
                    <div className="dash-stat dash-stat-azul">
                        <div className="dash-stat-top">
                            <i className="bi bi-cart3 dash-stat-icono"></i>
                            <div>
                                <p className="dash-stat-titulo">Compras</p>
                                <p className="dash-stat-valor">{ordenes.length}</p>
                            </div>
                        </div>
                        <p className="dash-stat-pie">Total vendido: ${totalVendido.toLocaleString('es-CL')}</p>
                    </div>
                </div>

                <div className="col">
                    <div className="dash-stat dash-stat-verde">
                        <div className="dash-stat-top">
                            <i className="bi bi-box-seam dash-stat-icono"></i>
                            <div>
                                <p className="dash-stat-titulo">Productos</p>
                                <p className="dash-stat-valor">{productos.length}</p>
                            </div>
                        </div>
                        <p className="dash-stat-pie">{criticos.length} con stock crítico</p>
                    </div>
                </div>

                <div className="col">
                    <div className="dash-stat dash-stat-amarillo">
                        <div className="dash-stat-top">
                            <i className="bi bi-people-fill dash-stat-icono"></i>
                            <div>
                                <p className="dash-stat-titulo">Usuarios</p>
                                <p className="dash-stat-valor">{usuarios.length}</p>
                            </div>
                        </div>
                        <p className="dash-stat-pie">Cuentas registradas</p>
                    </div>
                </div>

            </div>

            {/* Accesos rápidos */}
            <div className="row row-cols-1 row-cols-sm-2 row-cols-xl-4 g-4 mb-4">
                {accesos.map(a => (
                    <div className="col" key={a.titulo}>
                        <Link to={a.ruta} className="dash-acceso">
                            <i className={`bi ${a.icono}`}></i>
                            <h6>{a.titulo}</h6>
                            <p>{a.texto}</p>
                        </Link>
                    </div>
                ))}
            </div>

            {/* Stock crítico */}
            <div className="card shadow-sm dash-card">
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