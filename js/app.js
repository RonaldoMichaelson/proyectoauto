const autosDisponibles = [];
const carritoDeCompras = [];

function agregarAuto(index) {
  const auto = autosDisponibles[index];
  if (auto) {
    const autoEnCarrito = carritoDeCompras.find(item => (
      item.nombre === auto.nombre && item.marca === auto.marca
    ));

    if (autoEnCarrito) {
      autoEnCarrito.cantidad += 1;
      autoEnCarrito.precioTotal += auto.precio;
    } else {
      carritoDeCompras.push({
        nombre: auto.nombre,
        marca: auto.marca,
        precio: auto.precio,
        cantidad: 1,
        precioTotal: auto.precio,
      });
    }

    mostrarAutosEnCarrito();
  }
}

function quitarAuto(index) {
  carritoDeCompras.splice(index, 1);
  mostrarAutosEnCarrito();
}

function mostrarAutosEnCarrito() {
  const carritoTableBody = document.getElementById('carritoTableBody');
  carritoTableBody.innerHTML = '';

  let subtotal = 0;

  carritoDeCompras.forEach((auto, index) => {
    const row = document.createElement('tr');

    const nombreCell = document.createElement('td');
    nombreCell.textContent = auto.nombre;

    const precioCell = document.createElement('td');
    precioCell.textContent = auto.precioTotal;

    const cantidadCell = document.createElement('td');
    cantidadCell.textContent = auto.cantidad;

    const subtotalCell = document.createElement('td');
    subtotalCell.textContent = auto.precioTotal * auto.cantidad;

    const accionesCell = document.createElement('td');
    const quitarButton = document.createElement('button');
    quitarButton.textContent = 'Quitar';
    quitarButton.classList.add('btn', 'btn-danger', 'btn-sm');
    quitarButton.addEventListener('click', () => quitarAuto(index));

    accionesCell.appendChild(quitarButton);

    row.appendChild(nombreCell);
    row.appendChild(precioCell);
    row.appendChild(cantidadCell);
    row.appendChild(subtotalCell);
    row.appendChild(accionesCell);

    carritoTableBody.appendChild(row);

    subtotal += auto.precioTotal * auto.cantidad;
  });

  const totalRow = document.createElement('tr');
  totalRow.innerHTML = '<td colspan="3">Total:</td><td>' + subtotal + '</td><td></td>';
  carritoTableBody.appendChild(totalRow);
}

document.getElementById('comprarButton').addEventListener('click', function() {
  mostrarMensajeCompra();
});

function mostrarMensajeCompra() {
    const mensajeCompra = document.getElementById('mensajeCompra');
    if (carritoDeCompras.length === 0) {
      mensajeCompra.textContent = 'Debe agregar al menos un vehículo';
    } else {
      mensajeCompra.textContent = '¡Gracias por su compra!';
      carritoDeCompras.length = 0;
      mostrarAutosEnCarrito();
    }
    mensajeCompra.classList.remove('hidden');
  }

fetch('https://my-json-server.typicode.com/RonaldoMichaelson/proyectoauto/autos')
  .then(response => response.json())
  .then(data => {
    const productosTableBody = document.getElementById('productosTableBody');

    if (Array.isArray(data)) {
      autosDisponibles.push(...data);
      data.forEach((auto, index) => {
        const row = document.createElement('tr');

        const nombreCell = document.createElement('td');
        nombreCell.textContent = auto.nombre;

        const marcaCell = document.createElement('td');
        marcaCell.textContent = auto.marca;

        const precioCell = document.createElement('td');
        precioCell.textContent = auto.precio;

        const accionesCell = document.createElement('td');
        const agregarButton = document.createElement('button');
        agregarButton.textContent = 'Agregar';
        agregarButton.classList.add('btn', 'btn-success', 'btn-sm');
        agregarButton.addEventListener('click', () => agregarAuto(index));

        accionesCell.appendChild(agregarButton);

        row.appendChild(nombreCell);
        row.appendChild(marcaCell);
        row.appendChild(precioCell);
        row.appendChild(accionesCell);

        productosTableBody.appendChild(row);
      });
    } else {
      console.error('No se encontró la lista de autos en la API.');
    }
  })
  .catch(error => {
    console.error('Error al cargar los datos desde la API:', error);
  });
