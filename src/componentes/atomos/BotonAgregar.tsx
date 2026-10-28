interface BotonAgregarProps {
    alClick: () => void;
}

function BotonAgregar({ alClick }: BotonAgregarProps) {

    return (
        <button
            type = "button"
            className = "btn btn-dark w-100 btn-lg"
            onClick = {alClick}
        >
            Añadir al carrito
        </button>
    )
}

export default BotonAgregar