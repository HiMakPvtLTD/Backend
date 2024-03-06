var excel=require("exceljs")



const CreateExcel=(data)=>{
    const workbook=new excel.Workbook()
    const sheet=workbook.addWorksheet("my Sheet")
    const length=5

    
    const headers=["ProjectId","Name","ProjectNo","Group","ProjectType","TestNo","ProjectConfig","TestBenchNo","StartDateTime","EndDateTime","Difference","BU Name","ProductName","ProductSize","Remarks"]
    const datas=["12010225227","Test","18432","B","EODD","27","Endurance","3","14-02-2024 12:50","14-02-2024 15:30","1D:12H:10M","Pop","Ponds","12","test"]
    headers.map((item,index)=>{
        if(headers.length>length){
            sheet.addRow(headers.slice(0,length))
            sheet.addRow(datas.slice(0,length))
            sheet.addRow([])
            sheet.addRow(headers.slice(length,-1))
            sheet.addRow(datas.slice(length,-1))
        }
        else{
            sheet.addRow(headers)
            sheet.addRow(datas)
        }

    })
    workbook.xlsx.writeBuffer().then((Buffer)=>{
        res.attachment('excelSheet1.xlsx')
        res.send("Buffer")
    })



}
module.exports={
    CreateExcel
}