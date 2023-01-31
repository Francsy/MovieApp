const mongoose = require('mongoose');
const movieSchema = new mongoose.Schema({
    Title: { type: String, required: true },
    Year: { type: String, required: true },
    Runtime: { type: String, required: true },
    Genre: { type: String, required: true },
    Director: { type: String, required: true },
    Writer: { type: String, required: true },
    Actors: { type: String, required: true },
    Plot: { type: String, required: true },
    Poster: { type: String, required: true },
    imdbRating: { type: String, required: true },
});
const Movie = mongoose.model('editMovies', movieSchema);

module.exports = Movie;

/* Example
const newMovie = new Movie({
    Title: "Indiana Jones and the Raiders of the Lost Ark",
    Year: "1981",
    Runtime: "115 min",
    Genre: "Action, Adventure",
    Director: "Steven Spielberg",
    Writer: "Lawrence Kasdan, George Lucas, Philip Kaufman",
    Actors: "Harrison Ford, Karen Allen, Paul Freeman",
    Plot: "The year is 1936. An archeology professor named Indiana Jones is venturing in the jungles of South America searching for a golden statue. Unfortunately, he sets off a deadly trap but miraculously escapes. Then, Jones hears from a museum curator named Marcus Brody about a biblical artifact called The Ark of the Covenant, which can hold the key to human existence. Jones has to venture to vast places such as Nepal and Egypt to find this artifact. However, he will have to fight his enemy Rene Belloq and a band of Nazis in order to reach it.",
    Poster: "https://m.media-amazon.com/images/M/MV5BNTU2ODkyY2MtMjU1NC00NjE1LWEzYjgtMWQ3MzRhMTE0NDc0XkEyXkFqcGdeQXVyMjM4MzQ4OTQ@._V1_SX300.jpg",
    imdbRating: "8.4"
});

newMovie.save((error) => {
    if (error) {
        console.log(error);
    } else {
        console.log('Documento añadido a la colección movies.');
    }
});
*/
