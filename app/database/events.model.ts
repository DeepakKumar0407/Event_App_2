import { timeStamp } from 'console'
import { Schema,model,models,Document } from 'mongoose'
import mongoose from "mongoose"

export interface IEvent extends Document {
    title:string;
    slug:string;
    description:string;
    number:string;
    location:string;
    date:string;
    time:string;
    email:string;
    image:string;
    tags:string[];

}
const EventSchema = new Schema<IEvent>({
    title:{
        type:String,
        required: [true, 'Title required'],
        maxlength:50

    },
     slug:{
        type:String,

    },
     description:{
        type:String,
        required:[true, 'Description required'],
        maxlength:1000

    }, number:{
            type:String,
            required:[true, 'Phone number required'],
            validate:{
                validator:(v:string)=>v.length ===10,
                message:"Enter a 10 digit valid phone number"
            }
        },
     location:{
        type:String,
        required:[true, 'Location required'],
        maxlength:500

    },
    email:{
        type:String,
        required:[true, 'Email required']

    },
     date:{
        type:String,
        required:[true, 'Date required']
    },
     time:{
        type:String,
        required:[true, 'Time required']

    },
     image:{
        type:String,
        required:[true, 'Image required']

    },
     tags:{
        type:[String],
        required:[true, 'Tags required'],
        maxlength:50

    },
},{timestamps:true})
EventSchema.pre('save', function() {
  const event = this as IEvent;


  if (event.isModified('title') || event.isNew) {
    event.slug = generateSlug(event.title);
  }

  if (event.isModified('date')) {
    event.date = normalizeDate(event.date);
  }

  if (event.isModified('time')) {
    event.time = normalizeTime(event.time);
  }
});


function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '') 
    .replace(/\s+/g, '-') 
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, ''); 
}


function normalizeDate(dateString: string): string {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date format');
  }
  return date.toISOString().split('T')[0]; 
}


function normalizeTime(timeString: string): string {
 
  const timeRegex = /^(\d{1,2}):(\d{2})(\s*(AM|PM))?$/i;
  const match = timeString.trim().match(timeRegex);
  
  if (!match) {
    throw new Error('Invalid time format. Use HH:MM or HH:MM AM/PM');
  }
  
  let hours = parseInt(match[1]);
  const minutes = match[2];
  const period = match[4]?.toUpperCase();
  
  if (period) {

    if (period === 'PM' && hours !== 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;
  }
  
  if (hours < 0 || hours > 23 || parseInt(minutes) < 0 || parseInt(minutes) > 59) {
    throw new Error('Invalid time values');
  }
  
  return `${hours.toString().padStart(2, '0')}:${minutes}`;
}


EventSchema.index({ slug: 1 }, { unique: true });


EventSchema.index({ date: 1, mode: 1 });

const Event = models.Event || model("Event", EventSchema);

export default Event