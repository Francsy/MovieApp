# MovieApp - FS MOVIES+

Authors
[César Alba](https://github.com/Cesario87),
[Fran V. Hernández](https://github.com/Francsy),
[Rubén Zafra](https://github.com/ZeberMVP)

Technologies & techniques
- JavaScript ES6+
- Node.js with Express (API REST)
- MVC
- Mongo DB
- PostgreSQL
- ODM: Mongoose
- SSR with Pug
- SCRUM Team Methodology
- JWT Authentication
- OAuth 2.0 Google with Passport
- Web Scraping with Puppeteer
- Unit testing with JEST
- Test E2E Cypress
- Mobile first
- Deploy: Vercel - ONGOING



## Routes
### / 
Login with email and password. Options to login with Google, recover password and sign up <br> 
### /signup
Sign up with email and password written twice. You must choose a role: admin or user. Users can search movies and add them to favourites. Admins can create, edit and remove movies <br> 
### /u/search
User's browser of movies. The browser searchs first in the [api](https://www.omdbapi.com/) of movies. If no movies where found, it searchs in our Mongo database, with all the movies admins have created. There is a nav bar for navigating to some routes of the app <br> <br>
/u/search/:id: Gives a full view of a movie: Title, Poster, imdbRating, Year, Plot, Actors, Writers, Director, Genres and (only movies from the api) reviews taken through web scraping from [FilmAffinity](https://www.filmaffinity.com/us/main.html) and [Rotten Tomatoes](https://www.rottentomatoes.com/). The user can add the movie to his favourites list <br> 
### /u/movies
Lists the user's favourite movies <br> 
### /u/restorepassword
The user can simply change his password <br> 
### /u/about
Short about page <br> 
### /logout
Logs out the user and takes him to the login page <br> 
### /admin
Shows all the admin created movies. Admins can enter the edit movies page and remove them from here. It has a nav bar with the create movie route and logout <br>
### /admin/createmovie
Create movie page <br> 
### /admin/editmovie
Edit movie page <br> <br>
