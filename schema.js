// "joi" yek tool(npm package) hai jo hamare schema ko validate karta hai.
// "joi" ki help se hum schema define karte hai, aur ye jo schema hota hai ye hamare mongoose ka schema nahi hota, ye hamare server-side validation ke liye schema hota hai.

const Joi = require('joi'); 

module.exports.listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        location: Joi.string().required(),
        country: Joi.string().required(),
        price: Joi.number().required().min(0), 
        image: Joi.string().allow("", null)
    }).required()
});

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        comment: Joi.string().required()
    }).required()
})