document.getElementById('itinerary-form').addEventListener('submit', function (e) {
    e.preventDefault();

    // Capture form data
    const city = document.getElementById('city').value.toLowerCase();
    const days = document.getElementById('duration').value;
    const experiences = Array.from(document.querySelectorAll('input[name="experience"]:checked')).map(e => e.value);
    const group = document.querySelector('input[name="group"]:checked').value;
    const companions = document.querySelector('input[name="companions"]:checked').value;

    // Basic example of places and restaurants to visit based on the city
    const suggestions = {
        'jaipur': {
            places: [
                { name: 'Amber Fort', image: 'img/amber_fort.jpg' },
                { name: 'City Palace', image: 'img/city_palace.jpg' },
                { name: 'Hawa Mahal', image: 'img/hawa_mahal.jpg' }
            ],
            restaurants: [
                { name: 'The Rajput Room', rating: '4.5', image: 'img/rajput_room.jpg' },
                { name: 'Suvarna Mahal', rating: '4.6', image: 'img/suvarna_mahal.jpg' }
            ]
        },
        'mumbai': {
            places: [
                { name: 'Gateway of India', image: 'img/gateway_of_india.jpg' },
                { name: 'Marine Drive', image: 'img/marine_drive.jpg' },
                { name: 'Elephanta Caves', image: 'img/elephanta_caves.jpg' }
            ],
            restaurants: [
                { name: 'Leopold Café', rating: '4.3', image: 'img/leopold_cafe.jpg' },
                { name: 'The Table', rating: '4.5', image: 'img/the_table.jpg' }
            ]
        }
        // Add more cities and their suggestions
    };

    // Generate itinerary
    const cityData = suggestions[city] || { places: [], restaurants: [] };

    let itinerary = '<h2>Suggested Places to Visit</h2><div class="card-container">';
    cityData.places.forEach(place => {
        itinerary += `
            <div class="card">
                <img src="${place.image}" alt="${place.name}">
                <h3>${place.name}</h3>
            </div>
        `;
    });
    itinerary += '</div>';

    itinerary += '<h2>Restaurants to Try</h2><div class="card-container">';
    cityData.restaurants.forEach(restaurant => {
        itinerary += `
            <div class="card">
                <img src="${restaurant.image}" alt="${restaurant.name}">
                <h3>${restaurant.name}</h3>
                <p class="rating">Rating: ${restaurant.rating}</p>
            </div>
        `;
    });
    itinerary += '</div>';

    document.getElementById('itinerary-result').innerHTML = itinerary;
});
