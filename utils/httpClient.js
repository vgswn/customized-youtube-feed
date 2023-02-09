const axios=require('axios');

const httpClient=axios.create({
    timeout: 60000
});

module.exports=httpClient;
