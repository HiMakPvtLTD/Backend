var convertDate=(data)=>{
    var date = new Date(data)
date = date.getFullYear() + '/' +
    ('00' + (date.getMonth() + 1)).slice(-2) + '/' +
    ('00' + date.getDate()).slice(-2) + ' ' +
    ('00' + date.getHours()).slice(-2) + ':' +
    ('00' + date.getMinutes()).slice(-2) + ':' +
    ('00' + date.getSeconds()).slice(-2);
  //return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getMinutes()}`
 return date.toLocaleString()
}
var convertDateFormat=(data)=>{
    var date = new Date(data)
date = 
     ('00' + date.getDate()).slice(-2) + '/' +
    ('00' + (date.getMonth() + 1)).slice(-2) + '/' +
     date.getFullYear() + ' ' +
    
    ('00' + date.getHours()).slice(-2) + ':' +
    ('00' + date.getMinutes()).slice(-2) + ':' +
    ('00' + date.getSeconds()).slice(-2);
  //return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getMinutes()}`
 return date.toLocaleString()
}
var convertDateUTC=(data)=>{
    var date = new Date(data)
    date.setHours(date.getHours()-5)
    date.setHours(date.getMinutes()-30)
date = date.getFullYear() + '-' +
    ('00' + (date.getMonth() + 1)).slice(-2) + '-' +
    ('00' + date.getDate()).slice(-2) + ' ' +
    ('00' + date.getHours()).slice(-2) + ':' +
    ('00' + date.getMinutes()).slice(-2) + ':' +
    ('00' + date.getSeconds()).slice(-2);

return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getMinutes()}`
}

var TestDate=(data)=>{
    var date = new Date(data);
    date.setHours(date.getHours()+5)
    date.getMinutes(date.getMinutes()+30)
    console.log(date.getTime()+5)

return date
}
var toSec=(secs)=>{
    const hours=Math.floor(secs/3600)
    const min=Math.floor((secs%3600)/60)
    const sec=Math.floor(secs%60)
    return `${hours}h:${min}m:${sec}s`
}
var getDate=()=>{
    var date=new Date()
    date.setHours(date.getHours()+5)
    date.setMinutes(date.getMinutes()+30)
    date.setSeconds(date.getSeconds()+30)
    return date
}
module.exports={
    convertDate,
    convertDateUTC,
    convertDateFormat,
    TestDate,
    toSec,
    getDate

}