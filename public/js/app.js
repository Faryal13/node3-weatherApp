console.log('Client side js loaded!!')


const weatherform=document.querySelector('form');
const search=document.querySelector('input')
weatherform.addEventListener("submit",(e)=>{
 
    e.preventDefault()
const location=search.value
reset()
fetch('http://localhost:3000/weather?address='+location).then((response)=>{
     response.json().then((data)=>{
        if(data.error){
            document.getElementById('error').textContent=data.error
            
        }
        else{
           
            document.getElementById('data1').textContent="ForeCast: "+data.forecast
            document.getElementById('data2').textContent="Temprature: "+data.temprature
            document.getElementById('data3').textContent="RainForeCast: "+data.RainForecast
            document.getElementById('data4').textContent="Address: "+data.Address
            document.getElementById('error').textContent=""
        }
           
    })
})
})

reset=function(){
    document.getElementById('error').textContent='Loading...'
    document.getElementById('data1').textContent=""
    document.getElementById('data2').textContent=""
    document.getElementById('data3').textContent=""
    document.getElementById('data4').textContent=""
}