        // Function 1: Convert from zip code to latitude and longitude
        // API Key: 2eb2279785mshb15d3abd03b9c13p1b6c39jsn27fbb446ee6a
        async function convertZipAndFindRestaurants() {
            const zipCode = document.getElementById('zipcodeInput').value;
        
            try {
                const latLongResponse = await fetch(`https://us-zip-code-information.p.rapidapi.com/?zipcode=${zipCode}`, {
                    method: 'GET',
                    headers: {
                        'X-RapidAPI-Key': '2eb2279785mshb15d3abd03b9c13p1b6c39jsn27fbb446ee6a',
                        'X-RapidAPI-Host': 'us-zip-code-information.p.rapidapi.com'
                    }
                });
        
                if (!latLongResponse.ok) throw new Error(`Error in getting latitude and longitude: ${latLongResponse.statusText}`);
        
                const latLongData = await latLongResponse.json();
                const { Latitude, Longitude } = latLongData[0]; // Assuming the first element is the desired one
        
                const restaurantResponse = await fetch(`https://map-places.p.rapidapi.com/nearbysearch/json?location=${Latitude},${Longitude}&radius=1500&type=restaurant`, {
                    method: 'GET',
                    headers: {
                        'X-RapidAPI-Key': '2eb2279785mshb15d3abd03b9c13p1b6c39jsn27fbb446ee6a',
                        'X-RapidAPI-Host': 'map-places.p.rapidapi.com'
                    }
                });
        
                if (!restaurantResponse.ok) throw new Error(`Error in getting restaurants: ${restaurantResponse.statusText}`);
        
                const restaurantData = await restaurantResponse.json();
                if (!restaurantData.results) {
                    document.getElementById('restaurants').innerHTML = '<p>No restaurants found.</p>';
                    return;
                }
        
                let output = '';
                for (let restaurant of restaurantData.results) {
                    output += `
                        <div class="section-wrapper">
                            <div class="restaurant-section">
                                <p>${restaurant.name}</p>
                            </div>
                            <div class="save-section" style="text-align: center;">
                                <button onclick="saveRestaurant('${restaurant.name}')">Save</button>
                            </div>
                        </div>
                    `;
                }
                document.getElementById('restaurants').innerHTML = output;
        
            } catch (error) {
                console.error('Error:', error.message);
                document.getElementById('restaurants').innerHTML = `<p>Error: ${error.message}</p>`;
            }
        }

        // Function to save a restaurant and display saved restaurants
        function saveRestaurant(restaurantName) {
            // Create an array to store saved restaurants
            let savedRestaurants = JSON.parse(localStorage.getItem('savedRestaurants')) || [];
            
            // Check if the restaurant is already saved
            if (!savedRestaurants.includes(restaurantName)) {
                savedRestaurants.push(restaurantName);
                // Save the updated array to local storage
                localStorage.setItem('savedRestaurants', JSON.stringify(savedRestaurants));
                // Display the saved restaurants
                displaySavedRestaurants();
            } else {
                alert('This restaurant is already saved.');
            }
        }

        // Function to display saved restaurants
        function displaySavedRestaurants() {
            // Retrieve saved restaurants from local storage
            let savedRestaurants = JSON.parse(localStorage.getItem('savedRestaurants')) || [];
            let output = '<h2>Saved Restaurants:</h2>';
            if (savedRestaurants.length === 0) {
                output += '<p>No restaurants saved.</p>';
            } else {
                output += '<ul>';
                savedRestaurants.forEach(restaurant => {
                    output += `<li>${restaurant}</li>`;
                });
                output += '</ul>';
            }
            document.getElementById('savedRestaurants').innerHTML = output;
        }


         // Retrieve saved restaurants from Local Storage
         const savedRestaurants = JSON.parse(localStorage.getItem('savedRestaurants')) || [];

         // Display saved restaurants on the page
         const savedRestaurantsContainer = document.getElementById('savedRestaurants');
         if (savedRestaurants.length > 0) {
             savedRestaurantsContainer.innerHTML = '<h2>Your Saved Restaurants:</h2>';
             const ul = document.createElement('ul');
             savedRestaurants.forEach(restaurant => {
                 const li = document.createElement('li');
                 li.textContent = restaurant;
                 ul.appendChild(li);
             });
             savedRestaurantsContainer.appendChild(ul);
         } else {
             savedRestaurantsContainer.innerHTML = '<p>No restaurants saved.</p>';
         }