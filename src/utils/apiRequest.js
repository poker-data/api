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
             if (!checkError) {
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
            const checkError = response.data.Response.PlayerResponse ? response.data.Response.PlayerResponse : response.data.Response.ErrorResponse
            if (!checkError.Error) {
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
        const filterType = body.filterType || null;

        let url = config.get(`url_services.group_info`).replace(':group', shkName);
        url = `${url}${config.get(`url_services.services.filter`)}`;
        
        if (filterType !== null) {
           
            filterType ==='filterType1' ? url = `${url}Type!:SAT,TI;Class:SCHEDULED` : url = `${url}`;
            filterType ==='filterType2' ? url = `${url}Entrants:500~*;Type!:SAT,TI;Class:SCHEDULED` : url = `${url}`;
            filterType === 'filterType3' ? url = `${url}Entrants:250~500;Type!:SAT,TI;Class:SCHEDULED` : url = `${url}`;
            filterType ==='filterType4' ? url = `${url}Entrants:2~250;Type!:SAT,TI;Class:SCHEDULED` : url = `${url}`;
            filterType === 'filterType5' ? url = `${url}Type!:SAT,TI;Class:SNG` : url = `${url}`;
        }

        const credentials = {
            Accept: 'application/json',
            Username: process.env.USERNAMEAPI,
            Password: process.env.PASSWORDAPI,
        }
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
                    const checkError = response.data.Response.PlayerResponse ? response.data.Response.PlayerResponse : response.data.Response.ErrorResponse
                    if (!checkError.Error) {
                       tempStatsResponse = response.data.Response.PlayerResponse.PlayerView.PlayerGroup.Statistics.Statistic
                        let statsResponse = {}
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



const setApiTournamentsFilters = (body) => {
    return new Promise((resolve, reject) => {
        const playerLevel = body.playerLevel;
        let url = config.get(`url_services.tournaments_info`)
        let stakeRange;
        config.get('playerLevels').map(element => {
        if(element.level === playerLevel) {
            stakeRange = element.stakeRange
        }
        })
        
        url = `${url}${'?Filter=Entrants:2~*;StakePlusRake:USD'}${stakeRange}${';Guarantee:USD0~2500;Type:H,NL;Type!:C,DN,HIT,SAT,TI,TN;Date!:1D;Class:SCHEDULED'}`;
        
        //url = `${url}${'?Filter=Entrants:2~*;StakePlusRake:USD1~5;Guarantee:USD1~2500;Type:H,NL;Type!:TI;Type!:C,DN,HIT,SAT,TI,TN;TournamentName!:Sat;Date!:1D;Class:SCHEDULED'}`;
        //url = `${url}${'?Filter=Entrants:2~*;StakePlusRake:USD0.8~6;Guarantee:USD0~2500;Type:H,NL;Type!:C,DN,HIT,SAT,TI,TN;Date!:1D;Class:SCHEDULED'}`;
        //console.log(url);
        axios.get(url, {
            headers: {
                Accept: 'application/json',
                Username: process.env.USERNAMEAPI,
                Password: process.env.PASSWORDAPI,
            }
        })
        .then(response => {
            
            const tableColumns = [
                "@id",
                "@scheduledStartDate",
                "@network",
                "@stake",
                "@guarantee",
                "@field",
                "@game",
                "@name",
                "@AvAbility",
                "@TypeAvAbility",
                "@TypeAvEntrants",
                "@TypeAvDuration",
                "@overlay",
            ];
            let finalStatsResponse = []
            let tempStatsResponse = []
            const checkError = response.data.Response.RegisteringTournamentsResponse ? response.data.Response.RegisteringTournamentsResponse : response.data.Response.ErrorResponse
            if (!checkError.Error) {
                tempStatsResponse = response.data.Response.RegisteringTournamentsResponse.RegisteringTournaments.RegisteringTournament
                let statsResponse = {}
                tempStatsResponse.map(element => {
                    //asignamos valor a cada columnna si existe
                    tableColumns.forEach(column => {
                        const value = element[column] ? element[column] : null
                        if(value!==null){
                        //sacamos @ del nombre de la columna y asignamos valor
                        statsResponse[column.substring(1,column.length)] = value
                        }else
                        {
                            //si el valor es null lo declaramos como vacio
                            statsResponse[column.substring(1,column.length)] = "-"
                        }
                    })
                    

                    const checkStatistics = element.Statistics ? true : false
                    if(checkStatistics){
                    const checkStat = element.Statistics.Statistic ? true: false
                    if (checkStat) {
                        //Si es undefined no entra la foreach por ende lo convertimos en uno
                        if(element.Statistics.Statistic.length === undefined){
                            element.Statistics.Statistic = [element.Statistics.Statistic]
                        }
                        element.Statistics.Statistic.forEach((stats) => {
                        const statId = stats["@id"]
                        const value = stats["$"]
                        const key = `@${statId}`
                        if(tableColumns.includes(key)){
                        statsResponse[statId] = value
                        }
                    })
                }
            }
                    finalStatsResponse.push(statsResponse)
                    statsResponse = {}
        })

            //Excluimos los torneos que contengan palabras claves
            let filteredData = finalStatsResponse.filter((value,index) => {
                if(config.get("excluded_keywords_lowercase").some(el => value.name.toLowerCase().includes(el)))
                {
                    return false;
                }
                else
                {
                    if(config.get("excluded_keywords_literal").some(el => value.name.includes(el))) 
                    {
                        return false;
                    }
                    else 
                    {
                        return true;
                    }
                }
                })

             filteredData.map((element) => {
                //cuando la garantia esta vacia la buscamos en el nombre
                if(element.guarantee === "-"){
                    var priceRegex = /[(0-9)+,?(0-9)*]+/igm;
                    element.guarantee = parseFloat(priceRegex.exec(element.name.replace(",","").replace(".",""))).toString();
                    }
                //Calculamos el field mediante la division del garantizado por la entrada
                element.field = (parseFloat(element.guarantee)/parseFloat(element.stake)).toFixed(2)
                
             })

               finalResponse = {
                stats : filteredData
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
    setApiGroupFilters,
    setApiTournamentsFilters,
}