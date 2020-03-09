const { Router } = require("express");
const { Types } = require("mongoose");
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth.middleware");
const Period = require("../models/Period");

const router = Router();

router.get("/:id", auth, async (req, res) => {
  try {
    const period = await Period.findById(req.params.id);

    if (period.owner.toString() !== req.userId)
      return res.status(403).json({ message: "Forbidden" });

    return res.status(200).json(period);
  } catch (e) {
    return res.status(500).json({ message: "Something went wrong" });
  }
});

router.post(
  "/",
  auth,
  [check("title").exists(), check("from").exists(), check("timeline").exists()],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { title, from, to, timeline, description } = req.body;

      const period = new Period({
        title,
        from,
        to,
        timeline,
        description,
        owner: req.userId
      });

      await period.save();

      return res.status(201).json(period);
    } catch (e) {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

router.put(
  "/",
  auth,
  [check("title").exists(), check("from").exists(), check("_id").exists()],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { _id, title, from, to, description } = req.body;

      Period.findOneAndUpdate(
        { _id: Types.ObjectId(_id) },
        {
          title,
          from,
          to,
          description
        }, (err, doc) => {
          return res.status(200).json({ message: "Updated", item: doc });
        }
      );


    } catch (e) {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

router.delete("/", auth, [check("id").exists()], async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.body;

    const deleteCandidate = await Period.findOne({ _id: Types.ObjectId(id) });

    if (!deleteCandidate)
      return res.status(404).json({ message: "No Content" });

    if (deleteCandidate.owner.toString() !== req.userId)
      return res.status(403).json({ message: "Forbidden" });

    Period.findOneAndDelete({ _id: Types.ObjectId(id) }, (err, doc) => {
      return res.status(200).json({ message: "Deleted", item: doc });
    });
  } catch (e) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = router;
