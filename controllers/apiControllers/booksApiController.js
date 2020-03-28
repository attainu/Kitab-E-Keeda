const fetch = require("node-fetch");

const url = "https://www.googleapis.com/books/v1/volumes?q=javascript";

module.exports= {
            async allUserBooks (req,res) {
            try {
                var data = [];
                const response = await fetch(url);
                const read = await response.json()
                //all data that is usable being want to store in an array
                  for (var i=0;i<read.items.length ; i++){
                    console.log(read.items[i].volumeInfo.title)
                    console.log(read.items[0].volumeInfo.categories)
                    console.log(read.items[i].volumeInfo.authors)
                    console.log(read.items[i].volumeInfo.publisher)
                    console.log(read.items[i].volumeInfo.publishedDate)
                    console.log(read.items[i].volumeInfo.description)
                    console.log(read.items[i].volumeInfo.imageLinks.thumbnail)

                }
                
            } catch (error) {
                console.log(error);
            }
        },
    
      


}