
const STORAGE_KEYS = {
  HOTELS: "cs391_hotels",
  DEALS: "cs391_deals",
  POPULAR_SEARCHES: "cs391_popular_searches",
  SEARCH_CRITERIA: "cs391_search_criteria",
  SEARCH_RESULTS: "cs391_search_results",
  SELECTED_HOTEL: "cs391_selected_hotel",
  RESERVATION: "cs391_reservation"
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