import { useState } from 'react'
import { Link } from 'react-router-dom'
import { obtenerProductos, eliminarProducto } from '../../datos/productos'

function AdminProductos() {

    const [productos, setProductos] = useState(obtenerProductos())
    const [soloCriticos, setSoloCriticos] = useState(false)

    // Si está activado el filtro, solo muestra los de stock crítico
    const lista = soloCriticos
        ? productos.filter(p => p.stock <= p.stockCritico)
        : productos

    const eliminar = (id: string) => {
        if (confirm(`¿Eliminar el producto ${id}?`)) {
            eliminarProducto(id)
            setProductos(obtenerProductos())
        }
    }

    return (
        <div>

            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2>Productos</h2>
                    <p className="text-muted mb-0">{lista.length} productos</p>
                </div>

                <div className="d-flex gap-2">
                    <button
                        className={soloCriticos ? "btn btn-danger" : "btn btn-outline-danger"}
                        onClick={() => setSoloCriticos(!soloCriticos)}
                    >
                        Productos críticos
                    </button>
                    <Link to="/admin/productos/nuevo" className="btn btn-dark">+ Nuevo producto</Link>
                </div>
            </div>

            <div className="card shadow-sm">
                <div className="table-responsive">
                    <table className="table align-middle mb-0">
                        <thead>
                            <tr>
                                <th>Código</th>
                                <th>Producto</th>
                                <th>Categoría</th>
                                <th>Precio</th>
                                <th>Stock</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>

                            {lista.map(p => (
                                <tr key={p.id}>
                                    <td>{p.id}</td>
                                    <td>{p.nombre}</td>
                                    <td>{p.categoria}</td>
                                    <td>${(p.precioOferta ?? p.precio).toLocaleString('es-CL')}</td>
                                    <td>
                                        <span className={p.stock <= p.stockCritico ? "badge bg-danger" : "badge bg-success"}>
                                            {p.stock}
                                        </span>
                                    </td>
                                    <td>
                                        <Link to={`/admin/productos/editar/${p.id}`} className="btn btn-sm btn-outline-dark me-2">
                                            Editar
                                        </Link>
                                        <button className="btn btn-sm btn-outline-danger" onClick={() => eliminar(p.id)}>
                                            Eliminar
                                        </button>
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

export default AdminProductos