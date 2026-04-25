# Misafir at Ease

Misafir at Ease is a simple hotel reservation application built with HTML, CSS, Bootstrap, and JavaScript.

It lets users search for hotels, view available results, check hotel details, select a room, and complete a booking using a payment form.

## What’s Built

- Home page with a hotel search form
- Deals and discounts section
- Popular searches carousel
- Search results page with hotel cards
- Hotel details page with hotel information, photos, policies, and room selection
- Payment page with guest and card information form
- Reservation data saved with `sessionStorage`
- Responsive layout using Bootstrap

## Pages

- `index.html`  
  Main page with search, deals, and popular destinations.

- `searchResults.html`  
  Displays hotels based on the user’s search.

- `hotelDetails.html`  
  Shows selected hotel details and available room options.

- `payment.html`  
  Allows the user to complete the reservation.

## Built With

- HTML
- CSS
- JavaScript
- Bootstrap
- SessionStorage

## Folder Structure

```text
Hotel_Reservation_Application/
│
├── index.html
├── searchResults.html
├── hotelDetails.html
├── payment.html
│
├── css/
│   └── style.css
│
├── js/
│   ├── data.js
│   ├── storage.js
│   ├── index.js
│   ├── searchResults.js
│   ├── hotelDetails.js
│   └── payment.js
│
└── json/
    └── MOCK_DATA.json
