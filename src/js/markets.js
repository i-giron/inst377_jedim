function app() {
    this.data = [];
    this.filteredResult = this.data;
}

app.prototype.renderList = function() {
    document.getElementById('markets-first').innerHTML = "";
    document.getElementById('markets-last').innerHTML = "";
    const template = this.filteredResult.map((item) => {
        return `<div class="market-col">${item.market_name}</div>`;
    });

    if(this.filteredResult.length > 0) {
        const total = this.filteredResult.length;
        const mid = Math.floor(total / 2);
        if(total === 1) {
            document.getElementById('markets-first').innerHTML = template.join('');
        }
        else {
            document.getElementById('markets-first').innerHTML = template.slice(0, mid).join(''); 
            document.getElementById('markets-last').innerHTML = template.slice(mid).join('');
        }
    }
}

app.prototype.renderMap = function() {
    const locations = this.filteredResult.map((item, index) => {
        const { human_address, latitude, longitude} = item.location;
        const { address } = JSON.parse(human_address);
        return [address, latitude, longitude, index + 1];
    });
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: new google.maps.LatLng(38.783762, -77.01422),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
  
    const infowindow = new google.maps.InfoWindow();

    let marker;
    let i;

    for (i = 0; i < locations.length; i++) {  
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[i][1], locations[i][2]),
            map: map
        });

        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
            infowindow.setContent(locations[i][0]);
            infowindow.open(map, marker);
            }
        })(marker, i));
    }
}

app.prototype.bindEvents = function() {
    document.getElementsByClassName('search-btn')[0].addEventListener('click', () => {
        const input = document.getElementById('search-input').value;
        this.filteredResult = this.data.filter((item) => {
            return item.market_name.toLowerCase().includes(input.toLowerCase());
        });
        this.renderList();
        this.renderMap();
    });
}

app.prototype.fetch = function() {
    fetch('https://data.princegeorgescountymd.gov/resource/sphi-rwax.json')
        .then(response => response.json())
        .then(json => {
            this.data = json;
            this.filteredResult = this.data;
            this.renderList();
            this.renderMap();
        });
}

const instance = new app();
instance.fetch();
instance.bindEvents();