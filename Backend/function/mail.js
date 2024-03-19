var mail=require("nodemailer")
require('dotenv').config();
var db=require("../database/db")


var clinet=mail.createTransport({
    service:'gmail',
    auth:{
        "user":'automail.erp@himak.in',
        pass:'apple@9876'
    }
})


// const sendMail=async(email,body,subject)=>{
//     //var otp=Math.floor(Math.random()*1000000)
//     var message=""
//     var sendmail={
//         from:'automail.erp@himak.in',
//         to:email,
//         subject:subject,
//         text:body

//     }
//     return new Promise((resolve,reject)=>{
//         clinet.sendMail(sendmail,(err,res)=>{
//             if(err) reject(err) 
//             message={
//                 Status:200,
//                 "otp":otp
//             }
           
//         })
//         resolve(message)
       
//     })
    


// }


const sendMail=async(email,body,subject)=>{
    try{
        console.log(email,body,subject)
        var query='select * from "Tokens" where "ID"=2'
        const result=await db.query(query)
        var {AuthToken}=result.rows[0]
        var sgMail=require("@sendgrid/mail")
        const msg={
            to:email,
            from:"iotlab@idexcorp.com",
            "subject":subject,
            text:body
        }
        sgMail.setApiKey(AuthToken)
        const sentmail=await sgMail.send(msg)
        console.log(sentmail)
        return sentmail
        

    }
    catch(err){
        return err
    }
}
const Sms=async(mobile,body)=>{
    
    var query='select * from "Tokens" where "ID"=1'
    const result=await db.query(query)
    var {SID,AuthToken}=result.rows[0]
    var twilio=require("twilio")(SID,AuthToken)
    return new Promise((resolve,reject)=>{
        twilio.messages.create({
            body:body,
            
            "from":"+17816601822",
            "to":`+91${mobile}`
        }).then((message)=>{
           resolve("200")
        })
    })

}

module.exports={
    sendMail,
    Sms,
  
}
