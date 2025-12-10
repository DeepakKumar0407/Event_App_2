import mongoose from "mongoose"

const ConnectDb=async ()=>{
    const MONGO_URI = process.env.MONGO_URI
    if(!MONGO_URI){
    throw new Error("No mongo db connection string present")
}
    const conn = await mongoose.connect(process.env.MONGO_URI!, {
      dbName: "events",
    });
    return conn
}

export default ConnectDb;