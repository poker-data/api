const config = require('config');
const axios = require('axios');
const filtersToApiRequestTournamentsType = ["Easy", "Neutral", "Hard" ]

const apiPlayerStatistics = (playerName) => {
    return new Promise((resolve, reject) => {

        let url = config.get(`url_services.player_info`);
        url = `${url}/${playerName}`;

        axios.get(url, {
            headers: {
                Accept: 'application/json',
                Username: process.env.USERNAMEAPI,
                Password: process.env.PASSWORDAPI,
                Filter:'2013-2017 Scheduled',
            }
        })
            .then(response => {
               // console.log(response);
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

const apiUserMetaData = () => {
    return new Promise((resolve, reject) => {

        let url = config.get(`url_services.player_metadata`);

        axios.get(url, {
            headers: {
                Accept: 'application/json',
                Username: process.env.USERNAMEAPI,
                Password: process.env.PASSWORDAPI,
            }
        })
            .then(response => {
                //console.log(response.data.Response.UserMetadataResponse);
                resolve(response.data);
            })
            .catch(error => {
                reject(error);       
            });
    });
}
const setApiPlayerFilters = (playerName,filter) => {
    return new Promise((resolve, reject) => {

        let url = config.get(`url_services.player_info`);
        url = `${url}/${playerName}/`;
        url = `${url}/${config.get(`url_services.services.filters.filter`)}${filter}`
        
        console.log(url)
        
        axios.get(url, {
            headers: {
                Accept: 'application/json',
                Username: process.env.USERNAMEAPI,
                Password: process.env.PASSWORDAPI,
            }
        })
            .then(response => {
                //console.log(response.data);
                resolve(response.data);
            })
            .catch(error => {
                reject(error);       
            });
    });
}

module.exports = {
    apiPlayerStatistics,
    apiUserMetaData,
    setApiPlayerFilters
}