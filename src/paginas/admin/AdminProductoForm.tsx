import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import CampoFormulario from '../../componentes/moleculas/CampoFormulario'
import CampoSelect from '../../componentes/moleculas/CampoSelect'
import { obtenerProducto, crearProducto, actualizarProducto } from '../../datos/productos'
import { obtenerCategorias } from '../../datos/categorias'

function AdminProductoForm() {

    const navigate = useNavigate()
    const categorias = obtenerCategorias().map((c: { id: string }) => c.id)

    // Si la URL trae un id, estamos editando; si no, creando
    const { id } = useParams()
    const existente = id ? obtenerProducto(id) : undefined
    const editando = existente !== undefined

    const [codigo, setCodigo] = useState(existente?.id ?? "")
    const [nombre, setNombre] = useState(existente?.nombre ?? "")
    const [precio, setPrecio] = useState(String(existente?.precio ?? ""))
    const [precioOferta, setPrecioOferta] = useState(String(existente?.precioOferta ?? ""))
    const [marca, setMarca] = useState(existente?.marca ?? "")
    const [categoria, setCategoria] = useState(existente?.categoria ?? "")
    const [subcategoria, setSubcategoria] = useState(existente?.subcategoria ?? "")
    const [unidad, setUnidad] = useState(existente?.unidad ?? "")
    const [imagen, setImagen] = useState(existente?.imagen ?? "")
    const [stock, setStock] = useState(String(existente?.stock ?? "20"))
    const [stockCritico, setStockCritico] = useState(String(existente?.stockCritico ?? "5"))

    const manejarEnvio = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (codigo.trim() === "" || nombre.trim() === "") {
            alert("Debe ingresar el código y el nombre")
            return
        }

        // Al crear, el código no puede estar repetido
        if (!editando && obtenerProducto(codigo) !== undefined) {
            alert("Ya existe un producto con ese código")
            return
        }

        if (Number(precio) <= 0) {
            alert("El precio debe ser mayor a 0")
            return
        }

        if (precioOferta !== "" && Number(precioOferta) >= Number(precio)) {
            alert("El precio de oferta debe ser menor al precio normal")
            return
        }

        if (categoria === "") {
            alert("Debe seleccionar una categoría")
            return
        }

        if (Number(stock) < 0 || Number(stockCritico) < 0) {
            alert("El stock no puede ser negativo")
            return
        }

        const datos = {
            nombre,
            precio: Number(precio),
            precioOferta: precioOferta === "" ? undefined : Number(precioOferta),
            marca,
            categoria,
            subcategoria,
            unidad,
            imagen,
            stock: Number(stock),
            stockCritico: Number(stockCritico)
        }

        if (editando) {
            actualizarProducto(codigo, datos)
        } else {
            crearProducto({ id: codigo, ...datos })
        }

        navigate('/admin/productos')
    }

    return (
        <div className="row justify-content-center">
            <div className="col-12 col-lg-8">

                <h2 className="mb-4">{editando ? "Editar producto" : "Nuevo producto"}</h2>

                <div className="card shadow-sm p-4">

                    <form onSubmit={manejarEnvio} noValidate>

                        {/* El código no se puede cambiar al editar */}
                        {editando ? (
                            <p className="text-muted">Código: <strong>{codigo}</strong></p>
                        ) : (
                            <CampoFormulario etiqueta="Código (ej: MC011)" tipo="text" nombre="codigo" valor={codigo} alCambiar={setCodigo} />
                        )}

                        <CampoFormulario etiqueta="Nombre" tipo="text" nombre="nombre" valor={nombre} alCambiar={setNombre} />
                        <CampoFormulario etiqueta="Precio" tipo="number" nombre="precio" valor={precio} alCambiar={setPrecio} />
                        <CampoFormulario etiqueta="Precio de oferta (opcional)" tipo="number" nombre="precioOferta" valor={precioOferta} alCambiar={setPrecioOferta} />
                        <CampoFormulario etiqueta="Marca" tipo="text" nombre="marca" valor={marca} alCambiar={setMarca} />

                        <CampoSelect
                            etiqueta="Categoría"
                            nombre="categoria"
                            valor={categoria}
                            opciones={categorias}
                            textoInicial="Seleccione una categoría"
                            alCambiar={setCategoria}
                        />

                        <CampoFormulario etiqueta="Subcategoría" tipo="text" nombre="subcategoria" valor={subcategoria} alCambiar={setSubcategoria} />
                        <CampoFormulario etiqueta="Unidad de venta" tipo="text" nombre="unidad" valor={unidad} alCambiar={setUnidad} />
                        <CampoFormulario etiqueta="Imagen (ej: /img/MC011.webp)" tipo="text" nombre="imagen" valor={imagen} alCambiar={setImagen} />
                        <CampoFormulario etiqueta="Stock" tipo="number" nombre="stock" valor={stock} alCambiar={setStock} />
                        <CampoFormulario etiqueta="Stock crítico (alerta bajo este número)" tipo="number" nombre="stockCritico" valor={stockCritico} alCambiar={setStockCritico} />

                        <div className="d-flex gap-2">
                            <button type="submit" className="btn btn-dark">
                                {editando ? "Guardar cambios" : "Crear producto"}
                            </button>
                            <Link to="/admin/productos" className="btn btn-outline-secondary">Cancelar</Link>
                        </div>

                    </form>

                </div>
            </div>
        </div>
    )
}

export default AdminProductoForm
