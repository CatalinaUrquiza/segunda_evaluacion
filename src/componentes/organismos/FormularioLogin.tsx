import React, { useState } from "react";
import CampoFormulario from "../moleculas/CampoFormulario";

function FormularioLogin(){

    const [correo, setCorreo] = useState("");
    const [contrasena, setContrasena] = useState("");

    // Valida los datos al enviar el formulario
    const manejarEnvio = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault(); // Evita recargar la pagina

        if (contrasena.trim() === ""){
            alert("Debe ingresar una contraseña");
            return;
        }

        if (contrasena.length < 8) {
            alert("Ingrese una contraseña válida");
            return;
        }

        if (correo.trim() === ""){
            alert("Debe ingresar su correo");
            return;
        }

        // Comprueba que el correo tenga un formato válido
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
            alert("Ingrese un correo válido");
            return;
        }

        alert("Sesión iniciada con éxito");

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
                tipo="contrasena"
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