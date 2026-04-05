const { getBatchScores } = require("../services/mlService");
const pets = require("../data/pets");

const energyMap = {
  low: 0,
  medium: 1,
  high: 2,
};

const sizeMap = {
  Cat: 0,
  Dog: 1,
};

const temperamentMap = {
  calm: 0,
  "low-maintenance": 0,
  balanced: 0,
  active: 1,
  "experienced-only": 1,
};

const recommendPets = async (req, res) => {
  try {
    const user = req.body;

    const userFeatures = [user.lifestyle, user.home_type, user.experience];

    const petsWithFeatures = pets.map((pet) => ({
      ...pet,
      features: [
        energyMap[pet.energy] ?? 1,
        sizeMap[pet.type] ?? 1,
        temperamentMap[pet.category] ?? 0,
      ],
    }));

    // Combine features
    const featureList = petsWithFeatures.map((pet) => [
      ...userFeatures,
      ...pet.features,
    ]);

    // Get scores in one call
    const scores = await getBatchScores(featureList);

    if (!scores.length) {
      return res
        .status(502)
        .json({ error: "ML service is unavailable. Start the Python API first." });
    }

    // Attach scores
    const results = petsWithFeatures.map((pet, index) => ({
      ...pet,
      score: scores[index],
    }));

    // Sort & take top 5
    results.sort((a, b) => b.score - a.score);

    res.json(results.slice(0, 5));
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = { recommendPets };
