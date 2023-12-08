// need to add this locationInput id to html <input type="text" id="locationInput" placeholder="Enter Location">
// <button onclick="searchRestaurants()">Search</button>
function searchRestaurants() {
    var location = document.getElementById('locationInput').value;
  
    var urlRest = `https://tripadvisor16.p.rapidapi.com/api/v1/restaurant/searchLocation?query=${location}`;
  
    var optionsRest = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '2483fe3bcdmsh626c8ea7487af6ap1137bdjsn316ab5a9048f',
        'X-RapidAPI-Host': 'tripadvisor16.p.rapidapi.com'
      }
    };
  
    // Perform the API request using the modified URL and options
    // ...
    new Promise((resolve, reject) => {
        fetch(urlRest, optionsRest)
          .then(response => response.text())
          .then(result => {
            resolve(result);
          })
          .catch(error => {
            reject(error);
          });
      })
        .then(result => {
          console.log(result);
        })
        .catch(error => {
          console.error(error);
        });
  }


// need to add this zipCOdeInput id to the html <input type="text" id="zipCodeInput" placeholder="Enter Zip Code">
// <button onclick="searchHotels()">Search</button
function searchHotels() {
 var zipCode = document.getElementById('zipCodeInput').value;
      
var url = `https://hotels4.p.rapidapi.com/locations/v3/search?q=${zipCode}&locale=en_US&langid=1033&siteid=300000001`;
      
var options = {
 method: 'GET',
     headers: {
            'X-RapidAPI-Key': '2483fe3bcdmsh626c8ea7487af6ap1137bdjsn316ab5a9048f',
            'X-RapidAPI-Host': 'hotels4.p.rapidapi.com'
          }
        };
      
        // Perform the API request using the modified URL and options
        // ...
        new Promise((resolve, reject) => {
            fetch(url, options)
              .then(response => response.text())
              .then(result => {
                resolve(result);
              })
              .catch(error => {
                reject(error);
              });
          })
            .then(result => {
              console.log(result);
            })
            .catch(error => {
              console.error(error);
            });
      }