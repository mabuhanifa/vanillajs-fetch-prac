const category = document.getElementById("category");
const newsContainer = document.getElementById("news-container");
const items = document.getElementById("items");
const modal = document.getElementById("modal");
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
  const param = 0 + `${id}`;
  const url = `https://openapi.programming-hero.com/api/news/category/${param}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayNews(data));
}

function displayNews(data) {
  newsContainer.innerHTML = "";
  modal.innerHTML = "";

  items.innerText = `${data.data.length} items found for this category `;

  const news = data.data;
  news.forEach((n) => {
    const div = document.createElement("div");
    const id = JSON.stringify(n._id);
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
          <p class="mt-3 details">${n.details}</p>
          <div class="d-flex justify-content-between align-items-center">
            <div class="d-flex align-items-center author">
              <div>
                <img
                  src="${n.author.img}"
                  alt=""
                  class="a_img"
                />
              </div>
              <div class="author">
                <p>${n.author.name}</p>
                <p><span>${
                  n.author.published_date
                    ? n.author.published_date
                    : "No Dates Available"
                }</span></p>
              </div>
            </div>
            <div><i class="fa-regular fa-eye"></i> ${n.total_view?n.total_view: "No Views Available"}</div>
            <div>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star-half-stroke"></i>
            </div>
            <div >
            <a class="icon-e" onclick=displayModal(${id})>
            <i class="fa-solid fa-arrow-right-long" ></i>
            </a>
            
            </div>
          </div>
        </div>
    `;
    div.innerHTML = inner;
    newsContainer.appendChild(div);
    console.log(id);
  });
}

function displayModal(id) {
  const url = `https://openapi.programming-hero.com/api/news/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showModal(data.data[0]));
}

function showModal(n) {
  console.log(n);
  newsContainer.innerHTML = "";
  items.innerText = "";
  const inner = `
    <div class="m-2">
          <img
            src="${n.image_url}"
            alt=""
            class="img-fluid"
          />
        </div>
        <div class="p-3">
          <h2>${n.title}</h2>
          <p class="mt-3">${n.details}</p>
          <div class="d-flex justify-content-between align-items-center">
            <div class="d-flex align-items-center author">
              <div>
                <img
                  src="${n.author.img}"
                  alt=""
                  class="af_img"
                />
              </div>
              <div >
                <p>${n.author.name}</p>
                <p><span>${
                  n.author.published_date
                    ? n.author.published_date
                    : "No Dates Available"
                }</span></p>
              </div>
            </div>
            <div><i class="fa-regular fa-eye"></i> ${n.total_view}</div>
            <div>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star-half-stroke"></i>
            </div>
          </div>
        </div>
    `;
  modal.innerHTML = inner;
}
