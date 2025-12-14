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
         <h1 className="text-center mt-5 mb-5">About us</h1>
        <div className="flex justify-between w-7/8 mx-auto pb-15">
        <div className="w-2/5 bg-linear-to-t from-[#87a1e4] to-[#24335f] border-4 border-[#24335f] rounded-2xl p-2">
         <p className="text-xl">At Eventica, we believe that community drives innovation.
          That's why we've curated a diverse lineup of speakers, interactive workshops,
          and activities designed to spark creativity and meaningful conversation. Each year,
          we push boundaries to improve our event, making it more inclusive, enriching, and fun for everyone involved.
          </p>
          </div>
          <div className="w-2/5 flex flex-col gap-3 bg-linear-to-t from-[#87a1e4] to-[#24335f] border-4 border-[#24335f] rounded-2xl p-2">
            <h2 className="text-2xl">Contact us:</h2>
            <p><span className="text-xl">Email: </span> dummy.email092@gmail.com</p>
            <p><span className="text-xl">Number: </span>9822210394</p>
            <p><span className="text-xl">Adress: </span> 47 Lakeview Crescent<br/>
               Mumbai, Maharashtra 400001<br/>
               India
            </p>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.4384216692265!2d72.79219247466658!3d19.132276950204467!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b5fafa0d4c9d%3A0xb0b1a1ed6e265e54!2sMadh%20Fort!5e0!3m2!1sen!2sin!4v1765560928357!5m2!1sen!2sin"
              width="250"
              height="150">
            </iframe>
          </div>
          </div>
    </div>
  )
  }
 
}
export default About