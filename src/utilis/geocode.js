//GeoCodingTask
const request=require('postman-request')

const geocode=(address,callback)=>{
    const url='https://api.geoapify.com/v1/geocode/search?text=38%20Upper%20Montagu%20Street%2C%20Westminster%20W1H%201LJ%2C%20United%20Kingdom&apiKey=1bbc680f58c44e1eaa97b3fee9071d25&place='+encodeURIComponent(address)
    request({url,json:true},(error,{body})=>{
      if(error)
      {
        callback('Unable to connect to location service!!',undefined)
      }
      else if(body.features.length===0)
      {
        callback('Unable to search to location service!!',undefined)
      }
      else{
        const lon=body.features[0].properties['lon'];
        const lat=body.features[0].properties['lat']
        callback(undefined,{
         lon,
         lat
        })
       
        
      }
      
      })
    
    }
    module.exports=geocode




    
