import { useState } from 'react'
import { Link } from 'react-router-dom'
import { obtenerUsuarios, eliminarUsuario, esDePrueba } from '../../datos/usuarios'

function AdminUsuarios() {

    const [usuarios, setUsuarios] = useState(obtenerUsuarios())

    // Para no poder eliminar tu propia cuenta
    const guardado = localStorage.getItem('usuarioActivo')
    const activo = guardado ? JSON.parse(guardado) : null

    const eliminar = (usuario) => {
        if (activo && usuario.correo === activo.correo) {
            alert("No puedes eliminar tu propia cuenta")
            return
        }
        if (confirm(`¿Eliminar al usuario ${usuario.correo}?`)) {
            eliminarUsuario(usuario.correo)
            setUsuarios(obtenerUsuarios())
        }
    }

    const colorRol = (rol) => {
        if (rol === 'Administrador') return 'bg-danger'
        if (rol === 'Vendedor') return 'bg-primary'
        return 'bg-secondary'
    }

    return (
        <div>

            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2>Usuarios</h2>
                    <p className="text-muted mb-0">{usuarios.length} usuarios</p>
                </div>
                <Link to="/admin/usuarios/nuevo" className="btn btn-dark">+ Nuevo usuario</Link>
            </div>

            <div className="card shadow-sm">
                <div className="table-responsive">
                    <table className="table align-middle mb-0">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Correo</th>
                                <th>Rol</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>

                            {usuarios.map(u => (
                                <tr key={u.correo}>
                                    <td>{u.nombre || "—"}</td>
                                    <td>{u.correo}</td>
                                    <td><span className={`badge ${colorRol(u.rol)}`}>{u.rol}</span></td>
                                    <td>
                                        <Link to={`/admin/usuarios/${encodeURIComponent(u.correo)}`} className="btn btn-sm btn-outline-dark me-2">
                                            Ver
                                        </Link>

                                        {!esDePrueba(u.correo) && (
                                            <>
                                                <Link to={`/admin/usuarios/editar/${encodeURIComponent(u.correo)}`} className="btn btn-sm btn-outline-secondary me-2">
                                                    Editar
                                                </Link>
                                                <button className="btn btn-sm btn-outline-danger" onClick={() => eliminar(u)}>
                                                    Eliminar
                                                </button>
                                            </>
                                        )}
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

export default AdminUsuarios