function app() {
    this.data = [];
}

app.prototype.renderMap = function() {
    const locations = this.data.map((item, index) => {
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

app.prototype.fetch = function() {
    fetch('https://data.princegeorgescountymd.gov/resource/sphi-rwax.json')
        .then(response => response.json())
        .then(json => {
            this.data = json;
            this.renderMap();
        });
}

const instance = new app();
instance.fetch();