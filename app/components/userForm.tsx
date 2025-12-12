"use client"
import { useSession } from "next-auth/react"
import { useState } from "react"

const UserForm = ({props}:{props:string}) => {
interface NewUser{
    username:string|null|undefined;
    email:string|null|undefined;
    number:string;
    slug:string;
    }
    const initialData:NewUser = {
        username:"",
        email:"",
        number:"",
        slug:""
    }
    const [userData,setUserData] = useState(initialData)
    const {data:session,status} = useSession()
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const {name,value} = e.target
        setUserData(prv=>({
            ...prv,
            [name]:value,
            email:session?.user?.email,
            username:session?.user?.name,
            slug:props
        }))
    }
    const handleSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        try {
            fetch("http://localhost:3000/api/register",{
            method:'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(userData)
            })
        } catch (error) {
            console.log(error)
        }
        
    } 
  return (
    <div>
        <form className="" onSubmit={handleSubmit}>
        <label className="text-2xl" htmlFor="number">Phone Number:</label>
        <input type="text" id="number" name="number" onChange={handleChange} value={userData.number} placeholder="Enter number" className="input mt-2 mb-5"></input>
          <div >
            <button className="bg-green-800 rounded p-2 cursor-pointer" type="submit">Register</button>
          </div>
        </form>
    </div>
  )
}
export default UserForm