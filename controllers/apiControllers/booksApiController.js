const User = require('../../models/users')
const allbooks = require('../../models/allBooks')
const Genres = require('../../models/users')
const FavBooks = require('../../models/users')

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
            genre: [genre1, genre2, genre3, genre4, genre5 ]
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
        // console.log(req.headers)
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




}