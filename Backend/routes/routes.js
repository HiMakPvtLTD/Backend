// server/routes/userRoutes.js
const express = require('express');
const userController = require('../controllers/user.controller');
const dashboardController = require('../controllers/dashboard.controller');
const dashboard2=require("../controllers/dashboard2.controller")
const timeseries=require("../controllers/runningProject")
const projectanalysis=require("../controllers/projectAnalysis.controller")
const analysis=require("../controllers/Analysis.controller")
const maintenance=require("../controllers/maintenance")
const node=require("../controllers/node-red")
const Report=require("../controllers/export")
const getdata=require("../controllers/testing")
const head=require("../controllers/header")
const alarm=require("../controllers/Alarm")
const router = express.Router();
const cors = require('cors');
const body=require("body-parser")



const app = express();
//app.use(cors());


//For logIn User
router.post('/login', userController.loginUser);
router.post("/forgotpass",userController.forgotPassword)
router.post("/changePassword",userController.changePassword)
router.post("/GetRoleMaster",userController.getRoleMaster)
router.post("/SetRole",userController.SetRole)
router.post("/updateRole",userController.UpdateRole)
router.post("/getAllRole",userController.getAllRole)
router.post("/getAllUser",userController.getAlluser)
router.post("/CreateUser",userController.CreateUser)
router.post("/UpdateUser",userController.UpdateUser)
router.post("/deleteUser",userController.deleteUser)
router.post("/getRole",userController.GetUserbyId)
router.post("/CreateNote",userController.CreateUserNote)
router.post("/UpdateNote",userController.UpdateUserNote)
router.post("/DeleteNote",userController.deleteNote)
router.post("/SelectNotebyid",userController.SelectUserNotebyid)
router.post("/SelectNote",userController.GetAllNotes)
router.post("/CreateFav",userController.CreateFav)
router.post("/UpdateFav",userController.UpdateFav)
router.post("/SelectFav",userController.selectFav)
router.post("/deleteFav",userController.deleteFav)
router.post("/CreateMaintenance",maintenance.CreateMaintenance)
router.post("/UpdateMaintenance",maintenance.UpdateMaintenance)
router.post("/SelectMaintenance",maintenance.SelectMaintenance)
router.post("/GetMaintenancebyid",maintenance.GetMaintenancebyid)
router.post("/deleteMaintenance",maintenance.deleteMaintenance)
router.post("/CreateAnnotation",userController.createAnnotation)
router.post("/UpdateAnnotation",userController.UpdateAnnotation)
router.post("/SelectAnnotation",userController.SelectAnnotaionbyid)
router.post("/DeleteAnnotation",userController.DeleteAnnotaion)
router.post ("/GetAllAnnotation",userController.SelectAllAnnotaion)
router.post("/clearHeader",head.clearToken)

//get Data For Main Dashboard
router.post('/main-dashboard', dashboardController.getMainDashboardData);

//get Data For Main Dashboard
router.get('/plcStatus', dashboardController.getPlcStatusData);
router.get("/testBenchCount",dashboardController.getTestBenchStatusCount)
router.get("/getLast5Bench",dashboardController.Last5BechData)
router.get("/getObjectCount",dashboardController.GetTestObjectCount)
router.get("/testBenchDetails",dashboardController.TestbenchDetails)
router.post("/getCurrentBenchDetails",dashboardController.GetCurrentTestBenchDetails)
router.post("/getProjectDetails",dashboardController.getProjectDetails)
router.post("/getListView",dashboard2.getListView)
router.post("/getProjectTime",dashboardController.getProjectTime)
router.post("/getRunningStats",timeseries.getStatsdata)
router.post("/getAllTestView",dashboard2.GetAlltestView)
// router.post("/test",dashboardController.test)
router.post("/getChartData",dashboardController.getChartData)
router.get("/benchTypeCount",dashboard2.getTestBenchtypeCount)
router.get("/getTankStatus",dashboardController.getTakStatus)
router.post("/getTimeSeriesbyid",timeseries.timeSeriesbyId)
router.post("/getTimeSeriesDatabyid",timeseries.getTimeSeriesDatabyID)
router.get("/getLastRunData",timeseries.getLastRun)
router.post("/getTestBenchseq",timeseries.getTestBenchseq)
router.get("/getRunDataList",projectanalysis.runProjectList)
router.post("/getProjectAnalysis",projectanalysis.getProjectDetailsan)
router.post("/dummy",dashboardController.dummy)
router.post("/getAnalysisData",analysis.GetAnalysisData)
router.post("/getAllAnalysisData",analysis.getAllAnalysisData)
router.post("/getCvariData",analysis.getCVariable)
router.get("/getGroupData",maintenance.getGroupData)
router.post("/UpdatePanelStatus",maintenance.UpdatePanelStatus)
router.get("/GetPanelStatus",maintenance.getPanelStatus)
router.post("/GetAmbiantData",analysis.getAmbiantData)
router.post("/getGroupCData",analysis.GetgroupCdata)
router.post("/getAggregateSeries",analysis.GetAggregateSeries)
router.post("/getAggregateAmbiant",analysis.GetAggregateAmbiant)
router.post("/getAllGroupC",analysis.getAllGroupC)



//for Alarm

router.post("/getAlarm",alarm.getAlarm)
router.post("/getAlarmData",alarm.getAlarmRange)
//For aggregate Purpose
router.post("/getGroupvsSeries",analysis.GetGroupvsSeries)

router.post("/getGroupvsAmbiant",analysis.GetGroupvsambiant)


//Send Mail from Node-red
router.post("/sendMail",node.sendMailtored)
router.post("/sms",node.sms)

//Excel Report
router.post("/GetSeriesReport",Report.getTimeSeriesReport)
// router.post("/getPdf",Report.TestPdf)
router.post("/getAmbiantReport",Report.getAmbiantReport)
router.post("/getGroupCReport",Report.GroupCExport)
router.post("/getTankReport",Report.getTankReport)
router.post("/getAlarmReport",Report.getAlarmReport)

module.exports = router;
