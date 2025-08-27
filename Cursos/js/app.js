const apiUrl = "https://cursos-backend-jk2dk5k7z-25agomezs-projects.vercel.app";

const $token = 'Bearer UC2025-II51';
const headers = {
  'Authorization': $token,
  'Content-Type': 'application/json'
};

function listarCursos() {
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
          ${u.codcurso} - ${u.nombre} - ${u.cuatrimestre}
          </div>
          
          <div>
          <button class="btn btn-dark" onclick="editarCurso(${u.id})">Editar</button>
          <button class="btn btn-danger" onclick="eliminarCurso(${u.id})">Eliminar</button>
          <button class="btn btn-info" onclick="verDetalles(${u.id})">Detalles</button>
          </div>
          
        `;
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        lista.appendChild(li);
      });
    });
}

function crearCurso(codcurso, nombre, creditos, requisito, cuatrimestre) {
  fetch(apiUrl, {
    method: 'POST',
    headers,
    body: JSON.stringify({ codcurso, nombre, creditos, requisito, cuatrimestre })
  })
    .then(res => res.json())
    .then(() => listarCursos());
}

function actualizarCurso(id, codcurso, nombre, creditos, requisito, cuatrimestre) {
  fetch(`${apiUrl}?id=${id}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({ codcurso, nombre, creditos, requisito, cuatrimestre })
  })
    .then(res => res.json())
    .then(() => listarCursos());
}

function eliminarCurso(id) {
  if (!confirm('¿Seguro que desea eliminar este curso?')) return;
  fetch(`${apiUrl}?id=${id}`, {
    method: 'DELETE',
    headers
  })
    .then(() => listarCursos());
}

// Helpers para interacción simple:
function enviarFormulario(event) {
  event.preventDefault();
  const id = document.getElementById('id').value;
  const codcurso = document.getElementById('codcurso').value;
  const nombre = document.getElementById('nombre').value;
  const creditos = document.getElementById('creditos').value;
  const requisito = document.getElementById('requisito').value;
  const cuatrimestre = document.getElementById('cuatrimestre').value;

  if (id) {
    actualizarCurso(id, codcurso, nombre, creditos, requisito, cuatrimestre);
  } else {
    crearCurso(codcurso, nombre, creditos, requisito, cuatrimestre);
  }

  document.getElementById('formulario').reset();
  document.getElementById('id').value = '';
}

function editarCurso(id) {
  fetch(`${apiUrl}?id=${id}`, { // Modifica la URL para incluir el id
    headers
  })
    .then(res => res.json())
    .then(data => {
      // Asume que el backend devuelve un array o un objeto.  Si devuelve un array, toma el primer elemento.
      const curso = data.find(u => u.id === id);

      if (curso) {
        document.getElementById('id').value = curso.id;
        document.getElementById('codcurso').value = curso.codcurso;
        document.getElementById('nombre').value = curso.nombre;
        document.getElementById('creditos').value = curso.creditos;
        document.getElementById('requisito').value = curso.requisito;
        document.getElementById('cuatrimestre').value = curso.cuatrimestre;
        // Habilitar los campos para edición
        document.getElementById('codcurso').disabled = false;
        document.getElementById('nombre').disabled = false;
        document.getElementById('creditos').disabled = false;
        document.getElementById('requisito').disabled = false;
        document.getElementById('cuatrimestre').disabled = false;
      } else {
        console.error("Curso no encontrado con ID:", id);
        alert("Curso no encontrado."); // Opcional: Mostrar un mensaje al usuario
      }
    })
    .catch(error => {
      console.error("Error al obtener el curso:", error);
      alert("Error al obtener el curso."); // Opcional: Mostrar un mensaje al usuario
    });
}

function verDetalles(id) {
  fetch(`${apiUrl}?id=${id}`, { // Modifica la URL para incluir el id
    headers
  })
    .then(res => res.json())
    .then(data => {
      // Asume que el backend devuelve un array o un objeto.  Si devuelve un array, toma el primer elemento.
      const curso = data.find(u => u.id === id);

      if (curso) {
        document.getElementById('id').value = curso.id;
        document.getElementById('codcurso').value = curso.codcurso;
        document.getElementById('nombre').value = curso.nombre;
        document.getElementById('creditos').value = curso.creditos;
        document.getElementById('requisito').value = curso.requisito;
        document.getElementById('cuatrimestre').value = curso.cuatrimestre;
        // Deshabilitar los campos para solo lectura
        document.getElementById('codcurso').disabled = true;
        document.getElementById('nombre').disabled = true;
        document.getElementById('creditos').disabled = true;
        document.getElementById('requisito').disabled = true;
        document.getElementById('cuatrimestre').disabled = true;
      } else {
        console.error("Curso no encontrado con ID:", id);
        alert("Curso no encontrado."); // Opcional: Mostrar un mensaje al usuario
      }
    })
    .catch(error => {
      console.error("Error al obtener el curso:", error);
      alert("Error al obtener el curso."); // Opcional: Mostrar un mensaje al usuario
    });
  }

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('formulario').addEventListener('submit', enviarFormulario);
  listarCursos();
});