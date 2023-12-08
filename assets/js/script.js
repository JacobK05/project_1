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
  

    var urlHotels = `https://hotels4.p.rapidapi.com/locations/v3/search?q=${location}&locale=en_US&langid=1033&siteid=300000001`;
    var optionsHotels = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'YOUR_HOTELS_API_KEY',
        'X-RapidAPI-Host': 'hotels4.p.rapidapi.com'
      }
    };
  
    // Perform the API request to retrieve restaurant data
    fetch(urlRest, optionsRest)
      .then(response => response.json())
      .then(data => {
        // Display the first three restaurant results
        var restaurants = data.results.slice(0, 3);
        restaurants.forEach(restaurant => {
          // Display the restaurant information on the page
          // ...
        });
      })
      .catch(error => {
        // Handle any errors that occur during the restaurant API request
        console.log(error);
      });
  
    // Perform the API request to retrieve hotel data
    fetch(urlHotels, optionsHotels)
      .then(response => response.json())
      .then(data => {
        // Display the first three hotel results
        var hotels = data.suggestions[0].entities.slice(0, 3);
        hotels.forEach(hotel => {
          // Display the hotel information on the page
          // ...
        });
      })
      .catch(error => {
        // Handle any errors that occur during the hotel API request
        console.log(error);
      });
  }
      