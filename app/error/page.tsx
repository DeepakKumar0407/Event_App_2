import Link from "next/link"

const ErrorPage = () => {
  return (
    <div className="ml-5">
        <h1 className="mt-5">You must be logged in to see this page</h1>
        <p className="mb-5">Back to home page</p>
        <Link href="/" className="bg-[#3a4b77] p-2 border-2 border-[#010719] rounded">Home</Link>
    </div>
  )
}
export default ErrorPage