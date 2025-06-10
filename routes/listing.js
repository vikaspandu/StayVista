const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const multer = require('multer');
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });


const listingController = require("../controllers/listings.js");



router
    .route("/")
    .get(wrapAsync(listingController.index)) // Index Route
    .post(isLoggedIn, upload.single("listing[image]"), validateListing, wrapAsync(listingController.createListing)) // Accepting post request (create route)


// new listing create route
router.get("/new", isLoggedIn, listingController.renderNewFrom)

router
    .route("/:id")
    .get(wrapAsync(listingController.showListing)) // Show Route 
    .put(isLoggedIn, isOwner, upload.single("listing[image]"), validateListing, wrapAsync( listingController.updateListing )) // Update Route
    .delete(isOwner, wrapAsync( listingController.destroyListing )); // Delete Route


// Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync( listingController.renderEditForm));

module.exports = router;