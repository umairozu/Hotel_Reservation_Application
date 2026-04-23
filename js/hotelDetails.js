

document.addEventListener("DOMContentLoaded", function () {
  initializeSessionData();

  const selectedHotel = getSession(STORAGE_KEYS.SELECTED_HOTEL, null);
  const bookingDraft = getSession(STORAGE_KEYS.BOOKING_DRAFT, null);

  if (!selectedHotel || !bookingDraft) {
    window.location.href = "searchResults.html";
    return;
  }

  renderHotelDetails(selectedHotel, bookingDraft);
});

function renderHotelDetails(hotel, bookingDraft) {
  const container = document.getElementById("hotelDetailsContainer");
  const nights = calculateNightCount(
    bookingDraft.reservationData.checkInDate,
    bookingDraft.reservationData.checkOutDate
  );

  container.innerHTML = `
    <section class="mb-4">
      <div class="d-flex flex-column flex-lg-row justify-content-between align-items-lg-start mb-3">
        <div>
          <h2 class="h3 mb-1">${hotel.name}</h2>
          <p class="text-secondary mb-1">${hotel.address}</p>
          <p class="mb-0 small">⭐ ${hotel.stars} stars · Rating ${hotel.rating} · ${hotel.city}, ${hotel.country}</p>
        </div>

        <button id="topBookNowBtn" class="btn btn-primary px-3">Book now</button>
      </div>

      <div id="hotelPhotoCarousel" class="carousel slide mb-4">
        <div class="carousel-inner rounded-4 overflow-hidden shadow-lg">
          ${hotel.images.map(function (image, index) {
            return `
              <div class="carousel-item ${index === 0 ? "active" : ""}">
                <img src="${image}" class="d-block w-100 details-hero-image" alt="${hotel.name}">
              </div>
            `;
          }).join("")}
        </div>

        ${hotel.images.length > 1 ? `
          <button class="carousel-control-prev" type="button" data-bs-target="#hotelPhotoCarousel" data-bs-slide="prev">
            <span class="carousel-control-prev-icon bg-dark rounded-circle p-3"></span>
          </button>

          <button class="carousel-control-next" type="button" data-bs-target="#hotelPhotoCarousel" data-bs-slide="next">
            <span class="carousel-control-next-icon bg-dark rounded-circle p-3"></span>
          </button>
        ` : ""}
      </div>

      <div class="row g-4">
        <div class="col-12 col-lg-7">
          <div class="card border-1 shadow-lg rounded-4 h-100">
            <div class="card-body">
              <h3 class="h5 mb-3">About the property</h3>
              <p class="text-secondary">${hotel.description}</p>

              <h4 class="h6 mt-4 mb-2">Location</h4>
              <p class="text-secondary">${hotel.address}, ${hotel.city}, ${hotel.country}</p>
            </div>
          </div>
        </div>

        <div class="col-12 col-lg-5">
          <div class="card border-1 shadow-lg rounded-4 h-100">
            <div class="card-body">
              <h3 class="h5 mb-3">Hotel policies</h3>
              <ul class="list-unstyled">
                <li class="mb-2"><b>Check-in:</b> ${hotel.policies.checkIn}</li>
                <li class="mb-2"><b>Check-out:</b> ${hotel.policies.checkOut}</li>
                <li class="mb-2"><b>Pets:</b> ${hotel.policies.pets}</li>
                <li class="mb-2"><b>Smoking:</b> ${hotel.policies.smoking}</li>
                <li class="mb-0"><b>Children:</b> ${hotel.policies.children}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div class="card border-1 shadow-sm rounded-4 mt-4">
        <div class="card-body">
          <div class="row g-3 small">
            <div class="col-6 col-md-3">
              <span class="text-secondary d-block">Check-in</span>
              <strong>${bookingDraft.reservationData.checkInDate || "-"}</strong>
            </div>
            <div class="col-6 col-md-3">
              <span class="text-secondary d-block">Check-out</span>
              <strong>${bookingDraft.reservationData.checkOutDate || "-"}</strong>
            </div>
            <div class="col-6 col-md-3">
              <span class="text-secondary d-block">Guests</span>
              <strong>${bookingDraft.reservationData.guestCount}</strong>
            </div>
            <div class="col-6 col-md-3">
              <span class="text-secondary d-block">Nights</span>
              <b>${nights}</b>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;

  document
    .getElementById("topBookNowBtn")
    .addEventListener("click", function () {
      renderRoomSelection(hotel, bookingDraft);
    });
}

function renderRoomSelection(hotel, bookingDraft) {
  const section = document.getElementById("roomSelectionSection");
  const nights = calculateNightCount(
    bookingDraft.reservationData.checkInDate,
    bookingDraft.reservationData.checkOutDate
    );

  section.classList.remove("d-none");

  section.innerHTML = `
    <section class="card border-1 shadow-lg rounded-4">
      <div class="card-body">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h3 class="h4 mb-0">Room selection</h3>
          <span class="text-secondary small">${nights} night(s)</span>
        </div>

        <p id="roomSelectionError" class="text-danger small mb-3"></p>

        <div class="vstack gap-3">
          ${hotel.rooms.map(function (room, index) {
            return `
              <label class="card border rounded-4 p-3 room-option-label">
                <div class="d-flex flex-column flex-lg-row justify-content-between gap-3">
                  <div>
                    <div class="form-check">
                      <input
                        class="form-check-input room-type-radio"
                        type="radio"
                        name="roomType"
                        id="roomType${index}"
                        value="${room.type}"
                        data-price="${room.price}"
                      >
                      <span class="fw-semibold">${room.type}</span>
                    </div>
                    <div class="small text-secondary mt-2">
                      Fits ${room.guests} guest(s) · ${room.refundable ? "Free cancellation" : "Non-refundable"}
                    </div>
                  </div>

                  <div class="text-lg-end">
                    <div class="fw-semibold">$${room.price} / night</div>
                  </div>
                </div>
              </label>
            `;
          }).join("")}
        </div>

        <div class="row g-3 mt-3 align-items-end">
          <div class="col-12 col-md-4">
            <label for="roomCountSelect" class="form-label fw-semibold">Room count</label>
            <select id="roomCountSelect" class="form-select">
              <option value="1">1 Room</option>
              <option value="2">2 Rooms</option>
              <option value="3">3 Rooms</option>
            </select>
          </div>

          <div class="col-12 col-md-4">
            <div class="card bg-light border-0 rounded-4 h-100">
              <div class="card-body">
                <span class="text-secondary d-block">Estimated total</span>
                <b id="estimatedTotal">$0</b>
              </div>
            </div>
          </div>

          <div class="col-12 col-md-4 d-grid">
            <button id="roomBookNowBtn" class="btn btn-primary btn-lg">Book now</button>
          </div>
        </div>
      </div>
    </section>
  `;

  const roomCountSelect = document.getElementById("roomCountSelect");
  const roomRadios = document.querySelectorAll(".room-type-radio");
  const estimatedTotal = document.getElementById("estimatedTotal");

  if (bookingDraft.reservationData.roomCount) {
    roomCountSelect.value = String(bookingDraft.reservationData.roomCount);
  }

  roomRadios.forEach(function (radio) {
    if (radio.value === bookingDraft.reservationData.roomType) {
      radio.checked = true;
    }

    radio.addEventListener("change", updateEstimatedTotal);
  });

  roomCountSelect.addEventListener("change", updateEstimatedTotal);

  updateEstimatedTotal();

  document
    .getElementById("roomBookNowBtn")
    .addEventListener("click", function () {
      proceedToPayment(hotel, bookingDraft, nights);
    });

  function updateEstimatedTotal() {
    const selectedRoom = document.querySelector(".room-type-radio:checked");
    const selectedRoomCount = Number(roomCountSelect.value);

    if (!selectedRoom || !selectedRoomCount) {
      estimatedTotal.textContent = "$0";
      return;
    }

    const pricePerNight = Number(selectedRoom.dataset.price);
    const total = calculateTotalAmount(pricePerNight, selectedRoomCount, nights);

    estimatedTotal.textContent = "$" + total;
  }
}

function proceedToPayment(hotel, bookingDraft, nights) {
  const errorElement = document.getElementById("roomSelectionError");
  const selectedRoom = document.querySelector(".room-type-radio:checked");
  const roomCount = Number(document.getElementById("roomCountSelect").value);

  errorElement.textContent = "";

  if (!selectedRoom) {
    errorElement.textContent = "Please select a room type.";
    return;
  }

  if (!roomCount) {
    errorElement.textContent = "Please select room count.";
    return;
  }

  const updatedDraft = {
    ...bookingDraft,
    hotel: {
      ...bookingDraft.hotel,
      name: hotel.name,
      address: hotel.address
    },
    reservationData: {
      ...bookingDraft.reservationData,
      roomCount: roomCount,
      roomType: selectedRoom.value,
      totalAmount: calculateTotalAmount(
        Number(selectedRoom.dataset.price),
        roomCount,
        nights
      )
    }
  };

  saveSession(STORAGE_KEYS.BOOKING_DRAFT, updatedDraft);
  window.location.href = "payment.html";
}