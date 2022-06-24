const mongoose=require("mongoose")

let RegisterUser=new mongoose.Schema({
    username:{
        type:"string",
        require:true
    },
    email:{
        type:"string",
        require:true,
        unique:true
    },
    password:{
        type:"string",
        require:true
    },
    confirmpassword:{
        type:"string",
        require:true
    }

})
module.exports=mongoose.model("RegisterUser",RegisterUser)