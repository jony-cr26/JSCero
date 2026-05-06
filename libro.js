// Crear objeto libro
let libro = {
  titulo: "Cien años de soledad",
  autor: "Gabriel García Marquez",
  anio: 1967,
  estado: "disponible", 

  // Metodo para describir el libro
  describirLibro: function () {
    console.log(`Libro titulado "${this.titulo}", escrito por ${this.autor} en el año ${this.anio}, el estado es: ${this.estado}.`);
  }
};

// Probar el metodo
libro.describirLibro();