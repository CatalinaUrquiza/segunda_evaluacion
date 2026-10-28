import { Routes, Route, useLocation } from 'react-router-dom'
import Inicio from './paginas/Inicio'
import Productos from './paginas/Productos'
import Navbar from './componentes/organismos/Navbar'
import QuienesSomos from './paginas/quienesSomos'
import Contacto from './paginas/Contacto'
import DetalleProducto from './paginas/DetalleProducto'
import Login from './paginas/Login'
import Registro from './paginas/Registro'
import Blogs from './paginas/Blogs'
import Carrito from './paginas/Carrito'
import Ofertas from './paginas/Ofertas'
import AdminLayout from './paginas/admin/AdminLayout'
import AdminDashboard from './paginas/admin/AdminDashboard'
import AdminProductos from './paginas/admin/AdminProductos'
import AdminProductoForm from './paginas/admin/AdminProductoForm'
import AdminOrdenes from './paginas/admin/AdminOrdenes'
import AdminBoleta from './paginas/admin/AdminBoleta'
import Checkout from './paginas/Checkout'
import PagoCorrecto from './paginas/PagoCorrecto'
import PagoError from './paginas/PagoError'

function App() {

  // En el panel de administración no se muestra la Navbar de la tienda
  const { pathname } = useLocation()
  const enAdmin = pathname.startsWith('/admin')

  return (
    <>
      {!enAdmin && <Navbar />}

      <Routes>

        <Route
          path = "/"
          element = {<Inicio />}
        />

        <Route
          path = "/productos"
          element = {<Productos />}
        />

        <Route
          path = "/ofertas"
          element = {<Ofertas />}
        />

        <Route
          path = "/quienesSomos"
          element = {<QuienesSomos />}
        />

        <Route
          path = "/contacto"
          element = {<Contacto />}
        />

        <Route
          path = "/login"
          element = {<Login />}
        />

        <Route
          path = "/registro"
          element = {<Registro />}
        />

        <Route
          path = "/blogs"
          element = {<Blogs />}
        />

        <Route
          path = "/carrito"
          element = {<Carrito />}
        />

        {/* Compra: formulario de pago y resultado */}
        <Route
          path = "/checkout"
          element = {<Checkout />}
        />

        <Route
          path = "/pago-correcto"
          element = {<PagoCorrecto />}
        />

        <Route
          path = "/pago-error"
          element = {<PagoError />}
        />

        {/* Ruta dinamica para mostrar el detalle segun el id del producto */}
        <Route
          path = "/producto/:id"
          element = {<DetalleProducto />}
        />

        {/* Panel de administración */}
        <Route path = "/admin" element = {<AdminLayout />}>
          <Route index element = {<AdminDashboard />} />
          <Route path = "productos" element = {<AdminProductos />} />
          <Route path = "productos/nuevo" element = {<AdminProductoForm />} />
          <Route path = "productos/editar/:id" element = {<AdminProductoForm />} />
          <Route path = "ordenes" element = {<AdminOrdenes />} />
          <Route path = "ordenes/:numero" element = {<AdminBoleta />} />
        </Route>

      </Routes>
    </>
  )
}

export default App