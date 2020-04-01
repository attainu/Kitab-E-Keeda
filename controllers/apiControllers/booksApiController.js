const BooksRead = require('../../models/booksread')
const Authors = require('../../models/authors')
const allbooks = require('../../models/allBooks')
const fetch = require('node-fetch')
var dotenv = require("dotenv")
dotenv.config();

const url = 'https://www.googleapis.com/books/v1/volumes?q=subject:'

const {
    Book_Api_Key 
} = process.env
module.exports = {
     
    postGenre: function (req, res) {
        let genre = []
        let books = []
        let {
            genre1,
            genre2,
            genre3,
            genre4,
            genre5
        } = req.headers

        console.log(req.headers)
        genre.push(genre1, genre2, genre3, genre4, genre5)
        let Allgenre = new Genre({
            ...genre
        })
        Allgenre.save()
        // console.log(genre)
        genre.forEach(el => {
            if (el !== undefined) {
                // console.log(el)
                fetch(`${url}${el}&startIndex=0&maxResults=10&key=${Book_Api_Key}`).then(response => {
                    return response.json()
                }).then(bookDatas => {
                    books.push(bookDatas)
                    // console.log(books)
                    // -------------- here the books array is printing with the required data
                }).catch(err => console.log(err))
            }
        })    
        setTimeout(() => {
            res.json(books)
        }, 5000);
        // console.log(books) //---------------- here the books is printing an empty array     
        //    res.send ("inside")

    },

    postFavAuthor: function (req, res) { //call back function for all favourite authores wise search

        let author = []
        let books = []
        let {
            author1,
            author2,
            author3,
            author4,
            author5
        } = req.headers

        // console.log(req.headers)
        author.push(author1, author2, author3, author4, author5)

        let Allauthor = new Authors({
            ...author
        })
        Allauthor.save()
        // console.log(author)
        author.forEach(el => {
            if (el !== undefined) {
                // allbooks.find({ volumeInfo : { authors: { $in : { $each : [el] }}}}).exec()
                allbooks.find({ volumesInfo : { authors : "Matt Neuburg" }}) 
                .then(data => {
                    if(!data) console.log("not found") 
                    console.log(data)
                    // data.forEach(doc => {
                    //     console.log(doc)
                    // })
                }).catch(err => console.log(err))
            }
        })
        setTimeout(() => {
            res.json(books)
        }, 5000);

    },
    postReadBooks: function(req,res){
        
       allbooks.find({}).exec().then((data)=>{  
    res.json({data : data})
})

    }
    
    
    // function (req, res) { //call back function for all favourite authores wise search
      
//         let title = []
//         let books = []
//         let {
//             title1,
//             title2,
//             title3,
//             title4,
//             title5
//         } = req.headers
//         console.log(req.headers)
//         title.push(title1, title2, title3, title4, title5)
//         let Alltitle = new BooksRead(
//             title1,
//             title2,
//             title3,
//             title4,
//             title5
//         )
//         Alltitle.save()
//         // console.log(author)
//         title.forEach(el => {
//             if (el !== undefined) {
//                 // console.log(el)
//                 fetch(`https://www.googleapis.com/books/v1/volumes?q=${el}&startIndex=0&maxResults=10&key=${Book_Api_Key}`).then(response => {
//                     return response.json()
//                 }).then(bookDatas => {
//                     books.push(bookDatas)
//                     // console.log(books)
//                     // -------------- here the books array is printing with the required data
//                 }).catch(err => console.log(err))
//             }
//         })
//         setTimeout(() => {
//             res.json(books)
//         }, 5000);

//    },



}

//Basically when using mongoose, documents can be retrieved using helpers. Every model method that accepts query conditions can be executed by means of a callback or the exec method.

// callback:

// User.findOne({ name: 'daniel' }, function (err, user) {
//   //
// });
// exec:

// User
//   .findOne({ name: 'daniel' })
//   .exec(function (err, user) {
//       //
//   });
// Therefore when you don't pass a callback you can build a query and eventually execute it



















// const Books = require('../../models/books')
// const fetch = require('node-fetch')
// const url = 'https://www.googleapis.com/books/v1/volumes?q=subject:'


// module.exports = {
//     async postGenre(req, res) {
//         try {

//             var data = [];

//             const book = await fetch(`${url}computers&startIndex=0&maxResults=40`)
//             const books = await book.json()
//             data.push(books)
//             const page = req.query.page
//             const limit = req.query.limit
//             const startindex = (page - 1) * limit;
//             const endindex = page * limit;
//             resultbooks = data.slice(startindex, endindex)
//             res.json(resultbooks)
//         } catch (err) {
//             res.json(err)
//         }

//     }

//     // async postFavAuthor(req, res){

//     // },

//     // async postReadBooks(req, res){

//     // }
// }