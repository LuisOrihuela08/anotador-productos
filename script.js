const productForm = document.getElementById('productForm');
const productTable = document.querySelector('#productTable tbody');
let products = [];

//Funcion para agregar productos
productForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const cantidad = document.getElementById('cantidad').value;
    const marca = document.getElementById('marca').value;
    const descripcion = document.getElementById('descripcion').value;

    const product = {nombre, cantidad, marca, descripcion};
    products.push(product);
    updateTable();
    productForm.reset();
})

//Funcion para actualizar la tabla
function updateTable(){
    productTable.innerHTML = "";
    products.forEach((product, index) => {
        const row =  `
        <tr>
            <td>${product.nombre}</td>
            <td>${product.cantidad}</td>
            <td>${product.marca}</td>
            <td>${product.descripcion}</td>
            <td><button onclick="deleteProduct(${index})">Eliminar</button></td>
        </tr>
    `;
    productTable.innerHTML += row;
    })
}

// Función para eliminar un producto
function deleteProduct(index) {
    products.splice(index, 1);
    updateTable();
}
// Función para exportar a Excel
// Función para exportar a Excel
function exportExcel() {
    // Obtener la fecha actual y formatearla
    const fechaActual = new Date();
    const fechaFormateada = fechaActual.toLocaleDateString("es-PE", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    }).replace(/\//g, "-"); // Reemplazar '/' por '-' para el nombre del archivo

    // Crear hoja de cálculo y libro de trabajo
    const worksheet = XLSX.utils.json_to_sheet(products);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Pedidos");

    // Guardar el archivo con la fecha en el nombre
    XLSX.writeFile(workbook, `lista-productos-${fechaFormateada}.xlsx`);
}

// Función para exportar a PDF
function exportPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Obtener la fecha actual y formatearla
    const fechaActual = new Date();
    const fechaFormateada = fechaActual.toLocaleDateString("es-PE", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    });

    // Título del documento
    doc.text("Listado de Productos", 20, 20);
    doc.text(`Fecha: ${fechaFormateada}`, 150, 20); // Coloca la fecha en la esquina superior derecha

    // Verificar que haya productos
    if (products.length === 0) {
        alert("No hay productos para exportar.");
        return;
    }

    // Obtener las cabeceras de las columnas
    const headers = ["Nombre", "Cantidad", "Marca", "Descripcion"];

    // Convertir los productos en un formato adecuado para autoTable
    const data = products.map(product => [
        product.nombre,
        product.cantidad,
        product.marca,
        product.descripcion
    ]);

    // Generar la tabla con autoTable
    doc.autoTable({
        startY: 30,
        head: [headers],
        body: data,
        styles: {
            fontSize: 10
        },
        headStyles: {
            fillColor: [0, 102, 204],
            textColor: 255,
            fontStyle: 'bold'
        }
    });

    // Guardar el PDF
    doc.save(`lista-productos-${fechaFormateada}.pdf`);
}


// Función para limpiar la lista
function Limpiar() {
    products = [];
    updateTable();
}