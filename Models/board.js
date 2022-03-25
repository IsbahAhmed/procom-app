const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BoardSchema = new Schema({

    title: {
        type: String,
        required: [true, "Please enter title"],
    },
    description: {
        type: String,
        required: [true, "Please enter description"],
    },
    adminId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    members: [
        {
            userId: {
                type: Schema.Types.ObjectId,
                ref: "User",
                required: true,
            }
        }
    ],
    cards: [
        {
            board: {
                type: Schema.Types.ObjectId,
                ref: "Card",
                required: true,
            }
        }
    ]
},
    {
        timestamps: true,
    }
);


module.exports = mongoose.model("Board", BoardSchema);
