import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import CampoFormulario from '../../componentes/moleculas/CampoFormulario'
import CampoSelect from '../../componentes/moleculas/CampoSelect'
import { buscarUsuario, guardarUsuario, actualizarUsuario, esDePrueba, roles } from '../../datos/usuarios'

function AdminUsuarioForm() {

    const navigate = useNavigate()

    // Si la URL trae un correo, estamos editando; si no, creando
    const { correo: correoUrl } = useParams()
    const existente = correoUrl ? buscarUsuario(correoUrl) : undefined
    const editando = existente !== undefined

    const [correo, setCorreo] = useState(existente?.correo ?? "")
    const [nombre, setNombre] = useState(existente?.nombre ?? "")
    const [clave, setClave] = useState("")
    const [rol, setRol] = useState(existente?.rol ?? "")

    // Los usuarios de prueba no se pueden editar
    if (editando && esDePrueba(existente.correo)) {
        return (
            <div>
                <h2>Usuario de prueba</h2>
                <p className="text-muted">Este usuario viene predefinido y no se puede editar.</p>
                <Link to="/admin/usuarios" className="btn btn-outline-dark">Volver</Link>
            </div>
        )
    }

    const manejarEnvio = (e) => {
        e.preventDefault()

        if (!editando) {
            if (correo.trim() === "" || !correo.includes("@")) {
                alert("Debe ingresar un correo válido")
                return
            }
            if (buscarUsuario(correo.trim()) !== undefined) {
                alert("Ya existe un usuario con ese correo")
                return
            }
            if (clave === "") {
                alert("Debe ingresar una contraseña")
                return
            }
        }

        if (nombre.trim() === "") {
            alert("Debe ingresar el nombre")
            return
        }

        if (rol === "") {
            alert("Debe seleccionar un rol")
            return
        }

        if (editando) {
            const datos = { nombre: nombre.trim(), rol }
            // Si deja la contraseña vacía, se mantiene la anterior
            if (clave !== "") {
                datos.clave = clave
            }
            actualizarUsuario(existente.correo, datos)
            navigate(`/admin/usuarios/${encodeURIComponent(existente.correo)}`)
        } else {
            guardarUsuario({ correo: correo.trim(), clave, rol, nombre: nombre.trim() })
            navigate('/admin/usuarios')
        }
    }

    return (
        <div className="row justify-content-center">
            <div className="col-12 col-lg-6">

                <h2 className="mb-4">{editando ? "Editar usuario" : "Nuevo usuario"}</h2>

                <div className="card shadow-sm p-4">

                    <form onSubmit={manejarEnvio} noValidate>

                        {/* El correo es el identificador, no se cambia al editar */}
                        {editando ? (
                            <p className="text-muted">Correo: <strong>{correo}</strong></p>
                        ) : (
                            <CampoFormulario etiqueta="Correo" tipo="email" nombre="correo" valor={correo} alCambiar={setCorreo} />
                        )}

                        <CampoFormulario etiqueta="Nombre" tipo="text" nombre="nombre" valor={nombre} alCambiar={setNombre} />

                        <CampoFormulario
                            etiqueta={editando ? "Nueva contraseña (vacío = no cambiar)" : "Contraseña"}
                            tipo="password"
                            nombre="clave"
                            valor={clave}
                            alCambiar={setClave}
                        />

                        <CampoSelect
                            etiqueta="Rol"
                            nombre="rol"
                            valor={rol}
                            opciones={roles}
                            textoInicial="Seleccione un rol"
                            alCambiar={setRol}
                        />

                        <div className="d-flex gap-2">
                            <button type="submit" className="btn btn-dark">
                                {editando ? "Guardar cambios" : "Crear usuario"}
                            </button>
                            <Link to="/admin/usuarios" className="btn btn-outline-secondary">Cancelar</Link>
                        </div>

                    </form>

                </div>
            </div>
        </div>
    )
}

export default AdminUsuarioForm