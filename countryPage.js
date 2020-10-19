let thisCountryData;
let countryDataArray;

const countryInfo = document.querySelector('.country-info');
const countryFlag = document.querySelector('.country-info__flag');
const countryInfoData = document.querySelector('.country-info__data');
const backButton = document.querySelector('.button-back')

const getCountryData = async() => {
    thisCountryData = JSON.parse(localStorage.getItem('countryStorage'));
    //console.log(thisCountryData)

    countryDataArray = JSON.parse(localStorage.getItem('countryDataArray'));
    //console.log(countryDataArray)

}

const getBorderCountries = () => {

    const borderCountryArray = thisCountryData.borders.map(countryCode => {
        let countryBorderMatch;
        countryBorderMatch = countryDataArray.filter(country => countryCode === country.alpha3Code ? country.name : '').map(country => {
            return country.name
        })
        //console.log(countryBorderMatch)
        return countryBorderMatch[0]
    })
    //console.log(borderCountryArray)
    return borderCountryArray;
}

const insertHTML = () => {

    countryFlag.innerHTML = `
        <img src="${thisCountryData.flag}" alt="">
    `;


    const thisCountryLanguage = thisCountryData.languages.map(language => {
        return language.name
    });

    let languageList = thisCountryLanguage.join(', ');

    const countryPop = new Intl.NumberFormat().format(thisCountryData.population);

    countryInfoData.innerHTML = `
                <h1 class="country-name">${thisCountryData.name}</h1>
                <div class="data-section">
                    <div class="data-section-1">
                        <p>Native Name: <span class="native-name">${thisCountryData.nativeName}</span></p>
                        <p>Population: <span class="population">${countryPop}</span></p>
                        <p>Region: <span class="region">${thisCountryData.region}</span></p>
                        <p>Sub Region: <span class="sub-region">${thisCountryData.subregion}</span></p>
                        <p>Capital: <span class="capital">${thisCountryData.capital}</span></p>
                    </div>
                    <div class="data-section-2">
                        <p>Top Level Domain: <span class="domain">${thisCountryData.topLevelDomain}</span></p>
                        <p>Currencies: <span class="currencies">${thisCountryData.currencies[0].name}</span></p>
                        <p>Languages: <span class="languages">${languageList}</span></p>
                    </div>
                </div>
    `;

    const borderCountries = getBorderCountries();
    //console.log(borderCountries)

    borderCountriesHTML = `
                <div class="border-countries">
                    <p>Border Countries: 
                        <span class="border-countries-list">
                            
                        </span>
                    </p>
                </div>
    `

    countryInfoData.insertAdjacentHTML('beforeend', borderCountriesHTML)

    borderCountries.forEach(country => {
        //console.log(countryInfoData.children[2].children[0].children[0])
        countryInfoData.children[2].children[0].children[0].insertAdjacentHTML('beforeend', `<a href="./country-info.html" class='button-border'>${country}<a/>`)
    })
}

const handleCountryClick = (e) => {
   e.preventDefault();

    countryInfoData.parentElement.classList.add('transition')

    const borderCountry = e.target.innerText;
    countryDataArray.forEach(country => {
        if(country.name === borderCountry) {
            localStorage.setItem('countryStorage', JSON.stringify(country));
        }
    });

    countryInfo.classList.add('page-transition-away');

    setTimeout(() => {
        window.location = './country-info.html';
    }, 1000)
};

getCountryData();

insertHTML();

countryInfo.classList.remove('page-transition-away');

countryInfoData.children[2].children[0].children[0].addEventListener('click', handleCountryClick)
backButton.addEventListener('click', () => {
    countryInfo.classList.add('page-transition-away');
    setTimeout(() => {
        window.location = './index.html';
    }, 500)
})