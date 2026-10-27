import { Routes, Route } from 'react-router-dom'
import Inicio from './paginas/Inicio'
import Productos from './paginas/Productos'
import Navbar from './componentes/organismos/Navbar'
import QuienesSomos from './paginas/quienesSomos'
import Contacto from './paginas/Contacto'
import DetalleProducto from './paginas/DetalleProducto'
import Login from './paginas/Login'
import Blogs from './paginas/Blogs'

function App() {

  return (
    <>
      <Navbar />

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
          path = "/blogs"
          element = {<Blogs />}
        />

        {/* Ruta dinamica para mostrar el detalle segun el id del producto */}
        <Route path = "/producto/:id"
        element = {<DetalleProducto />}
        />

      </Routes>
    </>
  )
}

export default App