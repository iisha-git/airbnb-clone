const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync.js");
const {listingSchema} = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const {isLoggedIn,isOwner} = require("../middleware.js")

const validateListing = (req,res,next)=>{
    let {error} = listingSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400, errMsg);
    }else{
        next();
    }
}

//index route
router.get("/",async (req,res)=>{
    const allListings =await Listing.find({});
    res.render("listings/index.ejs",{allListings});
});

//route new
router.get("/new",isLoggedIn,(req,res)=>{
    res.render("listings/new.ejs");
})

//show route
router.get("/:id",wrapAsync(async(req,res)=>{
    let{id} = req.params;
    const listing = await Listing.findById(id).populate("reviews");
    if(!listing){
        req.flash("error","Listing does not exist!")
        return res.redirect("/listings")
    }
    res.render("listings/show.ejs",{listing})
}))

//create route
router.post(
    "/",
    isLoggedIn,
    validateListing,
    wrapAsync(async (req, res) => {
        const newListing = new Listing(req.body.listing);

        // Save the logged-in user as the owner
        newListing.owner = req.user._id;

        await newListing.save();

        req.flash("success", "New Listing Created!");
        res.redirect("/listings");
    })
);


//edit route
router.get("/:id/edit", isOwner, isLoggedIn,wrapAsync(async(req,res)=>{
    let{id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
})
)

//update route
router.put(
    "/:id", isLoggedIn, isOwner, 
    validateListing,
    wrapAsync(async (req, res) =>  {
        let { id } = req.params;

        await Listing.findByIdAndUpdate(id, { ...req.body.listing });

        res.redirect(`/listings/${id}`);
    })
);

//delete route
router.delete("/:id", isLoggedIn , isOwner, 
wrapAsync(async(req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
}));

module.exports = router;