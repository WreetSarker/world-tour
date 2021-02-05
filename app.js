function loadData() {
    fetch('https://restcountries.eu/rest/v2/all')
        .then(resp => resp.json())
        .then(data => {
            console.log(data[0]);
            displayData(data);
        });
}
loadData();

function displayData(data) {
    const countriesDiv = document.getElementById('countries');
    for (let i = 0; i < data.length; i++) {
        const countryDiv = document.createElement('div');
        countryDiv.className = 'country'
        const countryInfo = `
        <h3 class="country-name">${data[i].name}</h3>
        <p class="capital">${data[i].capital}</p>
        <img style="height:30px;width:60px;" src="${data[i].flag}" /><br>
        <button onClick = "displayDetails(\`${data[i].name}\`)">Details</button>
        `;
        countryDiv.innerHTML = countryInfo;
        countriesDiv.appendChild(countryDiv);
    }
}
const displayDetails = name => {
    const url = `https://restcountries.eu/rest/v2/name/${name}`
    fetch(url)
        .then(resp => resp.json())
        .then(data => showCountryInfo(data[0]))
};
function showCountryInfo(data) {
    document.getElementById('myDialog').innerText = ' Area: ' + data.area + '\n' + ' Population: ' + data.population + '\n' + ' Capital: ' + data.capital + '\n' +
        ' Languages: ' + data.languages[0].name + '\n' +
        'Continent: ' + data.region + '\n' +
        'Borders: ' + data.borders + '\n' +
        'Currency: ' + data.currencies[0].name
    document.getElementById("myDialog").showModal();
}
window.onclick = function (event) {
    document.getElementById("myDialog").close();
}