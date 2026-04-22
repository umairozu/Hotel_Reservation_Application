
const APP_DATA = {
  hotels: [
    {
      id: 1,
      name: "Lara Beach Resort",
      city: "Antalya",
      country: "Türkiye",
      address: "Lara Cd. No: 24, Antalya",
      stars: 5,
      rating: 8.9,
      reviewCount: 1245,
      pricePerNight: 210,
      currency: "USD",
      description: "Beachfront family resort with pools, spa, and all-inclusive options.",
      images: [
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=1200&q=80"
      ],
      policies: {
        checkIn: "14:00",
        checkOut: "12:00",
        pets: "Not allowed",
        smoking: "Non-smoking rooms",
        children: "Children are welcome"
      },
      rooms: [
        { type: "Standard Room", guests: 2, price: 210, refundable: true },
        { type: "Deluxe Sea View", guests: 3, price: 280, refundable: false }
      ]
    },
    {
      id: 2,
      name: "Kaleici Boutique Hotel",
      city: "Antalya",
      country: "Türkiye",
      address: "Old Town Center, Antalya",
      stars: 4,
      rating: 8.4,
      reviewCount: 640,
      pricePerNight: 135,
      currency: "USD",
      description: "Cozy boutique stay in Antalya old town close to marina and restaurants.",
      images: [
        "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1522798514-97ceb8c4f1c8?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80"
      ],
      policies: {
        checkIn: "14:00",
        checkOut: "11:00",
        pets: "Not allowed",
        smoking: "No smoking in rooms",
        children: "Children over 6 accepted"
      },
      rooms: [
        { type: "Economy Room", guests: 2, price: 135, refundable: true },
        { type: "Superior Room", guests: 2, price: 165, refundable: true }
      ]
    },
    {
      id: 3,
      name: "Konyaalti Sea Hotel",
      city: "Antalya",
      country: "Türkiye",
      address: "Konyaalti Sahil Yolu, Antalya",
      stars: 4,
      rating: 8.6,
      reviewCount: 782,
      pricePerNight: 155,
      currency: "USD",
      description: "Modern hotel near Konyaalti beach with rooftop breakfast and city views.",
      images: [
        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1549294413-26f195200c16?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1455587734955-081b22074882?auto=format&fit=crop&w=1200&q=80"
      ],
      policies: {
        checkIn: "15:00",
        checkOut: "12:00",
        pets: "Allowed on request",
        smoking: "Dedicated smoking areas only",
        children: "Children are welcome"
      },
      rooms: [
        { type: "City Room", guests: 2, price: 155, refundable: true },
        { type: "Sea View Suite", guests: 4, price: 245, refundable: false }
      ]
    },
    {
      id: 4,
      name: "Antalya Garden Suites",
      city: "Antalya",
      country: "Türkiye",
      address: "Guzeloba Mah., Antalya",
      stars: 4,
      rating: 8.2,
      reviewCount: 419,
      pricePerNight: 148,
      currency: "USD",
      description: "Comfortable suites with garden access, ideal for longer family stays.",
      images: [
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1505692952047-1a78307da8f2?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80"
      ],
      policies: {
        checkIn: "14:00",
        checkOut: "11:30",
        pets: "Not allowed",
        smoking: "Non-smoking property",
        children: "Children are welcome"
      },
      rooms: [
        { type: "Garden Suite", guests: 3, price: 148, refundable: true },
        { type: "Family Suite", guests: 5, price: 235, refundable: true }
      ]
    },
    {
      id: 5,
      name: "Bodrum Blue Marina",
      city: "Bodrum",
      country: "Türkiye",
      address: "Marina District, Mugla",
      stars: 5,
      rating: 9.1,
      reviewCount: 987,
      pricePerNight: 265,
      currency: "USD",
      description: "Elegant marina hotel with sea-view rooms and sunset terrace dining.",
      images: [
        "https://images.unsplash.com/photo-1501117716987-c8e1ecb210f0?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1522798514-97ceb8c4f1c8?auto=format&fit=crop&w=1200&q=80"
      ],
      policies: {
        checkIn: "14:00",
        checkOut: "12:00",
        pets: "Not allowed",
        smoking: "No smoking in rooms",
        children: "Children are welcome"
      },
      rooms: [
        { type: "Marina Room", guests: 2, price: 265, refundable: false },
        { type: "Premium Suite", guests: 4, price: 360, refundable: true }
      ]
    },
    {
      id: 6,
      name: "Fethiye Coast Hotel",
      city: "Fethiye",
      country: "Türkiye",
      address: "Calis Beach, Mugla",
      stars: 4,
      rating: 8.7,
      reviewCount: 566,
      pricePerNight: 175,
      currency: "USD",
      description: "Relaxed seaside hotel close to beaches, boat tours, and promenade cafés.",
      images: [
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80"
      ],
      policies: {
        checkIn: "14:00",
        checkOut: "12:00",
        pets: "Allowed on request",
        smoking: "Dedicated smoking areas",
        children: "Children are welcome"
      },
      rooms: [
        { type: "Standard Room", guests: 2, price: 175, refundable: true },
        { type: "Family Room", guests: 4, price: 245, refundable: true }
      ]
    },
    {
      id: 7,
      name: "Cappadocia Cave Suites",
      city: "Cappadocia",
      country: "Türkiye",
      address: "Goreme Center, Nevsehir",
      stars: 5,
      rating: 9.3,
      reviewCount: 1120,
      pricePerNight: 295,
      currency: "USD",
      description: "Unique cave-style suites with valley views and breakfast terrace.",
      images: [
        "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1468824357306-a439d58ccb1c?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80"
      ],
      policies: {
        checkIn: "14:00",
        checkOut: "11:00",
        pets: "Not allowed",
        smoking: "Non-smoking rooms",
        children: "Children are welcome"
      },
      rooms: [
        { type: "Stone Room", guests: 2, price: 295, refundable: true },
        { type: "Cave Suite", guests: 3, price: 355, refundable: false }
      ]
    },
    {
      id: 8,
      name: "Kyrenia Harbor Hotel",
      city: "Kyrenia",
      country: "Northern Cyprus",
      address: "Old Harbor, Kyrenia",
      stars: 4,
      rating: 8.5,
      reviewCount: 501,
      pricePerNight: 160,
      currency: "USD",
      description: "Harbor-front hotel with easy access to cafés, shops, and castle views.",
      images: [
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1521783988139-89397d761dce?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=1200&q=80"
      ],
      policies: {
        checkIn: "14:00",
        checkOut: "12:00",
        pets: "Not allowed",
        smoking: "No smoking in rooms",
        children: "Children are welcome"
      },
      rooms: [
        { type: "Harbor Room", guests: 2, price: 160, refundable: true },
        { type: "Junior Suite", guests: 3, price: 225, refundable: true }
      ]
    }
  ],

  deals: [
    {
      id: 1,
      title: "Early Booking Discount",
      details: "Book at least 21 days ahead and save up to 18% on selected coastal hotels.",
      imageUrl: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: 2,
      title: "Family Summer Deal",
      details: "Free breakfast and one complimentary room upgrade for family reservations.",
      imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: 3,
      title: "Romantic Escape",
      details: "Late checkout and welcome drink package in boutique and cave hotels.",
      imageUrl: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: 4,
      title: "Weekend City Break",
      details: "Stay 2 nights and get reduced rates at selected city-center properties.",
      imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: 5,
      title: "Business Traveler Plus",
      details: "Enjoy high-speed Wi-Fi and complimentary laundry service for stays over 3 nights.",
      imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: 7,
      title: "Pet-Friendly Getaway",
      details: "No extra fees for pets and a welcome kit including treats and a cozy bed.",
      imageUrl: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=1200&q=80"
    },
  ],

  popularSearches: [
    {
      id: 1,
      title: "Antalya",
      query: "Antalya",
      hotelCount: 4,
      averagePrice: 162,
      imageUrl: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: 2,
      title: "Mugla",
      query: "Mugla",
      hotelCount: 2,
      averagePrice: 220,
      imageUrl: "https://images.unsplash.com/photo-1455587734955-081b22074882?auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: 3,
      title: "Cappadocia",
      query: "Cappadocia",
      hotelCount: 1,
      averagePrice: 295,
      imageUrl: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: 4,
      title: "Kyrenia",
      query: "Kyrenia",
      hotelCount: 1,
      averagePrice: 160,
      imageUrl: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: 5,
      title: "Istanbul",
      query: "Istanbul",
      hotelCount: 1,
      averagePrice: 200,
      imageUrl: "http://pix2.agoda.net/hotelimages/1/-1/0ff4876f93688b8adcbed487b5a2175d.jpg?s=312x"
    },
    {
      id: 6,
      title: "Van",
      query: "Van",
      hotelCount: 5,
      averagePrice: 50,
      imageUrl: "http://pix1.agoda.net/hotelimages/1/-1/d821f80943f96ebda33f5a019fa94df4.jpg?s=312x"
    },
    {
      id: 7,
      title: "Izmir",
      query: "Izmir",
      hotelCount: 2,
      averagePrice: 300,
      imageUrl: "http://pix4.agoda.net/hotelimages/1/-1/59241704e99027895aa6293d734c9fb1.jpg?s=312x"
    },
    {
      id: 8,
      title: "Yeni Sehir",
      query: "Yeni Sehir",
      hotelCount: 2,
      averagePrice: 200,
      imageUrl: "http://pix5.agoda.net/hotelimages/1/-1/fce5d70fac02fcb7aa25f31dd25850a8.jpg?s=312x"
    }
  ]
};