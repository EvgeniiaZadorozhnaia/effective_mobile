const router = require("express").Router();
const { Appeal } = require("../../db/models");

router.get("/", async (req, res) => {
  try {
    const appeals = await Appeal.findAll();
    res.json(appeals);
  } catch (error) {
    console.error("Error fetching appeals:", error);
    res.status(500).json({ error: "Failed to fetch appeals" });
  }
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { status, cancel_reason, solution } = req.body;
  try {
    const appeal = await Appeal.findByPk(id);
    if (!appeal) {
      return res.status(404).json({ error: "Appeal not found" });
    }
    appeal.status = status;
    if (status === "cancel" && cancel_reason) {
      appeal.cancel_reason = cancel_reason;
    }

    if (status === "finish" && solution) {
      appeal.solution = solution;
    }

    await appeal.save();
    res.json(appeal);
  } catch (error) {
    console.error("Error updating appeal:", error);
    res.status(500).json({ error: "Failed to update appeal" });
  }
});

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
