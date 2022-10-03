const config = require('config');
const axios = require('axios');

const apiPlayerStatistics = (body) => {
    const shkUsername = body.shkUsername;
    const dateFrom = body.dateFrom || null;
    const dateTo = body.dateTo || null;
    const roomName = body.roomName || null;
    return new Promise((resolve, reject) => {

        let url = config.get(`url_services.player_info`).replace('room', roomName);
        url = `${url}/${shkUsername}/statistics/`;

        axios.get(url, {
            headers: {
                Accept: 'application/json',
                Username: process.env.USERNAMEAPI,
                Password: process.env.PASSWORDAPI,
            }
        })
        .then(response => {
            // console.log(response.data.Response.PlayerResponse.PlayerView.Player.Statistics);
             let finalResponse = []
             const checkError = response.data.Response.PlayerResponse ? response.data.Response.PlayerResponse : response.data.Response.ErrorResponse
             if (!checkError.Error) {
                 finalResponse = response.data.Response.PlayerResponse.PlayerView.Player.Statistics.Statistic
                 const finalObjectResponse = {}
                 finalResponse.map(element => {
                     const elementId = element["@id"] 
                     const value = element["$"]
                     finalObjectResponse[elementId] = value
                     })
                 finalResponse = finalObjectResponse        
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
            url = `${url}/${playerName}/statistics/${config.get(`url_services.services.filter`)}`;
            url = `${url}Date:${dateFrom}`;
            dateTo ? url = `${url}~${dateTo}` : url = `${url}`;
        } else {
            url = `${url}/${playerName}/statistics`;
        }
        axios.get(url, {
            headers: {
                Accept: 'application/json',
                Username: process.env.USERNAMEAPI,
                Password: process.env.PASSWORDAPI,
            }
        })
        .then(response => {
            // let finalResponse = []
            // const checkError = response.data.Response.PlayerResponse ? response.data.Response.PlayerResponse : response.data.Response.ErrorResponse
            //     if (!checkError.Error) {
            //         finalResponse = response.data.Response.PlayerResponse.PlayerView.Player.Statistics.Statistic
            //         //console.log(response.data.Response.PlayerResponse.PlayerView.Player.Statistics.StatisticalDataSet[0].Data)
            //         const finalObjectResponse = {}
            //         finalResponse.map(element => {
            //             const elementId = element["@id"] 
            //             const value = element["$"]
            //             finalObjectResponse[elementId] = value
            //             })
            //         finalResponse = finalObjectResponse        
            //     }

            let finalStatsResponse = []
            let finalDataSetResponse = []
            let tempStatsResponse = []
            let tempDataSetResponse = []
            const checStatskError = response.data.Response.PlayerResponse ? response.data.Response.PlayerResponse : response.data.Response.ErrorResponse
            if (!checStatskError.Error) {
                tempStatsResponse = response.data.Response.PlayerResponse.PlayerView.Player.Statistics.Statistic
                const statsResponse = {}
                tempStatsResponse.map(element => {
                    const elementId = element["@id"] 
                    const value = element["$"]
                    statsResponse[elementId] = value
                    })
               finalStatsResponse = statsResponse 
               tempDataSetResponse = response.data.Response.PlayerResponse.PlayerView.Player.Statistics.StatisticalDataSet[0].Data
               tempDataSetResponse.map( element => {
                let dataSetResponse = {}
                    element.Y.map( element => {
                        const elementId = element["@id"]
                        const value = element["$"]
                        dataSetResponse[elementId] = value
                     })
                    finalDataSetResponse.push(dataSetResponse)
                    })
            
               finalResponse = {
                stats : finalStatsResponse,
                data: finalDataSetResponse
               }
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

const setApiGroupFilters = (body) => {
   
    return new Promise((resolve, reject) => {
        const shkName = body.shkName || null;
        const filterType1 = body.filterType1 || null;
        const filterType2 = body.filterType2 || null;
        const filterType3 = body.filterType3 || null;
        const filterType4 = body.filterType4 || null;
        const filterType5 = body.filterType5 || null;

        let url = config.get(`url_services.group_info`).replace(':group', shkName);
        url = `${url}${config.get(`url_services.services.filter`)}`;
        
        if (filterType1 !== null || filterType2 !== null || filterType3 !== null || filterType4 !== null || filterType5 !== null) {
           
            filterType1 ? url = `${url}Type!:SAT,TI;Class:SCHEDULED` : url = `${url}`;
            filterType2 ? url = `${url}Entrants:500~*;Type!:SAT,TI;Class:SCHEDULED` : url = `${url}`;
            filterType3 ? url = `${url}Entrants:250~500;Type!:SAT,TI;Class:SCHEDULED` : url = `${url}`;
            filterType4 ? url = `${url}Entrants:2~250;Type!:SAT,TI;Class:SCHEDULED` : url = `${url}`;
            filterType5 ? url = `${url}Type!:SAT,TI;Class:SNG` : url = `${url}`;
        }

        const credentials = {
            Accept: 'application/json',
            Username: process.env.USERNAMEAPI,
            Password: process.env.PASSWORDAPI,
        }
        console.log(url, "url antes de pegarle a la apiii" );
        axios.get(url, {
            headers: credentials
        })
            .then(response => {
                // let finalResponse = []
                // const checkError = response.data.Response.PlayerResponse ? response.data.Response.PlayerResponse : response.data.Response.ErrorResponse
                // if (!checkError.Error) {
                //     finalResponse = response.data.Response.PlayerResponse.PlayerView.PlayerGroup.Statistics.Statistic
                //     //console.log(response.data.Response.PlayerResponse.PlayerView.Player.Statistics.StatisticalDataSet[0].Data)
                //     const finalObjectResponse = {}
                //     finalResponse.map(element => {
                //         const elementId = element["@id"] 
                //         const value = element["$"]
                //         finalObjectResponse[elementId] = value
                //         })
                //     finalResponse = finalObjectResponse        

                    let finalStatsResponse = []
                    let finalDataSetResponse = []
                    let tempStatsResponse = []
                    let tempDataSetResponse = []
                    const checStatskError = response.data.Response.PlayerResponse ? response.data.Response.PlayerResponse : response.data.Response.ErrorResponse
                    if (!checStatskError.Error) {
                       tempStatsResponse = response.data.Response.PlayerResponse.PlayerView.PlayerGroup.Statistics.Statistic
                        const statsResponse = {}
                        tempStatsResponse.map(element => {
                            const elementId = element["@id"] 
                            const value = element["$"]
                            statsResponse[elementId] = value
                            })
                       finalStatsResponse = statsResponse 
                      
                       tempDataSetResponse = response.data.Response.PlayerResponse.PlayerView.PlayerGroup.Statistics.StatisticalDataSet[0].Data
                       tempDataSetResponse.map( element => {
                            let dataSetResponse = {}
                            element.Y.map( element => {
                                const elementId = element["@id"]
                                const value = element["$"]
                                dataSetResponse[elementId] = value
                             })
                            
                            finalDataSetResponse.push(dataSetResponse)
                            })
                    
        
                       finalResponse = {
                        stats : finalStatsResponse,
                        data: finalDataSetResponse
                       }
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
    setApiPlayerFilters,
    setApiGroupFilters
}