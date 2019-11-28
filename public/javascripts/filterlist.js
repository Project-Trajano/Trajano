let genre;
let list;

function filterByGenre(genre) {
  document.getElementById("books-list").innerHTML = "";

  list
    .filter(book => book.genre === genre)
    .forEach(book => {
      document.getElementById(
        "books-list"
      ).innerHTML += `<p><h4>${book.title}</h4> Autor: ${book.author} | Género: ${book.genre}</p>`;
    });
}

axios.get("http://localhost:3000/getList").then(data => {
  list = data.data;
  // 1. con el list.map() obvio todos los datos de list con todos los datos de libros EXCEPTO el genero que es sobre lo que pretendo iterar para obtener los diferentes nombres de generos
  // 2. set in javascript es como un array pero impide elementos repetidos
  // 3. spread operator en un Set convierte el Set a un Array
  // 4. recuerda que Set no tiene metodos como filter o map que son de Arrays y por eso uso el spread
  // 5. despues de convertir el Set en un array ordenamos alfabeticamente los generos que es lo que estamos tratando de extraer SIN repeticiones
  // porque si no lo convirtieramos con spread operator Set -> Array no tendrias posibilidad de hacer filter o ningun otro metodo de arrays
  // 6. evitamos con el filter que el genero undefined te aparezca entre tus posibles canditatos (esto es un error de la API de google)
  let differentGenres = [...new Set(list.map(book => book.genre))]
    .sort((a, b) => (a > b ? 1 : -1))
    .filter(genre => genre !== "undefined");
  let arr;

  differentGenres.forEach(function(genre, idx) {
    document.getElementById(
      "genres-list"
    ).innerHTML += ` <button onclick="filterByGenre('${genre}')">${genre}</button>`;
  });
});
