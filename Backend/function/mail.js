var mail=require("nodemailer")
require('dotenv').config();
var db=require("../database/db")

// const  sdk=require('api')('@msg91api/v5.0#6n91xmlhu4pcnz')
// const sendotp=require("sendotp")
var clinet=mail.createTransport({
    service:'gmail',
    auth:{
        "user":'automail.erp@himak.in',
        pass:'apple@9876'
    }
})


const sendMail=async(email,body,subject)=>{
    //var otp=Math.floor(Math.random()*1000000)
    var message=""
    var sendmail={
        from:'automail.erp@himak.in',
        to:email,
        subject:subject,
        text:body

    }
    return new Promise((resolve,reject)=>{
        clinet.sendMail(sendmail,(err,res)=>{
            if(err) reject(err) 
            message={
                Status:200,
                "otp":otp
            }
           
        })
        resolve(message)
       
    })
    


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
// const Sms=async()=>{
//     try{
//         const otp=new sendotp('417332A0rd4UWoTQ565e0a824P1')
//         otp.send("7228831100")
//         sdk.auth('417332A0rd4UWoTQ565e0a824P1')
//         sdk.sendSms({
//             template_id: 'EntertemplateID',

//             short_url: '1 (On) or 0 (Off)',
//             recipients: [{mobiles: '919898831672', VAR1: 'VALUE1', VAR2: 'VALUE2'}]
//           })
//             .then(( data ) => {
//                 return data
//             })
//             .catch(err => console.error(err));
           
//     }
//     catch(err){
//         return err
//     }
// }
module.exports={
    sendMail,
    Sms
}
