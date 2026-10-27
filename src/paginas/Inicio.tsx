import CardCategoria from '../componentes/moleculas/CardCategoria'

function Inicio() {

    return (
        <div>

            {/* CARRUSEL DE IMAGENES */}
            <div className="container my-4 carrusel-contenedor">

                <div id="carruselPrincipal" className="carousel slide rounded overflow-hidden" data-bs-ride="carousel">

                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carruselPrincipal" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carruselPrincipal" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carruselPrincipal" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>

                    <div className="carousel-inner">

                        <div className="carousel-item active">
                            <img src="/img/carrusel/carrusel1.jpg" className="d-block w-100" alt="Imagen no Disponible" />
                        </div>

                        <div className="carousel-item">
                            <img src="/img/carrusel/carrusel2.jpg" className="d-block w-100" alt="Imagen no Disponible" />
                        </div>

                        <div className="carousel-item">
                            <img src="/img/carrusel/carrusel3.jpg" className="d-block w-100" alt="Imagen no Disponible" />
                        </div>

                    </div>

                    <button className="carousel-control-prev" type="button" data-bs-target="#carruselPrincipal" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>

                    <button className="carousel-control-next" type="button" data-bs-target="#carruselPrincipal" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>

                </div>

            </div>

            {/* TARJETAS DE CATEGORÍAS */}
            <div className="container mb-5">

                <div className="text-center mb-5">
                    <h2>Explora Nuestras Categorías</h2>
                    <p className="text-muted">Encuentra todo lo que necesitas para tus proyectos</p>
                </div>

                {/* 3 columnas en PC, 2 en tablets, 1 en celulares */}
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">

                    <CardCategoria
                        titulo = "Mat. Construcción"
                        imagen = "/img/img-categorias/materiales_construccion.jpg"
                        categoria = "construccion"
                    />

                    <CardCategoria
                        titulo = "Pinturas"
                        imagen = "/img/img-categorias/pinturas.jpg"
                        categoria = "pinturas"
                    />

                    <CardCategoria
                        titulo = "Herramientas"
                        imagen = "/img/img-categorias/herramientas.webp"
                        categoria = "herramientas"
                    />

                    <CardCategoria
                        titulo = "Gasfitería"
                        imagen = "/img/img-categorias/gasfiteria.jpg"
                        categoria = "gasfiteria"
                    />

                    <CardCategoria
                        titulo = "Electricidad"
                        imagen = "/img/img-categorias/electricidad.webp"
                        categoria = "electricidad"
                    />

                    <CardCategoria
                        titulo = "Tornillería"
                        imagen = "/img/img-categorias/tornilleria.webp"
                        categoria = "tornilleria"
                    />

                    <CardCategoria
                        titulo = "Madera"
                        imagen = "/img/img-categorias/madera.jpg"
                        categoria = "madera"
                    />

                    <CardCategoria
                        titulo = "Seguridad"
                        imagen = "/img/img-categorias/seguridad.webp"
                        categoria = "seguridad"
                    />

                    <CardCategoria
                        titulo = "Jardín"
                        imagen = "/img/img-categorias/jardin.webp"
                        categoria = "jardin"
                    />

                </div>
            </div>

        </div>
    )
}

export default Inicio