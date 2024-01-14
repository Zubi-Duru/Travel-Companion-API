const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    lowercase: true,
  },
  password: { type: String, required: true },
  homeLocation: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
    },
    coordinates: {
      type: [Number],
      required: true,
    },
    address: { type: String, required: true },
  },
  destinationLocation: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
    },
    coordinates: {
      type: [Number],
      required: true,
    },
    address: { type: String, required: true },
  },
  travelDate: { type: Date, required: true },
  age: { type: Number, required: true },
  sex: { type: String, enum: ["Male", "Female", "Non-Binary"] },
  interests: {
    type: [
      {
        type: String,
        enum: [
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
          "Photography","Nature","Science"
        ],
      },
    ],
    validate: [
      {
        validator: function (interests) {
          return interests.length >= 3;
        },
        message: "At least 3 interests are required.",
      },
      {
        validator: function (interests) {
          return interests.length <= 5;
        },
        message: "No more than 5 interests are allowed.",
      },
    ],
    default: [],
  },
  about: { type: String },
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  pendingFriends: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

// Index the geospatial fields for better performance
userSchema.index({
  "homeLocation.coordinates": "2dsphere",
  "destinationLocation.coordinates": "2dsphere",
});

userSchema.statics.Empty = async function () {
  await this.deleteMany({});
  console.log("emptied users");
};

const User = model("User", userSchema);

exports.User = User;
