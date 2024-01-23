const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const { User } = require("../../models/userModel");

passport.use(
  new LocalStrategy(
    { usernameField: "email", passReqToCallback: true },
    async (req, email, password, done) => {
      try {
        // Check if user with the provided email exists
        let user = await User.findOne({ email });

        // If user does not exist, create a new one
        if (!user) {
          const newUser = new User({
            username: req.body.username, // Include username from the request
            email,
            password, // Hash the password
          });

          user = await newUser.save();
          return done(null, user);
        } else if (user) {
          const isCorrectPassword = await user.verifyPassword(password);
          // If the password is incorrect, return an error
          if (!isCorrectPassword) {
            return done(null, false, {
              message: "Incorrect email or password",
            });
          } else {
            return done(null, user);
          }
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URI,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if user with Google ID exists, if not create one
        const user = await User.findOne({ googleId: profile.id });

        if (user) {
          return done(null, user);
        }

        const newUser = new User({
          username: profile.displayName,
          email: profile.emails[0].value, // Include email from Google profile
          googleId: profile.id,
        });

        await newUser.save();
        return done(null, newUser);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK_URI,
      profileFields: ["id", "displayName", "emails"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if user with Facebook ID exists, if not create one
        const user = await User.findOne({ facebookId: profile.id });

        if (user) {
          return done(null, user);
        }

        const newUser = new User({
          username: profile.displayName,
          email: profile.emails[0].value, // Include email from Facebook profile
          facebookId: profile.id,
        });

        await newUser.save();
        return done(null, newUser);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  console.log(user, "hiii");
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  (req, res) => {
    try {
      // Generate a JWT token upon successful local authentication
      const token = jwt.sign({ userId: req.user.id }, process.env.JWT_SECRET, {
        expiresIn: "1h", // Set the expiration time for the token
      });
      console.log(token);
      res.json({ user: req.user, token });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

router.get(
  "/login-google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/login-google/callback",
  passport.authenticate("google", {
    failureRedirect: `${process.env.HOST_URL}/login`,
  }),
  (req, res) => {
    try {
      // Generate a JWT token upon successful Google authentication
      const token = jwt.sign({ userId: req.user.id }, process.env.JWT_SECRET, {
        expiresIn: '1h', // Set the expiration time for the token
      });

      // Redirect user to the client-side route with user ID
      const htmlTokenEmbed = `
        <html>
          <script>
            window.localStorage.setItem('token', '${token}');
            window.location.href = '${process.env.HOST_URL}/profile-setup?userId=${req.user.id}';
          </script>
        </html>
      `;
      res.send(htmlTokenEmbed);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
);


router.get(
  "/login-facebook",
  passport.authenticate("facebook", { scope: ["public_profile", "email"] })
);

router.get(
  "/login-facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: `${process.env.HOST_URL}/login`,
  }),
  (req, res) => {
    try {
      // Generate a JWT token upon successful Facebook authentication
      const token = jwt.sign({ userId: req.user.id }, process.env.JWT_SECRET, {
        expiresIn: "1h", // Set the expiration time for the token
      });

      // Redirect user to the client-side route with user ID and set token
      const htmlTokenEmbed = `
      <html>
        <script>
          window.localStorage.setItem('token', '${token}');
          window.location.href = '${process.env.HOST_URL}/profile-setup?userId=${req.user.id}';
        </script>
      </html>
    `;
      res.send(htmlTokenEmbed);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

router.post("/logout", (req, res) => {
  // req.session.destroy();
  // req.user = null;
  // res.clearCookie('connect.sid');
  res.json({ logout: true });
});

module.exports = router;
