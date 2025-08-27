const apiUrl = "https://estudiantes-backend-cmnbypz0m-25agomezs-projects.vercel.app";

const $token = 'Bearer UC2025-II51';
const headers = {
  'Authorization': $token,
  'Content-Type': 'application/json'
};

function listarEstudiantes() {
  fetch(apiUrl, {
    headers
  })
    .then(res => res.json())
    .then(data => {
      const lista = document.getElementById('lista');
      lista.innerHTML = '';
      data.forEach(u => {
        const li = document.createElement('li');
        li.innerHTML = `
          <div>
          <div class="badge badge-primary mr-3">${u.id}</div>
          ${u.codestud} - ${u.nombre} - ${u.apellido1} - ${u.apellido2} - ${u.correo} - ${u.telefono}
          </div>
          
          <div>
          <button class="btn btn-dark" onclick="editarEstudiante(${u.id})">Editar</button>
          <button class="btn btn-danger" onclick="eliminarEstudiante(${u.id})">Eliminar</button>
          <button class="btn btn-info" onclick="verDetalles(${u.id})">Detalles</button>
          </div>
          
        `;
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        lista.appendChild(li);
      });
    });
}

function crearEstudiante(codestud, nombre, apellido1, apellido2, cedula, correo, telefono, carrera) {
  fetch(apiUrl, {
    method: 'POST',
    headers,
    body: JSON.stringify({ codestud, nombre, apellido1, apellido2, cedula, correo, telefono, carrera })
  })
    .then(res => res.json())
    .then(() => listarEstudiantes());
}

function actualizarEstudiante(id, codestud, nombre, apellido1, apellido2, cedula, correo, telefono, carrera) {
  fetch(`${apiUrl}?id=${id}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({ codestud, nombre, apellido1, apellido2, cedula, correo, telefono, carrera })
  })
    .then(res => res.json())
    .then(() => listarEstudiantes());
}

function eliminarEstudiante(id) {
  if (!confirm('¿Seguro que desea eliminar este estudiante?')) return;
  fetch(`${apiUrl}?id=${id}`, {
    method: 'DELETE',
    headers
  })
    .then(() => listarEstudiantes());
}

// Helpers para interacción simple:
function enviarFormulario(event) {
  event.preventDefault();
  const id = document.getElementById('id').value;
  const codestud = document.getElementById('codestud').value;
  const nombre = document.getElementById('nombre').value;
  const apellido1 = document.getElementById('apellido1').value;
  const apellido2 = document.getElementById('apellido2').value;
  const cedula = document.getElementById('cedula').value;
    const correo = document.getElementById('correo').value;
    const telefono = document.getElementById('telefono').value;
    const carrera = document.getElementById('carrera').value;

  if (id) {
    actualizarEstudiante(id, codestud, nombre, apellido1, apellido2, cedula, correo, telefono, carrera);
  } else {
    crearEstudiante(codestud, nombre, apellido1, apellido2, cedula, correo, telefono, carrera);
  }

  document.getElementById('formulario').reset();
  document.getElementById('id').value = '';
}

function editarEstudiante(id) {
  fetch(`${apiUrl}?id=${id}`, { // Modifica la URL para incluir el id
    headers
  })
    .then(res => res.json())
    .then(data => {
      // Asume que el backend devuelve un array o un objeto.  Si devuelve un array, toma el primer elemento.
      const estudiante = data.find(u => u.id === id);

      if (estudiante) {
        document.getElementById('id').value = estudiante.id;
        document.getElementById('codestud').value = estudiante.codestudiante;
        document.getElementById('nombre').value = estudiante.nombre;
        document.getElementById('apellido1').value = estudiante.apellido1;
        document.getElementById('apellido2').value = estudiante.apellido2;
        document.getElementById('cedula').value = estudiante.cedula;
        document.getElementById('correo').value = estudiante.correo;
        document.getElementById('telefono').value = estudiante.telefono;
        document.getElementById('carrera').value = estudiante.carrera;
        // Habilitar los campos para edición
        document.getElementById('id').disabled = false;
        document.getElementById('codestud').disabled = false;
        document.getElementById('nombre').disabled = false;
        document.getElementById('apellido1').disabled = false;
        document.getElementById('apellido2').disabled = false;
        document.getElementById('cedula').disabled = false;
        document.getElementById('correo').disabled = false;
        document.getElementById('telefono').disabled = false;
        document.getElementById('carrera').disabled = false;
      } else {
        console.error("Estudiante no encontrado con ID:", id);
        alert("Estudiante no encontrado."); // Opcional: Mostrar un mensaje al usuario
      }
    })
    .catch(error => {
      console.error("Error al obtener el estudiante:", error);
      alert("Error al obtener el estudiante."); // Opcional: Mostrar un mensaje al usuario
    });
}

function verDetalles(id) {
  fetch(`${apiUrl}?id=${id}`, { // Modifica la URL para incluir el id
    headers
  })
    .then(res => res.json())
    .then(data => {
      // Asume que el backend devuelve un array o un objeto.  Si devuelve un array, toma el primer elemento.
      const estudiante = data.find(u => u.id === id);

      if (estudiante) {
        document.getElementById('id').value = estudiante.id;
        document.getElementById('codestud').value = estudiante.codestudiante;
        document.getElementById('nombre').value = estudiante.nombre;
        document.getElementById('apellido1').value = estudiante.apellido1;
        document.getElementById('apellido2').value = estudiante.apellido2;
        document.getElementById('cedula').value = estudiante.cedula;
        document.getElementById('correo').value = estudiante.correo;
        document.getElementById('telefono').value = estudiante.telefono;
        document.getElementById('carrera').value = estudiante.carrera;
        // Deshabilitar los campos para solo lectura
        document.getElementById('id').disabled = true;
        document.getElementById('codestud').disabled = true;
        document.getElementById('nombre').disabled = true;
        document.getElementById('apellido1').disabled = true;
        document.getElementById('apellido2').disabled = true;
        document.getElementById('cedula').disabled = true;
        document.getElementById('correo').disabled = true;
        document.getElementById('telefono').disabled = true;
        document.getElementById('carrera').disabled = true;
      } else {
        console.error("Estudiante no encontrado con ID:", id);
        alert("Estudiante no encontrado."); // Opcional: Mostrar un mensaje al usuario
      }
    })
    .catch(error => {
      console.error("Error al obtener el estudiante:", error);
      alert("Error al obtener el estudiante."); // Opcional: Mostrar un mensaje al usuario
    });
  }

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('formulario').addEventListener('submit', enviarFormulario);
  listarEstudiantes();
});