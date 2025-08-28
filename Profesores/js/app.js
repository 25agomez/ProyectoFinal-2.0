const apiUrl = "https://profesores-backend-nndm41q9z-25agomezs-projects.vercel.app";

const $token = 'Bearer UC2025-II51';
const headers = {
  'Authorization': $token,
  'Content-Type': 'application/json'
};

function listarProfesores() {
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
          ${u.codprofe} - ${u.nombre} ${u.apellido1} ${u.apellido2} - ${u.correo} - ${u.telefono}
          </div>
          
          <div>
          <button class="btn btn-dark" onclick="editarprofesor(${u.id})">Editar</button>
          <button class="btn btn-danger" onclick="eliminarprofesor(${u.id})">Eliminar</button>
          <button class="btn btn-info" onclick="verDetalles(${u.id})">Detalles</button>
          </div>
          
        `;
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        lista.appendChild(li);
      });
    });
}

function crearprofesor(codprofe, nombre, apellido1, apellido2, cedula, correo, telefono, curso) {
  fetch(apiUrl, {
    method: 'POST',
    headers,
    body: JSON.stringify({ codprofe, nombre, apellido1, apellido2, cedula, correo, telefono, curso })
  })
    .then(res => res.json())
    .then(() => listarProfesores());
}

function actualizarprofesor(id, codprofe, nombre, apellido1, apellido2, cedula, correo, telefono, curso) {
  fetch(`${apiUrl}?id=${id}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({ codprofe, nombre, apellido1, apellido2, cedula, correo, telefono, curso })
  })
    .then(res => res.json())
    .then(() => listarProfesores());
}

function eliminarprofesor(id) {
  if (!confirm('¿Seguro que desea eliminar este profesor?')) return;
  fetch(`${apiUrl}?id=${id}`, {
    method: 'DELETE',
    headers
  })
    .then(() => listarProfesores());
}

// Helpers para interacción simple:
function enviarFormulario(event) {
  event.preventDefault();
  const id = document.getElementById('id').value;
  const codprofe = document.getElementById('codprofe').value;
  const nombre = document.getElementById('nombre').value;
  const apellido1 = document.getElementById('apellido1').value;
  const apellido2 = document.getElementById('apellido2').value;
  const cedula = document.getElementById('cedula').value;
    const correo = document.getElementById('correo').value;
    const telefono = document.getElementById('telefono').value;
    const curso = document.getElementById('curso').value;

  if (id) {
    actualizarprofesor(id, codprofe, nombre, apellido1, apellido2, cedula, correo, telefono, curso);
  } else {
    crearprofesor(codprofe, nombre, apellido1, apellido2, cedula, correo, telefono, curso);
  }

  document.getElementById('formulario').reset();
  document.getElementById('id').value = '';
}

function editarprofesor(id) {
  fetch(`${apiUrl}?id=${id}`, { // Modifica la URL para incluir el id
    headers
  })
    .then(res => res.json())
    .then(data => {
      // Asume que el backend devuelve un array o un objeto.  Si devuelve un array, toma el primer elemento.
      const profesor = data.find(u => u.id === id);

      if (profesor) {
        document.getElementById('id').value = profesor.id;
        document.getElementById('codprofe').value = profesor.codprofeiante;
        document.getElementById('nombre').value = profesor.nombre;
        document.getElementById('apellido1').value = profesor.apellido1;
        document.getElementById('apellido2').value = profesor.apellido2;
        document.getElementById('cedula').value = profesor.cedula;
        document.getElementById('correo').value = profesor.correo;
        document.getElementById('telefono').value = profesor.telefono;
        document.getElementById('curso').value = profesor.curso;
        // Habilitar los campos para edición
        document.getElementById('id').disabled = false;
        document.getElementById('codprofe').disabled = false;
        document.getElementById('nombre').disabled = false;
        document.getElementById('apellido1').disabled = false;
        document.getElementById('apellido2').disabled = false;
        document.getElementById('cedula').disabled = false;
        document.getElementById('correo').disabled = false;
        document.getElementById('telefono').disabled = false;
        document.getElementById('curso').disabled = false;
      } else {
        console.error("Profesor no encontrado con ID:", id);
        alert("Profesor no encontrado."); // Opcional: Mostrar un mensaje al usuario
      }
    })
    .catch(error => {
      console.error("Error al obtener el profesor:", error);
      alert("Error al obtener el profesor."); // Opcional: Mostrar un mensaje al usuario
    });
}

function verDetalles(id) {
  fetch(`${apiUrl}?id=${id}`, { // Modifica la URL para incluir el id
    headers
  })
    .then(res => res.json())
    .then(data => {
      // Asume que el backend devuelve un array o un objeto.  Si devuelve un array, toma el primer elemento.
      const profesor = data.find(u => u.id === id);

      if (profesor) {
        document.getElementById('id').value = profesor.id;
        document.getElementById('codprofe').value = profesor.codprofeiante;
        document.getElementById('nombre').value = profesor.nombre;
        document.getElementById('apellido1').value = profesor.apellido1;
        document.getElementById('apellido2').value = profesor.apellido2;
        document.getElementById('cedula').value = profesor.cedula;
        document.getElementById('correo').value = profesor.correo;
        document.getElementById('telefono').value = profesor.telefono;
        document.getElementById('curso').value = profesor.curso;
        // Deshabilitar los campos para solo lectura
        document.getElementById('id').disabled = true;
        document.getElementById('codprofe').disabled = true;
        document.getElementById('nombre').disabled = true;
        document.getElementById('apellido1').disabled = true;
        document.getElementById('apellido2').disabled = true;
        document.getElementById('cedula').disabled = true;
        document.getElementById('correo').disabled = true;
        document.getElementById('telefono').disabled = true;
        document.getElementById('curso').disabled = true;
      } else {
        console.error("Profesor no encontrado con ID:", id);
        alert("Profesor no encontrado."); // Opcional: Mostrar un mensaje al usuario
      }
    })
    .catch(error => {
      console.error("Error al obtener el profesor:", error);
      alert("Error al obtener el profesor."); // Opcional: Mostrar un mensaje al usuario
    });
  }

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('formulario').addEventListener('submit', enviarFormulario);
  listarProfesores();
});