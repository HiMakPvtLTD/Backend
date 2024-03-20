var mail=require("nodemailer")
var db=require("../database/db")
//var twilio=require("twilio")(`AC2fbf4a12c3446556757a7de3e62baef1`,'12d1db6383f1863793e509b4c54242ce')

var clinet=mail.createTransport({
    service:'gmail',
    auth:{
        "user":'automail.erp@himak.in',
        pass:'apple@9876'
    }
})


// const sendMailtored=async(email,subject,data)=>{
//     //var otp=Math.floor(Math.random()*1000000)
//     var message=""
//     var sendmail={
//         from:'automail.erp@himak.in',
//         to:email,
//         subject:subject,
//         text:data

//     }
//     return new Promise((resolve,reject)=>{
//         clinet.sendMail(sendmail,(err,res)=>{
//             if(err) reject(err) 
//             message={
//                 "Message":"Sent Successfully"
//             }
//             ///console.log(res)
//             resolve(message)
//            // console.log(res)
    
    
//         })
//     })
    


// }

const sendMailtored=async(email,subject,data)=>{
    try{
        var query='select * from "Tokens" where "ID"=2'
        const result=await db.query(query)
        var {AuthToken}=result.rows[0]
        var sgmail=require("@sendgrid/mail")
        var testmail=email.split(";")
        testmail.pop()
        console.log(testmail)

        const message={
            from:"iotlab@idexcorp.com",
            to:testmail,
            subject:subject,
            text:data
        }
        sgmail.setApiKey(AuthToken)
        var sentmail=await sgmail.send(message)
        console.log(sentmail)
        return {
            status:"200",
            "Message":"Mail Sent Successfully !!!"
        }

    }
    catch(err){
        return err
    }
}
const Sms=async(mobile,message)=>{
    var query='select * from "Tokens" where "ID"=1'
    const result=await db.query(query)
    var {SID,AuthToken}=result.rows[0]
    var twilio=require("twilio")(SID,AuthToken)
    const array=[]
    mobile.map((item)=>{
        array.push(`+91${item}`)
       // console.log(`+91${item}`)
        twilio.messages.create({
            body:message,
            
            "from":"+17816601822",
            "to":`+91${item}`
        }).then((message)=>{
          console.log("Message Sent")
        })

    })
    

}

module.exports={
    sendMailtored,
    Sms
}
