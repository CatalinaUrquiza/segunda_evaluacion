import { Link } from 'react-router-dom'

function BotonVolver(){

    return (
        <Link
            to = "/productos"
            className = "btn btn-primary"
        >
            Volver a Productos
        </Link>
    )
}

export default BotonVolver