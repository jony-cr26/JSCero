let librosLeidos = [];

function agregarLibro(titulo){
    librosLeidos.push(titulo);
    console.log(`Libro "${titulo}" agregado a la lista de libros leidos.`);
}

function mostrarLibrosLeidos(){
      console.log("Libros leidos:");
  
  if (librosLeidos.length === 0) {
    console.log("No has leído ningun libro.");
  } else {
    for (let i = 0; i < librosLeidos.length; i++) {
      console.log(`${i + 1}. ${librosLeidos[i]}`);
    }
  }
}

// Pruebas
agregarLibro("El Principito");
agregarLibro("Cien años de soledad");
agregarLibro("Harry Potter y la piedra filosofal");

mostrarLibrosLeidos();