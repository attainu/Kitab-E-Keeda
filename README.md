# Kitab-E-Keeda documentation

# Complete Working Flow Chart Of RestFull Api of Kitab-E-keeda
![Wire Flow Chart](https://scontent.fpat1-1.fna.fbcdn.net/v/t1.0-9/s960x960/94747461_2924090117700525_4713191652003414016_o.jpg?_nc_cat=101&_nc_sid=8024bb&_nc_oc=AQltTu3kMDWzsf0mxhtoN58Tg72-DrpdBh-YfX8H3sO20KZZTvYxF5g9zHQeeNTelj2c3xZT0FgnEsYTYkorFnpd&_nc_ht=scontent.fpat1-1.fna&_nc_tp=7&oh=8bb89f613fc57ca7842e2a2b91b228ee&oe=5ECB9919 "Flow Chart")

## link to the mongoose heroku deployed app

   [Mongodb Deployed Link](https://kitabekeeda.herokuapp.com "mongodb deployed link")
    

---

## github repo link for the primary database 

   [Here Is the Github Link]( https://github.com/attainu/Kitab-E-Keeda/tree/feature-Amit "Master Branch")
***
## github repo link for the secondary database
 [Here Is the Github Link](https://github.com/attainu/Kitab-E-Keeda/tree/feature-manasPostgres "Feature Manas Branch")

    



<!-- elephant sql id password will be given at the time of the evaluation -->


## E-R Diagram Representation
***
 ![Image](https://scontent.fpat3-1.fna.fbcdn.net/v/t1.0-9/s960x960/94570116_2924074561035414_4798403867580563456_o.jpg?_nc_cat=104&_nc_sid=8024bb&_nc_oc=AQmNMd5geEaBb9vwDTS6Dxpvs5yHGGWcYEQWJa5HpXOitOS7s5XPwcfmZyeu8KfpFLA&_nc_ht=scontent.fpat3-1.fna&_nc_tp=7&oh=a5cd1c18baeb821669b3a031849cea25&oe=5EC8FDD6 "ERD" )

 ***
 

## USER ROUTES
___

### POST routes
___

>1. '/signUp'
     pass name, email, password in body 

     
>2. '/verify/:userId'
    an otp must have been sent to the registered mail verify that to proceed further

>3. /signIn'
    pass email and password in in body. make sure password value must be passed with quotes 

 >4. '/addProfile/:userId'
    pass uploadImage, DOB, address, gender as key names and make sure to pass DOB as number  

>5. '/follow/:follower/:following'
        here the follower and following both has to be user id but the follower id has to logged in for it to work
___
### GET route
***

>1. '/searchUser/:userId'

### DELETE route

>1. '/signOff/:userId'
___

## BOOKS ROUTES
***
### POST routes
___
>1. '/books/genre/:userId'
    pass genre names in headers as key name genre1, genre2 upto genre5.
    try to find genre name from books database categories property

>2. '/books/favAuthor/:userId'
        pass favAuthor names in headers as key name author1, author2 upto author5.
         try to find author name from books database categories property

>3. '/books/readBooks/:userId'
        pass BooksRead names in headers as key name title1, title2 upto title5.
         try to find title from books database categories property

>4. '/books/addReview/:userId/:bookId'
        pass reviews and rating in headers as review and rating as key name rating should <= 5.
___
### GET routes
***
>1. '/books/getAllBooks'
    
>2. '/books/sortByGenres/:userId'
        this userId has to sign in as well as
         must have added above genres to see the sorted genre related books

>3. '/books/sortByAuthors/:userId'
        this userId has to sign in as well as
         must have added above authors to see the sorted genre related books

>4. '/books/sortByBooksRead/:userId'
        this userId has to sign in as well as
         must have added above booksRead to see the sorted genre related books

>5. '/search/:bookId'
___
### PUT routes

>1. '/updateReview/:userId/:reviewId'
        this user has to sign in 
        as well as must have added a review to update

### DELETE routes
***

>1. '/deleteReview/:userId/:reviewId'
        this user has to sign in as well as must have added a review to delete


### POST routes
___
>1. '/addPosts/:userId'
        pass postBody as key name in body json data to add post  

>2. '/addComments/:userId/:postId'
        pass commentBody as key name in body json to add comment 

>3. '/addLikes/:userId/:postId'
        pass like as key name in headers and pass true or false for like or dislike

>4. '/addThreads/:userId/:commentId'
        pass threadBody in headers as key name

### GET routes

>1. '/getposts/:userId'
        for this to work the user has to follow the user whose posts he wants to see
        and the followed user must have to add some posts to show it's follower

>2. '/searchPost/:postId'


### PUT routes

>1. '/updatePosts/:userId/:postId'
        pass post as key name in headers to get this route working

>2. '/updateComments/:userId/:commentId'
        pass comment as key name in headers to update the comment

>3. '/updateThreads/:userId/:threadId'
        pass thread as key name in headers to update the threads

### DELETE routes

>1. '/deletePosts/:userId/:postId'
>2. '/deleteComments/:userId/:commentId'
>3. '/deleteThreads/:userId/:threadId'



# PostgreSql all routes and writeups
***

## link to the PostgreSql heroku deployed app
***
[Link to PostgreSQL Deployed IN heroku](https://kitab-e-keeda-v2.herokuapp.com/)


## All .env file and Authentication Details


## USER ROUTES
___

### POST routes
___

>1. '/signUp'
     pass name, email, password in body 

     
>2. '/verify/:userId'
    an otp must have been sent to the registered mail verify that to proceed further

>3. /signIn'
    pass email and password in in body. make sure password value must be passed with quotes 

 >4. '/addProfile/:userId'
    pass uploadImage, DOB, address, gender as key names and make sure to pass DOB as number  

>5. '/follow/:follower/:following'
        here the follower and following both has to be user id but the follower id has to logged in for it to work
___
### GET route
***

>1. '/searchUser/:userId'

### DELETE route

>1. '/signOff/:userId'
___

## BOOKS ROUTES
***
### POST routes
___
>1. '/books/genre/:userId'
    pass genre names in headers as key name genre1, genre2 upto genre5.
    try to find genre name from books database categories property

>2. '/books/favAuthor/:userId'
        pass favAuthor names in headers as key name author1, author2 upto author5.
         try to find author name from books database categories property

>3. '/books/readBooks/:userId'
        pass BooksRead names in headers as key name title1, title2 upto title5.
         try to find title from books database categories property

>4. '/books/addReview/:userId/:bookId'
        pass reviews and rating in headers as review and rating as key name rating should <= 5.
___
### GET routes
***
>1. '/books/getAllBooks'
    
>2. '/books/sortByGenres/:userId'
        this userId has to sign in as well as
         must have added above genres to see the sorted genre related books

>3. '/books/sortByAuthors/:userId'
        this userId has to sign in as well as
         must have added above authors to see the sorted genre related books

>4. '/books/sortByBooksRead/:userId'
        this userId has to sign in as well as
         must have added above booksRead to see the sorted genre related books

>5. '/search/:bookId'
___
### PUT routes

>1. '/updateReview/:userId/:reviewId'
        this user has to sign in 
        as well as must have added a review to update

### DELETE routes
***

>1. '/deleteReview/:userId/:reviewId'
        this user has to sign in as well as must have added a review to delete


### POST routes
___
>1. '/addPosts/:userId'
        pass postBody as key name in body json data to add post  

>2. '/addComments/:userId/:postId'
        pass commentBody as key name in body json to add comment 

>3. '/addLikes/:userId/:postId'
        pass like as key name in headers and pass true or false for like or dislike

>4. '/addThreads/:userId/:commentId'
        pass threadBody in headers as key name

### GET routes

>1. '/getposts/:userId'
        for this to work the user has to follow the user whose posts he wants to see
        and the followed user must have to add some posts to show it's follower

>2. '/searchPost/:postId'


### PUT routes

>1. '/updatePosts/:userId/:postId'
        pass post as key name in headers to get this route working

>2. '/updateComments/:userId/:commentId'
        pass comment as key name in headers to update the comment

>3. '/updateThreads/:userId/:threadId'
        pass thread as key name in headers to update the threads

### DELETE routes

>1. '/deletePosts/:userId/:postId'
>2. '/deleteComments/:userId/:commentId'
>3. '/deleteThreads/:userId/:threadId'

># Project done by Manas and Amit Pallauri
![Manas](https://media-exp1.licdn.com/dms/image/C5603AQF8arJJgHpPjQ/profile-displayphoto-shrink_200_200/0?e=1593648000&v=beta&t=2BRwhgO39ZtLHkTubhJ9E4tFR7PF3TAio6gKFJ_IOfA) ![Amit Pallauri](https://media-exp1.licdn.com/dms/image/C5103AQEZas4MnZUk7Q/profile-displayphoto-shrink_200_200/0?e=1593648000&v=beta&t=_L8_NFgHQU0_tzz8oxgZt34ObUc5TvtVfEvaydBNgmI)