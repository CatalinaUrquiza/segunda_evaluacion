// Usuarios de prueba
export const usuariosPrueba = [
    { correo: "admin@admin.com", clave: "admin", rol: "Administrador", nombre: "Administrador General" },
    { correo: "profe@profesor.duoc.cl", clave: "1234", rol: "Administrador" },
    { correo: "vendedor@duoc.cl", clave: "1234", rol: "Vendedor" },
    { correo: "cliente@gmail.com", clave: "1234", rol: "Cliente" }
]

// Usuarios que se registraron desde la página (guardados en el navegador)
export function obtenerRegistrados() {
    const guardado = localStorage.getItem('usuariosRegistrados')
    return guardado ? JSON.parse(guardado) : []
}

// Todos los usuarios: los de prueba + los registrados
export function obtenerUsuarios() {
    return [...usuariosPrueba, ...obtenerRegistrados()]
}

// Guarda un usuario nuevo
export function guardarUsuario(usuario) {
    const registrados = obtenerRegistrados()
    registrados.push(usuario)
    localStorage.setItem('usuariosRegistrados', JSON.stringify(registrados))
}