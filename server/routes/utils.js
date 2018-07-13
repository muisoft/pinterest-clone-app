//import bCrypt from 'bcrypt-nodejs';
const User = require('mongoose').model('User');
const Pin = require('mongoose').model('Pin');

/**export const isCurrectPassword = (user, password) => {
  return bCrypt.compareSync(password, user.password);
}

export const createHash = (password) => {
  return bCrypt.hashSync(password, genSaltSync(10), null);
}**/
module.exports = {
      savePics(req, res) {
        var { id, title, thumbnail, owner } = req.body;

        Pin.findOne({ owner: req.body.id }, (err, p) => {
          User.findOne({ _id: req.body.id }, (err, user) => {
            let image;
            if (user.thumbnail) {
              image = user.thumbnail;
            } else if (p) {
              image = p.thumbnail;
            } else {
              image = thumbnail;
            }

            const pin = new Pin({ title, thumbnail, ownerImage: image, owner: id });
            User.findOneAndUpdate({ _id: id }, { thumbnail: image }, (err, update) => {
              pin.save((err, pin) => {
                res.json({ message: owner, user: update });
              });
            });
          })
        })
      },

      allPics(req, res){
        console.log('Enter All Pics');
        Pin.find({}, (err, pins) => {
          res.json({pins: pins});
        })
      },

      myPics(req, res){
        let { _id } = req.user;
        Pin.find({ owner: _id }, (err, pins) => {
          console.log('My Pics2: '+JSON.stringify(pins));
          res.json(pins);
        })
      },

      signup(req, res){
        let { username, email, password } = req.body;

        User.findOne({ username: username }, (err, user) => {
          if (user) {
            console.log('Username already exists');
            res.json({ message: 'Username already exists' })
          } else {
            let newUser = new User({ username, email, password });
            newUser.save((err, user) => {
              res.json(user);
            });
          }
        })
      },

      deletePics(req, res){
        let { id } = req.body;

        Pin.findOneAndRemove({ _id: id }, (pin) => {
          res.json({ success: true });
        });
      },

      ratePics(req, res){
        let { id, rate } = req.body;

        Pin.findOneAndUpdate({ _id: id }, { rate: rate }, (pin) => {
          Pin.find({}, (err, pins) => {
            res.json({pins: pins});
          })
        })
      }
}
