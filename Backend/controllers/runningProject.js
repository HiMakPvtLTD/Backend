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
        if(data.length>=1){
            data[0].Test=data[0].Act_TestRunTime
            data[0].DateTime=new Date(data[0].DateTime)
            //time=`${data[0].EndTestRunTimeDay}D :${data[0].EndTestRunTimeHour}H:${data[0].EndTestRunTimeMin}`
    
           if(no!=0){
            if(data[0].ProjectConfig=="Performance"){
                time=dat.toSec(data[0].Act_TestRunTime)
                //console.log(time,data[1].Act_TestRunTime)
    
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
        }
        else{
            const object=[{
                Act_MotorRPM:0,
                caltime:`0H:0M:0S`,
                Act_TestRunTime: "0",
                AoddInAirPressPV: 0,
                AoddInAirSCFMPV: 0,
                DateTime: new Date(),
                DischargeFlow: 0,
                DischargePTScaleMax: 0,
                DischargePTScaleMin: 0,
                DischargePThSP: 0,
                DischargePThhEn: false,
                DischargePThhSP: 0,
                DischargePressurePV: 0,
                DischargePressureSP: 0,
                EndRunDay: 0,
                EndRunHour: "0",
                EndRunMin: "0",
                EndTestRunTimeDay: 0,
                EndTestRunTimeHour: "0",
                EndTestRunTimeMin: "0",
                FcvPos:0,
                FcvSP: 0,
                FlowGrav: 0,
                FlowMag: 0,
                FlowScaleMax: 0,
                FlowScaleMin: 0,
                GravMagSel: false,
                InAirPressSP: 0,
                LAbAirQualityPM10: 0,
                LabAirQualityPM2_5: 0,
                LabAirQualityVOC: 0,
                LabHumidity: 0,
                LabTemp: 0,
                LogBit: false,
                MainTankLTPV: 0,
                MainTankTempPV: 0,
                MotorAMP: 0,
                MotorKW: 0,
                MotorKWH: 0,
                MotorKwhProject: 0,
                MotorKwhTest: 0,
                MotorRPM: "0",
                MotorRPMMax: 0,
                ProcessDataId: "0",
                ProjectId: id,
                ProjectTotalizer: 0,
                PumpRPM: 0,
                PumpRPMMax: 0,
                PumpRPMMin: 0,
                Set_MotorRPM: 0,
                Set_TestRunTime: 0,
                StrokeCount:0,
                StrokeCountRate: 0,
                SuctionPressurePV: 0,
                TestNo: 0,
                TestRecipeCount: 0,
                TestTotalizer: 0,
                TestingState: 0,
                WeightScaleRead: 0,
                aoddProjStrokeCount: "0",
                inAirFTScaleMax: 0,
                inAirFTScaleMin: 0,
                inAirPTScaleMax: 0,
                inAirPTScaleMin: 0,
                            }]
           
             res.send(object)
            }
         //data[0].DischargePressurePV=2
       // data[0].AoddInAirPressPV=3
     
        
        
        
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