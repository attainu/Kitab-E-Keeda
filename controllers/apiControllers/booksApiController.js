const User = require('../../models/users')
const allbooks = require('../../models/allBooks')
const Review = require('../../models/reviews')
var dotenv = require("dotenv")
dotenv.config();



module.exports = {


    postFavAuthor: function (req, res) { //call back function for all favourite authores wise search
        var author = []
        let {
            author1,
            author2,
            author3,
            author4,
            author5
        } = req.headers

        // console.log(req.headers)
        author.push(author1, author2, author3, author4, author5)

        const userId = req.params.userId
        console.log(req.params.userId)

        User.findByIdAndUpdate(userId, {
            favAuthors: [author1, author2, author3, author4, author5]
        }, function (err, resp) {
            if (err) console.log(err.message)
            console.log(resp)
        })

        // console.log(Allauthor)
        var favAuthorData = []

        author.forEach(el => {
            if (el !== undefined) {
                allbooks.find({
                        "volumeInfo.authors": el
                    }).exec()

                    .then(data => {
                        if (!data) console.log("not found")
                        favAuthorData.push(data)
                        // console.log(data)
                    }).catch(err => console.log(err))
            }
        })
        setTimeout(() => {
            res.json(favAuthorData)
        }, 5000);

    },




    postGenre: function (req, res) { //call back function for all favourite authores wise search

        var genre = []
        let {
            genre1,
            genre2,
            genre3,
            genre4,
            genre5
        } = req.headers

        // console.log(req.headers)
        genre.push(genre1, genre2, genre3, genre4, genre5)
        const userId = req.params.userId
        console.log(req.params.userId)

        User.findByIdAndUpdate(userId, {
            genres: [genre1, genre2, genre3, genre4, genre5]
        }, function (err, resp) {
            if (err) console.log(err.message)
            console.log(resp)
        })
        var favGenreData = []

        genre.forEach(el => {
            if (el !== undefined) {
                allbooks.find({
                        "volumeInfo.categories": el
                    }).exec()

                    .then(data => {
                        if (!data) console.log("not found")
                        favGenreData.push(data)
                        console.log(data)
                    }).catch(err => console.log(err))
            }
        })
        setTimeout(() => {
            res.json(favGenreData)
        }, 5000);

    },





    postFavBooks: function (req, res) { //call back function for all favourite authores wise search

        var title = []
        let {
            title1,
            title2,
            title3,
            title4,
            title5
        } = req.headers
         console.log(req.headers)
        title.push(title1, title2, title3, title4, title5)
        const userId = req.params.userId
        console.log(req.params.userId)

        User.findByIdAndUpdate(userId, {
            favBooks: [title1, title2, title3, title4, title5]
        }, function (err, resp) {
            if (err) console.log(err.message)
            console.log(resp)
        })
        var favTitleData = []

        title.forEach(el => {
            if (el !== undefined) {
                allbooks.find({
                        "volumeInfo.title": el
                    }).exec()

                    .then(data => {
                        if (!data) console.log("not found")
                        favTitleData.push(data)
                        console.log(data)
                    }).catch(err => console.log(err))
            }
        })
        setTimeout(() => {
            res.json(favTitleData)
        }, 5000);

    },





    getFavAuthors: function (req, res) { //call back function for all favourite authores wise search}
        const userID = req.params.userID;
        var myAuthor = []
        User.find({
            _id: userID
        }, {
            _id: 0,
            favAuthors: 1
        }).exec((err, data) => {
            if (err) console.log(err)
            console.log(data)
            data[0].favAuthors.forEach(el => {
                myAuthor.push(el)
                console.log(el)
            })
        })
        setTimeout(() => {
            var favAuthorData = []

            myAuthor.forEach(ele => {
                allbooks.find({
                    "volumeInfo.authors": ele
                }, {
                    _id: 0,
                    "volumeInfo.title": 1,
                    "volumeInfo.authors": 1,
                    "volumeInfo.imageLinks.smallThumbnail": 1,
                    "volumeInfo.publishedDate": 1,
                    "saleInfo.listPrice.amount": 1
                }).then(doc => favAuthorData.push(doc)).catch(err => console.log(err))
            })
            // res.json(favAuthorData)
            setTimeout(() => {
                res.send(favAuthorData)

            }, 2000)
        }, 3000);
    },






    getallGenres: function (req, res) { //call back function for all favourite authores wise search}

        var myGenre = []
        const userID = req.params.userID;
        User.find({
            _id: userID
        }, {
            _id: 0,
            genres: 1
        }).exec((err, data) => {
            if (err) console.log(err)
            console.log(data)
            data[0].genres.forEach(el => {
                myGenre.push(el)
                console.log(el)
            })
        })
        setTimeout(() => {
            var favGenreData = []

            myGenre.forEach(ele => {
                allbooks.find({
                    "volumeInfo.categories": ele
                }, {
                    _id: 0,
                    "volumeInfo.title": 1,
                    "volumeInfo.authors": 1,
                    "volumeInfo.imageLinks.smallThumbnail": 1,
                    "volumeInfo.publishedDate": 1,
                    "saleInfo.listPrice.amount": 1
                }).then(doc => favGenreData.push(doc)).catch(err => console.log(err))
            })
            // res.json(favAuthorData)
            setTimeout(() => {
                res.send(favGenreData)

            }, 5000)
        }, 3000);
    },







    getFavBooks: function (req, res) { //call back function for all favourite authores wise search}
        const userID = req.params.userID;
        var myTitle = []
        User.find({
            _id: userID
        }, {
            _id: 0,
            favBooks: 1
        }).exec((err, data) => {
            if (err) console.log(err)
            console.log(data)
            data[0].favBooks.forEach(el => {
                myTitle.push(el)
                console.log(el)
            })
        })
        setTimeout(() => {
            var favBookData = []

            myTitle.forEach(ele => {
                allbooks.find({
                    "volumeInfo.title": ele
                }, {
                    _id: 0,
                    "volumeInfo.title": 1,
                    "volumeInfo.authors": 1,
                    "volumeInfo.imageLinks.smallThumbnail": 1,
                    "volumeInfo.publishedDate": 1,
                    "saleInfo.listPrice.amount": 1
                }).then(doc => favBookData.push(doc)).catch(err => console.log(err))
            })
            // res.json(favAuthorData)
            setTimeout(() => {
                res.send(favBookData)

            }, 2000)
        }, 3000);
    },






    getAllBooks: function (req, res) { //call back function for books  render on home page }
    
    //Pagination per page 10 books limited or
    
        let page = req.query.page
        
                allbooks.find({}, {
                _id: 0,
                "volumeInfo.title": 1,
                "volumeInfo.authors": 1,
                "volumeInfo.imageLinks.smallThumbnail": 1,
                "volumeInfo.publishedDate": 1,
                "saleInfo.listPrice.amount": 1
            }).skip((page-1)*10).limit(10).exec((err, data) => {
                if (err) {
                    console.log(err)
                }
    
                res.send(data)
    
            })
      
        
    },




    async getSearchedBook(req, res){
        try{
            const bookId = req.params.bookId
            allbooks.find({ _id : bookId } ,{ _id: 0,
                "volumeInfo.title": 1,
                "volumeInfo.authors": 1,
                "volumeInfo.imageLinks.smallThumbnail": 1,
                "volumeInfo.publishedDate": 1,
                 "volumeInfo.description" : 1 ,
                "saleInfo.listPrice.amount": 1 ,
                 "saleInfo.buyLink": 1,
                    }).exec((err, resp)=>{
                if(err) return res.send(err)
                res.send(resp)
            })
        }catch(err){
            console.log(err)
        }
    },




    async addReviews(req, res){
        try{
            const { rating, review } = req.headers
            const userId = req.params.userId
            const bookId = req.params.bookId
            const newReview = new Review({ rating, review, userId, bookId })
            const Rating = parseInt(rating)
          

            //updating the sum of rratings in the books database/
            if( typeof(Rating) === 'number' && Rating <= 5 ){
                allbooks.findOneAndUpdate({ _id : bookId }, { $inc : { ratingCount : 1 }}).exec((err, resp)=>{
                    if(err) console.log(err)
                    let count = resp.ratingCount
                    let sum = 0
                    let avgRating = 0
                    sum += Rating
                    avgRating = sum/count
                    finalRating = avgRating.toFixed(2)
                    allbooks.findOneAndUpdate({ _id : bookId }, { ratingAvg : finalRating}).exec((err, _) => {if(err) console.log(err)})
                })
                allbooks.findOneAndUpdate({ _id : bookId }, { $push : { reviews : newReview._id }}).exec((err, resp)=>{
                    if(err) return res.send(err)
                })
                await newReview.save()
                res.send(newReview)
            }else res.send('wrong format of rating')

        }catch(err){
            console.log(err)
        }
    },
    

}