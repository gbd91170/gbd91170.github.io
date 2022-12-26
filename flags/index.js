// 1 - Tester le lien de l'API dans le navigateur (https://restcountries.com/v3.1/all)

// 2 - Créer une fonction pour "fetcher" les données, afficher les données dans la console.
let pays;
const countriesContainer = document.querySelector("#countries-container");
const inputSearch = document.getElementById("inputSearch");
const inputRange = document.getElementById("inputRange");
const rangeValue = document.getElementById("rangeValue");
let tri = 0;
const btnSort = document.querySelectorAll(".btnSort");
// il y a quatre tri possible
//tri = 0 ==> aucun tri
//tri=1 ==> population croissante
//tri=2 ==> population décroissanre
//tri = 3 ==> nom de pays rangé par ordre alphabetique

async function collectData() {
  await fetch("https://restcountries.com/v3.1/all")
    .then((data) => data.json())
    .then((res) => (pays = res));
}

function displayCountry(motClef, nb, tri) {
  countriesContainer.innerHTML = pays
    .filter((country) =>
      country.name.common.toLowerCase().includes(motClef.toLowerCase())
    )
    .sort((a, b) => {
      if (tri == 1) {
        return a.population - b.population;
      } else if (tri == 2) {
        return b.population - a.population;
      } else {
        if (a.name.common < b.name.common) {
          return -1;
        } else if (a.name.common > b.name.common) {
          return 1;
        } else {
          return 0;
        }
      }
    })
    .map((country) => {
      let pop = country.population
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
      return `
        <li class="card">
        
        <h2>${country.name.common}</h2>
        <img src="${country.flags.png}" alt="Flag of ${country.name.common}"/>
        <h3>${country.capital}</h3>
        <p>Population : ${pop}</p>
        </li>
    `;
    })
    .slice(0, nb)
    .join("");
}
const allData = collectData();
// setTimeout(() => console.log(pays), 1000);

inputSearch.addEventListener("input", (e) => {
  console.log(e.target.value);
  allData.then(() => displayCountry(e.target.value, inputRange.value, tri));
});
inputRange.addEventListener("change", (e) => {
  console.log(e.target.value);
  rangeValue.textContent = e.target.value;
  allData.then(() => displayCountry(inputSearch.value, e.target.value, tri));
});

// console.log(btnSort);
btnSort.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    tri = e.target.name;
    console.log(tri);
    displayCountry(inputSearch.value, inputRange.value, tri);
  });
});

// collectData();
// 3 - Passer les données à une variable

// 4 - Créer une fonction d'affichage, et paramétrer l'affichage des cartes de chaque pays grace à la méthode MAP

// 5 - Récupérer ce qui est tapé dans l'input et filtrer (avant le map) les données
// coutry.name.includes(inputSearch.value);

// 6 - Avec la méthode Slice gérer le nombre de pays affichés (inputRange.value)

// 7 - Gérer les 3 boutons pour trier (méthode sort()) les pays
