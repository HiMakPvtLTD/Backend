var alarm=require("../models/Alarm.model")


const getAlarm=async(req,res)=>{
    try{
        const data=await alarm.getAlarm()
        if(data){
            res.send(data)
        }
        else{
            res.send("No Data Available")
        }


    }
    catch(err){
        res.send(err)
    }
}



module.exports={
    getAlarm
}