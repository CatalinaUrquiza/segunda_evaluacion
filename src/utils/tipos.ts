// Tipos compartidos del carrito y la compra

export interface ItemCarrito {
    id: string;
    nombre: string;
    precio: number;            // precio que se cobra (ya con oferta si corresponde)
    precioOriginal?: number;   // precio sin oferta (solo si hay oferta)
    cantidad: number;
    imagen: string;
}

export interface DatosCliente {
    nombre: string;
    apellidos: string;
    correo: string;
    calle: string;
    departamento: string;
    region: string;
    comuna: string;
    indicaciones: string;
}

export interface Pedido {
    numero: number;
    codigoOrden: string;
    fecha: string;
    cliente: DatosCliente;
    items: ItemCarrito[];
    total: number;
    estado: 'exitoso' | 'error';
    motivo: string;            // por qué falló el pago (vacío si salió bien)
}
