const router = require("express").Router();
const { Appeal } = require("../../db/models");

router.post("/", async (req, res) => {
  const { topic, description } = req.body;
  try {
    const newAppeal = await Appeal.create({
      topic,
      description,
      status: "new",
    });
    res.json(newAppeal);
  } catch (error) {
    console.error("Error creating appeal:", error);
    res.status(500).json({ error: "Failed to create appeal" });
  }
});

module.exports = router;
