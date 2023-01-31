const { findExcludedKeywordsInDB, newExcludedKeywordsCreatorInDB, updateExcludedKeywordsInDB } = require('../utils')

const getExcludedKeywordsController = async () => {
    try {
        const ExcludedKeywordsList = await findExcludedKeywordsInDB();
        return ExcludedKeywordsList;
    } catch (error) {
        return error
    }
}

const setExcludedKeywordsController = async (req) => {

    const body = req.body;
    try {
      const newExcludedKeywords = await newExcludedKeywordsCreatorInDB(body);
      return newExcludedKeywords;
  
    } catch (error) {
      return error;
    }
  }

const updateExcludedKeywordsController = async (_id, keyword) => {
    try {
      const ExcludedKeywordsUpdated = updateExcludedKeywordsInDB(_id, keyword)   
      return ExcludedKeywordsUpdated
    } catch (error) {
      return error
    }
  
  }  

module.exports = {
    getExcludedKeywordsController,
    setExcludedKeywordsController,
    updateExcludedKeywordsController,
}