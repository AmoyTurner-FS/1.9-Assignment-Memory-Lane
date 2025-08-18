const express = require("express");
const Movie = require("../models/Movie");

const router = express.Router();

// GET all
router.get("/", async (_req, res) => {
  try {
    const movies = await Movie.find().sort({ created_at: -1 });
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// GET one by id
router.get("/:id", async (req, res) => {
  try {
    const doc = await Movie.findById(req.params.id);
    if (!doc) return res.status(404).json({ error: "Not found" });
    res.json(doc);
  } catch {
    res.status(400).json({ error: "Invalid id" });
  }
});

// POST create
router.post("/", async (req, res) => {
  try {
    const { title, year, rating } = req.body;
    const created = await Movie.create({ title, year, rating });
    res.status(201).json(created);
  } catch (err) {
    res.status(400).json({ error: "Bad request", details: err.message });
  }
});

// PATCH
router.patch("/:id", async (req, res) => {
  try {
    const updated = await Movie.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ error: "Not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: "Bad request", details: err.message });
  }
});

// PUT
router.put("/:id", async (req, res) => {
  try {
    const { title, year, rating } = req.body;
    const updated = await Movie.findByIdAndUpdate(
      req.params.id,
      { title, year, rating },
      { new: true, runValidators: true, overwrite: true }
    );
    if (!updated) return res.status(404).json({ error: "Not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: "Bad request", details: err.message });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const removed = await Movie.findByIdAndDelete(req.params.id);
    if (!removed) return res.status(404).json({ error: "Not found" });
    res.json({ ok: true });
  } catch {
    res.status(400).json({ error: "Invalid id" });
  }
});

module.exports = router;
