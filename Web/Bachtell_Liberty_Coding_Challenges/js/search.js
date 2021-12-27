/*
Author: Justin Bachtell
Files: index.html, styles.css, search.js, and app.js.
Description: A responsive UI-based application that displays
  data from https://jsonplaceholder.typicode.com/. The
  application displays posts from the API, and allows users
  to search/filter posts by author ID, or load additional posts.
*/

// assign elements to variables
const card = document.getElementById("cards");
const form = document.querySelector("#searchForm");

// form actions on submit to fetch userId from searchTerm
form.addEventListener("submit", async function (e) {
  e.preventDefault();
  document.getElementById("cards").innerHTML = ""; // reset existing card HTML
  const searchTerm = form.elements.query.value; // assign searchTerm value the search value
  const res = await axios.get(
    `https://jsonplaceholder.typicode.com/posts?userId=${searchTerm}`
  ); // fetch userId based on query value
  searchAuthor(res.data); // call function searchAuthor
  form.elements.query.value = ""; // reset search bar
});

// function to iterate through each fetched userId and create a card
function searchAuthor(posts) {
  for (let post of posts) {
    card.innerHTML += `
    <div class="col" id="card-container">
      <div class="card">
        <div>
        <a href="#" id="thumbnail">
        <img src="./assets/pexels-pixabay-262508.jpg" class="d-sm-block"/>
        </a>
        <div>
          <h5 class="card-title">${post.title}</h5>
          <span class="badge">Author ID: ${post.userId}</span>
          <a href="#" data-bs-toggle="tooltip" data-bs-placement="right" title="View blog post" id="tooltip">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              fill="currentColor"
              class="bi bi-plus-circle-fill"
              viewBox="0 0 16 16"
            >
              <path
                d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"
              />
            </svg>
          </a>
        </div>
        <div>
          <p class="card-text">${post.body}</p>
        </div>
      </div>
    </div>
    `;
    card.src = post.post; // source url for each post
    card.append(); // append function to add card to innerHTML after each iteration
  }
}
