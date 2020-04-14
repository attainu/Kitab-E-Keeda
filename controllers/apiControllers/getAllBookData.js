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

    async sortByGenres(req, res) { 
       try{
           const { userId } = req.params
            let genres =[]
            let bookList = []
            const foundGenres = await Genres.findAll({ where : {userId}})
            genres.push(foundGenres)
            setTimeout(()=>{
                genres.forEach(genre => {
                    Books.findAll({where : { categories : genre }}).exec((err, foundBook)=>{
                        if(err) console.log(err)
                        bookList.push(foundBook)
                    })
                })
                setTimeout(()=>{
                    res.send(bookList)
                }, 2000)            
            }, 3000)
       }catch(err){
           console.log(err)
       }
    },

    async sortByAuthors(req, res) { 
        try{
            const { userId } = req.params
             let authors =[]
             let bookList = []
             const foundAuthors = await FavAuthors.findAll({ where : {userId}})
             genres.push(foundAuthors)
             setTimeout(()=>{
                 authors.forEach(author => {
                    Books.findAll({where : { authors : author }}).exec((err, foundBook)=>{
                        if(err) console.log(err)
                        bookList.push(foundBook)
                    })
                 })
                 setTimeout(()=>{
                     res.send(bookList)
                 }, 2000)            
             }, 3000)
        }catch(err){
            console.log(err)
        }
    },

    async sortByBooksRead(req, res) {
        try{
            const { userId } = req.params
             let booksRead =[]
             let bookList = []
             const foundBooksRead = await BooksRead.findAll({ where : {userId}})
             booksRead.push(foundBooksRead)
             setTimeout(()=>{
                booksRead.forEach(book => {
                    Books.findAll({where : { title : book }}).exec((err, foundBook)=>{
                        if(err) console.log(err)
                        bookList.push(foundBook)
                    })
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