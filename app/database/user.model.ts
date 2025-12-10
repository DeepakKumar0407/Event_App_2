import {Schema,model,models} from 'mongoose'
import mongoose from 'mongoose'

export interface IUser {
    username:string;
    email:string;
    number:string;
}
const UserSchema = new Schema<IUser>(
    {
        username:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        number:{
            type:String,
            required:true,
            validate:{
                validator:(v:string)=>v.length ===10,
                message:"Enter a 10 digit valid phone number"
            }
        }
    }
)

const User = models.User || mongoose.model<IUser>('User',UserSchema)

export default User