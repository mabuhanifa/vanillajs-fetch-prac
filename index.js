const category = document.getElementById("category");
const newsContainer = document.getElementById("news-container");
const ul_class = "navbar-nav me-auto mb-2 mb-lg-0";
const nc_class = "d-flex mt-5 shadow-lg";
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
          <h2>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti
            veniam?
          </h2>
          <p class="mt-5">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sunt
            itaque reiciendis ipsum quibusdam magni, cum dolorem, sint quis,
            dolores corporis veritatis accusamus possimus iste nam?
          </p>
          <div class="d-flex justify-content-between">
            <div class="d-flex author">
              <div>
                <img
                  src="${n.image_url}"
                  alt=""
                  class="a_img"
                />
              </div>
              <div class="d-flex author">
                <p>Author</p>
                <p><span>Date & Time</span></p>
              </div>
            </div>
            <div>eye</div>
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
