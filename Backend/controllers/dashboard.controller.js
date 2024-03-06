const dashboardModel = require('../models/dashboard.model');
const dat=require("../function/date")
var db=require("../database/db")
const verify=require("../function/tokenverify")


const getMainDashboardData = async (req, res) => {

    try {
      const dashData = await dashboardModel.getMainDashboardData(); 
      
      //console.log(req.headers)
      // var token=verify.verify(req.headers.authorization)
      // console.log(token)
      // console.log(req.ip)
      
      
      if (dashData) {
       // console.log(dashData.rows[0].DateTime)
        dashData.rows[0].DateTime= new Date(dashData.rows[0].DateTime)
        

         //dashData.rows[0].WT_Temp_SP=55
        // dashData.rows[0].OilTank3Temp=75
        // dashData.rows[0].WaterTankTemp=50
        // dashData.rows[0].OilTank4Level=80
        //   dashData.rows[0].LabTemp=5
        //dashData.rows[0].LabEmergency=true
        // dashData.rows[0].LabAirQualityVOC=101
          // dashData.rows[0].Humi_LSP=10
           //dashData.rows[0].VOC_HSP=50
          // dashData.rows[0].VOC_HHSP=20
          // dashData.rows[0].Humi_LLSP=5
          //dashData.rows[0].LabHumidity=100
        // console.log(dashData.rows)
        //console.log(dat.TestDate(dashData.rows[0].DateTime))

       // console.log(dashData.rows[0].DateTime)
       
        res.set({
          "Content-Type":"application/json",
        })
        res.json({ success: true, message: 'MasterPanel data retrieved successfully', dashData });
      } else {
        res.json({ success: false, message: 'No table data found' });
      }
    } catch (error) {
      console.error('Error fetching table data:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  };
  const getChartData=async(req,res)=>{
    
    try{
      const starttime=req.body.params.starttime
    const endtime=req.body.params.endtime
    //console.log(req.body)

    // const test2start=new Date(starttime)
    // const test2end=new Date(endtime)
    // //const startformat=`${test2start.getFullYear()}-${test2start.getMonth()+1}-${test2start.getDate()} ${test2start.getHours()}-${test2start.getMinutes()}-${test2start.getSeconds()}`
    // const startformat=dat.convertDate(test2start)
    // const endformat=dat.convertDate(test2end)
    // console.log(startformat,endformat)
    // //const test2end=new Date(endtime)
   
    // const testStart=moment(test2start)
    // const testend=moment(test2end)
    // const parseDateString = (dateString) => {
    //   const [day, month, yearTime] = dateString.split('/');
    //   const [year, time] = yearTime.split(', ');
    //   const [hour, minute, second] = time.split(':');
    //   const isPM = dateString.includes('pm');
    
    //   return new Date(year, month - 1, day, isPM ? parseInt(hour, 10) + 12 : parseInt(hour, 10), minute, second);
    // };

    // const test2start=parseDateString(starttime)
    // const test2end=parseDateString(endtime)
    // console.log(test2start,test2end)



   //console.log(starttime,endtime)
   //const start=new Date(starttime.slice(5,8),starttime.slice(3)).toISOString()
   
  //  console.log(testStart,testend)
   //const date=new Date().toLocaleString()
   const start=dat.convertDate(starttime.toLocaleString())
   const end=dat.convertDate(endtime.toLocaleString())
   
    //  console.log(start,end)
  //    const date=new Date(starttime)
  //  console.log(date.getFullYear())
    

    const data= await dashboardModel.getChartData(start,end)
    //console.log(data)
    
    if(data){
      //var str=JSON.stringify(data)
      // res.set({
      //   "Content-Type":"application/arraybuffer",
      //   "content-Encoding":'gzip'
      // })

      // zlib.gzip(str,(err,ress)=>{
      //   if(err) throw err
      //  res.send({
      //   data:ress.toString('base64')
      //  })
        
      // })
      // const mi=mini(data)
      // console.log(mi)
     
      //console.log(data.length,"datatime")
       res.send(data)
      //console.log(data)
    }
    else{
      res.send("NO Data")
    }
    }
    catch(err){
      res.send(err)
    }
  }
  
  const getPlcStatusData = async (req, res) => {
    try {
      const dashData = await dashboardModel.getPlcStatusData();
      
  
      if (dashData) {
        //dashData[0].Status=false
        
        res.json({ success: true, message: 'MasterPanel data retrieved successfully', dashData });
      } else {
        res.json({ success: false, message: 'No table data found' });
      }
    } catch (error) {
      console.error('Error fetching table data:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  };
  //Get Test BenchRunning IDle Count
  const getTestBenchStatusCount=async(req,res)=>{
    try{
      
      const dashdata= await dashboardModel.TestBenchRunningIdle();
      
      
      if(dashdata){
        res.send({"success":true,"Running":dashdata.rows[0].running,"Available":dashdata.rows[0].idel })
      }
      else{
        res.send({success:"false",message:"data not found"})
      }
    }catch(err){
      res.send(err)
    }
  }
  //Get Last 5 Test Bench Data
  const Last5BechData=async(req,res)=>{
    try{
      const data=await dashboardModel.Last5Bench()
      if(data){
        res.send({sucess:true,data:data})
      }
      else{
        res.send({sucess:false,message:"Not Found"})
      }
    }
    catch(err){
      res.send(err)
    }
  }
  //Get Test Object Count
  const GetTestObjectCount=async(req,res)=>{
    try{
      var data=await dashboardModel.TestObjectCount()
      
      var data2={
        "totalWeeklyObjCount":data[0].Week,
        "totalMonthlyObjCount":data[0].Month,
        "totalYearlyObjCount":data[0].Year
      }
    if(data){
      res.send(data2)
    }
    else{
      res.status(404).send("Data Not Found")
    }
    }
    catch(err){
      res.send(err)
    }
  }
  //Get 7 Test Bench data
  const TestbenchDetails=async(req,res)=>{
    try{
      const data= await dashboardModel.TestbenchDetails()
      // var k=
      //   {
      //       "Status": "idle",
      //       "ProjectName": "Testing2 Hi-Mak",
      //       "ProjectNo": "12345",
      //       "ProjectType": "AODD",
      //       "ProjectId": "1211022112",
      //       "TestRunCount": 2,
      //       "ProjectOwner": "ChiragS",
      //       "TestBenchId": 2
      //   }
      //   data.push(k)
    
      if(data){
        //data[6].Status="Running"
       

        res.send(data)
      }
      else{
        res.send("data not Found")
      }
    }
    catch(err){
      res.send(err)
    }
  }
  // Get Project Details by id for 2 dashboard 
  const getProjectDetails=async(req,res)=>{
    const id=req.body.id
    //console.log(id)
    try{
      const data=await dashboardModel.getProjectDetials(id)
      if(data){
      //data[0].Status="Running"
       // console.log(data,id)
        res.send(data)
      }
      else{
     //   console.log("error found")
        res.send("No data Found")
      }
    }
    catch(err){
     // console.log(err)
      res.send(err)
    }
  }
  const getTakStatus=async(req,res)=>{
    try{
      const data=await dashboardModel.TankStatus()
      // const d={
      //   "WaterTank_S1":3,
      //   "WaterTank_S2":4,
      //   "WaterTank_S3":7,
      //   "OilTank1_S1":2,
      //   "OilTank1_S2":3,
      //   "OilTank1_S3":4,
      //   "OilTank2_S1":5,
      //   "OilTank2_S2":3,
      //   "OilTank2_S3":6,
      //   "OilTank3_S1":6,
      //   "OilTank3_S2":7,
      //   "OilTank3_S3":4,
      //   "OilTank4_S1":1,
      //   "OilTank4_S2":2,
      //   "OilTank4_S3":3
      // }
      if(data.length>0){
       // console.log(data.length)
        res.send(data)
      }
      else{
       res.send("Data Not Available")
      }
    }
    catch(err){
      res.send(err)
    }

  }
  const getProjectTime=async(req,res)=>{
    try{
      const id=req.body.id
      //const no=req.body.no
      const data=await dashboardModel.ProjectTotalRunTime(id)
      if(data){
       // console.log(data)
        res.send(data)
      }
      else{
        res.send("No data Available")
      }

    }catch(err){
      res.send(err)
    }

  }
  const dummy=async(req,res)=>{
    try{

    
     const data=req.body.data
     var arr=[]
     data.map((item)=>{
      arr.push(`"${item}"`)

     })
    // var arr2=[`"LabAirQualityPM2_5"`]
     const sql=`select ${data.join()} from "MasterPanel" limit 1  `
     //console.log(sql) 
     const result=await db.query(sql)
    
    //  console.log(result.rows)
    //  console.log(data)

      if(data){
        res.send(data)
      }

    }
   
    catch(err){
      res.status(500).json("error occured")

    }
  }
  
  

  

  
  module.exports = { getMainDashboardData, dummy ,getPlcStatusData,getTestBenchStatusCount,Last5BechData,GetTestObjectCount,TestbenchDetails,getProjectDetails,getChartData,getTakStatus,getProjectTime };