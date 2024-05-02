const staty = document.getElementById('staty');

fetch('https://restcountries.com/v3.1/region/europe')
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        data.forEach(stat => {
            let blockCountry =
            `<div class="col-xl-3 col-lg-4 col-md-6 col-sm-12 mb-4">
                <div class="card h-100">
                    <a href="${stat.maps.googleMaps}" target="_blank">
                        <img src="${stat.flags.png}" class="card-img-top" alt="${stat.name.official}">
                    </a>
                    <div class="card-body">
                        <h5 class="card-title fw-bold text-center mb-3">${stat.translations.ces.common}</h5>
                        <p class="card-text">Population: ${stat.population}</p>
                        <p class="card-text">Area: ${stat.area} km<sup>2</sup></p>
                    </div>
                </div>
            </div>`;
            staty.innerHTML += blockCountry;
        });
    });
