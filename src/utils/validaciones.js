// Solo se permiten estos dominios de correo
export function validarCorreo(correo) {
    const dominios = ['@duoc.cl', '@profesor.duoc.cl', '@gmail.com']
    return correo === 'admin@admin.com' || dominios.some(d => correo.endsWith(d))
}

// Valida un RUN chileno sin puntos ni guión
export function validarRut(rutCompleto) {
    if (!/^[0-9]+[0-9Kk]$/.test(rutCompleto)) {
        return false
    }

    const rut = rutCompleto.slice(0, -1)
    const dvIngresado = rutCompleto.slice(-1).toUpperCase()

    let suma = 0
    let multiplo = 2

    for (let i = rut.length - 1; i >= 0; i--) {
        suma += parseInt(rut.charAt(i)) * multiplo
        multiplo = multiplo < 7 ? multiplo + 1 : 2
    }

    let dvEsperado = 11 - (suma % 11)
    dvEsperado = dvEsperado === 11 ? 0 : (dvEsperado === 10 ? "K" : dvEsperado)

    return dvEsperado.toString() === dvIngresado
}