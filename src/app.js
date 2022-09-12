const express=require('express')
const path=require('path')
const hbs=require('hbs')
const geocode=require('./utilis/geocode')
const forecast=require('./utilis/forecast')
const app=express()
//defining paths
const publicDirectory=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')
//to set handle bars
app.set('view engine','hbs') 
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)
//use when sttaic file is used
app.use(express.static(publicDirectory))  //neccesary to tell to loadd css and js file

app.get('',(req,res)=>{ 
    res.render('index',{
        title:'Weather App',
        name:"Faryal"   //passing to html file
    }) //to load hbs file

})

app.get('/about',(req,res)=>{ 
    res.render('about',{
        title:'Weather App' ,
        name:"Faryal"  //passing to html file
    }) //to load hbs file

})

app.get('/help',(req,res)=>{ 
    res.render('help',{
        message:'Help Please!!' ,
        title:"Weather app" ,
        name:"Faryal"//passing to html file
    }) //to load hbs file

})



app.get('/weather',(req,res)=>{ 
   
    if(!req.query.address)
    {
        return   res.send({
            error:"You must provide an address"
        })
    }
    geocode(req.query.address,(error,{lon,lat}={})=>{
        if(error)
        {
            return res.send({error})
        }
      
        forecast(lat,lon,(error,{des,temp,rain}={})=>{
            console.log(lat)
           if(error){
            return res.send({error})
           }
            res.send({
             forecast:des,
             temprature:temp,
             RainForecast:rain,
             Address:req.query.address

            })

          })
          
     
      })

   

})
app.get('/product',(req,res)=>{
    if(!req.query.search) //req for query params
    {
     return   res.send({
            error:"You must provide a search"
        })

    }
    
res.send({
    product:[]
})
})
app.get('/help/*',(req,res)=>{
    res.render('Error',{
        error:"Article Not Found!!"
    })
})



app.get('*',(req,res)=>{  //always  at the end
    res.render('Error',{
        error:"Page Not Found!!"
    })//to load hbs file
})

//To run application 

app.listen(3000,()=>{
    console.log("Server is up on port 3000")
})