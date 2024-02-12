const disponibles = [
    { id: 1, nombre: "papas fritas", precio: 2590, cantidad: 4, imagen: "https://e7.pngegg.com/pngimages/823/670/png-clipart-potato-chip-matutano-vegetarian-cuisine-cheetos-potato-food-convenience-food.png"},
    { id: 2, nombre: "arroz", precio: 980, cantidad: 3, imagen: "https://dojiw2m9tvv09.cloudfront.net/58394/product/2-5-copy4838.png" },
    { id: 3, nombre: "fideos", precio: 540, cantidad: 6, imagen: "https://www.sm24.cl/web/image/product.template/1830/image_1024?unique=01dbf51" },
    { id: 4, nombre: "leche", precio: 1200, cantidad: 2, imagen: "https://masterofficechile.cl/wp-content/uploads/2022/04/909.jpg" },
    { id: 5, nombre: "sopas", precio: 180, cantidad: 5, imagen: "https://www.alimentosmj.cl/126-large_default/sopa-carne-con-semola-maggi-68-g.jpg" },
    { id: 6, nombre: "lentejas", precio: 2200, cantidad: 2, imagen: "https://cugat.cl/wp-content/uploads/2021/09/7804608220128.png" },
    { id: 7, nombre: "conservas", precio: 1100, cantidad: 4, imagen: "https://santaisabel.vtexassets.com/arquivos/ids/197665/Durazno-en-cubitos-caja-abre-facil-200-g.jpg?v=637891751893270000" },
];

const bodega = obtenerBodegaDesdeLocalStorage();

const listaProductosContainer = document.getElementById("listaProductos");

const red = ["Nombre del producto", "Precio", "Cantidad"];
const propiedades = ["nombre", "precio", "cantidad"];

red.forEach((redes, index) => {
    const etiqueta = document.createElement("label");
    etiqueta.setAttribute("for", propiedades[index]);
    etiqueta.textContent = `${redes}:`;

    const input = document.createElement("input");
    input.setAttribute("type", index === 1 || index === 2 ? "number" : "text");
    input.setAttribute("id", propiedades[index]);
    input.setAttribute("name", propiedades[index]);
    input.setAttribute("required", true);

    listaProductosContainer.appendChild(etiqueta);
    listaProductosContainer.appendChild(input);

});

const formulario = document.getElementById("formulario");

const boton = document.createElement("button");
boton.textContent = "Guardar";
formulario.appendChild(boton);

boton.addEventListener("click", function(event) {
    event.preventDefault();

    Swal.fire({
        title: "¿Estás seguro que deseas guardar?",
        // text: "Una vez guardado, no podrás revertirlo.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, guardar",
        cancelButtonText: "Cancelar"
    }).then((result) => {
        if (result.isConfirmed) {
            const nombre = document.getElementById("nombre").value;
            const precio = document.getElementById("precio").value;
            const cantidad = document.getElementById("cantidad").value;
            agregarProducto(nombre, precio, cantidad);
        }
    });
});


function obtenerBodegaDesdeLocalStorage() {
    const datosGuardados = localStorage.getItem('bodega');
    return datosGuardados ? JSON.parse(datosGuardados) : [];
}

function guardarBodegaEnLocalStorage(bodega) {
    localStorage.setItem("bodega", JSON.stringify(bodega));
}

function agregarProducto(nombre, precio, cantidad) {
    const nuevoProducto = {
        id: bodega.length + 1,
        nombre,
        precio: parseFloat(precio),
        cantidad: parseInt(cantidad),
    };

    disponibles.push(nuevoProducto);
    guardarBodegaEnLocalStorage(bodega); 
    renderizarProductos(bodega);
}

const renderizarProductos = (productos) => {
    listaProductosContainer.innerHTML = `
        <h2 class=poppins-regular>Productos Disponibles</h2>`;

    disponibles.forEach((producto) => {
        const div = document.createElement("div");
        div.classList.add("producto");
             div.innerHTML = `
            <h3>Id: ${producto.id}</h3>
            <b>Nombre: ${producto.nombre}</b>
            <p>Precio: $${producto.precio}</p>
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.nombre}">
        `;
        listaProductosContainer.appendChild(div);
        
    });
    
};  

renderizarProductos(bodega);


