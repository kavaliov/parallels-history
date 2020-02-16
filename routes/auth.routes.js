const { Router } = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const config = require("config");
const User = require("../models/User");
const router = Router();

router.post(
  "/register",
  [
    check("email")
      .exists()
      .isEmail(),
    check("password")
      .exists()
      .isLength({ min: 6 })
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;

      const candidate = await User.findOne({ email });

      if (candidate) {
        return res.status(400).json({ message: "Email already exist" });
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({ email, password: hashedPassword });

      await user.save();

      return res.status(201).json({ message: "User created" });
    } catch (e) {
      return res.status(500).json({ message: "Something went wrong" });
    }
  }
);

router.post(
  "/login",
  [
    check("email")
      .exists()
      .normalizeEmail()
      .isEmail(),
    check("password").exists()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }

      const matchPassword = await bcrypt.compare(password, user.password);

      if (!matchPassword) {
        return res.status(400).json({ message: "Invalid password" });
      }

      const token = jwt.sign({ userId: user.id }, config.get("jwtSalt"), {
        expiresIn: "24h"
      });

      return res.json({ token, userId: user.id });

    } catch (e) {
      return res.status(500).json({ message: "Something went wrong" });
    }
  }
);

module.exports = router;
