const db = require('../database/db');

// Get Dashboard Data
const getMainDashboardData = async () => {
    try {
      const query = 'SELECT * FROM "MasterPanel" order By "MasterId" DESC limit 1;'
      const results = await db.query(query);
      
      
      return results
    } catch (err) {
      console.error(err);
      return err
    }
  };
  const getChartData = async (starttime,endtime) => {
    try {
     //  console.log(starttime,endtime)
      const query = `SELECT "DateTime","LabAirQualityVOC","LabAirQualityPM2_5","LabHumidity","LabAirQualityPM10","LabTemp" FROM "MasterPanel" where "DateTime">='${starttime}' and "DateTime"<='${endtime}' order by "DateTime" desc`
     // console.log(query)
      const results = await db.query(query);
      return results.rows
    } catch (err) {
      console.error(err);
      return err
    }
  };

  // Get PLC Status Data
  const getPlcStatusData = async () => {
    try {
      const query = 'SELECT * FROM "PLCStatus" order by "PLCId" ';
      const results = await db.query(query);


      return results.rows
      
    } catch (err) {
      console.error(err);
      return err
    }
  };

  //Get TestBench Running Idle Count
  const TestBenchRunningIdle=async()=>{
    try{
      const query=`SELECT count(*) as running,(select count(*) from "TestBenchCurrentStatus")-count(*) as idel  FROM "TestBenchCurrentStatus" where "Status" = 'Running';`
      const result= await db.query(query);
      return result

    }
    catch(err){
      return "error"

    }
  }
  //Get Last 5 Bench Data In Main DashBoard
  const Last5Bench=async()=>{
    try{
      const query=`select PM."ProjectName",concat('Test Bench',' ',PM."TestBenchNo") as "TestBench" ,TRS."StartDateTime" from "TestRunData" TRS
    inner join "ProjectMaster" PM on PM."ProjectId" = TRS."ProjectId" order by TRS."StartDateTime" desc limit 5`
    const result=await db.query(query)
    return result.rows
    }catch(err){
      return err
    }
  }
  //Get Test object Count for (Week,Month,Year)
  const TestObjectCount=async()=>{
    try{
      const query=`SELECT (select count(*) as "Week"  from "TestRunData" where date_part('week', "StartDateTime") = date_part('week', CURRENT_DATE) and 
    date_part('year', "StartDateTime") =  date_part('year', CURRENT_DATE)), (select count(*) as "Month" FROM "TestRunData" 
    where date_part('month', "StartDateTime") =  date_part('month', CURRENT_DATE) and 
    date_part('year', "StartDateTime") =  date_part('year', CURRENT_DATE)),
    (select count(*) as "Year" FROM "TestRunData" 
    where date_part('year', "StartDateTime") =  date_part('year', CURRENT_DATE));`
    const result=await db.query(query)
    return result.rows

    }catch(err){
      return (err,"err")
    }
  }

  // Get Test Bench Details
  const TestbenchDetails=async()=>{
    //const query=`select *from TestBench_Status_dash order by "TestBenchId"`
    const query=`	 SELECT tbr."Status",
    pm."ProjectName",
    pm."ProjectNo",
    pm."ProjectType",
    pm."ProjectId",
    tbr."TestRunCount",
    pm."ProjectOwner",
    tbr."TestBenchId",
    tbr."TestBenchName",
    pm."Group",
    tm."DateTime"
   FROM "TestBenchCurrentStatus" tbr
      left JOIN "ProjectMaster" pm ON tbr."ProjectId" = pm."ProjectId"
     LEFT JOIN lastdatetime_timeseries tm ON tbr."ProjectId" = tm."ProjectId" AND tbr."TestRunCount" = tm."TestNo"
	 order by "tbr"."TestBenchId"`
    const result= await db.query(query)
    return result.rows
  }
  // Get Project Details by Id
  const getProjectDetials=async(projectid)=>{
    const query=`select tbr."Status",pm."ProjectName",pm."ProjectNo",pm."ProjectType",pm."ProjectId",tbr."TestRunCount",pm."Group",pm."ProjectOwner",pm."ProjectConfig",tbr."TestBenchId" from "TestBenchCurrentStatus" tbr
    join "ProjectMaster" pm on tbr."ProjectId"=pm."ProjectId" Where tbr."ProjectId"=${projectid}`
    const result= await db.query(query)
    return result.rows

  }

  const GetCurrentTestBenchDetails=async(benchno)=>{
    try{
      const query=`select tbr."Status",pm."ProjectName",pm."ProjectNo",pm."ProjectType",pm."ProjectId",tbr."TestRunCount",pm."Group",pm."ProjectOwner",pm."ProjectConfig",tbr."TestBenchId" from "TestBenchCurrentStatus" tbr
      join "ProjectMaster" pm on tbr."ProjectId"=pm."ProjectId" Where tbr."TestBenchId"=${benchno}`
      console.log(query)
      const result=await db.query(query)
      return result.rows

    }
    catch(err){
      return err
    }
  }
  //Get TestBenchDetails Status and Time in Hours by project Id
  const ProjectTotalRunTime=async(projectid)=>{
    // const query=`Select (SELECT "StartDateTime"
    // FROM public."TestRunData" where "ProjectId"='${projectid}' order by "StartDateTime" limit 1 ),(SELECT  "EndDateTime"
    // FROM public."TestRunData" where "ProjectId"='${projectid}' order by "EndDateTime" desc limit 1 )`
    const query=`Select *from gettotalprojectruntime where "ProjectId"=${projectid} order by "TestNo" desc limit 1 `
    //console.log(query)
    const result=await db.query(query)
    console.log(result.rows)
   // const date=new Date()
    //const datatime=result.rows[0].StartDateTime
    const enddate=result.rows[0].diff*60
    //const difference=Math.abs(datatime-enddate)/1000
    //console.log(difference)
    const days=Math.floor(enddate/(3600*24))
    const hours=Math.floor(enddate%(3600*24)/3600)
    const min=Math.floor((enddate%3600)/60)
    const sec=Math.floor(enddate%60)
    //console.log()
    const data={
      "Status":result.rows[0].Status,
      "Time":`${days}D : ${hours}H : ${min}M`
    }
    return data
    
  }
  //Get Time Series Data By Project Id
  const TankStatus=async()=>{
    try{
      const query=`SELECT "DateTime", "Id", "WaterTank_S1", "WaterTank_S2", "WaterTank_S3", "OilTank1_S1", "OilTank1_S2", "OilTank1_S3", "OilTank2_S1", "OilTank2_S2", "OilTank2_S3", "OilTank3_S1", "OilTank3_S2", "OilTank3_S3", "OilTank4_S1", "OilTank4_S2", "OilTank4_S3"
    FROM public."TankStatus" order by "DateTime" desc limit 1`
    const result= await db.query(query)
    return result.rows

    }
    catch(err){
      return err
    }
//    return "Hello World"
  }
  const dummy=async()=>{
    const query=`SELECT "TestBenchId", "DateTime", "TestBenchName", "Status", "ProjectId", "TestRunCount", "TestRunCountUpdate"
    FROM public."TestBenchCurrentStatus" order by "TestBenchId" `
    const data=await db.query(query)
    return data.rows


  }


  module.exports = { 
    getMainDashboardData , GetCurrentTestBenchDetails,getPlcStatusData,TestBenchRunningIdle,Last5Bench,TestObjectCount,TestbenchDetails,getProjectDetials,ProjectTotalRunTime,getChartData,TankStatus,dummy
  };
  