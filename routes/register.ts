import express, { Request, Response, NextFunction } from "express";
import { Follow } from "../models/follow";
import { Users } from "../models/user";
const bcrypt = require("bcrypt");

const router = express.Router();

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  const emailExists = await Users.findOne({ where: { email: email } });
  if (emailExists) {
    return res.status(400).json({ message: "이미 사용중인 이메일입니다." });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  await Users.create({
    email: email,
    password: hashedPassword,
  }).then(async (result) => {
    res.status(201).json(result);
    await Follow.create({
      user_id: result.user_id,
    });
  });
});

module.exports = router;
