// PRUEBAS DE LA LÓGICA DEL CARRITO (src/utils/carrito.js)
// No dibujan componentes: prueban las funciones que calculan y guardan.

import {
    obtenerCarrito,
    agregarProducto,
    cambiarCantidad,
    quitarProducto,
    vaciarCarrito,
    calcularTotal,
    contarUnidades,
    validarCliente,
    procesarPago,
    obtenerUltimoPedido
} from '../src/utils/carrito'
import { obtenerProducto } from '../src/datos/productos'
import { obtenerOrdenes } from '../src/datos/ordenes'

const clienteValido = {
    nombre: 'Pedro',
    apellidos: 'Hacker',
    correo: 'pedro@gmail.com',
    calle: 'Los Crisantemos',
    departamento: '603',
    region: 'Región Metropolitana',
    comuna: 'Cerrillos',
    indicaciones: ''
}

describe('Carrito: agregar, cambiar y quitar productos', () => {

    beforeEach(() => {
        localStorage.clear()
    })

    it('agregar un producto en oferta guarda el precio de oferta y el original', () => {
        const resultado = agregarProducto(obtenerProducto('MC001'), 2)

        expect(resultado.ok).toBeTrue()
        expect(obtenerCarrito()[0].precio).toBe(4990)
        expect(obtenerCarrito()[0].precioOriginal).toBe(5990)
        expect(obtenerCarrito()[0].cantidad).toBe(2)
    })

    it('agregar el mismo producto otra vez suma la cantidad en vez de duplicarlo', () => {
        agregarProducto(obtenerProducto('MC002'), 1)
        agregarProducto(obtenerProducto('MC002'), 2)

        expect(obtenerCarrito().length).toBe(1)
        expect(obtenerCarrito()[0].cantidad).toBe(3)
    })

    it('no permite superar el stock disponible', () => {
        // Cada producto parte con stock 20
        const resultado = agregarProducto(obtenerProducto('MC002'), 21)

        expect(resultado.ok).toBeFalse()
        expect(resultado.mensaje).toContain('No hay stock suficiente')
        expect(obtenerCarrito().length).toBe(0)
    })

    it('cambiarCantidad suma y resta, y elimina el producto al llegar a 0', () => {
        agregarProducto(obtenerProducto('MC002'), 1)

        cambiarCantidad('MC002', 1)
        expect(obtenerCarrito()[0].cantidad).toBe(2)

        cambiarCantidad('MC002', -1)
        cambiarCantidad('MC002', -1)
        expect(obtenerCarrito().length).toBe(0)
    })

    it('quitarProducto y vaciarCarrito eliminan lo guardado', () => {
        agregarProducto(obtenerProducto('MC002'), 1)
        agregarProducto(obtenerProducto('PT007'), 1)

        quitarProducto('MC002')
        expect(obtenerCarrito().length).toBe(1)

        vaciarCarrito()
        expect(obtenerCarrito().length).toBe(0)
    })

    it('calcula el total y la cantidad de unidades', () => {
        agregarProducto(obtenerProducto('MC001'), 3)   // oferta: 4990 c/u
        agregarProducto(obtenerProducto('MC002'), 1)   // 7490

        expect(calcularTotal()).toBe(4990 * 3 + 7490)
        expect(contarUnidades()).toBe(4)
    })
})

describe('Carrito: validación del formulario de compra', () => {

    it('un formulario vacío tiene un error por cada campo obligatorio', () => {
        const errores = validarCliente({
            nombre: '', apellidos: '', correo: '', calle: '',
            departamento: '', region: '', comuna: '', indicaciones: ''
        })

        expect(Object.keys(errores).sort()).toEqual(['apellidos', 'calle', 'comuna', 'correo', 'nombre', 'region'])
    })

    it('rechaza un correo con formato inválido', () => {
        const errores = validarCliente({ ...clienteValido, correo: 'esto-no-es-un-correo' })

        expect(errores.correo).toBe('El correo no es válido')
    })

    it('acepta datos correctos (departamento e indicaciones son opcionales)', () => {
        const errores = validarCliente({ ...clienteValido, departamento: '', indicaciones: '' })

        expect(Object.keys(errores).length).toBe(0)
    })
})

describe('Carrito: pago simulado', () => {

    beforeEach(() => {
        localStorage.clear()
    })

    it('un pago exitoso crea la orden, descuenta el stock y vacía el carrito', () => {
        spyOn(Math, 'random').and.returnValue(0.99)
        agregarProducto(obtenerProducto('MC002'), 2)

        const pedido = procesarPago(clienteValido)

        expect(pedido.estado).toBe('exitoso')
        expect(pedido.numero).toBe(1001)
        expect(obtenerCarrito().length).toBe(0)
        expect(obtenerOrdenes().length).toBe(1)
        expect(obtenerOrdenes()[0].total).toBe(7490 * 2)
        expect(obtenerProducto('MC002').stock).toBe(18)
        expect(obtenerUltimoPedido().estado).toBe('exitoso')
    })

    it('un pago rechazado conserva el carrito, no crea orden y no toca el stock', () => {
        spyOn(Math, 'random').and.returnValue(0)
        agregarProducto(obtenerProducto('MC002'), 2)

        const pedido = procesarPago(clienteValido)

        expect(pedido.estado).toBe('error')
        expect(pedido.motivo).not.toBe('')
        expect(obtenerCarrito().length).toBe(1)
        expect(obtenerOrdenes().length).toBe(0)
        expect(obtenerProducto('MC002').stock).toBe(20)
    })

    it('no se puede pagar con el carrito vacío', () => {
        const pedido = procesarPago(clienteValido)

        expect(pedido.estado).toBe('error')
        expect(pedido.motivo).toBe('El carrito está vacío.')
    })
})
