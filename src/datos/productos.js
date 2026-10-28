// Base de datos simulada que pide la pauta

const productosIniciales = [

    // ===== Materiales de construcción =====
    { id: "MC001", nombre: "Cemento Polpaico gris 25 kg", precio: 5990, precioOferta: 4990, marca: "Polpaico", categoria: "construccion", subcategoria: "Cementos", unidad: "Saco", imagen: "/img/MC001.webp" },
    { id: "MC002", nombre: "Cemento Melón blanco 25 kg", precio: 7490, marca: "Melón", categoria: "construccion", subcategoria: "Cementos", unidad: "Saco", imagen: "/img/MC002.jpg" },
    { id: "MC003", nombre: "Mortero cola cerámica 25 kg", precio: 5200, marca: "Volcán", categoria: "construccion", subcategoria: "Morteros", unidad: "Saco", imagen: "/img/MC003.avif" },
    { id: "MC004", nombre: "Mortero nivelador piso 25 kg", precio: 6490, marca: "Weber", categoria: "construccion", subcategoria: "Morteros", unidad: "Saco", imagen: "/img/MC004.webp" },
    { id: "MC005", nombre: "Arena fina construcción 25 kg", precio: 1800, marca: "Granel", categoria: "construccion", subcategoria: "Áridos", unidad: "Saco", imagen: "/img/MC005.webp" },
    { id: "MC006", nombre: "Ripio 25 kg", precio: 1500, marca: "Granel", categoria: "construccion", subcategoria: "Áridos", unidad: "Saco", imagen: "/img/MC006.webp" },
    { id: "MC007", nombre: "Ladrillo fiscal N°5", precio: 380, marca: "Local", categoria: "construccion", subcategoria: "Ladrillos", unidad: "Unidad", imagen: "/img/MC007.jpg" },
    { id: "MC008", nombre: "Ladrillo prensado 6x14x29 cm", precio: 550, marca: "Melón", categoria: "construccion", subcategoria: "Ladrillos", unidad: "Unidad", imagen: "/img/MC008.webp" },
    { id: "MC009", nombre: "Bloque de hormigón 19x19x39 cm", precio: 1200, marca: "Volcán", categoria: "construccion", subcategoria: "Bloques", unidad: "Unidad", imagen: "/img/MC009.webp" },
    { id: "MC010", nombre: "Bloque liviano 10x20x40 cm", precio: 1690, marca: "Ytong", categoria: "construccion", subcategoria: "Bloques", unidad: "Unidad", imagen: "/img/MC010.jpg" },

    // ===== Pinturas =====
    { id: "PT001", nombre: "Pintura látex interior 1 galón blanco", precio: 9990, precioOferta: 7990, marca: "Sipa", categoria: "pinturas", subcategoria: "Látex", unidad: "Galón", imagen: "/img/PT001.webp" },
    { id: "PT002", nombre: "Pintura látex interior 4 litros (varios col.)", precio: 12990, marca: "Sipa", categoria: "pinturas", subcategoria: "Látex", unidad: "Envase 4L", imagen: "/img/PT002.webp" },
    { id: "PT003", nombre: "Pintura látex exterior 1 galón blanco", precio: 13990, marca: "Kömex", categoria: "pinturas", subcategoria: "Látex", unidad: "Galón", imagen: "/img/PT003.webp" },
    { id: "PT004", nombre: "Esmalte sintético 1/4 litro (varios col.)", precio: 4290, marca: "Sipa", categoria: "pinturas", subcategoria: "Esmalte", unidad: "1/4 L", imagen: "/img/PT004.webp" },
    { id: "PT005", nombre: "Esmalte sintético 1 litro (varios col.)", precio: 9490, marca: "Sipa", categoria: "pinturas", subcategoria: "Esmalte", unidad: "1 litro", imagen: "/img/PT005.jpg" },
    { id: "PT006", nombre: "Pintura antihumedad 1 galón blanco", precio: 17990, marca: "Kömex", categoria: "pinturas", subcategoria: "Antihumedad", unidad: "Galón", imagen: "/img/PT006.webp" },
    { id: "PT007", nombre: "Rodillo lana 23 cm con mango", precio: 3990, marca: "Wurth", categoria: "pinturas", subcategoria: "Accesorios", unidad: "Unidad", imagen: "/img/PT007.webp" },
    { id: "PT008", nombre: "Brocha cerda natural 3", precio: 1690, marca: "Sipa", categoria: "pinturas", subcategoria: "Accesorios", unidad: "Unidad", imagen: "/img/PT008.webp" },
    { id: "PT009", nombre: "Cinta de enmascarar 24mm x 50m", precio: 2490, marca: "3M", categoria: "pinturas", subcategoria: "Accesorios", unidad: "Rollo", imagen: "/img/PT009.webp" },

    // ===== Herramientas manuales =====
    { id: "HM001", nombre: "Martillo carpintero 500g", precio: 7990, marca: "Stanley", categoria: "herramientas", subcategoria: "Manuales", unidad: "Unidad", imagen: "/img/HM001.webp" },
    { id: "HM002", nombre: "Alicate universal 8", precio: 7290, marca: "Stanley", categoria: "herramientas", subcategoria: "Manuales", unidad: "Unidad", imagen: "/img/HM002.webp" },
    { id: "HM003", nombre: "Destornillador plano 6x100mm", precio: 1990, marca: "Stanley", categoria: "herramientas", subcategoria: "Manuales", unidad: "Unidad", imagen: "/img/HM003.webp" },
    { id: "HM004", nombre: "Destornillador Phillips PH2 6x100mm", precio: 1990, marca: "Stanley", categoria: "herramientas", subcategoria: "Manuales", unidad: "Unidad", imagen: "/img/HM004.webp" },
    { id: "HM005", nombre: "Llave ajustable 10", precio: 8490, marca: "Bahco", categoria: "herramientas", subcategoria: "Manuales", unidad: "Unidad", imagen: "/img/HM005.webp" },
    { id: "HM006", nombre: "Juego llaves hexagonales métrico x9", precio: 5490, marca: "Stanley", categoria: "herramientas", subcategoria: "Manuales", unidad: "Set", imagen: "/img/HM006.webp" },
    { id: "HM007", nombre: "Serrucho 20' 7 dientes por pulgada", precio: 9490, marca: "Stanley", categoria: "herramientas", subcategoria: "Manuales", unidad: "Unidad", imagen: "/img/HM007.webp" },
    { id: "HM008", nombre: "Nivel de burbuja 60 cm", precio: 10490, marca: "Stanley", categoria: "herramientas", subcategoria: "Manuales", unidad: "Unidad", imagen: "/img/HM008.webp" },
    { id: "HM009", nombre: "Metro de tela 5m", precio: 4290, marca: "Stanley", categoria: "herramientas", subcategoria: "Manuales", unidad: "Unidad", imagen: "/img/HM009.webp" },
    { id: "HM010", nombre: "Cinta métrica 8m autoblocante", precio: 6490, marca: "Stanley", categoria: "herramientas", subcategoria: "Manuales", unidad: "Unidad", imagen: "/img/HM010.webp" },

    // ===== Herramientas eléctricas =====
    { id: "HE001", nombre: "Taladro percutor 650W 13mm", precio: 79990, precioOferta: 64990, marca: "Makita", categoria: "herramientas", subcategoria: "Eléctricas", unidad: "Unidad", imagen: "/img/HE001.webp" },
    { id: "HE002", nombre: "Atornillador inalámbrico 12V (kit)", precio: 104990, marca: "Makita", categoria: "herramientas", subcategoria: "Eléctricas", unidad: "Unidad", imagen: "/img/HE002.webp" },
    { id: "HE003", nombre: "Amoladora angular 4.5' 800W", precio: 54990, marca: "Makita", categoria: "herramientas", subcategoria: "Eléctricas", unidad: "Unidad", imagen: "/img/HE003.webp" },
    { id: "HE004", nombre: "Sierra circular 7-1/4' 1200W", precio: 72990, marca: "Skil", categoria: "herramientas", subcategoria: "Eléctricas", unidad: "Unidad", imagen: "/img/HE004.webp" },
    { id: "HE005", nombre: "Lijadora orbital 180W", precio: 34990, marca: "Black+Decker", categoria: "herramientas", subcategoria: "Eléctricas", unidad: "Unidad", imagen: "/img/HE005.webp" },
    { id: "HE006", nombre: "Caladora 500W", precio: 42990, marca: "Skil", categoria: "herramientas", subcategoria: "Eléctricas", unidad: "Unidad", imagen: "/img/HE006.webp" },

    // ===== Gasfitería =====
    { id: "GS001", nombre: "Cañería PVC 1/2 x 6m", precio: 5490, marca: "Tigre", categoria: "gasfiteria", subcategoria: "Tuberías", unidad: "Unidad", imagen: "/img/GS001.jpg" },
    { id: "GS002", nombre: "Cañería PVC 3/4 x 6m", precio: 7490, marca: "Tigre", categoria: "gasfiteria", subcategoria: "Tuberías", unidad: "Unidad", imagen: "/img/GS002.webp" },
    { id: "GS003", nombre: "Cañería cobre 1/2 x 5m", precio: 17990, marca: "Codelco", categoria: "gasfiteria", subcategoria: "Tuberías", unidad: "Unidad", imagen: "/img/GS003.webp" },
    { id: "GS004", nombre: "Codo PVC 1/2 90°", precio: 390, marca: "Tigre", categoria: "gasfiteria", subcategoria: "Uniones", unidad: "Unidad", imagen: "/img/GS004.webp" },
    { id: "GS005", nombre: "Tee PVC 1/2", precio: 450, marca: "Tigre", categoria: "gasfiteria", subcategoria: "Uniones", unidad: "Unidad", imagen: "/img/GS005.webp" },
    { id: "GS006", nombre: "Unión doble PVC 1/2", precio: 320, marca: "Tigre", categoria: "gasfiteria", subcategoria: "Uniones", unidad: "Unidad", imagen: "/img/GS006.webp" },
    { id: "GS007", nombre: "Llave de paso esfera 1/2 latón", precio: 3490, marca: "Emmeti", categoria: "gasfiteria", subcategoria: "Llaves", unidad: "Unidad", imagen: "/img/GS007.webp" },
    { id: "GS008", nombre: "Llave de paso esfera 3/4 latón", precio: 4990, marca: "Emmeti", categoria: "gasfiteria", subcategoria: "Llaves", unidad: "Unidad", imagen: "/img/GS008.webp" },
    { id: "GS009", nombre: "Grifería lavamanos monocomando cromo", precio: 22990, marca: "Corona", categoria: "gasfiteria", subcategoria: "Grifería", unidad: "Unidad", imagen: "/img/GS009.webp" },
    { id: "GS010", nombre: "Grifería cocina monocomando cuello alto", precio: 28990, marca: "Corona", categoria: "gasfiteria", subcategoria: "Grifería", unidad: "Unidad", imagen: "/img/GS010.webp" },
    { id: "GS011", nombre: "Teflón 3/4 x 12m", precio: 790, marca: "3M", categoria: "gasfiteria", subcategoria: "Sellos", unidad: "Rollo", imagen: "/img/GS011.webp" },
    { id: "GS012", nombre: "Silicona transparente 280ml", precio: 5490, marca: "Wacker", categoria: "gasfiteria", subcategoria: "Sellos", unidad: "Cartucho", imagen: "/img/GS012.webp" },

    // ===== Electricidad =====
    { id: "EL001", nombre: "Cable unipolar 1.5mm² (por metro)", precio: 590, marca: "Condulac", categoria: "electricidad", subcategoria: "Conductores", unidad: "Metro", imagen: "/img/EL001.webp" },
    { id: "EL002", nombre: "Cable unipolar 2.5mm² (por metro)", precio: 790, marca: "Condulac", categoria: "electricidad", subcategoria: "Conductores", unidad: "Metro", imagen: "/img/EL002.webp" },
    { id: "EL003", nombre: "Cable dúplex paralelo 2x1.5mm² (por metro)", precio: 990, marca: "Condulac", categoria: "electricidad", subcategoria: "Conductores", unidad: "Metro", imagen: "/img/EL003.webp" },
    { id: "EL004", nombre: "Enchufe empotrar 16A c/tierra (schuko)", precio: 3690, marca: "Bticino", categoria: "electricidad", subcategoria: "Enchufes", unidad: "Unidad", imagen: "/img/EL004.webp" },
    { id: "EL005", nombre: "Enchufe doble empotrar 16A c/tierra", precio: 5490, marca: "Bticino", categoria: "electricidad", subcategoria: "Enchufes", unidad: "Unidad", imagen: "/img/EL005.webp" },
    { id: "EL006", nombre: "Interruptor simple empotrar", precio: 3190, marca: "Bticino", categoria: "electricidad", subcategoria: "Interruptores", unidad: "Unidad", imagen: "/img/EL006.webp" },
    { id: "EL007", nombre: "Interruptor doble empotrar", precio: 4290, marca: "Bticino", categoria: "electricidad", subcategoria: "Interruptores", unidad: "Unidad", imagen: "/img/EL007.webp" },
    { id: "EL008", nombre: "Tablero eléctrico 4 espacios DIN", precio: 22990, marca: "Legrand", categoria: "electricidad", subcategoria: "Tableros", unidad: "Unidad", imagen: "/img/EL008.jpg" },
    { id: "EL009", nombre: "Disyuntor termomagnético 16A unipolar", precio: 6490, marca: "Schneider", categoria: "electricidad", subcategoria: "Tableros", unidad: "Unidad", imagen: "/img/EL009.webp" },
    { id: "EL010", nombre: "Disyuntor termomagnético 25A unipolar", precio: 6990, marca: "Schneider", categoria: "electricidad", subcategoria: "Tableros", unidad: "Unidad", imagen: "/img/EL010.webp" },
    { id: "EL011", nombre: "Ampolleta LED 9W E27 luz fría", precio: 3990, marca: "Philips", categoria: "electricidad", subcategoria: "Iluminación", unidad: "Unidad", imagen: "/img/EL011.webp" },
    { id: "EL012", nombre: "Ampolleta LED 12W E27 luz cálida", precio: 4490, marca: "Philips", categoria: "electricidad", subcategoria: "Iluminación", unidad: "Unidad", imagen: "/img/EL012.webp" },
    { id: "EL013", nombre: "Panel LED empotrar 18W 22cm", precio: 11490, marca: "Ledvance", categoria: "electricidad", subcategoria: "Iluminación", unidad: "Unidad", imagen: "/img/EL013.webp" },

    // ===== Tornillería =====
    { id: "TR001", nombre: "Tornillo autoperf. 8x1 caja 100 unid.", precio: 2990, marca: "Hilti", categoria: "tornilleria", subcategoria: "Tornillos", unidad: "Caja", imagen: "/img/TR001.webp" },
    { id: "TR002", nombre: "Tornillo madera 4x40mm caja 100 unid.", precio: 2490, marca: "Hilti", categoria: "tornilleria", subcategoria: "Tornillos", unidad: "Caja", imagen: "/img/TR002.webp" },
    { id: "TR003", nombre: "Tornillo volcanita 3.5x25mm caja 200 unid.", precio: 3490, marca: "Hilti", categoria: "tornilleria", subcategoria: "Tornillos", unidad: "Caja", imagen: "/img/TR003.webp" },
    { id: "TR004", nombre: "Taco fischer S6 bolsa 100 unid.", precio: 3190, marca: "Fischer", categoria: "tornilleria", subcategoria: "Tacos", unidad: "Bolsa", imagen: "/img/TR004.webp" },
    { id: "TR005", nombre: "Taco fischer S8 bolsa 50 unid.", precio: 2890, marca: "Fischer", categoria: "tornilleria", subcategoria: "Tacos", unidad: "Bolsa", imagen: "/img/TR005.webp" },
    { id: "TR006", nombre: "Perno hex. 3/8 x 2 c/tuerca y golilla", precio: 290, marca: "Granel", categoria: "tornilleria", subcategoria: "Pernos", unidad: "Unidad", imagen: "/img/TR006.jpg" },
    { id: "TR007", nombre: "Perno de anclaje 10x100mm", precio: 990, marca: "Hilti", categoria: "tornilleria", subcategoria: "Anclajes", unidad: "Unidad", imagen: "/img/TR007.webp" },
    { id: "TR008", nombre: "Anclaje químico epoxi 300ml", precio: 15990, marca: "Fischer", categoria: "tornilleria", subcategoria: "Anclajes", unidad: "Cartucho", imagen: "/img/TR008.jpg" },

    // ===== Madera =====
    { id: "MD001", nombre: "Pino cepillado 1x3 x 3m", precio: 4290, marca: "Local", categoria: "madera", subcategoria: "Pino cepillado", unidad: "Unidad", imagen: "/img/MD001.webp" },
    { id: "MD002", nombre: "Pino cepillado 2x4 x 3m", precio: 7490, marca: "Local", categoria: "madera", subcategoria: "Pino cepillado", unidad: "Unidad", imagen: "/img/MD002.webp" },
    { id: "MD003", nombre: "Terciado estructural 18mm 1.22x2.44m", precio: 34990, marca: "Arauco", categoria: "madera", subcategoria: "Tableros", unidad: "Plancha", imagen: "/img/MD003.webp" },
    { id: "MD004", nombre: "MDF 15mm 1.22x2.44m", precio: 27990, marca: "Arauco", categoria: "madera", subcategoria: "Tableros", unidad: "Plancha", imagen: "/img/MD004.webp" },
    { id: "MD005", nombre: "OSB 9mm 1.22x2.44m", precio: 18990, marca: "Arauco", categoria: "madera", subcategoria: "Tableros", unidad: "Plancha", imagen: "/img/MD005.webp" },
    { id: "MD006", nombre: "Volcanita estándar 10mm 1.2x2.4m", precio: 8990, marca: "Volcán", categoria: "madera", subcategoria: "Tableros", unidad: "Plancha", imagen: "/img/MD006.webp" },
    { id: "MD007", nombre: "Volcanita resistente humedad 10mm", precio: 11990, marca: "Volcán", categoria: "madera", subcategoria: "Tableros", unidad: "Plancha", imagen: "/img/MD007.webp" },

    // ===== Seguridad =====
    { id: "SE001", nombre: "Casco seguridad blanco", precio: 6990, precioOferta: 5490, marca: "3M", categoria: "seguridad", subcategoria: "EPP", unidad: "Unidad", imagen: "/img/SE001.webp" },
    { id: "SE002", nombre: "Guantes de cuero talla L", precio: 3690, marca: "3M", categoria: "seguridad", subcategoria: "EPP", unidad: "Par", imagen: "/img/SE002.webp" },
    { id: "SE003", nombre: "Antiparras de seguridad clear", precio: 2490, marca: "3M", categoria: "seguridad", subcategoria: "EPP", unidad: "Unidad", imagen: "/img/SE003.webp" },
    { id: "SE004", nombre: "Mascarilla respirador N95 (caja x10)", precio: 10990, marca: "3M", categoria: "seguridad", subcategoria: "EPP", unidad: "Caja", imagen: "/img/SE004.avif" },
    { id: "SE005", nombre: "Arnés de seguridad 1 punto", precio: 34990, marca: "3M", categoria: "seguridad", subcategoria: "EPP", unidad: "Unidad", imagen: "/img/SE005.webp" },

    // ===== Jardín =====
    { id: "JA001", nombre: "Manguera riego 3/4 x 25m", precio: 22990, marca: "Tigre", categoria: "jardin", subcategoria: "Mangueras", unidad: "Unidad", imagen: "/img/JA001.webp" },
    { id: "JA002", nombre: "Manguera expandible 30m", precio: 28990, marca: "Bestway", categoria: "jardin", subcategoria: "Mangueras", unidad: "Unidad", imagen: "/img/JA002.webp" },
    { id: "JA003", nombre: "Pistola de riego 8 modos", precio: 5490, marca: "Bestway", categoria: "jardin", subcategoria: "Mangueras", unidad: "Unidad", imagen: "/img/JA003.webp" },
    { id: "JA004", nombre: "Pala punta redonda #2 con mango", precio: 10990, marca: "Corona", categoria: "jardin", subcategoria: "Herramientas", unidad: "Unidad", imagen: "/img/JA004.webp" },
    { id: "JA005", nombre: "Rastrillo 16 dientes con mango", precio: 9490, marca: "Corona", categoria: "jardin", subcategoria: "Herramientas", unidad: "Unidad", imagen: "/img/JA005.webp" }
]

// ===== CRUD de productos (se guardan en localStorage) =====
const CLAVE = 'productosFerreteria'

// Leer todos. Si aún no se ha editado nada, parte de la lista inicial.
// A cada producto sin stock definido se le asigna uno por defecto.
/** @returns {any[]} */
export function obtenerProductos() {
    const guardado = localStorage.getItem(CLAVE)
    if (guardado) {
        return JSON.parse(guardado)
    }
    return productosIniciales.map(p => ({ stock: 20, stockCritico: 5, ...p }))
}

function guardarProductos(lista) {
    localStorage.setItem(CLAVE, JSON.stringify(lista))
}

// Leer uno
export function obtenerProducto(id) {
    return obtenerProductos().find(p => p.id === id)
}

// Crear
export function crearProducto(producto) {
    const lista = obtenerProductos()
    lista.push(producto)
    guardarProductos(lista)
}

// Actualizar
export function actualizarProducto(id, cambios) {
    const lista = obtenerProductos().map(p => p.id === id ? { ...p, ...cambios } : p)
    guardarProductos(lista)
}

// Eliminar
export function eliminarProducto(id) {
    guardarProductos(obtenerProductos().filter(p => p.id !== id))
}