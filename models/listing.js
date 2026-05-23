const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    description: String,
    image: {
    filename: {
        type: String,
        default: "listingimage",
    },
    url: {
        type: String,
        default:
          "https://images.unsplash.com/photo-1774905171855-3bcc7aafd33e?w=1000&auto=format&fit=crop&q=60",
        set: (v) =>
          v === ""
            ? "https://images.unsplash.com/photo-1774905171855-3bcc7aafd33e?w=1000&auto=format&fit=crop&q=60"
            : v,
    },
    },
    price:Number,
    location: String,
    country:String,
});

const Listing = mongoose.model("Listing",listingSchema)
module.exports = Listing;

