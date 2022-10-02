const express=require("express")
const app=express()
const mongoose=require('mongoose')
const cors=require('cors')


const port=3000;
mongoose.connect("mongodb+srv://satya:PASSWORD@cluster0.cdu8w6s.mongodb.net/?retryWrites=true&w=majority",{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
app.get("/",(req,res)=>{
    res.send("hello node js")
})
app.use(cors({origin:"*"}))
app.use(express.json())
app.use("/start",require("./controller"))

app.get("/",(req,res)=>{
    res.send("Hello Application")
})

app.listen(process.env.port || port,()=>{
    console.log("server Is Running...")
})
