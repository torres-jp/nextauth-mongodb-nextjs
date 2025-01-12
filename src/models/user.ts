import { Schema, model, models } from 'mongoose'

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please enter a valid email address',
    ],
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    seleccted: false,
    minLegth: 6,
  },
  fullname: {
    type: String,
    required: [true, 'Please enter your full name'],
    minLegth: 3,
    maxLength: 15,
  },
})

const User = models.User || model('User', userSchema)
export default User
