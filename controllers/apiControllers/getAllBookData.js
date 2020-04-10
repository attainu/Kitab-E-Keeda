const Books = require('../../models/books')
const User = require('../../models/users')

module.exports = {
    async getAllBooks(req, res) {
        let page = req.query.page
        Books.find({}, {
            _id: 0,
            "volumeInfo.title": 1,
            "volumeInfo.authors": 1,
            "volumeInfo.imageLinks.smallThumbnail": 1,
            "volumeInfo.publishedDate": 1,
            "saleInfo.listPrice.amount": 1
        }).skip((page - 1) * 10).limit(10).exec((err, data) => {
            if (err) {
                console.log(err)
            }
            res.send(data)
        })
    },

    async sortByGenres(req, res) { 
        var myGenre = []
        const userID = req.params.userID;
        User.find({ _id: userID}, { _id: 0, genre: 1} ).exec((err, data) => {
            if (err) console.log(err)
            console.log(data)
            if( data = [] ) return res.send("no genres chosen")
            else 
                data[0].genre.forEach(el => {
                myGenre.push(el)
                console.log(el)
            })
        })
        if(myGenre = []) console.log("no genres")
        else 
            setTimeout(() => {
                var favGenreData = []
                myGenre.forEach(ele => {
                    Books.find({ "volumeInfo.categories": ele }, {
                        _id: 0,
                        "volumeInfo.title": 1,
                        "volumeInfo.authors": 1,
                        "volumeInfo.imageLinks.smallThumbnail": 1,
                        "volumeInfo.publishedDate": 1,
                        "saleInfo.listPrice.amount": 1
                    }).then(doc => favGenreData.push(doc)).catch(err => console.log(err))
                })
                setTimeout(() => {
                    res.send(favGenreData)
                }, 2000)
            }, 3000);
    },

    async sortByAuthors(req, res) { 
        const userID = req.params.userID;
        var myAuthor = []
        User.find({ _id: userID }, { _id: 0,favAuthors: 1 }).exec((err, data) => {
            if (err) console.log(err)
            console.log(data)
            if( data = [] ) return res.send("no Authors chosen")
            else 
                data[0].favAuthors.forEach(el => {
                myAuthor.push(el)
                console.log(el)
            })
        })
        if( myAuthor = []) console.log("no authors added")
        else 
            setTimeout(() => {
                var favAuthorData = []
                myAuthor.forEach(ele => {
                    Books.find({ "volumeInfo.authors": ele }, {
                        _id: 0,
                        "volumeInfo.title": 1,
                        "volumeInfo.authors": 1,
                        "volumeInfo.imageLinks.smallThumbnail": 1,
                        "volumeInfo.publishedDate": 1,
                        "saleInfo.listPrice.amount": 1
                    }).then(doc => favAuthorData.push(doc)).catch(err => console.log(err))
                })
                setTimeout(() => {
                    res.send(favAuthorData)
                }, 2000)
            }, 3000);
    },

    async sortByBooksRead(req, res) {
        const userID = req.params.userID;
        var myTitle = []
        User.find({_id: userID}, {_id: 0,favBooks: 1}).exec((err, data) => {
            if (err) console.log(err)
            console.log(data)
            if( data = [] ) return res.send("no booksRead chosen")
            else 
                data[0].favBooks.forEach(el => {
                myTitle.push(el)
                console.log(el)
            })
        })
        if(myTitle = []) console.log("no BooksRead added")
        else 
            setTimeout(() => {
                var favBookData = []
                myTitle.forEach(ele => {
                    Books.find({
                        "volumeInfo.title": ele }, {
                        _id: 0,
                        "volumeInfo.title": 1,
                        "volumeInfo.authors": 1,
                        "volumeInfo.imageLinks.smallThumbnail": 1,
                        "volumeInfo.publishedDate": 1,
                        "saleInfo.listPrice.amount": 1
                    }).then(doc => favBookData.push(doc)).catch(err => console.log(err))
                })
                setTimeout(() => {
                    res.send(favBookData)
                }, 2000)
            }, 3000);
    },

    async getSearchedBook(req, res){
        try{
            const bookId = req.params.bookId
            Books.find({ _id : bookId }).exec((err, resp)=>{
                if(err) return res.send(err)
                res.send(resp)
            })
        }catch(err){
            console.log(err)
        }
    }

}