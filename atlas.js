// Získání reference na elementy z HTMLL
const staty = document.getElementById('staty'); // Div, kam se budou vkládat informace o státech
const selContinent = document.getElementById('selContinent'); // Select pro výběr kontinentu
let kontinent = 'europe'; // Inicializace proměnné kontinent na výchozí hodnotu 'europe'
let activeModal = null; // Proměnná pro uchování reference na aktuální otevřené modální okno

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
                let countryCard = `
                    <div class="col-xl-2 col-lg-2 col-md-4 col-sm-6">      
                        <div class="card h-100">     
                            <a href="#" data-bs-toggle="modal" data-bs-target="#${stat.cca2}Modal">    
                            <img class="card-img-top p-3" src="${stat.flags.png}" alt="${stat.flags.alt}">
                            <div class="card-body">
                                <h4 class="card-title">${stat.translations.ces.common}</h4>
                                </a>
                                <p class="card-text">
                                    Počet obyvatel: ${stat.population}<br>
                                    Rozloha: ${stat.area} km<sup>2</sup>
                                </p>
                                <a href="#" class="show-details-link" data-bs-toggle="modal" data-bs-target="#${stat.cca2}Modal">Show Details</a>
                            </div>
                        </div>
                    </div>`;
                let currencyNames = stat.currencies ? Object.values(stat.currencies).map(c => c.name).join(', ') : 'No currency data';
                let currencySymbols = stat.currencies ? Object.values(stat.currencies).map(c => c.symbol).join(', ') : '';
                let coatOfArms = stat.coatOfArms.png ? stat.coatOfArms.png : "";
                let modal = `
                    <div class="modal fade" id="${stat.cca2}Modal" tabindex="-1" role="dialog" aria-labelledby="${stat.cca2}ModalTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">${stat.translations.ces.common}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="rowObrazky">
                                <img class="card-img-top p-3" src="${stat.flags.png}" alt="${stat.flags.alt}">
                                <img class="card-img-top p-3" src="${coatOfArms}">
                            </div>
                            <p><b>Oficiální název:</b> ${stat.translations.ces.official}</p>
                            <p><b>Počet obyvatel:</b> ${stat.population}</p>
                            <p><b>Rozloha:</b> ${stat.area} km<sup>2</sup></p>
                            <p><b>Hlavní město:</b> ${stat.capital}</p>
                            <p><b>Měna:</b> ${currencyNames} (${currencySymbols})</p>
                            <p><a href="${stat.maps.googleMaps}" target="_blank">Zobrazit na mapě</a></p>
                        </div>
                        </div>
                    </div>
                    </div>
                    `;
                staty.innerHTML += countryCard + modal;
            });

            // Inicializujeme modální dialogy
            var modals = document.querySelectorAll('.modal');
            modals.forEach(modal => {
                new bootstrap.Modal(modal);
            });
        });
}

// Funkce pro zobrazení detailů státu v modálním okně
function showModalDetails(stat) {
    // Zavřít aktuální otevřené modální okno, pokud existuje
    if (activeModal) {
        activeModal.hide();
        activeModal = null;
    }

    // Vytvoření HTML obsahu pro modální okno s detaily státu
    let currencyNames = stat.currencies ? Object.values(stat.currencies).map(c => c.name).join(', ') : 'No currency data';
    let currencySymbols = stat.currencies ? Object.values(stat.currencies).map(c => c.symbol).join(', ') : '';
    let coatOfArms = stat.coatOfArms.png ? stat.coatOfArms.png : "";
    let modalContent = `
        <div class="modal fade" id="${stat.cca2}Modal" tabindex="-1" role="dialog" aria-labelledby="${stat.cca2}ModalTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">${stat.translations.ces.common}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="rowObrazky">
                    <img class="card-img-top p-3" src="${stat.flags.png}" alt="${stat.flags.alt}">
                    <img class="card-img-top p-3" src="${coatOfArms}">
                </div>
                <p><b>Oficiální název:</b> ${stat.translations.ces.official}</p>
                <p><b>Počet obyvatel:</b> ${stat.population}</p>
                <p><b>Rozloha:</b> ${stat.area} km<sup>2</sup></p>
                <p><b>Hlavní město:</b> ${stat.capital}</p>
                <p><b>Měna:</b> ${currencyNames} (${currencySymbols})</p>
                <p><a href="${stat.maps.googleMaps}" target="_blank">Zobrazit na mapě</a></p>
            </div>
            </div>
        </div>
        </div>
    `;

    // Vložení obsahu modálního okna do těla dokumentu a inicializace modálního okna
    document.body.insertAdjacentHTML('beforeend', modalContent);
    activeModal = new bootstrap.Modal(document.getElementById(`${stat.cca2}Modal`));
    activeModal.show();
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


 


