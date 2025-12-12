"use client"
import { useState } from "react"
import { useSession } from "next-auth/react";
interface FormType{
    title:string;
    description:string;
    location:string;
    date:string;
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
    date:"",
    time:"",
    email:"",
    image:null,
    tags:""
    }
  const [formData,setFormData] = useState(initialData)
  const handleChange = (e:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) =>{
    const{name,value} = e.target
    setFormData(formData=>({
        ...formData,
        [name]:value,
        email:userEmail!
    }))
  }
  const handleSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    try {
      const data = new FormData
      Object.entries(formData).forEach(([Key,value])=>(
      data.append(Key,value)
    ))
      fetch("http://localhost:3000/api/events",{
        method:"POST",
        body:data
      })
    } catch (error) {
      console.log(error)
    }
 
  }
  return (
    <div>
        <form className="flex flex-wrap mt-5 justify-center w-2/3 mx-auto gap-2 bg-[#24335f] py-8 rounded-2xl" onSubmit={handleSubmit}>
          <label className="label">Title: <input type="text" name="title" onChange={handleChange} value={formData.title} placeholder="Enter title" className="input"></input></label>
          <label className="label">Location:<input type="text" name="location" onChange={handleChange} value={formData.location} placeholder="Enter Location" className="input"></input></label>
          <label className="label">Tags: <input type="text" name="tags" onChange={handleChange} value={formData.tags} placeholder="Enter,Tags,Example" className="input"></input></label>
          <label className="label">Image: <input type="file" name="image" onChange={(e)=>{setFormData(formData=>({...formData,image:e.target.files?.[0]||null}))}} className="input"></input></label>
          <label className="label">Date: <input type="date" name="date" onChange={handleChange} value={formData.date} className="input"></input></label>
          <label className="label">time<input type="time" name="time" onChange={handleChange} value={formData.time} className="input"></input></label>
          <label className="w-5/6 m-2 mr-0 font-bold text-xl flex items-center gap-1.5">Description<textarea name="description" onChange={handleChange} value={formData.description} placeholder="Enter Descroption" className="input"></textarea></label>
          <div className="label justify-center bg-green-800 rounded p-2">
            <button type="submit" className="">Submit</button>
          </div>
        </form>
    </div>
  )
}
export default Form