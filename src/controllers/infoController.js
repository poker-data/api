const { remainingRequests } = require('../utils/apiRequest');


const remainingRequestsController = async(req) => {
    const body = req.body; 
    try {
        const setRemainingRequests = await remainingRequests( body );
        return setRemainingRequests
    } catch (error) {
        return error
    }
}


module.exports = {
    remainingRequestsController
}