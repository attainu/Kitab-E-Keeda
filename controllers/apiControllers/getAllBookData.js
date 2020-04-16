const Books = require('../../models/books')
const User = require('../../models/Users')
const Genres = require('../../models/genres')
const FavAuthors = require('../../models/favAuthros')
const BooksRead = require('../../models/booksRead')

module.exports = {
    async getAllBooks(req, res) {
        try{
            const foundBooks = await Books.findAll({where : {}})
            res.send(foundBooks)
        }catch(err){
            console.log(err)
        }
        // let page = req.query.page
        // Books.find({}, {
        //     _id: 1,
        //     "volumeInfo.title": 1,
        //     "volumeInfo.authors": 1,
        //     "volumeInfo.categories": 1,
        //     "volumeInfo.imageLinks.smallThumbnail": 1,
        //     "volumeInfo.publishedDate": 1,
        //     "saleInfo.listPrice.amount": 1
        // }).skip((page - 1) * 10).limit(10).exec((err, data) => {
        //     if (err) {
        //         console.log(err)
        //     }
        //     res.json(data)
        // })
    },

    sortByGenres : (req, res) => { 
        const { userId } = req.params
        let genres =[]
        let bookList = []
        Genres.findAll({ where : {userId}})
            .then(foundGenres => {
                if(!foundGenres) res.send("no genres added")
                genres.push(foundGenres)
            })
            .catch(err => {
                console.log(err.message)
                res.status(400).send("server error")
            })
        setTimeout(()=>{
            genres.forEach(genre => {
                Books.findAll({where : { categories : genre }})
                    .then(foundBook => bookList.push(foundBook))
                    .catch( err => console.log(err))
            })
            setTimeout(()=>{
                res.send(bookList)
            }, 2000)            
        }, 3000)    
    },

    sortByAuthors: (req, res) => { 
        const { userId } = req.params
        let authors =[]
        let bookList = []
        FavAuthors.findAll({ where : {user:userId}})
            .then(foundAuthors => {
                if(!foundAuthors) res.send("no authors added")
                authors.push(foundAuthors)
            })
            .catch(err => {
                console.log(err.message)
                res.status(400).send("server error")
            })
        setTimeout(()=>{
            authors.forEach(author => {
               Books.findAll({where : { authors : author }})
               .then(foundAuthor => bookList.push(foundAuthor))
               .catch( err => console.log(err))
            })
            setTimeout(()=>{
                res.send(bookList)
            }, 2000)            
        }, 3000)    
    },

    async sortByBooksRead(req, res) {
        try{
            const { userI } = req.params
             let booksRead =[]
             let bookList = []
             BooksRead.findAll({ where : {user:userId}})
                .then(foundBooks => {
                    if(!foundBooks) res.send("no books added")
                    booksRead.push(foundBooks)
                })
                .catch(err => {
                    console.log(err.message)
                    res.status(400).send("server error")
                })
             setTimeout(()=>{
                booksRead.forEach(book => {
                    Books.findAll({where : { title : book }})
                       .then(foundBook => bookList.push(foundBook))
                       .catch( err => console.log(err))
                 })
                 setTimeout(()=>{
                     res.send(bookList)
                 }, 2000)            
             }, 3000)
        }catch(err){
            console.log(err)
        }
    },

    async getSearchedBook(req, res){
        try{
            const bookId = req.params.bookId
            const book = await Books.findOne({ where : { _id : bookId }})
            if(!book) return res.send("invalid credentials")
            res.send(book)
        }catch(err){
            console.log(err)
        }
    }

}