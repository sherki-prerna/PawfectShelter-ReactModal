const { getBatchScores } = require("../services/mlService");
const pets = require("../data/pets");

const energyMap = {
  low: 0,
  medium: 1,
  high: 2,
};

const sizeMap = {
  small: 0,
  medium: 1,
  large: 2,
};

const temperamentMap = {
  calm: 0,
  "low-maintenance": 0,
  balanced: 0,
  active: 1,
  "experienced-only": 1,
};

const experienceLevelMap = {
  beginner: 0,
  any: 0,
  some: 1,
  experienced: 1,
};

const getPreferenceScore = (user, pet) => {
  const userLifestyle = user.lifestyle;
  const petEnergy = energyMap[pet.energy] ?? 1;
  const energyDiff = Math.abs(userLifestyle - petEnergy);
  const lifestyleScore = [1, 0.65, 0.25][energyDiff] ?? 0.25;

  let homeScore = 0.8;
  if (user.home_type === 0) {
    homeScore = pet.size === "small" ? 1 : pet.size === "medium" ? 0.7 : 0.35;
  } else {
    homeScore = pet.size === "large" ? 1 : pet.size === "medium" ? 0.85 : 0.75;
  }

  const petExperience = experienceLevelMap[pet.experience] ?? 0;
  let experienceScore = 1;
  if (user.experience === 0 && petExperience === 1) {
    experienceScore = 0.35;
  } else if (user.experience === 1 && petExperience === 0) {
    experienceScore = 0.85;
  }

  return lifestyleScore * 0.45 + homeScore * 0.25 + experienceScore * 0.3;
};

const recommendPets = async (req, res) => {
  try {
    const user = req.body;

    const userFeatures = [user.lifestyle, user.home_type, user.experience];

    const petsWithFeatures = pets.map((pet) => ({
      ...pet,
      features: [
        energyMap[pet.energy] ?? 1,
        sizeMap[pet.size] ?? 1,
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
    const results = petsWithFeatures.map((pet, index) => {
      const { features, ...petData } = pet;

      return {
        ...petData,
        score: scores[index] * 0.65 + getPreferenceScore(user, pet) * 0.35,
      };
    });

    // Sort & take top 5
    results.sort((a, b) => b.score - a.score);

    res.json(results.slice(0, 5));
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = { recommendPets };
