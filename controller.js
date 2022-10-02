const express=require("express")
const router=express.Router()
const RegisterUser=require("./model")
const jwt=require("jsonwebtoken")
const middelware=require('./middleware')


router.post("/register",async(req,res)=>{
    try{
        const {email,password,confirmpassword,username}=req.body
        let exist=await RegisterUser.findOne({email})
        if(exist){
            res.status(400).send("User Already Exist")
        }
        if(password!=confirmpassword){
            res.status(400).send("Password and confirm password mush does't Match")
        }
        let newUser=new RegisterUser({
            username,
            email,
            password,
            confirmpassword

        })
        await newUser.save()
        res.status(201).send("User Register Sucessfully....")
    }
    catch(err){
        console.log(err)
        res.status(500).send("Register Failure")
    }

})


router.post("/login",async(req,res)=>{
    try{
        let {email,password}=req.body
        let exist=await RegisterUser.findOne({email})
        if(!exist){
            res.status(400).send("User Not Found")
        }
        if(exist.password!==password){
            res.status(400).send("Incorrect Password")
        }
        const payload={
            user:{
                id:exist.id
            }
        }
        
        jwt.sign(payload,'jwtserct',{expiresIn:3600000},(err,token)=>{        
            if(err) throw err;
            return res.send({token})
        })
    }
    catch(err){
        console.log(err)
        res.status(500).send("Server Error..")
    }

})

router.get("/profile",middelware,async(req,res)=>{
    try{
        let exist=await RegisterUser.findById(req.user.id)
        if(!exist){
            return res.status(400).send("User Not Found")
        }
        res.json(exist)
    }
    catch(err){
        res.status(404).send("Server Error")
    }
})

 

module.exports=router