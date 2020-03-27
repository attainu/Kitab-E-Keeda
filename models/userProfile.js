
const { Schema, model } = require('mongoose');

const profileSchema = new Schema({


  dob: { type: Number, required: true },
  profileImage: { type: String, required: true, default: null },
  address: { type: String, required: true },
  gender: { type: String, required: true },

});


const User_Profile = model('Profile', profileSchema);
module.exports = User_Profile;    