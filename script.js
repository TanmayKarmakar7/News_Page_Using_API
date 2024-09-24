const API_KEY = "8daa963f095348c98b52ee6a8a7b728a";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("world"));

async function fetchNews(query){
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);
}

function bindData(articles){
    const cardsContainer = document.querySelector(".cards-container");
    const newsCardTemplate = document.querySelector(".template-news-card");

    cardsContainer.innerHTML ="";

    articles.forEach((article) => {
        if(!article.urlToImage) return;

        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    })
}

function fillDataInCard(cardClone, article){
    const newsImg = cardClone.querySelector(".news-img");
    const newsTitle = cardClone.querySelector(".news-title");
    const newsSource = cardClone.querySelector(".news-source");
    const newsDescription = cardClone.querySelector(".news-description");


    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = `${article.title.slice(0,60)}...`;
    newsDescription.innerHTML = `${article.description.slice(0,100)}...`;
    
    const date = new Date(article.publishedAt).toLocaleString("en-US", {timeZone: "Asia/Jakarta"});

    newsSource.innerHTML = `${article.source.name} - ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    })
}

let curSelectedNav = null;

function onNavItemClick(id){
    fetchNews(id);
    const navItems = document.getElementById(id); curSelectedNav?.classList.remove("active");
    curSelectedNav = navItems;
    curSelectedNav.classList.add("active");
}

const searchText = document.querySelector(".news-input");
const searchButton = document.querySelector(".search-button");

searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if(!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
})

