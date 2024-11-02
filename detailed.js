function displayCountryDetails(country) {
    const countryDetailsContainer = document.getElementById("country-details");
    countryDetailsContainer.innerHTML = ""; // Clear previous content

    if (!country) {
        countryDetailsContainer.innerHTML = "<p>No country data available.</p>";
        return;
    }

    const countryName = document.createElement("h2");
    countryName.textContent = country.name.common;

    const flag = document.createElement("img");
    flag.src = country.flags.png;
    flag.alt = `${country.name.common} flag`;
    flag.style.width = "150px";
    flag.style.objectFit = "cover"; // Fit the flag image

    const region = document.createElement("p");
    region.textContent = `Region: ${country.region}`;

    const population = document.createElement("p");
    population.textContent = `Population: ${country.population.toLocaleString()}`;

    const capital = document.createElement("p");
    capital.textContent = `Capital: ${country.capital ? country.capital[0] : "N/A"}`;

    countryDetailsContainer.appendChild(flag);
    countryDetailsContainer.appendChild(countryName);
    countryDetailsContainer.appendChild(region);
    countryDetailsContainer.appendChild(population);
    countryDetailsContainer.appendChild(capital);
}

// Back button event listener
document.getElementById("back-button").addEventListener("click", () => {
    window.history.back();
});

// Load country data when the DOM is ready
document.addEventListener("DOMContentLoaded", () => {
    const countryData = JSON.parse(localStorage.getItem("selectedCountry"));
    if (countryData) {
        displayCountryDetails(countryData);
    } else {
        console.error("No country data found in localStorage.");
        const countryDetailsContainer = document.getElementById("country-details");
        countryDetailsContainer.innerHTML = "<p>No country data found.</p>";
    }
});
