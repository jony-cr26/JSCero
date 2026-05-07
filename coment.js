// Obtener elementos del HTML
const formulario = document.getElementById("commentForm");
const contenedorComentarios = document.getElementById("commentsContainer");

// Evento al enviar el formulario
formulario.addEventListener("submit", function (event) {
  // Evita que la página se recargue
  event.preventDefault();

  // Obtener valores
  const nombre = document.getElementById("name").value;
  const comentarioTexto = document.getElementById("comment").value;

  // Crear contenedor del comentario
  const comentario = document.createElement("div");
  comentario.classList.add("comentario");

  // Fecha y hora
  const fecha = new Date().toLocaleString();

  // Contenido del comentario
  comentario.innerHTML = `
    <h3>${nombre}</h3>
    <p>${comentarioTexto}</p>
    <small>${fecha}</small>
    <br>
    <button class="eliminar">Eliminar</button>
  `;

  // Botón eliminar
  comentario
    .querySelector(".eliminar")
    .addEventListener("click", function () {
      comentario.remove();
    });

  // Agregar comentario al contenedor
  contenedorComentarios.appendChild(comentario);

  // Limpiar formulario
  formulario.reset();
});