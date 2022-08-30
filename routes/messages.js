const { addMessage, getMessages, startNewChat} = require("../controllers/messageController");
const router = require("express").Router();

router.post("/addmsg/", addMessage);
router.post("/getmsg/", getMessages);
router.post("/newChat",startNewChat)
// router.get("/allChat/:id",getAllChat)


module.exports = router;
