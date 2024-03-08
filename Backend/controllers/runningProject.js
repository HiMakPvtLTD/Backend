const timeseries=require("../models/runningProjects.model")
const dat=require("../function/date")
const e = require("express")

const timeSeriesbyId=async(req,res)=>{
    try{
        const id=req.body.id
        const no=req.body.no
        const start=req.body.start
        const end=req.body.end
       // console.log(req.body)
        //console.log(no)
        var time=""
    const data= await timeseries.TimeSeriesData(id,no)
    if(data){
         //data[0].DischargePressurePV=2
       // data[0].AoddInAirPressPV=3
        data[0].Test=data[0].Act_TestRunTime
        data[0].DateTime=new Date(data[0].DateTime)
        //time=`${data[0].EndTestRunTimeDay}D :${data[0].EndTestRunTimeHour}H:${data[0].EndTestRunTimeMin}`

       if(no!=0){
        if(data[0].ProjectConfig=="Performance"){
            time=dat.toSec(data[0].Act_TestRunTime)

        }
        else{
            time=`${data[1].EndTestRunTimeDay}D : ${data[1].EndTestRunTimeHour}H : ${Math.round(Number(data[1].EndTestRunTimeMin)+Number(data[1].Act_TestRunTime/60))}M`
             console.log(Number(data[1].Act_TestRunTime/60))
        //    // console.log(time)
        }
        const testRuntime=time
        data[0].caltime=time
       // console.log("called")
        res.send(data)

       }else{
        res.send(data)
       }
        
        
        
        //data[0].DischargePThhEn=false
        //data[0].DischargePressurePV=9
        // data[0].FlowScaleMax=50
        // data[0].StrokeCount=32
        
    }
    else{
        res.send("No Data Availbale")
    }
    }
    catch(err){
        res.send(err)
    }
    

}
const getTimeSeriesDatabyID=async(req,res)=>{
    try{
        const start=req.body.start
        const end=req.body.end
        const id=req.body.id
        const no=req.body.no
       // console.log(req.body)
        const data=await timeseries.getTimeSeriesDatabyID(start,end,id,no)
        if(data){
            res.send(data)
        }
        else{
            res.send("No Data Available")
        }
    }catch(err){
        res.send(err)
    }

}
const getLastRun= async(req,res)=>{
    try{
        const data=await timeseries.getLastRun()
       // console.log(data,"3")

    if(data){
        res.send(data)
    }
    else{
        res.send("no Data Available")
    }
    }
    catch(err){
        res.send(err)
    }

}
const getTestBenchseq=async(req,res)=>{
    try{
        const id=req.body.id
        const no=req.body.no
        const data=await timeseries.testBenchSeq(id,no)
        if(data){
           // data[0].SuctionDischargeVClose=true
        //     data[0].DischargeVOpen=true
        //     data[0].ControlVOpen=true
        //    // data[0].DischargeVOpen= false
        //     data[0].MotorRunFeedback=false
        //     data[0].MotorStopFeedback=false
        //     data[0].  SuctionDischargeVClose=true
        //     data[0].  SuctionPTThreshold=true
        //     data[0].  SuctionVOpen=true
        //     data[0]. TestStableTimeDone=true
        //     data[0]. TestTimeDone=true
        //     data[0]. TimeAfterTestDone=true

           // console.log(data)
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
const getStatsdata=async(req,res)=>{
    try{
        const id=req.body.id
        const no=req.body.no
        const start=req.body.start
        const end=req.body.end
     //   console.log(req.ip)
      //  console.log(req.socket.remoteAddress)
     // console.log(req.body)
        const data=await timeseries.StatsData(id,no,start,end)
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
    timeSeriesbyId,
    getLastRun,
    getTestBenchseq,
    getTimeSeriesDatabyID,
    getStatsdata
}