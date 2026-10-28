import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CampoFormulario from "../moleculas/CampoFormulario";
import { obtenerUsuarios } from "../../datos/usuarios";
import { validarCorreo } from "../../utils/validaciones";

function FormularioLogin(){

    const navigate = useNavigate();

    const [correo, setCorreo] = useState("");
    const [contrasena, setContrasena] = useState("");

    const manejarEnvio = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault(); // Evita recargar la pagina

        if (correo.trim() === ""){
            alert("Debe ingresar su correo");
            return;
        }

        if (!validarCorreo(correo)) {
            alert("Sólo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com");
            return;
        }

        if (contrasena.trim() === ""){
            alert("Debe ingresar una contraseña");
            return;
        }

        if (contrasena.length < 4 || contrasena.length > 10) {
            alert("La contraseña debe tener entre 4 y 10 caracteres");
            return;
        }

        // Busca al usuario en la base de datos (prueba + registrados)
        const usuario = obtenerUsuarios().find(
            u => u.correo === correo && u.clave === contrasena
        );

        if (!usuario) {
            alert("Correo o contraseña incorrectos");
            return;
        }

        // Guarda quién inició sesión
        localStorage.setItem('usuarioActivo', JSON.stringify(usuario));

        alert(`¡Bienvenid@, ${usuario.rol}!`);

        // El administrador va a su panel; los demás, al inicio
        if (usuario.rol === "Administrador") {
            navigate("/admin");
        } else {
            navigate("/");
        }
    };

    return(
        <form onSubmit={manejarEnvio} noValidate>

            <CampoFormulario
                etiqueta="Correo Electrónico"
                tipo="email"
                nombre="correo"
                valor = {correo}
                alCambiar={setCorreo}
            />

            <CampoFormulario
                etiqueta="Contraseña"
                tipo="password"
                nombre="contrasena"
                valor = {contrasena}
                alCambiar={setContrasena}
            />

            <button type="submit" className="btn btn-primary">
                Ingresar
            </button>

        </form>
    );
}

export default FormularioLogin;