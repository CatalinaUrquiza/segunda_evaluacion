// PRUEBAS DE PROPIEDADES (props)
//  - Los componentes reciben y usan las propiedades adecuadas.
//  - Un botón recibe la etiqueta y la función del evento onClick.

import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import BotonAgregar from '../src/componentes/atomos/BotonAgregar'
import Boton from '../src/componentes/atomos/Boton'
import CardProducto from '../src/componentes/moleculas/CardProducto'
import CardCarrito from '../src/componentes/moleculas/CardCarrito'
import ResumenCarrito from '../src/componentes/moleculas/ResumenCarrito'

const peso = (valor: number) => '$' + valor.toLocaleString('es-CL')

describe('Propiedades recibidas', () => {

    it('BotonAgregar muestra su etiqueta y ejecuta la función alClick que recibe', () => {
        const alClick = jasmine.createSpy('alClick')

        render(<BotonAgregar alClick={alClick} />)

        const boton = screen.getByRole('button', { name: 'Añadir al carrito' })
        expect(boton).toBeTruthy()
        expect(alClick).not.toHaveBeenCalled()

        fireEvent.click(boton)

        expect(alClick).toHaveBeenCalledTimes(1)
    })

    it('Boton usa el id recibido para armar el enlace al detalle del producto', () => {
        render(<MemoryRouter><Boton id="MC001" /></MemoryRouter>)

        const enlace = screen.getByRole('link', { name: 'Ver producto' })

        expect(enlace.getAttribute('href')).toBe('/producto/MC001')
    })

    it('CardProducto usa el id para el enlace y el precio de oferta como precio destacado', () => {
        const { container } = render(
            <MemoryRouter>
                <CardProducto id="PT001" titulo="Pintura látex" precio={9990} precioOferta={7990} imagen="/img/PT001.webp" />
            </MemoryRouter>
        )

        expect(container.querySelector('a')?.getAttribute('href')).toBe('/producto/PT001')
        // El precio normal aparece tachado y el de oferta en rojo
        expect(container.querySelector('.text-decoration-line-through')?.textContent).toBe(peso(9990))
        expect(container.querySelector('.text-danger')?.textContent).toBe(peso(7990))
    })

    it('CardCarrito muestra el nombre, el código, la cantidad, el precio y el subtotal recibidos', () => {
        const funcionVacia = () => {}

        render(
            <CardCarrito
                id="MC001"
                nombre="Cemento Polpaico gris 25 kg"
                precio={4990}
                cantidad={3}
                imagen="/img/MC001.webp"
                alSumar={funcionVacia}
                alRestar={funcionVacia}
                alEliminar={funcionVacia}
            />
        )

        expect(screen.getByText('Cemento Polpaico gris 25 kg')).toBeTruthy()
        expect(screen.getByText('Cod: MC001')).toBeTruthy()
        expect(screen.getByDisplayValue('3')).toBeTruthy()
        expect(screen.getByText(peso(4990))).toBeTruthy()
        expect(screen.getByText('Subtotal: ' + peso(4990 * 3))).toBeTruthy()
    })

    it('ResumenCarrito muestra el total recibido y conecta sus botones con las funciones recibidas', () => {
        const alPagar = jasmine.createSpy('alPagar')
        const alLimpiar = jasmine.createSpy('alLimpiar')

        render(<ResumenCarrito total={37992} alPagar={alPagar} alLimpiar={alLimpiar} />)

        expect(screen.getByText(peso(37992))).toBeTruthy()

        fireEvent.click(screen.getByRole('button', { name: 'Comprar ahora' }))
        expect(alPagar).toHaveBeenCalledTimes(1)
        expect(alLimpiar).not.toHaveBeenCalled()

        fireEvent.click(screen.getByRole('button', { name: 'Limpiar carrito' }))
        expect(alLimpiar).toHaveBeenCalledTimes(1)
    })
})
