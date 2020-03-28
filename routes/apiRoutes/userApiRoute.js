const router = require('express').Router()
const {authenticate} = require('../../middlewares/authenticate')
const UserProfile = require('../../models/userProfile');
const { registerUser, loginUser, logoutUser,userProfile } = require('../../controllers/apiControllers/userApiController')


const multer = require('multer');
var path = require('path');
const upload = multer({dest: 'uploads/'})





router.post('/register', registerUser)
router.post('/login', authenticate, loginUser)
router.delete('/logout', logoutUser)
router.post ('/profile',upload.single('profileImage'), userProfile )

module.exports = router;













// const storage = multer.diskStorage({
//     destination:function(req, file,cb){
//         cb(null,'../../uploads')
       
//     },
//     filename: function(req,file,cb){

//        cb(null, new Date().toISOString() + file.originalname);

//     }
// }); 
// const fileFilter = (req, file, cb) => {
//    // reject a file
//    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
//      cb(null, true);
//    } else {
//      cb(null, false); 
//    }
//  };
 
//  const upload = multer({
//     storage: storage,
//     limits: {
//       fileSize: 1024 * 1024 * 5
//     },
//     fileFilter: fileFilter
//   });