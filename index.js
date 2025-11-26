const card = document.getElementById('ip-card');

fetch("https://api.ipify.org?format=json")
    .then(response => response.json())
    .then(data => {
        getLocationp(data.ip);
    })
    .catch(error => {
        card.innerHTML = "<h2>Xatolik yuz berdi!</h2>";
        console.error(error);
    });

function getLocationp(ip) {
    fetch(`https://api.weatherapi.com/v1/ip.json?q=${ip}&key=4785c4047efa4ea989a44136252411`)
        .then(response => response.json())
        .then(data => {
            displayData(data);
        })
        .catch(error => {
            card.innerHTML = "<h2>Joylashuvni olishda xatolik!</h2>";
            console.error(error);
        });
}

function displayData(data) {
    card.innerHTML = `
        <h2>Sizning IP: ${data.ip}</h2>
        <div class="info-row"><div class="info-title">Shahar:</div><div class="info-value">${data.city}</div></div>
        <div class="info-row"><div class="info-title">Viloyat/Region:</div><div class="info-value">${data.region}</div></div>
        <div class="info-row"><div class="info-title">Davlat:</div><div class="info-value">${data.country_name} (${data.country_code})</div></div>
        <div class="info-row"><div class="info-title">Qit’a:</div><div class="info-value">${data.continent_name} (${data.continent_code})</div></div>
        <div class="info-row"><div class="info-title">Latitude / Longitude:</div><div class="info-value">${data.lat}, ${data.lon}</div></div>
        <div class="info-row"><div class="info-title">Mahalliy Vaqt:</div><div class="info-value">${data.localtime}</div></div>
        <div class="info-row"><div class="info-title">Time Zone:</div><div class="info-value">${data.tz_id}</div></div>
    `;
}