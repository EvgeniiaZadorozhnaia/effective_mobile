const router = require("express").Router();
const { Appeal } = require("../../db/models");
const { Op, where } = require("sequelize");

router.get("/", async (req, res) => {
  const { date, startDate, endDate } = req.query;
  const where = {};

  if (date) {
    const selectedDate = new Date(date);
    selectedDate.setHours(0, 0, 0, 0);
    const nextDate = new Date(selectedDate);
    nextDate.setDate(selectedDate.getDate() + 1);

    where.createdAt = {
      [Op.gte]: selectedDate,
      [Op.lt]: nextDate,
    };
  }

  if (startDate && endDate) {
    where.createdAt = {
      [Op.between]: [new Date(startDate), new Date(endDate)],
    };
  }

  try {
    const appeals = await Appeal.findAll({ where });
    res.json(appeals);
  } catch (error) {
    console.error("Error fetching appeals:", error);
    res.status(500).json({ error: "Failed to fetch appeals" });
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

router.patch("/", async (req, res) => {
  try {
    const [updatedCount, updatedAppeals] = await Appeal.update(
      { status: "cancel" },
      { where: { status: "work" }, returning: true }
    );
    res.json({ updatedCount });
  } catch (error) {
    console.error("Error cancelling all in-progress appeals:", error);
    res.status(500).json({ error: "Failed to cancel appeals" });
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

module.exports = router;
