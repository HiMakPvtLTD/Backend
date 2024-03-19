var node=require("../models/node-red")
var mail=require("../function/mail")

const sendMailtored=async(req,res)=>{
    try{
        const email=req.body.email
        const subject=req.body.subject
        const body=req.body.body
        console.log(req.body)
        var data=await node.sendMailtored(email,subject,body)
        if(data){
            res.send(data)
        }
        else{
            res.send("No data Available")
        }
        

    }
    catch(err){
        res.send(err)
    }

}
const sms=async(req,res)=>{
    try{
        const mobileno=req.body.mobile
        const body=req.body.body
        const data=await node.Sms(mobileno,body)
        res.send(data)

    }
    catch(err){
        res.send(err)
    }

}
module.exports={
    sendMailtored,
    sms
}