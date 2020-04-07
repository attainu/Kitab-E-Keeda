const User = require('../../models/users');
const Profile = require('../../models/profile')
const {
    sign
} = require('jsonwebtoken');
const {
    privateKey
} = process.env
const {
    MESSEGE_BIRD_KEY
} = process.env
const messagebird = require('messagebird')(MESSEGE_BIRD_KEY)
const uuid = require('uuid/v4')
const cloudinary = require('../../fileUpload/cloudinary/cloudinary')
const bufferToString = require('../../fileUpload/bufferToString/bufferToString')

module.exports = {
    async registerUser(req, res) {
        console.log("inside post register")
        try {
            const user = new User({
                ...req.body
            })
            await user.save()
            res.json(user)
        } catch (err) {
            console.log(err);
            res.send(err)
        }
    },

    async loginUser(req, res) {
        const {
            email,
            password
        } = req.body
        try {
            const foundUser = await User.findByEmailAndPassword(email, password);
            sign({
                id: uuid
            }, privateKey, {
                expiresIn: 60 * 60 * 60 * 2
            }, (err, token) => {
                if (err) return res.send(err.message);
                foundUser.token = token
                foundUser.save()
                return res.json({
                    "message": "login successfull",
                    "user": foundUser
                })
            })
        } catch (err) {
            console.log(err.message)
            return res.send(err.message)
        }
    },

    async logoutUser(req, res) {
        const token = req.headers.authentication
        try {
            const foundUser = await User.findOneAndUpdate({
                token
            }, {
                $unset: {
                    token
                }
            })
            if (!foundUser) return res.send("invalid credentials")
            return res.json({
                "message": "logged out successfully"
            });
        } catch (err) {
            console.log(err)
        }
    },

    async addProfile(req, res) {
        //upload files in cloudinary
        try {
            const imageContent = bufferToString(req.file.originalname, req.file.buffer)
            const {
                secure_url
            } = await cloudinary.uploader.upload(imageContent)
            const {
                DOB,
                address,
                gender
            } = req.body
            const userId = req.params.userId
            const userprofile = new Profile({
                uploadImage: secure_url,
                DOB: DOB,
                address: address,
                gender: gender,
                user: userId
            })
            await userprofile.save()
            res.json(userprofile)
        } catch (err) {
            console.log(err)
        }
    },


    async sendOtp(req, res) {
        var number = req.body.number

        ///make a request to verify api token
        messagebird.verify.create(number, {
            //   template: 'your verification code is %token'
        }, function (err, response) {
            if (err) {
                res.send(err)
            } else {
                res.send('Otp send  succsessfully')
                console.log(response.id)
            }
        })


    },

    //verify whter the token is correct or not 
    async verifyOtp(req, res) {
        var id = req.body.id
        var token = req.body.token
        //make a request to verify the api 
        messagebird.verify.verify(id, token, function (err, response) {

            if (err) {
                res.send(err)
            } else {
                res.send(response)
                console.log(response)
                res.status(200).send('verifictaion is sucessful ')
            }
        })

    }


}