import { useSession } from 'next-auth/react'

function DashBoardPage() {
  const {} = useSession()
  return <div>DashBoard Page</div>
}

export default DashBoardPage
