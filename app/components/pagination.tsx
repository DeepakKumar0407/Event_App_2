'use client'

import { usePathname,useRouter,useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

const Pagination = ({prop}:{prop:number}) => {
    const total = prop
    const pageArrayLength = (total/6)+1 
    const pageArray = Array.from({ length: pageArrayLength}, (_, i) => i + 1);
    const pageParam = useSearchParams()
    const initialPage = Number(pageParam.get('page'))||1
    const pathname = usePathname()
    const route = useRouter()
    const [currentPage,setCurrentPage] = useState(initialPage)
    const finalArray = currentPage<5?pageArray.slice(0,currentPage+3):pageArray.slice(currentPage-4,currentPage+3)
    useEffect(()=>{
    const params = new URLSearchParams(pageParam)
    params.set('page',currentPage.toString());
    route.replace(`${pathname}?${params.toString()}`);
    if(currentPage<=0){setCurrentPage(1)};
    if(currentPage>=Math.max(...pageArray)){setCurrentPage(Math.max(...pageArray))}
    },[currentPage])
  return (
    <div className="w-max block mx-auto">
    <div className="flex justify-baseline gap-3 border-2 border-[#24335f] bg-[#24335f]/90 px-2 text-xl">
    <button onClick={()=>{setCurrentPage(currentPage=>currentPage-1)}} className="cursor-pointer">&lt;</button>
    {finalArray.map(page=>(
        <button className={currentPage===page?`cursor-pointer text-[#87a1e4]`:`cursor-pointer`} key={page}onClick={()=>{setCurrentPage(currentPage=>page)}}>{page}</button>
    ))}
    <button className="cursor-pointer" onClick={()=>{setCurrentPage(currentPage=>currentPage+1)}}>&gt;</button>
    </div>
    </div>
  )
}
export default Pagination