// ============================================
// 1. REFERENCIAS AL DOM
// ============================================
const bookTitle    = document.getElementById('bookTitle');
const commentInput = document.getElementById('commentInput');
const addBtn       = document.getElementById('addBtn');
const errorMsg     = document.getElementById('errorMsg');
const commentsList = document.getElementById('commentsList');
const commentCount = document.getElementById('commentCount');
const emptyMsg     = document.getElementById('emptyMsg');


// ============================================
// 2. ESTADO DE LA APLICACIÓN
// Un array que guarda todos los comentarios
// en memoria mientras la página está abierta.
// ============================================
let comments = [];


// ============================================
// 3. FUNCIÓN: formatDate
// Convierte un objeto Date a un string legible.
// ============================================
function formatDate(date) {
  return new Intl.DateTimeFormat('es-MX', {
    day:    'numeric',
    month:  'long',
    year:   'numeric',
    hour:   '2-digit',
    minute: '2-digit',
  }).format(date) + ' hrs';
}


// ============================================
// 4. FUNCIÓN: generateId
// Crea un ID único para cada comentario.
// Lo usamos para identificar cuál borrar.
// ============================================
function generateId() {
  return Date.now().toString();
}


// ============================================
// 5. FUNCIÓN: createCommentCard
// Construye el HTML de una tarjeta de comentario
// y lo devuelve como un elemento del DOM.
// ============================================
function createCommentCard(comment) {
  // Creamos el elemento contenedor
  const card = document.createElement('div');
  card.classList.add('comment-card');

  // Le asignamos el id del comentario como atributo
  // para poder identificarlo al eliminar
  card.dataset.id = comment.id;

  card.innerHTML = `
    <span class="comment-book">📖 ${comment.book}</span>
    <p class="comment-text">${comment.text}</p>
    <div class="comment-footer">
      <span class="comment-date">🕐 ${comment.date}</span>
      <button class="delete-btn" data-id="${comment.id}">
        Eliminar
      </button>
    </div>
  `;

  return card;
}


// ============================================
// 6. FUNCIÓN: renderComments
// Vacia el contenedor y redibuja todas las
// tarjetas desde el array comments[].
// ============================================
function renderComments() {
  // Limpiamos el contenedor antes de redibujar
  commentsList.innerHTML = '';

  if (comments.length === 0) {
    // No hay comentarios: mostramos el mensaje vacío
    emptyMsg.classList.remove('hidden');
    commentCount.textContent = '0 comentarios';
  } else {
    // Hay comentarios: ocultamos el mensaje vacío
    emptyMsg.classList.add('hidden');

    // Recorremos el array y creamos una tarjeta por cada comentario
    comments.forEach(comment => {
      const card = createCommentCard(comment);
      commentsList.appendChild(card);  // insertamos la tarjeta en la página
    });

    // Actualizamos el contador
    const total = comments.length;
    commentCount.textContent = `${total} ${total === 1 ? 'comentario' : 'comentarios'}`;
  }
}


// ============================================
// 7. FUNCIÓN: addComment
// Lee los valores de los inputs, valida que
// no estén vacíos, crea el objeto comentario,
// lo agrega al array y redibuja la lista.
// ============================================
function addComment() {
  const book = bookTitle.value.trim();     // .trim() elimina espacios al inicio y final
  const text = commentInput.value.trim();

  // Validación: ambos campos deben tener contenido
  if (!book || !text) {
    errorMsg.classList.remove('hidden');   // mostramos el error
    return;                                // salimos de la función sin hacer nada más
  }

  // Si llegamos aquí, los campos están completos
  errorMsg.classList.add('hidden');        // ocultamos el error si estaba visible

  // Creamos el objeto del nuevo comentario
  const newComment = {
    id:   generateId(),
    book: book,
    text: text,
    date: formatDate(new Date()),          // capturamos la fecha/hora exacta del momento
  };

  // Lo agregamos al principio del array para que aparezca arriba
  comments.unshift(newComment);

  // Limpiamos los campos del formulario
  bookTitle.value    = '';
  commentInput.value = '';

  // Volvemos el foco al campo del título para facilitar agregar otro
  bookTitle.focus();

  // Redibujamos la lista con el nuevo comentario incluido
  renderComments();
}


// ============================================
// 8. FUNCIÓN: deleteComment
// Recibe el id del comentario a eliminar,
// lo filtra del array y redibuja la lista.
// ============================================
function deleteComment(id) {
  // Guardamos cuántos había antes para el mensaje de confirmación
  const nombre = comments.find(c => c.id === id)?.book || 'este comentario';

  const confirmar = confirm(`¿Eliminar el comentario de "${nombre}"?`);
  if (!confirmar) return;

  // filter() recorre el array y se queda solo con los que NO tienen ese id
  comments = comments.filter(comment => comment.id !== id);

  renderComments();
}


// ============================================
// 9. EVENT LISTENERS
// ============================================

// Click en el botón Agregar
addBtn.addEventListener('click', addComment);

commentInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' && event.ctrlKey) {
    addComment();
  }
});

// Ocultar error cuando el usuario empieza a escribir
bookTitle.addEventListener('input', () => {
  errorMsg.classList.add('hidden');
});
commentInput.addEventListener('input', () => {
  errorMsg.classList.add('hidden');
});

// ── Delegación de eventos para los botones Eliminar ──
commentsList.addEventListener('click', (event) => {
  // event.target es el elemento exacto que recibió el click
  if (event.target.classList.contains('delete-btn')) {
    const id = event.target.dataset.id;   // leemos el id del atributo data-id
    deleteComment(id);
  }
});


// ============================================
// 10. INICIALIZACIÓN
// Al cargar la página, renderizamos el estado
// inicial (lista vacía con el mensaje vacío).
// ============================================
renderComments();