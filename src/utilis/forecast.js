const request=require('postman-request')
const forecast=(latitude,longitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=e88597af19e7663fead00bb549495255&query='+latitude+','+longitude
    request({url,json:true},(error,response)=>{
    if(error)
    {
        callback('Unable to connect to location service!!',undefined)
    }
    else if(response.body.error){ //run when we donot provide all query
        callback('Unable to search to location service!!',undefined)
    }
    else{
        const des=response.body.current.weather_descriptions[0];
        const temp=response.body.current.temperature;
        const rain=response.body.current.precip ;
        callback(undefined,{
            des,
            temp ,
            rain
        })
      
    }
    
    }) 
}

module.exports=forecast


