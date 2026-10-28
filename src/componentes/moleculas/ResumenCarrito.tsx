interface ResumenProps {
    total: number;
    alPagar: () => void;
}

function ResumenCarrito({ total, alPagar }: ResumenProps) {

    return (
        <div className="p-4 bg-white rounded shadow-sm border border-secondary borde-grueso">

            <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="fw-bold text-uppercase m-0">TOTAL:</h5>
                <span className="fw-bold fs-3 text-success">
                    ${total.toLocaleString('es-CL')}
                </span>
            </div>

            {/* CUPÓN */}
            <div className="mb-4">
                <label htmlFor="inputCupon" className="form-label text-muted label-pequeno">
                    Ingrese el cupón de descuento
                </label>
                <div className="input-group">
                    <input type="text" className="form-control" id="inputCupon" placeholder="EJ: MAESTRO10" />
                    <button className="btn btn-outline-secondary" type="button">Aplicar</button>
                </div>
            </div>

            <hr className="border-secondary mb-4 borde-grueso" />

            {/* BOTÓN DE PAGO */}
            <button
                className="btn btn-success w-100 text-uppercase fw-bold p-3 btn-pagar-verde"
                onClick={alPagar}
            >
                PAGAR
            </button>

        </div>
    )
}

export default ResumenCarrito