import CardProducto from '../componentes/moleculas/CardProducto'

function Productos() {

    return(
        <div className = "container mt-4">

            <h1>Productos</h1>
            
            <div className = "d-flex gap-3">

                <CardProducto
                    id = {1}
                    titulo = "Notebook"
                    descripcion = "Notebook ideal para estudiar y trabajar."
                    precio = {400990}
                    imagen = "../img/notebook.webp"
                />

                <CardProducto
                    id = {2}
                    titulo = "Mouse"
                    descripcion = "Mouse inalámbrico."
                    precio = {19990}
                    imagen = "../img/mouse.jpg"
                />

                <CardProducto
                    id = {3}
                    titulo = "Teclado"
                    descripcion = "Teclado mecánico."
                    precio = {39990}
                    imagen = "../img/teclado.jpg"
                />

                <CardProducto
                    id = {4}
                    titulo = "Audífonos"
                    descripcion = "Audífonos inalámbricos"
                    precio = {44490}
                    imagen = "../img/audifonos.png"
                />
            
            </div>

        </div>
    )
}

export default Productos