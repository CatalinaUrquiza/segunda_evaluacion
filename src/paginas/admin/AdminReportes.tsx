import { useState } from 'react'
import { Link } from 'react-router-dom'
import { obtenerOrdenes, estadosOrden } from '../../datos/ordenes'
import { obtenerProductos } from '../../datos/productos'
import { obtenerCategorias } from '../../datos/categorias'

// Tipos de los datos (los archivos de datos son JS, por eso se declaran aquí)
interface ItemOrden {
    id: string
    nombre: string
    precio: number
    cantidad: number
}

interface Orden {
    numero: number
    fecha: string
    nombre?: string
    correo: string
    total: number
    estado: string
    items: ItemOrden[]
}

interface Producto {
    id: string
    nombre: string
    categoria: string
    stock: number
    stockCritico: number
}

interface Categoria {
    id: string
    nombre: string
}

interface Vendido {
    id: string
    nombre: string
    cantidad: number
    ingresos: number
}

interface FilaEstado {
    estado: string
    cantidad: number
    total: number
}

const dinero = (n: number) => '$' + n.toLocaleString('es-CL')

function AdminReportes() {

    const [periodo, setPeriodo] = useState("todo")

    const ordenes = obtenerOrdenes() as Orden[]
    const productos = obtenerProductos() as Producto[]
    const categorias = obtenerCategorias() as Categoria[]
    const estados = estadosOrden as string[]

    // Filtro por período
    const dias = periodo === "7" ? 7 : periodo === "30" ? 30 : 0
    const ahora = Date.now()
    const filtradas: Orden[] = dias === 0
        ? ordenes
        : ordenes.filter((o: Orden) => ahora - new Date(o.fecha).getTime() <= dias * 24 * 60 * 60 * 1000)

    // Las órdenes canceladas no cuentan como venta
    const validas: Orden[] = filtradas.filter((o: Orden) => o.estado !== 'Cancelada')
    const totalVendido: number = validas.reduce((suma: number, o: Orden) => suma + o.total, 0)
    const ticketPromedio: number = validas.length > 0 ? Math.round(totalVendido / validas.length) : 0
    const canceladas: number = filtradas.length - validas.length

    // Ventas por estado
    const porEstado: FilaEstado[] = estados.map((est: string) => {
        const lista = filtradas.filter((o: Orden) => o.estado === est)
        return {
            estado: est,
            cantidad: lista.length,
            total: lista.reduce((suma: number, o: Orden) => suma + o.total, 0)
        }
    })

    // Productos más vendidos
    const vendidos: Record<string, Vendido> = {}
    validas.forEach((o: Orden) => {
        o.items.forEach((i: ItemOrden) => {
            if (!vendidos[i.id]) {
                vendidos[i.id] = { id: i.id, nombre: i.nombre, cantidad: 0, ingresos: 0 }
            }
            vendidos[i.id].cantidad += i.cantidad
            vendidos[i.id].ingresos += i.precio * i.cantidad
        })
    })
    const masVendidos: Vendido[] = Object.values(vendidos)
        .sort((a: Vendido, b: Vendido) => b.cantidad - a.cantidad)
        .slice(0, 5)

    // Ventas por categoría
    const porCategoria: Record<string, number> = {}
    validas.forEach((o: Orden) => {
        o.items.forEach((i: ItemOrden) => {
            const producto = productos.find((p: Producto) => p.id === i.id)
            const idCat = producto ? producto.categoria : "sin-categoria"
            const cat = categorias.find((c: Categoria) => c.id === idCat)
            const nombreCat = cat ? cat.nombre : "Sin categoría"
            porCategoria[nombreCat] = (porCategoria[nombreCat] ?? 0) + i.precio * i.cantidad
        })
    })
    const listaCategorias: [string, number][] = Object.entries(porCategoria)
        .sort((a: [string, number], b: [string, number]) => b[1] - a[1])
    const maxCategoria: number = listaCategorias.length > 0 ? listaCategorias[0][1] : 0

    // Stock crítico
    const criticos: Producto[] = productos.filter((p: Producto) => p.stock <= p.stockCritico)

    // Últimas órdenes
    const recientes: Orden[] = [...filtradas].reverse().slice(0, 5)

    return (
        <div>

            <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
                <div>
                    <h2>Reportes</h2>
                    <p className="text-muted mb-0">Resumen de ventas e inventario</p>
                </div>
                <div>
                    <select
                        className="form-select"
                        value={periodo}
                        onChange={(e) => setPeriodo(e.target.value)}
                    >
                        <option value="todo">Todo el historial</option>
                        <option value="7">Últimos 7 días</option>
                        <option value="30">Últimos 30 días</option>
                    </select>
                </div>
            </div>

            {/* Resumen */}
            <div className="row g-4 mb-4">

                <div className="col-12 col-lg-4">
                    <div className="card border-0 h-100" style={{ background: '#0f2240', color: 'white' }}>
                        <div className="card-body">
                            <small className="text-uppercase" style={{ opacity: 0.7 }}>Total vendido</small>
                            <h2 className="my-2">{dinero(totalVendido)}</h2>
                            <p className="mb-0" style={{ opacity: 0.8 }}>
                                Suma de las órdenes no canceladas del período.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-lg-8">
                    <div className="row g-4 h-100">
                        <div className="col-12 col-sm-4">
                            <div className="card shadow-sm dash-card h-100">
                                <div className="card-body">
                                    <small className="text-muted">Órdenes</small>
                                    <h3 className="mb-0">{filtradas.length}</h3>
                                    <small className="text-muted">{canceladas} canceladas</small>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-4">
                            <div className="card shadow-sm dash-card h-100">
                                <div className="card-body">
                                    <small className="text-muted">Ticket promedio</small>
                                    <h3 className="mb-0">{dinero(ticketPromedio)}</h3>
                                    <small className="text-muted">por orden válida</small>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-4">
                            <div className="card shadow-sm dash-card h-100">
                                <div className="card-body">
                                    <small className="text-muted">Stock crítico</small>
                                    <h3 className="mb-0">{criticos.length}</h3>
                                    <small className="text-muted">de {productos.length} productos</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div className="row g-4 mb-4">

                {/* Ventas por estado */}
                <div className="col-12 col-lg-6">
                    <div className="card shadow-sm dash-card h-100">
                        <div className="card-body">
                            <h5 className="mb-3">Ventas por estado</h5>
                            <table className="table align-middle mb-0">
                                <thead>
                                    <tr>
                                        <th>Estado</th>
                                        <th className="text-end">Órdenes</th>
                                        <th className="text-end">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {porEstado.map((e: FilaEstado) => (
                                        <tr key={e.estado}>
                                            <td>{e.estado}</td>
                                            <td className="text-end">{e.cantidad}</td>
                                            <td className="text-end">{dinero(e.total)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Ventas por categoría */}
                <div className="col-12 col-lg-6">
                    <div className="card shadow-sm dash-card h-100">
                        <div className="card-body">
                            <h5 className="mb-3">Ventas por categoría</h5>

                            {listaCategorias.length === 0 && (
                                <p className="text-muted mb-0">Aún no hay ventas en este período.</p>
                            )}

                            {listaCategorias.map(([nombre, total]: [string, number]) => (
                                <div className="mb-3" key={nombre}>
                                    <div className="d-flex justify-content-between">
                                        <span>{nombre}</span>
                                        <strong>{dinero(total)}</strong>
                                    </div>
                                    <div className="progress" style={{ height: '8px' }}>
                                        <div
                                            className="progress-bar bg-dark"
                                            style={{ width: `${(total / maxCategoria) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>

            {/* Más vendidos */}
            <div className="card shadow-sm dash-card mb-4">
                <div className="card-body">
                    <h5 className="mb-3">Productos más vendidos</h5>

                    {masVendidos.length === 0 && (
                        <p className="text-muted mb-0">Aún no hay ventas en este período.</p>
                    )}

                    {masVendidos.length > 0 && (
                        <table className="table align-middle mb-0">
                            <thead>
                                <tr>
                                    <th>Código</th>
                                    <th>Producto</th>
                                    <th className="text-end">Unidades</th>
                                    <th className="text-end">Ingresos</th>
                                </tr>
                            </thead>
                            <tbody>
                                {masVendidos.map((p: Vendido) => (
                                    <tr key={p.id}>
                                        <td>{p.id}</td>
                                        <td>{p.nombre}</td>
                                        <td className="text-end">{p.cantidad}</td>
                                        <td className="text-end">{dinero(p.ingresos)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            {/* Stock crítico */}
            <div className="card shadow-sm dash-card mb-4">
                <div className="card-body">

                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h5 className="mb-0">Listado de productos críticos</h5>
                        <Link to="/admin/productos" className="btn btn-sm btn-outline-dark">Ir a productos</Link>
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
                                    <th className="text-end">Stock</th>
                                    <th className="text-end">Nivel crítico</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {criticos.map((p: Producto) => (
                                    <tr key={p.id}>
                                        <td>{p.id}</td>
                                        <td>{p.nombre}</td>
                                        <td className="text-end"><span className="badge bg-danger">{p.stock}</span></td>
                                        <td className="text-end">{p.stockCritico}</td>
                                        <td className="text-end">
                                            <Link to={`/admin/productos/editar/${p.id}`} className="btn btn-sm btn-outline-dark">
                                                Reponer
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            {/* Actividad reciente */}
            <div className="card shadow-sm dash-card">
                <div className="card-body">
                    <h5 className="mb-3">Órdenes recientes</h5>

                    {recientes.length === 0 && (
                        <p className="text-muted mb-0">Aún no hay órdenes en este período.</p>
                    )}

                    {recientes.length > 0 && (
                        <table className="table align-middle mb-0">
                            <thead>
                                <tr>
                                    <th>N°</th>
                                    <th>Fecha</th>
                                    <th>Cliente</th>
                                    <th className="text-end">Total</th>
                                    <th>Estado</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {recientes.map((o: Orden) => (
                                    <tr key={o.numero}>
                                        <td>#{o.numero}</td>
                                        <td>{new Date(o.fecha).toLocaleDateString('es-CL')}</td>
                                        <td>{o.nombre || o.correo}</td>
                                        <td className="text-end">{dinero(o.total)}</td>
                                        <td>{o.estado}</td>
                                        <td className="text-end">
                                            <Link to={`/admin/ordenes/${o.numero}`} className="btn btn-sm btn-outline-dark">
                                                Ver boleta
                                            </Link>
                                        </td>
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

export default AdminReportes