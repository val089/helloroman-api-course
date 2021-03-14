const API_URL = 'https://api.punkapi.com/v2/beers'; //stałe zapisuje wielkimi literami
const container = document.querySelector('.container');

//----------------------------------
// 2) metoda z wykorzystaniem fetch|
//----------------------------------

const render = (data) => {
	if (!data.length) return;
	const fragment = document.createDocumentFragment(); //zamiast dodawać od razu "beers", wydajniej będzie dodac piwka po iteracji, czyli dodać je do fragmentu, a potem fragment wrzucić do dokumentu -> KURS API 02 -> 19min30s i 26min30s

	data.forEach(({ name, tagline, description, image_url: imageURL }) => {
		// (beer) -> destrukturyzacja ({ name, tagline, description, image_url: imageURL }) -> image_url zmieniamy na ładniejszy zapis imageURL
		const div = document.createElement('div');
		div.classList.add('beer');
		div.innerHTML = `
            <div class="beer--content">
                <h1 class="beer--title">${name}</h1>
                <p class="beer--tagline">${tagline}</p>
                <p class="beer--description">${description}</p>
            </div>
            <img class="beer--image" src="${imageURL}">
        `;

		fragment.appendChild(div);
	});

	container.appendChild(fragment);
};

const success = (response) => response.json();

const error = (err) => {
	console.log(err);
};

//
// fetch(API_URL)
// 	.then(success) //json() metoda asynchroniczna
// 	.then(render)
// 	.catch(error);

//inny sposób na rozwiązywanie promisów
const getBeers = async () => {
	const response = await fetch(API_URL);
	const data = await response.json();
	render(data);
};

getBeers();
