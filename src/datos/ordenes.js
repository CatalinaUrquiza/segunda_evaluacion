const CLAVE = 'ordenesFerreteria'

// Estados posibles de una orden
export const estadosOrden = ['Pendiente', 'Enviada', 'Entregada', 'Cancelada']

export function obtenerOrdenes() {
    const guardado = localStorage.getItem(CLAVE)
    return guardado ? JSON.parse(guardado) : []
}

export function obtenerOrden(numero) {
    return obtenerOrdenes().find(o => o.numero === numero)
}

// Se llama al finalizar la compra
// datos = { correo, nombre, items: [{ id, nombre, precio, cantidad }] }
export function crearOrden(datos) {
    const ordenes = obtenerOrdenes()
    const numero = ordenes.length > 0 ? Math.max(...ordenes.map(o => o.numero)) + 1 : 1001

    const orden = {
        numero,
        fecha: new Date().toISOString(),
        correo: datos.correo,
        nombre: datos.nombre,
        items: datos.items,
        total: datos.items.reduce((suma, i) => suma + i.precio * i.cantidad, 0),
        estado: 'Pendiente'
    }

    ordenes.push(orden)
    localStorage.setItem(CLAVE, JSON.stringify(ordenes))
    return orden
}

export function cambiarEstadoOrden(numero, estado) {
    const ordenes = obtenerOrdenes()
    const orden = ordenes.find(o => o.numero === numero)
    if (orden) {
        orden.estado = estado
        localStorage.setItem(CLAVE, JSON.stringify(ordenes))
    }
}