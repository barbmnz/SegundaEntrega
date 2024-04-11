// Definir array de productos
const productos = [
    {id:1, nombre:"Chaqueta de mezclilla", precio:100},
    {id:2, nombre:"Jeans",  precio:100},
    {id:3, nombre:"Zapatillas", precio:300},
    {id:4, nombre:"Chaqueta de cuero",  precio:200},
    {id:5, nombre:"Chaqueta marinero",  precio:130},
    {id:6, nombre:"Poleron Azul",  precio:150},
    {id:7, nombre:"Top",  precio:90},
    {id:8, nombre:"Chaqueta de invierno",  precio:400},
];

// Definir la clase Carrito
class Carrito { 
    constructor() {
        this.productos = [];
        this.descuento = 20;
        this.maxProductosParaDescuento = 3;
        this.impuesto = 0.1; // 10% de impuesto
    }

    agregarProducto(id) {
        const producto = productos.find(prod => prod.id === id);

        if (producto) {
            this.productos.push(producto);
            console.log("Agregaste el Producto #" + id + " al Carrito");
        } else {
            console.log("No se encontró el Producto con #" + id + "!");
        }
    }

    listarCarrito() {
        let salida = "";

        this.productos.forEach(item =>  {
            salida += `${item.id} - ${item.nombre} - $${item.precio}\n`;
        });

        return salida;
    }

    calcularTotalProductos() {
        return this.productos.length;
    }

    calcularSubtotal() {
        return this.productos.reduce((total, item) => total + item.precio, 0);
    }

    calcularImpuestos() {
        return this.calcularSubtotal() * this.impuesto;
    }

    aplicarDescuento() {
        if (this.calcularTotalProductos() >= this.maxProductosParaDescuento) {
            return Math.round((this.calcularSubtotal() * this.descuento) / 100);
        } else {
            return 0;
        }
    }

    calcularTotalPagar() {
        return this.calcularSubtotal() + this.calcularImpuestos() - this.aplicarDescuento();
    }
}

function listarProductos() {
    let salida = "";

    productos.forEach(item =>  {
        salida += `${item.id} - ${item.nombre} - $${item.precio}\n`;
    });

    return salida;
}

const carrito = new Carrito();
let opcionSeleccionada = "10";

while (opcionSeleccionada !== "0") {
    opcionSeleccionada = prompt(`Seleccione el producto a agregar al Carrito: (0 para Salir)\n\n${listarProductos()}`);

    if (opcionSeleccionada === "0") {
        break;
    }

    const productoId = parseInt(opcionSeleccionada);
    if (!isNaN(productoId)) {
        carrito.agregarProducto(productoId);
    } else {
        console.log("Ingrese un número válido.");
    }
}

const productosCarrito = "Detalle:\n\n" + carrito.listarCarrito();
const salidaSubTotal = "Subtotal: $" + carrito.calcularSubtotal();
const salidaImpuestos = "Impuestos: $" + carrito.calcularImpuestos();
const salidaDescuento = "Descuento: $" + carrito.aplicarDescuento();
const montoTotal = "Total a pagar: $" + carrito.calcularTotalPagar();

alert(`${productosCarrito}\n${salidaSubTotal}\n${salidaImpuestos}\n${salidaDescuento}\n${montoTotal}`);
