// PRODUCTOS DE LA VINOTECA

const productos = [
    {
        id: 1,
        nombre: "Vino Tinto",
        categoria: "Vinos",
        descripcion: "Vino tinto, ideal para compartir.",
        precio: 12500,
        imagen: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=500",
        promocion: true
    },
    {
        id: 2,
        nombre: "Vino Malbec",
        categoria: "Vinos",
        descripcion: "Un clásico para acompañar tus comidas.",
        precio: 15000,
        imagen: "https://images.unsplash.com/photo-1516594915697-87eb3b1c14ea?w=500",
        promocion: false
    },
    {
        id: 3,
        nombre: "Espumante",
        categoria: "Espumantes",
        descripcion: "Perfecto para celebrar momentos especiales.",
        precio: 18000,
        imagen: "https://images.unsplash.com/photo-1578911373434-0cb395d2cbfb?w=500",
        promocion: true
    },
    {
        id: 4,
        nombre: "Aperitivo",
        categoria: "Aperitivos",
        descripcion: "Ideal para preparar tus tragos favoritos.",
        precio: 11000,
        imagen: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=500",
        promocion: false
    },
    {
        id: 5,
        nombre: "Gin",
        categoria: "Gin",
        descripcion: "Una opción para disfrutar buenos cócteles.",
        precio: 22000,
        imagen: "https://images.unsplash.com/photo-1608270586620-248524c67de9?w=500",
        promocion: false
    },
    {
        id: 6,
        nombre: "Whisky",
        categoria: "Whisky",
        descripcion: "Una bebida de sabor intenso y carácter.",
        precio: 28000,
        imagen: "https://images.unsplash.com/photo-1527281400683-1aae777175f8?w=500",
        promocion: true
    },
    {
        id: 7,
        nombre: "Bebida sin alcohol",
        categoria: "Otros",
        descripcion: "Una alternativa para todos los momentos.",
        precio: 4500,
        imagen: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=500",
        promocion: false
    },
    {
        id: 8,
        nombre: "Vino Rosado",
        categoria: "Vinos",
        descripcion: "Fresco y suave para disfrutar.",
        precio: 13500,
        imagen: "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=500",
        promocion: false
    }
];

// VARIABLES

let carrito = [];
let cantidades = {};

// MOSTRAR PRODUCTOS

function mostrarProductos(lista) {
    const contenedor = document.getElementById("lista-productos");

    contenedor.innerHTML = "";

    if (lista.length === 0) {
        contenedor.innerHTML = "<p>No hay productos en esta categoría.</p>";
        return;
    }

    lista.forEach(producto => {

        if (!cantidades[producto.id]) {
            cantidades[producto.id] = 1;
        }

        const tarjeta = document.createElement("article");
        tarjeta.className = "tarjeta";

        const imagen = document.createElement("img");
        imagen.src = producto.imagen;
        imagen.alt = producto.nombre;
        imagen.onerror = function () {
            this.src = "https://placehold.co/500x500/f5eee4/35151d?text=Producto";
        };

        const nombre = document.createElement("h3");
        nombre.textContent = producto.nombre;

        const descripcion = document.createElement("p");
        descripcion.textContent = producto.descripcion;

        const precio = document.createElement("span");
        precio.className = "precio";
        precio.textContent = "$" + producto.precio.toLocaleString("es-AR");

        const cantidad = document.createElement("div");
        cantidad.className = "cantidad";

        const menos = document.createElement("button");
        menos.textContent = "-";
        menos.onclick = () => cambiarCantidad(producto.id, -1);

        const numero = document.createElement("span");
        numero.id = "cantidad-" + producto.id;
        numero.textContent = cantidades[producto.id];

        const mas = document.createElement("button");
        mas.textContent = "+";
        mas.onclick = () => cambiarCantidad(producto.id, 1);

        cantidad.append(menos, numero, mas);

        const agregar = document.createElement("button");
        agregar.className = "agregar";
        agregar.textContent = "Agregar al carrito";
        agregar.onclick = () => agregarCarrito(producto.id);

        tarjeta.append(
            imagen,
            nombre,
            descripcion,
            precio,
            cantidad,
            agregar
        );

        contenedor.appendChild(tarjeta);
    });
}

// CAMBIAR CANTIDAD

function cambiarCantidad(id, cambio) {
    cantidades[id] = Math.max(1, (cantidades[id] || 1) + cambio);

    const numero = document.getElementById("cantidad-" + id);

    if (numero) {
        numero.textContent = cantidades[id];
    }
}

