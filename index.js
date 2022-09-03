const category = document.getElementById("category");
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
    const li = `<li class="nav-item">
                <a class="nav-link" aria-current="page" href="#">${cat.category_name}</a>
                </li>`;
    ul.innerHTML = li;
    console.log(cat);
  });
  console.log(categories);
}
