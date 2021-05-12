//COWIN BOT because its tough to get vaccine
//[NOTE] FOR Personal Use
const { default: axios } = require("axios");

//ADD Bot Token
const token = ""
//ADD CHATID
const chatId 


//Could be refactored.
var today = new Date();
var dd = today.getDate();

var mm = today.getMonth()+1; 
var yyyy = today.getFullYear();
if(dd<10) 
{
    dd='0'+dd;
} 

if(mm<10) 
{
    mm='0'+mm;
} 
today = dd+'-'+mm+'-'+yyyy;
i=0

const sendMsg = async (text) => {
    var config = {
                    method: 'get',
                    url: `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${text}`,
                };
    await axios(config)
}


//District ID is set to 199 i.e. Faridabad, Haryana 
//DOCS for api can be found at https://apisetu.gov.in/

const getVaccine = async () => {
    try {
        
        var config = {
            method: 'get',
            url: `https://cdn-api.co-vin.in/api/v2/appointment/sessions/calendarByDistrict?district_id=199&date=${today}`,
            headers: { 
                'Content-Type': 'application/json', 
                'Cache-Control': 'no-cache',
                "Access-Control-Allow-Origin": "*",
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36'
            }
        };
        const response = await axios(config)
        if (response.status === 200) {
            console.log("Machine successfully found.");
            const myJson = JSON.stringify(response.data)
            const { centers } = response.data
            if(centers.length){
                centers.forEach(center => {
                    center.sessions.forEach(session=>{
                        if(session.min_age_limit < 20 && session.available_capacity > 0){
                            sendMsg(`Vaccine available at ${center.name} on ${session.date}`)
                            console.log("VAAAAAACCCCINEEEEEE")
                        }else{
                            console.log(`better luck next time ${i++}` )
                        }
                    })
                });
            }else{
                console.log("NA")
            }
        }else{
            "Did not respond"
        }
    } catch (err) {
        // catches errors both in fetch and response.json
        console.log(err);
    } finally {
        // do it again in 1 min
        setTimeout(getVaccine , 60000);
        
    }
};

getVaccine()