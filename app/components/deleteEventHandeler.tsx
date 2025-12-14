import { useRouter } from "next/navigation"
import { IEvent } from "../database/events.model"

const DeleteEventHandeler = ({prop}:{prop:IEvent}) => {
    const id = prop._id
    const router = useRouter()
    const handleDelete =()=>{
        fetch(`http://localhost:3000/api/user/${id}`,{
            method:"DELETE"
        })
        router.refresh()
    }
  return (
    <div className="flex justify-end">
            <button type="submit" onClick={handleDelete} className="cursor-pointer w-1/3 h-full bg-red-800 rounded p-2 hover:bg-red-500 mb-2 mr-2">Delete</button>
    </div>
  )
}
export default DeleteEventHandeler