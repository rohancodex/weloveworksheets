
const express = require ('express');
var router = express.Router();
const mysqlConnection = require("../database");
const ejs = require('ejs');
router.use( express.static( "public" ) );

  
const {google} = require('googleapis');
const keys = require('../keys.json');
const client = new google.auth.JWT(
    keys.client_email,
    null,
    keys.private_key, 
    ['https://www.googleapis.com/auth/spreadsheets.readonly']
)







router.get('/',(req,res)=>{
    async function gsrun(cl){
        const gsapi = google.sheets({version: 'v4', auth: cl});
        const opt = {
            spreadsheetId: '1qgLXiiVOCh9trwXOmgmrZDBJj1S0O9gtfBxNWHm6eyQ',
            range: 'A1:B1000'
        };
    
        let data = await gsapi.spreadsheets.values.get(opt);
        // console.log(data);
        let dataArray = data.data.values;
        
        return dataArray;
        
        
    }
    client.authorize(function(err,tokens){
    if(err){
        throw err;
        
    }
    else{
        console.log('connected');
        let data = gsrun(client);
        data.then(function(data) {
            console.log(data[0][0]) 
            res.render('files');
         });
       
        
       
    }
})   
})




module.exports = router;