interface EstadisticaProps {
    titulo: string;
    valor: number | string;
    detalle: string;
    color: string;   // clase de Bootstrap: "bg-primary", "bg-success", "bg-warning"...
}

function CardEstadistica({ titulo, valor, detalle, color }: EstadisticaProps) {

    return (
        <div className="col">
            <div className={`card ${color} text-white h-100 shadow-sm`}>
                <div className="card-body">
                    <p className="mb-1">{titulo}</p>
                    <h3 className="fw-bold">{valor}</h3>
                    <small>{detalle}</small>
                </div>
            </div>
        </div>
    )
}

export default CardEstadistica
