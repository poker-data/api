const { remainingRequests } = require('../utils/apiRequest');


const remainingRequestsController = async(req) => {
    try {
        const setRemainingRequests = await remainingRequests();
        return setRemainingRequests
    } catch (error) {
        return error
    }
}


module.exports = {
    remainingRequestsController
}