import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import ErrorPage from "../error/page"

const About = async () => {
  const session = await getServerSession(authOptions)
  if (!session) {
    return(
      <ErrorPage/>
    )
  } else {
     return (
    <div>
        <h1>About</h1>
    </div>
  )
  }
 
}
export default About