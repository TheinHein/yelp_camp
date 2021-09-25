const express = require("express");
const router = express.Router();

const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({
  storage,
  limits: { fileSize: 1e7 },
});

// * MIDDLEWARE
const catchAsync = require("../utils/catchAsync");
const { isLoggedIn, validateCampground, isAuthor } = require("../middleware");

// * CONTROLLER
const campgrounds = require("../controllers/campgrounds");

// * ROUTES
router
  .route("/")
  // * INDEX
  .get(catchAsync(campgrounds.index))
  // * NEW
  .post(
    isLoggedIn,
    upload.array("image"),
    validateCampground,
    catchAsync(campgrounds.create)
  );

router
  .route("/new")
  // * NEW FORM
  .get(isLoggedIn, campgrounds.renderNewForm);

router
  .route("/:id")
  // * SHOW
  .get(catchAsync(campgrounds.show))
  // * UPDATE
  .put(
    isLoggedIn,
    isAuthor,
    upload.array("image"),
    validateCampground,
    catchAsync(campgrounds.update)
  )
  // * DELETE
  .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.delete));

// * UPDATE FORM
router.get(
  "/:id/edit",
  isLoggedIn,
  isAuthor,
  catchAsync(campgrounds.renderUpdateForm)
);

module.exports = router;
