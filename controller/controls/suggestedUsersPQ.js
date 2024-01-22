
const { User } = require("../../models/userModel.js");
const PriorityQueue = require("fastpriorityqueue");

const getRelatedUsers = async (req, res) => {
  const currentUserId = req.user._id;

  const lat = Number(parseFloat(req.query.lat).toFixed(2));
  const lng = Number(parseFloat(req.query.lng).toFixed(2));

  if (isNaN(lat) || isNaN(lng) || !isFinite(lat) || !isFinite(lng)) {
    return res.status(400).json({ error: "Invalid lat/lng values" });
  }
  const currentUser = await User.findById(currentUserId);

  if (!currentUser) {
    return res.status(404).json({ error: "User not found" });
  }

  const usersWithinRadius = await User.aggregate([
    {
      $geoNear: {
        near: currentUser.homeLocation.coordinates,
        distanceField: "distance",
        maxDistance: 100000, // 100 kilometers in meters
        spherical: true,
        key: "homeLocation.coordinates",
        query: {
          _id: { $ne: currentUserId },
          "destinationLocation.coordinates": {
            $geoWithin: {
              $centerSphere: [
                [lng, lat],
                100 / 6371,
              ], // 100 kilometers converted to radians
            },
          },
          travelDate: {
            $gte: new Date(
              currentUser.travelDate.getTime() - 7 * 24 * 60 * 60 * 1000
            ), // 7 days before currentUser.travelDate
            $lte: new Date(
              currentUser.travelDate.getTime() + 7 * 24 * 60 * 60 * 1000
            ), // 7 days after currentUser.travelDate
          },
        },
      },
    },
  ]);

  // Rest of the code handling priorityQueue and relatedUsers...
  const priorityQueue = new PriorityQueue((a, b) => a.priority > b.priority);

  usersWithinRadius.forEach((user) => {
    let priority = 0;

    // Calculate priorities based on criteria
    priority +=
      user.interests.filter((interest) =>
        currentUser.interests.includes(interest)
      ).length * 10;

    // Calculate age priority based on ranges
    const ageDifference = Math.abs(user.age - currentUser.age);
    if (ageDifference <= 5 || ageDifference >= 5) {
      priority += 20;
    } else if (ageDifference <= 10 || ageDifference >= 10) {
      priority += 10;
    }

    if (currentUser.relationship == "Single") {
      if (
        (currentUser.sex === "Male" && user.sex === "Female") ||
        (currentUser.sex === "Female" && user.sex === "Male")
      ) {
        priority += 30;
      } else if (currentUser.sex === "Null" || user.sex === "Null") {
        priority += 10;
      } else {
        priority += 0;
      }
    } else {
      if (
        (currentUser.sex === "Male" && user.sex === "Male") ||
        (currentUser.sex === "Female" && user.sex === "Female")
      ) {
        priority += 30;
      } else if (currentUser.sex === "Null" || user.sex === "Null") {
        priority += 10;
      } else {
        priority += 0;
      }
    }

    priorityQueue.add({ user, priority });
  });

  const relatedUsers = [];
  while (!priorityQueue.isEmpty()) {
    const { user } = priorityQueue.poll();
    relatedUsers.push(user);
  }

  res.status(200).json(relatedUsers);
};

exports.getRelatedUsers = getRelatedUsers;
