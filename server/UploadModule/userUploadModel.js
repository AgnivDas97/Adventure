import mongoose from "mongoose";

// _id: 		"jhhvwyucvibaSS9I0980YU32Y8V68G7G"
// user: 		"6732CD6739HDGTC73IU8E3HC33UI8H36BG"
// context: 	"Witness the IMMORTAL story of Rama vs. Ravana Ramayana. Our Truth. Our History. Filmed for IMAX. From INDIA for a BETTER World."
// pictures:	[]
// like:		[]  //add user id
// profilePhoto: "http://Cloud.com"
// createdAt:	2025-07-14T0:00:00.565+00:00

// __v:0


const UserUploadModel = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        context: {
            type: String,
            required: true,
            trim: true
        },
        pictures: [{
            type: String,
            required: true
        }],
        like: [{
            type: String,
            required:true
        }]
    },
    {
        timestamps: true
    }
);

export default mongoose.model("UserUpload", UserUploadModel);