"use client"

import { Search } from "lucide-react"
import Link from "next/link"
import { usePathname, useSearchParams, useRouter } from "next/navigation"

const SearchBar = ({prop}:{prop:string|null}) => {
  const query = prop
  console.log(query)
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const {replace} = useRouter()
    const handleSearch = (term:string)=>{
      const params = new URLSearchParams(searchParams)
        if(term){
          params.set('query',term)
        }else{
          params.delete('query')
        }
        replace(`${pathname}?${params.toString()}`)
    }
  return (
    <div className="flex flex-col justify-around">
        <form className="flex justify-baseline">
          <input type="text" name="title" defaultValue={searchParams.get('query')?.toString()} onChange={(e)=>handleSearch(e.target.value)} placeholder="Search Event" className="input" required></input>
          <Link href={`http://localhost:3000/searchPage/${query}`}><Search size={20} className="mt-2 ml-2"/></Link>
        </form>
    </div>
  )
}
export default SearchBar