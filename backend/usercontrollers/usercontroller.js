





import { User } from "../models/userschema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
dotenv.config()

export const register = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, password, role } = req.body;

    if (!fullName || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false
      });
    };



    const file = req.file;
    const fileuri = getDataUri(file);
    const cloudresponse = await cloudinary.uploader.upload(fileuri.content);


    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already exist with this email.",
        success: false
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      fullName,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profile: {
        profilePhoto: cloudresponse.secure_url
      }
    });

    return res.status(201).json({
      message: "Account created successfully.",
      success: true
    });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false
      });
    }
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Incorrect email or password.",
        success: false
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect email or password.",
        success: false
      });
    }
    if (role !== user.role) {
      return res.status(400).json({
        message: "Account doesn't exist with current role.",
        success: false
      })
    };
    // Additional logic for token generation or further response can be added here
    const tokenData = {
      userId: user._id,
    };

    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

    // Security: You might not want to send sensitive information (like passwords) back to the client, even if it’s in the user object. So, this allows you to send only the necessary and safe information.
    user = {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    // "token" is name of the cookie
    return res.status(200)
      .cookie("token", token, {
        maxAge: 24 * 60 * 60 * 1000, // 1 day
        httpOnly: true,
        sameSite: 'strict',
      })
      .json({
        message: `Welcome back ${user.fullName}`,
        user,
        success: true,
      });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "An error occurred during login",
      success: false,
    });
  }
}

export const logout = async (req, res) => {
  try {
    return res.status(200)
      .cookie("token", "", {
        maxAge: 0, // Immediately expires the cookie
        httpOnly: true,
        sameSite: 'strict',
      })
      .json({
        message: "Logged out successfully.",
        success: true,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "An error occurred during logout.",
      success: false,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;

    let cloudresponse;
    const file = req.file;

    if (file) {
      const fileuri = getDataUri(file);
      cloudresponse = await cloudinary.uploader.upload(fileuri.content)
    }

    // const fileuri = getDataUri(file);
    // const cloudresponse = await cloudinary.uploader.upload(fileuri.content)


    let skillsArray

    if (skills) {
      skillsArray = skills.split(",");
    }

    const userId = req.id; // Middleware authentication should provide `req.id`

    let user = await User.findByIdAndUpdate(userId,                  // ID of the user to update
      {
        fullName: req.body.fullName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        "profile.bio": req.body.bio, // Access nested fields with dot notation
        "profile.skills": skillsArray,
      },
      { new: true, runValidators: true });

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
        success: false,
      });
    }

    if (cloudresponse) {
      user.profile.resume = cloudresponse.secure_url
      user.profile.resumeOriginalName = file.originalname
    }

    // if(fullname) user.fullname = fullname
    // if(email) user.email = email;
    // if(phoneNumber) user.phoneNumber = phoneNumber;
    // if(bio) user.profile.bio = bio;
    // if(skills) user.profile.skills = skillsArray;


    // // Update user fields
    // user.fullname = fullname;
    // user.email = email;
    // user.phoneNumber = phoneNumber;
    // user.profile.bio = bio;
    // user.profile.skills = skillsArray;

    await user.save();

    user = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res.status(200).json({
      message: "Profile updated successfully.",
      user,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "This email has already been used by someone else.",
      success: false,
    });
  }
};
