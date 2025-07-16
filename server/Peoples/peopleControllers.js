import User from "../models/user-model.js";
import UserUploadModel from "../UploadModule/userUploadModel.js";

export const fetchPeoples = async (req, res) => {
  //fetch all userData from server
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

//fetch Selected user uploaded Data
export const fetchSelectedData = async (req, res) => {
  try {
    const selectedID = req.params.selectedID;

    if (!selectedID) {
      return res.status(400).json({ message: "Invalid ID provided." });
    }

    // Find all uploads by user
    const data = await UserUploadModel.find({ user: selectedID }).populate("user", "-password");

    if (!data || data.length === 0) {
      return res.status(404).json({ message: "No uploads found for this user." });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};