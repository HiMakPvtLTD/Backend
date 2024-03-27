var db=require("../database/db")
var dashboard=require("../models/dashboard.model")
var table=require("../function/table")
const { config } = require("dotenv")


const TimeSeriesData=async(projectID,no,config)=>{
    try{
        var start=""
        var end=""
        var query=''
        var query2=''
      //  console.log(no)
        if(no>=1){
            // query=`SELECT tsd. "DateTime", tsd."MotorKWH", tsd."StrokeCount", tsd."FcvSP", tsd."Act_MotorRPM",tsd. "MotorAMP",tsd. "MotorKW", tsd."FlowGrav", tsd."MotorKwhTest",
            //  tsd."Act_TestRunTime", tsd."AoddInAirSCFMPV", tsd."FlowMag", tsd."WeightScaleRead", tsd."TestingState", tsd."Set_TestRunTime", tsd."TestNo", "DischargeFlow",
            //  tsd. "TestTotalizer", tsd."EndTestRunTimeMin",tsd. "StrokeCountRate", tsd."EndRunDay", "Set_MotorRPM", tsd."DischargePressureSP", tsd."InAirPressSP",
            //   tsd."EndTestRunTimeHour", tsd."ProjectTotalizer", tsd."EndRunHour", tsd."EndRunMin", tsd."FcvPos", tsd."DischargePressurePV", tsd."MainTankLTPV",
            //    tsd."EndTestRunTimeDay", "TestRecipeCount", tsd."AoddInAirPressPV", tsd."SuctionPressurePV", tsd."MotorKwhProject", tsd."MainTankTempPV",
            //     tsd."PumpRPM", tsd."GravMagSel" ,pm."ProjectConfig",tsd."FlowScaleMin", tsd."FlowScaleMax",tsd."DischargePTScaleMin", tsd."DischargePTScaleMax" 
            //     FROM public."TimeseriesData" tsd right join "ProjectMaster" pm on tsd."ProjectId"=pm."ProjectId" where tsd."ProjectId"='${projectID}' and tsd."TestNo"=${no} 
            // order by tsd."DateTime" Desc limit 20`
          if(config=="Performance"){
          
            const maxquery=`select Max("Act_TestRunTime") as maxTestruntime from timeseriesdata where "ProjectId"='${projectID}' and "TestNo"=${no} limit 1 `
            const response=await db.query(maxquery)
            const maxvalue=response.rows[0].maxtestruntime
            query=`select * from timeseriesdata where "ProjectId"='${projectID}' and "TestNo"=${no} and "Act_TestRunTime"=${maxvalue} limit 1`

          }
          else if(config=="Endurance"){
            query=`select * from timeseriesdata where "ProjectId"='${projectID}' and "TestNo"=${no}  and "LogBit"='true' limit 1`

          }
           
        }
        else if(no==0||no==null||no==undefined){
                // query=`			with testdate as (
                //     select min("StartDateTime")as "StartDateTime",max("EndDateTime") as "EndDateTime","ProjectId","TestNo" from "TestRunData" group by "ProjectId","TestNo" order by "TestNo" desc
                //     ),
                //      Demo as(
                //          select Row_Number() over (Partition by "TestNo" order by "DateTime" desc) as a, ("Act_TestRunTime"/60) as Act_TestRunTime ,(("EndTestRunTimeMin")+("EndTestRunTimeHour")*60+("EndTestRunTimeDay")*1440) as endurance,* from "TimeseriesData" where "ProjectId"='${projectID}'     order by "DateTime" desc 
                //             ) Select *from Demo  left join testdate ts on Demo."ProjectId"=ts."ProjectId" and Demo."TestNo"=ts."TestNo"  where a=2 order by Demo."TestNo" desc  `
        //         query=`		
	
        //         with testdate as (
        // select min("StartDateTime")as "StartDateTime",max("EndDateTime") as "EndDateTime","ProjectId","TestNo" from "TestRunData" group by "ProjectId","TestNo" order by "TestNo" desc
        // ),demo as(
        //         select Max("Act_TestRunTime") ,(Max("Act_TestRunTime")/60) as Act_TestRunTime ,Round(((Max("EndTestRunTimeMin"))+(Max("EndTestRunTimeHour"))*60+((Max("EndTestRunTimeDay")))*1440)+Max("Act_TestRunTime"/60.0)) as endurance,
        //      Max("DischargeFlow") as "DischargeFlow",Max("MotorKW") as "MotorKW",Max("DischargePressureSP") as "DischargePressureSP",
        //      Max("AoddInAirPressPV") as "AoddInAirPressPV",Max("InAirPressSP") as "InAirPressSP",
        //      Max("Set_MotorRPM") as "Set_MotorRPM",Max("PumpRPM") as "PumpRPM","TestNo","ProjectId" 
        //      from "TimeseriesData" where "ProjectId"='${projectID}' group by "TestNo","ProjectId" order by "TestNo" desc
        //     ) select * from demo as d left join testdate as ts on ts."ProjectId"=d."ProjectId" and d."TestNo"=ts."TestNo" where ts."StartDateTime" is not Null order by d."TestNo" desc  `


        if(config=="Performance"){
                query=`			with testdate as (
                    select min("StartDateTime")as "StartDateTime",max("EndDateTime") as "EndDateTime","ProjectId","TestNo" from "TestRunData" group by "ProjectId","TestNo" order by "TestNo" desc
                    ),
                     Demo as(
                         select Row_Number() over (Partition by "TestNo" order by "DateTime" desc) as a, Round("Act_TestRunTime"/60) as Act_TestRunTime ,Round(("EndTestRunTimeMin")+("EndTestRunTimeHour")*60+("EndTestRunTimeDay")*1440+("Act_TestRunTime"/60.0)) as endurance,* from "TimeseriesData" where "ProjectId"='${projectID}' and "Act_TestRunTime"!=0     order by "DateTime" desc 
                            ) Select *from Demo  left join testdate ts on Demo."ProjectId"=ts."ProjectId" and Demo."TestNo"=ts."TestNo"  where a=1 and ts."StartDateTime" is not Null order by Demo."TestNo" desc  `
        }
        else if(config=="Endurance"){
            query=`	with testdate as (
                select min("StartDateTime")as "StartDateTime",max("EndDateTime") as "EndDateTime","ProjectId","TestNo" from "TestRunData" group by "ProjectId","TestNo" order by "TestNo" desc
                ),
                 Demo as(
                     select Row_Number() over (Partition by "TestNo" order by "DateTime" desc) as a, Round("Act_TestRunTime"/60) as Act_TestRunTime ,Round(("EndTestRunTimeMin")+("EndTestRunTimeHour")*60+("EndTestRunTimeDay")*1440+("Act_TestRunTime"/60.0)) as endurance,* from "TimeseriesData" where "ProjectId"='${projectID}'  and "LogBit"='true'    order by "DateTime" desc 
                        ) Select *from Demo  left join testdate ts on Demo."ProjectId"=ts."ProjectId" and Demo."TestNo"=ts."TestNo"  where a=1 and ts."StartDateTime" is not Null order by Demo."TestNo" desc `

        }
    }
        console.log(query)
        const result=await db.query(query)
        return result.rows
    }
    catch(err){
        return err
    }
}
const getTimeSeriesDatabyID=async(start,end,projectID,no)=>{
   
    try{
        
    //console.log(start,end)
        // const start1=new Date(start)
        // const end1=new Date(end)
       // console.log(start,end,projectID,no)
        var query=`select * from "TimeseriesData" where "DateTime" between '${start}' and '${end}' and "ProjectId"='${projectID}' and "TestNo"='${no}' order by "DateTime" desc`
        //console.log(query)
        const result=await db.query(query)
        return result.rows
    }
    catch(err){
        return err
    }
    

}
const getLastRun=async()=>{
   try{
    const query=`Select * from "TestBenchCurrentStatus" where "Status"='Running' order by "DateTime" desc limit 1`
    const result=await db.query(query)
   // console.log(result.rows,"1")
    if(result.rows.length==0){
        const query=`select *from TestBench_Status_dash order by "DateTime" desc limit 1`
        const result=await db.query(query)
       // console.log(result.rows[0].ProjectId,"2")
        const data=await dashboard.getProjectDetials(result.rows[0].ProjectId)
      //  console.log(data)
        return data
    }
    return result.rows
   }
   catch(err){
    return err
   }
}
const testBenchSeq=async(projectid,no)=>{
    try{
        const query=`SELECT  "DischargeVOpen", "ControlVOpen", "SuctionVOpen", "SuctionPTThreshold", "MotorRunFeedback",  "TestStableTimeDone", "TestTimeDone", "TimeAfterTestDone", "MotorStopFeedback", "SuctionDischargeVClose"
	FROM public."TestBenchSequence" where "ProjectId"='${projectid}' and "TestNo"=${no} order by "DateTime" desc limit 1`
    const result=await db.query(query)
    if(result.rows.length<=0){
        const testBenchSeq=[{
            ControlVOpen: false,
            DischargeVOpen: false,
            MotorRunFeedback:false,
            MotorStopFeedback:false,
            SuctionDischargeVClose:false,
            SuctionPTThreshold:false,
            SuctionVOpen:false,
            TestStableTimeDone:false,
            TestTimeDone:false,
            TimeAfterTestDone:false
        }]
        return testBenchSeq
    }
    
    return result.rows
    
    }
    catch(err){
        return err
    }

}
const StatsData=async(projectid,no,start,end)=>{
    try{
        const sql=`		with data as (
	
            select min("ProjectId") as "ProjectId",
                MAX("MotorKW") as maxMotor,MIN("MotorKW") as minMotor,Mode() within group (order by "MotorKW") as modeMotor,AVG("MotorKW") as meanMotor,Percentile_cont(0.5) within group (order by "MotorKW")as medianMotor,STDDEV("MotorKW")as stdmotor,
                MAX("PumpRPM") as maxPump,MIN("PumpRPM") as minPump,Mode() within group (order by "PumpRPM") as modePump,AVG("PumpRPM") as meanPump,Percentile_cont(0.5) within group (order by "PumpRPM")as medianPump,STDDEV("PumpRPM") as stdpump,
                MAX("DischargePressurePV") as maxdischarge,MIN("DischargePressurePV") as mindischarge,Mode() within group (order by "DischargePressurePV") as modedischarge,AVG("DischargePressurePV") as meandischarge,Percentile_cont(0.5) within group (order by "DischargePressurePV")as mediandischarge,STDDEV("DischargePressurePV")as stddischarge,
                MAX("DischargeFlow") as maxdischargef,MIN("DischargeFlow") as mindischargef,Mode() within group (order by "DischargeFlow") as modedischargef,AVG("DischargeFlow") as meandischargef,Percentile_cont(0.5) within group (order by "DischargeFlow")as mediandischargef,STDDEV("DischargeFlow") as stddischargef,
                MAX("AoddInAirPressPV") as maxAir,MIN("AoddInAirPressPV") as minAir,Mode() within group (order by "AoddInAirPressPV") as modeAir,AVG("AoddInAirPressPV") as meanAir,Percentile_cont(0.5) within group (order by "AoddInAirPressPV")as medianAir,STDDEV("AoddInAirPressPV") as stdair,
                MAX("MotorAMP") as maxAMP,MIN("MotorAMP") as minAMP,Mode() within group (order by "MotorAMP") as modeAMP,AVG("MotorAMP") as meanAMP,Percentile_cont(0.5) within group (order by "MotorAMP")as medianAMP,STDDEV("MotorAMP") as stdAMP,
                MAX("SuctionPressurePV") as maxSPV,MIN("SuctionPressurePV") as minSPV,Mode() within group (order by "SuctionPressurePV") as modeSPV,AVG("SuctionPressurePV") as meanSPV,Percentile_cont(0.5) within group (order by "SuctionPressurePV")as medianSPV,STDDEV("SuctionPressurePV") as stdSPV,
                MAX("StrokeCountRate") as maxSCr,MIN("StrokeCountRate") as minScr,Mode() within group (order by "StrokeCountRate") as modeScr,AVG("StrokeCountRate") as meanScr,Percentile_cont(0.5) within group (order by "StrokeCountRate")as medianscr,STDDEV("StrokeCountRate") as stdscr,
                MAX("InAirPressSP") as maxiap,MIN("InAirPressSP") as miniap,Mode() within group (order by "InAirPressSP") as modeiap,AVG("InAirPressSP") as meaniap,Percentile_cont(0.5) within group (order by "InAirPressSP")as medianiap,STDDEV("InAirPressSP") as stdiap,
                MAX("DischargePressureSP") as maxdsp,MIN("DischargePressureSP") as mindsp,Mode() within group (order by "DischargePressureSP") as modedsp,AVG("DischargePressureSP") as meandsp,Percentile_cont(0.5) within group (order by "DischargePressureSP")as mediandsp,STDDEV("DischargePressureSP") as stddsp
           from "TimeseriesData"   where "ProjectId"='${projectid}' and "TestNo"=${no} and "DateTime" between '${start}' and '${end}'
            ) select * from data as d left join "ProjectMaster" as pm on d."ProjectId"=pm."ProjectId" `
        
           // console.log(sql)
        const result=await db.query(sql)
        const data=table.insertdata(result)
        
        return data


    }
    catch(err){
        return err
    }
}

module.exports={
    TimeSeriesData,
    getLastRun,
    testBenchSeq,
    getTimeSeriesDatabyID,
    StatsData

}