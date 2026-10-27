import React, { useState } from "react";
import CampoFormulario from "../moleculas/CampoFormulario";

function FormularioContacto(){

    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [mensaje, setMensaje] = useState("");

    // Valida los datos al enviar el formulario
    const manejarEnvio = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault(); // Evita recargar la pagina
    
        if (nombre.trim() === ""){
            alert("Debe ingresar su nombre");
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

        if (mensaje.trim() === ""){
            alert("Debe ingresar un mensaje");
            return;
        }
        alert("Formulario enviado correctamente");

    };

    return(
        <form onSubmit={manejarEnvio} noValidate>

            <CampoFormulario
                etiqueta="Nombre Completo"
                tipo="text"
                nombre="nombre"
                valor = {nombre}
                alCambiar={setNombre}
            />

            <CampoFormulario
                etiqueta="Correo Electrónico"
                tipo="email"
                nombre="correo"
                valor = {correo}
                alCambiar={setCorreo}
            />

            <CampoFormulario
                etiqueta="Mensaje"
                tipo="text"
                nombre="mensaje"
                valor = {mensaje}
                alCambiar={setMensaje}
            />

            <button type="submit" className="btn btn-primary">
                Enviar Mensaje
            </button>

        </form>
    );
}

export default FormularioContacto;