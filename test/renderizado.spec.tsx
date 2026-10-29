// PRUEBAS DE RENDERIZADO
//  - Renderizado correcto: los componentes se dibujan con los datos que reciben
//    (incluye componentes de lista: se muestran todos los elementos)
//  - Renderizado condicional: se muestran u ocultan elementos según una condición

import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import CardProducto from '../src/componentes/moleculas/CardProducto'
import CardCarrito from '../src/componentes/moleculas/CardCarrito'
import Carrito from '../src/paginas/Carrito'
import Productos from '../src/paginas/Productos'
import PagoError from '../src/paginas/PagoError'
import PagoCorrecto from '../src/paginas/PagoCorrecto'
import { obtenerProductos } from '../src/datos/productos'

// Mismo formato de precio que usa la tienda: $5.990
const peso = (valor: number) => '$' + valor.toLocaleString('es-CL')

const itemsDePrueba = [
    { id: 'MC001', nombre: 'Cemento Polpaico gris 25 kg', precio: 4990, precioOriginal: 5990, cantidad: 2, imagen: '/img/MC001.webp' },
    { id: 'PT007', nombre: 'Rodillo lana 23 cm con mango', precio: 3990, cantidad: 1, imagen: '/img/PT007.webp' },
    { id: 'HM001', nombre: 'Martillo carpintero 500g', precio: 7990, cantidad: 3, imagen: '/img/HM001.webp' }
]

const clienteDePrueba = {
    nombre: 'Pedro',
    apellidos: 'Hacker',
    correo: 'pedro@gmail.com',
    calle: 'Los Crisantemos',
    departamento: '603',
    region: 'Región Metropolitana',
    comuna: 'Cerrillos',
    indicaciones: 'Dejar con el conserje'
}

// Guarda un pedido como si ya se hubiera intentado pagar
function guardarPedido(estado: 'exitoso' | 'error') {
    localStorage.setItem('ultimoPedidoFerreteria', JSON.stringify({
        numero: 1001,
        codigoOrden: 'ORDER1001',
        fecha: new Date().toISOString(),
        cliente: clienteDePrueba,
        items: itemsDePrueba,
        total: 4990 * 2 + 3990 + 7990 * 3,
        estado: estado,
        motivo: estado === 'error' ? 'El medio de pago rechazó la transacción.' : ''
    }))
}

// Dibuja las pantallas de resultado con una página de inicio a la que redirigen
function dibujarPantallasDePago(ruta: string) {
    return render(
        <MemoryRouter initialEntries={[ruta]}>
            <Routes>
                <Route path="/" element={<p>PAGINA DE INICIO</p>} />
                <Route path="/pago-error" element={<PagoError />} />
                <Route path="/pago-correcto" element={<PagoCorrecto />} />
            </Routes>
        </MemoryRouter>
    )
}

describe('Renderizado correcto', () => {

    beforeEach(() => {
        localStorage.clear()
    })

    it('CardProducto muestra el título, el precio y la imagen que recibe', () => {
        const { container } = render(
            <MemoryRouter>
                <CardProducto id="MC002" titulo="Cemento Melón blanco 25 kg" precio={7490} imagen="/img/MC002.jpg" />
            </MemoryRouter>
        )

        expect(screen.getByText('Cemento Melón blanco 25 kg')).toBeTruthy()
        expect(screen.getByText(peso(7490))).toBeTruthy()

        const imagen = container.querySelector('img') as HTMLImageElement
        expect(imagen.getAttribute('src')).toBe('/img/MC002.jpg')
        expect(imagen.getAttribute('alt')).toBe('Cemento Melón blanco 25 kg')
    })

    it('la lista de productos del carrito muestra todos los elementos', () => {
        localStorage.setItem('carritoFerreteria', JSON.stringify(itemsDePrueba))

        const { container } = render(<MemoryRouter><Carrito /></MemoryRouter>)

        itemsDePrueba.forEach(item => {
            expect(screen.getByText(item.nombre)).toBeTruthy()
        })
        expect(container.querySelectorAll('.card').length).toBe(itemsDePrueba.length)
    })

    it('el catálogo muestra una card por cada producto', () => {
        const cantidadEsperada = obtenerProductos().length

        const { container } = render(<MemoryRouter><Productos /></MemoryRouter>)

        expect(cantidadEsperada).toBeGreaterThan(0)
        expect(container.querySelectorAll('.card').length).toBe(cantidadEsperada)
    })

    it('el catálogo filtrado por categoría muestra solo los productos de esa categoría', () => {
        const pinturas = obtenerProductos().filter((p: { categoria: string }) => p.categoria === 'pinturas')

        const { container } = render(
            <MemoryRouter initialEntries={['/productos?cat=pinturas']}>
                <Productos />
            </MemoryRouter>
        )

        expect(container.querySelectorAll('.card').length).toBe(pinturas.length)
        expect(screen.getByRole('heading', { name: 'Pinturas' })).toBeTruthy()
    })
})

