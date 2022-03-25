const User = require("../Models/user");
const Board = require("../Models/board");

const jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs");

exports.signUp = async (req, res) => {
    const body = req.body;
    User.findOne({ email: body.email }).then((found) => {
        if (found) {
            return res.json({
                status: "success",
                message: "user exists with this email",
            });
        }
        else {
            const hashedPw = bcrypt
                .hash(body.password, 12)
                .then((hashedPw) => {
                    const newUser = new User(req.body);
                    newUser.password = hashedPw;
                    newUser
                        .save()
                        .then((result) => {
                            res.json({
                                status: "success",
                                message: "user created successfully",
                            });
                        })
                        .catch((error) => {
                            console.log(error);
                            res.json({ status: "failed", message: error });
                        });
                })
                .catch((error) => {
                    console.log(error);
                    res.json({ status: "failed", message: error });
                });
        }


    });
};


exports.signIn = async (req, res) => {
    let foundUser;
    User
        .findOne({ email: req.body.email })
        .then((user) => {
            if (!user) {
                res.json({
                    status: "failed",
                    message: "The user has not been found with this email",
                });
            }
            else {
                foundUser = user;
                bcrypt.compare(req.body.password, user.password)
                    .then((ifEqual) => {
                        if (!ifEqual) {
                            res.json({
                                status: "failed",
                                message: "Incorrect password",
                            });
                        }
                        else {
                            const token = jwt.sign(
                                {
                                    email: foundUser.email,
                                    id: foundUser._id,
                                },
                                "test123",
                                { expiresIn: "1d" }
                            );
                            const { password, ...responseUser } = foundUser._doc;
                            res.json({
                                status: "success",
                                message: "the user has been loggedIn",
                                Data: responseUser,
                                token: token,
                            });
                        }

                    });
            }

        })

};

exports.list = async (req, res) => {
    Board.findOne({ _id: req.body.boardId })
        .then(reslt => {
            let a = [];
            reslt.members.forEach(item => {
                a.push(item.userId);
            })
            a.push(req.user.id);
            User.find({ _id: { $nin: a } })
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
        })

};


