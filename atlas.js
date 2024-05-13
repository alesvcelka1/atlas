// Získání reference na elementy z HTML
const staty = document.getElementById('staty'); // Div, kam se budou vkládat informace o státech
const selContinent = document.getElementById('selContinent'); // Select pro výběr kontinentu

let kontinent = 'europe'; // Inicializace proměnné kontinent na výchozí hodnotu 'europe'

// Funkce pro načtení dat a zobrazení států
function fetchDataAndDisplay() {
    staty.innerHTML = ''; // Vymažeme obsah divu s id 'staty'

    // Fetch požadavek na API s informacemi o státech daného kontinentu
    fetch(`https://restcountries.com/v3.1/region/${kontinent}`)
        .then((response) => response.json()) // Zpracování odpovědi jako JSON
        .then((data) => {
            console.log(data); // Vypsání dat do konzole pro kontrolu

            // Pro každý stát v datech vytvoříme HTML kód pro karta státu a vložíme ho do divu
            data.forEach(stat => {
                let blockCountry =
                    `<div class="col-xl-3 col-lg-4 col-md-6 col-sm-12 mb-4">
                        <div class="card h-100">
                            <img src="${stat.flags.png}" class="card-img-top flag-image" alt="${stat.name.official}">
                            <div class="card-body">
                                <h5 class="card-title fw-bold text-center mb-3">${stat.translations.ces.common}</h5>
                                <p class="card-text">Population: ${stat.population}</p>
                                <p class="card-text">Area: ${stat.area} km<sup>2</sup></p>
                                <button class="btn btn-success show-details-btn custom-button" data-stat='${JSON.stringify(stat)}'>Show Details</button>
                                <div class="hidden-details" id="details-${stat.cca3}"></div>
                            </div>
                        </div>
                    </div>`;
                staty.innerHTML += blockCountry; // Přidání karty státu do divu
            });

            // Po vytvoření všech karet států přidej posluchač události pro každé tlačítko "Show Details"
            const showDetailsButtons = document.querySelectorAll('.show-details-btn');
            showDetailsButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const stat = JSON.parse(button.dataset.stat); // Získání dat o státu z atributu data-stat
                    showModalDetails(stat); // Zobrazení detailů státu v modálním okně
                });
            });
        });
}

// Funkce pro zobrazení detailů státu v modálním okně
function showModalDetails(stat) {
    // Vytvoření HTML obsahu pro modální okno s detaily státu
    const modalContent = `
        <div class="modal fade" id="statModal" tabindex="-1" aria-labelledby="statModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="statModalLabel">${stat.translations.ces.common}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <img src="${stat.flags.png}" class="flag-image" alt="${stat.name.official}">
                        <p>Common Name: ${stat.name.common}</p>
                        <p>Official Name: ${stat.name.official}</p>
                        <p>Population: ${stat.population}</p>
                        <p>Area: ${stat.area} km<sup>2</sup></p>
                        <p>Capital: ${stat.capital}</p>
                    </div>
                </div>
            </div>
        </div>`;

    // Vložení obsahu modálního okna do těla dokumentu
    document.body.insertAdjacentHTML('beforeend', modalContent);

    // Inicializace Bootstrap modálního okna
    var modal = new bootstrap.Modal(document.getElementById('statModal'));

    // Zobrazení modálního okna
    modal.show();
}

// Po načtení dokumentu spusť funkci pro načtení a zobrazení dat
document.addEventListener('DOMContentLoaded', function() {
    fetchDataAndDisplay();
});

// Přidání posluchače události pro změnu kontinentu v selectu
selContinent.addEventListener('change', function() {
    kontinent = selContinent.value; // Aktualizace proměnné kontinent
    fetchDataAndDisplay(); // Znovunačtení dat pro vybraný kontinent
});

// Přidání posluchače události pro změnu URL adresy
window.addEventListener('popstate', function() {
    fetchDataAndDisplay(); // Znovunačtení dat při změně URL adresy
});  


