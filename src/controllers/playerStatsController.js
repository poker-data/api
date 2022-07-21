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
                    Accept: 'application/json',
                    Username: process.env.USERNAMEAPI,
                    Password: process.env.PASSWORDAPI
                }
            });

            const jsonString = await response.data//data.Response.PlayerResponse;

            return jsonString;

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