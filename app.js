//api key
const apiKey = 'ad9b4f5b';

const searchInputBox = document.querySelector('#searchInput');
const movieContainer = document.querySelector('#movielist');
const searchButton = document.querySelector('button');



// function to get movies from api
async function getMoviesFromAPI(searchText) {
    const apiURL = `https://www.omdbapi.com/?s=${encodeURIComponent(searchText)}&apikey=${apiKey}`;

    try {
        const response = await fetch(apiURL);       // request to the API
        const movieData = await response.json();    // Convert to JSON format
        return movieData;                           // Return the data
    }
    catch (error) {
        console.error('API error:', error);         // Log error in console
        return {
            Response: 'False',
            Error: 'Network error.'
        };
    }
}



function makeMovieCard(movie) {
    let posterHTML = '';

    if (movie.Poster === 'N/A') {                              // N/A if poster not available
        posterHTML = '<div class="no-poster">N/A</div>';
    } else {
        posterHTML = `<img src="${movie.Poster}" alt="${movie.Title}" />`;     // movie poster
    }

// set IMDB link
    const imdbUrl = 'https://www.imdb.com/title/' + movie.imdbID;

    return `<a href="${imdbUrl}" target="_blank" class="movie">
        ${posterHTML}
        <h3>${movie.Title}</h3>
        <p>Year: ${movie.Year}</p>
        <p>IMDb ID: ${movie.imdbID}</p>
        </a>`;
}



// function for movie card on display

function showMoviesOnPage(moviesArray) {
    movieContainer.innerHTML = '';           // clear previous content

    // Loop through each movie in the array

    for (let i = 0; i < moviesArray.length; i++) {
        const movie = moviesArray[i];                       // Get the movie object
        const movieCardHTML = makeMovieCard(movie);         // Create movie card using the function
        movieContainer.innerHTML += movieCardHTML;          // Add movie card to the page
    }
}




// Function handling the search logic
async function handleMovieSearch() {
    const searchText = searchInputBox.value.trim();         // Get the search text
    movieContainer.innerHTML = '';                          // Clear previous results
  
    if (searchText === '') {
      alert('Please enter a movie title.');
      return;
    }

    // Fetch movies from the API
  const result = await getMoviesFromAPI(searchText);

  // Check if the API response was successful
  if (result.Response === 'True') {
    showMoviesOnPage(result.Search);                        // Show the movies on the page
}
 else {
    movieContainer.innerHTML = `<p>${result.Error || 'No movies found.'}</p>`;
 }
}    


//search button
searchButton.addEventListener('click', handleMovieSearch);

// enter key as a search button
searchInputBox.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        handleMovieSearch();
    }
});
