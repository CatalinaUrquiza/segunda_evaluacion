import { Link } from "react-router-dom";
import FormularioRegistro from "../componentes/organismos/FormularioRegistro";

function Registro() {

    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-12 col-md-10 col-lg-7">
                    <div className="card shadow-sm p-4">

                        <h2 className="mb-4">Crear cuenta</h2>

                        <FormularioRegistro />

                        <p className="text-center text-muted mt-4 mb-0">
                            ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
                        </p>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Registro