const usersData = [];

// Coordinates for Tower Eiffel, Paris
const eiffelTowerCoords = {
  type: "Point",
  coordinates: [2.294351, 48.858844], // Longitude, Latitude
};

// Enum of interests
const interestsEnum = [
  "Hiking",
  "Education",
  "Sport",
  "Travelling",
  "Art",
  "Beach",
  "Music",
  "Party",
  "Technology",
  "History & Culture",
  "Adventure Seeker",
  "Photography",
];

// Generate a random date within a given range
const randomDate = (start, end) => {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
};

// Generate user data
for (let i = 0; i < 20; i++) {
  const isTravelingToParis = i < 16;
  const travelDate = isTravelingToParis
    ? randomDate(new Date(), new Date(Date.now() + 7 * 24 * 60 * 60 * 1000))
    : null;

  const user = {
    username: `user${i}`,
    email: `user${i}@example.com`,
    password: "password123",
    homeLocation: {
      type: "Point",
      coordinates: [Math.random() * 2 - 1, Math.random() * 2 - 1], // Random coordinates
    },
    destinationLocation: isTravelingToParis ? eiffelTowerCoords : null,
    travelDate: travelDate,
    age: Math.floor(Math.random() * 20) + 20, // Random age between 20 and 39
    sex: Math.random() < 0.5 ? "Male" : "Female", // Randomly assign Male or Female
    interests: isTravelingToParis
      ? [interestsEnum[Math.floor(Math.random() * interestsEnum.length)]]
      : [],
    about: `I'm user ${i}, traveling to Paris!`,
    friends: [],
    pendingFriends: [],
  };

  usersData.push(user);
}

