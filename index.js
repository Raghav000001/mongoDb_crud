import mongoose, { Schema } from "mongoose";
import e, { urlencoded } from "express";
import dotenv from "dotenv"
const app = e()

dotenv.config({path:"./.env"})


 async function connectDB () {
       try {
          await mongoose.connect(`${process.env.MONGO_URI}/${process.env.DB_NAME}`)
          console.log('mongo db connected!!!!');
       } catch (error) {
        console.log(error);
       }
    }
    connectDB()

const userSchema = new Schema({
    name:String,
    email:String,
    password:String
},{timestamps:true})

const User = mongoose.model("User",userSchema)


// crud operations = create , read , update , delete

app.use(e.json())
app.use(urlencoded())


app.get("/",(req,res)=> {
    res.send("hello")
})


app.post("/create-user",async (req,res)=> {
   const {name,email,password} = req.body
   const newUser = await User.create({name,email,password})
   return res.status(200).json({message:"user created successfully",newUser})
})

app.get("/get-all-users",async (req,res)=> {
    const users = await User.find({})
    return res.status(200).json({message:"users fetched successfully",users})

})

app.put("/update/:id",async (req,res)=>{
    const {id} = req.params
    const updatedUser = await User.findByIdAndUpdate(id,{name:"changed"},{new:true})
   return res.status(200).json({message:`user updated successfully`,updatedUser})
})


app.delete("/delete/:id",async (req,res)=> {
       const {id} = req.params
      await User.findByIdAndDelete(id)
      return res.status(200).json({message:"user deleted successfully"})
})



app.listen(3333,()=> {
    console.log("app is running on port 3333");
})
