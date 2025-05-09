const API_KEY = 'SUA_API_KEY_AQUI';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

const categorias = [
  { titulo: 'Populares', url: '/movie/popular' },
  { titulo: 'Em Cartaz', url: '/movie/now_playing' },
  { titulo: 'Ação', url: '/discover/movie?with_genres=28' },
  { titulo: 'Comédia', url: '/discover/movie?with_genres=35' },
  { titulo: 'Terror', url: '/discover/movie?with_genres=27' },
  { titulo: 'Romance', url: '/discover/movie?with_genres=10749' }
];

const container = document.getElementById('movie-container');

categorias.forEach((categoria, index) => {
  fetch(\`\${BASE_URL}\${categoria.url}&api_key=\${API_KEY}&language=pt-BR\`)
    .then(res => res.json())
    .then(data => {
      const carouselId = \`carousel-\${index}\`;
      const section = document.createElement('section');
      section.innerHTML = \`
        <h3 class="text-white my-4">\${categoria.titulo}</h3>
        <div id="\${carouselId}" class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-inner">
            \${chunkArray(data.results, 4).map((chunk, i) => \`
              <div class="carousel-item \${i === 0 ? 'active' : ''}">
                <div class="d-flex justify-content-center gap-3">
                  \${chunk.map(filme => \`
                    <div class="card bg-dark text-white" style="min-width: 200px;">
                      <img src="\${IMG_URL}\${filme.poster_path}" class="card-img-top" alt="\${filme.title}">
                      <div class="card-body">
                        <h6 class="card-title">\${filme.title}</h6>
                      </div>
                    </div>
                  \`).join('')}
                </div>
              </div>
            \`).join('')}
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#\${carouselId}" data-bs-slide="prev">
            <span class="carousel-control-prev-icon"></span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#\${carouselId}" data-bs-slide="next">
            <span class="carousel-control-next-icon"></span>
          </button>
        </div>
      \`;
      container.appendChild(section);
    })
    .catch(err => console.error('Erro:', err));
});

function chunkArray(arr, size) {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}
