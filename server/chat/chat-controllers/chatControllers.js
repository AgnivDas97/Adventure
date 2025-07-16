import Chat from '../chat-models/chatModels.js';
import User from '../../models/user-model.js'

export const accesChat = async (req, res, next) => {
    res.send("Accessing chat");
    const {userId}=req.body;
    if(!userId){
        return res.status(400).send({message:"UserId not sent with request"})
    }

    var isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password").populate("latestMessage");
  //console.log(isChat,"isChat accessChat 1")
  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name pic email",
  });
  //console.log(isChat,"isChat accessChat 2")
  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    };

    try {
      const createdChat = await Chat.create(chatData);
      const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );
      res.status(200).json(FullChat);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
    }
}

export const fetchChats = async (req, res) => {
  try {
    Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await User.populate(results, {
          path: "latestMessage.sender",
          select: "name pic email",
        });
        res.status(200).send(results);
      });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
};

export const createGroupChat=async(req,res)=>{
    if(!req.body.users || !req.body.name){
        return res.status(400).send({message:"please fill all the feilds"})
    }
    var users = JSON.parse(req.body.users);
    if(users.length < 2){
        return res.status(400).send("More than 2 users are required to form a group chat")
    }
    users.push(req.user);
    try {
        const groupChat = await Chat.create({
            chatName: req.body.name,
            users:users,
            isGroupChat:true,
            groupAdmin:req.user,
        })
        const fullGroupChat = await Chat.findOne({_id:groupChat._id}).populate("users","-password").populate("groupAdmin","-password")

        res.status(200).json(fullGroupChat);

    } catch (error) {
        res.status(400)
        throw new Error(error.message)
    }
};

export const renameGroup=async(req,res)=>{
    const { chatId , chatName}=req.body
    const updatedChat = await Chat.findByIdAndUpdate(
        chatId,
        {
            chatName,
        },
        {
            new: true,
        }
    ).populate("users","-password").populate("groupAdmin","-password")
    if(!updatedChat){
        res.status(404);
        throw new Error("Chat not Found")
    }else{
        res.json(updatedChat);
    }
}

export const addToGroup=async(req,res)=>{
    const { chatId , userId}=req.body
    const added =await Chat.findByIdAndUpdate(
        chatId,
        {
            $push:{users:userId},
        },{
            new:true
        }
    ).populate("users","-password").populate("groupAdmin","-password")
     if(!added){
        res.status(404);
        throw new Error("Chat not Found")
    }else{
        res.json(added);
    }
}

export const removeFromGroup=async(req,res)=>{
     const { chatId , userId}=req.body
    const remove =await Chat.findByIdAndUpdate(
        chatId,
        {
            $pull:{users:userId},
        },{
            new:true
        }
    ).populate("users","-password").populate("groupAdmin","-password")
     if(!remove){
        res.status(404);
        throw new Error("Chat not Found")
    }else{
        res.json(remove);
    }
}