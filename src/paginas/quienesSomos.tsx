function QuienesSomos() {

    return (
        <div className="container my-5">

            {/* Título Principal */}
            <h2>Quiénes Somos</h2>

            <div className="container my-5 bg-white p-5 rounded shadow-sm row align-items-center">

                {/* IMAGEN */}
                <div className="col-md-5 mb-4 mb-md-0 text-center">
                    <img src="../img/Nosotros.jpg" className="img-blog-fija" alt="Imagen No Disponible" />
                </div>

                {/* TEXTO */}
                <div className="col-md-7 ps-md-4">
                    <p>
                        Somos un <strong>negocio familiar</strong> ubicado en La Serena, Región de Coquimbo, con <strong>22 años de trayectoria</strong> en el rubro. Nuestro compromiso es entregar un servicio cercano y de confianza a nuestra comunidad.
                    </p>
                    <p>
                        A diferencia de las grandes cadenas, nos enorgullece brindar una atención personalizada, siendo nuestro local atendido directamente por el dueño, su hijo y nuestro equipo de planta.
                    </p>
                    <p>
                        Nos especializamos en <strong>materiales de construcción, herramientas eléctricas y manuales, gasfitería, electricidad y artículos de ferretería en general</strong>. Contamos con un catálogo que supera las <strong>800 referencias</strong> para cubrir todas tus necesidades.
                    </p>
                    <p>
                        Nuestros productos y servicios están pensados tanto para <strong>particulares</strong> que buscan mejorar sus hogares, como para <strong>contratistas y maestros de obra</strong> que requieren compras en mayores volúmenes y con alta frecuencia.
                    </p>
                </div>

            </div>

        </div>
    )
}

export default QuienesSomos