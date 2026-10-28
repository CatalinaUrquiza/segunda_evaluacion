import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CampoFormulario from '../../componentes/moleculas/CampoFormulario'
import { buscarUsuario, actualizarUsuario, esDePrueba } from '../../datos/usuarios'

function AdminPerfil() {

    const navigate = useNavigate()

    // Quién tiene la sesión iniciada
    const guardado = localStorage.getItem('usuarioActivo')
    const activo = guardado ? JSON.parse(guardado) : null

    const [nombre, setNombre] = useState(activo?.nombre ?? "")
    const [claveActual, setClaveActual] = useState("")
    const [claveNueva, setClaveNueva] = useState("")
    const [claveRepetida, setClaveRepetida] = useState("")

    if (!activo) {
        return (
            <div>
                <h2>Perfil</h2>
                <p className="text-muted">No hay una sesión activa.</p>
                <Link to="/login" className="btn btn-outline-dark">Iniciar sesión</Link>
            </div>
        )
    }

    // Los usuarios de prueba vienen predefinidos y no se editan
    if (esDePrueba(activo.correo)) {
        return (
            <div className="row justify-content-center">
                <div className="col-12 col-lg-6">
                    <h2 className="mb-4">Mi perfil</h2>
                    <div className="card shadow-sm p-4">
                        <p className="mb-1"><strong>Nombre:</strong> {activo.nombre || "—"}</p>
                        <p className="mb-1"><strong>Correo:</strong> {activo.correo}</p>
                        <p className="mb-3"><strong>Rol:</strong> {activo.rol}</p>
                        <p className="text-muted small mb-0">
                            Esta es una cuenta de prueba predefinida y sus datos no se pueden editar.
                        </p>
                    </div>
                </div>
            </div>
        )
    }

    const manejarEnvio = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (nombre.trim() === "") {
            alert("Debe ingresar su nombre")
            return
        }

        const datos: { nombre: string, clave?: string } = { nombre: nombre.trim() }

        // Solo se cambia la contraseña si escribió una nueva
        if (claveNueva !== "" || claveActual !== "" || claveRepetida !== "") {
            const registro = buscarUsuario(activo.correo)

            if (!registro || registro.clave !== claveActual) {
                alert("La contraseña actual no es correcta")
                return
            }
            if (claveNueva === "") {
                alert("Debe ingresar la nueva contraseña")
                return
            }
            if (claveNueva !== claveRepetida) {
                alert("Las contraseñas nuevas no coinciden")
                return
            }
            datos.clave = claveNueva
        }

        actualizarUsuario(activo.correo, datos)

        // Se actualiza también la sesión para que la barra superior muestre el nombre nuevo
        localStorage.setItem('usuarioActivo', JSON.stringify({ ...activo, ...datos }))

        alert("Perfil actualizado")
        navigate('/admin')
    }

    return (
        <div className="row justify-content-center">
            <div className="col-12 col-lg-6">

                <h2 className="mb-4">Mi perfil</h2>

                <div className="card shadow-sm p-4">

                    <form onSubmit={manejarEnvio} noValidate>

                        {/* El correo es el identificador y el rol lo define otro administrador */}
                        <p className="text-muted mb-1">Correo: <strong>{activo.correo}</strong></p>
                        <p className="text-muted">Rol: <strong>{activo.rol}</strong></p>

                        <CampoFormulario etiqueta="Nombre" tipo="text" nombre="nombre" valor={nombre} alCambiar={setNombre} />

                        <hr />
                        <h6 className="mb-3">Cambiar contraseña (opcional)</h6>

                        <CampoFormulario etiqueta="Contraseña actual" tipo="password" nombre="claveActual" valor={claveActual} alCambiar={setClaveActual} />
                        <CampoFormulario etiqueta="Nueva contraseña" tipo="password" nombre="claveNueva" valor={claveNueva} alCambiar={setClaveNueva} />
                        <CampoFormulario etiqueta="Repetir nueva contraseña" tipo="password" nombre="claveRepetida" valor={claveRepetida} alCambiar={setClaveRepetida} />

                        <div className="d-flex gap-2">
                            <button type="submit" className="btn btn-dark">Guardar cambios</button>
                            <Link to="/admin" className="btn btn-outline-secondary">Cancelar</Link>
                        </div>

                    </form>

                </div>
            </div>
        </div>
    )
}

export default AdminPerfil