import { Link } from "react-router-dom";
import FormularioLogin from "../componentes/organismos/FormularioLogin";

function Login() {

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-12 col-md-8 col-lg-6">
                    <div className="card shadow-sm p-4">

                        <h2 className="mb-4">Inicio de Sesión</h2>

                        <FormularioLogin />

                        <p className="text-center text-muted mt-4 mb-0">
                            ¿No tienes cuenta? <Link to="/registro">Regístrate</Link>
                        </p>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login