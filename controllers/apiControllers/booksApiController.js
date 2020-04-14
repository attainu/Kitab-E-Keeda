const Books = require('../../models/books')
const User = require('../../models/users') 
const Review = require('../../models/reviews')
const Genre = require('../../models/genres')

module.exports = {
    async postGenre(req, res) {
        try{
            let { genre1, genre2, genre3, genre4, genre5 } = req.headers
            let genres = [ genre1, genre2, genre3, genre4, genre5 ]
            const userId = req.params.userId
            var favGenreData = []
            genres.forEach(genre => {
                if (el !== undefined) {
                    Books.findAll({ where: { genre }}).exec((err, resp)=>{
                        if(err) console.log(err)
                        
                    })
                    Genre.create({ genre, userId }).exec((err, resp)=>{
                        if(err) console.log(err.message)
                        console.log(resp)
                        res.send("genres added successfully")
                    })
            //         finding the user and updating it's genres property
            //         User.findByIdAndUpdate(userId, { $push : {genres : el} }, (err, resp) => {
            //             if (err) console.log(err.message)
            //             console.log(resp)
            //         })
            //         //finding the user choosen data in books db and saving it in user db.
            //         Books.find({ "volumeInfo.categories": el }, (err, resp)=>{
            //             if(err) console.log(err)
            //             else if (!resp) console.log("not found")
            //             favGenreData.push(resp)
            //         })
                }
            })
            // setTimeout(() => {
            //     res.send(favGenreData)
            // }, 5000);        
        }catch(err){ console.log(err) }
    },

    async postFavAuthor(req, res) { 
        try{
            let { author1, author2, author3, author4, author5 } = req.headers
            let authors = [author1, author2, author3, author4, author5]
            const userId = req.params.userId
            var favAuthorData = []
            authors.forEach(el => {
                if (el !== undefined) {
                    //finding the user and updating it's favAuthors property
                    User.findByIdAndUpdate(userId, {$push : { favAuthors : el }}, (err, doc) => {
                        if (err) console.log(err.message)
                        console.log(doc)
                    })
                    //finding the user choosen data in books db and saving it in user db.
                    Books.find({"volumeInfo.authors": el}, (err, resp)=>{
                        if(err) console.log(err)
                        else if (!resp) console.log("not found")
                        favAuthorData.push(resp)
                    })
                }
            })
            setTimeout(() => {
                res.json(favAuthorData)
            }, 5000);        
        }catch(err){ console.log(err) }
    },

    async postBooksRead(req, res) {
        try{
            let { title1, title2, title3, title4, title5 } = req.headers
            let title = [title1, title2, title3, title4, title5]
            const userId = req.params.userId
            var favTitleData = []
            title.forEach(el => {
                if (el !== undefined) {
                    //finding the user and updating it's titles property
                    User.findByIdAndUpdate(userId, { $push : { booksRead : el } }, (err, resp) => {
                        if (err) console.log(err.message)
                        console.log(resp)
                    })
                    //finding the user choosen data in books db and saving it in user db.
                    Books.find({ "volumeInfo.title": el },(err, resp )=>{
                        if(err) console.log(err)
                        else if (!resp) console.log("not found")
                        favTitleData.push(resp)           
                    })
                }
            })
            setTimeout(() => {
                res.json(favTitleData)
            }, 5000);        
        }catch(err){ console.log(err) }
    },

    async addReviews(req, res){
        try{
            const { rating, review } = req.headers
            const { userId, bookId } = req.params
            const newReview = new Review({ rating, review, userId, bookId })
            const Rating = parseInt(rating)


            //updating the sum of rratings in the books database/
            if( typeof(Rating) === 'number' && Rating <= 5 ){
                Books.findOneAndUpdate({ _id : bookId }, { $inc : { ratingCount : 1 }}).exec((err, resp)=>{
                    if(err) console.log(err)
                    let count = resp.ratingCount
                    let sum = 0
                    let avgRating = 0
                    sum += Rating
                    avgRating = sum/count
                    finalRating = avgRating.toFixed(2)
                    Books.findOneAndUpdate({ _id : bookId }, { ratingAvg : finalRating}).exec((err, _) => {if(err) console.log(err)})
                })
                Books.findOneAndUpdate({ _id : bookId }, { $push : { reviews : newReview._id }}).exec((err, resp)=>{
                    if(err) return res.send(err)
                })
                await newReview.save()
                res.send(newReview)
            }else res.send('wrong format of rating')

        }catch(err){
            console.log(err)
        }
    },

    async updateReview(req, res){
        try {
            const { reviewId, userId } = req.params
            const { review, rating }= req.headers
            Review.findOneAndUpdate({ _id : reviewId, userId }, { rating, review} ).exec((err, resp)=>{
                if(err) return res.status(400).send("invalid credentials")
                res.send(resp)
            })
        } catch (err) {
            console.log(err)
        }
    },

    async deleteReview(req, res){
        try{
            const { reviewId, userId } = req.params
            Review.findOneAndDelete({ _id : reviewId, userId }).exec((Err, resp)=>{
                if(Err) return res.status(400).send("invalid credentials")
                else if(resp !== null ) return res.json({ msg : "deleted successfully ", status : 200 })
                else return res.send("nothing to delete")
            })
        }catch(err){
            console.log(err)
        }
    }
}