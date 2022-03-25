const Board = require("../Models/board");

exports.Add = async (req, res) => {
    body = req.body;
    body.adminId = req.user.id;
    const newBoard = new Board(body);
    newBoard
        .save()
        .then((result) => {
            res.json({
                status: "success",
                message: result,
            });
        })
        .catch((error) => {
            console.log(error);
            res.json({ status: "failed", message: error });
        });
};

exports.list = async (req, res) => {
    let userId = req.user.id;
    Board.find({
        $or: [
            { adminId: userId },
            { "members.userId": userId },
          ],
    })
    .populate({ path: "members.userId", select: { firstName: 1, lastName: 1, email: 1 } })
    .populate("cards.board")
        .then((result) => {
            res.json({
                status: "success",
                message: "User List Retrieved Successfully",
                Data: result,
            });
        })
        .catch((error) => {
            console.log(error);
            res.json({ status: "failed", message: error });
        });
};

exports.addMembers = async (req, res) => {
    let board = await Board.findOne({ _id: req.body.boardId, adminId: req.user.id });
    if(board) {
        board.members.push(req.body);
        board.save()
        .then((result) => {
            res.json({
                status: "success",
                message: "Member Added Successfully"
            });
        })
        .catch((error) => {
            console.log(error);
            res.json({ status: "failed", message: error });
        });
    }
    else {
        res.json({ status: "failed", message: "unauthorized" });
    }   
};





