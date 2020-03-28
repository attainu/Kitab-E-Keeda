const Books = require('../../models/books')
const fetch = require('node-fetch')
const url = 'https://www.googleapis.com/books/v1/volumes?q'

module.exports = {
    async postGenre(req, res){
        try{
            const book = await fetch(`${url}=flowers`)
            const books = await book.json()
            res.json(books)        
        }catch(err){
            res.json(err)
        }
        
    }

    // async postFavAuthor(req, res){

    // },

    // async postReadBooks(req, res){

    // }
}