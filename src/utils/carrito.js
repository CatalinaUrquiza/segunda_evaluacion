// Lógica del carrito de compras. Todo se guarda en localStorage.

import { obtenerProducto, actualizarProducto } from '../datos/productos'
import { proximoNumeroOrden, crearOrden } from '../datos/ordenes'

const CLAVE_CARRITO = 'carritoFerreteria'
const CLAVE_PEDIDO = 'ultimoPedidoFerreteria'
const EVENTO = 'carrito-actualizado'

// Probabilidad de que el pago simulado falle (0.2 = 20%).
// Ponlo en 0 para que siempre salga bien, o en 1 para que siempre falle.
export const PROBABILIDAD_ERROR_PAGO = 0.2

// ---------------------------------------------------------------
// LECTURA / ESCRITURA
// ---------------------------------------------------------------

/** @returns {any[]} */
export function obtenerCarrito() {
    try {
        const guardado = localStorage.getItem(CLAVE_CARRITO)
        return guardado ? JSON.parse(guardado) : []
    } catch {
        return []
    }
}

function guardarCarrito(carrito) {
    localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito))
    // Avisa a otros componentes (por ejemplo, el total que se ve en la Navbar)
    window.dispatchEvent(new Event(EVENTO))
    return carrito
}

// Para que la Navbar se actualice sola. Devuelve la función que cancela la suscripción.
export function suscribirCarrito(callback) {
    window.addEventListener(EVENTO, callback)
    window.addEventListener('storage', callback) // cambios hechos en otra pestaña
    return () => {
        window.removeEventListener(EVENTO, callback)
        window.removeEventListener('storage', callback)
    }
}

// Stock real del producto (lo define el admin). Si no tiene stock definido, no se limita.
function stockDisponible(id) {
    const producto = obtenerProducto(id)
    return producto && typeof producto.stock === 'number' ? producto.stock : Infinity
}

// ---------------------------------------------------------------
// ACCIONES DEL CARRITO
// ---------------------------------------------------------------

// Añade un producto. No deja superar el stock.
// Devuelve { ok, mensaje, carrito } para poder avisarle al usuario.
export function agregarProducto(producto, cantidad = 1) {
    const carrito = obtenerCarrito()
    const existente = carrito.find(p => p.id === producto.id)
    const enCarrito = existente ? existente.cantidad : 0
    const stock = stockDisponible(producto.id)

    if (stock <= 0) {
        return { ok: false, mensaje: 'Este producto no tiene stock disponible.', carrito }
    }

    if (enCarrito + cantidad > stock) {
        return {
            ok: false,
            mensaje: `No hay stock suficiente. Disponible: ${stock}. Ya tienes ${enCarrito} en tu carrito.`,
            carrito
        }
    }

    if (existente) {
        existente.cantidad += cantidad
    } else {
        const enOferta = producto.precioOferta !== undefined && producto.precioOferta < producto.precio
        carrito.push({
            id: producto.id,
            nombre: producto.nombre,
            precio: enOferta ? producto.precioOferta : producto.precio,
            precioOriginal: enOferta ? producto.precio : undefined,
            cantidad: cantidad,
            imagen: producto.imagen
        })
    }

    guardarCarrito(carrito)
    return { ok: true, mensaje: 'Producto añadido al carrito', carrito }
}

// Botones - y +. Si la cantidad llega a 0 el producto se elimina.
// Al sumar no pasa del stock disponible.
export function cambiarCantidad(id, cambio) {
    const stock = stockDisponible(id)

    const carrito = obtenerCarrito()
        .map(p => {
            const nueva = p.cantidad + cambio
            if (p.id !== id) return p
            if (cambio > 0 && nueva > stock) return p
            return { ...p, cantidad: nueva }
        })
        .filter(p => p.cantidad > 0)

    return guardarCarrito(carrito)
}

// Botón "Eliminar"
export function quitarProducto(id) {
    return guardarCarrito(obtenerCarrito().filter(p => p.id !== id))
}

// Botón "Limpiar"
export function vaciarCarrito() {
    return guardarCarrito([])
}

// ---------------------------------------------------------------
// CÁLCULOS
// ---------------------------------------------------------------

export function calcularSubtotal(item) {
    return item.precio * item.cantidad
}

export function calcularTotal(carrito = obtenerCarrito()) {
    return carrito.reduce((suma, p) => suma + calcularSubtotal(p), 0)
}

