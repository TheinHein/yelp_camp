// * MODEL
const Campground = require("../models/campground");
const Review = require("../models/review");

// * CREATE
module.exports.create = async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findById(id);
  const review = new Review(req.body.review);
  review.author = req.user._id;
  campground.reviews.push(review);
  await campground.save();
  await review.save();
  req.flash("success", "Created a review!");
  res.redirect(`/campgrounds/${id}`);
};

// * DELETE
module.exports.delete = async (req, res) => {
  const { id, reviewId } = req.params;
  const campground = await Campground.findByIdAndUpdate(id, {
    $pull: { reviews: reviewId },
  });
  const review = await Review.findByIdAndDelete(reviewId);
  req.flash("success", "Successfully deleted review!");
  res.redirect(`/campgrounds/${id}`);
};
