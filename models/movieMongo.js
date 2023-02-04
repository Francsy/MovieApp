const mongoose = require('mongoose');
const autoIncrement = require('mongoose-sequence')(mongoose);
require('../utils/db_mongo')

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
    movieId: { type: Number, required: false }
});

movieSchema.plugin(autoIncrement, {inc_field: 'movieId'});
const Movie = mongoose.model('editedMovies', movieSchema);

module.exports = Movie;

/*
const newMovie = new Movie({
    "Title": "Indiana Jones and the Raiders of the Lost Ark",
    "Year": "1981",
    "Runtime": "115 min",
    "Genre": "Action, Adventure",
    "Director": "Steven Spielberg",
    "Writer": "Lawrence Kasdan, George Lucas, Philip Kaufman",
    "Actors": "Harrison Ford, Karen Allen, Paul Freeman",
    "Plot": "The year is 1936. An archeology professor named Indiana Jones is venturing in the jungles of South America searching for a golden statue. Unfortunately, he sets off a deadly trap but miraculously escapes. Then, Jones hears from a museum curator named Marcus Brody about a biblical artifact called The Ark of the Covenant, which can hold the key to human existence. Jones has to venture to vast places such as Nepal and Egypt to find this artifact. However, he will have to fight his enemy Rene Belloq and a band of Nazis in order to reach it.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BNTU2ODkyY2MtMjU1NC00NjE1LWEzYjgtMWQ3MzRhMTE0NDc0XkEyXkFqcGdeQXVyMjM4MzQ4OTQ@._V1_SX300.jpg",
    "imdbRating": "8.4"
});

{
    "Title": "Family Guy",
    "Year": "2023",
    "Runtime": "118 min",
    "Genre": "Comedy, Adventure",
    "Director": "Seth MacFarlane",
    "Writer": "Daniel Palladino, Seth MacFarlane, Lolee Aries",
    "Actors": "Seth MacFarlane, Mila Kunis, Alex Borstein",
    "Plot": "The show centers around the adventures and activities of the dysfunctional Griffin family, consisting of father Peter Griffin, a bumbling and clumsy yet well-intentioned blue-collar worker; Lois, a stay-at-home mother and piano teacher (in early episodes) who is a member of the affluent Pewterschmidt family; Meg, their often bullied teenage daughter who is also constantly ridiculed or ignored by the family; Chris, their awkward teenage son, who is overweight, unintelligent, unathletic and, in many respects, is simply a younger version of his father; and Stewie, their diabolical infant son of ambiguous sexual orientation who is an adult-mannered evil genius and uses stereotypical archvillain phrases. Living with the family is their witty, smoking, martini-swilling, sarcastic, English-speaking anthropomorphic dog Brian, though he is still considered a pet in many ways.",
    "Poster": "https://pbs.twimg.com/media/FjvC-g3X0AEVzzH?format=jpg&name=medium",
    "imdbRating": "9.2"
}

newMovie.save((error) => {
    if (error) {
        console.log(error);
    } else {
        console.log('Documento añadido a la colección editedMovies.');
    }
});
*/
