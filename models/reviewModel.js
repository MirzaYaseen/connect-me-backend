const mongoose = require('mongoose');
const Product = require('./productModel');
const reviewScehma = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, 'Please enter a review'],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    refOfProduct: {
      type: mongoose.Schema.ObjectId,
      ref: 'Product',
      required: [true, 'Review must belong to a Product'],
    },
    refOfUser: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Review must belong to a User'],
    },
  },
  {
    toJSON: { virtuals: true }, 
    toObject: { virtuals: true },
  }
);

reviewScehma.index({ refOfProduct: 1, refOfUser: 1 }, { unique: true });

reviewScehma.pre(/^find/, function (next) {

  this.populate({
    path: 'refOfUser',
    select: 'name photo',
  });

  next();
});

reviewScehma.statics.calcAverageRatings = async function (refOfProductId) {
  const stats = await this.aggregate([
  
    {
      $match: { refOfProduct: refOfProductId }, 
    },
    {
      $group: {
        _id: 'refOfProduct',
        nRating: { $sum: 1 }, 
        avgRating: { $avg: '$rating' }, 
      },
    },
  ]);

  if (stats.length > 0) {
    await Product.findByIdAndUpdate(refOfProductId, {
      ratingQuantity: stats[0].nRating,
      ratingsAverage: stats[0].avgRating,
    });
  } else {
    await Product.findByIdAndUpdate(refOfProductId, {
      ratingQuantity: 0,
      ratingsAverage: 4.5,
    });
  }
};


reviewScehma.post('save', function () {

  this.constructor.calcAverageRatings(this.refOfProduct);
});


reviewScehma.pre(/^findOneAnd/, async function (next) {
  this.r = await this.findOne(); 
  next();
});

reviewScehma.post(/^findOneAnd/, async function () {
  await this.r.constructor.calcAverageRatings(this.r.refOfProduct);
});

const review = mongoose.model('Review', reviewScehma);
module.exports = review;
