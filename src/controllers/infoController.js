const { remainingRequests } = require('../utils/apiRequest');


const remainingRequestsController = async(req) => {
    const body = req.body; 
    try {
        const setFilters = await remainingRequests( body );
        return setFilters
    } catch (error) {
        return error
    }
}


module.exports = {
    remainingRequestsController
}