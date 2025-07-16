import express from "express";
import Chat from '../chat-models/chatModels.js';
import User from '../../models/user-model.js'
import Message from '../chat-models/messageModel.js';

export const sendMessage = async (req, res) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    res.status(400).json({ message: "Invalid data passed into request" });
    return;
  }

  var newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };

  // console.log("newMessage", newMessage);
  try {
    var message = await Message.create(newMessage);

    message = await message.populate("sender", "name pic");//.execPopulate();
    message = await message.populate("chat");//.execPopulate();
    message = await User.populate(message, {
      path: "chat.users",
      select: "name pic email",
    });

    await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });

    // console.log(message,"check message");
    res.json(message);
    // return res.status(200).json({ message: "Message sent successfully", message });
  
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
};

export const allMessages = async (req, res) => {
     try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name pic email")
      .populate("chat");
    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
}
