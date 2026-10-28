import { useState } from 'react'
import { Link } from 'react-router-dom'
import { obtenerCategorias, eliminarCategoria } from '../../datos/categorias'
import { obtenerProductos } from '../../datos/productos'

function AdminCategorias() {

    const [categorias, setCategorias] = useState(obtenerCategorias())
    const productos = obtenerProductos()

    // Cuántos productos tiene cada categoría
    const contar = (id) => productos.filter(p => p.categoria === id).length

    const eliminar = (categoria) => {
        if (contar(categoria.id) > 0) {
            alert("No se puede eliminar: hay productos en esta categoría")
            return
        }
        if (confirm(`¿Eliminar la categoría ${categoria.nombre}?`)) {
            eliminarCategoria(categoria.id)
            setCategorias(obtenerCategorias())
        }
    }

    return (
        <div>

            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2>Categorías</h2>
                    <p className="text-muted mb-0">{categorias.length} categorías</p>
                </div>
                <Link to="/admin/categorias/nueva" className="btn btn-dark">+ Nueva categoría</Link>
            </div>

            <div className="card shadow-sm">
                <div className="table-responsive">
                    <table className="table align-middle mb-0">
                        <thead>
                            <tr>
                                <th>Identificador</th>
                                <th>Nombre</th>
                                <th>Productos</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>

                            {categorias.map(c => (
                                <tr key={c.id}>
                                    <td>{c.id}</td>
                                    <td>{c.nombre}</td>
                                    <td><span className="badge bg-secondary">{contar(c.id)}</span></td>
                                    <td>
                                        <Link to={`/admin/categorias/editar/${c.id}`} className="btn btn-sm btn-outline-dark me-2">
                                            Editar
                                        </Link>
                                        <button className="btn btn-sm btn-outline-danger" onClick={() => eliminar(c)}>
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

export default AdminCategorias