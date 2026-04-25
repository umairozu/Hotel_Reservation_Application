

document.addEventListener("DOMContentLoaded", function () {
  initializeSessionData();

  const bookingDraft = getSession(STORAGE_KEYS.BOOKING_DRAFT, null);

  if (!bookingDraft) {
    window.location.href = "hotelDetails.html";
    return;
  }

  renderBookingSummary(bookingDraft);

  const paymentForm = document.getElementById("paymentForm");
  paymentForm.addEventListener("submit", handlePaymentSubmit);
});


function renderBookingSummary(bookingDraft) {
  const summary = document.getElementById("bookingSummary");
  const totalAmount = bookingDraft.reservationData.totalAmount || 0;

  summary.innerHTML = `
    <div class="card border-0 shadow-sm rounded-4">
      <img src="${bookingDraft.hotel.image}" class="card-img-top rounded-top-4" alt="${bookingDraft.hotel.name}">
      <div class="card-body">
        <h2 class="h5 mb-2">${bookingDraft.hotel.name}</h2>
        <p class="text-secondary small mb-3">${bookingDraft.hotel.address}</p>

        <ul class="list-unstyled small mb-3">
          <li class="mb-2"><b>Check-in:</b> ${bookingDraft.reservationData.checkInDate}</li>
          <li class="mb-2"><b>Check-out:</b> ${bookingDraft.reservationData.checkOutDate}</li>
          <li class="mb-2"><b>Guests:</b> ${bookingDraft.reservationData.guestCount}</li>
          <li class="mb-2"><b>Rooms:</b> ${bookingDraft.reservationData.roomCount}</li>
          <li class="mb-2"><b>Room Type:</b> ${bookingDraft.reservationData.roomType}</li>
        </ul>

        <div class="border-top pt-3">
          <span class="text-secondary small d-block">Total Amount</span>
          <b class="fs-5">$${totalAmount}</b>
        </div>
      </div>
    </div>
  `;
}

function handlePaymentSubmit(event) {
  event.preventDefault();

  const bookingDraft = getSession(STORAGE_KEYS.BOOKING_DRAFT, null);
  const errorElement = document.getElementById("paymentError");

  errorElement.textContent = "";

  const formData = collectPaymentFormData();
  const validationMessage = validatePaymentFormData(formData);

  if (validationMessage) {
    errorElement.textContent = validationMessage;
    return;
  }

  const reservation = {
    hotel: {
      name: bookingDraft.hotel.name,
      address: bookingDraft.hotel.address
    },
    reservationData: {
      roomCount: bookingDraft.reservationData.roomCount,
      guestCount: bookingDraft.reservationData.guestCount,
      roomType: bookingDraft.reservationData.roomType,
      checkInDate: bookingDraft.reservationData.checkInDate,
      checkOutDate: bookingDraft.reservationData.checkOutDate
    },
    guestData: {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone
    },
    paymentInformation: {
      cardInfo: {
        cardNumber: formData.cardNumber,
        cardHolder: formData.cardHolder,
        expiryDate: formData.expiryDate,
        cvv: formData.cvv
      },
      paymentMethod: formData.paymentMethod,
      totalAmount: bookingDraft.reservationData.totalAmount || 0
    }
  };

  saveSession(STORAGE_KEYS.RESERVATION, reservation);

  clearPaymentForm();
  alert("Booking completed successfully.");
}

function collectPaymentFormData() {
  return {
    firstName: document.getElementById("firstName").value.trim(),
    lastName: document.getElementById("lastName").value.trim(),
    email: document.getElementById("email").value.trim(),
    phone: document.getElementById("phone").value.trim(),
    cardHolder: document.getElementById("cardHolder").value.trim(),
    cardNumber: document.getElementById("cardNumber").value.trim(),
    expiryDate: document.getElementById("expiryDate").value.trim(),
    cvv: document.getElementById("cvv").value.trim(),
  };
}

function validatePaymentFormData(formData) {
  const cardNumberClean = formData.cardNumber.replace(/\s+/g, "");
  const phoneClean = formData.phone.replace(/\s+/g, "");

  if (!formData.firstName) return "First name is required.";
  if (!formData.lastName) return "Last name is required.";
  if (!formData.email) return "Email is required.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return "Please enter a valid email address.";
  if (!formData.phone) return "Phone number is required.";
  if (phoneClean.length < 10) return "Please enter a valid phone number.";
  if (!formData.cardHolder) return "Card holder name is required.";
  if (!/^\d{16}$/.test(cardNumberClean)) return "Card number must contain 16 digits.";
  if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate)) return "Expiry date must be in MM/YY format.";
  if (!/^\d{3,4}$/.test(formData.cvv)) return "CVV must be 3 or 4 digits.";
  return "";
}

function clearPaymentForm() {
  document.getElementById("paymentForm").reset();
  document.getElementById("paymentError").textContent = "";
}