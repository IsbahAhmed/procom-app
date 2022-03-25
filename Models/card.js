const mongoose = require("mongoose");
const enums = require("../Utils/enums");

const Schema = mongoose.Schema;

const CardSchema = new Schema({

    title: {
        type: String,
        required: [true, "Please enter title"],
    },
    description: {
        type: String,
        required: [true, "Please enter description"],
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    status: {
        type: String,
        required: [true, "Status Missing"],
        enum: Object.values(enums.cardStatusEnums),
        default: "todo"
    },
    priority: {
        type: String,
        required: [true, "Priority Missing"],
        enum: Object.values(enums.cardPriorityEnums),
        default: "low"
    },
},
    { timestamps: true }
);


module.exports = mongoose.model("Card", CardSchema);
