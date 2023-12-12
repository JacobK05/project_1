// Function 1: Convert from zip code to latitude and longitude
// API Key: 24e3f31283msheb85953a5ee099dp1851a5jsna42869b20f27
async function convertZipToLatLong() {
  const zipCode = document.getElementById('zipcodeInput').value;

  try {
    const response = await fetch(`https://us-zip-code-information.p.rapidapi.com/?zipcode=${zipCode}`, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '24e3f31283msheb85953a5ee099dp1851a5jsna42869b20f27',
        'X-RapidAPI-Host': 'us-zip-code-information.p.rapidapi.com',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    const { Latitude, Longitude } = data[0]; // Assuming the first element is the desired one
    document.getElementById('location').innerText = `Latitude: ${Latitude}, Longitude: ${Longitude}`;
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Function 2: From latitude and longitude, search nearby restaurant
// API Key: 24e3f31283msheb85953a5ee099dp1851a5jsna42869b20f27
async function findNearbyRestaurants() {
  const locationText = document.getElementById('location').innerText;
  const [latitude, longitude] = locationText.replace('Latitude: ', '').replace('Longitude: ', '').split(', ');

  try {
    const response = await fetch(`https://map-places.p.rapidapi.com/nearbysearch/json?location=${latitude.trim()},${longitude.trim()}&radius=1500&type=restaurant`, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '24e3f31283msheb85953a5ee099dp1851a5jsna42869b20f27',
        'X-RapidAPI-Host': 'map-places.p.rapidapi.com',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("API Response:", data); // Log the entire response for debugging

    if (!data.results) {
      document.getElementById('restaurants').innerHTML = '<p>No restaurants found.</p>';
      return;
    }

    const restaurants = data.results;
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