export function contarUnidades(carrito = obtenerCarrito()) {
    return carrito.reduce((suma, p) => suma + p.cantidad, 0)
}

// ---------------------------------------------------------------
// DATOS DEL CLIENTE
// ---------------------------------------------------------------

// Si hay una sesión iniciada, el formulario de compra parte con sus datos.
export function datosClienteInicial() {
    let usuario = null
    try {
        usuario = JSON.parse(localStorage.getItem('usuarioActivo') || 'null')
    } catch {
        usuario = null
    }

    return {
        nombre: usuario?.nombre ?? '',
        apellidos: usuario?.apellidos ?? '',
        correo: usuario?.correo ?? '',
        calle: usuario?.direccion ?? '',
        departamento: '',
        region: usuario?.region ?? '',
        comuna: usuario?.comuna ?? '',
        indicaciones: ''
    }
}

// Devuelve un objeto con los errores. Si está vacío, el formulario es válido.
export function validarCliente(c) {
    const errores = {}
    if (c.nombre.trim() === '') errores.nombre = 'Debe ingresar su nombre'
    if (c.apellidos.trim() === '') errores.apellidos = 'Debe ingresar sus apellidos'
    if (c.correo.trim() === '') errores.correo = 'Debe ingresar su correo'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c.correo)) errores.correo = 'El correo no es válido'
    if (c.calle.trim() === '') errores.calle = 'Debe ingresar la calle'
    if (c.region === '') errores.region = 'Debe seleccionar una región'
    if (c.comuna === '') errores.comuna = 'Debe seleccionar una comuna'
    return errores
}

// ---------------------------------------------------------------
// PAGO (simulado: no hay pasarela de pago real)
// ---------------------------------------------------------------

// Intenta pagar lo que hay en el carrito y guarda el resultado en 'ultimoPedidoFerreteria'.
// - Pago correcto: crea la orden (la ve el admin), descuenta el stock y vacía el carrito.
// - Pago con error: el carrito se conserva para poder reintentar.
/** @returns {any} el pedido: { numero, codigoOrden, fecha, cliente, items, total, estado, motivo } */
export function procesarPago(cliente) {
    const items = obtenerCarrito()
    const numero = proximoNumeroOrden()

    const pedido = {
        numero: numero,
        codigoOrden: 'ORDER' + numero,
        fecha: new Date().toISOString(),
        cliente: cliente,
        items: items,
        total: calcularTotal(items),
        estado: 'error',
        motivo: ''
    }

    const sinStock = items.find(i => i.cantidad > stockDisponible(i.id))

    if (items.length === 0) {
        pedido.motivo = 'El carrito está vacío.'
    } else if (sinStock) {
        pedido.motivo = `No hay stock suficiente de "${sinStock.nombre}".`
    } else if (Math.random() < PROBABILIDAD_ERROR_PAGO) {
        pedido.motivo = 'El medio de pago rechazó la transacción.'
    }

    if (pedido.motivo === '') {
        const direccion = [
            cliente.calle,
            cliente.departamento ? `Depto ${cliente.departamento}` : '',
            cliente.comuna,
            cliente.region
        ].filter(texto => texto !== '').join(', ')

        // Esta es la orden que aparece en el panel de administración
        const orden = crearOrden({
            correo: cliente.correo,
            nombre: `${cliente.nombre} ${cliente.apellidos}`,
            direccion: direccion,
            items: items.map(i => ({ id: i.id, nombre: i.nombre, precio: i.precio, cantidad: i.cantidad }))
        })

        // Descuenta lo vendido del stock
        items.forEach(i => {
            const producto = obtenerProducto(i.id)
            if (producto && typeof producto.stock === 'number') {
                actualizarProducto(i.id, { stock: Math.max(0, producto.stock - i.cantidad) })
            }
        })

        vaciarCarrito()
        pedido.numero = orden.numero
        pedido.codigoOrden = 'ORDER' + orden.numero
        pedido.estado = 'exitoso'
    }

    localStorage.setItem(CLAVE_PEDIDO, JSON.stringify(pedido))
    return pedido
}

// Último pedido (correcto o con error), para mostrarlo en las pantallas de resultado.
export function obtenerUltimoPedido() {
    try {
        const guardado = localStorage.getItem(CLAVE_PEDIDO)
        return guardado ? JSON.parse(guardado) : null
    } catch {
        return null
    }
}
