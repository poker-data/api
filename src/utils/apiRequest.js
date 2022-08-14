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
        console.log(body)
        const playerName = body.shkUsername;
        const dateFrom = body.dateFrom || null;
        const dateTo = body.dateTo || null;
        const roomName = body.roomName || null;

        let url = config.get(`url_services.player_info`).replace('room', roomName);
        console.log(url, 'pre filtro')

        if (dateFrom !== null || dateTo !== null) {
            url = `${url}/${playerName}${config.get(`url_services.services.filter`)}`;
            url = `${url}Date:${dateFrom}`;
            dateTo ? url = `${url}~${dateTo}` : url = `${url}`;
        } else {
            url = `${url}/${playerName}`;
        }

        console.log(url, 'post filtro')
        axios.get(url, {
            headers: {
                Accept: 'application/json',
                Username: process.env.USERNAMEAPI,
                Password: process.env.PASSWORDAPI,
            }
        })
            .then(response => {
                //HERMANO ACA ESTABA HACIENDO LOG DE LOS ID PARA VER COMO OBTENERLOS. SEGURO TENGAMOS QUE HACER ALGO ASI EN EL FRONT, ME DI CUENTA QUE SIEMPRE
                //LA KEY PARA OBTENER EL VALOR ES EL SIGNO $ INCLUSO PARA LOS VALORES QUE NO SIGNIFICAN DINERO COM LAS FECHAS O LA CANTIDAD DE JUEGOS ASI QUE VA A SER FACIL
                // DE UTILIZAR

                //imprimiendo valor de el primeer dato del array (Count)
                //console.log(response.data.Response.PlayerResponse.PlayerView.Player.Statistics.Statistic[0]['$']);
                //imprimiendo cada id
                let finalResponse = []
                const checkError = response.data.Response.PlayerResponse ? response.data.Response.PlayerResponse : response.data.Response.ErrorResponse
                
                if (!checkError.Error) {
                    finalResponse = response.data.Response.PlayerResponse.PlayerView.Player.Statistics.Statistic
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