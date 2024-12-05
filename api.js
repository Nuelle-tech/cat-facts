const fetchBtn = document.getElementById("fetch-btn");
const factContainer = document.getElementById("fact-container");
const loadingText = document.getElementById("loading");


const getFacts = () => {
    return new Promise((resolve, reject) => {
        const req = new XMLHttpRequest();
    req.open("GET","https://catfact.ninja/facts?limit=15&max_length=60")
    req.responseType = "json";
    req.onload = () =>resolve(req.response);
    req.oneerror = ()=> reject(req.statusText)
    req.send()
});
}
const displayFacts = (facts) => {
    factContainer.innerHTML = '';
facts.forEach(fact => {
    const factCard = document.createElement("div");
    factCard.classList.add("fact-card");
    factCard.textContent = fact.fact;
    factContainer.appendChild(factCard);
  });
};

fetchBtn.addEventListener("click", () => {
    loadingText.classList.remove("hidden");
getFacts()
.then(result => {
    loadingText.classList.add("hidden");
    displayFacts(result.data);
  })
  .catch(error => {
    loadingText.classList.add("hidden");
    console.error('Error fetching cat facts:', error);
  });
});