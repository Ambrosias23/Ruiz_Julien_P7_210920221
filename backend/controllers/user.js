const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const dotenv = require('dotenv').config();
const cryptojs = require('crypto-js');

exports.signup = (req, res, next) => {
  const emailCryptoJS = cryptojs.HmacSHA256(req.body.email, `${process.env.SECRET}`).toString();

  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: emailCryptoJS,
        password: hash
      });

      user
        .save()
        .then(() => res.status(201).json({ message: 'Utilisateur à bien était crée !' }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
  const emailCryptoJS = cryptojs.HmacSHA256(req.body.email, `${process.env.SECRET}`).toString();

  User.findOne({ email: emailCryptoJS })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ message: 'Paire identifiant/mot de passe incorrrect' });
      }

      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: 'Paire identifiant/mot de passe incorrrect' });
          } else {
            const token = jwt.sign(
              { userId: user._id, admin: user.admin },

              `${process.env.SECRET}`,

              { expiresIn: '24h' }
            );
            res.header('Authorization', 'Bearer ' + token);
            return res.json({ token, userId: user._id, admin: user.admin });
          }
        })

        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