console.log(usersData);
[
  {
    "username": "user0",
    "email": "user0@example.com",
    "password": "password123",
    "homeLocation": { "type": "Point", "coordinates": [48.858844, 2.29435], "address": "Paris, France" },
    "destinationLocation": { "type": "Point", "coordinates": [48.858844, 2.29435], "address": "Paris, France" },
    "travelDate": "2024-01-19T11:08:32.397Z",
    "age": 35,
    "sex": "Female",
    "interests": ["Travelling", "History & Culture","Art"],
    "about": "I'm user 0, traveling to Paris!",
    "friends": [],
    "pendingFriends": []
  },
  {
    "username": "user1",
    "email": "user1@example.com",
    "password": "password123",
    "homeLocation": { "type": "Point", "coordinates": [48.858844, 2.29435], "address": "Paris, France" },
    "destinationLocation": { "type": "Point", "coordinates": [48.858844, 2.29435], "address": "Paris, France" },
    "travelDate": "2024-01-18T03:55:35.898Z",
    "age": 31,
    "sex": "Female",
    "interests": ["Party", "Music", "Travelling"],
    "about": "I'm user 1, traveling to Paris!",
    "friends": [],
    "pendingFriends": []
  },
  {
    "username": "user2",
    "email": "user2@example.com",
    "password": "password123",
    "homeLocation": { "type": "Point", "coordinates": [48.858844, 2.29435], "address": "Paris, France" },
    "destinationLocation": { "type": "Point", "coordinates": [48.858844, 2.29435], "address": "Paris, France" },
    "travelDate": "2024-01-18T16:51:48.330Z",
    "age": 38,
    "sex": "Male",
    "interests": ["History & Culture", "Technology", "Science"],
    "about": "I'm user 2, traveling to Paris!",
    "friends": [],
    "pendingFriends": []
  },
  {
    "username": "user3",
    "email": "user3@example.com",
    "password": "password123",
    "homeLocation": { "type": "Point", "coordinates": [48.858844, 2.29435], "address": "Paris, France" },
    "destinationLocation": { "type": "Point", "coordinates": [48.858844, 2.29435], "address": "Paris, France" },
    "travelDate": "2024-01-19T18:22:57.758Z",
    "age": 34,
    "sex": "Female",
    "interests": ["Adventure Seeker", "Hiking", "Nature"],
    "about": "I'm user 3, traveling to Paris!",
    "friends": [],
    "pendingFriends": []
  },
  {
    "username": "user4",
    "email": "user4@example.com",
    "password": "password123",
    "homeLocation": { "type": "Point", "coordinates": [48.858844, 2.29435], "address": "Paris, France" },
    "destinationLocation": { "type": "Point", "coordinates": [48.858844, 2.29435], "address": "Paris, France" },
    "travelDate": "2024-01-18T06:08:55.170Z",
    "age": 27,
    "sex": "Male",
    "interests": ["Beach", "Sport", "Technology"],
    "about": "I'm user 4, traveling to Paris!",
    "friends": [],
    "pendingFriends": []
  },
  {
    "username": "user5",
    "email": "user5@example.com",
    "password": "password123",
    "homeLocation": { "type": "Point", "coordinates": [48.858844, 2.29435], "address": "Paris, France" },
    "destinationLocation": { "type": "Point", "coordinates": [48.858844, 2.29435], "address": "Paris, France" },
    "travelDate": "2024-01-14T16:06:38.171Z",
    "age": 36,
    "sex": "Male",
    "interests": ["Education", "Photography", "Education"],
    "about": "I'm user 5, traveling to Paris!",
    "friends": [],
    "pendingFriends": []
  },
  {
    "username": "user6",
    "email": "user6@example.com",
    "password": "password123",
    "homeLocation": { "type": "Point", "coordinates": [48.858844, 2.29435], "address": "Paris, France" },
    "destinationLocation": { "type": "Point", "coordinates": [48.858844, 2.29435], "address": "Paris, France" },
    "travelDate": "2024-01-20T04:10:45.772Z",
    "age": 29,
    "sex": "Female",
    "interests": ["Hiking", "Nature", "Art"],
    "about": "I'm user 6, traveling to Paris!",
    "friends": [],
    "pendingFriends": []
  },
  {
    "username": "user7",
    "email": "user7@example.com",
    "password": "password123",
    "homeLocation": { "type": "Point", "coordinates": [48.858844, 2.29435], "address": "Paris, France" },
    "destinationLocation": { "type": "Point", "coordinates": [48.858844, 2.29435], "address": "Paris, France" },
    "travelDate": "2024-01-14T00:53:51.067Z",
    "age": 37,
    "sex": "Male",
    "interests": ["Hiking", "Music", "Adventure Seeker"],
    "about": "I'm user 7, traveling to Paris!",
    "friends": [],
    "pendingFriends": []
  },
  {
    "username": "user8",
    "email": "user8@example.com",
    "password": "password123",
    "homeLocation": { "type": "Point", "coordinates": [48.858844, 2.29435], "address": "Paris, France" },
    "destinationLocation": { "type": "Point", "coordinates": [48.858844, 2.29435], "address": "Paris, France" },
    "travelDate": "2024-01-14T11:33:25.011Z",
    "age": 33,
    "sex": "Male",
    "interests": ["Sport", "Education", "Technology"],
    "about": "I'm user 8, traveling to Paris!",
    "friends": [],
    "pendingFriends": []
  },
  {
    "username": "user9",
    "email": "user9@example.com",
    "password": "password123",
    "homeLocation": { "type": "Point", "coordinates": [48.858844, 2.29435], "address": "Paris, France" },
    "destinationLocation": { "type": "Point", "coordinates": [48.858844, 2.29435], "address": "Paris, France" },
    "travelDate": "2024-01-16T22:47:12.673Z",
    "age": 22,
    "sex": "Female",
    "interests": ["History & Culture", "Travelling", "Art"],
    "about": "I'm user 9, traveling to Paris!",
    "friends": [],
    "pendingFriends": []
  },
  {
    "username": "user10",
    "email": "user10@example.com",
    "password": "password123",
    "homeLocation": { "type": "Point", "coordinates": [48.858844, 2.29435], "address": "Paris, France" },
    "destinationLocation": { "type": "Point", "coordinates": [48.858844, 2.29435], "address": "Paris, France" },
    "travelDate": "2024-01-19T00:01:12.127Z",
    "age": 20,
    "sex": "Female",
    "interests": ["Party", "Music", "Adventure Seeker"],
    "about": "I'm user 10, traveling to Paris!",
    "friends": [],
    "pendingFriends": []
  },
  {
    "username": "user11",
    "email": "user11@example.com",
    "password": "password123",
    "homeLocation": { "type": "Point", "coordinates": [48.858844, 2.29435], "address": "Paris, France" },
    "destinationLocation": { "type": "Point", "coordinates": [48.858844, 2.29435], "address": "Paris, France" },
    "travelDate": "2024-01-16T01:47:34.745Z",
    "age": 22,
    "sex": "Female",
    "interests": ["Photography", "Art", "Nature"],
    "about": "I'm user 11, traveling to Paris!",
    "friends": [],
    "pendingFriends": []
  },
  {
    "username": "user12",
    "email": "user12@example.com",
    "password": "password123",
    "homeLocation": { "type": "Point", "coordinates": [48.858844, 2.29435], "address": "Paris, France" },
    "destinationLocation": { "type": "Point", "coordinates": [48.858844, 2.29435], "address": "Paris, France" },
    "travelDate": "2024-01-16T14:45:59.045Z",
    "age": 37,
    "sex": "Female",
    "interests": ["Adventure Seeker", "Hiking", "Nature"],
    "about": "I'm user 12, traveling to Paris!",
    "friends": [],
    "pendingFriends": []
  },
  {
    "username": "user13",
    "email": "user13@example.com",
    "password": "password123",
    "homeLocation": { "type": "Point", "coordinates": [48.858844, 2.29435], "address": "Paris, France" },
    "destinationLocation": { "type": "Point", "coordinates": [48.858844, 2.29435], "address": "Paris, France" },
    "travelDate": "2024-01-15T02:30:35.463Z",
    "age": 38,
    "sex": "Female",
    "interests": ["Technology", "Science", "Education"],
    "about": "I'm user 13, traveling to Paris!",
    "friends": [],
    "pendingFriends": []
  },
  {
    "username": "user14",
    "email": "user14@example.com",
    "password": "password123",
    "homeLocation": { "type": "Point", "coordinates": [48.858844, 2.29435], "address": "Paris, France" },
    "destinationLocation": { "type": "Point", "coordinates": [48.858844, 2.29435], "address": "Paris, France" },
    "travelDate": "2024-01-19T18:34:59.975Z",
    "age": 34,
    "sex": "Male",
    "interests": ["Sport", "Music", "Travelling"],
    "about": "I'm user 14, traveling to Paris!",
    "friends": [],
    "pendingFriends": []
  },
  {
    "username": "user15",
    "email": "user15@example.com",
    "password": "password123",
    "homeLocation": { "type": "Point", "coordinates": [48.858844, 2.29435], "address": "Paris, France" },
    "destinationLocation": { "type": "Point", "coordinates": [48.858844, 2.29435], "address": "Paris, France" },
    "travelDate": "2024-01-16T08:30:51.108Z",
    "age": 37,
    "sex": "Male",
    "interests": ["Education", "Sport", "Science"],
    "about": "I'm user 15, traveling to Paris!",
    "friends": [],
    "pendingFriends": []
  },{
    "username": "user16",
    "email": "user16@example.com",
    "password": "password123",
    "homeLocation": { "type": "Point", "coordinates": [48.8588448, 2.2943506], "address": "Paris, France" },
    "destinationLocation": { "type": "Point", "coordinates": [48.8588448, 2.2943506], "address": "Paris, France" },
    "travelDate": "2024-01-17T12:30:00.000Z",
    "age": 37,
    "sex": "Male",
    "interests": ["Technology", "Photography", "Adventure Seeker"],
    "about": "I'm user 16, traveling to Paris!",
    "friends": [],
    "pendingFriends": []
  },
  {
    "username": "user17",
    "email": "user17@example.com",
    "password": "password123",
    "homeLocation": { "type": "Point", "coordinates": [48.8588448, 2.2943506], "address": "Paris, France" },
    "destinationLocation": { "type": "Point", "coordinates": [48.8588448, 2.2943506], "address": "Paris, France" },
    "travelDate": "2024-01-16T15:45:00.000Z",
    "age": 28,
    "sex": "Male",
    "interests": ["Sport", "Hiking", "Party"],
    "about": "I'm user 17, traveling to Paris!",
    "friends": [],
    "pendingFriends": []
  },
  {
    "username": "user18",
    "email": "user18@example.com",
    "password": "password123",
    "homeLocation": { "type": "Point", "coordinates": [48.8588448, 2.2943506], "address": "Paris, France" },
    "destinationLocation": { "type": "Point", "coordinates": [48.8588448, 2.2943506], "address": "Paris, France" },
    "travelDate": "2024-01-15T09:20:00.000Z",
    "age": 27,
    "sex": "Male",
    "interests": ["Education", "History & Culture", "Beach"],
    "about": "I'm user 18, traveling to Paris!",
    "friends": [],
    "pendingFriends": []
  },
  {
    "username": "user19",
    "email": "user19@example.com",
    "password": "password123",
    "homeLocation": { "type": "Point", "coordinates": [48.8588448, 2.2943506], "address": "Paris, France" },
    "destinationLocation": { "type": "Point", "coordinates": [48.8588448, 2.2943506], "address": "Paris, France" },
    "travelDate": "2024-01-14T18:10:00.000Z",
    "age": 36,
    "sex": "Male",
    "interests": ["Adventure Seeker", "Hiking", "Photography"],
    "about": "I'm user 19, traveling to Paris!",
    "friends": [],
    "pendingFriends": []
  }
  ]
  
