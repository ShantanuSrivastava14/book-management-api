import { validationResult } from "express-validator";
import userModel from "../models/userModel.js";
import { createSecretToken } from "../utils/secretToken.js";

export const signup = async (req, res, next) => {
    try {
      const errors = validationResult(req);
  
      if (!errors.isEmpty()) {
        return res.status(400).json({ error: "Please enter correct Details!" });
      }
      const { email, password } = req.body;
      const user = new userModel({ email, password });
      await user.save();
  
      res.status(201).json({ message: "User signed up successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message || "An error occurred" });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(400).json({error: "Incorrect Email"});
        }
        if(!(await user.comparePassword(password))){
            return res.status(400).json({error: "Incorrect Password"});
        }
        const token = createSecretToken(user._id);
        return res.status(200).json({email: user.email, token});
    } catch(error){
        res.status(500).json({error: error.message || "An error occurred"});
    }
};