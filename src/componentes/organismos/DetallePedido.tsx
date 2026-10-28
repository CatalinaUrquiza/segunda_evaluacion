import type { Pedido } from '../../utils/tipos'

interface DetallePedidoProps {
    pedido: Pedido;
    etiquetaTotal: string;   // "Total pagado" o "Total a pagar"
}

// Campo de solo lectura (no se puede editar)
function CampoLectura({ etiqueta, valor }: { etiqueta: string; valor: string }) {
    return (
        <div className="mb-3">
            <label className="form-label">{etiqueta}</label>
            <input type="text" className="form-control bg-light" value={valor} readOnly />
        </div>
    )
}

// Muestra los datos del cliente, la dirección, los productos y el total de un pedido.
// Se usa tanto en "Pago correcto" como en "Pago con error".
function DetallePedido({ pedido, etiquetaTotal }: DetallePedidoProps) {

    const { cliente, items, total } = pedido

    return (
        <>
            <h5 className="fw-bold mt-4">Información del cliente</h5>
            <div className="row">
                <div className="col-md-4"><CampoLectura etiqueta="Nombre" valor={cliente.nombre} /></div>
                <div className="col-md-4"><CampoLectura etiqueta="Apellidos" valor={cliente.apellidos} /></div>
                <div className="col-md-4"><CampoLectura etiqueta="Correo" valor={cliente.correo} /></div>
            </div>

            <h5 className="fw-bold mt-2">Dirección de entrega de los productos</h5>
            <div className="row">
                <div className="col-md-6"><CampoLectura etiqueta="Calle" valor={cliente.calle} /></div>
                <div className="col-md-6"><CampoLectura etiqueta="Departamento (opcional)" valor={cliente.departamento} /></div>
                <div className="col-md-6"><CampoLectura etiqueta="Región" valor={cliente.region} /></div>
                <div className="col-md-6"><CampoLectura etiqueta="Comuna" valor={cliente.comuna} /></div>
            </div>

            <div className="mb-3">
                <label className="form-label">Indicaciones para la entrega (opcional)</label>
                <textarea className="form-control bg-light" rows={2} value={cliente.indicaciones} readOnly />
            </div>

            <div className="table-responsive">
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
                        {items.map(p => (
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

            <div className="text-center bg-white rounded shadow-sm border p-3 mb-3">
                <h5 className="fw-bold m-0">{etiquetaTotal}: ${total.toLocaleString('es-CL')}</h5>
            </div>
        </>
    )
}

export default DetallePedido
