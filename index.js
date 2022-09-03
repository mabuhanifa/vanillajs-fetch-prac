const category = document.getElementById("category");
const newsContainer = document.getElementById("news-container");
const ul_class = "navbar-nav me-auto mb-2 mb-lg-0";
window.addEventListener("load", (event) => {
  const url = "https://openapi.programming-hero.com/api/news/categories";
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayCategory(data));
});

function displayCategory(data) {
  const categories = data.data.news_category;
  categories.forEach((cat) => {
    const ul = document.createElement("ul");
    ul.className = ul_class;
    const li = `<li class="nav-item">
                <a class="nav-link" aria-current="page" href="#" onclick=loadNews(${cat.category_id})> ${cat.category_name}</a>
                </li>`;
    ul.innerHTML = li;
    category.appendChild(ul);
  });
}

function loadNews(id) {
  const param = 0 + `${id}`;
  const url = `https://openapi.programming-hero.com/api/news/category/${param}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => console.log(data));
}
