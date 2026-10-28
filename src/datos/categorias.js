const CLAVE = 'categoriasFerreteria'

// Las que ya existían en la tienda
const porDefecto = [
    { id: 'construccion', nombre: 'Materiales de Construcción' },
    { id: 'pinturas', nombre: 'Pinturas' },
    { id: 'herramientas', nombre: 'Herramientas' },
    { id: 'gasfiteria', nombre: 'Gasfitería' },
    { id: 'electricidad', nombre: 'Electricidad' },
    { id: 'tornilleria', nombre: 'Tornillería' },
    { id: 'madera', nombre: 'Madera' },
    { id: 'seguridad', nombre: 'Seguridad' },
    { id: 'jardin', nombre: 'Jardín' }
]

export function obtenerCategorias() {
    const guardado = localStorage.getItem(CLAVE)
    return guardado ? JSON.parse(guardado) : porDefecto
}

function guardar(lista) {
    localStorage.setItem(CLAVE, JSON.stringify(lista))
}

export function obtenerCategoria(id) {
    return obtenerCategorias().find(c => c.id === id)
}

export function crearCategoria(categoria) {
    guardar([...obtenerCategorias(), categoria])
}

export function actualizarCategoria(id, datos) {
    guardar(obtenerCategorias().map(c => c.id === id ? { ...c, ...datos } : c))
}

export function eliminarCategoria(id) {
    guardar(obtenerCategorias().filter(c => c.id !== id))
}

// "Gasfitería Fina" -> "gasfiteria-fina" (se usa como identificador en la URL)
export function crearId(nombre) {
    return nombre
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')
}