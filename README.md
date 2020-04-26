# Kitab-E-Keeda documentation

## link to the mongoose heroku deployed app

    https://kitabekeeda.herokuapp.com



## github repo link for the primary database 

    https://github.com/attainu/Kitab-E-Keeda/tree/feature-Amit

## github repo link for the secondary database

     https://github.com/attainu/Kitab-E-Keeda/tree/feature-manasPostgres



<!-- elephant sql id password will be given at the time of the evaluation -->

## USER ROUTES

### POST routes

1. '/signUp'
     pass name, email, password in body 

2. '/verify/:userId'
    an otp must have been sent to the registered mail verify that to proceed further

3. /signIn'
    pass email and password in in body. make sure password value must be passed with quotes 

4. '/addProfile/:userId'
    pass uploadImage, DOB, address, gender as key names and make sure to pass DOB as number  

5. '/follow/:follower/:following'
        here the follower and following both has to be user id but the follower id has to logged in for it to work

### GET route

1. '/searchUser/:userId'

### DELETE route

1. '/signOff/:userId'

## BOOKS ROUTES

### POST routes

1. '/books/genre/:userId'
    pass genre names in headers as key name genre1, genre2 upto genre5.
    try to find genre name from books database categories property

2. '/books/favAuthor/:userId'
        pass favAuthor names in headers as key name author1, author2 upto author5.
         try to find author name from books database categories property

3. '/books/readBooks/:userId'
        pass BooksRead names in headers as key name title1, title2 upto title5.
         try to find title from books database categories property

4. '/books/addReview/:userId/:bookId'
        pass reviews and rating in headers as review and rating as key name rating should <= 5.

### GET routes

1. '/books/getAllBooks'
    
2. '/books/sortByGenres/:userId'
        this userId has to sign in as well as
         must have added above genres to see the sorted genre related books

3. '/books/sortByAuthors/:userId'
        this userId has to sign in as well as
         must have added above authors to see the sorted genre related books

4. '/books/sortByBooksRead/:userId'
        this userId has to sign in as well as
         must have added above booksRead to see the sorted genre related books

5. '/search/:bookId'

### PUT routes

1. '/updateReview/:userId/:reviewId'
        this user has to sign in 
        as well as must have added a review to update

### DELETE routes

1. '/deleteReview/:userId/:reviewId'
        this user has to sign in as well as must have added a review to delete

## POSTS ROUTES

### POST routes

1. '/addPosts/:userId'
        pass postBody as key name in body json data to add post  

2. '/addComments/:userId/:postId'
        pass commentBody as key name in body json to add comment 
3. '/addLikes/:userId/:postId'
        pass like as key name in headers and pass true or false for like or dislike

4. '/addThreads/:userId/:commentId'
        pass threadBody in headers as key name

### GET routes

1. '/getposts/:userId'
        for this to work the user has to follow the user whose posts he wants to see
        and the followed user must have to add some posts to show it's follower

2. '/searchPost/:postId'


### PUT routes

1. '/updatePosts/:userId/:postId'
        pass post as key name in headers to get this route working

2. '/updateComments/:userId/:commentId'
        pass comment as key name in headers to update the comment

3. '/updateThreads/:userId/:threadId'
        pass thread as key name in headers to update the threads

### DELETE routes

1. '/deletePosts/:userId/:postId'
2. '/deleteComments/:userId/:commentId'
3. '/deleteThreads/:userId/:threadId'



# PostgreSql all routes and writeups

## link to the PostgreSql heroku deployed app
    https://kitab-e-keeda-v2.herokuapp.com/ 


## All .env file and Authentication Details


## 	
### POST routes

1. '/signUp'
     pass name, email, password in body 

2. '/verify/:userId'
    an otp must have been sent to the registered mail verify that to proceed further

3. /signIn'
    pass email and password in in body. make sure password value must be passed with quotes 

4. '/addProfile/:userId'
    pass uploadImage, DOB, address, gender as key names and make sure to pass DOB as number 



### GET route

1. '/searchUser/:userId'

### DELETE route

1. '/signOff/:userId'

## BOOKS ROUTES

### POST routes

1. '/books/genre/:userId'
    pass genre names in headers as key name genre1, genre2 upto genre5.
    try to find genre name from books database categories property

2. '/books/favAuthor/:userId'
        pass favAuthor names in headers as key name author1, author2 upto author5.
         try to find author name from books database categories property

3. '/books/readBooks/:userId'
        pass BooksRead names in headers as key name title1, title2 upto title5.
         try to find title from books database categories property

4. '/books/addReview/:userId/:bookId'
        pass reviews and rating in headers as review and rating as key name rating should <= 5.

### GET routes

1. '/books/getAllBooks'
    
2. '/books/sortByGenres/:userId'
        this userId has to sign in as well as
         must have added above genres to see the sorted genre related books

3. '/books/sortByAuthors/:userId'
        this userId has to sign in as well as
         must have added above authors to see the sorted genre related books

4. '/books/sortByBooksRead/:userId'
        this userId has to sign in as well as
         must have added above booksRead to see the sorted genre related books

5. '/search/:bookId'

### PUT routes

1. '/updateReview/:userId/:reviewId'
        this user has to sign in 
        as well as must have added a review to update

### DELETE routes

1. '/deleteReview/:userId/:reviewId'
        this user has to sign in as well as must have added a review to delete

## POSTS ROUTES

### POST routes

1. '/addPosts/:userId'
        pass postBody as key name in body json data to add post  

2. '/addComments/:userId/:postId'
        pass commentBody as key name in body json to add comment 
3. '/addLikes/:userId/:postId'
        pass like as key name in headers and pass true or false for like or dislike

4. '/addThreads/:userId/:commentId'
        pass threadBody in headers as key name

### GET routes

1. '/getposts/:userId'
        for this to work the user has to follow the user whose posts he wants to see
        and the followed user must have to add some posts to show it's follower

2. '/searchPost/:postId'


### PUT routes

1. '/updatePosts/:userId/:postId'
        pass post as key name in headers to get this route working

2. '/updateComments/:userId/:commentId'
        pass comment as key name in headers to update the comment

3. '/updateThreads/:userId/:threadId'
        pass thread as key name in headers to update the threads

### DELETE routes

1. '/deletePosts/:userId/:postId'
2. '/deleteComments/:userId/:commentId'
3. '/deleteThreads/:userId/:threadId'

Project done by Manas and Amit Pallauri
