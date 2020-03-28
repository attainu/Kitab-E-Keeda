const Books = require('../../models/books')
const fetch = require('node-fetch')

const url = 'https://www.googleapis.com/books/v1/volumes?q'
const apiKey = 'AIzaSyCzzGVsnUvux0EDsxgzkHGBhk1q8Y3HtdI'

// 'https://www.googleapis.com/books/v1/volumes?q=subject:science&startIndex=0&maxResults=40&key=AIzaSyCzzGVsnUvux0EDsxgzkHGBhk1q8Y3HtdI'

module.exports = {
    // async postGenre(req, res){
    //     try{
    //         const genre = []
    //         const books = []
    //         const { genre1, genre2, genre3, genre4, genre5 } = req.headers
    //         genre.push( genre1, genre2, genre3, genre4, genre5 )
    //         genre.forEach( el => {
    //             const bookFetch = await fetch(`${url}=subject:${el}&startIndex=0&maxResults=40&key=${apiKey}`)
    //             const bookDatas = await bookFetch.json()
    //             books.push( bookDatas )
    //         })
    //         res.json(books)        
    //     }catch(err){
    //         res.json(err)
    //     }
    // }
     postGenre :  function(req, res){
        const genre = []
        const books = []
        const { genre1, genre2, genre3, genre4, genre5 } = req.headers
        genre.push( genre1, genre2, genre3, genre4, genre5 )
        genre.forEach( el => {
            if(el !== undefined){
                fetch(`${url}=subject:${el}&startIndex=0&maxResults=10&key=${apiKey}`).then(response => {
                    return response.json()
                }).then(bookDatas =>{
                    books.push( bookDatas )
                    res.json(books)             // -------------- here the books array is printing with the required data
                }).catch(err => console.log(err))   
            }
        })
        console.log(books) //---------------- here the books is printing an empty array     
    }
}