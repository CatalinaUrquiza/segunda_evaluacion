type Props = {
    etiqueta: string;
    nombre: string;
    valor: string;
    opciones: string[];
    textoInicial: string;
    alCambiar: (valor: string) => void;
};

function CampoSelect({ etiqueta, nombre, valor, opciones, textoInicial, alCambiar }: Props) {
    return (
        <div className="mb-3">
            <label className="form-label">
                {etiqueta}
            </label>

            <select
                className="form-select"
                name={nombre}
                value={valor}
                onChange={(e) => alCambiar(e.target.value)}
            >
                <option value="">{textoInicial}</option>

                {opciones.map(opcion => (
                    <option key={opcion} value={opcion}>{opcion}</option>
                ))}
            </select>
        </div>
    );
}

export default CampoSelect;