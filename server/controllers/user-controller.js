import User from "../models/user-model.js"

export const userData =  async  (req, res)=>{
    try {
    // req.user is set in userMiddleware after token verification
    const userData = req.user;

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return user data (excluding sensitive fields like password)
    return res.status(200).json({
      _id: userData._id,
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      profilePhoto: userData.profilePhoto || "", // Ensure it doesn't break if undefined
      isAdmin: userData.isAdmin,
      createdAt: userData.createdAt
    });

  } catch (error) {
    console.error("Error fetching user data:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export const allUsers = async (req, res) => {
    // //console.log(req,res,"allUsers1")
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};
    // //console.log(keyword,"allUsers2")
  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
   //console.log(users,"allUsers3")
  res.send(users);
};
