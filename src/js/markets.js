// This is main class, we can use function or class keyword to declare a class
function app() {
    // Initial data is empty
    this.data = [];
    // We want to retain the original data, so we will assign this.data to this.filteredResult
    // this.filteredResult will be used further for rendering
    this.filteredResult = this.data;
}

// app is class, once we add a method in app.prototype, it's available to all the instance of the class
// This method will render the list of markets
app.prototype.renderList = function() {
    // Set html to empty initially since we want to reset it
    // It will be helpful in filtering
    document.getElementById('markets-first').innerHTML = "";
    document.getElementById('markets-last').innerHTML = "";

    // We have array of object in this.filteredResult, we can use map to transform this
    // After transform, we get array. each item represent row of market name
    const template = this.filteredResult.map((item) => {
        return `<div class="market-col">${item.market_name}</div>`;
    });

    if(this.filteredResult.length > 0) {
        const total = this.filteredResult.length;
        // Since there are 2 column for markets
        // Take a mid point of all markets
        const mid = Math.floor(total / 2);
        if(total === 1) {
            // If there are only one market, it should be shown in first column.
            document.getElementById('markets-first').innerHTML = template.join('');
        }
        else {
            // If there are more market, first half to be shown in first column
            document.getElementById('markets-first').innerHTML = template.slice(0, mid).join(''); 
            // If there are more market, second half to be shown in last column
            document.getElementById('markets-last').innerHTML = template.slice(mid).join('');
        }
    }
}

// This function will be used to render the map
app.prototype.renderMap = function() {
    // We have all markets data in this.filteredResult
    // We need to transform this data in format that google map understands
    // locations contains data in that format
    const locations = this.filteredResult.map((item, index) => {
        const { human_address, latitude, longitude} = item.location;
        const { address } = JSON.parse(human_address);
        return [address, latitude, longitude, index + 1];
    });

    // Initialize the google map and set a center and zoom point
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: new google.maps.LatLng(38.783762, -77.01422),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
  
    const infowindow = new google.maps.InfoWindow();

    let marker;
    let i;

    // Rendering all the locations and markers
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
    // One click of search button filter the results
    // Get the search button and add click event. On click of button filter the results
    document.getElementsByClassName('search-btn')[0].addEventListener('click', () => {
        // On click of search, get the input value of textbox
        const input = document.getElementById('search-input').value;
        // Filter the results, we have original data in this.data
        // this.filteredResult will have filtered result
        this.filteredResult = this.data.filter((item) => {
            return item.market_name.toLowerCase().includes(input.toLowerCase());
        });

        // After filtering, we need to again render market list
        this.renderList();
        // After filtering, we need to again render map
        this.renderMap();
    });
}

app.prototype.fetch = function() {
    // Make api call to fetch all markets data
    fetch('https://data.princegeorgescountymd.gov/resource/sphi-rwax.json')
        .then(response => response.json())
        .then(json => {
            // Once data is retrieved, assign it to this.data and this.filteredResult
            this.data = json;
            this.filteredResult = this.data;
            // Render market list and map
            this.renderList();
            this.renderMap();
        });
}

// Create an instance of class
const instance = new app();

// fetch the data
instance.fetch();
// bind the events
instance.bindEvents();