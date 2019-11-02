const router = require('express').Router()
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const { User } = require('../db')

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  console.log('Google client ID / secret not found. Skipping Google OAuth.')
} else {
  const googleConfig = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK,
  }

  const strategy = new GoogleStrategy(
    googleConfig,
    (token, refreshToken, profile, done) => {
      const info = {
        name: profile.displayName,
        email: profile.emails[0].value,
        imageUrl: profile.photos ? profile.photos[0].value : undefined
      }

      User.findOrCreate({
        where: {googleId: profile.id},
        defaults: info
      })
        .spread((user) => done(null, user))
        .catch(done)
    }
  )

  passport.use(strategy)

  // Google authentication and login
  router.get('/', passport.authenticate('google', { scope: 'email' }))

  // handle the callback after Google has authenticated the user
  router.get(
    '/verify',
    passport.authenticate('google', {
      successRedirect: '/home',
      failureRedirect: '/login'
    })
  )
}


module.exports = router
