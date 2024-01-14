const { tryCatch } = require("../utils");
const { User } = require("../../models/userModel");
const PriorityQueue = require('fastpriorityqueue');

const getRelatedUsers = async (req, res) => {
  const currentUserId = "65a2f68ea682d3bdbec8425b"; //req.user._id
  const currentUser = await User.findById(currentUserId);

  if (!currentUser) {
    return res.status(404).json({ error: 'User not found' });
  }

  const usersWithinRadius = await User.aggregate([
    {
      $geoNear: {
        near: currentUser.homeLocation.coordinates,
        distanceField: 'distance',
        maxDistance: 100000, // 100 kilometers in meters
        spherical: true,
        key: 'homeLocation.coordinates',
        query: {
          _id: { $ne: currentUserId },
          'destinationLocation.coordinates': {
            $geoWithin: {
              $centerSphere: [currentUser.homeLocation.coordinates, 100 / 6371], // 100 kilometers converted to radians
            },
          },
          travelDate: {
            $gte: new Date(),
            $lte: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
          },
        },
      },
    },
  ]);
  
  // Rest of the code handling priorityQueue and relatedUsers...
  
  const priorityQueue = new PriorityQueue((a, b) => a.priority > b.priority);

  usersWithinRadius.forEach(user => {
    let priority = 0;

    // Calculate priorities based on criteria
    priority += user.interests.filter(interest => currentUser.interests.includes(interest)).length * 10;

    // Calculate age priority based on ranges
    const ageDifference = Math.abs(user.age - currentUser.age);
    if (ageDifference <= 5) {
      priority += 20;
    } else if (ageDifference <= 10) {
      priority += 10;
    }

    if (user.sex === currentUser.sex) {
      priority += 30;
    } else if (user.sex === 'Non-Binary' || currentUser.sex === 'Non-Binary') {
      priority += 0;
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
