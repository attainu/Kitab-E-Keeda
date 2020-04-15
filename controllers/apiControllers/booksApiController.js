const Books = require('../../models/books')
const Review = require('../../models/reviews')
const Genre = require('../../models/genres')
const FavAuthor = require('../../models/favAuthros')
const BooksRead = require('../../models/booksRead')

module.exports = {
     postGenre : (req, res) => {
        let { genre1, genre2, genre3, genre4, genre5 } = req.headers
        let genres = [ genre1, genre2, genre3, genre4, genre5 ]
        const userId = req.params.userId
        genres.forEach(genre => {
            if (genre !== undefined) {
                Books.findAll({ where: { categories : genre }})
                .then(_ => {
                    return Genre.create({ genre, userId })
                })
                .then( doc => console.log(doc))
                .catch( err => console.log(err))
            }
        })  
        res.send("genres added successfully")    
    },

    postFavAuthor : (req, res) => { 
        let { author1, author2, author3, author4, author5 } = req.headers
        let authors = [author1, author2, author3, author4, author5]
        const userId = req.params.userId
        authors.forEach(author => {
            if (author !== undefined) {
                Books.findAll({ where: { authors : author }})
                .then( _ => {
                    return FavAuthor.create({ author, user: userId })
                })
                .then(doc => console.log(doc))
                .catch(err => console.log(err))
            }
        })
        res.send("authors added successfully")    
    },

    postBooksRead: (req, res) => {
        let { title1, title2, title3, title4, title5 } = req.headers
        let titles = [title1, title2, title3, title4, title5]
        const userId = req.params.userId
        titles.forEach(title => {
            if (title !== undefined) {
                Books.findAll({ where: { title }})
                .then(_ => {
                    return BooksRead.create({ title, user : userId })
                })
                .then( doc => console.log(doc))
                .catch(err => console.log(err.message))
            }
        })
        res.send("booksRead added successfully")    
    },

    async addReviews(req, res){
        try{
            const { rating, review } = req.headers
            const { userId, bookId } = req.params
            const Rating = parseInt(rating)
            if( typeof(Rating) === 'number' && Rating <= 5 ){
                const newReview = await Review.create({ rating, review, userId, bookId })
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
            const foundReview = await Review.Update( { rating, review }, { where: { _id : reviewId, userId }} )
            if(!foundReview) return res.send("invalid credentials")
            res.send(foundReview)
        } catch (err) {
            console.log(err)
        }
    },

    async deleteReview(req, res){
        try{
            const { reviewId, userId } = req.params
            const foundReview = await Review.destroy({ where: { _id : reviewId, userId }})
            if(!foundReview) return res.status(400).send("invalid credentials")
            else return res.json({ msg : "deleted successfully ", status : 200 })
        }catch(err){
            console.log(err)
        }
    }
}