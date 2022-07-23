const config = require('config');
const axios = require('axios');

const apiPlayerStatistics = ( playerName, dates ) => {
    return new Promise((resolve, reject) => {
        
        let url = config.get(`url_services.player_info`);
        url = `${url}/${playerName}/statistics`;


         axios.get(url, {
            headers: {
                Accept: 'application/json',
                Username: process.env.USERNAMEAPI,
                Password: process.env.PASSWORDAPI
            }
        })

        .then(response => {
            resolve(response.data);
        })
        .catch(error => {
            reject(error);
        });
    });
    }



    module.exports = {
        apiPlayerStatistics,
    }