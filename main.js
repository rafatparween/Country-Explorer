// const countryList = document.getElementById("country-list");
// const searchInput = document.getElementById("search");
// const regionFilter = document.getElementById("region-filter");
// const loadMoreButton = document.getElementById("load-more");

// let countries = [];
// let filteredCountries = [];
// let displayedCountries = 0;
// const countriesPerPage = 9; // Show three in a row

// async function fetchCountries() {
//     try {
//         const response = await fetch("https://restcountries.com/v3.1/all");
//         countries = await response.json();
//         filteredCountries = countries;
//         displayCountries();
//     } catch (error) {
//         console.error("Error fetching countries:", error);
//     }
// }

// function displayCountries() {
//     const countriesToDisplay = filteredCountries.slice(displayedCountries, displayedCountries + countriesPerPage);
//     countriesToDisplay.forEach(country => {
//         const countryCard = document.createElement("div");
//         countryCard.className = "card-country";
//         countryCard.innerHTML = `
//             <img src="${country.flags.png}" alt="${country.name.common} flag" />
//             <h2>${country.name.common}</h2>
//             <p>Population: ${country.population.toLocaleString()}</p>
//             <p>Region: ${country.region}</p>
//             <button onclick="viewCountryDetails('${country.name.common}')">View Details</button>
//         `;
//         countryList.appendChild(countryCard);
//     });
//     displayedCountries += countriesToDisplay.length;
// }

// function filterCountries() {
//     const searchValue = searchInput.value.toLowerCase();
//     const selectedRegion = regionFilter.value;

//     filteredCountries = countries.filter(country => {
//         const matchesSearch = country.name.common.toLowerCase().includes(searchValue);
//         const matchesRegion = selectedRegion === "all" || country.region === selectedRegion;
//         return matchesSearch && matchesRegion;
//     });

//     displayedCountries = 0;
//     countryList.innerHTML = "";
//     displayCountries();
// }

// function viewCountryDetails(countryName) {
//     const country = countries.find(c => c.name.common === countryName);
//     localStorage.setItem("selectedCountry", JSON.stringify(country));
//     window.location.href = "detailed.html"; // Ensure this matches the actual filename
// }

// searchInput.addEventListener("input", filterCountries);
// regionFilter.addEventListener("change", filterCountries);
// loadMoreButton.addEventListener("click", displayCountries);

// fetchCountries();



const countryList = document.getElementById("country-list");
const searchInput = document.getElementById("search");
const regionFilter = document.getElementById("region-filter");
const loadMoreButton = document.getElementById("load-more");

let countries = [];
let filteredCountries = [];
let displayedCountries = 0;
const countriesPerPage = 9; // Show three in a row
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

async function fetchCountries() {
    try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        countries = await response.json();
        filteredCountries = countries;
        displayCountries();
    } catch (error) {
        console.error("Error fetching countries:", error);
    }
}

function displayCountries() {
    const countriesToDisplay = filteredCountries.slice(displayedCountries, displayedCountries + countriesPerPage);
    countryList.innerHTML = ""; // Clear previous entries to avoid duplication
    countriesToDisplay.forEach(country => {
        const countryCard = document.createElement("div");
        countryCard.className = "card-country";
        countryCard.innerHTML = `
            <img src="${country.flags.png}" alt="${country.name.common} flag" />
            <h2>${country.name.common}</h2>
            <p>Population: ${country.population.toLocaleString()}</p>
            <p>Region: ${country.region}</p>
            <button onclick="viewCountryDetails('${country.name.common}')">View Details</button>
            <button onclick="toggleFavorite('${country.name.common}')" class="favorite-btn">${isFavorite(country.name.common) ? "Remove from Favorites" : "Add to Favorites"}</button>
        `;
        countryList.appendChild(countryCard);
    });
    displayedCountries += countriesToDisplay.length;
}

function toggleFavorite(countryName) {
    const country = countries.find(c => c.name.common === countryName);
    if (isFavorite(countryName)) {
        // Remove from favorites
        favorites = favorites.filter(fav => fav.name.common !== countryName);
    } else {
        // Add to favorites
        favorites.push(country);
    }
    localStorage.setItem("favorites", JSON.stringify(favorites));
    displayCountries(); // Refresh the displayed countries to reflect changes
}

function isFavorite(countryName) {
    return favorites.some(fav => fav.name.common === countryName);
}

function filterCountries() {
    const searchValue = searchInput.value.toLowerCase();
    const selectedRegion = regionFilter.value;

    filteredCountries = countries.filter(country => {
        const matchesSearch = country.name.common.toLowerCase().includes(searchValue);
        const matchesRegion = selectedRegion === "all" || country.region === selectedRegion;
        return matchesSearch && matchesRegion;
    });

    displayedCountries = 0;
    displayCountries(); // Refresh displayed countries
}

function viewCountryDetails(countryName) {
    const country = countries.find(c => c.name.common === countryName);
    localStorage.setItem("selectedCountry", JSON.stringify(country));
    window.location.href = "detailed.html"; // Ensure this matches the actual filename
}

searchInput.addEventListener("input", filterCountries);
regionFilter.addEventListener("change", filterCountries);
loadMoreButton.addEventListener("click", displayCountries);

fetchCountries();

