const config = require('config');
const axios = require('axios');

const apiPlayerStatistics = (body) => {
    const playerName = body.playerName;
    const dateFrom = body.dateFrom || null;
    const dateTo = body.dateTo || null;
    const roomName = body.roomName || null;
    return new Promise((resolve, reject) => {

        let url = config.get(`url_services.player_info`);
        url = `${url}/${playerName}/statistics/`;

        axios.get(url, {
            headers: {
                Accept: 'application/json',
                Username: process.env.USERNAMEAPI,
                Password: process.env.PASSWORDAPI,
            }
        })
            .then(response => {
                console.log(response.data);
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
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}
const setApiPlayerFilters = (body) => {
    return new Promise((resolve, reject) => {
        const playerName = body.shkUsername;
        const dateFrom = body.dateFrom || null;
        const dateTo = body.dateTo || null;
        const roomName = body.roomName || null;

        let url = config.get(`url_services.player_info`).replace('room', roomName);

        if (dateFrom !== null || dateTo !== null) {
            url = `${url}/${playerName}${config.get(`url_services.services.filter`)}`;
            url = `${url}Date:${dateFrom}`;
            dateTo ? url = `${url}~${dateTo}` : url = `${url}`;
        } else {
            url = `${url}/${playerName}`;
        }
        axios.get(url, {
            headers: {
                Accept: 'application/json',
                Username: process.env.USERNAMEAPI,
                Password: process.env.PASSWORDAPI,
            }
        })
            .then(response => {

                let finalResponse = []
                let dataTable = []
                const checkError = response.data.Response.PlayerResponse ? response.data.Response.PlayerResponse : response.data.Response.ErrorResponse
                
                if (!checkError.Error) {
                    finalResponse = response.data.Response.PlayerResponse.PlayerView.Player.Statistics.Statistic
                    finalResponse.map(element => {
                        const id = element["@id"] 
                        const value = element["$"]
                        const obj = {[id] : value}
                        dataTable.push(obj)
                        })
                    finalResponse = JSON.stringify(dataTable).replaceAll('{','').replaceAll('}','').replace('[','{').replace(']','}')
                    finalResponse = JSON.parse(finalResponse)
                    
                }
                else {
                    finalResponse = checkError
                }
                resolve(finalResponse);
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