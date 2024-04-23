const cds = require('@sap/cds');

const clientID= "sb-MaintenanceOrder!t446319" ;
const clientSecret= "8OTBMo3XEXy21SblnAiMFTKnj1s=";
const srvTokenUrl1= "https://ltim-hackathon.authentication.eu10.hana.ondemand.com";

module.exports = async function (srv) {
    const {
       OrderDetails
    } = srv.entities("Orders");

    async function getOAuthDetails(srvTokenUrl1, token) {
        if (typeof srvTokenUrl1 !== 'string') {
            srvTokenUrl1 = JSON.stringify(srvTokenUrl1);
        }
        if (typeof token !== 'string') {
            token = JSON.stringify(token);
        }
        var oResponse = await axios({
            "method": "GET",
            "url": srvTokenUrl1,
            "headers": {
                "Authorization": "Basic " + btoa(token)
            }
        });
        return oResponse;
    }

    srv.on('getDetails', async(req) => {
        const oAddress = req.data.oAddress;
        const oYear = req.data.oYear;
        const oDetails = "Natural Disasters".concat('',oAddress );
        try{
            var tx = cds.transaction(req);

            var token = clientID1 + ":" + clientSecret1;

            console.log(token + " Token Details");

            let params = new Headers()
            params.append('Authorization', "Basic " + btoa(token))
            // const response = await fetch(srvTokenUrl1, {
            //     method: 'GET',
            //     headers: params,
            // })
            const response = await getOAuthDetails(srvTokenUrl1, token);
            console.log(response + "Response Details");
            if (response.status != 200) {
                const oErrorResponse = await response.json()
                return "failed: " + oErrorResponse.error.message.value;
            } else {
                // const data = await response.json()
                var accToken = "Bearer " + response.data.access_token;
                const aNewAPI = await getJson({
                    engine: "google",
                    api_key: "357237af1558f7d0d50c7b522ec2c2327868a775232767a0f655c04ecf316472", // Get your API_KEY from https://serpapi.com/manage-api-key
                    q: oDetails,
                    location: "Austin, Texas",
                });
                console.log(aNewAPI);
                var aResponse = [];
                    aNewAPI.organic_results.forEach(element => {
                        const payload = {
                            "Description": element.snippet,
                            "Title": element.snippet_highlighted_words
                        }
                        aResponse.push(payload);
                        // aResponse.push(element.snippet_highlighted_words);
                    });
                    var onSearchAPIData = await onGetGENAI(JSON.stringify(aResponse),oAddress, oYear, tx);
                    
            }
        }catch(e){
            return e;
        }
                    
            
    })
    async function onGetGENAI(oData, payload, oAddress, oYear, tx) {
        var oUrl = "https://api.ai.prod.eu-central-1.aws.ml.hana.ondemand.com/v2/inference/deployments/d8790bb564679bce/chat/completions?api-version=2023-05-15";
        var myHeaders = new Headers();
        myHeaders.append('AI-Resource-Group', "default");
        myHeaders.append('Content-Type', "application/json");
        myHeaders.append('Authorization', oData);

        var oDelay= "Based on the above results, please identity the natural disaster happened in year"+ oYear + "and form your response in JSON Format where Natural disaster detailed description, occurence date and severity score in percentage will be the key.";
        var oPayload= payload.concat('', oDelay);
        try{
            var payload = JSON.stringify({
                "messages": [
                    {
                        "role": "user",
                        "content": oPayload
                    }
                ]
            });
            const response = await fetch(oUrl, {
                method: 'POST',
                headers: myHeaders,
                body: payload
            })
            if (response.status != 200) {
                const oErrorResponse = await response.json()
                return "failed: " + oErrorResponse.error.message.value;
            } else {
                const data = await response.json();
                return data;
            }
        }catch (e) {
            return "Failed: " + e
        }
       

    }
    async function onGetGENAI2() {
        
    }

    
}

