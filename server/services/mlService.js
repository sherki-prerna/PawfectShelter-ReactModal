const axios = require("axios");

const ML_API_URL = (process.env.ML_API_URL || "http://127.0.0.1:8000").replace(
  /\/$/,
  "",
);

const getBatchScores = async (featureList) => {
  try {
    const response = await axios.post(`${ML_API_URL}/predict-batch`, {
      features: featureList,
    });

    return response.data.scores;
  } catch (error) {
    console.error("ML API Error:", error.message);
    return [];
  }
};

module.exports = { getBatchScores };
