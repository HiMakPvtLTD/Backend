var excel=require("exceljs")
const fs=require("fs")
var image=require("../function/image")
const test=require("../models/test")
const analysis=require("../models/Analysis.model")
const dates=require("../function/date")
const alarm=require("../models/Alarm.model")
const headjson=require("./data.json")
const { createCanvas } = require('canvas');
const echarts = require('echarts');

// const pdf=require("pdfkit")
// const {table}=require("table")
// const jspdf=require("jspdf")
// const autoTable=require("jspdf-autotable")
const pdfMake=require("pdfmake/build/pdfmake")
const pdffont=require("pdfmake/build/vfs_fonts")
const { ECDH } = require("crypto")


pdfMake.vfs=pdffont.pdfMake.vfs



const getTimeSeriesReport= async (req,res)=>{
    try{
        const head=req.body.headers
        const value=req.body.value
        const from=req.body.fromDate
        const to=req.body.toDate
        const id=req.body.projectId
        const needvar=req.body.match
        console.log(req.body)
        const data=await analysis.DataforSeriesExport(id,needvar,value[6])
       // console.log(data[0])
            const getaddress= await image.base64_encode()
           // console.log(getaddress)
           const length=needvar.length
           console.log(1)
            const workbook=new excel.Workbook()
            const sheet=workbook.addWorksheet("NPD-Project-Report")
           
            // sheet.addImage({
            //     base64: getaddress, // Replace with your actual base64-encoded image data
            //     extension: 'png', // Replace with your image extension (e.g., png, jpeg)
            // });
            const imageId2 = workbook.addImage({
                base64: getaddress,
                extension: 'jpg',
              });
                sheet.addImage(imageId2, 'A1:E4');
               // sheet.addRow()
                
                
                
                const title=sheet.addRow(["NPD Project Test Report "])
                title.font={bold:true,size:16}
                title.alignment={horizontal:'center'}
                sheet.mergeCells("A6:E6")

                 title.eachCell((item)=>{
                    item.fill={type: 'pattern',
                    pattern: 'solid',fgColor:{ argb: 'D3D3D3' }}
                   // item.border={bottom:{style:"thin",color:{argb:"FF000000"}}}
                })

                const title2=sheet.addRow(["(System Generated Report)"])
                title2.alignment={horizontal:"center"}
                sheet.mergeCells("A7:E7")
                title2.eachCell((item)=>{
                    item.fill={type: 'pattern',
                    pattern: 'solid',fgColor:{ argb: 'D3D3D3' }}
                    //item.border={left:{style:"thin",color:{argb:"FF000000"}},right:{style:"thin",color:{argb:"FF000000"}},top:{style:"thin",color:{argb:"FF000000"}},bottom:{style:"thin",color:{argb:"FF000000"}}}
                })

            //    const currentrowindex=sheet.rowCount
               
            //    const endclumindex=sheet.columnCount
            //    sheet.mergeCells(currentrowindex,1,currentrowindex,endclumindex)

           
              console.log(1.5)
        
            
            const headers=["Project Name","Project Owner","Project Number","Project Id","Group","Project Type","Test Number","Project Config","Project Start Date","Project End Date","Project Run Time","BU Name","ProductName","ProductSize","Remarks"]
            //const datas=["12010225227","Test","18432","B","EODD","27","Endurance","3","14-02-2024 12:50","14-02-2024 15:30","1D:12H:10M","Pop","Ponds","12","test"]
        //   console.log(2)
        //         if(head.length>length){
        //             const headerow=sheet.addRow(head.slice(0,length),style="Bold")
        //             headerow.font={bold:true}
        //             headerow.alignment={horizontal:"center"}
        //             sheet.addRow(value.slice(0,length))
        //             sheet.addRow([])
        //             const headerrow2=sheet.addRow(head.slice(length,-1))
        //             headerrow2.font={bold:true}
        //             headerrow2.alignment={horizontal:"center"}
        //             sheet.addRow(value.slice(length,-1))
        //         }
        //         else{
        //             sheet.addRow(head)
        //             sheet.addRow(value)
        //         }
        var num=8
       // console.log(typeof(head[0].toString()))
        // head[0]=`'${head[0]}'`

        // value[8]=dates.convertDateUTC(value[8])
        // value[9]=dates.convertDateUTC(value[9])
        value[8]=dates.convertDateFormat(value[8])
        console.log(value[8])
        value[9]=dates.convertDateFormat(value[9])
        var ReportStart=value[8]
        var ReportEnd=value[9]
        var type=value[5]
        console.log(ReportStart)


          
        // value[10]=new Date(value[9]).toLocaleString('en-US', {
        //     year: 'numeric',
        //     month: '2-digit',
        //     day: '2-digit',
        //     hour: '2-digit',
        //     minute: '2-digit',
        //     second: '2-digit'
        //   })
        
        head.map((item,index)=>{
            sheet.addRow([headers[index],value[index]]).alignment={horizontal:"left"}
            sheet.getCell(`A${num}`).font={bold:true}
            num += 1; 
           // sheet.alignment={horizontal:"center"}
        })
        // sheet.columns.map((item)=>{
        //     item.width=18
        // })
        // sheet.getCell("C15").numFmt='yyyy-mm-dd hh:mm:ss'
        // sheet.getCell("C16").numFmt='yyyy-mm-dd hh:mm:ss'
        //
        
        console.log(1.7)
        

        
               
              
                sheet.addRow()
                sheet.addRow()
      
                sheet.addRow([`Report Start Time`, value[8],"","Report End Time",value[9]]).alignment={horizontal:"center"}

                sheet.getCell("A26").font={bold:true}
                sheet.getCell("D26").font={bold:true}
                
                
                sheet.addRow()
                sheet.addRow()
                //console.log(data)

                const dataheader=[]
                console.log(data[0])
                Object.keys(data[0]).map((item)=>{
                    dataheader.push(headjson[0][item])
                })
                const datavalue = data;
        
                const datahead=sheet.addRow(dataheader)
                datahead.eachCell((item)=>{
                    item.fill={type: 'pattern',
                    pattern: 'solid',fgColor:{ argb: 'D3D3D3' }}
                   // item.border={left:{style:"thin",color:{argb:"FF000000"}},right:{style:"thin",color:{argb:"FF000000"}},top:{style:"thin",color:{argb:"FF000000"}},bottom:{style:"thin",color:{argb:"FF000000"}}}
                })
                // const cell=sheet.getCell("A29")
                // cell.fill={ }
                datahead.font={bold:true}
                datahead.alignment={vertical:"middle",horizontal:"center",wrapText:true}

                console.log(1.9)
            
                
                
                
                
                datavalue.forEach((item,index) => {
                    item["DateTime"]=dates.convertDateFormat(item["DateTime"])
                    item["TestNo"]=`${item["TestNo"]}`
                    if(type=="AODD"){
                        if(item.hasOwnProperty("StrokeCount")){
                         item["StrokeCount"]=`${item["StrokeCount"]}`
                        }
                        if(item.hasOwnProperty("StrokeCountRate")){
                         item["StrokeCountRate"]=`${item["StrokeCountRate"]}`
                        }
                       
                      
                     }
                    const values = Object.values(item);
                    if(index==1){
                        console.log(item)
                    }
                    const data=sheet.addRow(values);

                    data.alignment={horizontal:"center"}
                    data.numFmt="0.00"
                });
                console.log(2.5)

                sheet.columns.forEach((column, colNumber) => {
                    let maxLength = 0;
                    column.eachCell({ includeEmpty: true }, (cell) => {
                        const columnLength = cell.value ? cell.value.toString().length : 0;
                        maxLength = Math.max(maxLength, columnLength);
                    });
                    column.width = maxLength < 10 ? 10 : maxLength + 2; // Adding extra width for padding
                });

                // sheet.columns.map((item)=>{
                //     item.width=24
                // })
                // sheet.add
                // const chart = sheet.addChart('line', 'U1:AA10', 'AB1:AE10');
                // chart.title = 'Database Chart';
                // chart.xAxis.title = 'X Axis';
                // chart.yAxis.title = 'Y Axis';
                // console.log(2.7)
                const date=new Date()
                const custom=`${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`


        
                // Save the workbook to a buffer and send it as a response

                var name="NPD-Project-Report "+custom
                return  workbook.xlsx.writeBuffer()
                    .then((buffer) => {
                        res.attachment(`${name}.xlsx`);
                        res.type('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
                        console.log(3)
                        res.send(buffer);
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                        res.status(500).send('Internal Server Error');
                    });
        
        
        
        }

    
    catch(err){
        res.status(500).send("INTERNAL SERVER ERROR")
    }
}

const getTimeSeriesReport1= async (req,res)=>{
    try{
        const head=req.body.headers
        const value=req.body.value
        const from=req.body.fromDate
        const to=req.body.toDate
        const id=req.body.projectId
        const needvar=req.body.match
        console.log(req.body)
        var data=await analysis.DataforSeriesExport(id,needvar,value[6])
       // console.log(data[0])
            const getaddress= await image.base64_encode()
           // console.log(getaddress)
           const length=needvar.length
           console.log(1)
            const workbook=new excel.Workbook()
            const sheet=workbook.addWorksheet("NPD-Project-Report")
           
            // sheet.addImage({
            //     base64: getaddress, // Replace with your actual base64-encoded image data
            //     extension: 'png', // Replace with your image extension (e.g., png, jpeg)
            // });
            const imageId2 = workbook.addImage({
                base64: getaddress,
                extension: 'jpg',
              });
                sheet.addImage(imageId2, 'A1:E4');

                const worksheet2=workbook.addWorksheet("NPD-Project-Chart")
               
                worksheet2.addImage(imageId2, 'A1:E4');
               // sheet.addRow()
                
                
                
                const title=sheet.addRow(["NPD Project Test Report "])
                const titlesheet2=worksheet2.addRow(["NPD Project Test Report "])
                title.font={bold:true,size:16}
                title.alignment={horizontal:'center'}
                sheet.mergeCells("A6:E6")
                titlesheet2.font={bold:true,size:16}
                titlesheet2.alignment={horizontal:'center'}
                worksheet2.mergeCells("A6:E6")

                 title.eachCell((item)=>{
                    item.fill={type: 'pattern',
                    pattern: 'solid',fgColor:{ argb: 'D3D3D3' }}
                   // item.border={bottom:{style:"thin",color:{argb:"FF000000"}}}
                })

                titlesheet2.eachCell((item)=>{
                    item.fill={type: 'pattern',
                    pattern: 'solid',fgColor:{ argb: 'D3D3D3' }}
                   // item.border={bottom:{style:"thin",color:{argb:"FF000000"}}}
                })

                const title2=sheet.addRow(["(System Generated Report)"])
                title2.alignment={horizontal:"center"}
                sheet.mergeCells("A7:E7")
                title2.eachCell((item)=>{
                    item.fill={type: 'pattern',
                    pattern: 'solid',fgColor:{ argb: 'D3D3D3' }}
                    //item.border={left:{style:"thin",color:{argb:"FF000000"}},right:{style:"thin",color:{argb:"FF000000"}},top:{style:"thin",color:{argb:"FF000000"}},bottom:{style:"thin",color:{argb:"FF000000"}}}
                })

                const title2sheet=worksheet2.addRow(["(System Generated Report)"])
                title2sheet.alignment={horizontal:"center"}
                worksheet2.mergeCells("A7:E7")
                title2sheet.eachCell((item)=>{
                    item.fill={type: 'pattern',
                    pattern: 'solid',fgColor:{ argb: 'D3D3D3' }}
                    //item.border={left:{style:"thin",color:{argb:"FF000000"}},right:{style:"thin",color:{argb:"FF000000"}},top:{style:"thin",color:{argb:"FF000000"}},bottom:{style:"thin",color:{argb:"FF000000"}}}
                })


            //    const currentrowindex=sheet.rowCount
               
            //    const endclumindex=sheet.columnCount
            //    sheet.mergeCells(currentrowindex,1,currentrowindex,endclumindex)

           
              console.log(1.5)
        
            
            const headers=["Project Name","Project Owner","Project Number","Project Id","Group","Project Type","Test Number","Project Config","Project Start Date","Project End Date","Project Run Time","BU Name","ProductName","ProductSize","Remarks"]
            //const datas=["12010225227","Test","18432","B","EODD","27","Endurance","3","14-02-2024 12:50","14-02-2024 15:30","1D:12H:10M","Pop","Ponds","12","test"]
        //   console.log(2)
        //         if(head.length>length){
        //             const headerow=sheet.addRow(head.slice(0,length),style="Bold")
        //             headerow.font={bold:true}
        //             headerow.alignment={horizontal:"center"}
        //             sheet.addRow(value.slice(0,length))
        //             sheet.addRow([])
        //             const headerrow2=sheet.addRow(head.slice(length,-1))
        //             headerrow2.font={bold:true}
        //             headerrow2.alignment={horizontal:"center"}
        //             sheet.addRow(value.slice(length,-1))
        //         }
        //         else{
        //             sheet.addRow(head)
        //             sheet.addRow(value)
        //         }
        var num=8
       // console.log(typeof(head[0].toString()))
        // head[0]=`'${head[0]}'`

        // value[8]=dates.convertDateUTC(value[8])
        // value[9]=dates.convertDateUTC(value[9])
        value[8]=dates.convertDateFormat(value[8])
        console.log(value[8])
        value[9]=dates.convertDateFormat(value[9])
        var ReportStart=value[8]
        var ReportEnd=value[9]
        var type=value[5]
        console.log(ReportStart)


          
        // value[10]=new Date(value[9]).toLocaleString('en-US', {
        //     year: 'numeric',
        //     month: '2-digit',
        //     day: '2-digit',
        //     hour: '2-digit',
        //     minute: '2-digit',
        //     second: '2-digit'
        //   })
        
        head.map((item,index)=>{
            sheet.addRow([headers[index],value[index]]).alignment={horizontal:"left"}
            worksheet2.addRow([headers[index],value[index]]).alignment={horizontal:"left"}
            
            sheet.getCell(`A${num}`).font={bold:true}
            worksheet2.getCell(`A${num}`).font={bold:true}
            num += 1; 
           // sheet.alignment={horizontal:"center"}
        })
        // sheet.columns.map((item)=>{
        //     item.width=18
        // })
        // sheet.getCell("C15").numFmt='yyyy-mm-dd hh:mm:ss'
        // sheet.getCell("C16").numFmt='yyyy-mm-dd hh:mm:ss'
        //
        
        console.log(1.7)
        

        
               
              
                sheet.addRow()
                worksheet2.addRow()
                sheet.addRow()
                worksheet2.addRow()
      
                sheet.addRow([`Report Start Time`, value[8],"","Report End Time",value[9]]).alignment={horizontal:"center"}
                worksheet2.addRow([`Report Start Time`, value[8],"","Report End Time",value[9]]).alignment={horizontal:"center"}

                sheet.getCell("A26").font={bold:true}
                worksheet2.getCell("A26").font={bold:true}
                sheet.getCell("D26").font={bold:true}
                worksheet2.getCell("D26").font={bold:true}
                
                
                sheet.addRow()
                sheet.addRow()
                worksheet2.addRow()
                worksheet2.addRow()
                //console.log(data)

                const dataheader=[]
                console.log(data[0])
                Object.keys(data[0]).map((item)=>{
                    dataheader.push(headjson[0][item])
                })
                const datavalue = data;
        
                const datahead=sheet.addRow(dataheader)
                datahead.eachCell((item)=>{
                    item.fill={type: 'pattern',
                    pattern: 'solid',fgColor:{ argb: 'D3D3D3' }}
                   // item.border={left:{style:"thin",color:{argb:"FF000000"}},right:{style:"thin",color:{argb:"FF000000"}},top:{style:"thin",color:{argb:"FF000000"}},bottom:{style:"thin",color:{argb:"FF000000"}}}
                })
                // const cell=sheet.getCell("A29")
                // cell.fill={ }
                datahead.font={bold:true}
                datahead.alignment={vertical:"middle",horizontal:"center",wrapText:true}

                console.log(1.9)

                
            
                
                
                
                
                datavalue.forEach((item,index) => {
                    item["DateTime"]=dates.convertDateFormat(item["DateTime"])
                    item["TestNo"]=`${item["TestNo"]}`
                    if(type=="AODD"){
                       if(item.hasOwnProperty("StrokeCount")){
                        item["StrokeCount"]=`${item["StrokeCount"]}`
                       }
                       if(item.hasOwnProperty("StrokeCountRate")){
                        item["StrokeCountRate"]=`${item["StrokeCountRate"]}`
                       }
                      
                     
                    }
                    const values = Object.values(item);
                    if(index==1){
                        console.log(item)
                    }
                    const data=sheet.addRow(values);

                    data.alignment={horizontal:"center"}
                    data.numFmt="0.00"
                });
                console.log(2.5)

                sheet.columns.forEach((column, colNumber) => {
                    let maxLength = 0;
                    column.eachCell({ includeEmpty: true }, (cell) => {
                        const columnLength = cell.value ? cell.value.toString().length : 0;
                        maxLength = Math.max(maxLength, columnLength);
                    });
                    column.width = maxLength < 10 ? 10 : maxLength + 2; // Adding extra width for padding
                });

                worksheet2.columns.forEach((column, colNumber) => {
                    let maxLength = 0;
                    column.eachCell({ includeEmpty: true }, (cell) => {
                        const columnLength = cell.value ? cell.value.toString().length : 0;
                        maxLength = Math.max(maxLength, columnLength);
                    });
                    column.width = maxLength < 10 ? 10 : maxLength + 2; // Adding extra width for padding
                });


              
                console.log(2.6)
                var chartConfig=[]
                const label=[]
                const testhead=Object.keys(data[0])
                console.log(testhead.slice(3,testhead.length))
                const canvas = createCanvas(1000, 1000);
const ctx = canvas.getContext('2d');

const customTheme = {
    textStyle: {
        fontFamily: 'DejaVu Sans'
    }
};
echarts.registerTheme('customTheme',customTheme)
const chart = echarts.init(canvas, "dark", { renderer: 'canvas' });


                testhead.slice(3,testhead.length).map((item)=>{
                    chartConfig.push({
                        name:headjson[0][item],
                        "noname":item,
                        type:'line',
                        data:[],
                       
                        
                    })
                })
                console.log(2.6)
                
                
                data.map((item,index)=>{
                   // console.log(item)
                    Object.keys(item).forEach((key)=>{
                        const exist=chartConfig.find((entry)=>entry.noname==key)
                        
                        if (exist){
                            exist.data.push(Number(item[key]))
                        }
                        if (key=="DateTime"){
                            label.push(item["DateTime"])
                        }
                    })
                })
                console.log(chartConfig[5])

                const options = {
                    
                   
                    legend:{
                        
                        //orient:"vertical",
                        top:"bottom",
                       
                        data:dataheader.slice(3,dataheader.length)
                    },
                    grid: {
                        left: '5%',
                        right: '3%',
                        bottom: '10%',
                        containLabel: true
                      },
                    
                    xAxis: {
                       
                        type: 'category',
                        data:label,
                    },
                    yAxis: {
                       
                        type: 'value',
                    },
                    series: chartConfig
                };
                //console.log(options)

                chart.setOption(options,"customTheme");
                var buffers = canvas.toDataURL('image/png',100);
                console.log(2.7)
               // console.log(buffers.toString("base64"))


               // console.log(buffer.toString("base64"))
                




              //  console.log(chartConfig)
               

            //     const width = 400; //px
            //     const height = 400; //px
            //     const backgroundColour = 'white'; 
            //     console.log(2.61)
            //     const chartJSNodeCanvas = new ChartJSNodeCanvas({ width:1000, height:1500,backgroundColour:"white" });
            //     console.log(2.6)
            //     const configuration = {
            //         type: 'line',   // for line chart
            //         data: {
            //             labels: label,
            //             datasets: chartConfig
                
            //         },
            //         options: {
            //             scales: {
            //                 y: {
            //                     suggestedMin: 0,
            //                 }
            //             }
            //         }
            //     }
            //     var chartimage=''
            //     const run=async()=> {
            //        try{
            //         console.log(configuration)
            //         const dataUrl =await  chartJSNodeCanvas.renderToDataURL(configuration)
            //         console.log(dataUrl)
            //         const base64Image = dataUrl
            //         chartimage=base64Image
                
                    
                
                
                   
            //         return dataUrl
            //        }
                
            //     catch(err){
            //         console.log(err)
            //     }
            // }
            //     await run()
            //     console.log(2.69)
               
    const imageId3 = workbook.addImage({
        base64: buffers.toString("base64"),
        extension: 'png',
      });
        worksheet2.addImage(imageId3, 'A29:K60');
       

                // sheet.columns.map((item)=>{
                //     item.width=24
                // })
                // sheet.add
                // const chart = sheet.addChart('line', 'U1:AA10', 'AB1:AE10');
                // chart.title = 'Database Chart';
                // chart.xAxis.title = 'X Axis';
                // chart.yAxis.title = 'Y Axis';
                // console.log(2.7)
                const date=new Date()
                const custom=`${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`


        
                // Save the workbook to a buffer and send it as a response

                var name="NPD-Project-Report "+custom
                return  workbook.xlsx.writeBuffer()
                    .then((buffer) => {
                        res.attachment(`${name}.xlsx`);
                        res.type('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
                        console.log(3)
                        res.send(buffer);
                        buffers=""
                        chartConfig=[]

                    })
                    .catch((error) => {
                        console.error('Error:', error);
                        res.status(500).send('Internal Server Error');
                    });
        
        
        
        }

    
    catch(err){
        res.send(err)
    }
}


const getAmbiantReport= async (req,res)=>{
    try{
     //   const head=req.body.headers
      //  const value=req.body.value
        const from=req.body.start
        const to=req.body.end
       // const id=req.body.projectId
        const needvar=req.body.data
        console.log(req.body)
        const data=await analysis.getMasterAmbientdata(from,to,needvar)
       // console.log(data[0])
            const getaddress= await image.base64_encode()
           // console.log(getaddress)
           const length=needvar.length
           console.log(1)
            const workbook=new excel.Workbook()
            const sheet=workbook.addWorksheet("NPD-Environment-Report")
           
            // sheet.addImage({
            //     base64: getaddress, // Replace with your actual base64-encoded image data
            //     extension: 'png', // Replace with your image extension (e.g., png, jpeg)
            // });
            const imageId2 = workbook.addImage({
                base64: getaddress,
                extension: 'jpg',
              });
                sheet.addImage(imageId2, 'A1:F4');
           
              console.log(1.5)

              const title=sheet.addRow(["NPD Environment Report "])
              title.font={bold:true,size:16}
              title.alignment={horizontal:'center'}
              sheet.mergeCells("A6:F6")
              title.eachCell((item)=>{
                item.fill={type: 'pattern',
                pattern: 'solid',fgColor:{ argb: 'D3D3D3' }}
               // item.border={bottom:{style:"thin",color:{argb:"FF000000"}}}
            })
              const title2=sheet.addRow(["(System Generated Report)"])
              title2.alignment={horizontal:"center"}
              sheet.mergeCells("A7:F7")
              title2.eachCell((item)=>{
                item.fill={type: 'pattern',
                pattern: 'solid',fgColor:{ argb: 'D3D3D3' }}
               // item.border={bottom:{style:"thin",color:{argb:"FF000000"}}}
            })
        
            
            // const headers=["ProjectId","Name","ProjectNo","Group","ProjectType","TestNo","ProjectConfig","TestBenchNo","StartDateTime","EndDateTime","Difference","BU Name","ProductName","ProductSize","Remarks"]
            // const datas=["12010225227","Test","18432","B","EODD","27","Endurance","3","14-02-2024 12:50","14-02-2024 15:30","1D:12H:10M","Pop","Ponds","12","test"]
        //   console.log(2)
        //         if(head.length>length){
        //             const headerow=sheet.addRow(head.slice(0,length),style="Bold")
        //             headerow.font={bold:true}
        //             headerow.alignment={horizontal:"center"}
        //             sheet.addRow(value.slice(0,length))
        //             sheet.addRow([])
        //             const headerrow2=sheet.addRow(head.slice(length,-1))
        //             headerrow2.font={bold:true}
        //             headerrow2.alignment={horizontal:"center"}
        //             sheet.addRow(value.slice(length,-1))
        //         }
        //         else{
        //             sheet.addRow(head)
        //             sheet.addRow(value)
        //         }
        var num=6

        // headers.map((item,index)=>{
        //     sheet.addRow([headers[index],"",datas[index]])
        //     sheet.getCell(`A${num}`).font={bold:true}
            
            
            
            
           
           
        //     num += 1; 
           
          
        //     sheet.alignment={horizontal:"center"}
        // })
        sheet.columns.map((item)=>{
            item.width=20
        })
       // console.log(`A${num}`)
        //
        
        console.log(1.7)
        

        
               
              
                sheet.addRow()
                sheet.addRow([`Report Start Date`,dates.convertDateFormat(from),"","Report End Date",dates.convertDateFormat(to)]).alignment={horizontal:"center"}

                sheet.getCell("A9").font={bold:true}
                sheet.getCell("D9").font={bold:true}
                sheet.addRow()
                sheet.addRow()
                const dataheader=[]

               // const dataheader = Object.keys(data[0]);
               Object.keys(data[0]).map((item)=>{
                dataheader.push(headjson[1][item])

               })
              
                const datavalue = data;
        
                const datahead=sheet.addRow(dataheader)
                datahead.font={bold:true}
                datahead.alignment={horizontal:"center",vertical:"middle",wrapText:true}
                datahead.eachCell((item)=>{
                    item.fill={type: 'pattern',
                    pattern: 'solid',fgColor:{ argb: 'D3D3D3' }}
                   // item.border={left:{style:"thin",color:{argb:"FF000000"}},right:{style:"thin",color:{argb:"FF000000"}},top:{style:"thin",color:{argb:"FF000000"}},bottom:{style:"thin",color:{argb:"FF000000"}}}
                })
              
        
                datavalue.forEach(item => {
                    
                    const values = Object.values(item);

                    values[0]=dates.convertDateFormat(values[0])
                    
                    const data=sheet.addRow(values);
                    data.alignment={horizontal:"center"}
                    data.numFmt="0.00"
                });

                sheet.columns.forEach((column, colNumber) => {
                    let maxLength = 0;
                    column.eachCell({ includeEmpty: true }, (cell) => {
                        const columnLength = cell.value ? cell.value.toString().length : 0;
                        maxLength = Math.max(maxLength, columnLength);
                    });
                    column.width = maxLength < 10 ? 10 : maxLength + 2; // Adding extra width for padding
                });

                console.log(2.5)
                // sheet.add
                // const chart = sheet.addChart('line', 'U1:AA10', 'AB1:AE10');
                // chart.title = 'Database Chart';
                // chart.xAxis.title = 'X Axis';
                // chart.yAxis.title = 'Y Axis';
                // console.log(2.7)
                //var date=new Date()


        
                
                // Save the workbook to a buffer and send it as a response
                const date=new Date()
                const custom=`${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`
                var name="NPD-Environment-Report "+custom
                
                  workbook.xlsx.writeBuffer()
                
                    .then((buffer) => {
                        res.attachment(`${name}.xlsx`);
                        res.type('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
                        console.log(3)
                        res.send(buffer);
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                        res.status(500).send('Internal Server Error');
                    });
        
        
        
        }

    
    catch(err){
        res.status(500).send("INTERNAL SERVER ERROR")
    }
}


const getAlarmReport= async (req,res)=>{
    try{
     //   const head=req.body.headers
      //  const value=req.body.value
        const from=req.body.start
        const to=req.body.end
       // const id=req.body.projectId
        //const needvar=req.body.data
        var needvar=['datetime','source','name','projectid','testno','"ProjectOwner"','groupname','state','ackstate','intime','chngtime','message','text']
       // needvar.push("ProjectOwner")
       // console.log(req.body,needvar)
        const data=await alarm.getAlarmExportData(from,to,needvar)
        console.log(data[0])
            const getaddress= await image.base64_encode()
           // console.log(getaddress)
           const length=needvar.length
           console.log(1)
            const workbook=new excel.Workbook()
            const sheet=workbook.addWorksheet("NPD-Alarm-Report")
           
            // sheet.addImage({
            //     base64: getaddress, // Replace with your actual base64-encoded image data
            //     extension: 'png', // Replace with your image extension (e.g., png, jpeg)
            // });
            const imageId2 = workbook.addImage({
                base64: getaddress,
                extension: 'jpg',
              });
                sheet.addImage(imageId2, 'A1:F4');
           
              console.log(1.5)

              const title=sheet.addRow(["NPD Alarm Report "])
              title.font={bold:true,size:16}
              title.alignment={horizontal:'center'}
              sheet.mergeCells("A6:F6")
              title.eachCell((item)=>{
                item.fill={type: 'pattern',
                pattern: 'solid',fgColor:{ argb: 'D3D3D3' }}
               // item.border={bottom:{style:"thin",color:{argb:"FF000000"}}}
            })
              const title2=sheet.addRow(["(System Generated Report)"])
              title2.alignment={horizontal:"center"}
              sheet.mergeCells("A7:F7")
              title2.eachCell((item)=>{
                item.fill={type: 'pattern',
                pattern: 'solid',fgColor:{ argb: 'D3D3D3' }}
               // item.border={bottom:{style:"thin",color:{argb:"FF000000"}}}
            })
        
            

        var num=6
        // sheet.columns.map((item)=>{
        //     item.width=20
        // })
    
        console.log(1.7)
        

        
               
              
                sheet.addRow()
                sheet.addRow([`Report Start Date`,dates.convertDateFormat(from),"","Report End Date",dates.convertDateFormat(to)]).alignment={horizontal:"center"}

                sheet.getCell("A9").font={bold:true}
                sheet.getCell("D9").font={bold:true}
                sheet.addRow()
                sheet.addRow()
                const dataheader=[]

               // const dataheader = Object.keys(data[0]);
               Object.keys(data[0]).map((item)=>{
                dataheader.push(headjson[5][item])

               })
              
                const datavalue = data;
        
                const datahead=sheet.addRow(dataheader)
                datahead.font={bold:true}
                datahead.alignment={horizontal:"center",vertical:"middle",wrapText:true}
                datahead.eachCell((item)=>{
                    item.fill={type: 'pattern',
                    pattern: 'solid',fgColor:{ argb: 'D3D3D3' }}
                   // item.border={left:{style:"thin",color:{argb:"FF000000"}},right:{style:"thin",color:{argb:"FF000000"}},top:{style:"thin",color:{argb:"FF000000"}},bottom:{style:"thin",color:{argb:"FF000000"}}}
                })
              
        
                datavalue.forEach(item => {
                    item["ProjectOwner"]=item["ProjectOwner"]==null?"-":item["ProjectOwner"]
                    // item["groupname"]=item[groupname]=="Ab"
                    const values = Object.values(item);
                    values[0]=dates.convertDateFormat(values[0])
                    values[9]=dates.convertDateFormat(values[9])
                    values[10]=dates.convertDateFormat(values[10])
                    
                    const data=sheet.addRow(values);
                    data.alignment={horizontal:"center"}
                    data.numFmt="0.00"
                });
                console.log(2.5)


                sheet.columns.forEach((column, colNumber) => {
                    let maxLength = 0;
                    column.eachCell({ includeEmpty: true }, (cell) => {
                        const columnLength = cell.value ? cell.value.toString().length : 0;
                        maxLength = Math.max(maxLength, columnLength);
                    });
                    column.width = maxLength < 10 ? 10 : maxLength + 2; // Adding extra width for padding
                });
                // sheet.add
                // const chart = sheet.addChart('line', 'U1:AA10', 'AB1:AE10');
                // chart.title = 'Database Chart';
                // chart.xAxis.title = 'X Axis';
                // chart.yAxis.title = 'Y Axis';
                // console.log(2.7)
                //var date=new Date()


        
                
                // Save the workbook to a buffer and send it as a response
                const date=new Date()
                const custom=`${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`
                var name="NPD-Environment-Report "+custom
                
                  workbook.xlsx.writeBuffer()
                
                    .then((buffer) => {
                        res.attachment(`${name}.xlsx`);
                        res.type('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
                        console.log(3)
                        res.send(buffer);
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                        res.status(500).send('Internal Server Error');
                    });
        
        
        
        }

    
    catch(err){
        res.status(500).send("INTERNAL SERVER ERROR")
    }
}
const getTankReport= async (req,res)=>{
    try{
     //   const head=req.body.headers
      //  const value=req.body.value
        const from=req.body.start
        const to=req.body.end
       // const id=req.body.projectId
        const needvar=req.body.data
        console.log(req.body)
        const data=await analysis.getMasterAmbientdata(from,to,needvar)
       // console.log(data[0])
            const getaddress= await image.base64_encode()
           // console.log(getaddress)
           const length=needvar.length
           console.log(1)
            const workbook=new excel.Workbook()
            const sheet=workbook.addWorksheet("NPD-Process-Report")
           
            // sheet.addImage({
            //     base64: getaddress, // Replace with your actual base64-encoded image data
            //     extension: 'png', // Replace with your image extension (e.g., png, jpeg)
            // });
            const imageId2 = workbook.addImage({
                base64: getaddress,
                extension: 'jpg',
              });
                sheet.addImage(imageId2, 'A1:F4');
           
              console.log(1.5)

              const title=sheet.addRow(["NPD Process Report "])
              title.font={bold:true,size:16}
              title.alignment={horizontal:'center'}
              sheet.mergeCells("A6:F6")
              title.eachCell((item)=>{
                item.fill={type: 'pattern',
                pattern: 'solid',fgColor:{ argb: 'D3D3D3' }}
               // item.border={bottom:{style:"thin",color:{argb:"FF000000"}}}
            })
              const title2=sheet.addRow(["(System Generated Report)"])
              title2.alignment={horizontal:"center"}
              sheet.mergeCells("A7:F7")
              title2.eachCell((item)=>{
                item.fill={type: 'pattern',
                pattern: 'solid',fgColor:{ argb: 'D3D3D3' }}
               // item.border={bottom:{style:"thin",color:{argb:"FF000000"}}}
            })
        
            
            // const headers=["ProjectId","Name","ProjectNo","Group","ProjectType","TestNo","ProjectConfig","TestBenchNo","StartDateTime","EndDateTime","Difference","BU Name","ProductName","ProductSize","Remarks"]
            // const datas=["12010225227","Test","18432","B","EODD","27","Endurance","3","14-02-2024 12:50","14-02-2024 15:30","1D:12H:10M","Pop","Ponds","12","test"]
        //   console.log(2)
        //         if(head.length>length){
        //             const headerow=sheet.addRow(head.slice(0,length),style="Bold")
        //             headerow.font={bold:true}
        //             headerow.alignment={horizontal:"center"}
        //             sheet.addRow(value.slice(0,length))
        //             sheet.addRow([])
        //             const headerrow2=sheet.addRow(head.slice(length,-1))
        //             headerrow2.font={bold:true}
        //             headerrow2.alignment={horizontal:"center"}
        //             sheet.addRow(value.slice(length,-1))
        //         }
        //         else{
        //             sheet.addRow(head)
        //             sheet.addRow(value)
        //         }
        var num=6

        // headers.map((item,index)=>{
        //     sheet.addRow([headers[index],"",datas[index]])
        //     sheet.getCell(`A${num}`).font={bold:true}
            
            
            
            
           
           
        //     num += 1; 
           
          
        //     sheet.alignment={horizontal:"center"}
        // })
        sheet.columns.map((item)=>{
            item.width=20
        })
       // console.log(`A${num}`)
        //
        
        console.log(1.7)
        

        
               
              
                sheet.addRow()
                sheet.addRow([`Report Start Date`,dates.convertDateFormat(from),"","Report End Date",dates.convertDateFormat(to)]).alignment={horizontal:"center"}

                sheet.getCell("A9").font={bold:true}
                sheet.getCell("D9").font={bold:true}
                sheet.addRow()
                sheet.addRow()
                const dataheader=[]

               // const dataheader = Object.keys(data[0]);
               Object.keys(data[0]).map((item)=>{
                dataheader.push(headjson[2][item])

               })
              
                const datavalue = data;
        
                const datahead=sheet.addRow(dataheader)
                datahead.font={bold:true}
                datahead.alignment={horizontal:"center",vertical:"middle",wrapText:true}
                datahead.eachCell((item)=>{
                    item.fill={type: 'pattern',
                    pattern: 'solid',fgColor:{ argb: 'D3D3D3' }}
                   // item.border={left:{style:"thin",color:{argb:"FF000000"}},right:{style:"thin",color:{argb:"FF000000"}},top:{style:"thin",color:{argb:"FF000000"}},bottom:{style:"thin",color:{argb:"FF000000"}}}
                })
              
        
                datavalue.forEach(item => {
                    const values = Object.values(item);
                    values[0]=dates.convertDateFormat(values[0])
                    
                    const data=sheet.addRow(values);
                    data.alignment={horizontal:"center"}
                    data.numFmt="0.00"
                });
                console.log(2.5)
                sheet.columns.forEach((column, colNumber) => {
                    let maxLength = 0;
                    column.eachCell({ includeEmpty: true }, (cell) => {
                        const columnLength = cell.value ? cell.value.toString().length : 0;
                        maxLength = Math.max(maxLength, columnLength);
                    });
                    column.width = maxLength < 10 ? 10 : maxLength + 2; // Adding extra width for padding
                });
                // sheet.add
                // const chart = sheet.addChart('line', 'U1:AA10', 'AB1:AE10');
                // chart.title = 'Database Chart';
                // chart.xAxis.title = 'X Axis';
                // chart.yAxis.title = 'Y Axis';
                // console.log(2.7)
                //var date=new Date()


        
                
                // Save the workbook to a buffer and send it as a response
                const date=new Date()
                const custom=`${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`
                var name="NPD-Process-Report "+custom
                
                  workbook.xlsx.writeBuffer()
                
                    .then((buffer) => {
                        res.attachment(`${name}.xlsx`);
                        res.type('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
                        console.log(3)
                        res.send(buffer);
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                        res.status(500).send('Internal Server Error');
                    });
        
        
        
        }

    
    catch(err){
        res.status(500).send("INTERNAL SERVER ERROR")
    }
}


// const GroupCExport=async(req,res)=>{

//     try{
//         //   const head=req.body.headers
//          //  const value=req.body.value
//            const from=req.body.start
//            const to=req.body.end
//           // const id=req.body.projectId
//           // const needvar=req.body.data
//            ///console.log(req.body)
//              //    const data=await analysis.getMasterAmbientdata(from,to,needvar)
//             const data=await test.getTestCdata2(from,to)
//             // console.log(data[0])
//                const getaddress= await image.base64_encode()
//               // console.log(getaddress)
//              // const length=needvar.length
//               console.log(1)
//                const workbook=new excel.Workbook()
//                const sheet=workbook.addWorksheet("NPD-GroupC-Report")
              
//                // sheet.addImage({
//                //     base64: getaddress, // Replace with your actual base64-encoded image data
//                //     extension: 'png', // Replace with your image extension (e.g., png, jpeg)
//                // });
//                const imageId2 = workbook.addImage({
//                    base64: getaddress,
//                    extension: 'jpg',
//                  });
//                    sheet.addImage(imageId2, 'A1:F4');

                   


              
//                  console.log(1.5)
           
               
//                // const headers=["ProjectId","Name","ProjectNo","Group","ProjectType","TestNo","ProjectConfig","TestBenchNo","StartDateTime","EndDateTime","Difference","BU Name","ProductName","ProductSize","Remarks"]
//                // const datas=["12010225227","Test","18432","B","EODD","27","Endurance","3","14-02-2024 12:50","14-02-2024 15:30","1D:12H:10M","Pop","Ponds","12","test"]
//            //   console.log(2)
//            //         if(head.length>length){
//            //             const headerow=sheet.addRow(head.slice(0,length),style="Bold")
//            //             headerow.font={bold:true}
//            //             headerow.alignment={horizontal:"center"}
//            //             sheet.addRow(value.slice(0,length))
//            //             sheet.addRow([])
//            //             const headerrow2=sheet.addRow(head.slice(length,-1))
//            //             headerrow2.font={bold:true}
//            //             headerrow2.alignment={horizontal:"center"}
//            //             sheet.addRow(value.slice(length,-1))
//            //         }
//            //         else{
//            //             sheet.addRow(head)
//            //             sheet.addRow(value)
//            //         }
//            var num=6
   
//            // headers.map((item,index)=>{
//            //     sheet.addRow([headers[index],"",datas[index]])
//            //     sheet.getCell(`A${num}`).font={bold:true}
               
               
               
               
              
              
//            //     num += 1; 
              
             
//            //     sheet.alignment={horizontal:"center"}
//            // })
//            console.log(data)
//            sheet.columns.map((item)=>{
//                item.width=20
//            })
//           // console.log(`A${num}`)
//            //
           
//            console.log(1.7)
           
   
           
                  
                 
//                 //    sheet.addRow()
//                 //    sheet.addRow([`Report Start Date`,dates.convertDate(from),"","Report End Date",dates.convertDate(to)]).alignment={horizontal:"center"}
   
//                 //    sheet.getCell("A7").font={bold:true}
//                 //    sheet.getCell("D7").font={bold:true}
//                 //    sheet.addRow()
//                 //    sheet.addRow()
   
//                    const dataheader = Object.keys(data[0]);
//                    const datavalue = data;
           
//                    const datahead=sheet.addRow(dataheader)
//                    datahead.font={bold:true}
//                    datahead.alignment={horizontal:"center"}
                   
           
//                    datavalue.forEach(item => {
//                        const values = Object.values(item);
//                        values[0]=dates.convertDate(values[0])
//                        const data=sheet.addRow(values);
//                        data.alignment={horizontal:"center"}
//                    });
//                    console.log(2.5)
//                    // sheet.add
//                    // const chart = sheet.addChart('line', 'U1:AA10', 'AB1:AE10');
//                    // chart.title = 'Database Chart';
//                    // chart.xAxis.title = 'X Axis';
//                    // chart.yAxis.title = 'Y Axis';
//                    // console.log(2.7)
//                    //var date=new Date()
   
   
           
                   
//                    // Save the workbook to a buffer and send it as a response
//                    const date=new Date()
//                    const custom=`${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`
//                    var name="NPD-Test-Report "+custom
                   
//                      workbook.xlsx.writeBuffer()
                   
//                        .then((buffer) => {
//                            res.attachment(`${name}.xlsx`);
//                            res.type('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
//                            console.log(3)
//                            res.send(buffer);
//                        })
//                        .catch((error) => {
//                            console.error('Error:', error);
//                            res.status(500).send('Internal Server Error');
//                        });
           
           
           
//            }
   
       
//        catch(err){
//            res.send(err)
//        }
//    }
const GroupCExport= async (req,res)=>{
    try{
     //   const head=req.body.headers
      //  const value=req.body.value
        const from=req.body.start
        const to=req.body.end
       // const id=req.body.projectId
        //const needvar=req.body.data
        var needvar=[ '"DateTime"','"ProjectId"', '"TestRunNo"','"ProjectName"','"ProjectOwner"', '"ScaleMin"', '"ScaleMax"', '"Value"', '"High"', '"HighHigh"', '"Low"', '"LowLow"', '"UDef"', '"Index"','"TypeOfData"']
       // needvar.push("ProjectOwner")
       // console.log(req.body,needvar)
        const data=await analysis.GroupCData(from,to,needvar)
        console.log(data)
            const getaddress= await image.base64_encode()
           // console.log(getaddress)
           const length=needvar.length
           console.log(1)
            const workbook=new excel.Workbook()
            const sheet=workbook.addWorksheet("NPD-GroupC-Report")
           
            // sheet.addImage({
            //     base64: getaddress, // Replace with your actual base64-encoded image data
            //     extension: 'png', // Replace with your image extension (e.g., png, jpeg)
            // });
            const imageId2 = workbook.addImage({
                base64: getaddress,
                extension: 'jpg',
              });
                sheet.addImage(imageId2, 'A1:F4');
           
              console.log(1.5)

              const title=sheet.addRow(["NPD GroupC Report "])
              title.font={bold:true,size:16}
              title.alignment={horizontal:'center'}
              sheet.mergeCells("A6:F6")
              title.eachCell((item)=>{
                item.fill={type: 'pattern',
                pattern: 'solid',fgColor:{ argb: 'D3D3D3' }}
               // item.border={bottom:{style:"thin",color:{argb:"FF000000"}}}
            })
              const title2=sheet.addRow(["(System Generated Report)"])
              title2.alignment={horizontal:"center"}
              sheet.mergeCells("A7:F7")
              title2.eachCell((item)=>{
                item.fill={type: 'pattern',
                pattern: 'solid',fgColor:{ argb: 'D3D3D3' }}
               // item.border={bottom:{style:"thin",color:{argb:"FF000000"}}}
            })
        
            

        var num=6
        // sheet.columns.map((item)=>{
        //     item.width=20
        // })
    
        console.log(1.7)
        

        
               
              
                sheet.addRow()
                sheet.addRow([`Report Start Date`,dates.convertDateFormat(from),"","Report End Date",dates.convertDateFormat(to)]).alignment={horizontal:"center"}

                sheet.getCell("A9").font={bold:true}
                sheet.getCell("D9").font={bold:true}
                sheet.addRow()
                sheet.addRow()
                const dataheader=[]

               // const dataheader = Object.keys(data[0]);
               Object.keys(data[0]).map((item)=>{
                dataheader.push(headjson[6][item])

               })
              
                const datavalue = data;
        
                const datahead=sheet.addRow(dataheader)
                datahead.font={bold:true}
                datahead.alignment={horizontal:"center",vertical:"middle",wrapText:true}
                datahead.eachCell((item)=>{
                    item.fill={type: 'pattern',
                    pattern: 'solid',fgColor:{ argb: 'D3D3D3' }}
                   // item.border={left:{style:"thin",color:{argb:"FF000000"}},right:{style:"thin",color:{argb:"FF000000"}},top:{style:"thin",color:{argb:"FF000000"}},bottom:{style:"thin",color:{argb:"FF000000"}}}
                })
              
        
                datavalue.forEach(item => {
                    item["ProjectOwner"]=item["ProjectOwner"]==null?"-":item["ProjectOwner"]
                    // item["groupname"]=item[groupname]=="Ab"
                    const values = Object.values(item);
                    values[0]=dates.convertDateFormat(values[0])
                     values[2]=`${values[2]}`
                     values[13]=`${values[13]}`
                    // values[10]=dates.convertDateFormat(values[10])
                    
                    const data=sheet.addRow(values);
                    data.alignment={horizontal:"center"}
                    data.numFmt="0.00"
                });
                console.log(2.5)


                sheet.columns.forEach((column, colNumber) => {
                    let maxLength = 0;
                    column.eachCell({ includeEmpty: true }, (cell) => {
                        const columnLength = cell.value ? cell.value.toString().length : 0;
                        maxLength = Math.max(maxLength, columnLength);
                    });
                    column.width = maxLength < 10 ? 10 : maxLength + 1; // Adding extra width for padding
                });
                // sheet.add
                // const chart = sheet.addChart('line', 'U1:AA10', 'AB1:AE10');
                // chart.title = 'Database Chart';
                // chart.xAxis.title = 'X Axis';
                // chart.yAxis.title = 'Y Axis';
                // console.log(2.7)
                //var date=new Date()


        
                
                // Save the workbook to a buffer and send it as a response
                const date=new Date()
                const custom=`${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`
                var name="NPD-Environment-Report "+custom
                
                  workbook.xlsx.writeBuffer()
                
                    .then((buffer) => {
                        res.attachment(`${name}.xlsx`);
                        res.type('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
                        console.log(3)
                        res.send(buffer);
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                        res.status(500).send('Internal Server Error');
                    });
        
        
        
        }

    
    catch(err){
        res.status(500).send("INTERNAL SERVER ERROR")
    }
}






//    const TestPdf1=async(req,res)=>{
    
//         const outputPath = 'output.pdf';
//         const stream = fs.createWriteStream(outputPath);
       


//         const from=req.body.start
//         const to =req.body.end
//         const needvar=req.body.data
//         console.log(req.body)
//         const data=await analysis.getMasterAmbientdata(from,to,needvar)
//        // console.log(data[0])
//             const getaddress= await image.base64_encode()
//         const page=new pdf()
       
        
//        // page.image(getaddress, 50, 50, { width: 100 });
//         page.moveDown(2);
//         page.fontSize(14).text("Test PDF",{align:"center"})
//         page.moveDown(2);


//         var tabledata=[]
//         const Headdata=[]
//         Object.keys(data[0]).map((item)=>{
//             Headdata.push(headjson[2][item])
//         })
//         tabledata.push(Headdata)
//         data.map((item)=>{
//             const values=Object.values(item)
//             tabledata.push(values)
//         })
//         const tab=table(tabledata)
//         page.text(tab)

//         page.end()
//         page.pipe(stream);
//         res.send("Downloaded")




   

//    }
//    const TestPdf2=async(req,res)=>{
    
   
   


//     const from=req.body.start
//     const to =req.body.end
//     const needvar=req.body.data
//     console.log(req.body)
//     const data=await analysis.getMasterAmbientdata(from,to,needvar)
//    // console.log(data[0])
//         const getaddress= await image.base64_encode()
//         const doc=new jspdf.jsPDF()
       
//         const heads=Object.keys(data[0]).map((item)=>{
//             return headjson[2][item]
//         })
//         const values=[]
   
//         //add Image (x axis,y axis,width,heigh)
//         doc.addImage(getaddress, "JPG",16, 4, 175, 15)

//         doc.setFontSize(20);
//         var imgY = 10; 
//        // doc.setFontSize(20); // Adjust font size as needed
//        // doc.setFontStyle('bold'); // Adjust font style as needed
//         var headingText = 'Your Heading Text';
//         var textWidth = doc.getTextWidth(headingText);
//         var textX = (doc.internal.pageSize.getWidth() - textWidth) / 2; // Center text horizontally
//         var textY = 2 + 15 + 10; // Adjust vertical spacing between image and heading
        
        
//         doc.text(headingText, textX, textY);
                                                                                                                                                   
        
        
     
//         data.map((item)=>{
//             const it=Object.values(item)
//             values.push(it)
//         })
//         const options = {
//             startY: 20,
//             theme:"plain" // Vertical position to start the table (in mm)
//           };
//         doc.autoTable(heads,values,options)
//         doc.save("TestPdf.pdf")
//           res.send("Saved")
   
    
 


   





// }
//       const TestPdf=async(req,res)=>{
    
   
   


//     const from=req.body.start
//     const to =req.body.end
//     const needvar=req.body.data
//     console.log(req.body)
//     const data=await analysis.getMasterAmbientdata(from,to,needvar)
//    // console.log(data[0])
//         const getaddress= await image.base64_encode()
        
//         console.log(getaddress.slice(1,10))
//         const table=[]
//         const tablehead=Object.keys(data[0]).map(item=>headjson[4][item])
//         table.push(tablehead)
//         //const values=[]
//         data.map((item)=>{
//             item["DateTime"]=dates.convertDateFormat(new Date(item["DateTime"]))
//             const valu=Object.values(item)
//             table.push(valu)
//         })
//         const doc={
//             pageSize:'A3',
//             content:[
//                 {
//                     image:`data:image/jpeg;base64,${getaddress}`,
//                     width:"750",
//                     height:50,
//                     alignment:"center",
                   
//                 },
//                 {text:""},
//                 {
//                     text:"Test Report",
//                     fontSize:18,
//                     alignment: 'center',
//                     bold:true,
//                     margin:[0,0,0,0]
//                 },
//                 {text:""},
//                 {
//                     table:{
//                         headerRows:1,
//                         body:table
//                     }
//                 }
//             ]
//         }
//         const pdfdoc=pdfMake.createPdf(doc)
//         pdfdoc.getBuffer((buffer)=>{
//             res.attachment(`example.pdf`);
//             res.end(buffer)
//         })


     

   
    
 


   





// }

module.exports={
    getTimeSeriesReport,
    getAmbiantReport,
    getTankReport,
    GroupCExport,
    getAlarmReport
}