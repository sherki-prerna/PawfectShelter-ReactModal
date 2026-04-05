const express = require("express");
const router = express.Router();
const { recommendPets } = require("../controllers/petController");

router.post("/recommend", recommendPets);

module.exports = router;