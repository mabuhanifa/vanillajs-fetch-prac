const category = document.getElementById("category");
const newsContainer = document.getElementById("news-container");
const ul_class = "navbar-nav me-auto mb-2 mb-lg-0";
const nc_class = "d-flex mt-5 shadow-lg s_n";
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
    newsContainer.innerHTML = '';
  const param = 0 + `${id}`;
  const url = `https://openapi.programming-hero.com/api/news/category/${param}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayNews(data));
}

function displayNews(data) {
  const news = data.data;
  news.forEach((n) => {
    const div = document.createElement("div");
    div.className = nc_class;
    const inner = `
    <div class="m-2">
          <img
            src="${n.image_url}"
            alt=""
            class="n_img"
          />
        </div>
        <div class="p-3">
          <h2>${n.title}</h2>
          <p class="mt-5">${n.details}</p>
          <div class="d-flex justify-content-between">
            <div class="d-flex author">
              <div>
                <img
                  src="${n.author.img}"
                  alt=""
                  class="a_img"
                />
              </div>
              <div class="author">
                <p>Author</p>
                <p><span>${n.author.published_date}</span></p>
              </div>
            </div>
            <div>${n.total_view}</div>
            <div>star</div>
            <div>-></div>
          </div>
        </div>
    `;
    div.innerHTML = inner;
    newsContainer.appendChild(div);
    console.log(n);
  });
  
}
