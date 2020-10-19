//element selectors
const countriesList = document.querySelector('.countries-list');
const inputCountryField = document.querySelector('.input-country-field');
const inputRegionSelect = document.querySelector('.region-select');
const countriesSection = document.querySelector('.countries-list');

let countryDataArray;

//functions
const countryPromise = async() => {
    await getCountryData();
}

const getCountryData = async() => {
    const countryResponse = await fetch(`https://restcountries.eu/rest/v2/all`);
    countryDataArray = await countryResponse.json();
    createCountryCards(countryDataArray);
}

const createCountryCards = (countryData) => {

    countriesList.innerHTML = ``;
    countryData.forEach(country => {
        let countryNameArray = country.name.split(' ');
        const countryNameArrayFixed = countryNameArray.map(word => {
            const charArray = word.split('');
            charArray.forEach(char => {
                if(charArray[0] === '(') {
                    charArray[1] = charArray[1].toUpperCase();
                } else {
                    charArray[0] = charArray[0].toUpperCase();
                }
            })
            const charJoin = charArray.join('');
            return charJoin;
        });
        country.name = countryNameArrayFixed.join(' ');

        const countryPop = new Intl.NumberFormat().format(country.population);

        const countryDataCard = `
            <li class="country-card">
                <a class="country-card-area" href="./country-info.html">
                    <img class="country-card-flag" src="${country.flag}" alt="">
                    <div class="country-card-brief">
                        <h2 class="country-name">${country.name}</h2>
                        <p class="country-pop">Population: <span>${countryPop}</span></p>
                        <p class="country-region">Region: <span>${country.region}</span></p>
                        <p class="country-cap">Capital: <span>${country.capital}</span></p>
                    </div>
                </a>
            </li>
        `;
        countriesList.insertAdjacentHTML('beforeend', countryDataCard);
    })
}

countryPromise();

setTimeout(() => {
    countriesSection.parentElement.classList.remove('page-transition-away');
}, 1000);

const handleCountrySearch = (e) => {
    const searchQuery = e.target.value;
    countryDataArray.forEach(country => {
        country.name = country['name'].toLowerCase();
    });
    const countryDataFiltered = countryDataArray.filter(country => {
        return country['name'].includes(searchQuery);
    });
    createCountryCards(countryDataFiltered);
}

const handleRegionSelect = (e) => {
    const countryRegionFiltered = countryDataArray.filter(country => {
        return country.region === e.target.value;
    });
    createCountryCards(countryRegionFiltered);
}

const handleCountryClick = (e) => {
    //e.preventDefault()
    const clickedEl = e.target.parentElement;

    if (clickedEl.matches('.country-card-area')) {
        console.log(clickedEl.children[1].children[0].textContent)
        const countryName = clickedEl.children[1].children[0].textContent;

        countryDataArray.forEach(country => {
            if(country.name === countryName) {
                console.log(country)
                localStorage.setItem('countryStorage', JSON.stringify(country));
                localStorage.setItem('countryDataArray', JSON.stringify(countryDataArray))
                console.log('done')
            }
        });
    } else if(clickedEl.matches('.country-card-brief')) {
        console.log(clickedEl.parentElement.children[1].children[0].innerText)
        countryDataArray.forEach(country => {
            if(country.name === clickedEl.parentElement.children[1].children[0].innerText) {
                console.log(country)
                localStorage.setItem('countryStorage', JSON.stringify(country));
                localStorage.setItem('countryDataArray', JSON.stringify(countryDataArray))
                console.log('done')
            }
        });
    } else if (clickedEl.matches('p')) {
        console.log(clickedEl.parentElement.children[0].innerText)
        countryDataArray.forEach(country => {
            if(country.name === clickedEl.parentElement.children[0].innerText) {
                console.log(country)
                localStorage.setItem('countryStorage', JSON.stringify(country));
                localStorage.setItem('countryDataArray', JSON.stringify(countryDataArray))
            }
        });
    } else if (e.target.matches('.country-card')) {
        countryDataArray.forEach(country => {
            if(country.name === e.target.children[0].children[1].children[0].innerText) {
                console.log(country)
                localStorage.setItem('countryStorage', JSON.stringify(country));
                localStorage.setItem('countryDataArray', JSON.stringify(countryDataArray))
            }
        });
    }

    countriesSection.parentElement.classList.add('page-transition-away');

    setTimeout(() => {
        const countryURL = countriesSection.children[0].children[0].getAttribute("href");
        window.location = countryURL;
    }, 1000)
}

//event listeners
inputCountryField.addEventListener('change', handleCountrySearch);
inputRegionSelect.addEventListener('change', handleRegionSelect);
countriesSection.addEventListener('click', handleCountryClick)
