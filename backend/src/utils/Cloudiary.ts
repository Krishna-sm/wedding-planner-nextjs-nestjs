// const cloudinary = require('cloudinary').v2
import {v2 as cloudinary} from 'cloudinary'
import {config} from 'dotenv'
config({
    path:'.env'
})
cloudinary.config({
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SCREATE,
    cloud_name:process.env.CLOUDINARY_NAME
})

export default cloudinary