var countries

var app = function () {
    var url = "https://restcountries.eu/rest/v2"
    makeRequest(url, requestComplete)
    var select = document.querySelector('#country-dropdown')
    select.onchange = countryDisplay;
}

// inside requestComplete, this will be the *request*
var requestComplete = function () {
    if (this.status !== 200) return
    var jsonString = this.responseText
    countries = JSON.parse(jsonString)
    populateList(countries)
}

var populateList = function (countries) {
    var select = document.querySelector("#country-dropdown")
    countries.forEach(function (country) {  // make an <li> with the name of each country
        var option = document.createElement("option")
        option.innerText = country.name
        select.appendChild(option)
    })
}

// makeRequest takes a URL to GET, and a callback to run when it's done
var makeRequest = function (url, callback) {
    var request = new XMLHttpRequest()
    request.open("GET", url)
    request.onload = callback
    request.send()           
}

var saveCountry = function (country) {
    var jsonString = JSON.stringify(country)
    localStorage.setItem("lastCountry", jsonString)
}

//countryDisplay displays the country selected in the drop-down menu
var countryDisplay = function(){
    var selectedCountry = countries.find(function(country){
        return country.name === this.value;
    }.bind(this))

    saveCountry(selectedCountry)
    
    var name = document.createElement('p')
    name.innerText = "Name: " + selectedCountry.name

    var population = document.createElement('p')
    population.innerText = "Population: " + selectedCountry.population

    var capital = document.createElement('p')
    capital.innerText = "Capital: " + selectedCountry.capital

    var flag = document.createElement('img')
    flag.src = selectedCountry.flag
    flag.width = 500

    var br = document.createElement('br')

    var div = document.querySelector('#country-result')

    div.appendChild(flag)
    div.appendChild(br)
    div.appendChild(name)
    div.appendChild(population)
    div.appendChild(capital)
}

window.onload = app; // app() is run when window loaded