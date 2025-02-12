const APILINK = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=54d15a8315a3f8c321211c3db7478c2f&page=1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCHAPI = 'https://api.themoviedb.org/3/search/movie?api_key=54d15a8315a3f8c321211c3db7478c2f&query=';

const main = document.getElementById("section");
const form = document.getElementById("form");
const search = document.getElementById("query");

returnMovies(APILINK)

function returnMovies(URL) {
    fetch(URL).then(res => res.json())
        .then(function (data) {
            // Clear previous content
            main.innerHTML = '';

            // Create a row container
            const row = document.createElement('div');
            row.classList.add('row');
            main.appendChild(row);

            data.results.forEach(element => {
                const div_column = document.createElement('div');
                div_column.classList.add('column');

                const div_card = document.createElement('div');
                div_card.classList.add('card');

                const image = document.createElement('img');
                image.classList.add('thumbnail');
                image.src = IMG_PATH + element.poster_path;
                image.alt = element.title;  // Add alt text for accessibility

                const title = document.createElement('h3');
                title.textContent = element.title;

                div_card.appendChild(image);
                div_card.appendChild(title);
                div_column.appendChild(div_card);
                row.appendChild(div_column);  // Append to the row

            });
        });
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    main.innerHTML = '';  // Clear the content
    const searchTerm = search.value;

    if (searchTerm) {
        returnMovies(SEARCHAPI + searchTerm);
        search.value = "";
    } else {
        returnMovies(APILINK);
    }
});