// ============================================
// 1. REFERENCIAS AL DOM
// Conectamos JS con los elementos del HTML
// ============================================
const passwordOutput = document.getElementById('passwordOutput');
const copyBtn        = document.getElementById('copyBtn');
const lengthSlider   = document.getElementById('lengthSlider');
const lengthValue    = document.getElementById('lengthValue');
const chkUppercase   = document.getElementById('uppercase');
const chkLowercase   = document.getElementById('lowercase');
const chkNumbers     = document.getElementById('numbers');
const chkSymbols     = document.getElementById('symbols');
const strengthText   = document.getElementById('strengthText');
const strengthBars   = document.getElementById('strengthBars');
const generateBtn    = document.getElementById('generateBtn');
 
 
// ============================================
// 2. CONJUNTOS DE CARACTERES
// Cada tipo de carácter es un string.
// Los combinamos según lo que el usuario elija.
// ============================================
const CHARS = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numbers:   '0123456789',
  symbols:   '!@#$%^&*()_+-=[]{}|;:,.<>?'
};
 
 
// ============================================
// 3. FUNCIÓN: buildCharset
// Construye el pool de caracteres disponibles
// según los checkboxes activos.
// Retorna un string con todos los caracteres posibles.
// ============================================
function buildCharset() {
  let charset = '';
 
  if (chkUppercase.checked) charset += CHARS.uppercase;
  if (chkLowercase.checked) charset += CHARS.lowercase;
  if (chkNumbers.checked)   charset += CHARS.numbers;
  if (chkSymbols.checked)   charset += CHARS.symbols;
 
  return charset;
}
 
 
// ============================================
// 4. FUNCIÓN: generatePassword
// Genera la contraseña carácter por carácter.
// ============================================
function generatePassword(length, charset) {
  // Si el usuario no eligió ningún tipo, retornamos vacío
  if (!charset) return '';
 
  let password = '';
  const array = new Uint32Array(length); // array de números aleatorios seguros
  crypto.getRandomValues(array);         // llenamos el array con valores aleatorios
 
  for (let i = 0; i < length; i++) {
    password += charset[array[i] % charset.length];
  }
 
  return password;
}
 
 
// ============================================
// 5. FUNCIÓN: calcularFuerza
// Evalúa qué tan segura es la contraseña
// según longitud y tipos de caracteres activos.
// ============================================
function calculateStrength(password, charset) {
  if (!password) return { level: 'N/A', score: 0 };
 
  let score = 0;
 
  // Sumamos puntos por cada tipo de carácter activo
  if (chkUppercase.checked) score++;
  if (chkLowercase.checked) score++;
  if (chkNumbers.checked)   score++;
  if (chkSymbols.checked)   score++;
 
  // Ajustamos por longitud
  const length = password.length;
  if (length < 10)      score = Math.min(score, 1); // máximo MUY DEBIL si es muy corta
  else if (length < 14) score = Math.min(score, 2); // máximo DEBIL
  else if (length < 18) score = Math.min(score, 3); // máximo MEDIO
 
  const levels = ['', 'MUY DEBIL', 'DEBIL', 'MEDIO', 'FUERTE'];
  return { level: levels[score] || 'MUY DEBIL', score };
}
 
 
// ============================================
// 6. FUNCIÓN: updateStrengthUI
// Pinta las barras y el texto de fuerza
// según el score calculado.
// ============================================
function updateStrengthUI(score, level) {
  // Mapeamos score → clase CSS → color
  const colorClass = ['', 'weak', 'fair', 'medium', 'strong'];
  const bars = strengthBars.querySelectorAll('.bar');
 
  bars.forEach((bar, index) => {
    // Eliminamos todas las clases de color anteriores
    bar.classList.remove('weak', 'fair', 'medium', 'strong');
 
    // Solo pintamos las barras hasta el score actual
    if (index < score) {
      bar.classList.add(colorClass[score]);
    }
  });
 
  strengthText.textContent = level;
}
 
 
// ============================================
// 7. FUNCIÓN: updateSliderFill
// Colorea la parte izquierda del slider 
// de color verde.
// ============================================
function updateSliderFill() {
  const min = Number(lengthSlider.min);   // 8
  const max = Number(lengthSlider.max);   // 20
  const val = Number(lengthSlider.value); // valor actual
 
  // Calculamos qué porcentaje del slider está "lleno"
  const pct = ((val - min) / (max - min)) * 100;
 
  // Aplicamos el gradiente: verde hasta el % actual, oscuro el resto
  lengthSlider.style.background = `linear-gradient(
    to right,
    var(--color-accent) 0%,
    var(--color-accent) ${pct}%,
    var(--color-bg-display) ${pct}%,
    var(--color-bg-display) 100%
  )`;
}
 
 
// ============================================
// 8. FUNCIÓN PRINCIPAL: run
// Orquesta todo el flujo cuando el usuario
// hace click en GENERAR (o al iniciar la app).
// ============================================
function run() {
  const length  = Number(lengthSlider.value);
  const charset = buildCharset();
  const password = generatePassword(length, charset);
  const { level, score } = calculateStrength(password, charset);
 
  // Actualizamos la UI con los resultados
  passwordOutput.textContent = password || '— elige opciones —';
  updateStrengthUI(score, level);
}
 
 
// ============================================
// 9. FUNCIÓN: copyToClipboard
// Copia la contraseña y muestra feedback visual
// por 1.5 segundos.
// ============================================
function copyToClipboard() {
  const password = passwordOutput.textContent;
  if (!password || password.includes('—')) return;
 
  // La API del portapapeles es asíncrona (devuelve una Promesa)
  navigator.clipboard.writeText(password).then(() => {
    copyBtn.classList.add('copied');
 
    // Cambiamos el ícono a un check ✓
    copyBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
           viewBox="0 0 24 24" fill="none" stroke="currentColor"
           stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>`;
 
    // Después de 1.5s, restauramos el ícono original
    setTimeout(() => {
      copyBtn.classList.remove('copied');
      copyBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
             viewBox="0 0 24 24" fill="none" stroke="currentColor"
             stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>`;
    }, 1500);
  });
}
 
 
// ============================================
// 10. EVENT LISTENERS
// Conectamos los eventos del usuario con
// las funciones que los manejan.
// ============================================
 
// Click en GENERAR
generateBtn.addEventListener('click', run);
 
// Mover el slider → actualizar número y color de relleno
lengthSlider.addEventListener('input', () => {
  lengthValue.textContent = lengthSlider.value;
  updateSliderFill();
});
 
// Click en copiar
copyBtn.addEventListener('click', copyToClipboard);
 
// Si el usuario cambia un checkbox mientras ya hay contraseña,
// recalculamos la fuerza en tiempo real
[chkUppercase, chkLowercase, chkNumbers, chkSymbols].forEach(chk => {
  chk.addEventListener('change', () => {
    if (passwordOutput.textContent && !passwordOutput.textContent.includes('—')) {
      const password = passwordOutput.textContent;
      const { level, score } = calculateStrength(password, buildCharset());
      updateStrengthUI(score, level);
    }
  });
});
 
 
// ============================================
// 11. INICIALIZACIÓN
// Ejecutamos estas funciones al cargar la página
// para que la app tenga un estado inicial correcto.
// ============================================
updateSliderFill();   // colorear el slider desde el inicio
run();                // generar una contraseña de ejemplo al abrir la app