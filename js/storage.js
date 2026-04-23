
const STORAGE_KEYS = {
  HOTELS: "cs391_hotels",
  DEALS: "cs391_deals",
  POPULAR_SEARCHES: "cs391_popular_searches",
  SEARCH_CRITERIA: "cs391_search_criteria",
  SEARCH_RESULTS: "cs391_search_results",
  SELECTED_HOTEL: "cs391_selected_hotel",
  RESERVATION: "cs391_reservation",
  BOOKING_DRAFT: "cs391_booking_draft",
};

function saveSession(key, value) {
  sessionStorage.setItem(key, JSON.stringify(value));
}

function getSession(key, fallbackValue) {
  const rawValue = sessionStorage.getItem(key);

  if (!rawValue) {
    return fallbackValue;
  }

  try {
    return JSON.parse(rawValue);
  } catch (error) {
    return fallbackValue;
  }
}

function removeSession(key) {
  sessionStorage.removeItem(key);
}

function initializeSessionData() {
    
  if (!sessionStorage.getItem(STORAGE_KEYS.HOTELS)) {
    saveSession(STORAGE_KEYS.HOTELS, APP_DATA.hotels);
  }

  if (!sessionStorage.getItem(STORAGE_KEYS.DEALS)) {
    saveSession(STORAGE_KEYS.DEALS, APP_DATA.deals);
  }

  if (!sessionStorage.getItem(STORAGE_KEYS.POPULAR_SEARCHES)) {
    saveSession(STORAGE_KEYS.POPULAR_SEARCHES, APP_DATA.popularSearches);
  }

}


function formatDateForInput(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return year + "-" + month + "-" + day;
}

function setDefaultDates() {
  const checkInInput = document.getElementById("checkInDate");
  const checkOutInput = document.getElementById("checkOutDate");

  if (!checkInInput || !checkOutInput) {
    return;
  }

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

  if (!checkInInput.value) {
    checkInInput.value = tomorrowString;
  }

  if (!checkOutInput.value) {
    checkOutInput.value = nextWeekString;
  }
}

function populateSearchForm(criteria) {
  if (!criteria) {
    return;
  }

  const searchText = document.getElementById("searchText");
  const checkInDate = document.getElementById("checkInDate");
  const checkOutDate = document.getElementById("checkOutDate");
  const guestCount = document.getElementById("guestCount");
  const roomCount = document.getElementById("roomCount");

  if (searchText) searchText.value = criteria.searchText || "";
  if (checkInDate) checkInDate.value = criteria.checkInDate || "";
  if (checkOutDate) checkOutDate.value = criteria.checkOutDate || "";
  if (guestCount) guestCount.value = String(criteria.guestCount || 2);
  if (roomCount) roomCount.value = String(criteria.roomCount || 1);
}

function collectSearchCriteriaFromForm() {
  return {
    searchText: document.getElementById("searchText").value.trim(),
    checkInDate: document.getElementById("checkInDate").value,
    checkOutDate: document.getElementById("checkOutDate").value,
    guestCount: Number(document.getElementById("guestCount").value),
    roomCount: Number(document.getElementById("roomCount").value)
  };
}

function validateSearchCriteria(criteria) {
  if (!criteria.searchText) {
    return "Please enter a destination or hotel name.";
  }

  if (!criteria.checkInDate || !criteria.checkOutDate) {
    return "Please select both check-in and check-out dates.";
  }

  if (criteria.checkOutDate <= criteria.checkInDate) {
    return "Check-out date must be later than check-in date.";
  }

  return "";
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

function saveSearchState(criteria, results) {
  saveSession(STORAGE_KEYS.SEARCH_CRITERIA, criteria);
  saveSession(STORAGE_KEYS.SEARCH_RESULTS, results);
}

function createBookingDraft(hotel, criteria) {
  return {
    hotel: {
      id: hotel.id,
      name: hotel.name,
      address: hotel.address,
      city: hotel.city,
      country: hotel.country,
      stars: hotel.stars,
      rating: hotel.rating,
      image: hotel.images[0]
    },
    reservationData: {
      roomCount: criteria.roomCount,
      guestCount: criteria.guestCount,

      checkInDate: criteria.checkInDate,
      checkOutDate: criteria.checkOutDate
    }
  };
}
