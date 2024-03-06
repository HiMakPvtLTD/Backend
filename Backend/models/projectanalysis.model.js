var db=require('../database/db')

const rundataList=async()=>{
    try{
        const query=`SELECT "ProjectId" , "TestNo"
	FROM public."TestRunData";`
    const result=await db.query(query)
    return result.rows
    
    }
    catch(err){
        return err
    }
}
const getProjectDetailsan=async(id,no)=>{
    try{
        const query=`select  pm."ProjectId", pm."IotPanelId", pm."ProjectName", pm."ProjectNo", pm."Group", pm."ProjectOwner", pm."ProjectType", pm."ProjectConfig", trd."TestNo"
        from "ProjectMaster"  pm join "TestRunData" trd on pm."ProjectId"=trd."ProjectId" where trd."ProjectId"='${id}' and trd."TestNo"=${no} `
        const result=await db.query(query)
        return result.rows
    }
    catch(err){
        return err
    }

}
const getdemandData=(id,arr,no)=>{
    try{
        const query=""
    }
    catch(err){
        return err
    }

}

module.exports={
    rundataList,
    getProjectDetailsan
}