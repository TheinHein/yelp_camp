const mongoose = require("mongoose");
const { Schema } = mongoose;
const imageSchema = new Schema({
  url: String,
  filename: String,
});
const opts = { toJSON: { virtuals: true } };
imageSchema.virtual("thumbnail").get(function () {
  return this.url.replace("/upload", "/upload/w_300");
});
const campgroundSchema = new Schema(
  {
    title: String,
    price: Number,
    description: String,
    location: String,
    geometry: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    images: [imageSchema],
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
    author: { type: Schema.Types.ObjectId, ref: "User" },
  },
  opts
);
campgroundSchema.virtual("properties.popUpMarkup").get(function () {
  return `<a href="/campgrounds/${this._id}">${this.title}</a>
  <p>${this.description.substring(0, 20)}...</p>`;
});
const Review = require("./review");

campgroundSchema.post("findOneAndDelete", async function (campground) {
  if (campground) {
    await Review.deleteMany({
      _id: {
        $in: campground.reviews,
      },
    });
  }
});

module.exports = mongoose.model("Campground", campgroundSchema);
