import bcrypt from "bcrypt";
import {Freelancer} from "../../models/FreelancerModel.js";

import mongoose from "mongoose";

//SIGNUP CONTROLLER
export const signupFreelancer = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      location,
      password,
      skills,
      experience,
      profilePic,
    } = req.body;

    // Check if freelancer already exists
    const existingFreelancer = await Freelancer.findOne({ email });
    if (existingFreelancer) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new freelancer
    const newFreelancer = new Freelancer({
      name,
      email,
      phone,
      location,
      password: hashedPassword,
      skills: skills || [], // Default empty array if not provided
      experience,
      profilePic: profilePic || "", // Default empty string if not provided
    });

    // Save freelancer in DB
    await newFreelancer.save();

    return res
      .status(201)
      .json({ message: "Freelancer registered successfully" });
  } catch (error) {
    console.error("Signup Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//LOGIN CONTROLLER
export const loginFreelancer = async (req, res) => {
  try {
    const { email, password } = req.body;

    const freelancer = await Freelancer.findOne({ email });
    if (!freelancer) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, freelancer.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({
      message: "Login successful",
      userId: freelancer._id,
      name: freelancer.name,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//GET FREELANCER PROFILE CONTROLLER
export const getFreelancerProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    const freelancer = await Freelancer.findById(userId).select("-password");

    if (!freelancer) {
      return res.status(404).json({ message: "Freelancer not found" });
    }

    res.status(200).json(freelancer);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//UPDATE FREELANCER PROFILE
export const updateFreelancerProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const updates = req.body;

    // Validate userId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId format" });
    }

    // Find and update the freelancer
    const updatedFreelancer = await Freelancer.findByIdAndUpdate(
      userId,
      { $set: updates },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedFreelancer) {
      return res.status(404).json({ message: "Freelancer not found" });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      freelancer: updatedFreelancer,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
