import mongoose from 'mongoose'

const { MONGODB_URI } = process.env

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  )
}

export const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(MONGODB_URI)
    if (connection.readyState === 1) {
      console.log('MongoDB connection is open')
      return Promise.resolve(true)
    }
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
    return Promise.reject(error)
  }
}
