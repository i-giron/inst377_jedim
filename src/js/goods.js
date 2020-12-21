function app() {
    this.data = [];
    this.filteredResult = this.data;
}
// Function to render google map
app.prototype.renderMap = function() {
    // Get locations from filtered Result
    const locations = this.filteredResult.map((item, index) => {
        const { human_address, latitude, longitude} = item.location;
        const { address } = JSON.parse(human_address);
        return [address, latitude, longitude, index + 1];
    });
    // initialize google map to show
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: new google.maps.LatLng(38.783762, -77.01422),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
  
    const infowindow = new google.maps.InfoWindow();

    let marker;
    let i;
    // show google map mk
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


// fucntion to bind events on goods page
app.prototype.bindEvents = function() {
    // function when user click Apply button
    document.getElementById('apply-btn').addEventListener('click', ()=>{
        let checkedArray = [];
        // Get what items are selected from goods checkbox list
        for (let i = 1; i <= 12;i++){
            let checked = $('#type' + i).is(":checked");
            if (checked== true){
                checkedArray.push($('#type' + i).val())
            }   
        }
        // get placed by selected goods
        this.filteredResult = this.data.filter((item) => {
            for (let k = 0; k < checkedArray.length; k++){
                if (item[checkedArray[k]] == "Yes") return true;
            } 
        });
        this.renderMap();
    });

    document.getElementById('register-btn').addEventListener('click', ()=>{
        let checkArray = []
        for (let i=1; i <=17; i++){
            let check = $('#type' + i).is(":checked");
            if (check== true){
                checkArray.push($('#type' + i).val())
            
            }
        }
      // get placed by selected goods
      this.filteredResult = this.data.filter((item) => {
        for (let k = 0; k < checkArray.length; k++){
            if (item[checkArray[k]] == "Yes") return true;
        } 
    });
    this.renderMap();
});

    // filter places by goods name typed by user
    document.getElementById('search-btn').addEventListener('click', () => {
        let goodsNameArray = ['bakedgoods', 'cheese', 'eggs', 'seafood', 'herbs', 'honey', 'jams', 'vegetables', 'maple', 'meat',  'nuts',  'wine'];
        const input = document.getElementById('search-input').value;
        // get goods item index from user input
        let index = goodsNameArray.findIndex((item)=> item.includes(input.toLowerCase()));
        if (index > -1){
            this.filteredResult = this.data.filter((item) => {
                for (let k = 0; k < goodsNameArray.length; k++){
                    if (item[goodsNameArray[index]] == "Yes") return true;
                } 
            });
        }
        console.log('filteredResult', this.filteredResult)
        this.renderMap();
});

    document.getElementById('register-btn').addEventListener('click', () => {
        let paymentArray = ['CREDIT', 'WIC', 'WICCASH', 'SFMNP', 'SNAP'];
        const input = document.getElementById('search-input').value;
        // get goods item index from user input
        let index = paymentArray.findIndex((item)=> item.includes(input.toLowerCase()));
        if (index > -1){
            this.filteredResult = this.data.filter((item) => {
                for (let k = 0; k < paymentArray.length; k++){
                    if (item[paymentArray[index]] == "Yes") return true;
                } 
            });
        }
        console.log('filteredResult', this.filteredResult)
        this.renderMap();
    });

}
// Get All data from server
app.prototype.fetch = function() {
    fetch('https://data.princegeorgescountymd.gov/resource/sphi-rwax.json')
        .then(response => response.json())
        .then(json => {
            this.data = json;
            this.filteredResult = this.data;
            console.log('filteredResult', this.filteredResult)
            // this.renderList();
            this.renderMap();
        });
}

const instance = new app();
instance.fetch();
instance.bindEvents();
