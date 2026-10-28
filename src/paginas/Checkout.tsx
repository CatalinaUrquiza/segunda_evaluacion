import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CampoFormulario from '../componentes/moleculas/CampoFormulario'
import CampoSelect from '../componentes/moleculas/CampoSelect'
import { regionesYcomunas } from '../datos/regiones'
import { obtenerCarrito, calcularTotal, datosClienteInicial, validarCliente, procesarPago } from '../utils/carrito'
import type { ItemCarrito, DatosCliente } from '../utils/tipos'

function Checkout() {

    const navigate = useNavigate()

    // Productos que se van a comprar
    const carrito: ItemCarrito[] = obtenerCarrito()
    const total = calcularTotal(carrito)

    // Si hay sesión iniciada, los datos del cliente vienen completos
    const [cliente, setCliente] = useState<DatosCliente>(datosClienteInicial)

    // Comunas de la región elegida
    const regiones = regionesYcomunas as Record<string, string[]>
    const comunas = regiones[cliente.region] ?? []

    // Devuelve la función que actualiza un campo del formulario
    const cambiar = (campo: keyof DatosCliente) => (valor: string) => {
        setCliente({ ...cliente, [campo]: valor })
    }

    // Al cambiar la región, se reinicia la comuna
    const cambiarRegion = (valor: string) => {
        setCliente({ ...cliente, region: valor, comuna: "" })
    }

    const manejarEnvio = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()

        const errores = validarCliente(cliente)
        const mensajes = Object.values(errores) as string[]

        if (mensajes.length > 0) {
            alert(mensajes.join("\n"))
            return
        }

        // Simula el pago y muestra la pantalla según el resultado
        const pedido = procesarPago(cliente)
        navigate(pedido.estado === "exitoso" ? "/pago-correcto" : "/pago-error")
    }

    // No tiene sentido comprar con el carrito vacío
    if (carrito.length === 0) {
        return (
            <div className="container my-5 text-center">
                <h4 className="text-muted fw-bold">Tu carrito está vacío</h4>
                <p className="text-muted mb-4">Añade productos antes de continuar con la compra.</p>
                <Link to="/productos" className="btn btn-dark fw-bold">Ir al Catálogo</Link>
            </div>
        )
    }

    return (
        <div className="container my-5">

            <h2>Finalizar compra</h2>

            <div className="row justify-content-center">
                <div className="col-lg-9">

                    <form onSubmit={manejarEnvio} noValidate className="bg-white p-4 rounded shadow-sm border">

                        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
                            <div>
                                <h4 className="fw-bold mb-0">Carrito de compra</h4>
                                <small className="text-muted">Completa la siguiente información</small>
                            </div>
                            <span className="badge bg-primary fs-6 p-3">
                                Total a pagar: ${total.toLocaleString('es-CL')}
                            </span>
                        </div>

                        {/* PRODUCTOS */}
                        <div className="table-responsive mb-4">
                            <table className="table align-middle">
                                <thead>
                                    <tr>
                                        <th>Imagen</th>
                                        <th>Nombre</th>
                                        <th className="text-end">Precio</th>
                                        <th className="text-end">Cantidad</th>
                                        <th className="text-end">Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {carrito.map(p => (
                                        <tr key={p.id}>
                                            <td><img src={p.imagen} alt={p.nombre} className="img-tabla-producto" /></td>
                                            <td>{p.nombre}</td>
                                            <td className="text-end">${p.precio.toLocaleString('es-CL')}</td>
                                            <td className="text-end">{p.cantidad}</td>
                                            <td className="text-end">${(p.precio * p.cantidad).toLocaleString('es-CL')}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* DATOS DEL CLIENTE */}
                        <h5 className="fw-bold">Información del cliente</h5>
                        <small className="text-muted d-block mb-3">
                            Si iniciaste sesión, tus datos se completan automáticamente.
                        </small>

                        <div className="row">
                            <div className="col-md-6">
                                <CampoFormulario
                                    etiqueta="Nombre *"
                                    tipo="text"
                                    nombre="nombre"
                                    valor={cliente.nombre}
                                    alCambiar={cambiar("nombre")}
                                />
                            </div>
                            <div className="col-md-6">
                                <CampoFormulario
                                    etiqueta="Apellidos *"
                                    tipo="text"
                                    nombre="apellidos"
                                    valor={cliente.apellidos}
                                    alCambiar={cambiar("apellidos")}
                                />
                            </div>
                            <div className="col-md-6">
                                <CampoFormulario
                                    etiqueta="Correo *"
                                    tipo="email"
                                    nombre="correo"
                                    valor={cliente.correo}
                                    alCambiar={cambiar("correo")}
                                />
                            </div>
                        </div>

                        {/* DIRECCIÓN DE ENTREGA */}
                        <h5 className="fw-bold mt-2">Dirección de entrega de los productos</h5>
                        <small className="text-muted d-block mb-3">Ingrese la dirección de forma detallada</small>

                        <div className="row">
                            <div className="col-md-6">
                                <CampoFormulario
                                    etiqueta="Calle *"
                                    tipo="text"
                                    nombre="calle"
                                    valor={cliente.calle}
                                    alCambiar={cambiar("calle")}
                                />
                            </div>
                            <div className="col-md-6">
                                <CampoFormulario
                                    etiqueta="Departamento (opcional)"
                                    tipo="text"
                                    nombre="departamento"
                                    valor={cliente.departamento}
                                    alCambiar={cambiar("departamento")}
                                />
                            </div>
                            <div className="col-md-6">
                                <CampoSelect
                                    etiqueta="Región *"
                                    nombre="region"
                                    valor={cliente.region}
                                    opciones={Object.keys(regionesYcomunas)}
                                    textoInicial="Seleccione una región"
                                    alCambiar={cambiarRegion}
                                />
                            </div>
                            <div className="col-md-6">
                                <CampoSelect
                                    etiqueta="Comuna *"
                                    nombre="comuna"
                                    valor={cliente.comuna}
                                    opciones={comunas}
                                    textoInicial="Seleccione una comuna"
                                    alCambiar={cambiar("comuna")}
                                />
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="form-label">Indicaciones para la entrega (opcional)</label>
                            <textarea
                                className="form-control"
                                rows={3}
                                placeholder="Ej: Entre calles, color del edificio, no tiene timbre."
                                value={cliente.indicaciones}
                                onChange={(e) => cambiar("indicaciones")(e.target.value)}
                            />
                        </div>

                        <div className="d-flex justify-content-between flex-wrap gap-2">
                            <Link to="/carrito" className="btn btn-outline-secondary">Volver al carrito</Link>
                            <button type="submit" className="btn btn-success fw-bold">
                                Pagar ahora ${total.toLocaleString('es-CL')}
                            </button>
                        </div>

                    </form>

                </div>
            </div>

        </div>
    )
}

export default Checkout
