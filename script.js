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
function exportExcel() {
    const worksheet = XLSX.utils.json_to_sheet(products);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Pedidos");
    XLSX.writeFile(workbook, "lista-productos.xlsx");
}
// Función para exportar a PDF
function exportPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.text("Listado de Productos", 20, 20);
    let y = 30;
    products.forEach((product, index) => {
        doc.text(
            `${index + 1}. ${product.nombre} - ${product.marca} - Cant: ${product.cantidad} - Precio: ${product.descripcion}`,
            20,
            y
        );
        y += 10;
    });
    doc.save("lista-productos.pdf");
}

// Función para limpiar la lista
function Limpiar() {
    products = [];
    updateTable();
}