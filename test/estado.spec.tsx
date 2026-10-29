// PRUEBAS DE ESTADO (state)
//  - La lógica de cambios de estado dentro de los componentes.
//  - El estado de un formulario cambia cuando el usuario escribe.

import { useState } from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import CampoFormulario from '../src/componentes/moleculas/CampoFormulario'
import FormularioLogin from '../src/componentes/organismos/FormularioLogin'
import Checkout from '../src/paginas/Checkout'

// Componente de prueba: guarda en su estado lo que se escribe en el campo
function CampoConEstado() {
    const [valor, setValor] = useState('')

    return (
        <>
            <CampoFormulario etiqueta="Nombre" tipo="text" nombre="nombre" valor={valor} alCambiar={setValor} />
            <p data-testid="eco">{valor}</p>
        </>
    )
}

const carritoDePrueba = [
    { id: 'MC001', nombre: 'Cemento Polpaico gris 25 kg', precio: 4990, precioOriginal: 5990, cantidad: 2, imagen: '/img/MC001.webp' }
]

describe('Estado de los formularios', () => {

    beforeEach(() => {
        localStorage.clear()
    })

    it('el estado de un campo cambia cuando el usuario escribe texto', () => {
        const { container } = render(<CampoConEstado />)
        const campo = container.querySelector('input[name="nombre"]') as HTMLInputElement

        expect(campo.value).toBe('')

        fireEvent.change(campo, { target: { value: 'Pedro' } })

        expect(campo.value).toBe('Pedro')
        expect(screen.getByTestId('eco').textContent).toBe('Pedro')

        fireEvent.change(campo, { target: { value: 'Pedro Pérez' } })

        expect(campo.value).toBe('Pedro Pérez')
        expect(screen.getByTestId('eco').textContent).toBe('Pedro Pérez')
    })

    it('el formulario de login guarda en su estado el correo y la contraseña escritos', () => {
        const { container } = render(<MemoryRouter><FormularioLogin /></MemoryRouter>)
        const correo = container.querySelector('input[name="correo"]') as HTMLInputElement
        const contrasena = container.querySelector('input[name="contrasena"]') as HTMLInputElement

        expect(correo.value).toBe('')
        expect(contrasena.value).toBe('')

        fireEvent.change(correo, { target: { value: 'cliente@gmail.com' } })
        fireEvent.change(contrasena, { target: { value: '1234' } })

        expect(correo.value).toBe('cliente@gmail.com')
        expect(contrasena.value).toBe('1234')
    })
})

describe('Estado del formulario de compra (Checkout)', () => {

    beforeEach(() => {
        localStorage.clear()
        localStorage.setItem('carritoFerreteria', JSON.stringify(carritoDePrueba))
    })

    it('sin sesión iniciada, los datos del cliente parten vacíos', () => {
        const { container } = render(<MemoryRouter><Checkout /></MemoryRouter>)

        expect((container.querySelector('input[name="nombre"]') as HTMLInputElement).value).toBe('')
        expect((container.querySelector('input[name="correo"]') as HTMLInputElement).value).toBe('')
        expect((container.querySelector('select[name="region"]') as HTMLSelectElement).value).toBe('')
    })

    it('con sesión iniciada, el estado inicial se completa con los datos del usuario', () => {
        localStorage.setItem('usuarioActivo', JSON.stringify({
            nombre: 'Ana',
            apellidos: 'Soto',
            correo: 'ana@gmail.com',
            direccion: 'Calle Uno 123',
            region: 'Región de Valparaíso',
            comuna: 'Viña del Mar',
            rol: 'Cliente'
        }))

        const { container } = render(<MemoryRouter><Checkout /></MemoryRouter>)

        expect((container.querySelector('input[name="nombre"]') as HTMLInputElement).value).toBe('Ana')
        expect((container.querySelector('input[name="apellidos"]') as HTMLInputElement).value).toBe('Soto')
        expect((container.querySelector('input[name="correo"]') as HTMLInputElement).value).toBe('ana@gmail.com')
        expect((container.querySelector('input[name="calle"]') as HTMLInputElement).value).toBe('Calle Uno 123')
        expect((container.querySelector('select[name="region"]') as HTMLSelectElement).value).toBe('Región de Valparaíso')
        expect((container.querySelector('select[name="comuna"]') as HTMLSelectElement).value).toBe('Viña del Mar')
    })

    it('al elegir una región se cargan sus comunas, y al cambiarla la comuna se reinicia', () => {
        const { container } = render(<MemoryRouter><Checkout /></MemoryRouter>)
        const region = container.querySelector('select[name="region"]') as HTMLSelectElement
        const comuna = container.querySelector('select[name="comuna"]') as HTMLSelectElement
        const comunasDisponibles = () => Array.from(comuna.options).map(o => o.value)

        // Sin región solo existe la opción inicial
        expect(comunasDisponibles()).toEqual([''])

        fireEvent.change(region, { target: { value: 'Región de Valparaíso' } })
        expect(comunasDisponibles()).toContain('Viña del Mar')
        expect(comunasDisponibles()).not.toContain('Cerrillos')

        fireEvent.change(comuna, { target: { value: 'Viña del Mar' } })
        expect(comuna.value).toBe('Viña del Mar')

        // Al cambiar de región se borra la comuna elegida
        fireEvent.change(region, { target: { value: 'Región Metropolitana' } })
        expect(comuna.value).toBe('')
        expect(comunasDisponibles()).toContain('Cerrillos')
    })

    it('el estado del formulario cambia al escribir en los campos de dirección', () => {
        const { container } = render(<MemoryRouter><Checkout /></MemoryRouter>)
        const calle = container.querySelector('input[name="calle"]') as HTMLInputElement
        const indicaciones = container.querySelector('textarea') as HTMLTextAreaElement

        fireEvent.change(calle, { target: { value: 'Los Crisantemos 100' } })
        fireEvent.change(indicaciones, { target: { value: 'El martes no estamos' } })

        expect(calle.value).toBe('Los Crisantemos 100')
        expect(indicaciones.value).toBe('El martes no estamos')
    })
})