describe('Renderizado condicional', () => {

    beforeEach(() => {
        localStorage.clear()
    })

    it('CardProducto muestra la insignia de descuento solo si el producto está en oferta', () => {
        const { unmount } = render(
            <MemoryRouter>
                <CardProducto id="MC001" titulo="Con oferta" precio={5990} precioOferta={4990} imagen="/img/a.webp" />
            </MemoryRouter>
        )

        // (1 - 4990/5990) = 16,7% -> se redondea a 17%
        expect(screen.getByText('-17%')).toBeTruthy()
        expect(screen.getByText(peso(4990))).toBeTruthy()
        unmount()

        const sinOferta = render(
            <MemoryRouter>
                <CardProducto id="MC002" titulo="Sin oferta" precio={7490} imagen="/img/b.jpg" />
            </MemoryRouter>
        )

        expect(sinOferta.container.querySelector('.badge')).toBeNull()
        expect(screen.queryByText(/%/)).toBeNull()
    })

    it('CardCarrito muestra la etiqueta "Oferta" solo cuando hay precio original', () => {
        const funcionVacia = () => {}

        const { unmount } = render(
            <CardCarrito id="MC001" nombre="Con oferta" precio={4990} precioOriginal={5990} cantidad={1}
                imagen="/img/a.webp" alSumar={funcionVacia} alRestar={funcionVacia} alEliminar={funcionVacia} />
        )
        expect(screen.getByText('Oferta')).toBeTruthy()
        expect(screen.getByText(peso(5990))).toBeTruthy()
        unmount()

        render(
            <CardCarrito id="PT007" nombre="Sin oferta" precio={3990} cantidad={1}
                imagen="/img/b.webp" alSumar={funcionVacia} alRestar={funcionVacia} alEliminar={funcionVacia} />
        )
        expect(screen.queryByText('Oferta')).toBeNull()
    })

    it('el carrito vacío muestra el aviso, y con productos no lo muestra', () => {
        const { unmount } = render(<MemoryRouter><Carrito /></MemoryRouter>)
        expect(screen.getByText('Tu carrito está vacío')).toBeTruthy()
        unmount()

        localStorage.setItem('carritoFerreteria', JSON.stringify(itemsDePrueba))
        render(<MemoryRouter><Carrito /></MemoryRouter>)
        expect(screen.queryByText('Tu carrito está vacío')).toBeNull()
    })

    it('el mensaje de error del pago solo se muestra cuando hubo un error', () => {
        guardarPedido('error')
        const { unmount } = dibujarPantallasDePago('/pago-error')

        expect(screen.getByText(/No se pudo realizar el pago/)).toBeTruthy()
        expect(screen.getByText(/El medio de pago rechazó la transacción/)).toBeTruthy()
        unmount()

        // Con un pago exitoso se muestra la confirmación y no el error
        localStorage.clear()
        guardarPedido('exitoso')
        dibujarPantallasDePago('/pago-correcto')

        expect(screen.getByText(/Se ha realizado la compra/)).toBeTruthy()
        expect(screen.queryByText(/No se pudo realizar el pago/)).toBeNull()
    })

    it('si no hay un pedido con error, la pantalla de error redirige al inicio', () => {
        dibujarPantallasDePago('/pago-error')

        expect(screen.getByText('PAGINA DE INICIO')).toBeTruthy()
        expect(screen.queryByText(/No se pudo realizar el pago/)).toBeNull()
    })
})
