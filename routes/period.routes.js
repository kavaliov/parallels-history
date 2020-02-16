const { Router } = require("express");
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth.middleware");
const Period = require("../models/Period");

const router = Router();

router.post(
  "/",
  auth,
  [
    check("title").exists(),
    check("from").exists(),
    check("timeline").exists()
  ],
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

module.exports = router;
