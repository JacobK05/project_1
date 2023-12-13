// Function 1: Convert from zip code to latitude and longitude
// API Key: 24e3f31283msheb85953a5ee099dp1851a5jsna42869b20f27
async function convertZipToLatLong() {
  var zipCode = document.getElementById('zipcodeInput').value;

  try {
    var zipCodeResponse = await fetch(`https://us-zip-code-information.p.rapidapi.com/?zipcode=${zipCode}`, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '24e3f31283msheb85953a5ee099dp1851a5jsna42869b20f27',
        'X-RapidAPI-Host': 'us-zip-code-information.p.rapidapi.com',
      },
      credentials: 'include',
    });

    if (!zipCodeResponse.ok) {
      throw new Error(`Error: ${zipCodeResponse.statusText}`);
    }

    var zipCodeData = await zipCodeResponse.json();
    var { Latitude, Longitude } = zipCodeData[0]; // Assuming the first element is the desired one
    document.getElementById('location').innerText = `Latitude: ${Latitude}, Longitude: ${Longitude}`;

    var restaurantResponse = await fetch(`https://map-places.p.rapidapi.com/nearbysearch/json?location=${Latitude.trim()},${Longitude.trim()}&radius=1500&type=restaurant`, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '24e3f31283msheb85953a5ee099dp1851a5jsna42869b20f27',
        'X-RapidAPI-Host': 'map-places.p.rapidapi.com',
      },
      credentials: 'include',
    });

    if (!restaurantResponse.ok) {
      throw new Error(`Error: ${restaurantResponse.statusText}`);
    }

    var restaurantData = await restaurantResponse.json();
    console.log("API Response:", restaurantData); // Log the entire response for debugging

    if (!restaurantData.results) {
      document.getElementById('restaurants').innerHTML = '<p>No restaurants found.</p>';
      return;
    }

    var restaurants = restaurantData.results;
    let output = '';
    for (let restaurant of restaurants) {
      output += `
        <div class="section-wrapper">
          <div class="restaurant-section">
            <p>${restaurant.name}</p>
          </div>
          <div class="save-section" style="text-align: center;">
            <p>Save</p>
          </div>
        </div>
      `;
    }
    document.getElementById('restaurants').innerHTML = output;

  } catch (error) {
    console.error('Error:', error.message);
    document.getElementById('restaurants').innerHTML = `<p>Error loading restaurants: ${error.message}</p>`;
  }
}

var zipCodeInput = document.getElementById('zipcodeInput');
zipCodeInput.addEventListener('click', convertZipToLatLong)
  




// Function 2: From latitude and longitude, search nearby restaurant
// API Key: 24e3f31283msheb85953a5ee099dp1851a5jsna42869b20f27