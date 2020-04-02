const reviewModel = require('../../models/booksReview')


module.exports = {
    postBookReview : function (req, res) { //call back function for all favourite authores wise search}
     
var bookid = req.params.bookid
console.log(bookid)
var rev = {}
console.log(rev)
var review = req.body.review;
var rating = req.body.rating;
var username = req.body.username;
rev.user = username;
rev.review = review;
rev.rating = rating;
var reviews = new reviewModel({
    book_id : bookid,
    review:rev
})
reviews.save().then((result)=>{
console.log(result)})
}
}