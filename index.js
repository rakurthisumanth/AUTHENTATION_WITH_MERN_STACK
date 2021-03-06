const express=require("express")
const app=express()
const mongoose=require('mongoose')
const cors=require('cors')


mongoose.connect("mongodb://localhost:27017/authdata",{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
app.get("/",(req,res)=>{
    res.send("hello node js")
})
app.use(cors({origin:"*"}))
app.use(express.json())
app.use("/start",require("./controller"))



app.listen(8000,()=>{
    console.log("server Is Running...")
})