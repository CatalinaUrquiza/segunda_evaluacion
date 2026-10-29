// PRUEBAS DE EVENTOS
//  - Simulan acciones del usuario (clic, enviar formulario) y comprueban que
//    el componente reaccione: cambia su estado o se ejecuta una función.

import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import CardCarrito from '../src/componentes/moleculas/CardCarrito'
import Carrito from '../src/paginas/Carrito'
import DetalleProducto from '../src/paginas/DetalleProducto'
import FormularioLogin from '../src/componentes/organismos/FormularioLogin'
import { obtenerCarrito } from '../src/utils/carrito'

const peso = (valor: number) => '$' + valor.toLocaleString('es-CL')

// Un producto en el carrito (MC001 existe en el catálogo con stock 20)
const cemento = { id: 'MC001', nombre: 'Cemento Polpaico gris 25 kg', precio: 4990, precioOriginal: 5990, cantidad: 1, imagen: '/img/MC001.webp' }

function dibujarCarrito() {
    return render(
        <MemoryRouter initialEntries={['/carrito']}>
            <Routes>
                <Route path="/carrito" element={<Carrito />} />
                <Route path="/checkout" element={<p>PAGINA DE CHECKOUT</p>} />
            </Routes>
        </MemoryRouter>
    )
}

describe('Eventos de CardCarrito', () => {

    it('los botones -, + y Eliminar ejecutan la función correspondiente al hacer clic', () => {
        const alRestar = jasmine.createSpy('alRestar')
        const alSumar = jasmine.createSpy('alSumar')
        const alEliminar = jasmine.createSpy('alEliminar')

        render(
            <CardCarrito id="MC001" nombre="Cemento" precio={4990} cantidad={2} imagen="/img/MC001.webp"
                alRestar={alRestar} alSumar={alSumar} alEliminar={alEliminar} />
        )

        fireEvent.click(screen.getByText('-'))
        expect(alRestar).toHaveBeenCalledTimes(1)
        expect(alSumar).not.toHaveBeenCalled()

        fireEvent.click(screen.getByText('+'))
        expect(alSumar).toHaveBeenCalledTimes(1)

        fireEvent.click(screen.getByRole('button', { name: 'Eliminar' }))
        expect(alEliminar).toHaveBeenCalledTimes(1)
    })
})

describe('Eventos de la página del carrito', () => {

    beforeEach(() => {
        localStorage.clear()
        localStorage.setItem('carritoFerreteria', JSON.stringify([cemento]))
    })

    it('al hacer clic en + sube la cantidad y se actualiza el total', () => {
        dibujarCarrito()

        expect(screen.getByDisplayValue('1')).toBeTruthy()
        expect(screen.getByText(peso(4990 * 1), { selector: 'span' })).toBeTruthy()

        fireEvent.click(screen.getByText('+'))

        expect(screen.getByDisplayValue('2')).toBeTruthy()
        expect(screen.getByText(peso(4990 * 2), { selector: 'span' })).toBeTruthy()
        expect(obtenerCarrito()[0].cantidad).toBe(2)
    })

    it('al hacer clic en - hasta llegar a 0 el producto desaparece del carrito', () => {
        dibujarCarrito()

        fireEvent.click(screen.getByText('-'))

        expect(screen.queryByText(cemento.nombre)).toBeNull()
        expect(screen.getByText('Tu carrito está vacío')).toBeTruthy()
        expect(obtenerCarrito().length).toBe(0)
    })

    it('al hacer clic en Eliminar se quita el producto', () => {
        dibujarCarrito()

        fireEvent.click(screen.getByRole('button', { name: 'Eliminar' }))

        expect(screen.getByText('Tu carrito está vacío')).toBeTruthy()
        expect(obtenerCarrito().length).toBe(0)
    })

    it('Limpiar carrito vacía todo si el usuario confirma, y no hace nada si cancela', () => {
        const confirmar = spyOn(window, 'confirm').and.returnValue(false)
        dibujarCarrito()

        fireEvent.click(screen.getByRole('button', { name: 'Limpiar carrito' }))
        expect(confirmar).toHaveBeenCalledTimes(1)
        expect(screen.getByText(cemento.nombre)).toBeTruthy()

        confirmar.and.returnValue(true)
        fireEvent.click(screen.getByRole('button', { name: 'Limpiar carrito' }))

        expect(screen.getByText('Tu carrito está vacío')).toBeTruthy()
        expect(obtenerCarrito().length).toBe(0)
    })

    it('Comprar ahora lleva al checkout cuando hay productos', () => {
        dibujarCarrito()

        fireEvent.click(screen.getByRole('button', { name: 'Comprar ahora' }))

        expect(screen.getByText('PAGINA DE CHECKOUT')).toBeTruthy()
    })

    it('Comprar ahora avisa con una alerta cuando el carrito está vacío', () => {
        localStorage.clear()
        const alerta = spyOn(window, 'alert')
        dibujarCarrito()

        fireEvent.click(screen.getByRole('button', { name: 'Comprar ahora' }))

        expect(alerta).toHaveBeenCalledWith('No tienes productos en el carrito para pagar.')
        expect(screen.queryByText('PAGINA DE CHECKOUT')).toBeNull()
    })
})

