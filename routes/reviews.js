const express = require("express");
const router = express.Router({ mergeParams: true });

// * CONTROLLER
const reviews = require("../controllers/reviews");

// * MIDDLEWARE
const catchAsync = require("../utils/catchAsync");
const { isLoggedIn, validateReview, isReviewAuthor } = require("../middleware");

// * ROUTES
// * CREATE
router.post("/", validateReview, catchAsync(reviews.create));

// * DELETE
router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  catchAsync(reviews.delete)
);

module.exports = router;
