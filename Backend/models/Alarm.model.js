var db=require("../database/db")



const getAlarm=async()=>{
    try{
        // const query=`SELECT  intime, chngtime, name, text, state, ackstate, genid, source, datetime, projectid, testno, groupname, message
        // FROM public."AlarmMaster" where state!='Inactive' and ackstate!='Acknowledged' group by  intime, chngtime, name, text, state, ackstate,
        // genid, source, datetime, projectid, testno, groupname, message  order by datetime limit 10`
        const query=`	with alarm  as (
            select row_number() over(partition by name order by datetime desc ) as a,intime, chngtime, name, text, state, ackstate, genid, source,
            datetime, projectid, testno, groupname, message from "AlarmMaster"
            ) select * from alarm where a=1 and state!='Inactive' and ackstate!='Acknowledged' limit 10`
        const result=await db.query(query)
        return result.rows


    }
    catch(err){
        return err
    }
}



module.exports={
    getAlarm
}