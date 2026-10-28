import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CampoFormulario from "../moleculas/CampoFormulario";
import CampoSelect from "../moleculas/CampoSelect";
import { regionesYcomunas } from "../../datos/regiones";
import { obtenerUsuarios, guardarUsuario } from "../../datos/usuarios";
import { validarCorreo, validarRut } from "../../utils/validaciones";

function FormularioRegistro(){

    const navigate = useNavigate();

    const [run, setRun] = useState("");
    const [nombre, setNombre] = useState("");
    const [apellidos, setApellidos] = useState("");
    const [correo, setCorreo] = useState("");
    const [clave, setClave] = useState("");
    const [fecha, setFecha] = useState("");
    const [region, setRegion] = useState("");
    const [comuna, setComuna] = useState("");
    const [direccion, setDireccion] = useState("");

    // Comunas de la región elegida
    const regiones = regionesYcomunas as Record<string, string[]>;
    const comunas = regiones[region] ?? [];

    // Al cambiar la región, se reinicia la comuna
    const cambiarRegion = (valor: string) => {
        setRegion(valor);
        setComuna("");
    };

    const manejarEnvio = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validarRut(run)) {
            alert("El RUN ingresado no es válido (sin puntos ni guión, ej: 19011022K)");
            return;
        }

        if (nombre.trim() === "" || apellidos.trim() === "") {
            alert("Debe ingresar su nombre y apellidos");
            return;
        }

        if (!validarCorreo(correo)) {
            alert("Solo correos @duoc.cl, @profesor.duoc.cl o @gmail.com");
            return;
        }

        // Evita registrar dos veces el mismo correo
        if (obtenerUsuarios().some(u => u.correo === correo)) {
            alert("Ya existe una cuenta con ese correo");
            return;
        }

        if (clave.length < 4 || clave.length > 10) {
            alert("La contraseña debe tener entre 4 y 10 caracteres");
            return;
        }

        if (region === "" || comuna === "") {
            alert("Debe seleccionar una región y una comuna");
            return;
        }

        if (direccion.trim() === "") {
            alert("Debe ingresar su dirección");
            return;
        }

        guardarUsuario({
            run,
            nombre,
            apellidos,
            correo,
            clave,
            fechaNacimiento: fecha,
            region,
            comuna,
            direccion,
            rol: "Cliente"
        });

        alert("¡Cuenta creada con éxito!");
        navigate("/login");
    };

    return(
        <form onSubmit={manejarEnvio} noValidate>

            <CampoFormulario
                etiqueta="RUN (sin puntos ni guión)"
                tipo="text"
                nombre="run"
                valor={run}
                alCambiar={setRun}
            />

            <CampoFormulario
                etiqueta="Nombre"
                tipo="text"
                nombre="nombre"
                valor={nombre}
                alCambiar={setNombre}
            />

            <CampoFormulario
                etiqueta="Apellidos"
                tipo="text"
                nombre="apellidos"
                valor={apellidos}
                alCambiar={setApellidos}
            />

            <CampoFormulario
                etiqueta="Correo Electrónico"
                tipo="email"
                nombre="correo"
                valor={correo}
                alCambiar={setCorreo}
            />

            <CampoFormulario
                etiqueta="Contraseña (4 a 10 caracteres)"
                tipo="password"
                nombre="clave"
                valor={clave}
                alCambiar={setClave}
            />

            <CampoFormulario
                etiqueta="Fecha de Nacimiento (opcional)"
                tipo="date"
                nombre="fecha"
                valor={fecha}
                alCambiar={setFecha}
            />

            <CampoSelect
                etiqueta="Región"
                nombre="region"
                valor={region}
                opciones={Object.keys(regionesYcomunas)}
                textoInicial="Seleccione una región"
                alCambiar={cambiarRegion}
            />

            <CampoSelect
                etiqueta="Comuna"
                nombre="comuna"
                valor={comuna}
                opciones={comunas}
                textoInicial="Seleccione una comuna"
                alCambiar={setComuna}
            />

            <CampoFormulario
                etiqueta="Dirección"
                tipo="text"
                nombre="direccion"
                valor={direccion}
                alCambiar={setDireccion}
            />

            <button type="submit" className="btn btn-primary">
                Registrarme
            </button>

        </form>
    );
}

export default FormularioRegistro;