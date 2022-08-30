const Messages = require("../modules/messageModel");
const Chat = require("../modules/chatModel");

module.exports.startNewChat = async (req, res, next) => {
  try {

    if(req.body.user2 != 0){
      const result1 = await Chat.find({
        users: [req.body.user1, req.body.user2],
      }).populate("users");
  
      if (result1.length == 0) {
          const users = [req.body.user1, req.body.user2];
  
          const result = new Chat({ users: users });
  
          const output = await result.save();
  
          if (output) {
            const result1 = await Chat.find({
              users: { $elemMatch: { $eq: req.body.user1 } },
            }).populate("users");
  
            const allChat = result1.map((value) => {
              if (value.users[0]._id == req.body.user1) {
                return value.users[1];
              } else {
                return value.users[0];
              }
            });
            res.send({ allChat }).status(201);
          }
      } else {
        const result1 = await Chat.find({
          users: { $elemMatch: { $eq: req.body.user1 } },
        }).populate("users");
  
        const allChat = result1.map((value) => {
          if (value.users[0]._id == req.body.user1) {
            return value.users[1];
          } else {
            return value.users[0];
          }
        });
  
        res.send({ allChat }).status(201);
      }
    }else {
      const result1 = await Chat.find({
        users: { $elemMatch: { $eq: req.body.user1 } },
      }).populate("users");

      const allChat = result1.map((value) => {
        if (value.users[0]._id == req.body.user1) {
          return value.users[1];
        } else {
          return value.users[0];
        }
      });

      res.send({ allChat }).status(201);
    }
  } catch (error) {
    next(error);
  }
};

const getAllChat = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await Chat.find({
      users: { $elemMatch: { $eq: id } },
    }).populate("users");

    const allChat = result.map((value) => {
      if (value.users[0]._id == id) {
        return value.users[1];
      } else {
        return value.users[0];
      }
    });

    res.send({ allChat }).status(201);
  } catch (error) {
    next(error);
  }
};

module.exports.getMessages = async (req, res, next) => {
  try {
    const { from, to } = req.body;

    const messages = await Messages.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 });

    const projectedMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
      };
    });
    res.json(projectedMessages);
  } catch (ex) {
    next(ex);
  }
};

module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    const data = await Messages.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });

    if (data) return res.json({ msg: "Message added successfully." });
    else return res.json({ msg: "Failed to add message to the database" });
  } catch (ex) {
    next(ex);
  }
};
