import mongoose, { Schema } from "mongoose";
import express, { urlencoded } from "express"
import dotenv from "dotenv"

dotenv.config({path:"./.env"})


const app = express()

app.use(express.json())
app.use(urlencoded())



// db coonection
async function connect () {
     try {
       await mongoose.connect(`${process.env.MONGO_URI}/${process.env.DB_NAME}`)
        console.log("db connectd");
     } catch (error) {
        console.log(error);
        
     }
}
connect()


const userSchema = new Schema({
    name:String,
    email:String,
    password:String
},{timestamps:true})

const User = mongoose.model("User",userSchema)


// create,read,update,delete

app.post("/create-user",async function createUser (req,res) {
     try {
        const {name,email,password} = req.body
        const user = await User.create({name,email,password})
        return res.status(400).json({message:"ok",user})
     } catch (error) {
        console.log(error);
     }
})

app.put("/update-user/:id", async function(req,res){
    try {
        const {id} = req.params
        const {newEmail} = req.body
        const updatedUser = await User.findByIdAndUpdate(id,{email:newEmail}, {new:true})
        return res.status(200).json({message:"ok",updatedUser})
    } catch (error) {
        console.log(error);
    }    

})

app.get("/user/:id",async function(req,res){
     try {
        const {id} = req.params
       const user = await User.findById(id)
       return res.status(200).json({message:"ok",user})
     } catch (error) {
        console.log(error);
     }

})

app.get("/users",async function(req,res) {
     try {
        const users = await User.find({email:"changed2-email@.com"})
        return res.status(200).json({message:"ok",users})
     } catch (error) {
        console.log(error);
     }
    
})

app.get("/all-users",async function(req,res) {
     try {
        const users = await User.find({})
        return res.status(200).json({message:"ok",users})
     } catch (error) {
        console.log(error);
     }
})

app.post("/register",async function(req,res){
    const {name} = req.body
    const existingUser = await User.findOne({name})
     return res.status(200).json({message:"ok",existingUser})

})


app.delete("/delete",async function (req,res) {
    try {
         const {name} = req.body
        await User.deleteOne({name})
        return res.status(200).json({message:"ok"})
    } catch (error) {
        console.log(error);
        
    }
    
})

app.delete("/delete/:id",async function (req,res) {
    try {
         const {id} = req.params
         await User.findByIdAndDelete(id)
         return res.status(200).json({message:"ok"})
    } catch (error) {
        console.log(error);
    }
    
})







app.listen(3333,()=> {
     console.log("app is running on port 3333");
})




