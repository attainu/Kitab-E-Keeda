const Books = require('../../models/books')
const User = require('../../models/Users')

module.exports = {
    async getAllBooks(req, res) {
        let page = req.query.page
        Books.find({}, {
            _id: 1,
            "volumeInfo.title": 1,
            "volumeInfo.authors": 1,
            "volumeInfo.categories": 1,
            "volumeInfo.imageLinks.smallThumbnail": 1,
            "volumeInfo.publishedDate": 1,
            "saleInfo.listPrice.amount": 1
        }).skip((page - 1) * 10).limit(10).exec((err, data) => {
            if (err) {
                console.log(err)
            }
            res.json(data)
        })
    },

    async sortByGenres(req, res) { 
        var myGenre = []
        const { userId } = req.params;
        User.find({ _id: userId}).exec((err, data) => {
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
                    Books.find({ "volumeInfo.categories": ele }, {
                        _id: 1,
                        "volumeInfo.title": 1,
                        "volumeInfo.categories": 1,
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
        const userID = req.params.userId;
        var myAuthor = []
        User.find({ _id: userID }, { _id: 0,favAuthors: 1 }).exec((err, data) => {
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
                    Books.find({ "volumeInfo.authors": ele }, {
                        _id: 1,
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
        const userID = req.params.userId;
        var myTitle = []
        User.find({_id: userID}, {_id: 0,favBooks: 1}).exec((err, data) => {
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
                    Books.find({
                        "volumeInfo.title": ele }, {
                        _id: 1,
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