// FILTRAR CATEGORIAS

function filtrarProductos(categoria, boton) {

    document.querySelectorAll(".menu button").forEach(btn => {
        btn.classList.remove("activo");
    });

    boton.classList.add("activo");

    document.getElementById("titulo-categoria").textContent = categoria;

    let filtrados;

    if (categoria === "Promociones") {
        filtrados = productos.filter(p => p.promocion);
    } else {
        filtrados = productos.filter(p => p.categoria === categoria);
    }

    mostrarProductos(filtrados);
}

// AGREGAR AL CARRITO

function agregarCarrito(id) {

    const producto = productos.find(p => p.id === id);
    const cantidad = cantidades[id] || 1;

    const existente = carrito.find(p => p.id === id);

    if (existente) {
        existente.cantidad += cantidad;
    } else {
        carrito.push({
            ...producto,
            cantidad: cantidad
        });
    }

    actualizarCarrito();
    alert("Producto agregado al carrito.");
}

// ACTUALIZAR CARRITO

function actualizarCarrito() {

    const contenido = document.getElementById("contenido-carrito");

    contenido.innerHTML = "";

    let total = 0;
    let cantidadTotal = 0;

    if (carrito.length === 0) {
        contenido.innerHTML = "<p>Tu carrito está vacío.</p>";
    }

    carrito.forEach(producto => {

        const subtotal = producto.precio * producto.cantidad;

        total += subtotal;
        cantidadTotal += producto.cantidad;

        const item = document.createElement("div");
        item.className = "item-carrito";

        const info = document.createElement("div");

        const nombre = document.createElement("strong");
        nombre.textContent = producto.nombre;

        const detalle = document.createElement("p");
        detalle.textContent =
            producto.cantidad + " x $" +
            producto.precio.toLocaleString("es-AR");

        const subtotalTexto = document.createElement("p");
        subtotalTexto.textContent =
            "Subtotal: $" + subtotal.toLocaleString("es-AR");

        info.append(nombre, detalle, subtotalTexto);

        const eliminar = document.createElement("button");
        eliminar.textContent = "Eliminar";
        eliminar.onclick = () => eliminarProducto(producto.id);

        item.append(info, eliminar);

        contenido.appendChild(item);
    });

    document.getElementById("contador").textContent = cantidadTotal;

    document.getElementById("total").textContent =
        "$" + total.toLocaleString("es-AR");
}

// ELIMINAR PRODUCTO

function eliminarProducto(id) {
    carrito = carrito.filter(p => p.id !== id);
    actualizarCarrito();
}

// VACIAR CARRITO

function vaciarCarrito() {
    carrito = [];
    actualizarCarrito();
}

// ABRIR Y CERRAR CARRITO

function abrirCarrito() {
    document.getElementById("panel-carrito").classList.add("abierto");
    document.getElementById("fondo-carrito").classList.add("abierto");
}

function cerrarCarrito() {
    document.getElementById("panel-carrito").classList.remove("abierto");
    document.getElementById("fondo-carrito").classList.remove("abierto");
}

// ENVIAR PEDIDO POR WHATSAPP

function enviarWhatsApp() {

    if (carrito.length === 0) {
        alert("Tu carrito está vacío. Agregá productos antes de continuar.");
        return;
    }

    // REEMPLAZAR POR EL NUMERO DEL DUEÑO
    const telefono = "5493827457496";

    let mensaje = "🍷 VINOTECA LA BODEGA DORADA\n";
    mensaje += "¡Hola! Quisiera realizar el siguiente pedido:\n\n";

    let total = 0;

    carrito.forEach(producto => {

        const subtotal = producto.precio * producto.cantidad;
        total += subtotal;

        mensaje += "▪️ " + producto.nombre + "\n";
        mensaje += "Cantidad: " + producto.cantidad + "\n";
        mensaje += "Precio: $" + producto.precio.toLocaleString("es-AR") + "\n";
        mensaje += "Subtotal: $" + subtotal.toLocaleString("es-AR") + "\n\n";
    });

    mensaje += "------------------------\n";
    mensaje += "TOTAL: $" + total.toLocaleString("es-AR") + "\n\n";
    mensaje += "Quedo a la espera de la confirmación. ¡Muchas gracias!";

    const url = "https://wa.me/" + telefono + "?text=" + encodeURIComponent(mensaje);

    window.open(url, "_blank");
}

// INICIAR PAGINA

mostrarProductos(productos.filter(p => p.promocion));
actualizarCarrito();