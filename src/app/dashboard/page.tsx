'use client'
import { useSession } from 'next-auth/react'

function DashBoardPage() {
  const { data: session, status } = useSession()

  console.log(session, status)
  return <div>DashBoard Page</div>
}

export default DashBoardPage
