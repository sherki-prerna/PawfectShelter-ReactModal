const axios = require("axios");

const normalizeBaseUrl = (value) => {
  if (!value) {
    return "";
  }

  const trimmedValue = value.replace(/\/$/, "");
  if (
    trimmedValue.startsWith("http://") ||
    trimmedValue.startsWith("https://")
  ) {
    return trimmedValue;
  }

  return `https://${trimmedValue}`;
};

const ML_API_URL = normalizeBaseUrl(
  process.env.ML_API_URL || "http://127.0.0.1:8000",
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
