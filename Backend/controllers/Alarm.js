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
        res.status(500).send("INTERNAL SERVER ERROR")
    }
}
const getAlarmRange=async(req,res)=>{
    try{
        const start=req.body.start
        const  end=req.body.end
        const arr=req.body.data
        console.log(req.body)

        const data=await alarm.getAlarmRange(start,end,arr)
        if(data){
            res.send(data)
        }
        else{
            res.send("No data Available")
        }

    }
    catch(err){
        res.status(500).send("INTERNAL SERVER ERROR")
    }
}



module.exports={
    getAlarm,getAlarmRange
}