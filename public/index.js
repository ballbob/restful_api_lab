var app = function () {
    var url = "https://restcountries.eu/rest/v2"
    makeRequest(url, requestComplete)   // requestComplete is the callback we're sending to makeRequest
}

// inside requestComplete, this will be the *request*
var requestComplete = function () {
    if (this.status !== 200) return         // just get out of this function if request unsuccessful
    var jsonString = this.responseText      // responseText holds the actual data we get back (as JSON DOMString)
    var countries = JSON.parse(jsonString)  // now parse it to make it an Object (an array of countries)
    populateList(countries)                 // send off the data to a function which will populate the list
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
    var request = new XMLHttpRequest()      // create a new XMLHttpRequest object
    request.open("GET", url)                // .open it, specifying the type of request, and the URL
    request.onload = callback               // specify the callback to run when request complete
    request.send()                          // finally, send the request
}

window.onload = app; // app() is run when window loaded