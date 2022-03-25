const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({

    firstName: {
        type: String,
        required: [true, "Please enter first name"],
    },
    lastName: {
        type: String,
        required: [true, "Please enter last name"],
    },
    email: {
        type: String,
        required: [true, "Please enter email"],
        unique: true,
        index: true,
        lowercase: true,
        validate: {
            validator: function (email) {
                const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(String(email).toLowerCase());
            },
            message: "Invalid email"
        },
    },
    password: {
        type: String,
        required: [true, "Please enter password"],
    },
},
    { timestamps: true }
);


module.exports = mongoose.model("User", UserSchema);
