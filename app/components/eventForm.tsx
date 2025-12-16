"use client"
import { useState } from "react"
import { useSession } from "next-auth/react";
import Link from "next/link";
interface FormType{
    title:string;
    description:string;
    location:string;
    date:string;
    number:string;
    time:string;
    email:string;
    image:File|null;
    tags:string;
}
const Form = () => {
    const {data:session,status} = useSession()
    const userEmail = session?.user?.email
    const initialData:FormType = {
    title:"",
    description:"",
    location:"",
    number:"",
    date:"",
    time:"",
    email:"",
    image:null,
    tags:""
    }
  const [formData,setFormData] = useState(initialData)
  const [submitted,setSubmitted] = useState('')
  const [isLoading,setIsLoading] = useState(false)
  const handleChange = (e:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) =>{
    const{name,value} = e.target
    setFormData(formData=>({
        ...formData,
        [name]:value,
        email:userEmail!,
    }))
  }
  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    setIsLoading(true)
    try {
      const data = new FormData
      Object.entries(formData).forEach(([Key,value])=>(
      data.append(Key,value)
    ))
      const res = await fetch("http://localhost:3000/api/events",{
        method:"POST",
        body:data
      })
      const {message} = await res.json()
      if(message==='success'){
          setSubmitted('Event Created')
      }else{
          setSubmitted('Creation Failed')
      }
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      setSubmitted('Creation Failed')
    }
 
  }
  return (
    <div>
        <form className="flex flex-wrap mt-5 justify-center w-2/3 mx-auto gap-2 bg-linear-to-t to-[#4d6ec2] from-[#24335f] py-8 rounded-2xl" onSubmit={handleSubmit}>
          <label className="label">Title: <input type="text" name="title" onChange={handleChange} value={formData.title} placeholder="Enter title" className="input" required maxLength={50}></input></label>
          <label className="label">Mobile:<input type="tel" name="number" onChange={handleChange} value={formData.number} placeholder="Enter Number" className="input" required maxLength={10}></input></label>
          <label className="label">Tags: <input type="text" name="tags" onChange={handleChange} value={formData.tags} placeholder="Enter,Tags,Example" className="input" required maxLength={50}></input></label>
          <label className="label">Image: <input type="file" name="image" onChange={(e)=>{setFormData(formData=>({...formData,image:e.target.files?.[0]||null}))}} className="input" required></input></label>
          <label className="label">Date: <input type="date" name="date" onChange={handleChange} value={formData.date} className="input" required></input></label>
          <label className="label">Time: <input type="time" name="time" onChange={handleChange} value={formData.time} className="input" required></input></label>
          <label className="w-5/6 m-2 mr-0 font-bold text-xl flex items-center gap-1.5">Description<textarea name="description" onChange={handleChange} value={formData.description} placeholder="Enter Descroption" className="input whitespace-pre-wrap break-words" required maxLength={1000}></textarea></label>
          <label className="w-5/6 m-2 mr-0 font-bold text-xl flex items-center gap-1.5">Location<textarea name="location" onChange={handleChange} value={formData.location} placeholder="Enter Location" className="input whitespace-pre-wrap break-words" required maxLength={500}></textarea></label>
          <div className="label justify-center bg-green-800 rounded p-2 hover:bg-green-500">
            <button type="submit" className="cursor-pointer w-full h-full" onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}>Submit</button>
          </div>
          <div className="w-full">
          <p className="text-center">{isLoading?"Loading...":submitted}</p>
          </div>
        </form>
    </div>
  )
}
export default Form