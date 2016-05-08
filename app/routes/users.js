/**
 * Created by sarvesh on 5/7/2016.
 */

var User = require('../models/users');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function (router, passport) {

    passport.serializeUser(function(user, done) {
        return done(null, user);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // on routes that end in /users
    // ----------------------------------------------------
    router.route('/users')

        // create a user (accessed at POST http://localhost:8080/api/users)
        .post(function (req, res) {

            var user = new User();      // create a new instance of the User model
            user.first_name = req.body.first_name;  // set the users name (comes from the request)
            user.last_name = req.body.last_name;
            user.email = req.body.email;
            user.password = req.body.password;

            // save the bear and check for errors
            user.save(function (err) {
                if (err)
                    res.send(err);

                res.json({message: 'User created!'});
            });

        })
        .get(function (req, res) {
            User.find(function (err, users) {
                if (err) {
                    res.send(err);
                }
                res.json(users);
            });
        });

// on routes that end in /users/:user_id
// ----------------------------------------------------
    router.route('/users/:user_id')

        // get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
        .get(isAuthenticated, function (req, res) {
            User.findById(req.params.user_id, function (err, user) {
                if (err) {
                    res.send(err);
                }
                res.json(user);
            });
        })
        .put(function (req, res) {
            // use our user model to find the bear we want
            User.findById(req.params.user_id, function (err, user) {

                if (err)
                    res.send(err);

                user.first_name = req.body.first_name;  // update the users info
                // user.last_name = req.body.last_name;
                // user.email = req.body.email;
                // user.password = req.body.password;

                // save the bear
                user.save(function (err) {
                    if (err)
                        res.send(err);

                    res.json({message: 'User updated!'});
                });
            });
        })
        .delete(function (req, res) {
            User.remove({
                _id: req.params.user_id
            }, function (err, user) {
                if (err)
                    res.send(err);

                res.json({message: 'Successfully deleted'});
            });
        });

    passport.use('local-login', new LocalStrategy(
        function (username, password, done) {
            User.findOne({email: username}, function (err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false, {message: 'Incorrect username.'});
                }
                if (user.password !== password) {
                    return done(null, false, {message: 'Incorrect password.'});
                }
                return done(null, user);
            });
        }
    ));

    router.route('/users/login')
        .post(passport.authenticate('local-login'), function (req, res) {
            res.send(req.user);
        });

    router.route('/users/logout')
        .post(function (req, res) {
            req.logout();
            res.json({message: 'signed out success'});
        });
};

// As with any middleware it is quintessential to call next()
// if the user is authenticated
var isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.send(401);
};
