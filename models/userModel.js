const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  facebookId:String,
  googleId:String,
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    lowercase: true,
  },
  password: { type: String },
  homeLocation: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
    },
    coordinates: {
      type: [Number],
    },
    address: { type: String},
  },
  destinationLocation: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
    },
    coordinates: {
      type: [Number],
    },
    address: { type: String },
  },
  travelDate: { type: Date},
  age: { type: Number },
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
          "Photography",
          "Nature",
          "Science",
        ],
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

userSchema.methods.verifyPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    try {
      const hashedPassword = await bcrypt.hash(this.password, 10);
      this.password = hashedPassword;
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

userSchema.statics.Empty = async function () {
  await this.deleteMany({});
  console.log("emptied users");
};

const User = model("User", userSchema);

exports.User = User;
