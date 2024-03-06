const getdata=require("../models/test")



const getData=async(req,res)=>{
try{

   // const data=await getdata.getTestCdata()
    const start=req.body.start
    const end=req.body.end
  const data=await getdata.getTestCdata2(start,end) 
   res.send(data)

}catch(err){
    res.send(err)
}
}



const PanduData1 = async (req, res) => {
    try {
      const data = await getdata.getTestCData3(req.body.start, req.body.end);
  
      const df = new DataFrame(data);
  
      // Corrected method name 'pivot' instead of 'piviot'
      const pivotTable = df.pivot(["DateTime"], ["concat"], 'Value', values => values); 
  
      const response = pivotTable.to_json();
      res.send(response);
    } catch (err) {
      res.send(err);
    }
  };

  const Sms=()=>{

  }

module.exports={
    getData,
    PanduData1
}