//element selectors
const countriesList = document.querySelector('.countries-list');
const inputCountryField = document.querySelector('.input-country-field')

//state
// const countryDataArray = {
//     name: [],
//     flags: [],
// }

let countryDataArray;

//functions
const countryPromise = async() => {
    await getCountryData();
}

const getCountryData = async() => {
    const countryResponse = await fetch(`https://restcountries.eu/rest/v2/all`);
    countryDataArray = await countryResponse.json();
    createCountryCards(countryDataArray)
}

const createCountryCards = (countryData) => {
    countryData.forEach(country => {
        //countryDataArray.flags.push(country.flag);

        const countryDataCard = `
            <li class="country-card">
                <a class="country-card-area" href="./country-info.html">
                    <img class="country-card-flag" src="${country.flag}" alt="">
                    <div class="country-card-brief">
                        <h2 class="country-name">${country.name}</h2>
                        <p class="country-pop">Population: <span>${country.population}</span></p>
                        <p class="country-region">Region: <span>${country.region}</span></p>
                        <p class="country-cap">Capital: <span>${country.capital}</span></p>
                    </div>
                </a>
            </li>
        `;

        countriesList.insertAdjacentHTML('beforeend', countryDataCard)
    
    })
}

countryPromise()


const handleCountrySearch = (e) => {
    const searchQuery = e.target.value;

    const countryDataFiltered = countryDataArray.filter(country => country['name'].includes(searchQuery))
    countryDataArray.forEach(country => {
        console.log(country.name)
    })
    // console.log(searchQuery)
    console.log(countryDataFiltered)
}


//event listeners
inputCountryField.addEventListener('change', handleCountrySearch)

//console.log(countryDataArray.flags)