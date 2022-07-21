const parser = require('xml2json');
const config = require('config');
const axios = require('axios');
var parseString = require('xml2js').parseString;

const playerStatsController = async (req) => {

    try {
        let playerName = req.params.playerName;
        try {

            let url = config.get(`url_services.player_info`);
            url = `${url}/${playerName}/statistics`;


            const response = await axios.get(url, {
                headers: {
                    Accept: 'application/xml',
                    Username: 'bbzlatam@gmail.com',
                    Password: '5b33a53c48de380f34ea5c0863bb37a2'
                }
            });

            const jsonString = await response.data//data.Response.PlayerResponse;

            let formatJson = {}
            parseString(jsonString, function (err, result) {
                formatJson = result;
            })

            return formatJson;

        } catch (err) {
            console.log(err)
            return err
        }

    } catch (error) {
        console.log(error)
    }

}


module.exports = {
    playerStatsController,
}