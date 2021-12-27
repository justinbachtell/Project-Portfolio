/*
Author: Justin Bachtell
Files: index.html, styles.css, search.js, and app.js.
Description: A responsive UI-based application that displays
  data from https://jsonplaceholder.typicode.com/. The
  application displays posts from the API, and allows users
  to search/filter posts by author ID, or load additional posts.
*/

const btn = document.getElementById("btn").addEventListener("click", getPost); // call getPost function on button click
var i = 0; // counter variable
const div = document.getElementById("cards"); // html element to append posts

window.addEventListener("load", loadPost); // fetch 10 posts at page load

// fetch 10 additional posts when more button is clicked
function getPost() {
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then((res) => {
      return res.json();
    })
    .then((post) => {
      for (let index = 0; index < 10; index++) {
        div.innerHTML += `
      <div class="col" id="card-container">
        <div class="card">
          <div>
          <a href="#" id="thumbnail">
          <img src="./assets/pexels-pixabay-262508.jpg" class="d-sm-block"/>
          </a>
          <div>
            <h5 class="card-title">${post[i].title}</h5>
            <span class="badge">Author ID: ${post[i].userId}</span>
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
            <p class="card-text">${post[i].body}</p>
          </div>
        </div>
      </div>
      `;
        i = i + 1;
      }
    })
    // Log errors if encountered
    .catch((error) => {
      console.log(error);
    });
}

// fetch 10 posts
function loadPost() {
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then((res) => {
      return res.json();
    })
    .then((post) => {
      for (let index = 0; index < 10; index++) {
        div.innerHTML += `
      <div class="col" id="card-container">
        <div class="card">
          <div>
          <a href="#" id="thumbnail">
          <img src="./assets/pexels-pixabay-262508.jpg" class="d-sm-block"/>
          </a>
          <div>
            <h5 class="card-title">${post[i].title}</h5>
            <span class="badge">Author ID: ${post[i].userId}</span>
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
            <p class="card-text">${post[i].body}</p>
          </div>
        </div>
      </div>
      `;
        i = i + 1;
      }
    })
    // Log errors if encountered
    .catch((error) => {
      console.log(error);
    });
}
