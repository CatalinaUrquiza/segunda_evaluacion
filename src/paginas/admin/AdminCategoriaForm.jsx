import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import CampoFormulario from '../../componentes/moleculas/CampoFormulario'
import { obtenerCategoria, crearCategoria, actualizarCategoria, crearId } from '../../datos/categorias'

function AdminCategoriaForm() {

    const navigate = useNavigate()

    // Si la URL trae un id, estamos editando; si no, creando
    const { id } = useParams()
    const existente = id ? obtenerCategoria(id) : undefined
    const editando = existente !== undefined

    const [nombre, setNombre] = useState(existente?.nombre ?? "")

    const manejarEnvio = (e) => {
        e.preventDefault()

        if (nombre.trim() === "") {
            alert("Debe ingresar el nombre de la categoría")
            return
        }

        if (editando) {
            actualizarCategoria(existente.id, { nombre: nombre.trim() })
        } else {
            const nuevoId = crearId(nombre)

            if (nuevoId === "") {
                alert("El nombre no es válido")
                return
            }
            if (obtenerCategoria(nuevoId) !== undefined) {
                alert("Ya existe una categoría con ese nombre")
                return
            }

            crearCategoria({ id: nuevoId, nombre: nombre.trim() })
        }

        navigate('/admin/categorias')
    }

    return (
        <div className="row justify-content-center">
            <div className="col-12 col-lg-6">

                <h2 className="mb-4">{editando ? "Editar categoría" : "Nueva categoría"}</h2>

                <div className="card shadow-sm p-4">

                    <form onSubmit={manejarEnvio} noValidate>

                        {/* El identificador no se cambia al editar, porque los productos lo usan */}
                        {editando && (
                            <p className="text-muted">Identificador: <strong>{existente.id}</strong></p>
                        )}

                        <CampoFormulario etiqueta="Nombre" tipo="text" nombre="nombre" valor={nombre} alCambiar={setNombre} />

                        <div className="d-flex gap-2">
                            <button type="submit" className="btn btn-dark">
                                {editando ? "Guardar cambios" : "Crear categoría"}
                            </button>
                            <Link to="/admin/categorias" className="btn btn-outline-secondary">Cancelar</Link>
                        </div>

                    </form>

                </div>
            </div>
        </div>
    )
}

export default AdminCategoriaForm