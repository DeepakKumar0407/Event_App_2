import { getServerSession } from "next-auth"
import Form from "../components/eventForm"
import { authOptions } from "../api/auth/[...nextauth]/route"
import ErrorPage from "../error/page"

const Create = async () => {
  const session = await getServerSession(authOptions)
  if (!session) {
    return (
      <ErrorPage/>
    )
  } else {
     return (
    <div>
      <h1 className="text-center mt-5">Submit Your Event</h1>
      <Form/>
    </div>
  )
  }

}
export default Create