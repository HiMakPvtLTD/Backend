var db=require("../database/db")

const getListView= async(from,to)=>{
    try{
        
        //console.log(from,to,"hello world")
        // var sql=`select *,to_char((tr."EndDateTime"-tr."StartDateTime"),'HH24:MI:SS') as differnce from "ProjectMaster" as pm left join Top1_test as tr on pm."ProjectId"=tr."ProjectId" where tr."TestId" is not null and tr."StartDateTime">='${from}'
        // and tr."EndDateTime"<=' ${to}' order by tr."StartDateTime" desc `
        var sql=`select * from historylistview where "StartDateTime">='${from}' and "EndDateTime"<='${to}' order by "StartDateTime" desc`
        var query=await db.query(sql)
       // console.log(sql)
        
       

        return query.rows
        
    }
    catch(err){
        return err
    }

}
const GetAlltestView=async(from,to)=>{
    try{
        var sql=`select * from AllTestHistory where "StartDateTime">='${from}' and "EndDateTime"<='${to}' order by "StartDateTime" desc `
        var query=await db.query(sql)
        return query.rows
    } catch(err){
        return err
    }


}
const getTestBenchtypeCount=async()=>{
    try{
        var sql=`select sum(case when pm."ProjectType"='EODD' then 1 else 0 end) as EODD,
		sum(case when pm."ProjectType"='AODD' then 1 else 0 end) as AODD,
		sum(case when pm."ProjectConfig"='Performance' then 1 else 0 end)as Performance,
		sum(case when pm."ProjectConfig"='Endurance' then 1 else 0 end)as Endurance
		
		from "ProjectMaster" as pm join "TestBenchCurrentStatus"as tbr on tbr."ProjectId"=pm."ProjectId"`
        var result=await db.query(sql)
        return result.rows
    }
    catch(err){
        return err
    }
}
// const getTimeSeriesbyId=async(id)=>{
//     try{
//         const sql=`SELECT "ProcessDataId", "ProjectId", "DateTime", "MotorKWH", "StrokeCount", "FcvSP", "Act_MotorRPM", "MotorAMP", "MotorKW", "FlowGrav", "MotorKwhTest", "Act_TestRunTime", "AoddInAirSCFMPV", "FlowMag", "WeightScaleRead", "TestingState", "Set_TestRunTime", "TestNo", "DischargePressureBar", "TestTotalizer", "EndTestRunTimeMin", "StrokeCountRate", "EndRunDay", "Set_MotorRPM", "DischargePressureSP", "InAirPressSP", "EndTestRunTimeHour", "ProjectTotalizer", "EndRunHour", "EndRunMin", "FcvPos", "DischargePressurePV", "MainTankLTPV", "EndTestRunTimeDay", "TestRecipeCount", "AoddInAirPressPV", "SuctionPressurePV", "MotorKwhProject", "MainTankTempPV", "PumpRPM", "GravMagSel"
// 	FROM public."TimeseriesData" where "ProjectId"='${id}' order by "DateTime" desc limit 1`
//     const result= await db.query(sql)
//     return result.rows
//     }
//     catch(err){
//         return err
//     }

// }
module.exports={
   getListView,
    getTestBenchtypeCount,
    GetAlltestView,
    // getTimeSeriesbyId
}