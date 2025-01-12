import { NextResponse } from 'next/server'
import User from '@/models/user'
import { connectDB } from '@/libs/mongodb'
import bcrypt from 'bcryptjs'

export async function POST(req: Request) {
  const { fullname, email, password } = await req.json()

  if (!password || password.length < 6)
    return NextResponse.json(
      { message: 'Password must be at least 6 characters long' },
      { status: 400 }
    )
  try {
    await connectDB()
    const userFound = await User.findOne({ email })

    if (userFound)
      return NextResponse.json(
        { message: 'Email already exists' },
        { status: 400 }
      )

    const passHash = await bcrypt.hash(password, 12)

    const user = new User({
      email,
      password: passHash,
      fullname,
    })

    const saveUser = await user.save()

    return NextResponse.json({
      _id: saveUser._id,
      email: saveUser.email,
      fullname: saveUser.fullname,
    })
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 400 })
    }
  }
}
