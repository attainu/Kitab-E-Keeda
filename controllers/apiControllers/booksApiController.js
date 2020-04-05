const Books = require('../../models/books')
const User = require('../../models/users') 
const Review = require('../../models/reviews')

module.exports = {
    async postGenre(req, res) {
        try{
            let { genre1, genre2, genre3, genre4, genre5 } = req.headers
            let genres = [ genre1, genre2, genre3, genre4, genre5 ]
            const userId = req.params.userId
            var favGenreData = []
    
            genres.forEach(el => {
                if (el !== undefined) {
                    //finding the user and updating it's genres property
                    User.findByIdAndUpdate(userId, { $push : {genres : el} }, (err, resp) => {
                        if (err) console.log(err.message)
                        console.log(resp)
                    })
                    //finding the user choosen data in books db and saving it in user db.
                    Books.find({ "volumeInfo.categories": el }, (err, resp)=>{
                        if(err) console.log(err)
                        else if (!resp) console.log("not found")
                        favGenreData.push(resp)
                    })
                }
            })
            setTimeout(() => {
                res.json(favGenreData)
            }, 5000);        
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
            const userId = req.params.userId
            const bookId = req.params.bookId
            const newReview = new Review({
                rating : rating,
                review : review,
                userId : userId,
                bookId : bookId
            })
            await newReview.save()
            Books.findOneAndUpdate({ _id : bookId }, { $push : { reviews : newReview._id }}).exec((err, resp)=>{
                if(err) return res.send(err)
                res.json(resp)
            })
        }catch(err){
            console.log(err);
            res.send(err)
        }
    }
}