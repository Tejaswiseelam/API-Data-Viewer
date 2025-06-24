const container = document.getElementById('dog-container');
const button = document.getElementById('load-btn');
const filterInput = document.getElementById('breed-filter');

async function loadDogs() {
  container.innerHTML = '';
  const res = await fetch('https://dog.ceo/api/breeds/image/random/5');
  const data = await res.json();
  displayDogs(data.message);
}

function displayDogs(images) {
  images.forEach(imgUrl => {
    const breed = imgUrl.split("/")[4]; // extract breed from URL
    const card = document.createElement('div');
    card.className = 'dog-card';
    card.innerHTML = `
      <img src="${imgUrl}" alt="dog" />
      <p>${breed}</p>
    `;
    container.appendChild(card);
  });
}

filterInput.addEventListener('input', () => {
  const term = filterInput.value.toLowerCase();
  const cards = document.querySelectorAll('.dog-card');
  cards.forEach(card => {
    const breed = card.querySelector('p').textContent.toLowerCase();
    card.style.display = breed.includes(term) ? 'block' : 'none';
  });
});

button.addEventListener('click', loadDogs);

// Load initial dogs
loadDogs();
