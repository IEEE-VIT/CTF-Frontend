const markers = [
    {
      "name": "Abu",
      "country": "Japan",
      "type": "Shield",
      "lat": 34.5,
      "lon": 131.6,
      "elevation": 641
    },
    {
      "name": "Acamarachi",
      "country": "Chile",
      "type": "Stratovolcano",
      "lat": -23.3,
      "lon": -67.62,
      "elevation": 6046
    },
    {
      "name": "Acatenango",
      "country": "Guatemala",
      "type": "Stratovolcano",
      "lat": 14.5,
      "lon": -90.88,
      "elevation": 3976
    },
    {
      "name": "Acigöl-Nevsehir",
      "country": "Turkey",
      "type": "Caldera",
      "lat": 38.57,
      "lon": 34.52,
      "elevation": 1689
    },
    {
      "name": "Adams",
      "country": "USA",
      "type": "Stratovolcano",
      "lat": 46.21,
      "lon": -121.49,
      "elevation": 3742
    },
    {
      "name": "Adams Seamount",
      "country": "Pacific Ocean",
      "type": "Submarine",
      "lat": -25.37,
      "lon": -129.27,
      "elevation": -39
    },
    {
      "name": "Adatara",
      "country": "Japan",
      "type": "Stratovolcano",
      "lat": 37.64,
      "lon": 140.29,
      "elevation": 1718
    },
    {
      "name": "Adwa",
      "country": "Ethiopia",
      "type": "Stratovolcano",
      "lat": 10.07,
      "lon": 40.84,
      "elevation": 1733
    },
    {
      "name": "Afderà",
      "country": "Ethiopia",
      "type": "Stratovolcano",
      "lat": 13.08,
      "lon": 40.85,
      "elevation": 1295
    },
    {
      "name": "Agrigan",
      "country": "Mariana Islands",
      "type": "Stratovolcano",
      "lat": 18.77,
      "lon": 145.67,
      "elevation": 965
    },
    {
      "name": "Agua",
      "country": "Guatemala",
      "type": "Stratovolcano",
      "lat": 14.47,
      "lon": -90.74,
      "elevation": 3760
    },
    {
      "name": "Agua de Pau",
      "country": "Azores",
      "type": "Stratovolcano",
      "lat": 37.77,
      "lon": -25.47,
      "elevation": 947
    },
    {
      "name": "Aguilera",
      "country": "Chile",
      "type": "Stratovolcano",
      "lat": -50.33,
      "lon": -73.75,
      "elevation": 2546
    },
    {
      "name": "Agung",
      "country": "Lesser Sunda Islands",
      "type": "Stratovolcano",
      "lat": -8.34,
      "lon": 115.51,
      "elevation": 3142
    },
    {
      "name": "Ahyi",
      "country": "Mariana Islands",
      "type": "Submarine",
      "lat": 20.42,
      "lon": 145.03,
      "elevation": -137
    },
    {
      "name": "Akademia Nauk",
      "country": "Russia",
      "type": "Caldera",
      "lat": 53.98,
      "lon": 159.45,
      "elevation": 1180
    },
    {
      "name": "Akagi",
      "country": "Japan",
      "type": "Stratovolcano",
      "lat": 36.56,
      "lon": 139.2,
      "elevation": 1828
    },
    {
      "name": "Akan",
      "country": "Japan",
      "type": "Caldera",
      "lat": 43.38,
      "lon": 144.01,
      "elevation": 1499
    },
    {
      "name": "Akhtang",
      "country": "Russia",
      "type": "Shield",
      "lat": 55.43,
      "lon": 158.65,
      "elevation": 1956
    },
    {
      "name": "Akita Komagatake",
      "country": "Japan",
      "type": "Stratovolcano",
      "lat": 39.76,
      "lon": 140.8,
      "elevation": 1637
    },
    {
      "name": "Akita Yakeyama",
      "country": "Japan",
      "type": "Stratovolcano",
      "lat": 39.96,
      "lon": 140.76,
      "elevation": 1366
    },
    {
      "name": "Akuseki-jima",
      "country": "Japan",
      "type": "Stratovolcano",
      "lat": 29.46,
      "lon": 129.6,
      "elevation": 584
    },
    {
      "name": "Akutan",
      "country": "USA",
      "type": "Stratovolcano",
      "lat": 54.13,
      "lon": -165.99,
      "elevation": 1303
    },
    {
      "name": "Alaid",
      "country": "Russia",
      "type": "Stratovolcano",
      "lat": 50.86,
      "lon": 155.55,
      "elevation": 2339
    },
    {
      "name": "Alamagan",
      "country": "Mariana Islands",
      "type": "Stratovolcano",
      "lat": 17.6,
      "lon": 145.83,
      "elevation": 744
    },
    {
      "name": "Alayta",
      "country": "Ethiopia",
      "type": "Shield",
      "lat": 12.88,
      "lon": 40.57,
      "elevation": 1501
    },
    {
      "name": "Alban Hills",
      "country": "Italy",
      "type": "Caldera",
      "lat": 41.73,
      "lon": 12.7,
      "elevation": 949
    },
    {
      "name": "Alcedo",
      "country": "Galapagos Islands",
      "type": "Shield",
      "lat": -0.43,
      "lon": -91.12,
      "elevation": 1130
    },
    {
      "name": "Ale Bagu",
      "country": "Ethiopia",
      "type": "Stratovolcano",
      "lat": 13.52,
      "lon": 40.63,
      "elevation": 1031
    },
    {
      "name": "Alid",
      "country": "Eritrea",
      "type": "Stratovolcano",
      "lat": 14.88,
      "lon": 39.92,
      "elevation": 904
    },
    {
      "name": "Altiplano-Puna Volcanic Complex",
      "country": "Multiple Countries",
      "type": "",
      "lat": -22.44,
      "lon": -67.96,
      "elevation": 4600
    },
    {
      "name": "Ambrym",
      "country": "Vanuatu",
      "type": "Shield",
      "lat": -16.25,
      "lon": 168.12,
      "elevation": 1334
    },
    {
      "name": "Anatahan",
      "country": "Mariana Islands",
      "type": "Stratovolcano",
      "lat": 16.35,
      "lon": 145.67,
      "elevation": 790
    },
    {
      "name": "Aneityum",
      "country": "Vanuatu",
      "type": "Stratovolcano",
      "lat": -20.2,
      "lon": 169.78,
      "elevation": 852
    },
    {
      "name": "Aniakchak",
      "country": "USA",
      "type": "Caldera",
      "lat": 56.88,
      "lon": -158.17,
      "elevation": 1341
    },
    {
      "name": "Antisana",
      "country": "Ecuador",
      "type": "Stratovolcano",
      "lat": -0.48,
      "lon": -78.14,
      "elevation": 5753
    },
    {
      "name": "Aoba",
      "country": "Vanuatu",
      "type": "Shield",
      "lat": -15.4,
      "lon": 167.83,
      "elevation": 1496
    },
    {
      "name": "Ararat",
      "country": "Turkey",
      "type": "Stratovolcano",
      "lat": 39.7,
      "lon": 44.3,
      "elevation": 5165
    },
    {
      "name": "Arenal",
      "country": "Costa Rica",
      "type": "Stratovolcano",
      "lat": 10.46,
      "lon": -84.7,
      "elevation": 1670
    },
];