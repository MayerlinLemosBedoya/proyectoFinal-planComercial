// Captura de elementos HTML
const descripcionIngreso = document.getElementById('descripcion-ingreso');
const cantidadIngreso = document.getElementById('cantidad-ingreso');
const btnAgregarIngreso = document.getElementById('btn-agregar-ingreso');
const descripcionGasto = document.getElementById('descripcion-gasto');
const categoriaGasto = document.getElementById('categoria-gasto');
const montoGasto = document.getElementById('monto-gasto');
const btnAnadirGasto = document.getElementById('btn-anadir-gasto');
const ingresoTotal = document.getElementById('ingreso-total');
const gastoTotal = document.getElementById('gasto-total');
const balance = document.getElementById('balance');
const historialTransacciones = document.getElementById('historial-transacciones');
const btnBorrar = document.getElementById('btn-borrar');

let totalIngresos = 0;
let totalGastos = 0;

// Funciones para agregar ingresos y gastos//
function agregarIngreso() {
  const descripcion = descripcionIngreso.value;
  const cantidad = parseFloat(cantidadIngreso.value);

  if (descripcion && !isNaN(cantidad)) {
    totalIngresos += cantidad;
    ingresoTotal.textContent = totalIngresos;
    actualizarBalance();
    agregarTransaccion(descripcion, cantidad, 'Ingreso');
    limpiarCamposIngreso();
  } else {
    alert('Por favor, ingrese una descripción y una cantidad válida para el ingreso.');
  }
}
function anadirGasto() {
  const descripcion = descripcionGasto.value;
  const categoria = categoriaGasto.value;
  const monto = parseFloat(montoGasto.value);

  if (descripcion && categoria && !isNaN(monto)) {
    totalGastos += monto;
    gastoTotal.textContent = totalGastos;
    actualizarBalance();
    agregarTransaccion(descripcion, monto, 'Gasto', categoria);
    limpiarCamposGasto();
  } else {
    alert('Por favor, ingrese una descripción, categoría y monto válido para el gasto.');
  }
}

// Función para agregar transacción al historial
function agregarTransaccion(descripcion, monto, tipo, categoria = '') {
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${descripcion}</td>
      <td>${categoria}</td>
      <td>${monto}</td>
      <td>${tipo}</td>
      <td><button class="btn-eliminar">Eliminar</button></td>
    `;
    historialTransacciones.appendChild(fila);
  
    const btnEliminar = fila.querySelector('.btn-eliminar');
    btnEliminar.addEventListener('click', () => {
      if (tipo === 'Ingreso') {
        totalIngresos -= monto;
        ingresoTotal.textContent = totalIngresos;
      } else {
        totalGastos -= monto;
        gastoTotal.textContent = totalGastos;
      }
      actualizarBalance();
      fila.remove();
    });
  }

// Función para calcular el balance
function actualizarBalance() {
  const saldo = totalIngresos - totalGastos;
  balance.textContent = saldo;
}

// Funciones para limpiar los campos de entrada
function limpiarCamposIngreso() {
    descripcionIngreso.value = '';
    cantidadIngreso.value = '';
}

function limpiarCamposGasto() {
    descripcionGasto.value = '';
    montoGasto.value = '';
}

// Función para borrar el formulario
function borrarFormulario() {
  totalIngresos = 0;
  totalGastos = 0;
  ingresoTotal.textContent = 0;
  gastoTotal.textContent = 0;
  balance.textContent = 0;
  historialTransacciones.innerHTML = '';
  limpiarCamposIngreso();
  limpiarCamposGasto();
}
// Manejo de eventos
btnAgregarIngreso.addEventListener('click', agregarIngreso);
btnAnadirGasto.addEventListener('click', anadirGasto);
btnBorrar.addEventListener('click', borrarFormulario);