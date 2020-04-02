const Authors = require('../../models/users')
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
        let Allauthor = new Authors({
            favAuthors: author1,
            favAuthors: author2,
            favAuthors: author3,
            favAuthors: author4,
            favAuthors: author5,
        })
        Allauthor.save()
        console.log(Allauthor)
        var favAuthorData = []

        author.forEach(el => {
            if (el !== undefined) {
                allbooks.find({
                        "volumeInfo.authors": el
                    }).exec()

                    .then(data => {
                        if (!data) console.log("not found")
                        favAuthorData.push(data)
                        console.log(data)
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
        let Allgenre = new Genres({
            favAuthors: genre1,
            favAuthors: genre2,
            favAuthors: genre3,
            favAuthors: genre4,
            favAuthors: genre5,
        })
        Allgenre.save()
        console.log(Allgenre)
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
        let Alltitle = new FavBooks({
            favAuthors: title1,
            favAuthors: title2,
            favAuthors: title3,
            favAuthors: title4,
            favAuthors: title5,
        })
        Alltitle.save()
        console.log(Alltitle)
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