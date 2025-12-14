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
    const [submitted,setSubmitted] = useState('')
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
    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        try {
            const res = await fetch("http://localhost:3000/api/register",{
            method:'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(userData)
            })
            const {message} = await res.json()
            if(message==='success'){
                setSubmitted('Successfully Registered')
            }else{
                setSubmitted('Registeation Failed')
            }
        } catch (error) {
            console.log(error)
            setSubmitted('Registeation Failed')
        }
        
    } 
  return (
    <div>
        <form className="ml-2 mr-2" onSubmit={handleSubmit}>
        <label className="text-2xl" htmlFor="number">Phone Number:</label>
        <input type="text" id="number" name="number" onChange={handleChange} value={userData.number} placeholder="Enter number" className="input mt-2 mb-5" required maxLength={10}></input>
          <div>
            <button className="bg-green-800 rounded p-2 cursor-pointer hover:bg-green-500" type="submit">Register</button>
            <p className="mt-5">{submitted}</p>
          </div>
        </form>
    </div>
  )
}
export default UserForm