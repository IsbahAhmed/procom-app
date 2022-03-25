const Card = require("../Models/card");
const Board = require("../Models/board");
const multer = require("multer");

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
})

var upload = multer({ storage: storage })

exports.Add = async (req, res) => {
    body = req.body;
    let board = await Board.findOne({ _id: req.body.board, adminId: req.user.id });
    if (board) {
        let isboardMember = board.members.find(x => x.userId == req.body.userId);
        if (isboardMember) {
            const newCard = new Card(body);
            newCard
                .save()
                .then((result) => {
                    let a = {
                        board: result._id,
                    }
                    board.cards.push(a);
                    board.save()
                        .then(reslt => {
                            res.json({
                                status: "success",
                                message: result,
                            });
                        })

                })
                .catch((error) => {
                    console.log(error);
                    res.json({ status: "failed", message: error });
                });
        }
        else {
            res.json({ status: "failed", message: "not a member of the board" });
        }

    }
    else {
        res.json({ status: "failed", message: "unauthorized" });
    }
};

exports.updateCardStatus = async (req, res) => {
    body = req.body;
    let board = await Card.findOne({ _id: req.body.cardId, userId: req.user.id });
    if (board) {
        board.status = req.body.status;
        board
            .save()
            .then((result) => {
                res.json({
                    status: "success",
                    message: "card status updated successfully",
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

exports.uploadImage = async (req, res) => {
    
    await upload.single('myFile');

    const file = req.file
    if (!file) {
      const error = new Error('Please upload a file')
      error.httpStatusCode = 400
      return res.json(error)
    }
    return res.send(file)
    
};




