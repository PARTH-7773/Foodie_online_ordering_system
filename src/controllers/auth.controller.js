import userModel from "../models/auth.model.js";
import { GenerateAccessToken } from "../utils/util.js";

/**
 * @route - POST api/auth/signUp
 * @description - User registration controller
 * @access public
 */
export const signUp = async (req, res) => {
  const { name, email, password, conformPassword } = req.body;

  if (!name || !email || !password || !conformPassword) {
    return res.status(400).json({
      success: false,
      message: "All feildes are required for creating account.",
      data: null,
    });
  }
  try {

    const userAlreadyExist = await userModel.findOne({ email });
    if (userAlreadyExist) {
      return res.status(403).json({
        success: false,
        message: "User already have this email.",
        data: null,
      });
    }

    const newUser = new userModel({
      name,
      email,
      password,
    });

    let user = await newUser.save();

    const token = await GenerateAccessToken(user._id, user.role, res);
    res.status(201).json({
      success: true,
      message: "User registration Successfull",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log("somethig went Wrong", error.message);
    return res.status(500).json({
      success: false,
      message: "Error in SignUp controller",
      data:null
    })
  }
};

/**
 * @route - POST api/auth/signIn
 * @description - User login controller
 * @access public
 */

export const signIn = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "All feilds are required for SignIn.",
      data: null,
    });
  }
  try {
    
    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        data: null,
      });
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid Credentials",
        data: null,
      });
    }

    const token = await GenerateAccessToken(user._id, user.role, res);

    return res.status(200).json({
      success: true,
      message: "SignIn success",
      data: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.log("somethig went wrong",error.message);
    return rest.status(500).json({
      success:false,
      message:"Error in SignIn controller",
      data:null
    })
  }
};
