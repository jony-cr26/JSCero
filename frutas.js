// Arreglo de frutas
let frutas = ["manzana", "fresa", "naranja", "manzana", "naranja", "manzana", "pera"];

// Contar cuántas veces aparece cada fruta
let conteoFrutas = {};

for (let i = 0; i < frutas.length; i++) {
    let fruta = frutas[i];
    
    // Si la fruta ya existe en el objeto, sumamos 1
    if (conteoFrutas[fruta]) {
        conteoFrutas[fruta]++;
    } else {
        // Si no existe, la inicializamos en 1
        conteoFrutas[fruta] = 1;
    }
}

// Mostrar el conteo de cada fruta
console.log("Conteo con ciclo for:", conteoFrutas);