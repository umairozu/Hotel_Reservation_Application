
document.addEventListener("DOMContentLoaded", function () {
  initializeSessionData();
  setDefaultDates();

  const savedCriteria = getSession(STORAGE_KEYS.SEARCH_CRITERIA, null);
  populateSearchForm(savedCriteria);

  const savedResults = getSession(STORAGE_KEYS.SEARCH_RESULTS, []);
  renderSearchResults(savedResults, savedCriteria);

  registerSearchResultsEvents();
});

function registerSearchResultsEvents() {
  const searchForm = document.getElementById("searchForm");
  searchForm.addEventListener("submit", handleResultsSearchSubmit);
}

function handleResultsSearchSubmit(event) {
  event.preventDefault();

  const errorElement = document.getElementById("searchError");
  const criteria = collectSearchCriteriaFromForm();

  errorElement.textContent = "";

  const validationMessage = validateSearchCriteria(criteria);
  if (validationMessage) {
    errorElement.textContent = validationMessage;
    return;
  }

  const results = searchHotels(criteria.searchText);
  saveSearchState(criteria, results);
  renderSearchResults(results, criteria);
}

function renderSearchResults(hotels, criteria) {
  const resultsContainer = document.getElementById("resultsContainer");
  const resultsSummary = document.getElementById("resultsSummary");

  const searchText = criteria.searchText;

  if (!hotels.length) {
    resultsSummary.textContent = `0 hotels found for "${searchText}".`;

    resultsContainer.innerHTML = `
      <div class="col-12">
        <div class="empty-state shadow-sm">
          <h3 class="h5 mb-2">No hotels found</h3>
          <p class="text-secondary mb-0">Try another city, hotel name, or keyword.</p>
        </div>
      </div>
    `;
    return;
  }

  resultsSummary.textContent = `${hotels.length} hotel(s) found for "${searchText}". Sorted by hotel name.`;

  resultsContainer.innerHTML = hotels.map(function (hotel) {
    return `
      <div class="col-12 col-sm-6 col-lg-3">
        <article
          class="card hotel-list-card border-0 shadow-sm rounded-4 hover-lift h-100 js-hotel-card">
          <img src="${hotel.images[0]}" class="card-img-top hotel-thumb rounded-top-4" alt="${hotel.name}">

          <div class="card-body d-flex flex-column">
            <h3 class="h5 mb-1">${hotel.name}</h3>
            <p class="text-secondary small mb-2">${hotel.city}, ${hotel.country}</p>
            <p class="small mb-2">⭐ ${hotel.stars} stars</p>
            <p class="small mb-2">Rating: ${hotel.rating} (${hotel.reviewCount} reviews)</p>
            <p class="small text-secondary mb-3">${hotel.address}</p>
            <div class="mt-auto d-flex justify-content-between align-items-center">
              <span class="fw-semibold">$${hotel.pricePerNight} / night</span>
              <span class="btn btn-sm btn-outline-primary">View details</span>
            </div>
          </div>
        </article>
      </div>
    `;
  }).join("");

  bindHotelCardEvents(hotels, criteria);
}

function bindHotelCardEvents(hotels, criteria) {
  const cards = document.querySelectorAll(".js-hotel-card");

  cards.forEach(function (card) {
    const hotelId = Number(card.dataset.hotelId);

    card.addEventListener("click", function () {
      openHotelDetails(hotels, hotelId, criteria);
    });
  });
}

function openHotelDetails(hotels, hotelId, criteria) {
  const selectedHotel = hotels.find(function (hotel) {
    return hotel.id === hotelId;
  });

  if (!selectedHotel) {
    return;
  }

  saveSession(STORAGE_KEYS.SELECTED_HOTEL, selectedHotel);

  const bookingDraft = createBookingDraft(selectedHotel, criteria || {
    roomCount: 1,
    guestCount: 2,
    checkInDate: "",
    checkOutDate: ""
  });

  saveSession(STORAGE_KEYS.BOOKING_DRAFT, bookingDraft);

  window.location.href = "hotelDetails.html";
}