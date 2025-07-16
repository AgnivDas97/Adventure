import User from "../models/user-model.js"

export const userData =  async  (req, res)=>{
    try {
        const userData = req.user;
        //console.log(userData);
        return res.status(200).json(userData)
        
    } catch (error) {
        //console.log(error);
        
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
