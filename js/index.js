
document.addEventListener("DOMContentLoaded", function () {
  initializeSessionData();
  setDefaultDates();
  renderDeals();
  renderPopularSearches();
  registerEvents();
});


function registerEvents() {
  const searchForm = document.getElementById("searchForm");
  searchForm.addEventListener("submit", handleSearchSubmit);
}

function setDefaultDates() {
  const checkInInput = document.getElementById("checkInDate");
  const checkOutInput = document.getElementById("checkOutDate");

  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const nextWeek = new Date();
  nextWeek.setDate(today.getDate() + 7);

  const todayString = formatDateForInput(today);
  const tomorrowString = formatDateForInput(tomorrow);
  const nextWeekString = formatDateForInput(nextWeek);

  checkInInput.min = todayString;
  checkOutInput.min = tomorrowString;

  checkInInput.value = tomorrowString;
  checkOutInput.value = nextWeekString;
}

function formatDateForInput(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return year + "-" + month + "-" + day;
}

function renderDeals() {
  const deals = getSession(STORAGE_KEYS.DEALS, []);
  const dealsContainer = document.getElementById("dealsContainer");

  dealsContainer.innerHTML = deals.map(function (deal) {
    return `
      <div class="col-12 col-sm-6 col-xl-3 mb-3">
        <div class="card deal-card border-0 shadow-sm rounded-4 hover-lift">
          <img src="${deal.imageUrl}" class="card-img-top section-card-image rounded-top-4" alt="${deal.title}">
          <div class="card-body">
            <h3 class="h5">${deal.title}</h3>
            <p class="card-text text-secondary">${deal.details}</p>
            <a href="#" class="fw-semibold text-decoration-none">Learn more</a>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

function renderPopularSearches() {
  const popularSearches = getSession(STORAGE_KEYS.POPULAR_SEARCHES, []);
  const slides = chunkArray(popularSearches, 4);
  const wrapper = document.getElementById("popularSearchCarouselWrapper");

  wrapper.innerHTML = `
    <div id="popularSearchCarousel" class="carousel slide">
      <div class="carousel-inner">
        ${slides.map(function (slide, slideIndex) {
          return `
            <div class="carousel-item ${slideIndex === 0 ? "active" : ""}">
              <div class="row g-4">
                ${slide.map(function (item) {
                  return `
                    <div class="col-12 col-sm-6 col-lg-3">
                      <div class="card popular-card border-0 shadow-sm rounded-4 hover-lift h-100">
                        <img src="${item.imageUrl}" class="card-img-top popular-thumb rounded-top-4" alt="${item.title}">
                        <div class="card-body">
                          <h3 class="h5 mb-2">${item.title}</h3>
                          <p class="card-text text-secondary mb-1">${item.hotelCount} hotels</p>
                          <p class="fw-semibold mb-0">$${item.averagePrice} avg.</p>
                        </div>
                      </div>
                    </div>
                  `;
                }).join("")}
              </div>
            </div>
          `;
        }).join("")}
      </div>

      <button class="carousel-control-prev" type="button" data-bs-target="#popularSearchCarousel" data-bs-slide="prev">
        <span class="carousel-control-prev-icon bg-dark rounded-circle p-3" aria-hidden="true"></span>
      </button>

      <button class="carousel-control-next" type="button" data-bs-target="#popularSearchCarousel" data-bs-slide="next">
        <span class="carousel-control-next-icon bg-dark rounded-circle p-3" aria-hidden="true"></span>
      </button>
    </div>
  `;

  bindPopularSearchEvents();
}

function bindPopularSearchEvents() {
  const cards = document.querySelectorAll(".js-popular-search");

  cards.forEach(function (card) {
    card.addEventListener("click", function () {
      runSearchAndGoToResults(card.dataset.query);
    });

  });
}

function handleSearchSubmit(event) {
  event.preventDefault();

  const searchText = document.getElementById("searchText").value.trim();
  const checkInDate = document.getElementById("checkInDate").value;
  const checkOutDate = document.getElementById("checkOutDate").value;
  const guestCount = Number(document.getElementById("guestCount").value);
  const roomCount = Number(document.getElementById("roomCount").value);
  const errorElement = document.getElementById("searchError");

  errorElement.textContent = "";

  if (!searchText) {
    errorElement.textContent = "Please enter a destination or hotel name.";
    return;
  }

  if (checkOutDate <= checkInDate) {
    errorElement.textContent = "Check-out date must be later than check-in date.";
    return;
  }

  const criteria = {
    searchText: searchText,
    checkInDate: checkInDate,
    checkOutDate: checkOutDate,
    guestCount: guestCount,
    roomCount: roomCount
  };

  const filteredHotels = searchHotels(searchText);
  saveSearchState(criteria, filteredHotels);

  renderSearchCarousel(filteredHotels, searchText);
}

function runSearchAndGoToResults(queryText) {
  const criteria = {
    searchText: queryText,
    checkInDate: document.getElementById("checkInDate").value,
    checkOutDate: document.getElementById("checkOutDate").value,
    guestCount: Number(document.getElementById("guestCount").value),
    roomCount: Number(document.getElementById("roomCount").value)
  };

  const filteredHotels = searchHotels(queryText);
  saveSearchState(criteria, filteredHotels);

  window.location.href = "searchResults.html";
}

function searchHotels(searchText) {
  const hotels = getSession(STORAGE_KEYS.HOTELS, []);
  const normalizedSearch = searchText.toLowerCase();

  return hotels
    .filter(function (hotel) {
      return (
        hotel.name.toLowerCase().includes(normalizedSearch) ||
        hotel.city.toLowerCase().includes(normalizedSearch) ||
        hotel.country.toLowerCase().includes(normalizedSearch) ||
        hotel.address.toLowerCase().includes(normalizedSearch) ||
        hotel.description.toLowerCase().includes(normalizedSearch)
      );
    })
    .sort(function (a, b) {
      return a.name.localeCompare(b.name);
    });
}

function renderSearchCarousel(hotels, searchText) {
  const dealsSection = document.getElementById("dealsSection");
  const searchCarouselSection = document.getElementById("searchCarouselSection");
  const searchCarouselTitle = document.getElementById("searchCarouselTitle");
  const wrapper = document.getElementById("searchCarouselWrapper");

  dealsSection.classList.add("d-none");
  searchCarouselSection.classList.remove("d-none");
  searchCarouselTitle.textContent = "Hot deals in " + searchText;

  if (!hotels.length) {
    wrapper.innerHTML = `
      <div class="empty-state shadow-sm">
        <h3 class="h5 mb-2">No hotels found</h3>
        <p class="text-secondary mb-0">Try another destination or hotel keyword.</p>
      </div>
    `;
    return;
  }

  const slides = chunkArray(hotels, 5);

  wrapper.innerHTML = `
    <div id="searchResultsCarousel" class="carousel slide">
      <div class="carousel-inner">
        ${slides.map(function (slide, slideIndex) {
          return `  
            <div class="carousel-item ${slideIndex === 0 ? "active" : ""}">
              <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-5 g-4">
                ${slide.map(function (hotel) {
                  return `
                    <div class="col">
                      <div class="card search-result-card border-0 shadow-sm rounded-4 h-100">
                        <img src="${hotel.images[0]}" class="card-img-top hotel-thumb rounded-top-4" alt="${hotel.name}">
                        <div class="card-body">
                          <h3 class="h6 mb-1">${hotel.name}</h3>
                          <p class="text-secondary small mb-2">${hotel.city}, ${hotel.country}</p>
                          <p class="small mb-2">rating ${hotel.rating} (${hotel.reviewCount} reviews)</p>
                          <p class="fw-semibold mb-0">$${hotel.pricePerNight} / night</p>
                        </div>
                      </div>
                    </div>
                  `;
                }).join("")}
              </div>
            </div>
          `;
        }).join("")}
      </div>

      ${slides.length > 1 ? `
        <button class="carousel-control-prev" type="button" data-bs-target="#searchResultsCarousel" data-bs-slide="prev">
          <span class="carousel-control-prev-icon bg-dark rounded-circle p-1"></span>
        </button>

        <button class="carousel-control-next" type="button" data-bs-target="#searchResultsCarousel" data-bs-slide="next">
          <span class="carousel-control-next-icon bg-dark rounded-circle p-1"></span>
        </button>
      ` : ""}
    </div>
  `;
}

function chunkArray(items, chunkSize) {
  const chunks = [];

  for (let index = 0; index < items.length; index += chunkSize) {
    chunks.push(items.slice(index, index + chunkSize));
  }

  return chunks;
}