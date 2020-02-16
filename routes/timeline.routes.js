const { Router } = require("express");
const { Types } = require("mongoose");
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth.middleware");
const Timeline = require("../models/Timeline");
const Period = require("../models/Period");
const router = Router();

router.post("/", auth, [check("title").exists()], async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title } = req.body;

    const timeline = new Timeline({ title, owner: req.userId });

    await timeline.save();

    return res.status(201).json(timeline);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const timelines = await Timeline.find({ owner: req.userId });

    return res.status(200).json(timelines);
  } catch (e) {
    return res.status(500).json({ message: "Something went wrong" });
  }
});

router.get("/shared", async (req, res) => {
  try {
    const timelines = await Timeline.find({ shared: true });

    return res.status(200).json(timelines);
  } catch (e) {
    return res.status(500).json({ message: "Something went wrong" });
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const timeline = await Timeline.findById(req.params.id);

    if (timeline.owner.toString() !== req.userId)
      return res.status(403).json({ message: "Forbidden" });

    const periods = await Period.find({
      timeline: Types.ObjectId(req.params.id)
    });

    timeline.set("periods", periods, { strict: false });

    return res.status(200).json(timeline);
  } catch (e) {
    return res.status(500).json({ message: "Something went wrong" });
  }
});

router.get("/:id/periods", async (req, res) => {
  try {
    const periods = await Period.find({
      timeline: Types.ObjectId(req.params.id)
    });

    return res.status(200).json(periods);
  } catch (e) {
    return res.status(500).json({ message: "Something went wrong" });
  }
});

router.delete("/", auth, [check("id").exists()], async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.body;

    const deleteCandidate = await Timeline.findOne({ _id: Types.ObjectId(id) });

    if (!deleteCandidate)
      return res.status(404).json({ message: "No Content" });

    if (deleteCandidate.owner.toString() !== req.userId)
      return res.status(403).json({ message: "Forbidden" });

    Timeline.findOneAndDelete({ _id: Types.ObjectId(id) }, (err, doc) => {
      return res.status(200).json({ message: "Deleted", item: doc });
    });
  } catch (e) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = router;
