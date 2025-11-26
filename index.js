const container = document.getElementById("container");
const locationContainer = document.getElementById("location-container");
const mapBox = document.getElementById("map-box");

fetch('https://api64.ipify.org?format=json')
    .then(res => res.json())
    .then(data => {
        container.innerHTML = `
                    <div class="ip-card">
                        <div class="ip-label"><span class="status-dot"></span>Your IP Address</div>
                        <div class="ip-value">${data.ip}</div>
                    </div>
                `;
        getLocation(data.ip);
    })
    .catch(err => {
        console.error("IP olishda xato:", err);
        container.innerHTML = '<div class="ip-card"><div class="loading"><p style="color: #ef4444;">Failed to fetch IP address</p></div></div>';
    });

function getLocation(ip) {
    fetch(`https://api.weatherapi.com/v1/ip.json?q=${ip}&key=e0c4fcc2ca0449578ae35836241312`)
        .then(res => res.json())
        .then(loc => {
            locationContainer.innerHTML = `
                        <div class="location-section">
                            <div class="location-item">
                                <div class="location-label">Location</div>
                                <div class="location-value">${loc.city}</div>
                                <div class="location-sub">${loc.region}</div>
                            </div>

                            <div class="location-item">
                                <div class="location-label">Country</div>
                                <div class="location-value">${loc.country_name}</div>
                                <div class="location-sub">${loc.country_code} • ${loc.continent_name}</div>
                            </div>

                            <div class="location-item">
                                <div class="location-label">Timezone</div>
                                <div class="location-value">${loc.tz_id.split('/')[1]}</div>
                                <div class="location-sub">${loc.tz_id}</div>
                            </div>

                            <div class="location-item">
                                <div class="location-label">Latitude</div>
                                <div class="location-value">${loc.lat.toFixed(4)}°</div>
                            </div>

                            <div class="location-item">
                                <div class="location-label">Longitude</div>
                                <div class="location-value">${loc.lon.toFixed(4)}°</div>
                            </div>

                            <div class="location-item">
                                <div class="location-label">Coordinates</div>
                                <div class="location-value" style="font-size: 1.1rem;">${loc.lat.toFixed(2)}°N<br>${loc.lon.toFixed(2)}°E</div>
                            </div>
                        </div>
                    `;

            loadMap(loc.lat, loc.lon);
        })
        .catch(err => {
            console.error("Location xatosi:", err);
            locationContainer.innerHTML = '<div class="location-section"><div class="location-item"><div class="loading"><p style="color: #ef4444;">Failed to fetch location data</p></div></div></div>';
        });
}

function loadMap(lat, lon) {
    const key = "VpTm6OegQY3aaGRR3G41";
    const url = `https://api.maptiler.com/maps/outdoor-v4/?key=${key}#14/${lat}/${lon}`;
    document.getElementById("map").src = url;
    mapBox.style.display = 'block';
}