describe('Eventos del detalle de producto', () => {

    beforeEach(() => {
        localStorage.clear()
    })

    function dibujarDetalle() {
        return render(
            <MemoryRouter initialEntries={['/producto/MC001']}>
                <Routes>
                    <Route path="/producto/:id" element={<DetalleProducto />} />
                </Routes>
            </MemoryRouter>
        )
    }

    it('al hacer clic en "Añadir al carrito" el producto queda guardado con su precio de oferta', () => {
        const alerta = spyOn(window, 'alert')
        dibujarDetalle()

        fireEvent.click(screen.getByRole('button', { name: 'Añadir al carrito' }))

        expect(alerta).toHaveBeenCalledWith('Producto añadido al carrito')
        expect(obtenerCarrito().length).toBe(1)
        expect(obtenerCarrito()[0].id).toBe('MC001')
        expect(obtenerCarrito()[0].precio).toBe(4990)
        expect(obtenerCarrito()[0].precioOriginal).toBe(5990)
    })

    it('no deja añadir más unidades que el stock disponible', () => {
        const alerta = spyOn(window, 'alert')
        const { container } = dibujarDetalle()

        fireEvent.change(container.querySelector('#cantidad') as HTMLInputElement, { target: { value: '999' } })
        fireEvent.click(screen.getByRole('button', { name: 'Añadir al carrito' }))

        expect(alerta).toHaveBeenCalledWith(jasmine.stringContaining('No hay stock suficiente'))
        expect(obtenerCarrito().length).toBe(0)
    })
})

describe('Eventos del formulario de login', () => {

    beforeEach(() => {
        localStorage.clear()
    })

    function dibujarLogin() {
        return render(
            <MemoryRouter initialEntries={['/login']}>
                <Routes>
                    <Route path="/login" element={<FormularioLogin />} />
                    <Route path="/" element={<p>PAGINA DE INICIO</p>} />
                    <Route path="/admin" element={<p>PANEL ADMIN</p>} />
                </Routes>
            </MemoryRouter>
        )
    }

    it('enviar el formulario vacío muestra el aviso de que falta el correo', () => {
        const alerta = spyOn(window, 'alert')
        const { container } = dibujarLogin()

        fireEvent.submit(container.querySelector('form') as HTMLFormElement)

        expect(alerta).toHaveBeenCalledWith('Debe ingresar su correo')
    })

    it('enviar un correo con dominio no permitido muestra el aviso correspondiente', () => {
        const alerta = spyOn(window, 'alert')
        const { container } = dibujarLogin()

        fireEvent.change(container.querySelector('input[name="correo"]') as HTMLInputElement, { target: { value: 'alguien@hotmail.com' } })
        fireEvent.submit(container.querySelector('form') as HTMLFormElement)

        expect(alerta).toHaveBeenCalledWith('Sólo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com')
    })

    it('un cliente con datos correctos inicia sesión y va al inicio', () => {
        const alerta = spyOn(window, 'alert')
        const { container } = dibujarLogin()

        fireEvent.change(container.querySelector('input[name="correo"]') as HTMLInputElement, { target: { value: 'cliente@gmail.com' } })
        fireEvent.change(container.querySelector('input[name="contrasena"]') as HTMLInputElement, { target: { value: '1234' } })
        fireEvent.submit(container.querySelector('form') as HTMLFormElement)

        expect(alerta).toHaveBeenCalledWith('¡Bienvenid@, Cliente!')
        expect(JSON.parse(localStorage.getItem('usuarioActivo') as string).correo).toBe('cliente@gmail.com')
        expect(screen.getByText('PAGINA DE INICIO')).toBeTruthy()
    })

    it('el administrador inicia sesión y va a su panel', () => {
        spyOn(window, 'alert')
        const { container } = dibujarLogin()

        fireEvent.change(container.querySelector('input[name="correo"]') as HTMLInputElement, { target: { value: 'admin@admin.com' } })
        fireEvent.change(container.querySelector('input[name="contrasena"]') as HTMLInputElement, { target: { value: 'admin' } })
        fireEvent.submit(container.querySelector('form') as HTMLFormElement)

        expect(screen.getByText('PANEL ADMIN')).toBeTruthy()
    })
})
